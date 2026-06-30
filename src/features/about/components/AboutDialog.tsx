import { useId, useRef, useState } from "react";
import { Info, X } from "lucide-react";

import { AboutContent } from "@/features/about/components/AboutContent";
import { Button } from "@/shared/components/ui/button";

type AboutDialogProps = {
  /**
   * Apertura controlada. Si se omite, el componente maneja su propio estado
   * (modo autocontenido del navbar de escritorio).
   */
  open?: boolean;
  /** Notifica los cambios de apertura cuando se usa controlado. */
  onOpenChange?: (open: boolean) => void;
  /** Renderiza el disparador propio del navbar (por defecto `true`). */
  showTrigger?: boolean;
};

/**
 * Modal "Acerca de" (RFC-0004). Por defecto es autocontenido: incluye su propio
 * disparador en el navbar y maneja su estado de apertura, de modo que integrarlo
 * es ~1 línea. También admite control externo (`open`/`onOpenChange` con
 * `showTrigger={false}`) para abrirlo desde otro origen, como el menú mobile.
 *
 * Usa el `<dialog>` nativo (mismo patrón que `ConfirmDialog`): trampa de foco y
 * cierre con `Esc` gratis. La entrada de la tarjeta (`animate-about-card-in`) y
 * el vuelo de la polilla (`animate-moth-land`) se reproducen en cada apertura
 * porque el contenido se monta sólo cuando `open` es `true`. Con
 * `prefers-reduced-motion` el bloque global de `index.css` apaga las
 * animaciones y el modal aparece ya armado.
 */
export function AboutDialog({
  open: openProp,
  onOpenChange,
  showTrigger = true,
}: AboutDialogProps = {}) {
  const isControlled = openProp !== undefined;
  const [openState, setOpenState] = useState(false);
  const open = isControlled ? openProp : openState;

  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  const setOpen = (value: boolean) => {
    if (!isControlled) setOpenState(value);
    onOpenChange?.(value);
  };

  function syncDialog(node: HTMLDialogElement | null) {
    dialogRef.current = node;
    if (!node) return;
    if (open && !node.open) {
      node.showModal();
    } else if (!open && node.open) {
      node.close();
    }
  }

  const close = () => {
    setOpen(false);
    // El foco vuelve al disparador propio al cerrar (RFC-0004 §6). En modo
    // controlado (sin disparador propio) es el padre quien restaura el foco vía
    // `onOpenChange`.
    triggerRef.current?.focus();
  };

  return (
    <>
      {showTrigger ? (
        <Button
          ref={triggerRef}
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setOpen(true)}
          className="gap-1.5 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground hover:text-primary"
        >
          <Info aria-hidden />
          Acerca de
        </Button>
      ) : null}

      <dialog
        ref={syncDialog}
        aria-labelledby={titleId}
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        // `font-sans normal-case tracking-normal text-base` resetean lo que el
        // <dialog> hereda del contenedor del navbar (font-mono + uppercase +
        // tracking), que de otro modo afecta a todo el cuerpo del modal.
        className="about-dialog m-auto w-[min(36rem,calc(100vw-2rem))] rounded-card border border-border bg-card p-0 font-sans text-base normal-case tracking-normal text-foreground shadow-2xl"
      >
        {open ? (
          <div className="animate-about-card-in relative p-6 sm:p-8">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={close}
              aria-label="Cerrar"
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
            >
              <X aria-hidden />
            </Button>
            <AboutContent titleId={titleId} />
          </div>
        ) : null}
      </dialog>
    </>
  );
}
