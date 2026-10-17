export type ProjectCategory =
  | "Graphics & 3D"
  | "AI"
  | "Full stack"
  | "Developer tools";

export interface Project {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  category: ProjectCategory | string;
  difficulty?: string;
  tech_stack: string[];
  live_url?: string | null;
  github_url?: string | null;
  featured: boolean;
  innovations: string[];
  stars_count: number;
  created_at: string;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  role: "user" | "admin";
}
