"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, Folder } from "lucide-react";

type DocSummary = { slug: string; topics: { slug: string }[] };

const ease = [0.22, 1, 0.36, 1] as const;
const headline = "Projects we built, and the docs to build them yourself.".split(" ");

export default function Hero({ docs }: { docs: DocSummary[] }) {
  let line = 0; // running index so tree lines appear one after another

  return (
    <section className="relative grid gap-12 py-16 md:grid-cols-[1.1fr_1fr] md:py-24">
      {/* Soft color drifting behind the hero */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-accent/20 blur-3xl"
          animate={{ x: [0, 60, 0], y: [0, 30, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-0 top-24 h-80 w-80 rounded-full bg-accent/10 blur-3xl"
          animate={{ x: [0, -50, 0], y: [0, -20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div>
        <h1 className="max-w-[18ch] text-4xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
          {headline.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
              <motion.span
                className="inline-block"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7, delay: 0.05 * i, ease }}
              >
                {word}&nbsp;
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          className="mt-5 max-w-[48ch] text-lg text-muted"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease }}
        >
          Build With Neo publishes the software we make with full write-ups, and keeps the
          documentation as plain markdown files you can read, copy, and extend.
        </motion.p>

        <motion.div
          className="mt-8 flex flex-wrap gap-3"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75, ease }}
        >
          <Link
            href="/projects"
            className="rounded bg-accent px-4 py-2 text-sm font-medium text-accent-ink transition hover:opacity-90 active:scale-[0.97]"
          >
            Browse projects
          </Link>
          <Link
            href="/docs"
            className="rounded border border-line bg-surface px-4 py-2 text-sm font-medium transition hover:border-accent active:scale-[0.97]"
          >
            Read the docs
          </Link>
        </motion.div>
      </div>

      {/* The real docs folder, so the structure explains itself */}
      <motion.div
        className="self-start rounded-lg border border-line bg-surface/80 p-4 font-mono text-[13px] leading-7 shadow-sm backdrop-blur"
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.3, ease }}
      >
        <p className="mb-1 flex items-center gap-1.5 text-muted">
          <span className="h-2 w-2 rounded-full bg-accent" aria-hidden /> content/docs/
        </p>
        {docs.map((doc) => {
          const folderDelay = 0.7 + 0.08 * line++;
          return (
            <div key={doc.slug} className="ml-3">
              <motion.p
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: folderDelay, duration: 0.4, ease }}
              >
                <Folder size={14} className="text-accent" aria-hidden />
                <Link href={`/docs/${doc.slug}`} className="hover:underline">
                  {doc.slug}/
                </Link>
              </motion.p>
              <div className="ml-5 text-muted">
                {[{ slug: "README", href: `/docs/${doc.slug}` }, ...doc.topics.slice(0, 3).map((t) => ({ slug: t.slug, href: `/docs/${doc.slug}/${t.slug}` }))].map((f) => (
                  <motion.p
                    key={f.slug}
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + 0.08 * line++, duration: 0.4, ease }}
                  >
                    <FileText size={13} aria-hidden />
                    <Link href={f.href} className="hover:text-ink hover:underline">
                      {f.slug}.md
                    </Link>
                  </motion.p>
                ))}
                {doc.topics.length > 3 && <p className="ml-5">+ {doc.topics.length - 3} more</p>}
              </div>
            </div>
          );
        })}
      </motion.div>
    </section>
  );
}
