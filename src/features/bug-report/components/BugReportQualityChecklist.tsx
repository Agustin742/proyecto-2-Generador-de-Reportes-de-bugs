import type { BugReportFormValues } from "@/features/bug-report/schema";

type BugReportQualityChecklistProps = {
  values: BugReportFormValues;
};

export function BugReportQualityChecklist({
  values,
}: BugReportQualityChecklistProps) {
  const checklistItems = [
    {
      label: "Título claro",
      completed: values.title.trim().length > 0,
    },
    {
      label: "Descripción agregada",
      completed: values.description.trim().length > 0,
    },
    {
      label: "Pasos para reproducir",
      completed: values.steps.trim().length > 0,
    },
    {
      label: "Resultado esperado",
      completed: values.expectedResult.trim().length > 0,
    },
    {
      label: "Resultado actual",
      completed: values.actualResult.trim().length > 0,
    },
    {
      label: "Entorno indicado",
      completed: values.environment.trim().length > 0,
    },
    {
      label: "Severidad seleccionada",
      completed: Boolean(values.severity),
    },
    {
      label: "Prioridad seleccionada",
      completed: Boolean(values.priority),
    },
    {
      label: "Tono seleccionado",
      completed: Boolean(values.tone),
    },
  ];

  const completedCount = checklistItems.filter((item) => item.completed).length;

  return (
    <section
      className="space-y-3 rounded-lg border bg-muted/40 p-4"
      aria-live="polite"
    >
      <div className="space-y-1">
        <h2 className="text-sm font-semibold">Calidad del reporte</h2>
        <p className="text-sm text-muted-foreground">
          {completedCount}/{checklistItems.length} puntos completados
        </p>
      </div>

      <ul className="space-y-2 text-sm">
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
