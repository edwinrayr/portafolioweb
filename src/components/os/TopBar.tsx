/**
 * @fileoverview Global Top Navigation Bar component - "Neon-Glass" Edition.
 * Features deep dark glassmorphism, unified rayr.OS branding, 
 * electric yellow accents, localized real-time clock, and fully functional dropdown menus.
 */

import React, { useState, useRef, useEffect } from 'react';
import { Zap, Wifi, BatteryMedium, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTime } from '../../hooks/useTime';
import { useWindowStore } from '../../store/windowStore';

export const TopBar: React.FC = () => {
    const currentTime = useTime();
    const { windows, openWindow, closeWindow } = useWindowStore();

    // Estado para controlar qué menú está abierto
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    // Cerrar menú al hacer clic fuera de él
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setActiveMenu(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Utilidades Nativas
    const copyToClipboard = (text: string, alertMessage: string) => {
        navigator.clipboard.writeText(text).then(() => {
            // Usamos un alert nativo sutil en lugar de depender de Sileo para evitar errores de tipado
            alert(alertMessage);
        });
        setActiveMenu(null);
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => console.error(err));
        } else {
            document.exitFullscreen();
        }
        setActiveMenu(null);
    };

    // Configuración interactiva de los menús
    const menus = [
        {
            id: 'system',
            isIcon: true,
            items: [
                { label: 'Acerca de rayr.OS', action: () => { alert('rayr.OS v1.0\nConstruido por Edwin Raya.\nStack: React, Zustand, Tailwind v4, Framer Motion.'); setActiveMenu(null); } },
                { divider: true },
                { label: 'Reiniciar Sistema', action: () => window.location.reload() }
            ]
        },
        {
            id: 'archivo',
            label: 'Archivo',
            items: [
                { label: 'Descargar Currículum', action: () => { window.open('/CV-EdwinRaya.pdf', '_blank'); setActiveMenu(null); } },
                { label: 'Copiar Enlace del Portafolio', action: () => copyToClipboard('https://rayrdev.com', '¡Enlace copiado al portapapeles!') }
            ]
        },
        {
            id: 'edicion',
            label: 'Edición',
            items: [
                { label: 'Copiar Email de Contacto', action: () => copyToClipboard('edraya.reyna@gmail.com', '¡Email copiado al portapapeles!') },
                { divider: true },
                { label: 'Deshacer / Rehacer', action: () => { alert('Usa Ctrl+Z como un verdadero Dev 😉'); setActiveMenu(null); } }
            ]
        },
        {
            id: 'visualizacion',
            label: 'Visualización',
            items: [
                { label: 'Alternar Pantalla Completa', action: toggleFullscreen }
            ]
        },
        {
            id: 'ir',
            label: 'Ir',
            items: [
                { label: 'Sobre Mí', action: () => { openWindow('about', 'Sobre Mí'); setActiveMenu(null); } },
                { label: 'Proyectos', action: () => { openWindow('projects', 'Proyectos'); setActiveMenu(null); } },
                { divider: true },
                { label: 'GitHub', action: () => { window.open('https://github.com/edwinrayr', '_blank'); setActiveMenu(null); } },
                { label: 'LinkedIn', action: () => { window.open('https://www.linkedin.com/in/edraya-reyna', '_blank'); setActiveMenu(null); } }
            ]
        },
        {
            id: 'ventana',
            label: 'Ventana',
            items: [
                { label: 'Cerrar Todas las Ventanas', action: () => { windows.forEach(w => closeWindow(w.id)); setActiveMenu(null); } }
            ]
        }
    ];

    const formattedTime = currentTime.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit', hour12: true });
    const formattedDate = currentTime.toLocaleDateString('es-MX', { weekday: 'short', month: 'short', day: 'numeric' });

    return (
        <div ref={menuRef} className="absolute top-0 left-0 w-full h-8 bg-black/60 backdrop-blur-3xl border-b border-white/[0.06] shadow-[0_4px_20px_rgba(0,0,0,0.5)] flex items-center justify-between px-3 z-[9999] text-white/80 text-[13px] font-medium tracking-wide">

            {/* Sección Izquierda: Branding y Menús del OS */}
            <div className="flex items-center h-full py-1 relative">

                {/* Renderizado dinámico de los menús */}
                {menus.map((menu) => (
                    <div key={menu.id} className="relative h-full flex items-center">
                        <button
                            onClick={() => setActiveMenu(activeMenu === menu.id ? null : menu.id)}
                            onMouseEnter={() => activeMenu && setActiveMenu(menu.id)}
                            className={`px-3 h-full flex items-center justify-center transition-colors rounded cursor-default outline-none
                                ${activeMenu === menu.id ? 'bg-white/10 text-white' : 'hover:bg-white/[0.06] text-white/70 hover:text-white'}
                            `}
                        >
                            {menu.isIcon ? (
                                <Zap className={`w-4 h-4 transition-all duration-300 ${activeMenu === menu.id ? 'text-yellow-400 fill-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]' : 'text-yellow-400 fill-yellow-400/20 drop-shadow-[0_0_5px_rgba(250,204,21,0.5)]'}`} strokeWidth={1.5} />
                            ) : (
                                menu.label
                            )}
                        </button>

                        {/* Dropdown del Menú */}
                        <AnimatePresence>
                            {activeMenu === menu.id && (
                                <motion.div
                                    initial={{ opacity: 0, y: 5, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 5, scale: 0.95 }}
                                    transition={{ duration: 0.15, ease: 'easeOut' }}
                                    className="absolute top-full left-0 mt-1 min-w-[220px] bg-black/85 backdrop-blur-3xl border border-white/[0.08] shadow-[0_15px_40px_rgba(0,0,0,0.8)] rounded-xl py-1.5 overflow-hidden flex flex-col z-[10000]"
                                >
                                    {menu.items.map((item, idx) =>
                                        item.divider ? (
                                            <div key={`div-${idx}`} className="w-full h-[1px] bg-white/[0.06] my-1.5" />
                                        ) : (
                                            <button
                                                key={item.label}
                                                onClick={item.action}
                                                className="w-full text-left px-4 py-1.5 hover:bg-yellow-400/10 hover:text-yellow-400 text-white/80 text-[13px] transition-colors outline-none cursor-default"
                                            >
                                                {item.label}
                                            </button>
                                        )
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}

                {/* Título Estático */}
                <div className="px-3 h-full flex items-center justify-center rounded cursor-default font-extrabold text-white tracking-tight ml-2 border-l border-white/[0.06] pl-4">
                    rayr.OS
                </div>
            </div>

            {/* Sección Derecha: Estado, Control y Reloj */}
            <div className="flex items-center gap-2 h-full py-1">
                <div className="flex items-center gap-1.5 px-2">
                    <button onClick={() => alert('Búsqueda indexada activada.')} className="hover:bg-white/[0.06] h-full px-1.5 rounded transition-colors cursor-default text-white/70 hover:text-white outline-none">
                        <Search className="w-3.5 h-3.5" strokeWidth={2} />
                    </button>
                    <button className="hover:bg-white/[0.06] h-full px-1.5 rounded transition-colors cursor-default text-white/70 hover:text-white outline-none">
                        <Wifi className="w-4 h-4" strokeWidth={2} />
                    </button>
                    <button className="hover:bg-white/[0.06] h-full px-1.5 rounded transition-colors cursor-default text-white/70 hover:text-white outline-none">
                        <BatteryMedium className="w-4 h-4" strokeWidth={2} />
                    </button>
                </div>

                {/* Reloj interactivo */}
                <button className="flex items-center gap-2 cursor-default hover:bg-white/[0.06] px-3 h-full rounded transition-colors text-white/80 hover:text-white outline-none">
                    <span className="capitalize">{formattedDate}</span>
                    <span>{formattedTime}</span>
                </button>
            </div>

        </div>
    );
};