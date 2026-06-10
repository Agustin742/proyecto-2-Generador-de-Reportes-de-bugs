import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { BugReportFormValues } from "./schema";

//Definimos el contrato de que datos guardamos y que acciones tenemos
interface BugReportState {
  reports: BugReportFormValues[];
  addReport: (report: BugReportFormValues) => void;
  clearReports: () => void;
}

//Creamos el store persistente en localStorage
export const useBugReportStore = create<BugReportState>()(
  persist(
    (set) => ({
      reports: [],
      addReport: (newReport) =>
        set((state) => ({
          reports: [...state.reports, newReport],
        })),
      clearReports: () => set({ reports: [] }),
    }),
    {
      // Nombre de la clave en el localStorage
      name: "bug-reports-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
