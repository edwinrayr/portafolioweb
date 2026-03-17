/**
 * @fileoverview Global state management for the OS window system using Zustand.
 * Handles window lifecycle, spatial positioning, depth (z-index) management, and active focus.
 */

import { create } from 'zustand';
import type { WindowState, Position } from '../types/index';

// Modificamos la interfaz base eliminando el componente de React del store
// para mantener el estado serializable y puro.
type StoreWindowState = Omit<WindowState, 'component'>;

interface WindowStore {
    windows: StoreWindowState[];
    activeWindow: string | null; // Añadido para facilitar la lectura del foco global
    openWindow: (id: string, title: string) => void; // Simplificado a tipos primitivos
    closeWindow: (id: string) => void;
    focusWindow: (id: string) => void;
    updatePosition: (id: string, position: Position) => void;
}

export const useWindowStore = create<WindowStore>((set, get) => ({
    windows: [],
    activeWindow: null,

    openWindow: (id, title) => {
        const { windows, focusWindow } = get();
        const existingWindow = windows.find((w) => w.id === id);

        // Si la ventana ya existe, solo la traemos al frente
        if (existingWindow) {
            focusWindow(id);
            return;
        }

        // Si no existe, creamos una nueva instancia
        const newWindow: StoreWindowState = {
            id,
            title,
            isOpen: true,
            isFocused: true,
            isMinimized: false,
            isMaximized: false,
            position: { x: Math.random() * 100 + 50, y: Math.random() * 50 + 50 },
            dimensions: { width: 800, height: 500 },
            zIndex: windows.length + 1,
        };

        set({
            windows: [...windows, newWindow],
            activeWindow: id
        });

        focusWindow(id);
    },

    closeWindow: (id) => {
        set((state) => {
            const remainingWindows = state.windows.filter((w) => w.id !== id);

            // Lógica inteligente: Si cerramos la ventana activa, pasa el foco a la que quedó más arriba
            const newActiveWindow = remainingWindows.length > 0
                ? remainingWindows.reduce((prev, current) => (prev.zIndex > current.zIndex ? prev : current)).id
                : null;

            return {
                windows: remainingWindows,
                activeWindow: state.activeWindow === id ? newActiveWindow : state.activeWindow,
            };
        });
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
                activeWindow: id, // Actualizamos siempre el indicador global
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