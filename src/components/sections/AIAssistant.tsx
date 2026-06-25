"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Bot } from "lucide-react"
import { aiResponsesEn, aiResponsesPt, defaultPromptsEn, defaultPromptsPt } from "@/data/ai-responses"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { TerminalWindow } from "@/components/shared/TerminalWindow"
import { useT } from "@/hooks/useT"
import { useLanguage } from "@/hooks/useLanguage"
import type { AIResponse } from "@/types"

interface Message {
  role: "user" | "assistant"
  text: string
  id: number
}

function findResponse(input: string, responses: AIResponse[]): string {
  const lower = input.toLowerCase()
  const match = responses.find((r) =>
    r.triggers.some((trigger) => lower.includes(trigger))
  )
  return (
    match?.response ??
    "I don't have a specific answer for that, but you can reach Karine directly at karinemsilva245@gmail.com or explore her projects on GitHub at github.com/km2s."
  )
}

function findResponsePt(input: string, responses: AIResponse[]): string {
  const lower = input.toLowerCase()
  const match = responses.find((r) =>
    r.triggers.some((trigger) => lower.includes(trigger))
  )
  return (
    match?.response ??
    "Não tenho uma resposta específica para isso, mas você pode entrar em contato com a Karine diretamente em karinemsilva245@gmail.com ou explorar seus projetos no GitHub em github.com/km2s."
  )
}

function useTypewriter(text: string, speed = 18): { displayed: string; done: boolean } {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    setIndex(0)
  }, [text])

  useEffect(() => {
    if (index >= text.length) return
    const timeout = setTimeout(() => setIndex((i) => i + 1), speed)
    return () => clearTimeout(timeout)
  }, [index, text, speed])

  return { displayed: text.slice(0, index), done: index >= text.length }
}

function AssistantMessage({ text, isLatest }: { text: string; isLatest: boolean }) {
  const { displayed, done } = useTypewriter(isLatest ? text : text, isLatest ? 18 : 0)
  const shown = isLatest ? displayed : text

  return (
    <div className="flex items-start gap-3">
      <div className="w-6 h-6 rounded-full bg-accent/15 border border-border-subtle flex items-center justify-center shrink-0 mt-0.5">
        <Bot size={12} className="text-accent" />
      </div>
      <div className="text-sm text-text-secondary leading-relaxed flex-1">
        {shown}
        {isLatest && !done && (
          <span className="inline-block w-2 h-3.5 bg-accent ml-0.5 align-middle animate-blink" />
        )}
      </div>
    </div>
  )
}

export function AIAssistant() {
  const t = useT()
  const { lang } = useLanguage()
  const responses = lang === "pt" ? aiResponsesPt : aiResponsesEn
  const defaultPrompts = lang === "pt" ? defaultPromptsPt : defaultPromptsEn

  const initialMessage =
    lang === "pt"
      ? "Olá! Sou uma interface de IA do portfólio da Karine. Pergunte qualquer coisa sobre sua formação, projetos, habilidades ou experiência. Clique em uma das opções abaixo para começar."
      : "Hello! I'm an AI interface for Karine's portfolio. Ask me anything about her background, projects, skills, or experience. Click a prompt below to start."

  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", text: initialMessage, id: 0 },
  ])
  const [nextId, setNextId] = useState(1)
  const bottomRef = useRef<HTMLDivElement>(null)

  // Reset conversation when language changes
  useEffect(() => {
    setMessages([
      {
        role: "assistant",
        text:
          lang === "pt"
            ? "Olá! Sou uma interface de IA do portfólio da Karine. Pergunte qualquer coisa sobre sua formação, projetos, habilidades ou experiência. Clique em uma das opções abaixo para começar."
            : "Hello! I'm an AI interface for Karine's portfolio. Ask me anything about her background, projects, skills, or experience. Click a prompt below to start.",
        id: 0,
      },
    ])
    setNextId(1)
  }, [lang])

  const handlePrompt = (prompt: string) => {
    const reply =
      lang === "pt"
        ? findResponsePt(prompt, responses)
        : findResponse(prompt, responses)

    const userMsg: Message = { role: "user", text: prompt, id: nextId }
    const assistantMsg: Message = { role: "assistant", text: reply, id: nextId + 1 }
    setMessages((prev) => [...prev, userMsg, assistantMsg])
    setNextId((id) => id + 2)
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50)
  }

  const latestAssistantId = messages.filter((m) => m.role === "assistant").at(-1)?.id ?? -1

  return (
    <section id="ai-assistant" className="py-20 lg:py-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-12 text-center">
          <SectionHeader
            label={t.ai.label}
            title={t.ai.title}
            highlight={t.ai.highlight}
            description={t.ai.description}
            center
          />
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <TerminalWindow title="karine@portfolio — ai-assistant">
            {/* Message history */}
            <div className="flex flex-col gap-5 min-h-70 max-h-105 overflow-y-auto pr-1">
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {msg.role === "user" ? (
                      <div className="flex items-start gap-3">
                        <span className="text-accent font-mono text-sm shrink-0 mt-0.5">$</span>
                        <p className="text-sm text-accent-soft font-mono">{msg.text}</p>
                      </div>
                    ) : (
                      <AssistantMessage
                        text={msg.text}
                        isLatest={msg.id === latestAssistantId}
                      />
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={bottomRef} />
            </div>

            {/* Prompts */}
            <div className="mt-6 pt-5 border-t border-border-subtle">
              <p className="text-xs font-mono text-accent mb-3 tracking-wider uppercase">
                {t.ai.quickPrompts}
              </p>
              <div className="grid sm:grid-cols-2 gap-2">
                {defaultPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handlePrompt(prompt)}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs text-left
                      bg-accent/8 border border-border-subtle text-text-secondary font-mono
                      hover:bg-accent/15 hover:border-border-glow hover:text-text-primary
                      transition-all duration-150 cursor-pointer"
                  >
                    <Send size={11} className="shrink-0 text-accent" />
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          </TerminalWindow>

          <p className="mt-4 text-center text-xs font-mono text-text-muted">
            {t.ai.disclaimer}
          </p>
        </AnimatedSection>
      </div>
    </section>
  )
}
