"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/motion";
import { Button } from "@/components/ui/Button";
import { fieldClass, FormField } from "@/components/ui/Field";
import { Section, SectionHeading } from "@/components/ui/Section";
import { StarRatingDisplay, StarRatingInput } from "@/components/ui/StarRating";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { firestore } from "@/utils/firebase";
import { getAvgRating } from "@/lib/site";

type Review = {
  rating: number | null;
  name: string | null;
  company?: string | null;
  text: string | null;
  date: number;
};

const avgRating = await getAvgRating();

export default function ReviewPage() {
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [input, setInput] = useState<Review>({
    rating: null,
    name: null,
    company: null,
    text: null,
    date: Date.now(),
  });
  const [reviews, setReviews] = useState<Review[] | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await addDoc(collection(firestore, "reviews"), input);
    setSubmitted(true);
  }

  useEffect(() => {
    async function fetchReviews() {
      const snapshot = await getDocs(collection(firestore, "reviews"));
      const reviewsFormatted = snapshot.docs.map((doc) => ({
        rating: doc.data().rating,
        name: doc.data().name,
        company: doc.data().company,
        text: doc.data().text,
        date: doc.data().date,
      }));
      setReviews(reviewsFormatted);
    }

    fetchReviews();
  }, []);

  return (
    <Section className="pt-10 lg:pt-16">
      <SectionHeading
        eyebrow="Utisci klijenata"
        title="Šta klijenti kažu o nama."
        description="Pročitajte iskustva naših klijenata i ostavite svoj utisak o saradnji sa nama."
      />

      <Reveal
        delay={0.1}
        className="mt-12 flex flex-wrap items-center gap-6 rounded-panel bg-surface px-8 py-7 sm:px-10"
      >
        <span className="font-display text-6xl leading-none font-semibold tracking-tight sm:text-7xl">
          {avgRating > 0 ? avgRating.toFixed(1) : "—"}
        </span>
        <div>
          <StarRatingDisplay rating={avgRating} size={24} />
          <p className="mt-2 text-sm text-muted">prosečna ocena</p>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.1fr]">
        {/* Lista utisaka */}
        <div className="space-y-4">
          {reviews?.map((review, i) => (
            <Reveal key={`${review.name}-${i}`}>
              <div className="rounded-card bg-surface p-7">
                <StarRatingDisplay rating={review.rating ?? 0} />
                <p className="mt-5 text-lg leading-relaxed">{review.text}</p>
                <div className="mt-6 flex items-center gap-4 border-t-2 border-line pt-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent font-display text-lg font-semibold text-accent-ink">
                    {review.name?.charAt(0).toUpperCase() || "?"}
                  </div>
                  <div>
                    <p className="font-display text-lg leading-tight font-semibold">
                      {review.name}
                    </p>
                    <p className="mt-0.5 text-xs text-muted">
                      {review.company} ·{" "}
                      {new Date(review.date).toLocaleString("sr-RS")}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Forma za ostavljanje utiska */}
        <Reveal delay={0.1}>
          <div className="rounded-panel bg-surface p-7 sm:p-10 lg:sticky lg:top-28">
            <h3 className="text-3xl font-semibold tracking-tight">
              Ostavite utisak
            </h3>
            <p className="mt-2 text-muted">
              Podelite svoje iskustvo saradnje sa nama.
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="mt-8 flex flex-col items-center justify-center gap-4 py-12 text-center"
              >
                <CheckCircle2 className="h-14 w-14 text-accent" />
                <p className="font-display text-2xl font-semibold tracking-tight">
                  Hvala vam na utisku!
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div>
                  <span className="eyebrow text-muted">Vaša ocena</span>
                  <div className="mt-2">
                    <StarRatingInput
                      value={rating}
                      onChange={(e) => {
                        setRating(e);
                        setInput({ ...input, rating: e });
                      }}
                    />
                  </div>
                </div>

                <FormField label="Ime" htmlFor="name">
                  <input
                    id="name"
                    required
                    type="text"
                    onChange={(e) =>
                      setInput({ ...input, name: e.target.value })
                    }
                    placeholder="Unesite svoje ime"
                    className={fieldClass}
                  />
                </FormField>

                <FormField label="Firma (opciono)" htmlFor="company">
                  <input
                    id="company"
                    type="text"
                    onChange={(e) =>
                      setInput({ ...input, company: e.target.value })
                    }
                    placeholder="Naziv firme u kojoj radite"
                    className={fieldClass}
                  />
                </FormField>

                <FormField label="Vaš utisak" htmlFor="text">
                  <textarea
                    id="text"
                    required
                    rows={4}
                    onChange={(e) =>
                      setInput({ ...input, text: e.target.value })
                    }
                    placeholder="Kako biste opisali saradnju sa nama?"
                    className={`${fieldClass} resize-none`}
                  />
                </FormField>

                <Button type="submit" showArrow={false} className="w-full">
                  Pošaljite utisak
                </Button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
