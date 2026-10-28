"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { HeroSlabs } from "@/components/home/HeroSlabs";
import { Marquee } from "@/components/home/Marquee";
import { CountUp, Magnetic, Reveal, SplitWords } from "@/components/motion";
import { Button } from "@/components/ui/Button";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/Section";
import { StarRatingDisplay } from "@/components/ui/StarRating";
import { getAvgRating, getProjectsCount, siteConfig } from "@/lib/site";

const avgRating = await getAvgRating();
const projectsCount = await getProjectsCount();

const services = [
  {
    title: "Landing Page",
    price: "75 €",
    description:
      "Jedna stranica u cilju jednostavnog predstavljanja vasih radova i profesionalnosti.",
  },
  {
    title: "Multi-Page site",
    price: "150 €",
    description:
      "Vise stranica koje organizuju informacije u vise sekcija s ciljem bolje preglednosti.",
  },
  {
    title: "Dynamic site",
    price: "250–500 €",
    description:
      "Veb aplikacija s glavnom ulogom obrade podataka i laksom organizacijom i dostupnosti klijentima.",
  },
  {
    title: "Monthly maintenance",
    price: "25 € / mo",
    description:
      "Proveravamo vas sajt svake nedelje u cilju resavanja mogucih gresaka ili napada.",
  },
];

const ticker = [
  "Landing Page · 75 €",
  "Multi-Page · 150 €",
  "Dynamic site · 250–500 €",
  "Animations · 30 €",
  "Authentication · 35–75 €",
  "Online payments · 75 €",
  "Maintenance · 25 € / mo",
];

