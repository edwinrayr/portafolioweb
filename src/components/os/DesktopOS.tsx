/**
 * @fileoverview Desktop OS Environment Container.
 * Renders the top bar, dock, and window manager for desktop devices.
 * Now handles the auto-opening of the default window (About Me).
 */

import React, { useEffect } from 'react';
import { TopBar } from './TopBar';
import { Dock } from './Dock';
// 1. Importamos el componente Window real en lugar del WindowManager inexistente
import { Window } from './Window';
import { LightningBackground } from './LightningBackground';
import { Toaster } from 'sileo';
import { useWindowStore } from '../../store/windowStore';

export const DesktopOS: React.FC = () => {
    // 2. Extraemos tanto 'openWindow' como el arreglo de 'windows' del store
    const { windows, openWindow } = useWindowStore();

    useEffect(() => {
        // Abrimos "Sobre Mí" por defecto al cargar la página
        const timer = setTimeout(() => {
            openWindow('about', 'Sobre Mí');
        }, 500);

        return () => clearTimeout(timer);
    }, [openWindow]);

    return (
        <div className="relative w-full h-full overflow-hidden bg-[#030303] text-white selection:bg-blue-500/30 font-sans">
            {/* 3. Corrección del Toaster: Eliminamos la prop 'theme' no soportada */}
            <Toaster position="bottom-right" offset="80px" />

            {/* Elementos fijos de la interfaz */}
            <LightningBackground />
            <TopBar />
            <Dock />

            {/* 4. Renderizado dinámico real de las ventanas */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                {windows.map((window) => (
                    <Window key={window.id} window={window} />
                ))}
            </div>
        </div>
    );
};