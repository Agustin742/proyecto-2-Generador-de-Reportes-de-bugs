import type { BugReportFormValues } from "./schema";

export type Severity = BugReportFormValues["severity"];
export type Priority = BugReportFormValues["priority"];
export type Tone = BugReportFormValues["tone"];

export type BugTemplate = "visual" | "functional" | "performance";

export type BugReport = BugReportFormValues & {
  template?: BugTemplate;
};