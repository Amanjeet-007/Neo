import type { Metadata } from "next";

export const metadata: Metadata = { title: "Blog" };

// Replace with real posts. Keep the list short and dated.
const posts = [
  {
    title: "Real-time collaboration with Supabase and Yjs",
    date: "2026-10-12",
    readTime: "7 min",
    summary: "How HyperSync keeps two editors in sync, including what happens when one goes offline.",
  },
  {
    title: "Instanced particles in Three.js",
    date: "2026-09-28",
    readTime: "5 min",
    summary: "Drawing tens of thousands of nodes with a handful of draw calls.",
  },
];

const fmt = new Intl.DateTimeFormat("en", { dateStyle: "medium" });

export default function BlogsPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Blog</h1>
      <p className="mt-2 mb-8 max-w-[60ch] text-muted">Notes from building the projects on this site.</p>

      <ul className="max-w-3xl">
        {posts.map((p) => (
          <li key={p.title} className="border-b border-line py-6 first:pt-0 last:border-b-0">
            <p className="text-sm text-muted">
              <time dateTime={p.date}>{fmt.format(new Date(p.date))}</time> · {p.readTime} read
            </p>
            <h2 className="mt-1 text-lg font-medium">{p.title}</h2>
            <p className="mt-1 text-muted">{p.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
