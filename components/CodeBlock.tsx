"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export default function CodeBlock({ code, lang }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard blocked, ignore */
    }
  }

  return (
    <div className="my-4 rounded border border-line bg-[var(--code-bg)]">
      <div className="flex items-center justify-between border-b border-line px-3 py-1.5 text-xs text-muted">
        <span className="font-mono">{lang || "text"}</span>
        <button
          onClick={copy}
          className="flex items-center gap-1.5 rounded px-1.5 py-0.5 hover:text-ink"
          aria-label="Copy code"
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
      <pre className="overflow-x-auto p-3">
        <code className="font-mono">{code}</code>
      </pre>
    </div>
  );
}
