/**
 * @fileoverview High-fidelity Dock navigation component.
 * Features macOS-style magnification (bottom-origin), active state indicators,
 * advanced glassmorphism, and animated tooltips.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { User, FolderCode, Terminal } from 'lucide-react';
import { sileo } from 'sileo';
import { useWindowStore } from '../../store/windowStore';
import type { AppMetadata } from '../../types/index';

const dockApps: AppMetadata[] = [
    {
        id: 'about',
        title: 'Sobre Mí - Perfil Profesional',
        iconId: 'user',
        defaultDimensions: { width: 600, height: 450 },
        defaultPosition: { x: 100, y: 100 },
    },
    {
        id: 'projects',
        title: 'Repositorios y Proyectos',
        iconId: 'folder',
        defaultDimensions: { width: 850, height: 600 },
        defaultPosition: { x: 150, y: 120 },
    },
    {
        id: 'contact',
        title: 'Terminal - Contacto',
        iconId: 'terminal',
        defaultDimensions: { width: 500, height: 350 },
        defaultPosition: { x: 200, y: 140 },
    },
];

const iconMap: Record<string, React.ElementType> = {
    user: User,
    folder: FolderCode,
    terminal: Terminal,
};

export const Dock: React.FC = () => {
    const { openWindow, windows } = useWindowStore();

    const handleLaunch = (app: AppMetadata) => {
        sileo.success(`Abriendo ${app.title}`, {
            duration: 2000,
        });
        openWindow(app);
    };

    return (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-3 py-3 bg-black/40 backdrop-blur-3xl border border-white/10 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.8),inset_0_1px_1px_0_rgba(255,255,255,0.15)] rounded-3xl flex items-end gap-3 z-[9999]">
            {dockApps.map((app) => {
                const IconComponent = iconMap[app.iconId];
                const isOpen = windows.some((w) => w.id === app.id && w.isOpen);

                return (
                    <div key={app.id} className="relative flex flex-col items-center group">

                        {/* Tooltip Dinámico */}
                        <div className="absolute -top-16 opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-300 pointer-events-none flex flex-col items-center z-50">
                            <span className="px-3 py-1.5 bg-black/80 backdrop-blur-xl border border-white/10 text-[#E0E0E0] text-xs font-semibold rounded-lg shadow-xl whitespace-nowrap tracking-wide">
                                {app.title.split(' - ')[0]}
                            </span>
                            {/* Triángulo inferior del tooltip */}
                            <div className="w-2.5 h-2.5 bg-black/80 border-b border-r border-white/10 rotate-45 -mt-1.5 shadow-sm" />
                        </div>

                        {/* Botón Principal del Dock */}
                        <motion.button
                            onClick={() => handleLaunch(app)}
                            whileHover={{ scale: 1.4, y: -10 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                            style={{ transformOrigin: 'bottom' }}
                            className="relative p-3.5 bg-gradient-to-t from-white/5 to-white/[0.02] rounded-2xl border border-white/10 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.1)] hover:border-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.1),inset_0_1px_1px_0_rgba(255,255,255,0.3)] transition-all duration-200"
                            aria-label={`Abrir ${app.title}`}
                        >
                            <IconComponent className="w-8 h-8 text-[#ECECEC] drop-shadow-md" strokeWidth={1.5} />
                        </motion.button>

                        {/* Punto Indicador de Estado (App Abierta) */}
                        <div
                            className={`absolute -bottom-1.5 w-1 h-1 rounded-full transition-all duration-300 ${isOpen
                                    ? 'bg-white shadow-[0_0_6px_rgba(255,255,255,0.9)] opacity-100 scale-100'
                                    : 'bg-transparent opacity-0 scale-50'
                                }`}
                        />

                    </div>
                );
            })}
        </div>
    );
};