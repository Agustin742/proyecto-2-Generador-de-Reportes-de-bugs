import { BugReportQualityChecklist } from "@/features/bug-report/components/BugReportQualityChecklist";
import { BugReportQualitySuggestions } from "@/features/bug-report/components/BugReportQualitySuggestions";
import type { BugReportFormValues } from "@/features/bug-report/schema";

import { Button } from "@/shared/components/ui/button";
import { useEffect, useId, useState } from "react";
import type { UseFormReturn } from "react-hook-form";

type BugReportReviewSectionProps = {
  form: UseFormReturn<BugReportFormValues>;
  values: Partial<BugReportFormValues>;
  onClearForm: () => void;
};

export function BugReportReviewSection({
  form,
  values,
  onClearForm,
}: BugReportReviewSectionProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const dialogTitleId = useId();
  const dialogDescriptionId = useId();

  useEffect(() => {
    if (!isConfirmOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsConfirmOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isConfirmOpen]);

  function handleConfirmClear() {
    onClearForm();
    setIsConfirmOpen(false);
  }

  return (
    <section className="space-y-4 rounded-lg border border-border/60 bg-background/60 p-4">
      <div className="space-y-1">
        <h2 className="text-sm font-semibold">Revisión final</h2>
        <p className="text-sm text-muted-foreground">
          Revisá si el reporte tiene la información mínima necesaria antes de
          crearlo.
        </p>
      </div>

      <div className="space-y-4">
        <BugReportQualityChecklist values={values} />

        <BugReportQualitySuggestions values={values} />

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button
            type="submit"
            className="w-full sm:w-auto sm:order-2"
            disabled={!form.formState.isValid}
          >
            Crear Reporte de Bug
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => setIsConfirmOpen(true)}
            className="w-full sm:w-auto sm:order-1"
          >
            Limpiar formulario
          </Button>
        </div>
      </div>

      {isConfirmOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
          role="presentation"
          onClick={() => setIsConfirmOpen(false)}
        >
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby={dialogTitleId}
            aria-describedby={dialogDescriptionId}
            className="w-full max-w-md rounded-xl border border-border bg-background p-5 shadow-lg"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="space-y-2">
              <h3 id={dialogTitleId} className="text-base font-semibold">
                ¿Borrar datos cargados?
              </h3>
              <p
                id={dialogDescriptionId}
                className="text-sm text-muted-foreground"
              >
                Esta acción limpiará el formulario actual.
              </p>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsConfirmOpen(false)}
                autoFocus
              >
                Cancelar
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={handleConfirmClear}
              >
                Borrar
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
