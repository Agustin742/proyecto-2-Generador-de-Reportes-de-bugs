import { BugReportPreview } from "@/features/bug-report/components/BugReportPreview";
import { RequiredFieldsNote } from "@/features/bug-report/components/RequiredFieldsNote";
import { BugReportClassificationSection } from "@/features/bug-report/components/sections/BugReportClassificationSection";
import { BugReportEnvironmentSection } from "@/features/bug-report/components/sections/BugReportEnvironmentSection";
import { BugReportGeneralSection } from "@/features/bug-report/components/sections/BugReportGeneralSection";
import { BugReportReproductionSection } from "@/features/bug-report/components/sections/BugReportReproductionSection";
import { BugReportReviewSection } from "@/features/bug-report/components/sections/BugReportReviewSection";
import { TemplateSelector } from "@/features/bug-report/components/TemplateSelector";
import {
  useBugReportForm,
  type UseBugReportFormOptions,
} from "@/features/bug-report/hooks/useBugReportForm";

import { Form } from "@/shared/components/ui/form";
import { Toast } from "@/shared/components/ui/toast";

type BugReportFormProps = UseBugReportFormOptions & {
  // Oculta la columna de preview (el modal de edición ya muestra el detalle).
  showPreview?: boolean;
};

export function BugReportForm({
  mode,
  report,
  onSaved,
  showPreview = true,
}: BugReportFormProps = {}) {
  const {
    form,
    watchedValues,
    saveFeedback,
    dismissSaveFeedback,
    onSubmit,
    handleDetectEnvironment,
    handleClearForm,
  } = useBugReportForm({ mode, report, onSaved });

  return (
    <Form {...form}>
      <div className="mx-auto lg:flex lg:items-start lg:gap-6">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={
            showPreview
              ? "w-full space-y-8 rounded-lg border border-border bg-card/60 p-6 lg:max-w-2xl"
              : "w-full space-y-8"
          }
        >
          <RequiredFieldsNote />

          <BugReportGeneralSection form={form} values={watchedValues} />

          <TemplateSelector setValue={form.setValue} />

          <BugReportReproductionSection form={form} values={watchedValues} />

          <BugReportClassificationSection form={form} />

          <BugReportEnvironmentSection
            form={form}
            values={watchedValues}
            onDetectEnvironment={handleDetectEnvironment}
          />

          <BugReportReviewSection
            form={form}
            values={watchedValues}
            onClearForm={handleClearForm}
            submitLabel={
              mode === "edit" ? "Guardar cambios" : "Crear Reporte de Bug"
            }
          />
        </form>

        {showPreview ? (
          <aside className="mt-6 lg:mt-0 lg:w-1/3 lg:sticky lg:top-6">
          <div className="space-y-4 rounded-3xl border border-border/60 bg-background/60 p-5 shadow-sm">
            <div className="space-y-2">
              <h2 className="text-sm font-semibold">Vista previa Markdown</h2>
              <p className="text-sm text-muted-foreground">
                El reporte se actualiza en vivo con lo que completes arriba.
              </p>
            </div>

            <BugReportPreview
              values={watchedValues}
              headerVariant={watchedValues.headerVariant ?? 0}
              className="rounded-xl border border-border/70 bg-card/70 p-4"
            />
          </div>
          </aside>
        ) : null}
      </div>

      {saveFeedback ? (
        <div className="fixed right-4 bottom-4 z-50 w-[min(24rem,calc(100vw-2rem))]">
          <Toast onClose={dismissSaveFeedback}>{saveFeedback}</Toast>
        </div>
      ) : null}
    </Form>
  );
}
