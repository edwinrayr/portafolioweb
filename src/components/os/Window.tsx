/**
 * @fileoverview Window UI component for the OS environment.
 * Features high-fidelity glassmorphism, inner borders, and dynamic focus lighting.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useWindowStore } from '../../store/windowStore';

interface WindowProps {
    id: string;
    title: string;
    children: React.ReactNode;
}

export const Window: React.FC<WindowProps> = ({ id, title, children }) => {
    const { windows, closeWindow, focusWindow } = useWindowStore();
    const windowState = windows.find((w) => w.id === id);

    if (!windowState || !windowState.isOpen) return null;

    const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        closeWindow(id);
    };

    const handleFocus = () => {
        if (!windowState.isFocused) {
            focusWindow(id);
        }
    };

    return (
        <motion.div
            id={`window-${id}`}
            drag
            dragMomentum={false}
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            style={{ zIndex: windowState.zIndex }}
            onPointerDown={handleFocus}
            className={`absolute top-20 left-20 flex flex-col w-[850px] h-[550px] rounded-2xl overflow-hidden transition-all duration-300 ease-out
        ${windowState.isFocused
                    ? 'bg-black/60 backdrop-blur-3xl border border-white/15 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(255,255,255,0.1)]'
                    : 'bg-black/40 backdrop-blur-xl border border-white/5 shadow-2xl opacity-90 scale-[0.99] grayscale-[20%]'
                }`}
        >
            <div className="flex items-center justify-between px-5 py-3.5 bg-gradient-to-b from-white/[0.08] to-transparent border-b border-white/[0.08] cursor-move">
                <div className="flex items-center gap-2.5 w-20">
                    <button
                        onClick={handleClose}
                        onPointerDown={(e) => e.stopPropagation()}
                        className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] border border-[#E0443E] hover:bg-[#FF5F56]/80 flex items-center justify-center transition-colors group"
                        aria-label="Cerrar"
                    >
                        <span className="opacity-0 group-hover:opacity-100 text-[#990000] text-[9px] font-bold leading-none">✕</span>
                    </button>
                    <button
                        className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] border border-[#DEA123] hover:bg-[#FFBD2E]/80 transition-colors"
                        aria-label="Minimizar"
                    />
                    <button
                        className="w-3.5 h-3.5 rounded-full bg-[#27C93F] border border-[#1AAB29] hover:bg-[#27C93F]/80 transition-colors"
                        aria-label="Maximizar"
                    />
                </div>

                <div className="flex-1 flex items-center justify-center pointer-events-none">
                    <span className="text-sm font-medium text-[#E0E0E0] select-none tracking-wide text-shadow-sm">
                        {title}
                    </span>
                </div>

                <div className="w-20" />
            </div>

            <div
                className="flex-1 overflow-auto relative bg-transparent scrollbar-hide p-1"
                onPointerDown={(e) => e.stopPropagation()}
            >
                <div className="w-full h-full bg-black/20 rounded-b-xl rounded-t-sm shadow-[inset_0_2px_10px_rgba(0,0,0,0.3)] border border-white/[0.02]">
                    {children}
                </div>
            </div>
        </motion.div>
    );

};