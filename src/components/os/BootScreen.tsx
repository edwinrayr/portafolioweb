/**
 * @fileoverview rayr.OS Boot Sequence Screen - "Verbose Terminal" Edition.
 * Bulletproof version: Protected against undefined logs and React fatal crashes.
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

const bootSequence = [
    "rayr.OS BIOS v2.0.4 (Built 2026-03-17)",
    "Main Processor : ARM Neural Engine ... OK",
    "Memory Test    : 8388608K ... OK",
    "Loading Kernel ....................... OK",
    "Mounting Virtual File System ......... OK",
    "Initializing Hardware Drivers ........ OK",
    "Starting Glassmorphism Engine ........ OK",
    "Loading Framer Motion Physics ........ OK",
    "Establishing Secure Connection ....... OK",
    "User Profile   : Edwin Raya (Admin) .. VERIFIED",
    "Injecting Neon-Glass Stylesheets ..... DONE",
    "Boot sequence complete.",
    "Starting GUI Desktop Environment ..... INIT"
];

interface BootScreenProps {
    onComplete: () => void;
}

export const BootScreen: React.FC<BootScreenProps> = ({ onComplete }) => {
    const [displayedLogs, setDisplayedLogs] = useState<string[]>([]);
    const [isDone, setIsDone] = useState(false);

    useEffect(() => {
        let currentIndex = 0;

        const logInterval = setInterval(() => {
            // Protección: Solo intentamos agregar si el índice es válido
            if (currentIndex < bootSequence.length) {
                const nextLog = bootSequence[currentIndex] || "";
                setDisplayedLogs((prev) => [...prev, nextLog]);
                currentIndex++;
            }

            if (currentIndex >= bootSequence.length) {
                clearInterval(logInterval);
                setIsDone(true);
                setTimeout(onComplete, 600);
            }
        }, 150);

        return () => clearInterval(logInterval);
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(15px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[99999] bg-[#030303] flex flex-col items-start justify-end p-6 md:p-12 font-mono selection:bg-yellow-500/30 overflow-hidden"
        >
            <div className="absolute top-8 right-8 flex items-center gap-3 opacity-30">
                <div className="text-right">
                    <p className="text-[10px] text-yellow-400 font-bold tracking-widest">RAYR.OS // SYSTEM</p>
                    <p className="text-[9px] text-white/50">ENERGY STAR COMPLIANT</p>
                </div>
                <Zap className="w-8 h-8 text-yellow-400" strokeWidth={1} />
            </div>

            <div className="w-full max-w-3xl flex flex-col gap-1.5 relative z-10">
                {displayedLogs.map((log, index) => {
                    // SALVAVIDAS: Si el log es undefined, no renderizamos nada y evitamos el Crash
                    if (!log) return null;

                    // Usamos includes que es más seguro que endsWith
                    const isSuccessLog = log.includes("OK") || log.includes("VERIFIED") || log.includes("DONE") || log.includes("INIT");
                    let mainText = log;
                    let statusText = "";

                    if (isSuccessLog) {
                        const words = log.split(" ");
                        statusText = words.pop() || "";
                        mainText = words.join(" ");
                    }

                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.1 }}
                            className="text-[12px] md:text-[14px] text-white/70 tracking-wide flex w-full"
                        >
                            {isSuccessLog ? (
                                <>
                                    <span>{mainText} </span>
                                    <span className="ml-2 text-yellow-400 font-bold drop-shadow-[0_0_5px_rgba(250,204,21,0.5)]">
                                        {statusText}
                                    </span>
                                </>
                            ) : (
                                <span className={index === 0 ? "text-white font-bold mb-2" : ""}>
                                    {log}
                                </span>
                            )}
                        </motion.div>
                    );
                })}

                {!isDone && (
                    <div className="w-2.5 h-4 bg-yellow-400 mt-1 animate-pulse shadow-[0_0_8px_rgba(250,204,21,0.8)]" />
                )}
            </div>
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]" />
        </motion.div>
    );
};