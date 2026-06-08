import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { BugReport } from "./types";

interface BugReportState {
  // Partial quiere decir que no todos los campos son obligatorios todavia.
  draft: Partial<BugReport>;
  setDraft: (data: Partial<BugReport>) => void;
  clearDraft: () => void;
}

// Creamos el store global con persistencia
export const useBugReportStore = create<BugReportState>()(
  // Utilizamos persist para que ademas de guardar el estado en memoria, lo guarde en localStorage
  persist(
    (set) => ({
      // El estado inicial arranca vacio
      draft: {},

      // Funcion para actualizar el borrador guardando lo que ya estaba + lo nuevo
      setDraft: (data) =>
        set((state) => ({
          draft: { ...state.draft, ...data },
        })),

      // Funcion para limpiar el borrador
      clearDraft: () => set({ draft: {} }),
    }),
    // Asi se va a llamar la llave en el localStorage del navegador
    {
      name: "bug-report-storage",
    },
  ),
);
