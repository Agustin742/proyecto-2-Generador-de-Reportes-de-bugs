import { CharacterCount } from "@/features/bug-report/components/CharacterCount";
import { RequiredMark } from "@/features/bug-report/components/RequiredMark";
import { BUG_REPORT_FIELD_LIMITS } from "@/features/bug-report/constants/bugReportValidation";
import type { BugReportFormValues } from "@/features/bug-report/schema";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Textarea } from "@/shared/components/ui/textarea";
import type { UseFormReturn } from "react-hook-form";

type BugReportReproductionSectionProps = {
  form: UseFormReturn<BugReportFormValues>;
  values: Partial<BugReportFormValues>;
};

export function BugReportReproductionSection({
  form,
  values,
}: BugReportReproductionSectionProps) {
  return (
    <section className="space-y-4 rounded-lg border border-border/60 bg-background/60 p-4">
      <div className="space-y-1">
        <h2 className="text-sm font-semibold">Reproducción del bug</h2>
        <p className="text-sm text-muted-foreground">
          Indicá cómo ocurre el problema y qué resultado se esperaba.
        </p>
      </div>

      <div className="space-y-4">
        <FormField
          control={form.control}
          name="steps"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Pasos para reproducir
                <RequiredMark />
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder={`1. Entrar a login.
2. Completar los datos.
3. Hacer clic en Ingresar.`}
                  className="h-28 resize-none"
                  {...field}
                />
              </FormControl>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <FormDescription>
                  Listá los pasos en orden para que otra persona pueda reproducir el
                  bug.
                </FormDescription>
                <CharacterCount
                  value={values.steps}
                  max={BUG_REPORT_FIELD_LIMITS.steps.max}
                />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="expectedResult"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Resultado esperado
                <RequiredMark />
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Ej: El sistema debería iniciar sesión y mostrar el panel."
                  className="h-24 resize-none"
                  {...field}
                />
              </FormControl>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <FormDescription>
                  Describí el comportamiento correcto esperado.
                </FormDescription>
                <CharacterCount
                  value={values.expectedResult}
                  max={BUG_REPORT_FIELD_LIMITS.expectedResult.max}
                />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="actualResult"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Resultado actual
                <RequiredMark />
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Ej: El botón no responde y la sesión no se inicia."
                  className="h-24 resize-none"
                  {...field}
                />
              </FormControl>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <FormDescription>
                  Indicá qué ocurrió realmente y qué vio la persona usuaria.
                </FormDescription>
                <CharacterCount
                  value={values.actualResult}
                  max={BUG_REPORT_FIELD_LIMITS.actualResult.max}
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
