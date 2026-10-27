"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  Newspaper,
  FolderKanban,
  LayoutDashboard,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { ADMIN_PASSWORD as ENV_ADMIN_PASSWORD, siteConfig } from "@/lib/site";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { firestore } from "@/utils/firebase";
import { Project } from "@/lib/projects";

const ADMIN_PASSWORD = ENV_ADMIN_PASSWORD;
console.log(ADMIN_PASSWORD);
type Tab = "overview" | "messages" | "news" | "projects";

export default function AdminPage() {
  const [unlocked, setUnlocked] = useState(false);

  return unlocked ? (
    <AdminDashboard />
  ) : (
    <PasswordGate onSuccess={() => setUnlocked(true)} />
  );
}

function PasswordGate({ onSuccess }: { onSuccess: () => void }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (value === ADMIN_PASSWORD) {
      setError(false);
      onSuccess();
    } else {
      setError(true);
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-140px)] items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md rounded-panel bg-surface p-9"
      >
        <div className="flex flex-col items-center text-center">
          <Logo className="h-12 w-auto" />
          <div className="mt-6 flex h-12 w-12 items-center justify-center rounded-full bg-accent">
            <Lock className="h-5 w-5 text-accent-ink" />
          </div>
          <h1 className="mt-5 text-3xl font-semibold tracking-tight">
            Team access
          </h1>
          <p className="mt-2 text-sm text-muted">
            Enter the shared password to reach the admin dashboard.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <input
              type="password"
              autoFocus
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                setError(false);
              }}
              placeholder="Password"
              className={`w-full rounded-field border-2 bg-background px-5 py-3.5 text-[15px] text-foreground placeholder:text-muted/60 focus:outline-none ${
                error
                  ? "border-red-500"
                  : "border-transparent focus:border-accent"
              }`}
            />
            {error && (
              <p className="mt-2 flex items-center gap-1.5 text-xs text-red-400">
                <AlertCircle className="h-3.5 w-3.5" />
                That password isn't right — check with the team.
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-accent py-3.5 text-[15px] font-semibold text-accent-ink transition-colors duration-300 hover:bg-foreground hover:text-background"
          >
            Enter dashboard
          </button>
        </form>
      </motion.div>
    </div>
  );
}

