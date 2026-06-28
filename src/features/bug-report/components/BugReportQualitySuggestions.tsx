import type { BugReportFormValues } from "@/features/bug-report/schema";

type BugReportQualitySuggestionsProps = {
  values: Partial<BugReportFormValues>;
};

const genericEnvironmentValues = new Set([
  "produccion",
  "producción",
  "production",
  "staging",
  "dev",
  "desarrollo",
  "testing",
  "test",
]);

const technicalEnvironmentHints = [
  "chrome",
  "firefox",
  "edge",
  "safari",
  "windows",
  "mac",
  "linux",
  "android",
  "ios",
  "http",
  "localhost",
];

function hasListedSteps(steps: string) {
  return steps
    .split(/\r?\n/)
    .some((line) => /^(\s*(\d+[.)]|[-*]))\s+/.test(line));
}

function isGenericEnvironment(environment: string) {
  const normalizedEnvironment = environment.trim().toLowerCase();

  if (!normalizedEnvironment) {
    return false;
  }

  if (genericEnvironmentValues.has(normalizedEnvironment)) {
    return true;
  }

  const hasTechnicalHint = technicalEnvironmentHints.some((hint) =>
    normalizedEnvironment.includes(hint),
  );

  const wordCount = normalizedEnvironment.split(/\s+/).filter(Boolean).length;

  return wordCount < 3 && !hasTechnicalHint;
}

export function BugReportQualitySuggestions({
  values,
}: BugReportQualitySuggestionsProps) {
  const suggestions: string[] = [];
  const steps = values.steps ?? "";
  const expectedResult = values.expectedResult ?? "";
  const actualResult = values.actualResult ?? "";
  const environment = values.environment ?? "";

  const hasMinimumInformation =
    steps.trim().length > 0 &&
    expectedResult.trim().length > 0 &&
    actualResult.trim().length > 0 &&
    environment.trim().length > 0;

  if (steps.trim().length > 0 && !hasListedSteps(steps)) {
    suggestions.push(
      "Sugerencia: escribí los pasos numerados o en lista para facilitar la reproducción del bug.",
    );
  }

  const normalizedExpectedResult = expectedResult.trim().toLowerCase();
  const normalizedActualResult = actualResult.trim().toLowerCase();

  if (
    normalizedExpectedResult.length > 0 &&
    normalizedActualResult.length > 0 &&
    normalizedExpectedResult === normalizedActualResult
  ) {
    suggestions.push(
      "Sugerencia: diferenciá el resultado esperado del resultado actual para que el reporte sea más claro.",
    );
  }

  if (
    environment.trim().length > 0 &&
    isGenericEnvironment(environment)
  ) {
    suggestions.push(
      "Sugerencia: agregá navegador, sistema operativo, dispositivo o URL al entorno.",
    );
  }

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
