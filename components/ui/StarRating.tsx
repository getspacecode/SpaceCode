"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useState } from "react";

export function StarRatingDisplay({ rating, size = 18 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-1" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          // biome-ignore lint/suspicious/noArrayIndexKey: fixed five stars
          key={i}
          size={size}
          className={i < Math.round(rating) ? "fill-accent text-accent" : "fill-transparent text-line"}
        />
      ))}
    </div>
  );
}

export function StarRatingInput({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex items-center gap-1" role="radiogroup" aria-label="Rate your experience">
      {Array.from({ length: 5 }).map((_, i) => {
        const starValue = i + 1;
        const filled = hovered ? starValue <= hovered : starValue <= value;
        return (
          <motion.button
            // biome-ignore lint/suspicious/noArrayIndexKey: fixed five stars
            key={i}
            type="button"
            role="radio"
            aria-checked={value === starValue}
            aria-label={`${starValue} star${starValue > 1 ? "s" : ""}`}
            onMouseEnter={() => setHovered(starValue)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => onChange(starValue)}
            whileHover={{ scale: 1.18, rotate: -8 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 420, damping: 18 }}
            className="p-1"
          >
            <Star size={30} className={filled ? "fill-accent text-accent" : "fill-transparent text-line"} />
          </motion.button>
        );
      })}
    </div>
  );
}
