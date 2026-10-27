"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks, siteConfig } from "@/lib/site";
import { Logo, Wordmark } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/Button";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState<string | null>(null);
  const current = hover ?? pathname;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-3 rounded-full bg-surface py-2 pr-2 pl-5">
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <Logo className="h-7 w-auto" />
          <Wordmark className="hidden sm:inline" />
        </Link>

        <nav
          className="hidden items-center lg:flex"
          onMouseLeave={() => setHover(null)}
        >
          {navLinks.map((link) => {
            const on = current === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onMouseEnter={() => setHover(link.href)}
                className={`relative isolate px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                  on ? "text-background" : "text-muted"
                }`}
              >
                {on && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-foreground"
                    style={{ zIndex: -1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                )}
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="hidden lg:block">
            <Button href="/contact" className="!py-2.5">
              Krenimo zajedno
            </Button>
          </div>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-2 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            initial={{ clipPath: "inset(0 0 100% 0 round 0 0 44px 44px)" }}
            animate={{ clipPath: "inset(0 0 0% 0 round 0 0 0 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0 round 0 0 44px 44px)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 -z-10 overflow-hidden bg-background"
          >
            <motion.div
              aria-hidden="true"
              className="absolute -right-24 bottom-24 h-32 w-80 -rotate-35 rounded-[28px] bg-surface-2"
              initial={{ x: 200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
            <motion.div
              aria-hidden="true"
              className="absolute -right-10 bottom-6 h-32 w-80 -rotate-35 rounded-[28px] bg-accent"
              initial={{ x: 200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                delay: 0.4,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
            <nav className="relative flex h-full flex-col justify-center gap-1 px-6 pt-20 sm:px-10">
              {navLinks.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block overflow-hidden"
                >
                  <motion.span
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{
                      delay: 0.25 + i * 0.05,
                      duration: 0.7,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`block py-1 font-display text-5xl font-semibold tracking-tight sm:text-6xl ${
                      pathname === link.href
                        ? "text-accent-text"
                        : "text-foreground"
                    }`}
                  >
                    {link.label}
                  </motion.span>
                </Link>
              ))}
              <motion.a
                href={`mailto:${siteConfig.email}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="eyebrow mt-8 text-muted"
              >
                {siteConfig.email}
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
