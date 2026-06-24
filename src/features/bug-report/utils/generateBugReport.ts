import type { BugReportFormValues } from "@/features/bug-report/schema";
import type { Severity, Priority } from "@/features/bug-report/types";
import { toneTemplates, type HeaderVariant } from "./toneTemplates";

const severityLabel: Record<Severity, string> = {
  low: "Baja",
  medium: "Media",
  high: "Alta",
  critical: "Crítica",
};

const priorityLabel: Record<Priority, string> = {
  low: "Baja",
  medium: "Media",
  high: "Alta",
};

type SectionKey = keyof typeof toneTemplates;

export function generateBugReport(values: BugReportFormValues, headerVariant: HeaderVariant = 0): string {
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

  const sections: Array<{ key: SectionKey; value: string }> = [
    { key: "description", value: description },
    { key: "steps", value: steps },
    { key: "expectedResult", value: expectedResult },
    { key: "actualResult", value: actualResult },
    {
      key: "severityPriority",
      value: `- **Severidad:** ${severityLabel[severity]}\n- **Prioridad:** ${priorityLabel[priority]}`,
    },
    { key: "environment", value: environment },
  ];

  const body = sections
    .map(({ key, value }) => `${toneTemplates[key][tone][headerVariant]}\n\n${value}`)
    .join("\n\n");

  return `# ${title}\n\n${body}\n`;
}
