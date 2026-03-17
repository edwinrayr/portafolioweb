/**
 * @fileoverview Custom hook to detect if the user is on a mobile device
 * based on screen width. Uses the Tailwind 'sm' breakpoint (640px).
 */

import { useState, useEffect } from 'react';

export const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Definimos el breakpoint estándar de Tailwind (640px)
        const mediaQuery = window.matchMedia('(max-width: 640px)');

        // Función para actualizar el estado
        const handleMediaQueryChange = (event: MediaQueryListEvent | MediaQueryList) => {
            setIsMobile(event.matches);
        };

        // Verificación inicial
        handleMediaQueryChange(mediaQuery);

        // Escuchamos los cambios de tamaño de pantalla
        mediaQuery.addEventListener('change', handleMediaQueryChange);

        // Limpieza al desmontar
        return () => {
            mediaQuery.removeEventListener('change', handleMediaQueryChange);
        };
    }, []);

    return isMobile;
};