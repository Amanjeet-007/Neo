import type { Metadata } from "next";

export const metadata: Metadata = { title: "Solutions" };

const solutions = [
  {
    title: "Realtime apps",
    desc: "Multi-user features such as shared documents and live cursors, built on Supabase Realtime and Yjs.",
  },
  {
    title: "Interactive interfaces",
    desc: "Scroll-linked pages, 3D views and careful motion, with reduced-motion support built in.",
  },
  {
    title: "Sign-in and roles",
    desc: "Clerk for authentication and Postgres row level security so permissions are enforced in the database.",
  },
];

export default function SolutionsPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Solutions</h1>
      <p className="mt-2 mb-8 max-w-[60ch] text-muted">What we can help you build.</p>

      <dl className="max-w-3xl divide-y divide-line border-y border-line">
        {solutions.map((s) => (
          <div key={s.title} className="grid gap-1 py-5 md:grid-cols-[14rem_1fr] md:gap-8">
            <dt className="font-medium">{s.title}</dt>
            <dd className="text-muted">{s.desc}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
