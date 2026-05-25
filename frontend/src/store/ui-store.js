"use client";

import { create } from "zustand";

export const useUiStore = create((set) => ({
  commandOpen: false,
  sidebarOpen: false,
  setCommandOpen: (open) => set({ commandOpen: open }),
  setSidebarOpen: (open) => set({ sidebarOpen: open })
}));
