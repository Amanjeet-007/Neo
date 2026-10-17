import { notFound } from "next/navigation";
import DocSidebar from "@/components/DocSidebar";
import { getDoc, getDocs } from "@/lib/docs";

export function generateStaticParams() {
  return getDocs().map((d) => ({ doc: d.slug }));
}

export default function DocLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { doc: string };
}) {
  const doc = getDoc(params.doc);
  if (!doc) notFound();

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-5 py-10 md:grid-cols-[14rem_1fr]">
      <aside>
        <DocSidebar
          docSlug={doc.slug}
          docTitle={doc.title}
          topics={doc.topics.map((t) => ({ slug: t.slug, title: t.title }))}
        />
      </aside>
      <div className="min-w-0">{children}</div>
    </div>
  );
}
