import { useState } from "react";
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

  return (
    <article className={className} data-slot="bug-report-preview">
      <section className="overflow-hidden rounded-3xl border border-slate-700/80 bg-slate-950/95 shadow-2xl shadow-slate-950/30 ring-1 ring-slate-900/10">
        <header className="border-b border-slate-700/80 bg-slate-900/95 px-5 py-4">
          <div className="flex items-center justify-between">
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
            </div>
          </div>
        </header>

        <main className="p-5 text-sm text-slate-100">
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
        </main>
      </section>
    </article>
  );
}
