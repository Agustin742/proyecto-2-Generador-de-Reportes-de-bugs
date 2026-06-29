import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

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
      <section className="overflow-hidden rounded-3xl border border-slate-700/80 bg-slate-950/95 shadow-2xl shadow-slate-950/30 ring-1 ring-slate-900/10">
        <header className="border-b border-slate-700/80 bg-slate-900/95 px-5 py-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs uppercase tracking-[0.3em] text-slate-400">
              bug-report.md
            </span>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setMode("raw")}
                className={
                  "rounded-md px-2 py-1 text-xs " +
                  (mode === "raw" ? "bg-slate-700 text-white" : "text-slate-400")
                }
              >
                Markdown
              </button>

              <button
                type="button"
                onClick={() => setMode("rendered")}
                className={
                  "rounded-md px-2 py-1 text-xs " +
                  (mode === "rendered" ? "bg-slate-700 text-white" : "text-slate-400")
                }
              >
                Vista
              </button>

              <button
                type="button"
                onClick={handleCopy}
                className="rounded-md border border-slate-600 bg-slate-800 px-2 py-1 text-xs text-slate-200 hover:bg-slate-700"
              >
                Copiar
              </button>
            </div>
          </div>
        </header>

        <div className="p-5 text-sm text-slate-100">
          {copyFeedback ? (
            <div className="mb-4 rounded-xl border border-slate-700/80 bg-slate-900/90 px-4 py-3 text-sm text-slate-200">
              {copyFeedback}
            </div>
          ) : null}

          {hasAnyValue ? (
            mode === "raw" ? (
              <pre className="overflow-auto whitespace-pre-wrap break-words font-mono text-sm leading-6">
                {markdown}
              </pre>
            ) : (
              <section className="overflow-auto whitespace-pre-wrap break-words font-sans text-sm leading-6">
                <ReactMarkdown>{markdown}</ReactMarkdown>
              </section>
            )
          ) : (
            <section className="rounded-2xl border border-slate-700/80 bg-slate-950/80 p-6 text-sm text-slate-400">
              Completa el formulario para ver una vista previa en Markdown.
            </section>
          )}
        </div>
      </section>
    </article>
  );
}
