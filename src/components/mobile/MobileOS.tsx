/**
 * @fileoverview Premium Mobile OS Environment.
 * Features a perfectly balanced Cupertino-style HomeScreen grid, visual Dynamic Island,
 * integrated bottom Dock, and fluid Bottom Sheet app opening animations.
 * Mixes iOS structure with Material You dynamic yellow accents.
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, FolderCode, Terminal, X, Linkedin, Github } from 'lucide-react';
import { Toaster } from 'sileo';
import { StatusBar } from './StatusBar';
import { LightningBackground } from '../os/LightningBackground';

// Importamos los módulos de las aplicaciones
import About from '../apps/About';
import Projects from '../apps/Projects';
import Contact from '../apps/Contact';

const mainApps = [
    { id: 'about', title: 'Sobre Mí', icon: User, component: About, accent: 'blue-400' },
    { id: 'projects', title: 'Proyectos', icon: FolderCode, component: Projects, accent: 'green-400' },
    { id: 'contact', title: 'Contacto', icon: Terminal, component: Contact, accent: 'yellow-400' },
];

// Apps solo para el Dock (sin componentes abiertos)
const dockApps = [
    { id: 'linkedin', icon: Linkedin, url: 'https://www.linkedin.com/in/edraya-reyna' },
    { id: 'github', icon: Github, url: 'https://github.com/edwinrayr' }
]

export const MobileOS: React.FC = () => {
    // En móvil solo permitimos una app abierta a la vez
    const [activeApp, setActiveApp] = useState<string | null>(null);

    const ActiveComponent = mainApps.find((a) => a.id === activeApp)?.component;

    return (
        <div className="relative w-full h-full overflow-hidden bg-black text-white flex flex-col selection:bg-yellow-500/30">
            {/* Proveedor de notificaciones para móvil (más elegante bajando desde arriba) */}
            <Toaster position="top-center" offset="60px" style={{ marginTop: '5px' }} />

            {/* Fondo y Estructura Superior (StatusBar + Dynamic Island Visual) */}
            <div className="absolute inset-0 z-0 opacity-40">
                <LightningBackground />
            </div>

            {/* Fondo visual de Dynamic Island para anclar la StatusBar */}
            <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-[120px] h-7 bg-black rounded-full z-50 shadow-[0_4px_30px_rgba(0,0,0,0.5)] border border-white/5" />
            <StatusBar />

            {/* Pantalla de Inicio (Cinematic HomeScreen style) */}
            <div className="flex-1 pt-24 px-6 relative z-10 flex flex-col">
                {/* Título dinámico style Android */}
                <h1 className="text-3xl font-extrabold text-white tracking-tight mb-8">
                    Inicio <span className="text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]">Zap</span>
                </h1>

                <div className="grid grid-cols-4 gap-x-4 gap-y-9 mt-2">
                    {mainApps.map((app) => {
                        const Icon = app.icon;
                        return (
                            <motion.button
                                key={app.id}
                                onClick={() => setActiveApp(app.id)}
                                whileTap={{ scale: 0.9 }}
                                className="flex flex-col items-center gap-2.5 group outline-none"
                            >
                                {/* Icon Container with dynamic glow */}
                                <div className={`relative w-[65px] h-[65px] bg-white/[0.03] backdrop-blur-3xl border border-white/[0.12] rounded-[1.6rem] flex items-center justify-center shadow-[inset_0_1px_0_0_rgba(255,255,255,0.02)] active:border-yellow-500/30 transition-all duration-300`}>
                                    <div className={`absolute -inset-1 bg-${app.accent}/20 rounded-[1.8rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity`} />
                                    <Icon className={`relative w-9 h-9 text-${app.accent} drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]`} strokeWidth={1.2} />
                                </div>
                                <span className="text-[12px] font-medium text-white/90 drop-shadow-md tracking-tight">
                                    {app.title}
                                </span>
                            </motion.button>
                        );
                    })}
                </div>

                {/* Dock inferior (iOS Style) - Ocupa la última parte de la pantalla */}
                <div className="mt-auto mb-10 mx-auto w-full max-w-[320px]">
                    <div className="flex items-center justify-center gap-5 p-4 bg-white/[0.01] backdrop-blur-3xl border border-white/[0.08] rounded-[2rem] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.02)]">
                        {mainApps.map(app => {
                            const Icon = app.icon;
                            return (
                                <button key={`${app.id}-dock`} onClick={() => setActiveApp(app.id)} className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-white/10 active:scale-95 transition-all">
                                    <Icon className={`w-7 h-7 text-${app.accent}`} strokeWidth={1.5} />
                                </button>
                            )
                        })}
                        {/* Barra separadora */}
                        <div className="w-[1px] h-10 bg-white/10 rounded-full" />
                        {dockApps.map(app => {
                            const Icon = app.icon;
                            return (
                                <a key={`${app.id}-dock`} href={app.url} target='_blank' rel='noopener noreferrer' className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-white/10 active:scale-95 transition-all">
                                    <Icon className={`w-7 h-7 text-white/80`} strokeWidth={1.5} />
                                </a>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Aplicación Abierta (Premium Bottom Sheet) */}
            <AnimatePresence>
                {activeApp && ActiveComponent && (
                    <motion.div
                        initial={{ y: '100%', opacity: 0.5 }}
                        animate={{ y: '0%', opacity: 1 }}
                        exit={{ y: '100%', opacity: 0.5 }}
                        transition={{ type: 'spring', damping: 28, stiffness: 280, mass: 1 }}
                        className="absolute inset-x-0 bottom-0 top-12 bg-black/85 backdrop-blur-3xl border-t border-white/[0.12] rounded-t-[2.5rem] z-50 overflow-hidden flex flex-col shadow-[0_-15px_60px_rgba(0,0,0,0.9)]"
                    >
                        {/* Header / Premium Handle (Visual) */}
                        <div className="w-full pt-4 pb-4 flex flex-col items-center bg-white/[0.02] border-b border-white/[0.08]">
                            <div className="w-12 h-1.5 bg-white/20 rounded-full mb-4" />
                            <div className="w-full px-6 flex justify-between items-center relative">
                                <h2 className="text-[17px] font-bold tracking-wide text-white/95">
                                    {mainApps.find((a) => a.id === activeApp)?.title}
                                </h2>
                                <button
                                    onClick={() => setActiveApp(null)}
                                    className="p-2 bg-white/10 rounded-full active:bg-white/20 hover:bg-white/15 transition-all"
                                    aria-label="Cerrar aplicación"
                                >
                                    <X className="w-4 h-4 text-white/90" />
                                </button>
                            </div>
                        </div>

                        {/* Contenedor del contenido de la App con mejor renderizado */}
                        <div className="flex-1 overflow-y-auto relative bg-transparent [scrollbar-width:none] [&::-webkit-scrollbar]:hidden p-1">
                            {/* Inyectamos el componente (About, Projects o Contact) */}
                            <ActiveComponent />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// Exportación default para que React.lazy lo pueda importar en App.tsx
export default MobileOS;