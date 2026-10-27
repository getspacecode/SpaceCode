import { Mail } from "lucide-react";
import Link from "next/link";
import { navLinks, siteConfig } from "@/lib/site";
import { GithubIcon, InstagramIcon } from "./icons";
import { Logo, Wordmark } from "./Logo";

const social = "flex h-11 w-11 items-center justify-center rounded-full bg-surface-2 text-foreground transition-colors duration-300 hover:bg-accent hover:text-accent-ink";

export function Footer() {
  return (
    <footer className="mt-12 px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="relative mx-auto max-w-[1240px] overflow-hidden rounded-panel bg-surface px-6 py-14 sm:px-12 sm:py-16">
        <Logo className="pointer-events-none absolute -right-10 -bottom-24 hidden h-[420px] w-auto opacity-[0.07] md:block" />

        <div className="relative grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <Logo className="h-9 w-auto" />
              <Wordmark />
            </Link>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted">{siteConfig.description}</p>
            <div className="mt-7 flex items-center gap-3">
              <a href={siteConfig.social.github} className={social} aria-label="GitHub">
                <GithubIcon className="h-5 w-5" />
              </a>
              <a href={siteConfig.social.instagram} className={social} aria-label="Instagram">
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a href={`mailto:${siteConfig.email}`} className={social} aria-label="Email">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="eyebrow text-muted">Navigate</h3>
            <ul className="mt-5 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-display text-lg font-medium transition-colors hover:text-accent-text"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="eyebrow text-muted">Contact</h3>
            <ul className="mt-5 space-y-2.5 text-[15px]">
              <li>
                <a href={`mailto:${siteConfig.email}`} className="hover:text-accent-text">
                  {siteConfig.email}
                </a>
              </li>
              <li>{siteConfig.phone}</li>
              <li>{siteConfig.phone2}</li>
              <li className="text-muted">{siteConfig.location}</li>
              <li>
                <a href={`https://${siteConfig.website}`} className="hover:text-accent-text">
                  {siteConfig.website}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="relative mt-14 border-t border-line pt-6 text-xs text-muted">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
