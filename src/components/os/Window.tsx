/**
 * @fileoverview Premium Window Component - "Neon-Glass" Edition.
 * Unifies Desktop visual language with Mobile "Tech" aesthetics.
 * Implements glassmorphism, dragging, focusing, neon zap accents, 
 * and macOS-style Genie minimize animation.
 */

import React, { useState, useEffect } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { GripVertical, X, Minus, Square } from 'lucide-react';
import { useWindowStore } from '../../store/windowStore';
import type { WindowState } from '../../types/index';

import About from '../apps/About';
import Projects from '../apps/Projects';
import Contact from '../apps/Contact';

interface WindowProps {
    window: Omit<WindowState, 'component'>;
}

export const Window: React.FC<WindowProps> = ({ window: win }) => {
    const { id, title, zIndex, isFocused, position } = win;
    const { closeWindow, focusWindow, updatePosition } = useWindowStore();

    const [isMaximized, setIsMaximized] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);

    const dragControls = useDragControls();

    // EFECTO CORREGIDO: Usamos zIndex para detectar clics reales en el Dock
    // Cada vez que haces clic en un ícono del Dock, su zIndex aumenta.
    useEffect(() => {
        if (isMinimized) {
            setIsMinimized(false);
        }
    }, [zIndex]); // Solo se ejecuta cuando la ventana es traída al frente explícitamente

    const renderAppContent = () => {
        switch (id) {
            case 'about': return <About />;
            case 'projects': return <Projects />;
            case 'contact': return <Contact />;
            default:
                return (
                    <div className="w-full h-full flex items-center justify-center text-white/30 text-xs">
                        App no encontrada.
                    </div>
                );
        }
    };

    // ANIMACIONES DINÁMICAS (Efecto Genio de Succión hacia el Dock)
    const animateState = isMinimized
        ? {
            opacity: 0,
            scale: 0.1,
            y: typeof window !== 'undefined' ? window.innerHeight : 1000,
            x: typeof window !== 'undefined' ? (window.innerWidth / 2) - 400 : position.x,
            filter: "blur(10px)",
            pointerEvents: "none" as const
        }
        : isMaximized
            ? { opacity: 1, scale: 1, x: 0, y: 32, width: '100%', height: 'calc(100% - 32px)', borderRadius: '0px', filter: "blur(0px)", pointerEvents: "auto" as const }
            : { opacity: 1, scale: 1, x: position.x, y: position.y, width: 800, height: 500, borderRadius: '1rem', filter: "blur(0px)", pointerEvents: "auto" as const };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, x: position.x, y: position.y + 20 }}
            animate={animateState}
            exit={{ opacity: 0, scale: 0.95, x: position.x, y: position.y + 20 }}
            transition={{ type: 'spring', damping: 28, stiffness: 250 }}

            onMouseDown={() => {
                if (!isFocused && !isMinimized) focusWindow(id);
            }}

            drag={!isMaximized && !isMinimized}
            dragControls={dragControls}
            dragListener={false}
            dragMomentum={false}
            dragElastic={0}

            onDragEnd={(_, info) => {
                if (!isMaximized && !isMinimized) {
                    updatePosition(id, { x: info.point.x, y: info.point.y });
                }
            }}

            className={`
                absolute flex flex-col overflow-hidden shadow-2xl transition-shadow duration-300
                ${isFocused
                    ? 'bg-black/90 backdrop-blur-3xl border border-white/[0.08] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]'
                    : 'bg-black/70 backdrop-blur-xl border border-white/[0.04] opacity-80'
                }
            `}
            style={{
                zIndex,
                transformOrigin: isMinimized ? "bottom center" : "center"
            }}
        >
            {/* HEADER / TOP BAR */}
            <div
                className="w-full h-10 flex items-center justify-between pl-4 pr-2.5 border-b border-white/[0.05] select-none cursor-grab active:cursor-grabbing"
                onPointerDown={(e) => {
                    if (!isMaximized) dragControls.start(e);
                }}
                onDoubleClick={() => setIsMaximized(!isMaximized)}
            >
                {/* Controles de Semáforo */}
                <div className="flex items-center gap-2 group/lights">
                    <button
                        onMouseDown={(e) => e.stopPropagation()} // Bloquea el focus indeseado
                        onClick={(e) => { e.stopPropagation(); closeWindow(id); }}
                        className="w-3.5 h-3.5 rounded-full bg-red-500/80 border border-red-700 hover:bg-red-500 flex items-center justify-center transition-colors outline-none"
                        title="Cerrar"
                    >
                        <X className="w-2.5 h-2.5 text-black opacity-0 group-hover/lights:opacity-100" strokeWidth={3} />
                    </button>

                    <button
                        onMouseDown={(e) => e.stopPropagation()} // Bloquea el focus indeseado
                        onClick={(e) => { e.stopPropagation(); setIsMinimized(true); }}
                        className="w-3.5 h-3.5 rounded-full bg-yellow-500/80 border border-yellow-700 hover:bg-yellow-500 flex items-center justify-center transition-colors outline-none"
                        title="Minimizar"
                    >
                        <Minus className="w-2.5 h-2.5 text-black opacity-0 group-hover/lights:opacity-100" strokeWidth={3} />
                    </button>

                    <button
                        onMouseDown={(e) => e.stopPropagation()} // Bloquea el focus indeseado
                        onClick={(e) => { e.stopPropagation(); setIsMaximized(!isMaximized); }}
                        className="w-3.5 h-3.5 rounded-full bg-green-500/80 border border-green-700 hover:bg-green-500 flex items-center justify-center transition-colors outline-none"
                        title="Maximizar"
                    >
                        <Square className="w-2 h-2 text-black opacity-0 group-hover/lights:opacity-100" strokeWidth={4} />
                    </button>
                </div>

                {/* Título Central "Neon Zap" */}
                <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 pointer-events-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 shadow-[0_0_5px_rgba(250,204,21,0.7)]" />
                    <h2 className="text-[13px] font-bold tracking-tight text-yellow-400 drop-shadow-[0_0_5px_rgba(250,204,21,0.3)]">
                        {title}
                    </h2>
                </div>

                <div className="flex items-center gap-2 text-white/10 pr-1 pointer-events-none">
                    <GripVertical className='w-4 h-4' strokeWidth={1} />
                </div>
            </div>

            {/* CONTENIDO DE LA APLICACIÓN */}
            <div className="flex-1 overflow-auto relative bg-transparent p-1 [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/5 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/10">
                {renderAppContent()}
            </div>
        </motion.div>
    );
};