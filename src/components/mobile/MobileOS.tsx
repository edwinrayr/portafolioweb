/**
 * @fileoverview Premium Mobile OS Environment - "Neon-Glass" Edition.
 * Unifies Desktop "Tech" aesthetics with iOS layout structure.
 * Features monochromatic glass containers, electric yellow icons, 
 * dynamic glow interactions, strict TypeScript typing, and auto-open behavior.
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Agregamos Instagram y Mail para completar el Dock móvil
import { User, FolderCode, Terminal, X, Linkedin, Github, Instagram, Mail } from 'lucide-react';
import { Toaster } from 'sileo';
import { StatusBar } from './StatusBar';
import { LightningBackground } from '../os/LightningBackground';

import About from '../apps/About';
import Projects from '../apps/Projects';
import Contact from '../apps/Contact';

// Tipado estricto
interface MainAppConfig {
    id: string;
    title: string;
    icon: React.ElementType;
    component: React.FC;
}

interface DockAppConfig {
    id: string;
    icon: React.ElementType;
    url: string;
}

// Configuración de la cuadrícula principal (Home Screen)
const mainApps: MainAppConfig[] = [
    { id: 'about', title: 'Sobre Mí', icon: User, component: About },
    { id: 'projects', title: 'Proyectos', icon: FolderCode, component: Projects },
    { id: 'contact', title: 'Contacto', icon: Terminal, component: Contact },
];

// Configuración exclusiva del Dock móvil (Solo redes sociales y contacto)
const dockApps: DockAppConfig[] = [
    { id: 'linkedin', icon: Linkedin, url: 'https://www.linkedin.com/in/edraya-reyna' },
    { id: 'github', icon: Github, url: 'https://github.com/edwinrayr' },
    { id: 'instagram', icon: Instagram, url: 'https://instagram.com/rayrdev' },
    { id: 'mail', icon: Mail, url: 'mailto:edraya.reyna@gmail.com' }
];

export const MobileOS: React.FC = () => {
    const [activeApp, setActiveApp] = useState<string | null>(null);
    const ActiveComponent = mainApps.find((a) => a.id === activeApp)?.component;

    // AUTO-OPEN DE LA APP "SOBRE MÍ"
    useEffect(() => {
        const timer = setTimeout(() => {
            setActiveApp('about');
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="relative w-full h-full overflow-hidden bg-black text-white flex flex-col selection:bg-yellow-500/30 font-sans">
            <Toaster position="top-center" offset="60px" style={{ marginTop: '5px' }} />

            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <LightningBackground />
            </div>

            <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-[120px] h-7 bg-black rounded-full z-50 shadow-[0_4px_30px_rgba(0,0,0,0.5)] border border-white/5" />
            <StatusBar />

            {/* Pantalla de Inicio */}
            <div className="flex-1 pt-24 px-6 relative z-10 flex flex-col">

                <div className="mb-10 mt-2">
                    <h1 className="text-[34px] font-extrabold text-white tracking-tighter leading-tight">
                        rayr.OS //
                    </h1>
                    <p className="text-white/60 text-[15px] font-medium mt-1 tracking-tight">
                        Unidad de acceso táctil. BIENVENIDO.
                    </p>
                </div>

                {/* Grid de Aplicaciones */}
                <div className="grid grid-cols-4 gap-x-4 gap-y-10 mt-2">
                    {mainApps.map((app) => {
                        const Icon = app.icon;
                        return (
                            <motion.button
                                key={app.id}
                                onClick={() => setActiveApp(app.id)}
                                whileTap={{
                                    scale: 0.94,
                                    boxShadow: "0px 0px 25px 3px rgba(250, 204, 21, 0.4)"
                                }}
                                className="flex flex-col items-center gap-3 group outline-none"
                            >
                                <div className="relative w-[65px] h-[65px] rounded-[1.4rem] bg-white/[0.015] backdrop-blur-2xl border border-white/[0.06] flex items-center justify-center shadow-lg transition-all duration-300 group-hover:border-yellow-400/30 group-hover:bg-white/[0.04]">
                                    <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent rounded-[1.4rem] pointer-events-none" />
                                    <Icon className="relative w-8 h-8 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" strokeWidth={1.2} />
                                </div>

                                <span className="text-[12px] font-medium text-white/80 drop-shadow-md tracking-tight">
                                    {app.title}
                                </span>
                            </motion.button>
                        );
                    })}
                </div>

                {/* Dock inferior Móvil - Exclusivo Redes y Contacto */}
                <div className="mt-auto mb-10 mx-auto w-full max-w-[320px]">
                    <div className="flex items-center justify-between px-6 py-4 bg-white/[0.01] backdrop-blur-3xl border border-white/[0.06] rounded-[2rem] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.01)]">
                        {dockApps.map(app => {
                            const Icon = app.icon;
                            return (
                                <motion.a
                                    key={`dock-social-${app.id}`}
                                    href={app.url}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    whileTap={{ scale: 0.9, backgroundColor: "rgba(250, 204, 21, 0.1)", borderColor: "rgba(250, 204, 21, 0.3)" }}
                                    className="w-[3.25rem] h-[3.25rem] bg-white/5 border border-white/5 rounded-[1.2rem] flex items-center justify-center transition-all outline-none"
                                >
                                    <Icon className="w-6 h-6 text-white/70" strokeWidth={1.5} />
                                </motion.a>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Bottom Sheet Premium Unificada */}
            <AnimatePresence>
                {activeApp && ActiveComponent && (
                    <motion.div
                        key="mobile-bottom-sheet"
                        initial={{ y: '100%' }}
                        animate={{ y: '0%' }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 28, stiffness: 280, mass: 1 }}
                        className="absolute inset-x-0 bottom-0 top-12 bg-black/90 backdrop-blur-3xl border-t border-white/[0.08] rounded-t-[2.5rem] z-50 overflow-hidden flex flex-col shadow-[0_-15px_60px_rgba(0,0,0,0.9)]"
                    >
                        {/* Header / Premium Handle */}
                        <div className="w-full pt-4 pb-4 flex flex-col items-center border-b border-white/[0.05]">
                            <div className="w-12 h-1.5 bg-white/15 rounded-full mb-4" />
                            <div className="w-full px-6 flex justify-between items-center relative">
                                <h2 className="text-[17px] font-bold tracking-wide text-white/95 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 shadow-[0_0_5px_rgba(250,204,21,0.7)]" />
                                    {mainApps.find((a) => a.id === activeApp)?.title}
                                </h2>
                                <button
                                    onClick={() => setActiveApp(null)}
                                    className="p-2 bg-white/5 rounded-full active:bg-white/10 border border-white/5 active:border-white/10 transition-all outline-none"
                                    aria-label="Cerrar aplicación"
                                >
                                    <X className="w-4 h-4 text-white/80" />
                                </button>
                            </div>
                        </div>

                        {/* Contenedor del contenido */}
                        <div className="flex-1 overflow-y-auto relative bg-transparent [scrollbar-width:none] [&::-webkit-scrollbar]:hidden p-1">
                            <ActiveComponent />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MobileOS;