import { useId, useRef } from "react";

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

  function syncDialog(node: HTMLDialogElement | null) {
    dialogRef.current = node;
    if (!node) return;
    if (open && !node.open) {
      node.showModal();
    } else if (!open && node.open) {
      node.close();
    }
  }

  return (
    <dialog
      ref={syncDialog}
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
