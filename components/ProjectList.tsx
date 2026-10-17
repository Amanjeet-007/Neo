"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import ProjectRow from "./ProjectRow";
import type { Project } from "@/lib/types/database";

export default function ProjectList({
  projects,
  categories,
}: {
  projects: Project[];
  categories: string[];
}) {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      if (category !== "All" && p.category !== category) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.tech_stack.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [projects, category, query]);

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-line pb-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-1" role="group" aria-label="Filter by category">
          {["All", ...categories].map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              aria-pressed={category === c}
              className={`relative rounded px-3 py-1.5 text-sm transition-colors ${
                category === c ? "font-medium text-ink" : "text-muted hover:text-ink"
              }`}
            >
              {category === c && (
                <motion.span
                  layoutId="category-pill"
                  className="absolute inset-0 rounded bg-surface ring-1 ring-line"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <span className="relative">{c}</span>
            </button>
          ))}
        </div>

        <label className="relative block md:w-64">
          <span className="sr-only">Search projects</span>
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or tech"
            className="w-full rounded border border-line bg-surface py-1.5 pl-9 pr-3 text-sm placeholder:text-muted"
          />
        </label>
      </div>

      {shown.length > 0 ? (
        <ul>
          <AnimatePresence mode="popLayout" initial={false}>
            {shown.map((p) => (
              <ProjectRow key={p.id} project={p} />
            ))}
          </AnimatePresence>
        </ul>
      ) : (
        <div className="py-16 text-center">
          <p className="font-medium">No projects match</p>
          <p className="mt-1 text-sm text-muted">Clear the search or pick another category.</p>
          <button
            onClick={() => {
              setQuery("");
              setCategory("All");
            }}
            className="mt-4 rounded border border-line px-3 py-1.5 text-sm hover:bg-surface"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
