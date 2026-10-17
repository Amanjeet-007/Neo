import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Markdown from "@/components/Markdown";
import Toc from "@/components/Toc";
import { getDoc, getDocs, getHeadings } from "@/lib/docs";

type Props = { params: { doc: string; topic: string } };

export function generateStaticParams() {
  return getDocs().flatMap((d) => d.topics.map((t) => ({ doc: d.slug, topic: t.slug })));
}

export function generateMetadata({ params }: Props): Metadata {
  const doc = getDoc(params.doc);
  const topic = doc?.topics.find((t) => t.slug === params.topic);
  return { title: topic ? `${topic.title} · ${doc!.title}` : "Docs" };
}

export default function TopicPage({ params }: Props) {
  const doc = getDoc(params.doc);
  const index = doc ? doc.topics.findIndex((t) => t.slug === params.topic) : -1;
  if (!doc || index === -1) notFound();

  const topic = doc.topics[index];
  const prev = doc.topics[index - 1];
  const next = doc.topics[index + 1];
  const headings = getHeadings(topic.body);

  return (
    <div className="grid gap-10 xl:grid-cols-[1fr_12rem]">
      <article className="min-w-0">
        <Markdown>{topic.body}</Markdown>

        <nav
          aria-label="Previous and next topic"
          className="mt-14 flex max-w-[68ch] justify-between gap-4 border-t border-line pt-6 text-sm"
        >
          {prev ? (
            <Link href={`/docs/${doc.slug}/${prev.slug}`} className="group">
              <span className="flex items-center gap-1 text-muted">
                <ArrowLeft size={13} aria-hidden /> Previous
              </span>
              <span className="font-medium group-hover:underline">{prev.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link href={`/docs/${doc.slug}/${next.slug}`} className="group text-right">
              <span className="flex items-center justify-end gap-1 text-muted">
                Next <ArrowRight size={13} aria-hidden />
              </span>
              <span className="font-medium group-hover:underline">{next.title}</span>
            </Link>
          )}
        </nav>
      </article>

      {headings.length > 0 && (
        <aside className="hidden xl:block">
          <Toc headings={headings} />
        </aside>
      )}
    </div>
  );
}
