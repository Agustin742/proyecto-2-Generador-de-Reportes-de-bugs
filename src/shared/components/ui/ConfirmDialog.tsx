import { useEffect, useId, useRef } from "react";

import { Button } from "@/shared/components/ui/button";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

/**
 * Diálogo de confirmación reutilizable basado en el `<dialog>` nativo:
 * trampa de foco y cierre con Esc gratis. El estado de apertura lo controla
 * el padre con `open`; al cerrarse por Esc se notifica con `onCancel`.
 */
export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Eliminar",
  cancelLabel = "Cancelar",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  // Sincroniza el atributo `open` controlado con la API imperativa del <dialog>
  // para mantener el backdrop modal y la accesibilidad nativos.
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
      role="alertdialog"
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      onCancel={(event) => {
        event.preventDefault();
        onCancel();
      }}
      className="m-auto w-full max-w-md rounded-xl border border-border bg-background p-5 text-foreground shadow-lg backdrop:bg-black/40"
    >
      <div className="space-y-2">
        <h3 id={titleId} className="text-base font-semibold">
          {title}
        </h3>
        {description ? (
          <p id={descriptionId} className="text-sm text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" onClick={onCancel} autoFocus>
          {cancelLabel}
        </Button>
        <Button type="button" variant="destructive" onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </div>
    </dialog>
  );
}
