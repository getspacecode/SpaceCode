"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Clock, Layers } from "lucide-react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "@/utils/firebase";
import { Reveal, SplitWords } from "@/components/motion";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import type { Project } from "@/lib/projects";
import Image from "next/image";

async function fetchProject(id: string): Promise<Project | null> {
  const q = query(collection(firestore, "projects"), where("id", "==", id));
  const snapshot = await getDocs(q);
  const docSnap = snapshot.docs[0];

  if (!docSnap) return null;

  return {
    id: docSnap.data().id,
    ...docSnap.data(),
  } as Project;
}

export default function ProjectDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;

    let cancelled = false;
    setLoading(true);
    setNotFound(false);

    fetchProject(id)
      .then((result) => {
        if (cancelled) return;
        if (!result) {
          setNotFound(true);
        } else {
          setProject(result);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch project:", err);
        if (!cancelled) setNotFound(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <Section className="pt-16">
        <p className="eyebrow text-muted">Učitavanje projekta…</p>
      </Section>
    );
  }

  if (notFound || !project) {
    return (
      <Section className="pt-16 text-center">
        <h1 className="text-5xl font-semibold tracking-tight">
          Projekat nije pronađen
        </h1>
        <p className="mt-4 text-muted">
          Ovaj projekat je možda uklonjen ili je link neispravan.
        </p>
        <div className="mt-8 flex justify-center">
          <Button href="/projects" showArrow={false}>
            Svi projekti
          </Button>
        </div>
      </Section>
    );
  }

  const meta = [
    { icon: User, label: "Klijent", value: project.client },
    { icon: Layers, label: "Kategorija", value: project.category },
    { icon: Clock, label: "Trajanje", value: project.duration },
    { icon: Calendar, label: "Godina", value: project.year },
  ];

  const story = [
    { title: "Pregled projekta", text: project.description },
    { title: "Izazov", text: project.challenge },
    { title: "Naše rešenje", text: project.solution },
    { title: "Rezultati", text: project.results },
  ];

  return (
    <>
      <Section className="pt-10 pb-8 lg:pt-16 lg:pb-8">
        <Link
          href="/projects"
          className="group inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
          Svi projekti
        </Link>

        <div className="mt-8 flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-4xl">
            <span className="eyebrow text-accent-text">{project.category}</span>
            <h1 className="mt-4 text-[clamp(2.8rem,8vw,7rem)] font-semibold leading-[0.94] tracking-[-0.04em]">
              <SplitWords text={project.title} />
            </h1>
            <Reveal delay={0.3}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
                {project.summary}
              </p>
            </Reveal>
          </div>
          {project.liveUrl && (
            <Button href={project.liveUrl}>Pogledaj sajt</Button>
          )}
        </div>
      </Section>

      <Section className="pt-6 lg:pt-8">
        <Reveal>
          <div className="h-72 overflow-hidden rounded-panel bg-surface-2 sm:h-[34rem]">
            <Image
              src={project.image}
              alt=""
              width={200}
              height={200}
              className="h-full w-full object-cover"
              unoptimized
            />
          </div>
        </Reveal>
      </Section>

      <Section className="grid gap-12 pt-8 lg:grid-cols-[1fr_0.7fr] lg:pt-12">
        <div className="space-y-12">
          {story.map((item) => (
            <Reveal key={item.title}>
              <h2 className="text-3xl font-semibold tracking-tight">
                {item.title}
              </h2>
              <p className="mt-4 text-[17px] leading-relaxed text-muted">
                {item.text}
              </p>
            </Reveal>
          ))}
        </div>

        <div className="space-y-4 lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <div className="rounded-card bg-surface p-7">
              <h3 className="eyebrow text-muted">Detalji projekta</h3>
              <dl className="mt-6 space-y-5">
                {meta.map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-background">
                      <item.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <dt className="text-xs text-muted">{item.label}</dt>
                      <dd className="font-display text-lg leading-tight font-medium">
                        {item.value}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rounded-card bg-surface p-7">
              <h3 className="eyebrow text-muted">Uloga</h3>
              <p className="mt-3 font-display text-lg font-medium">
                {project.role}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="rounded-card bg-surface p-7">
              <h3 className="eyebrow text-muted">Korišćene tehnologije</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-background px-4 py-1.5 text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section className="text-center">
        <Reveal>
          <div className="rounded-panel bg-surface px-8 py-16 sm:py-24">
            <h2 className="mx-auto max-w-2xl text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[1] tracking-[-0.03em]">
              Imate sličnu ideju?
            </h2>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button href="/contact">Započnite projekat</Button>
              <Button href="/projects" variant="ghost" showArrow={false}>
                Svi projekti
              </Button>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
