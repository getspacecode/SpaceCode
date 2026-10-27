"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { type ReactNode, useEffect, useRef, useState } from "react";

export const ease = [0.22, 1, 0.36, 1] as const;

/** Fade + rise when scrolled into view. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.7, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Headline that slides up word by word out of a mask. */
export function SplitWords({
  text,
  className = "",
  delay = 0,
  highlight = [],
  inView = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  highlight?: string[];
  inView?: boolean;
}) {
  const words = text.split(" ");
  const mark = new Set(highlight.map((w) => w.toLowerCase()));
  const trigger = inView
    ? { whileInView: { y: "0%" }, viewport: { once: true, margin: "-60px" } }
    : { animate: { y: "0%" } };

  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => {
        const hit = mark.has(word.toLowerCase().replace(/[^\p{L}\p{N}]/gu, ""));
        return (
          <span
            // biome-ignore lint/suspicious/noArrayIndexKey: static word list
            key={i}
            aria-hidden="true"
            className="mr-[0.22em] inline-block overflow-hidden pb-[0.14em] align-top last:mr-0"
            style={{ marginBottom: "-0.14em" }}
          >
            <motion.span
              className="inline-block"
              initial={{ y: "115%" }}
              {...trigger}
              transition={{ duration: 0.85, delay: delay + i * 0.06, ease }}
            >
              {hit ? (
                <span className="inline-block -rotate-2 rounded-[0.2em] bg-accent px-[0.16em] text-accent-ink">
                  {word}
                </span>
              ) : (
                word
              )}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}

/** Number that counts up the first time it is visible. */
export function CountUp({
  to,
  decimals = 0,
  suffix = "",
  className = "",
}: {
  to: number;
  decimals?: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true, margin: "-40px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!seen) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease,
      onUpdate: (v) => setValue(v),
    });
    return () => controls.stop();
  }, [seen, to]);

  return (
    <span ref={ref} className={className}>
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/** Element that leans slightly towards the pointer. */
export function Magnetic({
  children,
  strength = 0.25,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
