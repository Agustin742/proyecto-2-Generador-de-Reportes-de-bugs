import type { BugReportFormValues } from "@/features/bug-report/schema";
import type { Tone } from "@/features/bug-report/types";
import { toneTemplates } from "./toneTemplates";

type SectionKey = keyof typeof toneTemplates;

function pickHeader(section: SectionKey, tone: Tone): string {
  const templates = toneTemplates[section][tone];
  return templates[Math.floor(Math.random() * 6)];
}

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

  const sections: Array<{ key: SectionKey; value: string }> = [
    { key: "description", value: description },
    { key: "steps", value: steps },
    { key: "expectedResult", value: expectedResult },
    { key: "actualResult", value: actualResult },
    {
      key: "severityPriority",
      value: `- **Severidad:** ${severity}\n- **Prioridad:** ${priority}`,
    },
    { key: "environment", value: environment },
  ];

  const body = sections
    .map(({ key, value }) => `${pickHeader(key, tone)}\n\n${value}`)
    .join("\n\n");

  return `# ${title}\n\n${body}\n`;
}
