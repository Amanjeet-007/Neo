import Link from "next/link";
import Hero from "@/components/Hero";
import { Reveal } from "@/components/Motion";
import ProjectRow from "@/components/ProjectRow";
import { getProjects } from "@/lib/data/projects";
import { getDocs } from "@/lib/docs";

export const revalidate = 60;

export default async function Home() {
  const [projects, docs] = await Promise.all([getProjects(), Promise.resolve(getDocs())]);
  const featured = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl px-5">
      <Hero docs={docs.map((d) => ({ slug: d.slug, topics: d.topics.map((t) => ({ slug: t.slug })) }))} />

      {/* Projects */}
      <Reveal className="border-t border-line pt-10">
        <div className="mb-2 flex items-baseline justify-between">
          <h2 className="text-xl font-semibold tracking-tight">Projects</h2>
          <Link href="/projects" className="text-sm text-accent hover:underline">
            All projects
          </Link>
        </div>
        <ul>
          {featured.map((p) => (
            <ProjectRow key={p.id} project={p} />
          ))}
        </ul>
      </Reveal>

      {/* Docs */}
      <Reveal className="mt-14 border-t border-line pt-10">
        <div className="mb-2 flex items-baseline justify-between">
          <h2 className="text-xl font-semibold tracking-tight">Documentation</h2>
          <Link href="/docs" className="text-sm text-accent hover:underline">
            All docs
          </Link>
        </div>
        <ul>
          {docs.map((doc) => (
            <li key={doc.slug} className="border-b border-line last:border-b-0">
              <Link href={`/docs/${doc.slug}`} className="block px-1 py-5 transition-colors hover:bg-surface md:px-4">
                <h3 className="font-medium">{doc.title}</h3>
                <p className="mt-0.5 text-sm text-muted">{doc.description}</p>
                <p className="mt-2 text-xs text-muted">{doc.topics.length} topics</p>
              </Link>
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}
