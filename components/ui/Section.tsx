import type { ReactNode } from "react";
import { Reveal } from "@/components/motion";

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`mx-auto w-full max-w-[1240px] px-5 py-16 sm:px-8 lg:py-24 ${className}`}>
      {children}
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="eyebrow flex items-center gap-3 text-accent-text">
      <i className="mr-1 inline-block h-2.5 w-6 -rotate-35 rounded-[4px] bg-accent" />
      {children}
    </span>
  );
}

export function SectionHeading({
  title,
  description,
  eyebrow,
  align = "left",
}: {
  title: string;
  description?: string;
  eyebrow?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal className={`max-w-3xl ${align === "center" ? "mx-auto flex flex-col items-center text-center" : ""}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2
        className={`${eyebrow ? "mt-5" : ""} text-[clamp(2.4rem,5.5vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.03em]`}
      >
        {title}
      </h2>
      {description && <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{description}</p>}
    </Reveal>
  );
}
