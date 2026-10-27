"use client";

import { motion } from "framer-motion";

export function Marquee({ items }: { items: string[] }) {
  const row = (hidden: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden}>
      {items.map((text) => (
        <span
          key={text}
          className="flex items-center gap-8 pr-8 font-display text-3xl font-semibold tracking-tight whitespace-nowrap sm:text-5xl"
        >
          {text}
          <i className="inline-block h-3 w-9 shrink-0 -rotate-35 rounded-[5px] bg-accent-ink" />
        </span>
      ))}
    </div>
  );

  return (
    <div className="overflow-hidden rounded-panel bg-accent py-6 text-accent-ink sm:py-8">
      <motion.div
        className="flex w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 38, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      >
        {row(false)}
        {row(true)}
      </motion.div>
    </div>
  );
}
