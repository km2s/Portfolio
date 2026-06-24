"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

export type Lang = "en" | "pt"

interface LanguageContextType {
  lang: Lang
  toggle: () => void
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  toggle: () => {},
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en")
  const toggle = useCallback(() => setLang((l) => (l === "en" ? "pt" : "en")), [])

  return (
    <LanguageContext.Provider value={{ lang, toggle }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
