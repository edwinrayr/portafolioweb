/**
 * @fileoverview Main desktop environment component.
 * Acts as the primary workspace canvas, rendering the active windows dynamically
 * and managing the spatial distribution of the OS interface.
 * Integrates dynamic background effects and lazy-loaded application modules.
 */

import React, { Suspense } from 'react';
import { useWindowStore } from '../../store/windowStore';
import { Window } from './Window';
import { LightningBackground } from './LightningBackground';

// Importación dinámica de los módulos de aplicaciones (Code-Splitting)
const AboutApp = React.lazy(() => import('../apps/About'));
const ProjectsApp = React.lazy(() => import('../apps/Projects'));
const ContactApp = React.lazy(() => import('../apps/Contact')); // Nueva importación

// Registro de módulos de aplicaciones
const appsRegistry: Record<string, React.LazyExoticComponent<React.FC> | React.FC> = {
    about: AboutApp,
    projects: ProjectsApp,
    contact: ContactApp, // Conectado al módulo final
};

export const Desktop: React.FC = () => {
    const { windows } = useWindowStore();

    return (
        <div className="relative w-full h-full overflow-hidden bg-transparent">

            {/* Capa de Efectos de Fondo */}
            <LightningBackground />

            {/* Renderizado dinámico de ventanas activas */}
            {windows.map((windowState) => {
                const AppComponent = appsRegistry[windowState.id];

                if (!AppComponent) {
                    console.warn(`Module with id "${windowState.id}" not found in registry.`);
                    return null;
                }

                return (
                    <Window key={windowState.id} id={windowState.id} title={windowState.title}>
                        <Suspense fallback={
                            <div className="w-full h-full flex items-center justify-center">
                                <div className="w-5 h-5 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
                            </div>
                        }>
                            <AppComponent />
                        </Suspense>
                    </Window>
                );
            })}
        </div>
    );
};