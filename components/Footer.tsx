import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-8 text-sm text-muted">
        <p>© {new Date().getFullYear()} Build With Neo</p>
        <div className="flex gap-5">
          <Link href="/projects" className="hover:text-ink">Projects</Link>
          <Link href="/docs" className="hover:text-ink">Docs</Link>
          <Link href="/admin" className="hover:text-ink">Admin</Link>
        </div>
      </div>
    </footer>
  );
}
