"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

// Re-mounts on every navigation: two tilted slabs (the logo's angle) sweep
// away to reveal the new page.
const wipe = { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const };

export default function Template({ children }: { children: ReactNode }) {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-100 overflow-hidden"
      >
        <div className="absolute left-1/2 top-1/2 h-[150vmax] w-[280vmax] -translate-x-1/2 -translate-y-1/2 -rotate-35">
          <motion.div
            className="absolute inset-0 bg-background"
            initial={{ y: "0%" }}
            animate={{ y: "100%" }}
            transition={{ ...wipe, delay: 0.14 }}
          />
          <motion.div
            className="absolute inset-0 bg-accent"
            initial={{ y: "0%" }}
            animate={{ y: "100%" }}
            transition={wipe}
          />
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
