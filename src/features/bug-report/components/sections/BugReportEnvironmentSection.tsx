import { CharacterCount } from "@/features/bug-report/components/CharacterCount";
import { FieldLabel } from "@/features/bug-report/components/FieldLabel";
import { BUG_REPORT_FIELD_LIMITS } from "@/features/bug-report/constants/bugReportValidation";
import type { BugReportFormValues } from "@/features/bug-report/schema";

import { Button } from "@/shared/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import type { UseFormReturn } from "react-hook-form";

type BugReportEnvironmentSectionProps = {
  form: UseFormReturn<BugReportFormValues>;
  values: Partial<BugReportFormValues>;
  onDetectEnvironment: () => void;
};

export function BugReportEnvironmentSection({
  form,
  values,
  onDetectEnvironment,
}: BugReportEnvironmentSectionProps) {
  return (
    <section className="space-y-4 rounded-lg border border-border/60 bg-background/60 p-4">
      <div className="space-y-1">
        <h2 className="text-sm font-semibold">Contexto técnico</h2>
        <p className="text-sm text-muted-foreground">
          Agregá información del entorno donde ocurre el bug.
        </p>
      </div>

      <div className="space-y-4">
        <FormField
          control={form.control}
          name="environment"
          render={({ field }) => (
            <FormItem>
              <FieldLabel index="10" required>
                Entorno
              </FieldLabel>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                <FormControl>
                  <Input
                    aria-required="true"
                    placeholder="Ej: Chrome 125 en Windows 11, localhost:5173"
                    {...field}
                  />
                </FormControl>
                <Button
                  type="button"
                  variant="outline"
                  onClick={onDetectEnvironment}
                  className="sm:self-start"
                >
                  Detectar entorno
                </Button>
              </div>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <FormDescription>
                  Agregá navegador, sistema operativo, dispositivo o URL si aplica.
                </FormDescription>
                <CharacterCount
                  value={values.environment}
                  max={BUG_REPORT_FIELD_LIMITS.environment.max}
                />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </section>
  );
}
