"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import { SLAB_BOTTOM, SLAB_TOP, slabProps } from "@/components/Logo";

// The logo, blown up. The two slabs slide into place along their own axis,
// float gently and drift against each other as the pointer moves.
export function HeroSlabs({ className = "" }: { className?: string }) {
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 16 });
  const sy = useSpring(py, { stiffness: 60, damping: 16 });

  const topX = useTransform(sx, [-1, 1], [-28, 28]);
  const topY = useTransform(sy, [-1, 1], [-20, 20]);
  const botX = useTransform(sx, [-1, 1], [36, -36]);
  const botY = useTransform(sy, [-1, 1], [26, -26]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      px.set((e.clientX / window.innerWidth) * 2 - 1);
      py.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [px, py]);

  const enter = { duration: 1.3, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <svg viewBox="330 290 520 620" className={`overflow-visible ${className}`} aria-hidden="true">
      <motion.g style={{ x: topX, y: topY }}>
        <motion.g
          initial={{ x: 230, y: -160, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          transition={{ ...enter, delay: 0.5 }}
        >
          <motion.g
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <rect {...slabProps(SLAB_TOP)} fill="var(--logo-a)" />
          </motion.g>
        </motion.g>
      </motion.g>

      <motion.g style={{ x: botX, y: botY }}>
        <motion.g
          initial={{ x: -230, y: 160, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          transition={{ ...enter, delay: 0.65 }}
        >
          <motion.g
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 7.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <rect {...slabProps(SLAB_BOTTOM)} fill="var(--logo-b)" />
          </motion.g>
        </motion.g>
      </motion.g>
    </svg>
  );
}
