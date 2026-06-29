import type { BugReportFormValues } from "@/features/bug-report/schema";

export type BugReportQualityValues = Partial<BugReportFormValues>;

export type BugReportChecklistItem = {
  label: string;
  completed: boolean;
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

export function normalizeOptionalString(value?: string) {
  return value ?? "";
}

export function normalizeComparableText(value?: string) {
  return normalizeOptionalString(value).trim().toLowerCase();
}

export function hasListedSteps(steps?: string) {
  return normalizeOptionalString(steps)
    .split(/\r?\n/)
    .some((line) => /^(\s*(\d+[.)]|[-*]))\s+/.test(line));
}

export function isGenericEnvironment(environment?: string) {
  const normalizedEnvironment = normalizeComparableText(environment);

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

export function getBugReportQualityChecklistItems(
  values: BugReportQualityValues,
): BugReportChecklistItem[] {
  return [
    {
      label: "Título claro",
      completed: normalizeOptionalString(values.title).trim().length > 0,
    },
    {
      label: "Descripción agregada",
      completed: normalizeOptionalString(values.description).trim().length > 0,
    },
    {
      label: "Pasos para reproducir",
      completed: normalizeOptionalString(values.steps).trim().length > 0,
    },
    {
      label: "Resultado esperado",
      completed:
        normalizeOptionalString(values.expectedResult).trim().length > 0,
    },
    {
      label: "Resultado actual",
      completed: normalizeOptionalString(values.actualResult).trim().length > 0,
    },
    {
      label: "Entorno indicado",
      completed: normalizeOptionalString(values.environment).trim().length > 0,
    },
    {
      label: "Severidad seleccionada",
      completed: Boolean(values.severity),
    },
    {
      label: "Prioridad seleccionada",
      completed: Boolean(values.priority),
    },
    {
      label: "Tono seleccionado",
      completed: Boolean(values.tone),
    },
  ];
}

export function getBugReportQualityCompletedCount(
  items: BugReportChecklistItem[],
) {
  return items.filter((item) => item.completed).length;
}

export function hasMinimumInformationForQualitySuggestions(
  values: BugReportQualityValues,
) {
  return (
    normalizeOptionalString(values.steps).trim().length > 0 &&
    normalizeOptionalString(values.expectedResult).trim().length > 0 &&
    normalizeOptionalString(values.actualResult).trim().length > 0 &&
    normalizeOptionalString(values.environment).trim().length > 0
  );
}

export function getBugReportQualitySuggestions(
  values: BugReportQualityValues,
) {
  const suggestions: string[] = [];
  const steps = normalizeOptionalString(values.steps);
  const expectedResult = normalizeOptionalString(values.expectedResult);
  const actualResult = normalizeOptionalString(values.actualResult);
  const environment = normalizeOptionalString(values.environment);

  if (steps.trim().length > 0 && !hasListedSteps(steps)) {
    suggestions.push(
      "Sugerencia: escribí los pasos numerados o en lista para facilitar la reproducción del bug.",
    );
  }

  const normalizedExpectedResult = normalizeComparableText(expectedResult);
  const normalizedActualResult = normalizeComparableText(actualResult);

  if (
    normalizedExpectedResult.length > 0 &&
    normalizedActualResult.length > 0 &&
    normalizedExpectedResult === normalizedActualResult
  ) {
    suggestions.push(
      "Sugerencia: diferenciá el resultado esperado del resultado actual para que el reporte sea más claro.",
    );
  }

  if (environment.trim().length > 0 && isGenericEnvironment(environment)) {
    suggestions.push(
      "Sugerencia: agregá navegador, sistema operativo, dispositivo o URL al entorno.",
    );
  }

  return suggestions;
}
