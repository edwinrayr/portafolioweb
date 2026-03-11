/**
 * @fileoverview Global state management for the OS window system using Zustand.
 * Handles window lifecycle, spatial positioning, and depth (z-index) management.
 */

import { create } from 'zustand';
import type { WindowState, AppMetadata, Position } from '../types/index';

// Modificamos ligeramente la interfaz base eliminando el componente de React del store
// para mantener el estado serializable y puro.
type StoreWindowState = Omit<WindowState, 'component'>;

interface WindowStore {
    windows: StoreWindowState[];
    openWindow: (app: AppMetadata) => void;
    closeWindow: (id: string) => void;
    focusWindow: (id: string) => void;
    updatePosition: (id: string, position: Position) => void;
}

export const useWindowStore = create<WindowStore>((set, get) => ({
    windows: [],

    openWindow: (app) => {
        const { windows, focusWindow } = get();
        const existingWindow = windows.find((w) => w.id === app.id);

        if (existingWindow) {
            focusWindow(app.id);
            return;
        }

        const newWindow: StoreWindowState = {
            id: app.id,
            title: app.title,
            isOpen: true,
            isFocused: true,
            isMinimized: false,
            isMaximized: false,
            position: app.defaultPosition || { x: Math.random() * 100 + 50, y: Math.random() * 50 + 50 },
            dimensions: app.defaultDimensions || { width: 800, height: 500 },
            zIndex: windows.length + 1,
        };

        set({ windows: [...windows, newWindow] });
        focusWindow(app.id);
    },

    closeWindow: (id) => {
        set((state) => ({
            windows: state.windows.filter((w) => w.id !== id),
        }));
    },

    focusWindow: (id) => {
        set((state) => {
            const maxZIndex = Math.max(...state.windows.map((w) => w.zIndex), 0);
            return {
                windows: state.windows.map((w) => ({
                    ...w,
                    isFocused: w.id === id,
                    zIndex: w.id === id ? maxZIndex + 1 : w.zIndex,
                })),
            };
        });
    },

    updatePosition: (id, position) => {
        set((state) => ({
            windows: state.windows.map((w) =>
                w.id === id ? { ...w, position } : w
            ),
        }));
    },
}));