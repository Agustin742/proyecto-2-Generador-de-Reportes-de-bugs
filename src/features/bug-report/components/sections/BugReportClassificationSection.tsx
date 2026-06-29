import { RequiredMark } from "@/features/bug-report/components/RequiredMark";
import { SeverityPriorityHelp } from "@/features/bug-report/components/SeverityPriorityHelp";
import type { BugReportFormValues } from "@/features/bug-report/schema";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import type { UseFormReturn } from "react-hook-form";

type BugReportClassificationSectionProps = {
  form: UseFormReturn<BugReportFormValues>;
};

export function BugReportClassificationSection({
  form,
}: BugReportClassificationSectionProps) {
  return (
    <section className="space-y-4 rounded-lg border border-border/60 bg-background/60 p-4">
      <div className="space-y-1">
        <h2 className="text-sm font-semibold">Clasificación del reporte</h2>
        <p className="text-sm text-muted-foreground">
          Definí impacto, urgencia y tono del reporte.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="severity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Severidad
                  <RequiredMark />
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger aria-required="true">
                      <SelectValue placeholder="Seleccioná la severidad" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="low">Baja</SelectItem>
                    <SelectItem value="medium">Media</SelectItem>
                    <SelectItem value="high">Alta</SelectItem>
                    <SelectItem value="critical">Crítica</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Marcá cuánto afecta el problema al uso del producto.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Prioridad
                  <RequiredMark />
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger aria-required="true">
                      <SelectValue placeholder="Seleccioná la prioridad" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="low">Baja</SelectItem>
                    <SelectItem value="medium">Media</SelectItem>
                    <SelectItem value="high">Alta</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Indicá qué tan pronto conviene resolverlo.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="tone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Tono
                <RequiredMark />
              </FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger aria-required="true">
                    <SelectValue placeholder="Seleccioná el estilo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="formal">Formal</SelectItem>
                  <SelectItem value="direct">Directo</SelectItem>
                  <SelectItem value="detailed">Detallado</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Elegí cómo querés que se redacte el reporte final.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <SeverityPriorityHelp />
      </div>
    </section>
  );
}
