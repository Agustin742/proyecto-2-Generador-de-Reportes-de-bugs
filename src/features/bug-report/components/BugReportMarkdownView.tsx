import ReactMarkdown, { type Components } from "react-markdown";

// Mapeo de los elementos del markdown a estilos del proyecto (tokens + estética del
// diseño de referencia). Se renderiza el MISMO markdown que el modo "Markdown", pero
// formateado: título display, encabezados de sección mono rosa, párrafos Space Grotesk
// y listas/realces prolijos. No agrega dependencias (sin @tailwindcss/typography).
const markdownComponents: Components = {
  h1: ({ children }) => (
    <h2 className="mb-4 font-display text-2xl font-bold leading-tight tracking-tight text-foreground">
      {children}
    </h2>
  ),
  h2: ({ children }) => (
    <h3 className="mt-6 mb-2 font-mono text-[11px] uppercase tracking-[0.12em] text-primary first:mt-0">
      {children}
    </h3>
  ),
  h3: ({ children }) => (
    <h4 className="mt-5 mb-2 font-mono text-[11px] uppercase tracking-[0.1em] text-primary/90">
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p className="mb-[18px] font-sans text-[15px] leading-relaxed text-foreground/85">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="mb-[18px] list-disc space-y-1 pl-6 font-sans text-[15px] leading-relaxed text-foreground/85 marker:text-primary/70">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-[18px] list-decimal space-y-1 pl-6 font-sans text-[15px] leading-relaxed text-foreground/85 marker:text-primary/70">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="pl-1">{children}</li>,
  strong: ({ children }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary underline underline-offset-2 transition-colors hover:text-primary/80"
    >
      {children}
    </a>
  ),
  code: ({ children }) => (
    <code className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[13px] text-foreground">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="mb-[18px] overflow-auto rounded-lg border border-border bg-white/[0.03] p-4 font-mono text-[13px] leading-[1.6] text-foreground/85">
      {children}
    </pre>
  ),
  blockquote: ({ children }) => (
    <blockquote className="mb-[18px] border-l-2 border-primary/40 pl-4 font-sans text-[15px] italic text-muted-foreground">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-6 border-border" />,
};

type BugReportMarkdownViewProps = {
  markdown: string;
};

/**
 * Modo "Vista": renderiza el markdown generado con `ReactMarkdown`, estilizando cada
 * elemento para acercarlo al diseño de referencia. Es puramente presentacional.
 */
export function BugReportMarkdownView({ markdown }: BugReportMarkdownViewProps) {
  return <ReactMarkdown components={markdownComponents}>{markdown}</ReactMarkdown>;
}
