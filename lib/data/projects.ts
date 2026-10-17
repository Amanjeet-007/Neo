import { supabasePublicClient } from "@/lib/supabase/client";
import type { Project } from "@/lib/types/database";

export const CATEGORIES = ["Graphics & 3D", "AI", "Full stack", "Developer tools"];

// Shown until the `projects` table has rows. Replace with your own.
export const SAMPLE_PROJECTS: Project[] = [
  {
    id: "sample-1",
    title: "NeoGrid",
    slug: "neogrid",
    tagline: "Neural network visualizer that renders in the browser with WebGL.",
    description:
      "NeoGrid draws the layers of a small neural network as a 3D graph and lights up nodes as activations change. It uses instanced meshes in Three.js so a graph with tens of thousands of nodes still runs smoothly on a laptop.",
    category: "Graphics & 3D",
    difficulty: "Advanced",
    tech_stack: ["Next.js", "Three.js", "GLSL", "TypeScript"],
    live_url: "https://neogrid-demo.buildwithneo.online",
    github_url: "https://github.com/buildwithneo/neogrid",
    featured: true,
    innovations: [
      "Instanced rendering keeps draw calls low",
      "Node colors are computed in a vertex shader",
      "Optional audio input drives node brightness",
    ],
    stars_count: 342,
    created_at: "2026-09-15T10:00:00Z",
  },
  {
    id: "sample-2",
    title: "HyperSync",
    slug: "hypersync",
    tagline: "Shared state for multi-user apps, built on Supabase Realtime and Yjs.",
    description:
      "HyperSync wraps Yjs documents in a small API and persists them to Postgres. Clients keep working offline and merge cleanly when they reconnect, so two people can edit the same document without overwriting each other.",
    category: "Full stack",
    difficulty: "Advanced",
    tech_stack: ["TypeScript", "Supabase Realtime", "Yjs", "PostgreSQL"],
    live_url: "https://hypersync-demo.buildwithneo.online",
    github_url: "https://github.com/buildwithneo/hypersync-engine",
    featured: true,
    innovations: [
      "Offline edits are queued and replayed on reconnect",
      "Updates are sent as compact binary patches",
      "Snapshots are stored in Postgres to speed up loading",
    ],
    stars_count: 289,
    created_at: "2026-08-20T14:30:00Z",
  },
  {
    id: "sample-3",
    title: "QuantumPulse",
    slug: "quantumpulse",
    tagline: "Studio for building and testing voice agents in the browser.",
    description:
      "QuantumPulse connects a microphone to a streaming language model over WebRTC and plays the reply back as speech. You can change the prompt, pick a voice, and watch the latency of each turn while you test.",
    category: "AI",
    difficulty: "Experimental",
    tech_stack: ["Next.js", "WebRTC", "OpenAI Realtime API", "Tailwind CSS"],
    live_url: "https://quantumpulse.buildwithneo.online",
    github_url: "https://github.com/buildwithneo/quantumpulse",
    featured: true,
    innovations: [
      "Per-turn latency is shown next to each reply",
      "Tool calls can hit your own HTTP endpoints",
      "Prompts and voices are saved per project",
    ],
    stars_count: 415,
    created_at: "2026-09-01T08:15:00Z",
  },
  {
    id: "sample-4",
    title: "AeroUI",
    slug: "aeroui",
    tagline: "Copy-and-paste React components with GSAP motion and Radix primitives.",
    description:
      "AeroUI is a small set of components you copy into your own project: a dock, a magnetic button, scroll-linked sections. Each one is keyboard accessible and works without JavaScript animation if the user prefers reduced motion.",
    category: "Developer tools",
    difficulty: "Intermediate",
    tech_stack: ["React", "GSAP", "Tailwind CSS", "Radix UI"],
    live_url: "https://aeroui.buildwithneo.online",
    github_url: "https://github.com/buildwithneo/aeroui",
    featured: false,
    innovations: [
      "Animations use transforms only, so layout never shifts",
      "Respects prefers-reduced-motion",
      "Theming through CSS variables",
    ],
    stars_count: 198,
    created_at: "2026-07-12T11:45:00Z",
  },
];

export async function getProjects(): Promise<Project[]> {
  // No database configured yet: show the samples without waiting on a network call.
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return SAMPLE_PROJECTS;

  try {
    const { data, error } = await supabasePublicClient
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });
    if (error || !data || data.length === 0) return SAMPLE_PROJECTS;
    return data as Project[];
  } catch {
    return SAMPLE_PROJECTS;
  }
}

export async function getProject(slug: string): Promise<Project | null> {
  const all = await getProjects();
  return all.find((p) => p.slug === slug) ?? null;
}
