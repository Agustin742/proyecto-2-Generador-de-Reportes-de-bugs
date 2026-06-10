import { z } from "zod";

export const bugReportSchema = z.object({
  title: z
    .string()
    .min(5, { message: "El título debe tener al menos 5 caracteres." })
    .max(100, { message: "El título no puede superar los 100 caracteres." }),

  description: z.string().min(20, {
    message: "La descripción debe tener al menos 20 caracteres para ser útil.",
  }),

  severity: z.enum(["low", "medium", "high", "critical"], {
    error: "Por favor selecciona un nivel de severidad.",
  }),

  environment: z.enum(["development", "staging", "production"], {
    error: "Por favor selecciona el entorno donde ocurrió el bug.",
  }),

  // Opcional: pasos para reproducir el error
  stepsToReproduce: z.string().optional(),
});

// Extraemos el tipo de TypeScript automáticamente para no escribirlo dos veces
export type BugReportFormValues = z.infer<typeof bugReportSchema>;
