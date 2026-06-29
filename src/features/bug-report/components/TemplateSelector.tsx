
import type { UseFormSetValue } from "react-hook-form";
import type { BugReportFormValues } from "../schema";
import type { BugTemplate } from "../types";
import { applyTemplate } from "../utils/bugTemplates";
import { Button } from "@/shared/components/ui/button";

interface TemplateSelectorProps {
  setValue: UseFormSetValue<BugReportFormValues>;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({ setValue }) => {
  const handleSelect = (template: BugTemplate) => {
    const fields = applyTemplate(template);
    Object.entries(fields).forEach(([key, value]) => {
      setValue(key as keyof BugReportFormValues, value, {
        shouldDirty: true,
        shouldValidate: true,
      });
    });
  };

  return (
    <div className="p-4 rounded-lg border border-border/60 bg-background/60 space-y-3">
      <div>
        <h3 className="text-sm font-semibold">Plantillas sugeridas</h3>
        <p className="text-sm text-muted-foreground">
          Seleccioná una opción para precargar campos con estructuras base de testing.
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => handleSelect("visual")}
          className="cursor-pointer border-blue-200 hover:bg-blue-50 hover:text-blue-600 dark:border-blue-900/50 dark:hover:bg-blue-950/30"
        >
           Visual
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => handleSelect("functional")}
          className="cursor-pointer border-green-200 hover:bg-green-50 hover:text-green-600 dark:border-green-900/50 dark:hover:bg-green-950/30"
        >
           Funcional
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => handleSelect("performance")}
          className="cursor-pointer border-amber-200 hover:bg-amber-50 hover:text-amber-600 dark:border-amber-900/50 dark:hover:bg-amber-950/30"
        >
           Rendimiento
        </Button>
      </div>
    </div>
  );
};