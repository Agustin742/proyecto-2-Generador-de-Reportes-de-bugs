import { useEffect, useRef, useState } from "react";

import { BugReportMarkdownView } from "@/features/bug-report/components/BugReportMarkdownView";
import { generateBugReport } from "@/features/bug-report/utils/generateBugReport";
import type { BugReportFormValues } from "@/features/bug-report/schema";
import type { HeaderVariant } from "@/features/bug-report/utils/toneTemplates";

type BugReportPreviewProps = {
  values: Partial<BugReportFormValues>;
  headerVariant?: HeaderVariant;
  className?: string;
};

export function BugReportPreview({
  values,
  headerVariant = 0,
  className,
}: BugReportPreviewProps) {
  const [mode, setMode] = useState<"raw" | "rendered">("raw");
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
  const feedbackTimeoutRef = useRef<number | null>(null);

  const markdown = generateBugReport(values, headerVariant);
  const hasAnyValue = Boolean(
    values.title ||
      values.description ||
      values.steps ||
      values.expectedResult ||
      values.actualResult ||
      values.environment ||
      values.severity ||
      values.priority ||
      values.tone,
  );

  useEffect(() => {
    return () => {
      if (feedbackTimeoutRef.current !== null) {
        window.clearTimeout(feedbackTimeoutRef.current);
      }
    };
  }, []);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopyFeedback("Copiado al portapapeles");
    } catch {
      setCopyFeedback("No se pudo copiar. Intenta de nuevo.");
    }

    if (feedbackTimeoutRef.current !== null) {
      window.clearTimeout(feedbackTimeoutRef.current);
    }

    feedbackTimeoutRef.current = window.setTimeout(() => {
      setCopyFeedback(null);
      feedbackTimeoutRef.current = null;
    }, 4000);
  }

  return (
    <article className={className} data-slot="bug-report-preview">
      <section className="flex max-h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-border bg-card/[0.72] shadow-2xl shadow-black/30 backdrop-blur-xl">
        <header className="shrink-0 border-b border-border bg-white/[0.02] px-5 py-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
              <span aria-hidden className="size-2 rounded-[2px] bg-primary" />
              bug-report.md
            </span>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setMode("raw")}
                aria-pressed={mode === "raw"}
                className={
                  "rounded-md px-2 py-1 font-mono text-xs transition-colors " +
                  (mode === "raw"
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground")
                }
              >
                Markdown
              </button>

              <button
                type="button"
                onClick={() => setMode("rendered")}
                aria-pressed={mode === "rendered"}
                className={
                  "rounded-md px-2 py-1 font-mono text-xs transition-colors " +
                  (mode === "rendered"
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground")
                }
              >
                Vista
              </button>

              <button
                type="button"
                onClick={handleCopy}
                className="rounded-md bg-primary px-2 py-1 font-mono text-xs text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Copiar
              </button>
            </div>
          </div>
        </header>

        <div className="min-h-0 flex-1 overflow-auto p-5 text-sm text-foreground">
          {copyFeedback ? (
            <div
              role="status"
              aria-live="polite"
              className="mb-4 rounded-xl border border-border bg-white/[0.03] px-4 py-3 text-sm text-foreground"
            >
              {copyFeedback}
            </div>
          ) : null}

          {hasAnyValue ? (
            mode === "raw" ? (
              <pre className="whitespace-pre-wrap break-words font-mono text-[13px] leading-[1.75] text-foreground/85">
                {markdown}
              </pre>
            ) : (
              <BugReportMarkdownView markdown={markdown} />
            )
          ) : (
            <section className="rounded-2xl border border-border bg-white/[0.02] p-6 text-sm text-muted-foreground">
              Completa el formulario para ver una vista previa en Markdown.
            </section>
          )}
        </div>

        <footer className="shrink-0 border-t border-border bg-white/[0.02] px-5 py-2 text-right font-mono text-xs text-faint">
          {markdown.length} caracteres
        </footer>
      </section>
    </article>
  );
}
