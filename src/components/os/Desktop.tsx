/**
 * @fileoverview Main desktop environment component.
 * Acts as the primary workspace canvas, rendering the active windows dynamically
 * and managing the spatial distribution of the OS interface.
 * Integrates dynamic background effects.
 */

import React from 'react';
import { useWindowStore } from '../../store/windowStore';
import { Window } from './Window';
import { LightningBackground } from './LightningBackground';

export const Desktop: React.FC = () => {
    const { windows } = useWindowStore();

    return (
        <div className="relative w-full h-full overflow-hidden bg-transparent">

            {/* Capa de Efectos de Fondo (Z-Index base) */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <LightningBackground />
            </div>

            {/* Capa Interactiva de Ventanas */}
            <div className="absolute inset-0 z-10 pointer-events-auto">
                {/* Renderizado dinámico de ventanas activas */}
                {windows.map((windowState) => (
                    // La ventana ahora es completamente autónoma, solo necesita su estado
                    <Window
                        key={windowState.id}
                        window={windowState}
                    />
                ))}
            </div>

        </div>
    );
};