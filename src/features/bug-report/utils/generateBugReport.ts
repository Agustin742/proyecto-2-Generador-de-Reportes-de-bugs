import type { BugReportFormValues } from "@/features/bug-report/schema";

export function generateBugReport(values: BugReportFormValues): string {
  const {
    title,
    description,
    steps,
    expectedResult,
    actualResult,
    severity,
    priority,
    environment,
  } = values;

  return `# ${title}

## Descripción

${description}

## Pasos para reproducir

${steps}

## Resultado esperado

${expectedResult}

## Resultado actual

${actualResult}

## Severidad

${severity}

## Prioridad

${priority}

## Entorno

${environment}
`;
}
