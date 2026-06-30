import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

/**
 * Preferencia del enjambre decorativo de polillas (RFC-0001 §3.5 / RFC-0002).
 *
 * Es puramente de UI: controla si `PolillaBackground` renderiza el enjambre
 * de polillas SVG. Se persiste en localStorage para que la elección del
 * usuario sobreviva entre sesiones.
 */
interface PolillasState {
  enabled: boolean;
  toggle: () => void;
  setEnabled: (enabled: boolean) => void;
}

export const usePolillasStore = create<PolillasState>()(
  persist(
    (set) => ({
      enabled: true,
      toggle: () => set((state) => ({ enabled: !state.enabled })),
      setEnabled: (enabled) => set({ enabled }),
    }),
    {
      name: "polillas-enabled",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
