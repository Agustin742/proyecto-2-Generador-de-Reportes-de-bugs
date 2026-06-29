import { BUG_REPORT_FIELD_LIMITS } from "@/features/bug-report/constants/bugReportValidation";
import { z } from "zod";

export const bugReportSchema = z.object({
  title: z
    .string()
    .trim()
    .min(BUG_REPORT_FIELD_LIMITS.title.min, {
      message: "El título debe tener al menos 3 caracteres.",
    })
    .max(BUG_REPORT_FIELD_LIMITS.title.max, {
      message: "El título no puede superar los 100 caracteres.",
    }),

  description: z
    .string()
    .trim()
    .min(BUG_REPORT_FIELD_LIMITS.description.min, {
      message: "La descripción debe tener al menos 20 caracteres.",
    })
    .max(BUG_REPORT_FIELD_LIMITS.description.max),

  steps: z
    .string()
    .trim()
    .min(BUG_REPORT_FIELD_LIMITS.steps.min, {
      message: "Agregá pasos claros para reproducir el bug.",
    })
    .max(BUG_REPORT_FIELD_LIMITS.steps.max),

  expectedResult: z
    .string()
    .trim()
    .min(BUG_REPORT_FIELD_LIMITS.expectedResult.min, {
      message: "Indicá qué debería haber pasado.",
    })
    .max(BUG_REPORT_FIELD_LIMITS.expectedResult.max),

  actualResult: z
    .string()
    .trim()
    .min(BUG_REPORT_FIELD_LIMITS.actualResult.min, {
      message: "Indicá qué pasó realmente.",
    })
    .max(BUG_REPORT_FIELD_LIMITS.actualResult.max),

  severity: z.enum(["low", "medium", "high", "critical"], {
    error: "Seleccioná una severidad.",
  }),

  priority: z.enum(["low", "medium", "high"], {
    error: "Seleccioná una prioridad.",
  }),

  environment: z
    .string()
    .trim()
    .min(BUG_REPORT_FIELD_LIMITS.environment.min, {
      message: "Indicá el entorno donde ocurre el bug.",
    })
    .max(BUG_REPORT_FIELD_LIMITS.environment.max),

  tone: z.enum(["formal", "direct", "detailed"], {
    error: "Seleccioná un tono para el reporte.",
  }),
});

export type BugReportFormValues = z.infer<typeof bugReportSchema>;
