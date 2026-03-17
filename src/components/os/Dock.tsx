/**
 * @fileoverview macOS-style Dock component - "Neon-Glass" Edition.
 * Unifies the desktop launcher with the mobile tech aesthetic.
 * Features monochromatic glass containers, electric yellow icons,
 * active state highlights, and Framer Motion magnification.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { User, FolderCode, Terminal, Github, Linkedin } from 'lucide-react';
import { useWindowStore } from '../../store/windowStore';

// Tipado estricto para evitar errores de TypeScript
interface AppItem {
    id: string;
    title: string;
    icon: React.ElementType;
}

interface SocialItem {
    id: string;
    title: string;
    icon: React.ElementType;
    url: string;
}

const apps: AppItem[] = [
    { id: 'about', title: 'Sobre Mí', icon: User },
    { id: 'projects', title: 'Proyectos', icon: FolderCode },
    { id: 'contact', title: 'Contacto', icon: Terminal },
];

const socialLinks: SocialItem[] = [
    { id: 'github', title: 'GitHub', icon: Github, url: 'https://github.com/edwinrayr' },
    { id: 'linkedin', title: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/edraya-reyna' },
];

export const Dock: React.FC = () => {
    // Ahora extraemos activeWindow para darle un resplandor extra a la app en uso
    const { windows, openWindow, activeWindow } = useWindowStore();

    return (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[9999]">
            <div className="flex items-end gap-3 px-4 py-3 bg-white/[0.015] backdrop-blur-3xl border border-white/[0.06] rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.02)]">

                {/* Apps del Sistema Operativo */}
                {apps.map((app) => {
                    const Icon = app.icon;
                    const isOpen = windows.some((w) => w.id === app.id);
                    const isActive = activeWindow === app.id;

                    return (
                        <div key={app.id} className="relative group flex flex-col items-center">
                            {/* Tooltip */}
                            <div className="absolute -top-12 px-3 py-1.5 bg-black/80 backdrop-blur-md border border-white/10 rounded-lg text-white/90 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl">
                                {app.title}
                            </div>

                            <motion.button
                                // CORRECCIÓN LÍNEA 60: Pasamos id y title al store optimizado
                                onClick={() => openWindow(app.id, app.title)}
                                whileHover={{ scale: 1.2, y: -10 }}
                                whileTap={{ scale: 0.95 }}
                                className={`relative w-14 h-14 flex items-center justify-center rounded-[1.2rem] transition-colors duration-300 outline-none
                  ${isActive
                                        ? 'bg-white/[0.05] border-yellow-400/40' // Estilo si la ventana está activa
                                        : 'bg-white/[0.02] border-white/[0.05] group-hover:border-yellow-400/30 group-hover:bg-white/[0.05]' // Estilo inactivo
                                    }
                `}
                            >
                                {/* Brillo de cristal superior */}
                                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent rounded-[1.2rem] pointer-events-none" />

                                {/* Icono Eléctrico */}
                                <Icon
                                    className={`relative w-7 h-7 text-yellow-400 transition-all duration-300 
                    ${isActive
                                            ? 'drop-shadow-[0_0_12px_rgba(250,204,21,0.9)] scale-110' // Más brillo si está activa
                                            : 'drop-shadow-[0_0_8px_rgba(250,204,21,0.5)] group-hover:drop-shadow-[0_0_12px_rgba(250,204,21,0.8)]'
                                        }
                  `}
                                    strokeWidth={1.5}
                                />
                            </motion.button>

                            {/* Indicador de App Abierta con dos niveles de intensidad */}
                            <div
                                className={`absolute -bottom-2 w-1.5 h-1.5 rounded-full transition-all duration-300 
                  ${isOpen
                                        ? (isActive ? 'bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,1)]' : 'bg-yellow-400/40')
                                        : 'bg-transparent'
                                    }
                `}
                            />
                        </div>
                    );
                })}

                {/* Separador Tech */}
                <div className="w-[1px] h-12 bg-white/10 rounded-full mx-1" />

                {/* Links Sociales */}
                {socialLinks.map((social) => {
                    const Icon = social.icon;

                    return (
                        <div key={social.id} className="relative group flex flex-col items-center">
                            {/* Tooltip */}
                            <div className="absolute -top-12 px-3 py-1.5 bg-black/80 backdrop-blur-md border border-white/10 rounded-lg text-white/90 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl">
                                {social.title}
                            </div>

                            <motion.a
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.2, y: -10 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative w-14 h-14 flex items-center justify-center rounded-[1.2rem] bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.08] transition-colors duration-300 outline-none"
                            >
                                <Icon className="w-7 h-7 text-white/70 group-hover:text-white transition-colors" strokeWidth={1.5} />
                            </motion.a>
                        </div>
                    );
                })}

            </div>
        </div>
    );
};