import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Github, Star } from "lucide-react";
import { getProject } from "@/lib/data/projects";

export const revalidate = 60;

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProject(params.slug);
  return { title: project?.title ?? "Project" };
}

export default async function ProjectPage({ params }: Props) {
  const project = await getProject(params.slug);
  if (!project) notFound();

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <Link href="/projects" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink">
        <ArrowLeft size={14} aria-hidden /> Projects
      </Link>

      <header className="mt-6 max-w-3xl">
        <p className="text-sm text-muted">
          {project.category}
          {project.difficulty ? ` · ${project.difficulty}` : ""}
        </p>
        <h1 className="mt-1 text-4xl font-semibold tracking-tight">{project.title}</h1>
        <p className="mt-3 text-lg text-muted">{project.tagline}</p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded bg-accent px-4 py-2 text-sm font-medium text-accent-ink hover:opacity-90"
            >
              <ExternalLink size={14} aria-hidden /> Open demo
            </a>
          )}
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded border border-line px-4 py-2 text-sm font-medium hover:bg-surface"
            >
              <Github size={14} aria-hidden /> Source code
            </a>
          )}
          <span className="inline-flex items-center gap-1.5 text-sm text-muted">
            <Star size={14} aria-hidden /> {project.stars_count} stars
          </span>
        </div>
      </header>

      <div className="mt-12 grid gap-12 md:grid-cols-[1fr_16rem]">
        <div className="max-w-[68ch] space-y-10">
          <section>
            <h2 className="mb-2 text-lg font-semibold">About</h2>
            <p>{project.description}</p>
          </section>

          {project.innovations.length > 0 && (
            <section>
              <h2 className="mb-2 text-lg font-semibold">How it works</h2>
              <ul className="list-disc space-y-1.5 pl-5">
                {project.innovations.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <aside>
          <h2 className="mb-2 text-sm font-semibold">Built with</h2>
          <ul className="divide-y divide-line border-y border-line text-sm">
            {project.tech_stack.map((t) => (
              <li key={t} className="py-2">
                {t}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
