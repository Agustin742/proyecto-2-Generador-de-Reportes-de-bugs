import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { BugReportFormValues } from "./schema";

// Un reporte guardado tiene identidad propia (id + fechas) para poder
// referenciarlo al editar/eliminar; los campos validados por Zod viven
// envueltos en `values` y se pasan tal cual a la preview o al formulario.
export interface SavedReport {
  id: string;
  createdAt: number;
  updatedAt: number;
  values: BugReportFormValues;
}

// Contrato del store: qué guardamos y qué acciones exponemos.
interface BugReportState {
  reports: SavedReport[];
  addReport: (values: BugReportFormValues) => void;
  updateReport: (id: string, values: BugReportFormValues) => void;
  deleteReport: (id: string) => void;
  clearReports: () => void;
}

// Genera un id estable; usa crypto.randomUUID en navegadores modernos y
// cae a un fallback simple (timestamp + random) si no está disponible.
function createReportId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
}

// Store persistente en localStorage.
export const useBugReportStore = create<BugReportState>()(
  persist(
    (set) => ({
      reports: [],

      addReport: (values) =>
        set((state) => {
          const now = Date.now();
          const report: SavedReport = {
            id: createReportId(),
            createdAt: now,
            updatedAt: now,
            values,
          };

          return { reports: [...state.reports, report] };
        }),

      updateReport: (id, values) =>
        set((state) => ({
          reports: state.reports.map((report) =>
            report.id === id
              ? { ...report, values, updatedAt: Date.now() }
              : report,
          ),
        })),

      deleteReport: (id) =>
        set((state) => ({
          reports: state.reports.filter((report) => report.id !== id),
        })),

      clearReports: () => set({ reports: [] }),
    }),
    {
      // Nombre de la clave en el localStorage.
      name: "bug-reports-storage",
      storage: createJSONStorage(() => localStorage),
      // El formato viejo (BugReportFormValues[] sin id ni fechas) no es
      // referenciable; cualquier estado anterior a v1 arranca vacío.
      version: 1,
      migrate: () => ({ reports: [] }),
    },
  ),
);
