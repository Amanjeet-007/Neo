import fs from "node:fs";
import path from "node:path";

/**
 * Documentation is plain markdown on disk:
 *
 *   content/docs/<doc-name>/README.md      -> overview text of the documentation
 *   content/docs/<doc-name>/01-topic.md    -> one topic per file, listed in filename order
 *
 * No config needed. Title = first "# Heading" in the file.
 * Description = first paragraph after the title.
 * To add a topic, add a file. To add a documentation, add a folder.
 */

const DOCS_DIR = path.join(process.cwd(), "content", "docs");

export type Topic = {
  slug: string;
  title: string;
  description: string;
  body: string;
};

export type Doc = {
  slug: string;
  title: string;
  description: string;
  readme: string;
  topics: Topic[];
};

export type Heading = { id: string; text: string; level: 2 | 3 };

function readTitle(markdown: string, fallback: string) {
  const match = markdown.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : fallback;
}

function readDescription(markdown: string) {
  const lines = markdown.split("\n");
  let afterTitle = false;
  for (const line of lines) {
    if (!afterTitle) {
      if (/^#\s+/.test(line)) afterTitle = true;
      continue;
    }
    const text = line.trim();
    if (!text || text.startsWith("#") || text.startsWith("```")) continue;
    return text.replace(/^>\s*/, "");
  }
  return "";
}

// "01-first-tween.md" -> "first-tween"
function topicSlug(file: string) {
  return file.replace(/\.md$/, "").replace(/^\d+[-_]?/, "");
}

export function getDocs(): Doc[] {
  if (!fs.existsSync(DOCS_DIR)) return [];

  return fs
    .readdirSync(DOCS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => loadDoc(d.name))
    .filter((d): d is Doc => d !== null)
    .sort((a, b) => a.title.localeCompare(b.title));
}

export function getDoc(slug: string): Doc | null {
  return loadDoc(slug);
}

function loadDoc(slug: string): Doc | null {
  const dir = path.join(DOCS_DIR, slug);
  const readmePath = path.join(dir, "README.md");
  if (!fs.existsSync(readmePath)) return null;

  const readme = fs.readFileSync(readmePath, "utf8");

  const topics = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md") && f.toLowerCase() !== "readme.md")
    .sort()
    .map((file) => {
      const body = fs.readFileSync(path.join(dir, file), "utf8");
      const slug = topicSlug(file);
      return { slug, title: readTitle(body, slug), description: readDescription(body), body };
    });

  return {
    slug,
    title: readTitle(readme, slug),
    description: readDescription(readme),
    readme,
    topics,
  };
}

// Same slug rules as rehype-slug (github-slugger), good enough for plain headings.
function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[`*_~]/g, "")
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim()
    .replace(/\s/g, "-");
}

export function getHeadings(markdown: string): Heading[] {
  const headings: Heading[] = [];
  const seen = new Map<string, number>();
  let inFence = false;

  for (const line of markdown.split("\n")) {
    if (line.trim().startsWith("```")) inFence = !inFence;
    if (inFence) continue;
    const match = line.match(/^(##|###)\s+(.+)$/);
    if (!match) continue;
    const text = match[2].replace(/[`*_]/g, "").trim();
    let id = slugify(match[2]);
    const count = seen.get(id) ?? 0;
    seen.set(id, count + 1);
    if (count > 0) id = `${id}-${count}`;
    headings.push({ id, text, level: match[1] === "##" ? 2 : 3 });
  }
  return headings;
}
