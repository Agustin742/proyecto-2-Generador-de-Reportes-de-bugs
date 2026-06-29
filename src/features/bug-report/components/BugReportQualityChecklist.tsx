import type { BugReportFormValues } from "@/features/bug-report/schema";
import {
  getBugReportQualityChecklistItems,
  getBugReportQualityCompletedCount,
} from "@/features/bug-report/utils/bugReportQuality";

type BugReportQualityChecklistProps = {
  values: Partial<BugReportFormValues>;
};

export function BugReportQualityChecklist({
  values,
}: BugReportQualityChecklistProps) {
  const checklistItems = getBugReportQualityChecklistItems(values);
  const completedCount = getBugReportQualityCompletedCount(checklistItems);

  return (
    <section className="rounded-lg border bg-muted/30 p-4">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-sm font-semibold">Calidad del reporte</h2>
        <p className="text-sm text-muted-foreground">
          {completedCount}/{checklistItems.length} puntos completados
        </p>
      </div>
      <p className="sr-only" aria-live="polite">
        {completedCount} de {checklistItems.length} puntos completados.
      </p>

      <ul className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
        {checklistItems.map((item) => (
          <li key={item.label} className="flex items-start gap-2">
            <span aria-hidden="true" className="font-medium">
              {item.completed ? "✓" : "○"}
            </span>
            <span>
              <span className="sr-only">
                {item.completed ? "Completado: " : "Pendiente: "}
              </span>
              {item.label}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
