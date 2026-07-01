"use client"

import { motion } from "framer-motion";
import { Database, Globe, Server, Zap, Layers, Box, type LucideIcon } from "lucide-react";
import type { ArchitectureLayer } from "@/types";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const layerIcons: Record<string, LucideIcon> = {
  Frontend: Globe,
  Backend: Server,
  Database: Database,
  "External Services": Zap,
  Infrastructure: Box,
};

const layerTint: Record<string, string> = {
  Frontend: "rgba(251,127,160,0.18)",
  Backend: "rgba(244,63,114,0.16)",
  Database: "rgba(245,158,11,0.18)",
  "External Services": "rgba(245,158,11,0.16)",
  Infrastructure: "rgba(138,26,53,0.22)",
};

/**
 * Renders the architecture as stacked perspective slabs — a real 3D feel
 * built entirely from CSS transforms, so it stays fast and accessible.
 */
export function ArchitectureStack3D({
  layers,
  lang,
}: {
  layers: ArchitectureLayer[];
  lang: "pt" | "en";
}) {
  const reduced = useReducedMotion();
  const count = layers.length;

  return (
    <div
      className="relative mx-auto w-full max-w-md py-8"
      style={{ perspective: 1400 }}
    >
      <div
        className="relative flex flex-col items-center"
        style={{
          transformStyle: "preserve-3d",
          transform: "rotateX(48deg) rotateZ(-22deg)",
        }}
      >
        {layers.map((layer, i) => {
          const Icon = layerIcons[layer.layer] ?? Layers;
          const tint = layerTint[layer.layer] ?? "rgba(244,63,114,0.18)";
          const description = lang === "pt" && layer.descriptionPt ? layer.descriptionPt : layer.description;
          const offset = (count - 1 - i) * 46;
          return (
            <motion.div
              key={layer.layer}
              initial={{ opacity: 0, y: -16 - i * 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              whileHover={reduced ? undefined : { translateZ: 24, scale: 1.02 }}
              className="absolute left-1/2 top-1/2 w-72"
              style={{
                translateX: "-50%",
                translateY: `${offset - 100}px`,
                transformStyle: "preserve-3d",
              }}
            >
              {/* shadow plate */}
              <div
                aria-hidden
                className="absolute inset-0 rounded-xl blur-2xl opacity-60"
                style={{ background: tint, transform: "translateZ(-30px)" }}
              />
              <div
                className="relative rounded-xl border border-border-glow bg-void-900/85 backdrop-blur-md p-4 shadow-[0_30px_60px_-20px_rgba(244,63,114,0.35)]"
                style={{ background: `linear-gradient(135deg, ${tint}, rgba(13,6,8,0.85))` }}
              >
                <div className="flex items-center gap-2">
                  <Icon size={16} className="text-accent-soft" />
                  <p className="text-xs font-mono font-semibold text-text-primary tracking-wide uppercase">
                    {layer.layer}
                  </p>
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {layer.tech.slice(0, 5).map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono text-text-primary/80 bg-black/30 px-1.5 py-0.5 rounded"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <p className="mt-2 text-[11px] leading-snug text-text-primary/55 line-clamp-2">
                  {description}
                </p>
              </div>
            </motion.div>
          );
        })}
        {/* spacer to give the absolute stack a footprint */}
        <div style={{ height: count * 46 + 120 }} />
      </div>
    </div>
  );
}
