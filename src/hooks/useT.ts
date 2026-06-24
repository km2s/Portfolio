"use client"

import { useLanguage } from "./useLanguage"
import { translations } from "@/data/translations"

export function useT() {
  const { lang } = useLanguage()
  return translations[lang]
}
