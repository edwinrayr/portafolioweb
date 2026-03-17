/**
 * @fileoverview High-Fidelity iOS-style Status Bar.
 * Clones Cupertino proportions and typography for a premium feel.
 */

import React from 'react';
import { Wifi, Signal, BatteryMedium } from 'lucide-react';
import { useTime } from '../../hooks/useTime';

export const StatusBar: React.FC = () => {
    const time = useTime();
    // Formato 12 horas corto (ej. 10:09 AM) clásico en iOS
    const formattedTime = time.toLocaleTimeString('es-MX', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    }).toUpperCase(); // AM/PM en mayúsculas

    return (
        <div className="w-full h-12 flex items-center justify-between px-6 absolute top-0 left-0 z-[60] text-white pointer-events-none select-none">
            {/* Hora Left (Cupertino Style bold) */}
            <span className="text-[16px] font-bold tracking-tight text-white/95">
                {formattedTime}
            </span>

            {/* Iconos de Estado Right (iOS Proportions) */}
            <div className="flex items-center gap-1.5 opacity-90 scale-105">
                <Signal className="w-[17px] h-[17px] -mr-0.5" strokeWidth={2} />
                <Wifi className="w-[17px] h-[17px]" strokeWidth={2.5} />
                <div className="flex items-center gap-1">
                    <span className="text-[12px] font-semibold text-white/90">98%</span>
                    <BatteryMedium className="w-[21px] h-[21px]" strokeWidth={2.5} />
                </div>
            </div>
        </div>
    );
};