"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { cn } from "@/lib/utils"

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  once?: boolean
}

export function AnimatedSection({ children, className, delay = 0, once = true }: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once, margin: "0px 0px -60px 0px" })
  const reduced = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: reduced ? 0 : 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.0, 0.0, 0.2, 1], delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
