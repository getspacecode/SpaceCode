import Link from "next/link";
import type { ReactNode } from "react";

// A flat card that floods with the accent colour (a tilted slab sweeping in)
// when hovered. Children can use `group-hover:` classes to flip their colours.
export function SweepCard({
  href,
  children,
  className = "",
  radius = "rounded-card",
}: {
  href?: string;
  children: ReactNode;
  className?: string;
  radius?: string;
}) {
  const cls = `group relative block overflow-hidden bg-surface ${radius} ${className}`;
  const inner = (
    <>
      <span
        aria-hidden="true"
        className="absolute inset-y-0 -left-[30%] w-[160%] -translate-x-full -skew-x-35 bg-accent transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-0"
      />
      <div className="relative z-10 h-full transition-colors duration-500 group-hover:text-accent-ink">
        {children}
      </div>
    </>
  );

  return href ? (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  ) : (
    <div className={cls}>{inner}</div>
  );
}
