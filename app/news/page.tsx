"use client";

import { Calendar } from "lucide-react";
import { Reveal } from "@/components/motion";
import { Section, SectionHeading } from "@/components/ui/Section";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/utils/firebase";

type News = {
  id: string;
  title: string;
  content: string;
  date: Date;
};

export default function NewsPage() {
  const [news, setNews] = useState<News[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      const query = await getDocs(collection(firestore, "news"));

      const newsData = query.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setNews(newsData as any);
    };

    fetchNews();
  }, []);

  return (
    <Section className="pt-10 lg:pt-16">
      <SectionHeading
        eyebrow="Novosti"
        title="Najnovije iz našeg studija."
        description="Novosti iz našeg studija — novi projekti, usluge i sve ostalo što vredi podeliti sa vama."
      />

      <div className="mt-14 space-y-4">
        {news.length === 0 ? (
          <p>Trenutno nema novosti.</p>
        ) : (
          news.map((post, i) => (
            <Reveal key={post.id ?? i} delay={0.04}>
              <article className="group grid gap-6 rounded-panel bg-surface p-7 transition-colors duration-500 hover:bg-surface-2 sm:p-10 md:grid-cols-[0.55fr_1.45fr]">
                <div className="flex items-start gap-2 text-sm text-muted">
                  <Calendar className="mt-0.5 h-4 w-4" />
                  {new Date(post.date).toLocaleString("sr-RS")}
                </div>
                <div>
                  <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                    {post.title}
                  </h2>
                  <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-muted">
                    {post.content}
                  </p>
                </div>
              </article>
            </Reveal>
          ))
        )}
      </div>
    </Section>
  );
}
