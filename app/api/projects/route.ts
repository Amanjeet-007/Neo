import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { getProjects } from "@/lib/data/projects";
import { checkIsAdmin } from "@/lib/clerk/roles";

const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export async function GET() {
  return NextResponse.json(await getProjects());
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!(await checkIsAdmin(body.passcode))) {
      return NextResponse.json({ error: "Not allowed" }, { status: 403 });
    }
    if (!body.title || !body.tagline) {
      return NextResponse.json({ error: "Title and tagline are required" }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from("projects")
      .insert({
        title: body.title,
        slug: slugify(body.slug || body.title),
        tagline: body.tagline,
        description: body.description || body.tagline,
        category: body.category,
        tech_stack: body.tech_stack || [],
        live_url: body.live_url || null,
        github_url: body.github_url || null,
        innovations: body.innovations || [],
        featured: Boolean(body.featured),
      })
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Could not save project";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
