import { BugReportQualityChecklist } from "@/features/bug-report/components/BugReportQualityChecklist";
import { BugReportQualitySuggestions } from "@/features/bug-report/components/BugReportQualitySuggestions";
import type { BugReportFormValues } from "@/features/bug-report/schema";

import { Button } from "@/shared/components/ui/button";
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
            onClick={onClearForm}
            className="w-full sm:w-auto sm:order-1"
          >
            Limpiar formulario
          </Button>
        </div>
      </div>
    </section>
  );
}