function AdminDashboard() {
  const [tab, setTab] = useState<Tab>("overview");

  const tabs: { id: Tab; label: string; icon: typeof LayoutDashboard }[] = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "messages", label: "Messages", icon: MessageSquare },
    { id: "news", label: "Post news", icon: Newspaper },
    { id: "projects", label: "Post project", icon: FolderKanban },
  ];

  return (
    <div className="mx-auto max-w-[1100px] px-5 py-12 sm:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight">
            {siteConfig.name} admin
          </h1>
          <p className="mt-1 text-sm text-muted">
            Post updates to the site — visible only to your team.
          </p>
        </div>
      </div>

      <div className="mt-8 flex gap-2 overflow-x-auto pb-1">
        {tabs.map((t) => (
          <button
            type="button"
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 whitespace-nowrap rounded-full px-5 py-3 text-sm font-medium transition-colors duration-300 ${
              tab === t.id
                ? "bg-accent text-accent-ink"
                : "bg-surface text-muted hover:text-foreground"
            }`}
          >
            <t.icon className="h-4 w-4" />
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-10">
        {tab === "overview" && <OverviewTab />}
        {tab === "messages" && <MessagesTab />}
        {tab === "news" && <NewsForm />}
        {tab === "projects" && <ProjectForm />}
      </div>
    </div>
  );
}

function OverviewTab() {
  const stats = [
    { label: "Published projects", value: "2" },
    { label: "News posts", value: "1" },
    { label: "Reviews", value: "1" },
  ];

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-card bg-surface p-6"
          >
            <div className="font-display text-5xl font-semibold tracking-tight text-accent-text">
              {stat.value}
            </div>
            <div className="mt-1 text-sm text-muted">{stat.label}</div>
          </div>
        ))}
      </div>
      <div className="mt-6 rounded-card bg-surface p-6 text-sm leading-relaxed text-muted">
        These numbers are placeholders. Once the database is connected, this tab
        is a good place to show real counts, recent submissions, and pending
        reviews to approve.
      </div>
    </div>
  );
}

// ---- Messages tab ----
// Reads every document from the "messages" collection (populated by the
// contact page form) and lists them newest-first. Handles Firestore
// Timestamps, ISO strings, or plain numbers in `createdAt` — however you end
// up storing it when you wire the contact form's submit handler.

type ContactMessage = {
  id: string;
  name?: string;
  email?: string;
  project?: string;
  details?: string;
};

function toMillis(value: any): number {
  if (!value) return 0;
  if (typeof value === "number") return value;
  if (typeof value.toMillis === "function") return value.toMillis(); // Firestore Timestamp
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? 0 : parsed;
}

function formatDate(value: any): string {
  const millis = toMillis(value);
  if (!millis) return "Unknown date";
  return new Date(millis).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

async function fetchMessages(): Promise<ContactMessage[]> {
  const snapshot = await getDocs(collection(firestore, "message"));
  const messages = snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  })) as ContactMessage[];
  return messages;
}

function MessagesTab() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetchMessages()
      .then((result) => {
        if (!cancelled) setMessages(result);
      })
      .catch((err) => {
        console.error("Failed to fetch messages:", err);
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return <p className="text-sm text-muted">Loading messages…</p>;
  }

  if (error) {
    return (
      <div className="rounded-card bg-surface p-6 text-sm text-muted">
        Couldn't load messages — check that the "messages" collection exists in
        Firestore.
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="rounded-panel bg-surface p-10 text-center">
        <MessageSquare className="mx-auto h-8 w-8 text-muted" />
        <p className="mt-3 text-sm text-muted">
          No messages yet — submissions from the contact form will show up here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className="rounded-card bg-surface p-6"
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent font-display text-base font-semibold text-accent-ink">
                {msg.name?.charAt(0).toUpperCase() || "?"}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {msg.name || "Unnamed"}
                </p>
                {msg.email && (
                  <a
                    href={`mailto:${msg.email}`}
                    className="text-xs text-muted hover:text-accent-text"
                  >
                    {msg.email}
                  </a>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              {msg.project && (
                <span className="rounded-full bg-background px-4 py-1.5 text-xs font-medium text-muted">
                  {msg.project}
                </span>
              )}
            </div>
          </div>

          <p className="mt-5 border-t-2 border-line pt-5 text-[15px] leading-relaxed text-foreground">
            {msg.details || "—"}
          </p>

          {msg.email && (
            <div className="mt-4 flex justify-end">
              <a
                href={`mailto:${msg.email}`}
                className="inline-flex items-center gap-1 text-xs font-semibold text-accent-text hover:underline"
              >
                Reply by email
                <ArrowRight className="h-3 w-3" />
              </a>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function NewsForm() {
  const [submitted, setSubmitted] = useState(false);
  const [input, setInput] = useState({
    title: "",
    date: Date.now(),
    content: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await addDoc(collection(firestore, "news"), input);
    } catch (err) {
      console.log(err);
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <SuccessState
        message="News post saved"
        onReset={() => setSubmitted(false)}
      />
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl space-y-5 rounded-panel bg-surface p-7 sm:p-10"
    >
      <div>
        <label className="eyebrow text-muted" htmlFor="news-title">
          Title
        </label>
        <input
          id="news-title"
          required
          type="text"
          onChange={(e) => {
            setInput({ ...input, title: e.target.value });
          }}
          placeholder="e.g. We launched a new service"
          className="mt-2 w-full rounded-field border-2 border-transparent bg-background px-5 py-3.5 text-[15px] text-foreground placeholder:text-muted/60 focus:border-accent focus:outline-none"
        />
      </div>

      <div>
        <label className="eyebrow text-muted" htmlFor="news-content">
          Content
        </label>
        <textarea
          id="news-content"
          required
          rows={6}
          onChange={(e) => {
            setInput({ ...input, content: e.target.value });
          }}
          placeholder="Write the announcement..."
          className="mt-2 w-full resize-none rounded-field border-2 border-transparent bg-background px-5 py-3.5 text-[15px] text-foreground placeholder:text-muted/60 focus:border-accent focus:outline-none"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-full bg-accent py-3.5 text-[15px] font-semibold text-accent-ink transition-colors duration-300 hover:bg-foreground hover:text-background"
      >
        Publish news post
      </button>
    </form>
  );
}

function FormField({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="eyebrow text-muted" htmlFor={htmlFor}>
        {label}
      </label>
      {children}
      {hint && <p className="mt-2 text-xs text-muted">{hint}</p>}
    </div>
  );
}

const fieldClass =
  "mt-2 w-full rounded-field border-2 border-transparent bg-background px-5 py-3.5 text-[15px] text-foreground placeholder:text-muted/60 focus:border-accent focus:outline-none";

function ProjectForm() {
  const [submitted, setSubmitted] = useState(false);
  const [input, setInput] = useState<Project>({
    title: "",
    image: "",
    id: "",
    category: "",
    year: "",
    client: "",
    duration: "",
    role: "",
    liveUrl: "",
    summary: "",
    description: "",
    challenge: "",
    solution: "",
    results: "",
    tags: [],
  });
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await addDoc(collection(firestore, "projects"), input);
    } catch (err) {
      console.log(err);
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <SuccessState
        message="Project saved"
        onReset={() => setSubmitted(false)}
      />
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl space-y-10 rounded-panel bg-surface p-7 sm:p-10"
    >
      {/* Basic info */}
      <div className="space-y-5">
        <h3 className="eyebrow text-muted">
          Basic info
        </h3>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField label="Title" htmlFor="project-title">
            <input
              id="project-title"
              required
              onChange={(e) => {
                setInput({ ...input, title: e.target.value });
              }}
              type="text"
              placeholder="Bramble Goods"
              className={fieldClass}
            />
          </FormField>
          <FormField
            label="URL slug (id)"
            htmlFor="project-id"
            hint="Used in the page address, e.g. /projects/bramble-goods"
          >
            <input
              id="project-id"
              required
              type="text"
              onChange={(e) => {
                setInput({ ...input, id: e.target.value });
              }}
              placeholder="bramble-goods"
              className={fieldClass}
            />
          </FormField>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField label="Category" htmlFor="project-category">
            <select
              id="project-category"
              className={fieldClass}
              onChange={(e) => setInput({ ...input, category: e.target.value })}
              defaultValue=""
            >
              <option value="" disabled>
                Select one
              </option>
              <option value={"Business Website"}>Business website</option>
              <option value={"E-commerce"}>E-commerce</option>
              <option value={"Web Application"}>Web application</option>
            </select>
          </FormField>
          <FormField label="Year" htmlFor="project-year">
            <input
              id="project-year"
              required
              onChange={(e) => setInput({ ...input, year: e.target.value })}
              type="text"
              placeholder="2026"
              className={fieldClass}
            />
          </FormField>
        </div>
      </div>

      {/* Client & role */}
      <div className="space-y-5 border-t-2 border-line pt-8">
        <h3 className="eyebrow text-muted">
          Client & role
        </h3>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField label="Client" htmlFor="project-client">
            <input
              id="project-client"
              type="text"
              onChange={(e) => setInput({ ...input, client: e.target.value })}
              placeholder="Client name"
              className={fieldClass}
            />
          </FormField>
          <FormField label="Duration" htmlFor="project-duration">
            <input
              id="project-duration"
              type="text"
              onChange={(e) => setInput({ ...input, duration: e.target.value })}
              placeholder="6 weeks"
              className={fieldClass}
            />
          </FormField>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField label="Our role" htmlFor="project-role">
            <input
              id="project-role"
              type="text"
              onChange={(e) => setInput({ ...input, role: e.target.value })}
              placeholder="Design, development & Stripe integration"
              className={fieldClass}
            />
          </FormField>
          <FormField label="Live URL" htmlFor="project-url">
            <input
              id="project-url"
              type="url"
              onChange={(e) => setInput({ ...input, liveUrl: e.target.value })}
              placeholder="https://"
              className={fieldClass}
            />
          </FormField>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-5 border-t-2 border-line pt-8">
        <h3 className="eyebrow text-muted">
          Content
        </h3>

        <FormField
          label="Short summary"
          htmlFor="project-summary"
          hint="Shown on the projects list card"
        >
          <textarea
            id="project-summary"
            required
            onChange={(e) => setInput({ ...input, summary: e.target.value })}
            rows={2}
            placeholder="One or two sentences"
            className={`${fieldClass} resize-none`}
          />
        </FormField>
        <FormField
          label="Image"
          htmlFor="image"
          hint="Shown on the projects list card"
        >
          <input
            type="text"
            id="image"
            required
            onChange={(e) => setInput({ ...input, summary: e.target.value })}
            placeholder="Enter url of image or screenshot of project"
            className={`${fieldClass} resize-none`}
          />
        </FormField>
        <FormField
          label="Full description"
          htmlFor="project-description"
          hint="The overview section on the project's own page"
        >
          <textarea
            id="project-description"
            required
            rows={4}
            onChange={(e) =>
              setInput({ ...input, description: e.target.value })
            }
            placeholder="What the project was and why it was built"
            className={`${fieldClass} resize-none`}
          />
        </FormField>

        <FormField
          label="Challenge"
          htmlFor="project-challenge"
          hint="What problem the client came to you with"
        >
          <textarea
            id="project-challenge"
            rows={3}
            onChange={(e) => setInput({ ...input, challenge: e.target.value })}
            placeholder="What wasn't working before"
            className={`${fieldClass} resize-none`}
          />
        </FormField>

        <FormField
          label="Solution"
          htmlFor="project-solution"
          hint="What you actually built"
        >
          <textarea
            id="project-solution"
            rows={3}
            onChange={(e) => setInput({ ...input, solution: e.target.value })}
            placeholder="How you solved it"
            className={`${fieldClass} resize-none`}
          />
        </FormField>

        <FormField
          label="Results"
          htmlFor="project-results"
          hint="Outcomes or metrics, once available"
        >
          <textarea
            id="project-results"
            rows={2}
            onChange={(e) => setInput({ ...input, results: e.target.value })}
            placeholder="e.g. conversion rate, load time, inquiries"
            className={`${fieldClass} resize-none`}
          />
        </FormField>
      </div>

      {/* Tags */}
      <div className="space-y-5 border-t-2 border-line pt-8">
        <FormField label="Tech tags (comma separated)" htmlFor="project-tags">
          <input
            id="project-tags"
            type="text"
            onChange={(e) =>
              setInput({
                ...input,
                tags: e.target.value.split(",").map((tag) => tag.trim()),
              })
            }
            placeholder="Next.js, Tailwind CSS, Stripe"
            className={fieldClass}
          />
        </FormField>
      </div>

      <button
        type="submit"
        className="w-full rounded-full bg-accent py-3.5 text-[15px] font-semibold text-accent-ink transition-colors duration-300 hover:bg-foreground hover:text-background"
      >
        Publish project
      </button>
    </form>
  );
}

function SuccessState({
  message,
  onReset,
}: {
  message: string;
  onReset: () => void;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex max-w-xl flex-col items-center gap-3 rounded-panel bg-surface p-10 text-center"
      >
        <CheckCircle2 className="h-14 w-14 text-accent" />
        <p className="font-display text-3xl font-semibold tracking-tight">
          {message}
        </p>
        <button
          type="button"
          onClick={onReset}
          className="mt-3 rounded-full bg-background px-6 py-3 text-sm font-semibold transition-colors duration-300 hover:bg-accent hover:text-accent-ink"
        >
          Add another
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
