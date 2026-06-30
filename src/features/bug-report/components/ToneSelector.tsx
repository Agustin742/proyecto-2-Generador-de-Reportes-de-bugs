import type { Control } from "react-hook-form";

import { FieldLabel } from "@/features/bug-report/components/FieldLabel";
import type { BugReportFormValues } from "@/features/bug-report/schema";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/shared/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

type ToneSelectorProps = {
  control: Control<BugReportFormValues>;
};

export function ToneSelector({ control }: ToneSelectorProps) {
  return (
    <FormField
      control={control}
      name="tone"
      render={({ field }) => (
        <FormItem>
          <FieldLabel index="08" required>
            Tono
          </FieldLabel>
          <Select onValueChange={field.onChange} value={field.value ?? ""}>
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
  );
}
