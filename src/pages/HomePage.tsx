import { BugReportForm } from "@/features/bug-report/components/BugReportForm";

export function HomePage() {
  return (
    <main className="container mx-auto max-w-5xl space-y-12 px-6 py-16">
      <header className="max-w-3xl space-y-5">
        <h1 className="font-display text-5xl font-extrabold leading-[0.96] tracking-tight sm:text-7xl">
          Generador de
          <br />
          <span className="text-primary">reportes de bugs</span>
        </h1>
        <p className="max-w-xl text-base leading-relaxed text-pretty text-muted-foreground">
          Describí el problema una sola vez. Obtené un reporte ordenado en
          Markdown, listo para pegar en tu issue.
        </p>
      </header>
      <BugReportForm />
    </main>
  );
}
