"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

type Item = { slug: string; title: string };

export default function DocSidebar({
  docSlug,
  docTitle,
  topics,
}: {
  docSlug: string;
  docTitle: string;
  topics: Item[];
}) {
  const pathname = usePathname();
  const base = `/docs/${docSlug}`;

  const link = (href: string, label: string) => {
    const active = pathname === href;
    return (
      <Link
        href={href}
        aria-current={active ? "page" : undefined}
        className={`relative block py-1.5 pl-3 text-sm transition-colors ${
          active ? "font-medium text-ink" : "text-muted hover:text-ink"
        }`}
      >
        {active && (
          <motion.span
            layoutId="doc-active"
            className="absolute -left-px bottom-1 top-1 w-0.5 rounded bg-accent"
            transition={{ type: "spring", stiffness: 420, damping: 34 }}
          />
        )}
        {label}
      </Link>
    );
  };

  return (
    <nav aria-label={`${docTitle} topics`} className="md:sticky md:top-20">
      <Link href="/docs" className="text-xs text-muted hover:text-ink">
        All docs
      </Link>
      <p className="mb-3 mt-1 font-semibold leading-snug">{docTitle}</p>
      <div className="border-l border-line">
        {link(base, "Overview")}
        {topics.map((t) => (
          <div key={t.slug}>{link(`${base}/${t.slug}`, t.title)}</div>
        ))}
      </div>
    </nav>
  );
}
