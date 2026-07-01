"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Bot, Sparkles, ArrowRight } from "lucide-react"
import { aiResponsesEn, aiResponsesPt, defaultPromptsEn, defaultPromptsPt } from "@/data/ai-responses"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { AuroraBorder } from "@/components/shared/AuroraBorder"
import { useT } from "@/hooks/useT"
import { useLanguage } from "@/hooks/useLanguage"
import type { AIResponse } from "@/types"

interface Message {
  role: "user" | "assistant"
  text: string
  id: number
}

function findResponse(input: string, responses: AIResponse[], lang: "pt" | "en"): string {
  const lower = input.toLowerCase()
  const match = responses.find((r) => r.triggers.some((trigger) => lower.includes(trigger)))
  if (match) return match.response
  return lang === "pt"
    ? "Não tenho uma resposta específica para isso, mas você pode entrar em contato com a Karine diretamente em karinemsilva245@gmail.com ou explorar seus projetos no GitHub em github.com/km2s."
    : "I don't have a specific answer for that, but you can reach Karine directly at karinemsilva245@gmail.com or explore her projects on GitHub at github.com/km2s."
}

function useTypewriter(text: string, speed = 14) {
  const [index, setIndex] = useState(0)
  useEffect(() => { setIndex(0) }, [text])
  useEffect(() => {
    if (index >= text.length) return
    const timeout = setTimeout(() => setIndex((i) => i + 1), speed)
    return () => clearTimeout(timeout)
  }, [index, text, speed])
  return { displayed: text.slice(0, index), done: index >= text.length }
}

