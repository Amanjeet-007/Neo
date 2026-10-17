"use client";

import { useState } from "react";
import { CATEGORIES } from "@/lib/data/projects";

const field =
  "w-full rounded border border-line bg-surface px-3 py-2 text-sm placeholder:text-muted";

const lines = (s: string) => s.split("\n").map((x) => x.trim()).filter(Boolean);
const list = (s: string) => s.split(",").map((x) => x.trim()).filter(Boolean);

export default function AdminProjectForm({ passcode }: { passcode: string }) {
  const [status, setStatus] = useState<{ kind: "idle" | "saving" | "ok" | "error"; message?: string }>({
    kind: "idle",
  });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus({ kind: "saving" });

    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        passcode,
        title: data.get("title"),
        tagline: data.get("tagline"),
        description: data.get("description"),
        category: data.get("category"),
        tech_stack: list(String(data.get("tech_stack") ?? "")),
        live_url: data.get("live_url"),
        github_url: data.get("github_url"),
        innovations: lines(String(data.get("innovations") ?? "")),
        featured: data.get("featured") === "on",
      }),
    });

    if (res.ok) {
      form.reset();
      setStatus({ kind: "ok", message: "Project published. It appears on the site within a minute." });
    } else {
      const body = await res.json().catch(() => ({}));
      setStatus({ kind: "error", message: body.error ?? "Could not save the project." });
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-2xl space-y-5">
      <div>
        <label htmlFor="title" className="mb-1 block text-sm font-medium">Name</label>
        <input id="title" name="title" required className={field} />
      </div>

      <div>
        <label htmlFor="tagline" className="mb-1 block text-sm font-medium">One-line summary</label>
        <input id="tagline" name="tagline" required className={field} />
      </div>

      <div>
        <label htmlFor="description" className="mb-1 block text-sm font-medium">About</label>
        <textarea id="description" name="description" rows={4} className={field} />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="category" className="mb-1 block text-sm font-medium">Category</label>
          <select id="category" name="category" className={field}>
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="tech_stack" className="mb-1 block text-sm font-medium">Tech stack</label>
          <input id="tech_stack" name="tech_stack" placeholder="Next.js, Three.js, Supabase" className={field} />
          <p className="mt-1 text-xs text-muted">Separate with commas.</p>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="live_url" className="mb-1 block text-sm font-medium">Demo URL</label>
          <input id="live_url" name="live_url" type="url" placeholder="https://" className={field} />
        </div>
        <div>
          <label htmlFor="github_url" className="mb-1 block text-sm font-medium">Source URL</label>
          <input id="github_url" name="github_url" type="url" placeholder="https://github.com/" className={field} />
        </div>
      </div>

      <div>
        <label htmlFor="innovations" className="mb-1 block text-sm font-medium">How it works</label>
        <textarea id="innovations" name="innovations" rows={3} className={field} />
        <p className="mt-1 text-xs text-muted">One point per line.</p>
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="featured" /> Show on the home page
      </label>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={status.kind === "saving"}
          className="rounded bg-accent px-4 py-2 text-sm font-medium text-accent-ink hover:opacity-90 disabled:opacity-60"
        >
          {status.kind === "saving" ? "Publishing…" : "Publish project"}
        </button>
        {status.kind === "ok" && <p role="status" className="text-sm text-muted">{status.message}</p>}
        {status.kind === "error" && <p role="alert" className="text-sm text-red-600 dark:text-red-400">{status.message}</p>}
      </div>
    </form>
  );
}
