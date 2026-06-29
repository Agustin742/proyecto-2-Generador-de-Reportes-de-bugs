import { BugReportPreview } from "@/features/bug-report/components/BugReportPreview";
import { RequiredFieldsNote } from "@/features/bug-report/components/RequiredFieldsNote";
import { BugReportClassificationSection } from "@/features/bug-report/components/sections/BugReportClassificationSection";
import { BugReportEnvironmentSection } from "@/features/bug-report/components/sections/BugReportEnvironmentSection";
import { BugReportGeneralSection } from "@/features/bug-report/components/sections/BugReportGeneralSection";
import { BugReportReproductionSection } from "@/features/bug-report/components/sections/BugReportReproductionSection";
import { BugReportReviewSection } from "@/features/bug-report/components/sections/BugReportReviewSection";
import { TemplateSelector } from "@/features/bug-report/components/TemplateSelector";
import { ToneSelector } from "./ToneSelector";
import { useBugReportForm } from "@/features/bug-report/hooks/useBugReportForm";

import { Button } from "@/shared/components/ui/button";
import { Form } from "@/shared/components/ui/form";

export function BugReportForm() {
  const {
    form,
    watchedValues,
    saveFeedback,
    dismissSaveFeedback,
    onSubmit,
    handleDetectEnvironment,
    handleClearForm,
  } = useBugReportForm();

  return (
    <Form {...form}>
      <div className="mx-auto lg:flex lg:items-start lg:gap-6">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8 rounded-lg border bg-zinc-50/50 p-6 lg:max-w-2xl"
        >
          <RequiredFieldsNote />

          <BugReportGeneralSection form={form} values={watchedValues} />

          <TemplateSelector setValue={form.setValue} />
          <ToneSelector register={form.register} />

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
          />
        </form>

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
              className="rounded-xl border border-border/70 bg-white p-4"
            />
          </div>
        </aside>
      </div>

      {saveFeedback ? (
        <div className="fixed right-4 bottom-4 z-50 w-[min(24rem,calc(100vw-2rem))]">
          <div
            className="flex items-start justify-between gap-3 rounded-lg border border-border/60 bg-background p-3 text-sm shadow-lg"
            role="status"
            aria-live="polite"
          >
            <span>{saveFeedback}</span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={dismissSaveFeedback}
              className="h-auto px-2 py-1"
            >
              Cerrar
            </Button>
          </div>
        </div>
      ) : null}
    </Form>
  );
}