export default function HomePage() {
  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden">
        <HeroSlabs className="pointer-events-none absolute top-24 -right-24 h-[420px] w-auto opacity-30 sm:right-0 sm:h-[520px] sm:opacity-100 lg:top-20 lg:right-[3%] lg:h-[600px]" />

        <div className="relative mx-auto max-w-[1240px] px-5 pt-14 pb-16 sm:px-8 lg:pt-24 lg:pb-24">
          <Reveal y={12}>
            <Eyebrow>Web development studio · {siteConfig.location}</Eyebrow>
          </Reveal>

          <h1 className="mt-8 max-w-[11ch] text-[clamp(3rem,9.4vw,8.6rem)] font-semibold leading-[0.92] tracking-[-0.04em] sm:max-w-[10ch] lg:max-w-[9.5ch]">
            <SplitWords
              text="Vase digitalno prisustvo ZNACI"
              highlight={["ZNACI", "Vase"]}
              delay={0.2}
            />
          </h1>

          <Reveal delay={0.9} className="mt-10 max-w-md">
            <p className="text-lg leading-relaxed text-muted">
              SpaceCode je manje poznat studio za izradu veb-sajtova. Pravimo
              sve od manjih veb-sajtova cija je svrha jednostavan digitalni
              prikaz do kompleksnih veb aplikacija sa komplikovanim radom na
              podacima.
            </p>
          </Reveal>

          <Reveal delay={1.05} className="mt-9 flex flex-wrap gap-4">
            <Magnetic>
              <Button href="/contact">Krenimo zajedno</Button>
            </Magnetic>
            <Magnetic>
              <Button href="/projects" variant="ghost">
                Pogledajte nase radove
              </Button>
            </Magnetic>
          </Reveal>

          <Reveal
            delay={1.2}
            className="mt-20 grid max-w-3xl grid-cols-3 gap-4 border-t-2 border-line pt-8 sm:gap-8"
          >
            <div>
              <div className="font-display text-4xl font-semibold tracking-tight sm:text-6xl">
                {avgRating > 0 ? <CountUp to={avgRating} decimals={1} /> : "—"}
                <span className="text-lg text-muted sm:text-2xl">/5</span>
              </div>
              <div className="mt-2 text-xs leading-snug text-muted sm:text-sm">
                Prosecna ocena
              </div>
            </div>
            <div>
              <div className="font-display text-4xl font-semibold tracking-tight sm:text-6xl">
                <CountUp to={projectsCount} />+
              </div>
              <div className="mt-2 text-xs leading-snug text-muted sm:text-sm">
                Uradjeni projekti
              </div>
            </div>
            <div>
              <div className="font-display text-4xl font-semibold tracking-tight sm:text-6xl">
                &lt; 3h
              </div>
              <div className="mt-2 text-xs leading-snug text-muted sm:text-sm">
                Prosecno vreme odgovora
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Ticker ---------- */}
      <div className="mx-auto max-w-[1240px] px-3 sm:px-5">
        <Marquee items={ticker} />
      </div>

      {/* ---------- What we do ---------- */}
      <Section>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Servisi i cene"
            title="Šta mi radimo?"
            description="Sve što zamislite, ostvarujemo želje u digitalnom svetu"
          />
          <Reveal>
            <Link
              href="/services"
              className="group flex items-center gap-2 font-display text-lg font-medium text-accent-text"
            >
              Svi servisi i ostale ponude
              <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 space-y-3">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.06}>
              <Link
                href="/services"
                className="group relative flex flex-col gap-4 overflow-hidden rounded-card bg-surface px-6 py-7 sm:flex-row sm:items-center sm:gap-10 sm:px-10 sm:py-9"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 -left-[30%] w-[160%] -translate-x-full -skew-x-35 bg-accent transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-0"
                />
                <span className="eyebrow relative text-muted transition-colors duration-500 group-hover:text-accent-ink">
                  0{i + 1}
                </span>
                <h3 className="relative flex-1 text-3xl font-semibold tracking-tight transition-colors duration-500 group-hover:text-accent-ink sm:text-5xl">
                  {service.title}
                </h3>
                <p className="relative max-w-xs text-sm leading-relaxed text-muted transition-colors duration-500 group-hover:text-accent-ink/80">
                  {service.description}
                </p>
                <span className="relative flex items-center gap-3 font-display text-2xl font-semibold whitespace-nowrap transition-colors duration-500 group-hover:text-accent-ink sm:w-44 sm:justify-end">
                  {service.price}
                  <ArrowUpRight className="hidden h-6 w-6 sm:block" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------- Reviews ---------- */}
      <Section className="py-8 lg:py-8">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-8 rounded-panel bg-surface p-8 sm:flex-row sm:items-center sm:p-14">
            <div>
              <div className="eyebrow text-muted">Recenzije klijenata</div>
              <div className="mt-4 flex items-end gap-5">
                <span className="font-display text-7xl font-semibold leading-none tracking-tight sm:text-8xl">
                  {avgRating > 0 ? avgRating.toFixed(1) : "—"}
                </span>
                <div className="pb-2">
                  <StarRatingDisplay rating={avgRating} size={22} />
                  <p className="mt-2 text-sm text-muted">prosecna ocena</p>
                </div>
              </div>
            </div>
            <Button href="/review" variant="dark">
              Procitaj recenzije
            </Button>
          </div>
        </Reveal>
      </Section>

      {/* ---------- CTA ---------- */}
      <Section>
        <Reveal>
          <div className="relative overflow-hidden rounded-panel bg-accent px-8 py-16 text-accent-ink sm:px-16 sm:py-24">
            <div
              aria-hidden="true"
              className="absolute -right-24 -bottom-16 hidden h-40 w-[26rem] -rotate-35 rounded-[40px] bg-accent-ink/90 sm:block"
            />
            <div
              aria-hidden="true"
              className="absolute right-24 -bottom-28 hidden h-40 w-[26rem] -rotate-35 rounded-[40px] bg-accent-ink/15 sm:block"
            />
            <h2 className="relative max-w-3xl text-[clamp(2.6rem,6.5vw,5.8rem)] font-semibold leading-[0.95] tracking-[-0.035em]">
              Imas ideju u glavi?
            </h2>
            <p className="relative mt-6 max-w-md text-lg leading-relaxed">
              Mozes nam reci i zajedno je mozemo realizovati.
            </p>
            <div className="relative mt-10">
              <Magnetic>
                <Button href="/contact" variant="ink">
                  Javi nam se
                </Button>
              </Magnetic>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
