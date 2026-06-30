import { useEffect, useId, useRef, useState } from "react";
import { Info, X } from "lucide-react";

import { AboutContent } from "@/features/about/components/AboutContent";
import { Button } from "@/shared/components/ui/button";

/**
 * Modal "Acerca de" (RFC-0004). Autocontenido: incluye su propio disparador en
 * el navbar y maneja su estado de apertura, de modo que integrarlo es ~1 línea.
 *
 * Usa el `<dialog>` nativo (mismo patrón que `ConfirmDialog`): trampa de foco y
 * cierre con `Esc` gratis. La entrada de la tarjeta (`animate-about-card-in`) y
 * el vuelo de la polilla (`animate-moth-land`) se reproducen en cada apertura
 * porque el contenido se monta sólo cuando `open` es `true`. Con
 * `prefers-reduced-motion` el bloque global de `index.css` apaga las
 * animaciones y el modal aparece ya armado.
 */
export function AboutDialog() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  // Sincroniza el estado controlado con la API imperativa del <dialog> para
  // conservar backdrop modal y accesibilidad nativos (React docs: useEffect +
  // showModal/close).
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  const close = () => {
    setOpen(false);
    // El foco vuelve al disparador al cerrar (RFC-0004 §6).
    triggerRef.current?.focus();
  };

  return (
    <>
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

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        onCancel={(event) => {
          // Esc: el <dialog> intenta cerrarse; lo enrutamos por `close` para
          // sincronizar el estado y devolver el foco.
          event.preventDefault();
          close();
        }}
        onClick={(event) => {
          // Click en el overlay (área del propio <dialog>, fuera de la tarjeta).
          if (event.target === dialogRef.current) close();
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
