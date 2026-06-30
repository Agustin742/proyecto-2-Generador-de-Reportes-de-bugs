import { useEffect, useId, useRef } from "react";
import { X } from "lucide-react";

import { BugReportForm } from "@/features/bug-report/components/BugReportForm";
import type { SavedReport } from "@/features/bug-report/store";
import { Button } from "@/shared/components/ui/button";

type ReportEditDialogProps = {
  // Reporte a editar; al ser null el modal está cerrado.
  report: SavedReport | null;
  onClose: () => void;
};

/**
 * Modal de edición que reutiliza `BugReportForm` en modo "edit". El preview se
 * oculta (`showPreview={false}`) porque el detalle master-detail ya lo muestra.
 * Se basa en el `<dialog>` nativo para foco/Esc accesibles.
 */
export function ReportEditDialog({ report, onClose }: ReportEditDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  const open = report !== null;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      className="m-auto w-full max-w-3xl rounded-xl border border-border bg-background p-0 text-foreground shadow-lg backdrop:bg-black/40"
    >
      {report ? (
        <div className="max-h-[85vh] overflow-y-auto p-6">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <h2 id={titleId} className="text-lg font-semibold">
                Editar reporte
              </h2>
              <p className="text-sm text-muted-foreground">
                Modificá los campos y guardá para actualizar el reporte.
              </p>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Cerrar edición"
              onClick={onClose}
            >
              <X />
            </Button>
          </div>

          {/* `key` por id: re-monta el formulario con defaultValues frescos
              cuando se cambia de reporte a editar. */}
          <BugReportForm
            key={report.id}
            mode="edit"
            report={report}
            showPreview={false}
            onSaved={onClose}
          />
        </div>
      ) : null}
    </dialog>
  );
}
