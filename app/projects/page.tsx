import type { Metadata } from "next";
import ProjectList from "@/components/ProjectList";
import { CATEGORIES, getProjects } from "@/lib/data/projects";

export const metadata: Metadata = { title: "Projects" };
export const revalidate = 60;

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
      <p className="mt-2 mb-8 max-w-[60ch] text-muted">
        Things we have built. Each one has a short write-up, the stack, and links to the live
        demo and source.
      </p>
      <ProjectList projects={projects} categories={CATEGORIES} />
    </div>
  );
}