function BotAvatar({ pulsing = false }: { pulsing?: boolean }) {
  return (
    <div className="relative shrink-0">
      {pulsing && (
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full"
          style={{ boxShadow: "0 0 18px rgba(244,63,114,0.7)" }}
          animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
      <div className="relative w-8 h-8 rounded-full flex items-center justify-center border border-border-glow"
        style={{ background: "radial-gradient(circle at 30% 30%, rgba(251,127,160,0.5), rgba(138,26,53,0.6))" }}>
        <Bot size={14} className="text-text-primary" />
      </div>
    </div>
  )
}

function AssistantMessage({ text, isLatest, onDone }: { text: string; isLatest: boolean; onDone?: () => void }) {
  const { displayed, done } = useTypewriter(isLatest ? text : text, isLatest ? 14 : 0)
  const shown = isLatest ? displayed : text
  useEffect(() => { if (done && isLatest) onDone?.() }, [done, isLatest, onDone])

  return (
    <div className="flex items-start gap-3">
      <BotAvatar pulsing={isLatest && !done} />
      <div className="flex-1 rounded-2xl rounded-tl-sm border border-border-subtle bg-void-800/80 px-4 py-3">
        <p className="text-sm leading-relaxed" style={{ color: "#fff0f3" }}>
          {shown}
          {isLatest && !done && (
            <span className="inline-block w-1.5 h-3.5 bg-accent ml-0.5 align-middle animate-blink" />
          )}
        </p>
      </div>
    </div>
  )
}

function UserMessage({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3 justify-end">
      <div className="max-w-[80%] rounded-2xl rounded-tr-sm px-4 py-3 text-sm font-medium border border-accent/40"
        style={{ background: "linear-gradient(135deg, rgba(244,63,114,0.22), rgba(138,26,53,0.4))", color: "var(--text-primary)" }}>
        {text}
      </div>
      <div className="shrink-0 w-8 h-8 rounded-full bg-void-800 border border-border-subtle flex items-center justify-center text-xs font-mono text-accent-soft">
        u
      </div>
    </div>
  )
}

function ThinkingDots() {
  return (
    <div className="flex items-center gap-3">
      <BotAvatar pulsing />
      <div className="rounded-2xl rounded-tl-sm border border-border-subtle bg-void-800/80 px-4 py-3 flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-accent-soft"
            animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
            transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
    </div>
  )
}

export function AIAssistant() {
  const t = useT()
  const { lang } = useLanguage()
  const responses = lang === "pt" ? aiResponsesPt : aiResponsesEn
  const defaultPrompts = lang === "pt" ? defaultPromptsPt : defaultPromptsEn

  const greeting = lang === "pt"
    ? "Olá! Sou uma interface de IA do portfólio da Karine. Pergunte qualquer coisa sobre sua formação, projetos, habilidades ou experiência. Digite uma pergunta ou clique em uma das opções abaixo."
    : "Hello! I'm an AI interface for Karine's portfolio. Ask me anything about her background, projects, skills, or experience. Type a question or click a prompt below."

  const [messages, setMessages] = useState<Message[]>([{ role: "assistant", text: greeting, id: 0 }])
  const [nextId, setNextId] = useState(1)
  const [thinking, setThinking] = useState(false)
  const [input, setInput] = useState("")
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setMessages([{ role: "assistant", text: greeting, id: 0 }])
    setNextId(1)
  }, [lang, greeting])

  const scrollToBottom = () => setTimeout(() => {
    const c = bottomRef.current?.parentElement
    if (c) c.scrollTop = c.scrollHeight
  }, 60)

  const handlePrompt = (prompt: string) => {
    if (thinking || !prompt.trim()) return
    const userMsg: Message = { role: "user", text: prompt, id: nextId }
    setMessages((prev) => [...prev, userMsg])
    setNextId((id) => id + 1)
    setThinking(true)
    scrollToBottom()

    setTimeout(() => {
      const reply = findResponse(prompt, responses, lang)
      const assistantMsg: Message = { role: "assistant", text: reply, id: nextId + 1 }
      setMessages((prev) => [...prev, assistantMsg])
      setNextId((id) => id + 2)
      setThinking(false)
      scrollToBottom()
    }, 650 + Math.random() * 400)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const value = input.trim()
    if (!value) return
    setInput("")
    handlePrompt(value)
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  const latestAssistantId = messages.filter((m) => m.role === "assistant").at(-1)?.id ?? -1

  return (
    <section id="ai-assistant" className="relative py-20 lg:py-32 overflow-hidden">
      {/* Ambient glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] blur-[120px] rounded-full"
          style={{ background: "rgba(244,63,114,0.08)" }} />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <AuroraBorder>
            {/* Window chrome */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-border-subtle">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-accent-dim" />
                <span className="h-2.5 w-2.5 rounded-full bg-void-700" />
                <span className="h-2.5 w-2.5 rounded-full bg-void-700" />
              </div>
              <div className="flex items-center gap-2">
                <Sparkles size={12} className="text-accent" />
                <span className="text-[11px] font-mono text-text-muted tracking-wider">karine.ai · v0.3</span>
              </div>
              <div className="flex items-center gap-1.5">
                <motion.span
                  className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                />
                <span className="text-[10px] font-mono text-text-muted">online</span>
              </div>
            </div>

            <div className="p-5">
              {/* Messages */}
              <div className="flex flex-col gap-4 min-h-72 max-h-[26rem] overflow-y-auto pr-1">
                <AnimatePresence initial={false}>
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                    >
                      {msg.role === "user"
                        ? <UserMessage text={msg.text} />
                        : <AssistantMessage text={msg.text} isLatest={msg.id === latestAssistantId} onDone={scrollToBottom} />}
                    </motion.div>
                  ))}
                  {thinking && (
                    <motion.div key="thinking" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                      <ThinkingDots />
                    </motion.div>
                  )}
                </AnimatePresence>
                <div ref={bottomRef} />
              </div>

              {/* Input form */}
              <form onSubmit={handleSubmit} className="mt-6 pt-5 border-t border-border-subtle">
                <div className="relative flex items-center gap-2 rounded-xl border border-border-subtle bg-void-800/60 backdrop-blur-sm focus-within:border-border-glow focus-within:shadow-[0_0_0_3px_rgba(244,63,114,0.12)] transition-all">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={thinking}
                    placeholder={t.ai.inputPlaceholder}
                    aria-label={t.ai.inputPlaceholder}
                    className="flex-1 bg-transparent px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={thinking || !input.trim()}
                    aria-label={t.ai.send}
                    className="mr-1.5 flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono font-semibold text-text-primary border border-accent/40 bg-gradient-to-br from-accent/30 to-accent-dim/40 hover:from-accent/50 hover:to-accent-dim/60 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
                  >
                    <Send size={12} />
                    {t.ai.send}
                  </button>
                </div>
              </form>

              {/* Prompt chips */}
              <div className="mt-5">
                <p className="text-xs font-mono text-accent mb-3 tracking-wider uppercase flex items-center gap-2">
                  <Sparkles size={11} /> {t.ai.quickPrompts}
                </p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {defaultPrompts.map((prompt, i) => (
                    <motion.button
                      key={prompt}
                      onClick={() => handlePrompt(prompt)}
                      disabled={thinking}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * i, duration: 0.3 }}
                      whileHover={{ y: -2 }}
                      className="group magnetic flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl text-xs text-left
                        bg-void-800/60 border border-border-subtle text-text-secondary font-mono
                        hover:bg-accent/10 hover:border-border-glow hover:text-text-primary
                        transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="flex items-center gap-2 truncate">
                        <Sparkles size={11} className="shrink-0 text-accent" />
                        <span className="truncate">{prompt}</span>
                      </span>
                      <ArrowRight size={11} className="shrink-0 text-text-muted opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </AuroraBorder>

          <p className="mt-4 text-center text-xs font-mono text-text-muted">{t.ai.disclaimer}</p>
        </AnimatedSection>
      </div>
    </section>
  )
}
