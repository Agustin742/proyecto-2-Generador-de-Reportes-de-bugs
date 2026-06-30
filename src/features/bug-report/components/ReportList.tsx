import { ReportListItem } from "@/features/bug-report/components/ReportListItem";
import type { SavedReport } from "@/features/bug-report/store";
import { Button } from "@/shared/components/ui/button";

type ReportListProps = {
  reports: SavedReport[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onEdit: (report: SavedReport) => void;
  onDelete: (report: SavedReport) => void;
  onClearAll: () => void;
};

export function ReportList({
  reports,
  selectedId,
  onSelect,
  onEdit,
  onDelete,
  onClearAll,
}: ReportListProps) {
  return (
    <section className="space-y-4" aria-label="Reportes guardados">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
          {reports.length} {reports.length === 1 ? "reporte" : "reportes"}
        </h2>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-destructive"
          onClick={onClearAll}
        >
          Eliminar todos
        </Button>
      </div>

      <ul className="space-y-3">
        {reports.map((report) => (
          <ReportListItem
            key={report.id}
            report={report}
            selected={report.id === selectedId}
            onSelect={onSelect}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </section>
  );
}
