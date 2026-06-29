import type { BugReportFormValues } from "@/features/bug-report/schema";
import {
  getBugReportQualitySuggestions,
  hasMinimumInformationForQualitySuggestions,
} from "@/features/bug-report/utils/bugReportQuality";

type BugReportQualitySuggestionsProps = {
  values: Partial<BugReportFormValues>;
};

export function BugReportQualitySuggestions({
  values,
}: BugReportQualitySuggestionsProps) {
  const suggestions = getBugReportQualitySuggestions(values);
  const hasMinimumInformation =
    hasMinimumInformationForQualitySuggestions(values);
  const hasSuggestions = suggestions.length > 0;

  return (
    <section className="rounded-lg border bg-muted/30 p-4" aria-live="polite">
      <div className="space-y-1">
        <h2 className="text-sm font-semibold">Sugerencias para mejorar</h2>
      </div>

      {hasSuggestions ? (
        <ul className="mt-3 space-y-2 text-sm">
          {suggestions.map((suggestion) => (
            <li key={suggestion} className="flex items-start gap-2">
              <span aria-hidden="true" className="font-medium">
                ○
              </span>
              <span>{suggestion}</span>
            </li>
          ))}
        </ul>
      ) : hasMinimumInformation ? (
        <div className="mt-3 flex items-start gap-2 text-sm">
          <span aria-hidden="true" className="font-medium">
            ✓
          </span>
          <span>El reporte se ve claro y completo.</span>
        </div>
      ) : (
        <div className="mt-3 flex items-start gap-2 text-sm text-muted-foreground">
          <span aria-hidden="true" className="font-medium">
            ○
          </span>
          <span>Completá el reporte para recibir sugerencias de mejora.</span>
        </div>
      )}
    </section>
  );
}
