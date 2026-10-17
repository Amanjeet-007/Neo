"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Star } from "lucide-react";
import type { Project } from "@/lib/types/database";

// One project per row. Rows scan faster than a grid of identical cards.
export default function ProjectRow({ project }: { project: Project }) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="border-b border-line last:border-b-0"
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group grid gap-2 rounded px-1 py-5 transition-colors hover:bg-surface md:grid-cols-[1fr_16rem_4.5rem] md:items-center md:gap-8 md:px-4"
      >
        <div>
          <h3 className="flex items-center gap-1 font-medium transition-transform duration-300 group-hover:translate-x-1">
            {project.title}
            <ArrowUpRight
              size={15}
              aria-hidden
              className="text-accent opacity-0 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
            />
          </h3>
          <p className="mt-0.5 text-sm text-muted">{project.tagline}</p>
        </div>
        <p className="text-sm text-muted">{project.tech_stack.slice(0, 4).join(", ")}</p>
        <p className="flex items-center gap-1.5 text-sm text-muted md:justify-end">
          <Star size={14} aria-hidden className="transition group-hover:fill-accent group-hover:text-accent" />{" "}
          {project.stars_count}
          <span className="sr-only">stars</span>
        </p>
      </Link>
    </motion.li>
  );
}
