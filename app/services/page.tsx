"use client";

import { Check } from "lucide-react";
import { Reveal } from "@/components/motion";
import { Button } from "@/components/ui/Button";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/Section";
import { SweepCard } from "@/components/ui/SweepCard";
import {
  addons,
  addonsNote,
  included,
  includedNote,
  maintenance,
  pricingNote,
  websites,
} from "@/lib/pricing";

export default function ServicesPage() {
  return (
    <>
      <Section className="pb-8 lg:pb-8">
        <SectionHeading
          eyebrow="Usluge & cene"
          title="Jasne definisane usluge. Jasne cene."
          description="Izaberite tip sajta koji vam je potreban i dodajte sve što želite uz njega. Ako imate neki poseban zahtev koji se ne uklapa u ponuđene opcije, slobodno nam recite."
        />

        <Reveal
          delay={0.1}
          className="mt-12 rounded-panel bg-surface p-7 sm:p-10"
        >
          <div className="eyebrow text-muted">
            Besplatne pogodnosti koje dobijate uz svaki sajt
          </div>
          <ul className="mt-5 flex flex-wrap gap-3">
            {included.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2.5 rounded-full bg-background px-5 py-3 text-[15px] font-medium"
              >
                <Check className="h-4 w-4 text-accent-text" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted">
            {includedNote}
          </p>
        </Reveal>
      </Section>

      {/* ---------- Websites ---------- */}
      <Section className="pt-8 lg:pt-12">
        <Reveal>
          <Eyebrow>Veb-sajtovi</Eyebrow>
        </Reveal>
        <div className="mt-8 space-y-4">
          {websites.map((site, i) => (
            <Reveal key={site.title} delay={i * 0.07}>
              <SweepCard radius="rounded-panel">
                <div className="grid gap-8 p-8 sm:p-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
                  <div>
                    <span className="eyebrow text-muted transition-colors duration-500 group-hover:text-accent-ink">
                      0{i + 1}
                    </span>
                    <h3 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">
                      {site.title}
                    </h3>
                    <p className="mt-5 max-w-md text-lg leading-relaxed text-muted transition-colors duration-500 group-hover:text-accent-ink/80">
                      {site.description}
                    </p>
                  </div>
                  <div className="font-display text-[clamp(3rem,8vw,6.2rem)] leading-none font-semibold tracking-[-0.04em] whitespace-nowrap lg:text-right">
                    {site.price}
                    <span className="ml-2 text-[0.45em] tracking-normal">
                      €
                    </span>
                  </div>
                </div>
              </SweepCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------- Add-ons ---------- */}
      <Section className="pt-8 lg:pt-12">
        <Reveal>
          <Eyebrow>dodatne pogodnosti</Eyebrow>
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {addons.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.07}>
              <SweepCard className="h-full">
                <div className="flex h-full flex-col p-8">
                  <div className="font-display text-5xl font-semibold tracking-tight">
                    {item.price}
                    <span className="ml-1.5 text-2xl">€</span>
                  </div>
                  <h3 className="mt-10 text-2xl font-semibold tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted transition-colors duration-500 group-hover:text-accent-ink/80">
                    {item.description}
                  </p>
                </div>
              </SweepCard>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="mt-6 text-sm text-muted">{addonsNote}</p>
        </Reveal>
      </Section>

      {/* ---------- Maintenance ---------- */}
      <Section className="pt-8 lg:pt-12">
        <Reveal>
          <div className="relative overflow-hidden rounded-panel bg-accent p-8 text-accent-ink sm:p-14">
            <div
              aria-hidden="true"
              className="absolute -right-24 -bottom-20 hidden h-44 w-[28rem] -rotate-35 rounded-[40px] bg-accent-ink/90 sm:block"
            />
            <div
              aria-hidden="true"
              className="absolute right-28 -bottom-32 hidden h-44 w-[28rem] -rotate-35 rounded-[40px] bg-accent-ink/15 sm:block"
            />
            <div className="eyebrow relative">Mesecno</div>
            <h3 className="relative mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">
              {maintenance.title}
            </h3>
            <div className="relative mt-8 font-display text-[clamp(3.6rem,10vw,8rem)] leading-none font-semibold tracking-[-0.04em]">
              {maintenance.price}
              <span className="ml-2 text-[0.4em] tracking-normal">€ / mo.</span>
            </div>
            <p className="relative mt-8 max-w-xl text-lg leading-relaxed">
              {maintenance.description}
            </p>
          </div>
        </Reveal>

        <Reveal>
          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-muted">
            {pricingNote}
          </p>
        </Reveal>
      </Section>

      <Section className="pt-8 text-center lg:pt-12">
        <Reveal>
          <div className="rounded-panel bg-surface px-8 py-14 sm:px-12 sm:py-20">
            <h3 className="mx-auto max-w-2xl text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[1] tracking-[-0.03em]">
              Niste sigurni sta vam je potrebno?
            </h3>
            <p className="mx-auto mt-5 max-w-md text-lg leading-relaxed text-muted">
              Opisite nam vase ideje ili problema i zajedno cemo doci do
              resenja.
            </p>
            <div className="mt-8 flex justify-center">
              <Button href="/contact">Javite nam se</Button>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
