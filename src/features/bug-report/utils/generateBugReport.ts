import type { BugReportFormValues } from "@/features/bug-report/schema";
import { toneTemplates } from "./toneTemplates";

const pickTemplate = (templates: readonly string[]): string =>
  templates[Math.floor(Math.random() * 6)];

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
    tone,
  } = values;

  const t = toneTemplates;

  const descriptionHeader = pickTemplate(t.description[tone]);
  const stepsHeader = pickTemplate(t.steps[tone]);
  const expectedHeader = pickTemplate(t.expectedResult[tone]);
  const actualHeader = pickTemplate(t.actualResult[tone]);
  const severityPriorityHeader = pickTemplate(t.severityPriority[tone]);
  const environmentHeader = pickTemplate(t.environment[tone]);

  return `# ${title}

${descriptionHeader}

${description}

${stepsHeader}

${steps}

${expectedHeader}

${expectedResult}

${actualHeader}

${actualResult}

${severityPriorityHeader}

- **Severidad:** ${severity}
- **Prioridad:** ${priority}

${environmentHeader}

${environment}
`;
}
