"use client";

import { Target, Users, Zap } from "lucide-react";
import { Reveal } from "@/components/motion";
import { Button } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import { SweepCard } from "@/components/ui/SweepCard";

const values = [
  {
    icon: Zap,
    title: "Prvo izrada, pa usavršavanje",
    description:
      "Radije ćemo vam što pre predstaviti funkcionalnu verziju nego usavršavati nešto što još niko nije video.",
  },
  {
    icon: Target,
    title: "Svaki projekat ima cilj",
    description:
      "Svaka stranica ima svoju svrhu — da podstakne posetioca da vas kontaktira, kupi proizvod ili sazna nešto novo. Dizajn prilagođavamo tom cilju.",
  },
  {
    icon: Users,
    title: "Uvek ste u toku",
    description:
      "Redovno vas obaveštavamo o napretku projekta, umesto da dve nedelje ne znate šta se dešava, a zatim dobijete neočekivano iznenađenje.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Section className="pb-8 lg:pb-8">
        <SectionHeading
          eyebrow="O nama"
          title="O studiju SpaceCode"
          description="Mali studio za izradu veb sajtova i aplikacija, zasnovan na jednostavnoj ideji: vaš sajt treba da radi jednako vredno kao i vi."
        />
      </Section>

      <Section className="grid gap-12 pt-8 lg:grid-cols-2 lg:pt-12">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Kako smo počeli
          </h2>
          <div className="mt-6 space-y-5 text-[17px] leading-relaxed text-muted">
            <p>
              Od pocetka smo uvek bili samo nas dvojica brace. Bili smo
              ambiciozni, ucili o ovoj struci i angazovali se i uvek bili radni.
              Oduvek smo bili bliski i uvek delili sve na pola. Bila su i
              vremena kada smo radili fizicke radove da bi jedan drugog
              podrzali.
            </p>
            <p>
              Sve je pocelo kao deciji san zajednicke uspesne buducnosti o kome
              i dan danas mastamo i razgovaramo. Vremenom smo sazreli i postali
              stariji cime je i nas ulazak u poslovan zivot krenuo sa istim
              snom.
            </p>
            <p>
              Ovo je poruka za sve da jurite za svojima snovima i gurate ka svom
              cilju koliko god mozete.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Čemu težimo
          </h2>
          <p className="mt-6 text-[17px] leading-relaxed text-muted">
            Tezimo ka tome da svojim klijentima izrucimo pre svega alatku koja
            ce im pomoci u poslu i zajedno sa tim stvorimo odnos sa klijentima
            pun medjusobnog postovanja i dobrote. Krajnji cilj svakog projekta
            je da potraje klijentu i godinama nakon objavljivanja.
          </p>
          <div className="relative mt-10 overflow-hidden rounded-panel bg-accent p-8 text-accent-ink sm:p-10">
            <div
              aria-hidden="true"
              className="absolute -right-12 -bottom-14 hidden h-28 w-64 -rotate-35 rounded-[30px] bg-accent-ink/85 sm:block"
            />
            <p className="relative max-w-sm font-display text-2xl leading-tight font-semibold tracking-tight sm:text-3xl">
              Sajt koji je spreman za objavljivanje treba da bude i sajt na koji
              smo ponosni.
            </p>
          </div>
        </Reveal>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Naše vrednosti"
          title="Ono do čega nam je stalo"
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {values.map((value, i) => (
            <Reveal key={value.title} delay={i * 0.08}>
              <SweepCard className="h-full">
                <div className="p-8">
                  <value.icon className="h-8 w-8" />
                  <h3 className="mt-14 text-2xl font-semibold tracking-tight">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted transition-colors duration-500 group-hover:text-accent-ink/80">
                    {value.description}
                  </p>
                </div>
              </SweepCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="text-center">
        <SectionHeading align="center" title="Želite da sarađujemo?" />
        <Reveal className="mt-8 flex justify-center">
          <Button href="/contact">Kontaktirajte nas</Button>
        </Reveal>
      </Section>
    </>
  );
}
