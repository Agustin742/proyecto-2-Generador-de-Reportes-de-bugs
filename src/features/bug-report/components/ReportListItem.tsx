import { Pencil, Trash2 } from "lucide-react";

import type { SavedReport } from "@/features/bug-report/store";
import type { Priority, Severity } from "@/features/bug-report/types";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";

const SEVERITY_LABELS: Record<Severity, string> = {
  low: "Baja",
  medium: "Media",
  high: "Alta",
  critical: "Crítica",
};

const PRIORITY_LABELS: Record<Priority, string> = {
  low: "Baja",
  medium: "Media",
  high: "Alta",
};

const dateFormatter = new Intl.DateTimeFormat("es", {
  dateStyle: "medium",
  timeStyle: "short",
});

type ReportListItemProps = {
  report: SavedReport;
  selected: boolean;
  onSelect: (id: string) => void;
  onEdit: (report: SavedReport) => void;
  onDelete: (report: SavedReport) => void;
};

export function ReportListItem({
  report,
  selected,
  onSelect,
  onEdit,
  onDelete,
}: ReportListItemProps) {
  const { values } = report;
  const title = values.title?.trim() || "Reporte sin título";

  return (
    <li className="relative">
      <button
        type="button"
        onClick={() => onSelect(report.id)}
        aria-pressed={selected}
        aria-label={`Ver reporte: ${title}`}
        className={cn(
          "w-full rounded-lg border p-4 pr-20 text-left transition-colors",
          selected
            ? "border-primary/60 bg-primary/[0.06]"
            : "border-border/60 bg-card/40 hover:border-border hover:bg-card/60",
        )}
      >
        <h3 className="truncate text-sm font-semibold text-foreground">
          {title}
        </h3>

        <div className="mt-2 flex flex-wrap items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.12em]">
          {values.severity ? (
            <span className="rounded-[4px] bg-primary/10 px-2 py-0.5 text-primary">
              Sev: {SEVERITY_LABELS[values.severity]}
            </span>
          ) : null}
          {values.priority ? (
            <span className="rounded-[4px] bg-muted px-2 py-0.5 text-muted-foreground">
              Prio: {PRIORITY_LABELS[values.priority]}
            </span>
          ) : null}
        </div>

        <p className="mt-2 font-mono text-[0.7rem] text-faint">
          {dateFormatter.format(report.createdAt)}
        </p>
      </button>

      {/* Acciones superpuestas: van fuera del botón selector para no anidar
          botones (HTML inválido + problemas de a11y). */}
      <div className="absolute right-3 top-3 flex gap-1">
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label={`Editar reporte: ${title}`}
          title="Editar"
          onClick={() => onEdit(report)}
        >
          <Pencil />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label={`Eliminar reporte: ${title}`}
          title="Eliminar"
          className="text-muted-foreground hover:text-destructive"
          onClick={() => onDelete(report)}
        >
          <Trash2 />
        </Button>
      </div>
    </li>
  );
}
