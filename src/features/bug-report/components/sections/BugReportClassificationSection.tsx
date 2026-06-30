import { RequiredMark } from "@/features/bug-report/components/RequiredMark";
import { SeverityPriorityHelp } from "@/features/bug-report/components/SeverityPriorityHelp";
import { ToneSelector } from "@/features/bug-report/components/ToneSelector";
import type { BugReportFormValues } from "@/features/bug-report/schema";
import type { HeaderVariant } from "@/features/bug-report/utils/toneTemplates";

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
                <Select onValueChange={field.onChange} value={field.value ?? ""}>
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
                <Select onValueChange={field.onChange} value={field.value ?? ""}>
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

        <ToneSelector control={form.control} />

        <FormField
          control={form.control}
          name="headerVariant"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Variante de encabezados</FormLabel>
              <Select
                onValueChange={(value) =>
                  field.onChange(Number(value) as HeaderVariant)
                }
                value={String(field.value ?? 0)}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccioná la variante" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="0">Variante 1</SelectItem>
                  <SelectItem value="1">Variante 2</SelectItem>
                  <SelectItem value="2">Variante 3</SelectItem>
                  <SelectItem value="3">Variante 4</SelectItem>
                  <SelectItem value="4">Variante 5</SelectItem>
                  <SelectItem value="5">Variante 6</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Cambia la redacción de los títulos de cada sección del reporte.
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
