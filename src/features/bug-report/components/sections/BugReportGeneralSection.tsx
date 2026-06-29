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
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import type { UseFormReturn } from "react-hook-form";

type BugReportGeneralSectionProps = {
  form: UseFormReturn<BugReportFormValues>;
  values: Partial<BugReportFormValues>;
};

export function BugReportGeneralSection({
  form,
  values,
}: BugReportGeneralSectionProps) {
  return (
    <section className="space-y-4 rounded-lg border border-border/60 bg-background/60 p-4">
      <div className="space-y-1">
        <h2 className="text-sm font-semibold">Información general</h2>
        <p className="text-sm text-muted-foreground">
          Datos principales para identificar el bug.
        </p>
      </div>

      <div className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Título del bug
                <RequiredMark />
              </FormLabel>
              <FormControl>
                <Input placeholder="Ej: Error al guardar cambios" {...field} />
              </FormControl>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <FormDescription>
                  Usá un resumen breve del problema y dónde ocurre.
                </FormDescription>
                <CharacterCount
                  value={values.title}
                  max={BUG_REPORT_FIELD_LIMITS.title.max}
                />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Descripción detallada
                <RequiredMark />
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Ej: Al guardar el perfil, la pantalla queda cargando y no confirma los cambios."
                  className="h-32 resize-none"
                  {...field}
                />
              </FormControl>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <FormDescription>
                  Contá qué estaba haciendo la persona usuaria cuando apareció el
                  problema.
                </FormDescription>
                <CharacterCount
                  value={values.description}
                  max={BUG_REPORT_FIELD_LIMITS.description.max}
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
