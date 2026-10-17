import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "@/components/Markdown";
import { getDoc } from "@/lib/docs";

type Props = { params: { doc: string } };

export function generateMetadata({ params }: Props): Metadata {
  return { title: getDoc(params.doc)?.title ?? "Docs" };
}

export default function DocOverview({ params }: Props) {
  const doc = getDoc(params.doc);
  if (!doc) notFound();

  return (
    <article>
      <Markdown>{doc.readme}</Markdown>

      {doc.topics.length > 0 && (
        <section className="doc mt-10">
          <h2>Topics</h2>
          <ol>
            {doc.topics.map((t) => (
              <li key={t.slug}>
                <Link href={`/docs/${doc.slug}/${t.slug}`}>{t.title}</Link>
                {t.description && <span className="text-muted"> – {t.description}</span>}
              </li>
            ))}
          </ol>
        </section>
      )}
    </article>
  );
}
