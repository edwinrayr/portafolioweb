/**
 * @fileoverview Dynamic Fractal Lightning Background Effect.
 * Implements advanced procedural generation with branching paths (forked lightning),
 * native SVG plasma filters, and global atmospheric flash effects.
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Bolt {
    id: number;
    startX: number;
    mainPath: string;
    branches: string[];
    duration: number;
}

// Generador matemático Avanzado: Crea el rayo principal y sus ramificaciones
const generateFractalPath = (): { mainPath: string, branches: string[] } => {
    let x = 50;
    let y = 0;
    let mainPath = `M ${x} ${y}`;
    const branches: string[] = [];

    // Entre 20 y 35 segmentos para mayor detalle
    const segments = Math.floor(Math.random() * 15) + 20;

    for (let i = 1; i <= segments; i++) {
        const nextY = (i / segments) * 100;
        // Desviación más agresiva
        let nextX = x + (Math.random() - 0.5) * 35;
        nextX = Math.max(5, Math.min(95, nextX));

        mainPath += ` L ${nextX} ${nextY}`;

        // 35% de probabilidad de generar una rama lateral (Forked Lightning)
        if (Math.random() < 0.35 && i < segments - 3) {
            let bx = nextX;
            let by = nextY;
            let branchPath = `M ${bx} ${by}`;
            const branchLength = Math.floor(Math.random() * 4) + 2;
            const direction = Math.random() > 0.5 ? 1 : -1;

            for (let j = 0; j < branchLength; j++) {
                bx += direction * (Math.random() * 15 + 5);
                by += Math.random() * 10;
                branchPath += ` L ${bx} ${by}`;
            }
            branches.push(branchPath);
        }

        x = nextX;
        y = nextY;
    }

    return { mainPath, branches };
};

export const LightningBackground: React.FC = () => {
    const [bolts, setBolts] = useState<Bolt[]>([]);
    const [globalFlash, setGlobalFlash] = useState(false);
    const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

    useEffect(() => {
        const generateBolt = () => {
            const duration = Math.random() * 0.15 + 0.15; // Un poco más lento para apreciar el fractal
            const { mainPath, branches } = generateFractalPath();

            const newBolt: Bolt = {
                id: Date.now(),
                startX: Math.random() * 80 + 10,
                mainPath,
                branches,
                duration,
            };

            setBolts((prev) => [...prev, newBolt]);

            // Disparar flash global atmosférico
            setGlobalFlash(true);
            const flashTimer = setTimeout(() => setGlobalFlash(false), 80);
            timeoutsRef.current.push(flashTimer);

            // Limpiar rayo
            const removalTimer = setTimeout(() => {
                setBolts((prev) => prev.filter((b) => b.id !== newBolt.id));
            }, (duration + 0.1) * 1000);
            timeoutsRef.current.push(removalTimer);

            // Programar siguiente (intervalos de 5s a 15s)
            const nextSpawnDelay = Math.random() * 10000 + 5000;
            const spawnTimer = setTimeout(generateBolt, nextSpawnDelay);
            timeoutsRef.current.push(spawnTimer);
        };

        const initialTimer = setTimeout(generateBolt, 1500);
        timeoutsRef.current.push(initialTimer);

        return () => {
            timeoutsRef.current.forEach(clearTimeout);
        };
    }, []);

    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">

            {/* Capa Atmosférica: Fogonazo Global (Sky Flash) */}
            <AnimatePresence>
                {globalFlash && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: Math.random() * 0.15 + 0.1 }} // Brillo aleatorio sutil
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.1, ease: "easeOut" }}
                        className="absolute inset-0 bg-yellow-400 mix-blend-screen z-0"
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {bolts.map((bolt) => (
                    <React.Fragment key={bolt.id}>

                        {/* Destello Volumétrico de Origen (Nube) */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 0.6, 0.2, 0.8, 0] }}
                            transition={{ duration: bolt.duration, ease: 'linear' }}
                            className="absolute inset-0 pointer-events-none mix-blend-screen"
                            style={{
                                background: `radial-gradient(ellipse 60% 40% at ${bolt.startX}% 0%, rgba(250, 204, 21, 0.12) 0%, transparent 70%)`
                            }}
                        />

                        {/* SVG del Relámpago (Overflow visible para no cortar ramas) */}
                        <svg
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none"
                            className="absolute top-0 h-full w-[30vw] sm:w-[20vw] pointer-events-none overflow-visible"
                            style={{ left: `calc(${bolt.startX}% - 10vw)` }}
                        >
                            {/* Definición de Filtros Nativos SVG para Plasma Realista */}
                            <defs>
                                <filter id={`glow-${bolt.id}`} x="-50%" y="-50%" width="200%" height="200%">
                                    <feGaussianBlur stdDeviation="3" result="blur1" />
                                    <feGaussianBlur stdDeviation="6" result="blur2" />
                                    <feMerge>
                                        <feMergeNode in="blur2" />
                                        <feMergeNode in="blur1" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                            </defs>

                            <g filter={`url(#glow-${bolt.id})`}>
                                {/* Ramas Secundarias (Más delgadas y menos brillantes) */}
                                {bolt.branches.map((branch, i) => (
                                    <motion.path
                                        key={i}
                                        d={branch}
                                        stroke="#facc15"
                                        strokeWidth="1"
                                        fill="none"
                                        vectorEffect="non-scaling-stroke"
                                        className="opacity-60"
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        animate={{ pathLength: 1, opacity: [0, 1, 0] }}
                                        transition={{ duration: bolt.duration * 0.8, ease: 'easeOut' }}
                                    />
                                ))}

                                {/* Rayo Principal: Resplandor (Glow) */}
                                <motion.path
                                    d={bolt.mainPath}
                                    stroke="#eab308" // yellow-500
                                    strokeWidth="4"
                                    fill="none"
                                    vectorEffect="non-scaling-stroke"
                                    className="opacity-80"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: [0, 1, 0.3, 1, 0] }}
                                    transition={{ duration: bolt.duration, ease: 'easeOut' }}
                                />

                                {/* Rayo Principal: Núcleo (Core Blanco) */}
                                <motion.path
                                    d={bolt.mainPath}
                                    stroke="#ffffff"
                                    strokeWidth="1.5"
                                    fill="none"
                                    vectorEffect="non-scaling-stroke"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: [0, 1, 0, 1, 0] }}
                                    transition={{ duration: bolt.duration, ease: 'easeOut' }}
                                />
                            </g>
                        </svg>

                    </React.Fragment>
                ))}
            </AnimatePresence>
        </div>
    );
};