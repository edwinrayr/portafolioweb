/**
 * @fileoverview Global Top Navigation Bar component.
 * Features ultra-thin glassmorphism, dynamic branding (Zap logo), 
 * and localized real-time clock synchronization.
 */

import React from 'react';
import { Zap, Wifi, BatteryMedium, Search } from 'lucide-react';
import { useTime } from '../../hooks/useTime';

const menuItems = ['Archivo', 'Edición', 'Visualización', 'Ir', 'Ventana', 'Ayuda'];

export const TopBar: React.FC = () => {
    const currentTime = useTime();

    const formattedTime = currentTime.toLocaleTimeString('es-MX', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });

    const formattedDate = currentTime.toLocaleDateString('es-MX', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
    });

    return (
        <div className="absolute top-0 left-0 w-full h-8 bg-black/20 backdrop-blur-3xl border-b border-white/[0.08] shadow-[0_1px_0_0_rgba(255,255,255,0.02)] flex items-center justify-between px-3 z-[9999] text-[#E0E0E0] text-[13px] font-medium tracking-wide">

            {/* Sección Izquierda: Branding y Menús del OS */}
            <div className="flex items-center h-full py-1">
                <button
                    className="px-2.5 h-full flex items-center justify-center hover:bg-white/10 transition-colors rounded cursor-default group"
                    aria-label="Menú Principal"
                >
                    <Zap
                        className="w-4 h-4 text-yellow-400 fill-yellow-400 group-hover:drop-shadow-[0_0_8px_rgba(250,204,21,0.6)] transition-all duration-300"
                        strokeWidth={1}
                    />
                </button>

                <button className="px-3 h-full flex items-center justify-center hover:bg-white/10 transition-colors rounded cursor-default font-bold text-white drop-shadow-sm ml-0.5">
                    rayrdev
                </button>

                <div className="hidden sm:flex items-center h-full ml-1">
                    {menuItems.map((item) => (
                        <button
                            key={item}
                            className="px-3 h-full flex items-center justify-center hover:bg-white/10 transition-colors rounded cursor-default text-white/90 hover:text-white"
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div>

            {/* Sección Derecha: Estado, Control y Reloj */}
            <div className="flex items-center gap-2 h-full py-1">
                <div className="flex items-center gap-1.5 px-2">
                    <button className="hover:bg-white/10 h-full px-1.5 rounded transition-colors cursor-default text-white/80 hover:text-white">
                        <Search className="w-3.5 h-3.5" strokeWidth={2} />
                    </button>
                    <button className="hover:bg-white/10 h-full px-1.5 rounded transition-colors cursor-default text-white/80 hover:text-white">
                        <Wifi className="w-4 h-4" strokeWidth={2} />
                    </button>
                    <button className="hover:bg-white/10 h-full px-1.5 rounded transition-colors cursor-default text-white/80 hover:text-white">
                        <BatteryMedium className="w-4 h-4" strokeWidth={2} />
                    </button>
                </div>

                <button className="flex items-center gap-2 cursor-default hover:bg-white/10 px-3 h-full rounded transition-colors text-white/90 hover:text-white">
                    <span className="capitalize">{formattedDate}</span>
                    <span>{formattedTime}</span>
                </button>
            </div>

        </div>
    );
};