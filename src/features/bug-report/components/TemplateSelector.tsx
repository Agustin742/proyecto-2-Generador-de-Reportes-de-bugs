import type { UseFormSetValue } from "react-hook-form";
import type { BugReportFormValues } from "../schema";
import type { BugTemplate } from "../types";
import { applyTemplate } from "../utils/bugTemplates";
import { Button } from "@/shared/components/ui/button";

interface TemplateSelectorProps {
  setValue: UseFormSetValue<BugReportFormValues>;
}

export function TemplateSelector({ setValue }: TemplateSelectorProps) {
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
          className="cursor-pointer hover:border-primary hover:bg-primary/10 hover:text-primary"
        >
           Visual
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => handleSelect("functional")}
          className="cursor-pointer hover:border-primary hover:bg-primary/10 hover:text-primary"
        >
           Funcional
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => handleSelect("performance")}
          className="cursor-pointer hover:border-primary hover:bg-primary/10 hover:text-primary"
        >
           Rendimiento
        </Button>
      </div>
    </div>
  );
}