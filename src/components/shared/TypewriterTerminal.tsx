"use client"

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export interface CodeLine {
  indent: number;
  text: string;
  color: string;
}

/**
 * Real character-by-character typewriter for the hero terminal.
 * Auto-skips when prefers-reduced-motion is set.
 */
export function TypewriterTerminal({
  lines,
  prompt,
  cps = 55,
  startDelay = 350,
}: {
  lines: CodeLine[];
  prompt: string;
  cps?: number;
  startDelay?: number;
}) {
  const reduced = useReducedMotion();
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduced) {
      setLineIdx(lines.length);
      setDone(true);
      return;
    }
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const current = lines[lineIdx];
      if (!current) {
        setDone(true);
        return;
      }
      if (charIdx < current.text.length) {
        timer = setTimeout(() => setCharIdx((c) => c + 1), 1000 / cps);
      } else {
        timer = setTimeout(() => {
          setLineIdx((i) => i + 1);
          setCharIdx(0);
        }, 60);
      }
    };
    timer = setTimeout(tick, lineIdx === 0 && charIdx === 0 ? startDelay : 0);
    return () => clearTimeout(timer);
  }, [lineIdx, charIdx, lines, cps, reduced, startDelay]);

  return (
    <div className="space-y-0.5">
      {lines.map((line, i) => {
        if (i > lineIdx) return <div key={i} className="leading-6">&nbsp;</div>;
        const text = i < lineIdx ? line.text : line.text.slice(0, charIdx);
        return (
          <div
            key={i}
            className={`${line.color} leading-6`}
            style={{ paddingLeft: `${line.indent * 1.5}rem` }}
          >
            {text}
            {i === lineIdx && !done && (
              <span className="inline-block w-1.5 h-4 bg-accent ml-0.5 align-middle animate-blink" />
            )}
          </div>
        );
      })}
      {done && (
        <div className="text-text-muted mt-2">
          <span className="text-text-muted">$ </span>
          <span className="text-text-secondary">{prompt}</span>
          <span className="inline-block w-2 h-4 bg-accent ml-0.5 align-middle animate-blink" />
        </div>
      )}
    </div>
  );
}
