import { BugReportForm } from "@/features/bug-report/components/BugReportForm";

export function HomePage() {
  return (
    <main className="container mx-auto p-8 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Portal de Reportes de Bugs
        </h1>
        <p className="text-muted-foreground">
          Estructura base de la SPA con validación en runtime.
        </p>
      </div>
      <BugReportForm />
    </main>
  );
}
