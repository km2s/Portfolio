"use client"

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** max rotation in deg */
  max?: number;
  glare?: boolean;
}

/**
 * 3D tilt wrapper. Rotates the child in response to pointer position with
 * spring-smoothed values and an optional rose-vinho glare highlight that
 * follows the cursor.
 */
export function TiltCard({ children, className, max = 8, glare = true }: TiltCardProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const px = useMotionValue(50);
  const py = useMotionValue(50);

  const srx = useSpring(rx, { stiffness: 180, damping: 18, mass: 0.5 });
  const sry = useSpring(ry, { stiffness: 180, damping: 18, mass: 0.5 });

  const glareBg = useTransform(
    [px, py],
    ([x, y]) =>
      `radial-gradient(420px circle at ${x}% ${y}%, rgba(244,63,114,0.18), transparent 55%)`
  );

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    ry.set((x - 0.5) * max * 2);
    rx.set(-(y - 0.5) * max * 2);
    px.set(x * 100);
    py.set(y * 100);
  };

  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 1200, transformStyle: "preserve-3d" }}
      className={cn("relative will-change-transform", className)}
    >
      {children}
      {glare && !reduced && (
        <motion.div
          aria-hidden
          style={{ background: glareBg }}
          className="pointer-events-none absolute inset-0 rounded-2xl mix-blend-screen"
        />
      )}
    </motion.div>
  );
}
