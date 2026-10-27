import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

type BaseProps = {
  children: ReactNode;
  variant?: "primary" | "dark" | "ink" | "ghost";
  className?: string;
  showArrow?: boolean;
};

type ButtonAsLink = BaseProps & {
  href: string;
  onClick?: never;
  type?: never;
};

type ButtonAsButton = BaseProps & {
  href?: never;
  onClick?: () => void;
  type?: "button" | "submit";
};

const base =
  "group relative inline-flex items-center justify-center overflow-hidden rounded-full px-7 py-3.5 text-[15px] font-semibold transition-colors duration-500 disabled:cursor-not-allowed disabled:opacity-50";

// every button fills with a tilted slab (the logo's angle) on hover
const variants = {
  primary: { box: "bg-accent text-accent-ink", sweep: "bg-foreground", hover: "group-hover:text-background" },
  dark: { box: "bg-foreground text-background", sweep: "bg-accent", hover: "group-hover:text-accent-ink" },
  // for use on accent-coloured panels
  ink: { box: "bg-accent-ink text-[#f5f5f6]", sweep: "bg-[#f5f5f6]", hover: "group-hover:text-accent-ink" },
  ghost: {
    box: "text-foreground ring-2 ring-line ring-inset",
    sweep: "bg-foreground",
    hover: "group-hover:text-background",
  },
};

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { children, variant = "primary", className = "", showArrow = true } = props;
  const v = variants[variant];
  const classes = `${base} ${v.box} ${className}`;

  const content = (
    <>
      <span
        aria-hidden="true"
        className={`absolute inset-y-0 -left-[25%] w-[150%] -translate-x-full -skew-x-35 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-0 ${v.sweep}`}
      />
      <span className={`relative z-10 flex items-center gap-2 transition-colors duration-500 ${v.hover}`}>
        {children}
        {showArrow && (
          <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
        )}
      </span>
    </>
  );

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={(props as ButtonAsButton).type ?? "button"}
      onClick={(props as ButtonAsButton).onClick}
      className={classes}
    >
      {content}
    </button>
  );
}
