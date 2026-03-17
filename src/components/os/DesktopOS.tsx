/**
 * @fileoverview Desktop OS Environment Container.
 * Renders the full structural layout for the desktop interface,
 * including TopBar, the Desktop layer (for windows), and the Dock.
 */

import React from 'react';
import { Toaster } from 'sileo';
import { Desktop } from './Desktop';
import { Dock } from './Dock';
import { TopBar } from './TopBar';

export const DesktopOS: React.FC = () => {
    return (
        <>
            {/* Proveedor global de notificaciones */}
            <Toaster />

            {/* Barra de menú superior */}
            <TopBar />

            {/* Capa de ventanas */}
            <Desktop />

            {/* Interfaz estática inferior */}
            <Dock />
        </>
    );
};