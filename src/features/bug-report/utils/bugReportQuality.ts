import { BUG_REPORT_FIELD_LIMITS } from "@/features/bug-report/constants/bugReportValidation";
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

function hasMinimumLength(value: string | undefined, minLength: number) {
  return normalizeOptionalString(value).trim().length >= minLength;
}

function hasSelectedValue<T>(value: T | undefined) {
  return Boolean(value);
}

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
      completed: hasMinimumLength(values.title, BUG_REPORT_FIELD_LIMITS.title.min),
    },
    {
      label: "Descripción agregada",
      completed: hasMinimumLength(
        values.description,
        BUG_REPORT_FIELD_LIMITS.description.min,
      ),
    },
    {
      label: "Pasos para reproducir",
      completed: hasMinimumLength(values.steps, BUG_REPORT_FIELD_LIMITS.steps.min),
    },
    {
      label: "Resultado esperado",
      completed: hasMinimumLength(
        values.expectedResult,
        BUG_REPORT_FIELD_LIMITS.expectedResult.min,
      ),
    },
    {
      label: "Resultado actual",
      completed: hasMinimumLength(
        values.actualResult,
        BUG_REPORT_FIELD_LIMITS.actualResult.min,
      ),
    },
    {
      label: "Entorno indicado",
      completed: hasMinimumLength(
        values.environment,
        BUG_REPORT_FIELD_LIMITS.environment.min,
      ),
    },
    {
      label: "Severidad seleccionada",
      completed: hasSelectedValue(values.severity),
    },
    {
      label: "Prioridad seleccionada",
      completed: hasSelectedValue(values.priority),
    },
    {
      label: "Tono seleccionado",
      completed: hasSelectedValue(values.tone),
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
    hasMinimumLength(values.title, BUG_REPORT_FIELD_LIMITS.title.min) &&
    hasMinimumLength(
      values.description,
      BUG_REPORT_FIELD_LIMITS.description.min,
    ) &&
    hasMinimumLength(values.steps, BUG_REPORT_FIELD_LIMITS.steps.min) &&
    hasMinimumLength(
      values.expectedResult,
      BUG_REPORT_FIELD_LIMITS.expectedResult.min,
    ) &&
    hasMinimumLength(
      values.actualResult,
      BUG_REPORT_FIELD_LIMITS.actualResult.min,
    ) &&
    hasMinimumLength(
      values.environment,
      BUG_REPORT_FIELD_LIMITS.environment.min,
    ) &&
    hasSelectedValue(values.severity) &&
    hasSelectedValue(values.priority) &&
    hasSelectedValue(values.tone)
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
