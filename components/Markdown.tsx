import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import type { ReactElement } from "react";
import CodeBlock from "./CodeBlock";

export default function Markdown({ children }: { children: string }) {
  return (
    <div className="doc">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug]}
        components={{
          // Fenced code blocks get a header with a copy button
          pre({ children }) {
            const code = (children as ReactElement<{ className?: string; children?: string }>)?.props;
            const lang = /language-(\w+)/.exec(code?.className ?? "")?.[1];
            const text = String(code?.children ?? "").replace(/\n$/, "");
            return <CodeBlock code={text} lang={lang} />;
          },
          a({ href, children }) {
            const external = href?.startsWith("http");
            return (
              <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                {children}
              </a>
            );
          },
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
