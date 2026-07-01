"use client"

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Custom magnetic cursor — dot + soft halo, snaps slightly toward
 * interactive elements. Disabled on touch.
 */
export function MagneticCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });
  const haloX = useSpring(x, { stiffness: 120, damping: 18, mass: 0.6 });
  const haloY = useSpring(y, { stiffness: 120, damping: 18, mass: 0.6 });
  const raf = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none)").matches) return;
    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const interactive = !!target?.closest("a, button, [role=button], input, textarea, select, .magnetic");
      setHover(interactive);
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
        className="pointer-events-none fixed top-0 left-0 z-[100] mix-blend-screen"
      >
        <motion.div
          animate={{ scale: hover ? 0.4 : 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="w-2 h-2 rounded-full bg-accent shadow-[0_0_14px_rgba(244,63,114,0.9)]"
        />
      </motion.div>
      <motion.div
        aria-hidden
        style={{ x: haloX, y: haloY, translateX: "-50%", translateY: "-50%" }}
        className="pointer-events-none fixed top-0 left-0 z-[99]"
      >
        <motion.div
          animate={{ scale: hover ? 1.8 : 1, opacity: hover ? 0.55 : 0.3 }}
          transition={{ type: "spring", stiffness: 200, damping: 22 }}
          className="w-10 h-10 rounded-full border border-accent/60 backdrop-blur-[2px]"
        />
      </motion.div>
    </>
  );
}
