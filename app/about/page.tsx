import type { Metadata } from "next";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">About</h1>
      <div className="doc mt-6">
        <p>
          Build With Neo is a small studio that builds web software and writes about how it was
          made. This site has two parts: a list of our projects, and documentation that explains
          the techniques behind them.
        </p>
        <h2>How we work</h2>
        <ul>
          <li>We publish the source and a short write-up for each project.</li>
          <li>Documentation is plain markdown, so anyone can fix or extend it.</li>
          <li>We prefer simple tools that stay maintainable.</li>
        </ul>
        <h2>Contact</h2>
        <p>
          Found a mistake in the docs? Open an issue on the{" "}
          <a href="https://github.com/buildwithneo">GitHub organization</a>.
        </p>
      </div>
    </div>
  );
}
