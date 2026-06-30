import { useState } from "react";
import { Link } from "react-router-dom";

import { BugReportPreview } from "@/features/bug-report/components/BugReportPreview";
import { ReportEditDialog } from "@/features/bug-report/components/ReportEditDialog";
import { ReportList } from "@/features/bug-report/components/ReportList";
import { useBugReportStore, type SavedReport } from "@/features/bug-report/store";
import { Button } from "@/shared/components/ui/button";
import { ConfirmDialog } from "@/shared/components/ui/ConfirmDialog";

export function ReportsPage() {
  const reports = useBugReportStore((state) => state.reports);
  const deleteReport = useBugReportStore((state) => state.deleteReport);
  const clearReports = useBugReportStore((state) => state.clearReports);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editingReport, setEditingReport] = useState<SavedReport | null>(null);
  const [pendingDelete, setPendingDelete] = useState<SavedReport | null>(null);
  const [confirmClearAll, setConfirmClearAll] = useState(false);

  // Del más nuevo al más viejo.
  const sortedReports = [...reports].sort(
    (a, b) => b.createdAt - a.createdAt,
  );

  // El seleccionado es el de `selectedId`; si no existe (o se eliminó) cae al
  // más nuevo disponible. Así la selección se reajusta sola tras eliminar.
  const selected =
    sortedReports.find((report) => report.id === selectedId) ??
    sortedReports[0] ??
    null;

  function handleConfirmDelete() {
    if (pendingDelete) {
      deleteReport(pendingDelete.id);
    }
    setPendingDelete(null);
  }

  function handleConfirmClearAll() {
    clearReports();
    setConfirmClearAll(false);
  }

  if (sortedReports.length === 0) {
    return (
      <main className="container mx-auto max-w-5xl px-6 py-16">
        <div className="mx-auto max-w-md space-y-5 rounded-3xl border border-border/60 bg-card/40 p-10 text-center">
          <h1 className="font-display text-3xl font-bold">
            Todavía no hay reportes
          </h1>
          <p className="text-sm text-muted-foreground">
            Cuando guardes un reporte, va a aparecer acá para verlo, copiarlo,
            editarlo o eliminarlo.
          </p>
          <Button asChild>
            <Link to="/">Crear un reporte</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto max-w-6xl space-y-8 px-6 py-16">
      <header className="max-w-3xl space-y-3">
        <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
          Reportes <span className="text-primary">guardados</span>
        </h1>
        <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
          Seleccioná un reporte para ver su Markdown, copiarlo, editarlo o
          eliminarlo.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,22rem)_1fr]">
        <ReportList
          reports={sortedReports}
          selectedId={selected?.id ?? null}
          onSelect={setSelectedId}
          onEdit={setEditingReport}
          onDelete={setPendingDelete}
          onClearAll={() => setConfirmClearAll(true)}
        />

        <div className="lg:sticky lg:top-6 lg:self-start">
          {selected ? (
            <BugReportPreview
              values={selected.values}
              headerVariant={selected.values.headerVariant ?? 0}
            />
          ) : null}
        </div>
      </div>

      <ReportEditDialog
        report={editingReport}
        onClose={() => setEditingReport(null)}
      />

      <ConfirmDialog
        open={pendingDelete !== null}
        title="¿Eliminar este reporte?"
        description="Esta acción no se puede deshacer."
        onConfirm={handleConfirmDelete}
        onCancel={() => setPendingDelete(null)}
      />

      <ConfirmDialog
        open={confirmClearAll}
        title="¿Eliminar todos los reportes?"
        description="Se eliminarán todos los reportes guardados. Esta acción no se puede deshacer."
        confirmLabel="Eliminar todos"
        onConfirm={handleConfirmClearAll}
        onCancel={() => setConfirmClearAll(false)}
      />
    </main>
  );
}
