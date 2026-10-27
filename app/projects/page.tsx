"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion";
import { Section, SectionHeading } from "@/components/ui/Section";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/utils/firebase";
import Image from "next/image";

type ProjectsSmall = {
  id: string;
  image: string;
  title: string;
  summary: string;
  tags: string[];
  category: string;
  year: string;
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectsSmall[] | null>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const snapshot = await getDocs(collection(firestore, "projects"));
        const projectsFormated = snapshot.docs.map((doc) => ({
          id: doc.data().id,
          title: doc.data().title,
          summary: doc.data().summary,
          category: doc.data().category,
          tags: doc.data().tags,
          image: doc.data().image,
          year: doc.data().year,
        }));

        console.log(projectsFormated);
        setProjects(projectsFormated as any);
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, []);

  return (
    <Section className="pt-10 lg:pt-16">
      <SectionHeading
        eyebrow="Projekti"
        title="Izdvojeni radovi."
        description="Pogledajte neke od naših projekata — svaki sajt je izrađen, objavljen i spreman za upotrebu."
      />

      <div className="mt-14 grid gap-x-5 gap-y-10 lg:grid-cols-2">
        {projects?.map((project, i) => (
          <Reveal
            key={project.id}
            delay={(i % 2) * 0.1}
            className={i % 2 === 1 ? "lg:mt-24" : ""}
          >
            <Link href={`/projects/${project.id}`} className="group block">
              <motion.div
                whileHover={{ scale: 0.985 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="overflow-hidden rounded-panel bg-surface-2"
              >
                <div className="h-72 overflow-hidden sm:h-96">
                  <Image
                    src={project.image ?? "asd"}
                    alt=""
                    width={200}
                    height={200}
                    className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                    unoptimized
                  />
                </div>
              </motion.div>

              <div className="mt-6 px-2">
                <div className="eyebrow flex items-center justify-between text-muted">
                  <span>{project.category}</span>
                  <span>{project.year}</span>
                </div>

                <div className="mt-3 flex items-start justify-between gap-4">
                  <h3 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                    {project.title}
                  </h3>

                  <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-surface transition-colors duration-300 group-hover:bg-accent group-hover:text-accent-ink">
                    <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:rotate-45" />
                  </span>
                </div>

                <p className="mt-3 max-w-lg leading-relaxed text-muted">
                  {project.summary}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-surface px-4 py-1.5 text-xs font-medium text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
