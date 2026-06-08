export type Severity = "low" | "medium" | "high" | "critical";
export type Priority = "low" | "medium" | "high";
export type Tone = "formal" | "direct" | "detailed";
export type BugTemplate = "visual" | "functional" | "performance";

export type BugReport = {
  title: string;
  description: string;
  steps: string;
  expectedResult: string;
  actualResult: string;
  severity: Severity;
  priority: Priority;
  environment: string;
  tone: Tone;
  template?: BugTemplate;
};
