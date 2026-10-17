import type { Metadata } from "next";
import Link from "next/link";
import { getDocs } from "@/lib/docs";

export const metadata: Metadata = { title: "Docs" };

export default function DocsIndex() {
  const docs = getDocs();

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Documentation</h1>
      <p className="mt-2 mb-8 max-w-[60ch] text-muted">
        Short guides written as plain text. Pick a subject, then work through its topics in order.
      </p>

      {docs.length === 0 ? (
        <div className="rounded border border-line p-8 text-center">
          <p className="font-medium">No documentation yet</p>
          <p className="mt-1 text-sm text-muted">
            Add a folder with a README.md inside <code className="font-mono">content/docs/</code>.
          </p>
        </div>
      ) : (
        <ul>
          {docs.map((doc) => (
            <li key={doc.slug} className="border-b border-line last:border-b-0">
              <Link
                href={`/docs/${doc.slug}`}
                className="grid gap-1 px-1 py-5 transition-colors hover:bg-surface md:grid-cols-[1fr_8rem] md:items-center md:gap-8 md:px-4"
              >
                <div>
                  <h2 className="font-medium">{doc.title}</h2>
                  <p className="mt-0.5 text-sm text-muted">{doc.description}</p>
                </div>
                <p className="text-sm text-muted md:text-right">{doc.topics.length} topics</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
