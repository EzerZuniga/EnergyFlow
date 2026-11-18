import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { PREFERENCE_KEYS } from '@/utils/constants';

interface UiState {
  /** Sidebar de la demo contraída (solo iconos) en escritorio. */
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

/**
 * Estado de la interfaz de la demo. Al ser una preferencia (no un dato de dominio)
 * se persiste directamente con el middleware `persist`, sin pasar por services/.
 */
export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      toggleSidebar: () => {
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed }));
      },
      setSidebarCollapsed: (collapsed) => {
        set({ sidebarCollapsed: collapsed });
      },
    }),
    {
      name: PREFERENCE_KEYS.ui,
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ sidebarCollapsed: state.sidebarCollapsed }),
    },
  ),
);
