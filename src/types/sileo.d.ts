declare module 'sileo' {
    import React from 'react';

    export interface ToastOptions {
        duration?: number;
        position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';
    }

    // Ampliamos la interfaz del componente para soportar inyección de estilos
    export interface ToasterProps {
        position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';
        style?: React.CSSProperties;
        className?: string;
        offset?: number | string;
    }

    export const Toaster: React.FC<ToasterProps>;

    export interface SileoAPI {
        (message: string, options?: ToastOptions): void;
        success: (message: string, options?: ToastOptions) => void;
        error: (message: string, options?: ToastOptions) => void;
        info: (message: string, options?: ToastOptions) => void;
        warning: (message: string, options?: ToastOptions) => void;
    }

    export const sileo: SileoAPI;
}