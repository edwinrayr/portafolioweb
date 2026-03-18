/**
 * @fileoverview High-Fidelity Interactive Status Bar - "Neon-Glass" Edition.
 * Acts as a trigger for a sleek mobile Control Center dropdown,
 * providing quick access to CV download and system actions.
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, Signal, BatteryMedium, ChevronDown, FileText, RefreshCw, Mail } from 'lucide-react';
import { useTime } from '../../hooks/useTime';

export const StatusBar: React.FC = () => {
    const time = useTime();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Formato 12 horas corto (ej. 10:09 AM)
    const formattedTime = time.toLocaleTimeString('es-MX', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    }).toUpperCase();

    // Función para descargar el CV que creamos
    const handleDownloadCV = () => {
        const link = document.createElement('a');
        link.href = '/Tu_CV_Edwin_Raya.pdf'; // Asegúrate de que el PDF esté en la carpeta public/
        link.download = 'CV_Edwin_Raya.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setIsMenuOpen(false); // Cierra el menú tras descargar
    };

    const handleRestart = () => {
        window.location.reload();
    };

    return (
        <>
            {/* Barra de Estado Interactiva */}
            <div
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="w-full h-12 flex items-center justify-between px-6 absolute top-0 left-0 z-[70] text-white pointer-events-auto cursor-pointer select-none group"
            >
                {/* Hora Left con indicador de despliegue */}
                <div className="flex items-center gap-1.5">
                    <span className="text-[15px] font-bold tracking-tight text-white/90 group-hover:text-yellow-400 transition-colors">
                        {formattedTime}
                    </span>
                    <ChevronDown className={`w-3.5 h-3.5 text-white/50 transition-transform duration-300 ${isMenuOpen ? 'rotate-180 text-yellow-400' : ''}`} />
                </div>

                {/* Iconos de Estado Right */}
                <div className="flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                    <Signal className="w-[16px] h-[16px] -mr-0.5" strokeWidth={2} />
                    <Wifi className="w-[16px] h-[16px]" strokeWidth={2.5} />
                    <div className="flex items-center gap-1">
                        <span className="text-[11px] font-bold text-white/90">98%</span>
                        <BatteryMedium className="w-[20px] h-[20px] text-yellow-400" strokeWidth={2.5} />
                    </div>
                </div>
            </div>

            {/* Centro de Control Desplegable (Control Center) */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        {/* Overlay invisible para cerrar el menú al tocar fuera */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMenuOpen(false)}
                            className="absolute inset-0 z-[65] bg-black/20 backdrop-blur-sm pointer-events-auto"
                        />

                        {/* Panel del Menú */}
                        <motion.div
                            initial={{ y: -100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -100, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className="absolute top-12 left-4 right-4 z-[70] bg-[#0A0A0A]/90 backdrop-blur-2xl border border-white/[0.08] rounded-3xl p-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)] pointer-events-auto flex flex-col gap-1"
                        >
                            {/* Botón: Descargar CV */}
                            <button
                                onClick={handleDownloadCV}
                                className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-white/[0.03] hover:bg-yellow-400/10 border border-transparent hover:border-yellow-400/30 text-white/80 hover:text-yellow-400 transition-all outline-none group/btn"
                            >
                                <FileText className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                                <div className="flex flex-col items-start">
                                    <span className="text-[13px] font-bold tracking-wide">Descargar Currículum</span>
                                    <span className="text-[10px] text-white/40">PDF Formato ATS</span>
                                </div>
                            </button>

                            {/* Fila de Acciones Rápidas */}
                            <div className="grid grid-cols-2 gap-1">
                                <a
                                    href="mailto:edraya.reyna@gmail.com"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex flex-col items-center justify-center gap-1.5 py-3 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-transparent hover:border-white/10 text-white/60 hover:text-white transition-all outline-none"
                                >
                                    <Mail className="w-4 h-4" />
                                    <span className="text-[11px] font-medium">Email</span>
                                </a>

                                <button
                                    onClick={handleRestart}
                                    className="flex flex-col items-center justify-center gap-1.5 py-3 rounded-2xl bg-white/[0.02] hover:bg-red-500/10 border border-transparent hover:border-red-500/20 text-white/60 hover:text-red-400 transition-all outline-none"
                                >
                                    <RefreshCw className="w-4 h-4" />
                                    <span className="text-[11px] font-medium">Reiniciar SO</span>
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};