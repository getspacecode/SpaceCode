"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, CheckCircle2, Globe } from "lucide-react";
import { Reveal } from "@/components/motion";
import { Button } from "@/components/ui/Button";
import { fieldClass, FormField } from "@/components/ui/Field";
import { Section, SectionHeading } from "@/components/ui/Section";
import { siteConfig } from "@/lib/site";
import { addDoc, collection } from "firebase/firestore";
import { firestore } from "@/utils/firebase";

const contactDetails = [
  {
    icon: Mail,
    label: "Imejl",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: Phone,
    label: "Telefon",
    value: siteConfig.phone,
    href: `tel:${siteConfig.phone.replace(/\s/g, "")}`,
  },
  {
    icon: Phone,
    label: "Telefon",
    value: siteConfig.phone2,
    href: `tel:${siteConfig.phone2.replace(/\s/g, "")}`,
  },
  {
    icon: Globe,
    label: "Veb-sajt",
    value: siteConfig.website,
    href: `https://${siteConfig.website}`,
  },
  { icon: MapPin, label: "Lokacija", value: siteConfig.location },
  { icon: Clock, label: "Vreme odgovora", value: "U roku od jednog dana" },
];

type Messages = {
  name: string;
  email: string;
  project: string;
  details: string;
};

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [input, setInput] = useState<Messages>({
    name: "",
    email: "",
    project: "",
    details: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await addDoc(collection(firestore, "message"), input);
    setSubmitted(true);
  }

  return (
    <Section className="pt-10 lg:pt-16">
      <SectionHeading
        eyebrow="Kontakt"
        title="Razgovarajmo o vašem projektu."
        description="Ostavite nam svoje kontakt podatke i ukratko opišite svoj projekat. Odgovorićemo vam u roku od jednog dana."
      />

      <div className="mt-14 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        {/* Kontakt informacije */}
        <div className="space-y-3">
          {contactDetails.map((detail, i) => {
            const body = (
              <>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-background transition-colors duration-300 group-hover:bg-accent group-hover:text-accent-ink">
                  <detail.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="eyebrow text-muted">{detail.label}</p>
                  <p className="mt-1 truncate font-display text-lg font-medium">
                    {detail.value}
                  </p>
                </div>
              </>
            );

            return (
              <Reveal key={`${detail.label}-${i}`} delay={i * 0.05}>
                {detail.href ? (
                  <a
                    href={detail.href}
                    className="group flex items-center gap-4 rounded-card bg-surface p-4 pr-6 transition-colors duration-300 hover:bg-surface-2"
                  >
                    {body}
                  </a>
                ) : (
                  <div className="group flex items-center gap-4 rounded-card bg-surface p-4 pr-6">
                    {body}
                  </div>
                )}
              </Reveal>
            );
          })}
        </div>

        {/* Kontakt forma */}
        <Reveal delay={0.1}>
          <div className="rounded-panel bg-surface p-7 sm:p-10">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="flex flex-col items-center justify-center gap-4 py-20 text-center"
              >
                <CheckCircle2 className="h-14 w-14 text-accent" />
                <p className="font-display text-3xl font-semibold tracking-tight">
                  Poruka je poslata!
                </p>
                <p className="max-w-xs text-muted">
                  Hvala što ste nas kontaktirali. Javićemo vam se u roku od
                  jednog dana.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <FormField label="Ime" htmlFor="name">
                    <input
                      id="name"
                      required
                      onChange={(e) =>
                        setInput({ ...input, name: e.target.value })
                      }
                      type="text"
                      placeholder="Vaše ime"
                      className={fieldClass}
                    />
                  </FormField>

                  <FormField label="Imejl adresa" htmlFor="email">
                    <input
                      id="email"
                      required
                      type="email"
                      onChange={(e) =>
                        setInput({ ...input, email: e.target.value })
                      }
                      placeholder="vi@firma.com"
                      className={fieldClass}
                    />
                  </FormField>
                </div>

                <FormField label="Vrsta projekta" htmlFor="budget">
                  <select
                    id="budget"
                    className={fieldClass}
                    defaultValue=""
                    onChange={(e) =>
                      setInput({ ...input, project: e.target.value })
                    }
                  >
                    <option value="" disabled>
                      Izaberite vrstu projekta
                    </option>
                    <option value="Landing page">Landing Page</option>
                    <option value="Multi-page website">Multi-Page site</option>
                    <option value="Dynamic website">Dynamic site</option>
                    <option value="Additional features">
                      Dodatne funkcionalnosti
                    </option>
                    <option value="Monthly maintenance">
                      Mesečno održavanje
                    </option>
                    <option value="Something else">Nešto drugo</option>
                  </select>
                </FormField>

                <FormField label="Detalji projekta" htmlFor="message">
                  <textarea
                    id="message"
                    required
                    onChange={(e) =>
                      setInput({ ...input, details: e.target.value })
                    }
                    rows={5}
                    placeholder="Ukratko nam opišite šta želite da napravimo."
                    className={`${fieldClass} resize-none`}
                  />
                </FormField>

                <Button type="submit" showArrow={false} className="w-full">
                  Pošaljite poruku
                </Button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
