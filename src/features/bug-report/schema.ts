import { z } from "zod";

export const bugReportSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, { message: "El título debe tener al menos 3 caracteres." })
    .max(100, { message: "El título no puede superar los 100 caracteres." }),

  description: z.string().trim().min(20, {
    message: "La descripción debe tener al menos 20 caracteres.",
  }),

  steps: z.string().trim().min(10, {
    message: "Agregá pasos claros para reproducir el bug.",
  }),

  expectedResult: z.string().trim().min(5, {
    message: "Indicá qué debería haber pasado.",
  }),

  actualResult: z.string().trim().min(5, {
    message: "Indicá qué pasó realmente.",
  }),

  severity: z.enum(["low", "medium", "high", "critical"], {
    error: "Seleccioná una severidad.",
  }),

  priority: z.enum(["low", "medium", "high"], {
    error: "Seleccioná una prioridad.",
  }),

  environment: z.string().trim().min(3, {
    message: "Indicá el entorno donde ocurre el bug.",
  }),

  tone: z.enum(["formal", "direct", "detailed"], {
    error: "Seleccioná un tono para el reporte.",
  }),
});

export type BugReportFormValues = z.infer<typeof bugReportSchema>;
