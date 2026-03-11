/**
 * @fileoverview Dynamic Lightning Background Effect.
 * Implements procedural generation for unique lightning paths, 
 * multi-layered SVG rendering (white core + yellow glow), 
 * and warm amber volumetric radial flashes.
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Bolt {
    id: number;
    startX: number;
    path: string;
    duration: number;
}

// Generador matemático de rutas SVG fractales
const generateProceduralPath = (): string => {
    let x = 50; // Inicia en el centro de su propio contenedor SVG
    let y = 0;
    let path = `M ${x} ${y}`;

    // Entre 15 y 30 segmentos por rayo para alta definición de quiebre
    const segments = Math.floor(Math.random() * 15) + 15;

    for (let i = 1; i <= segments; i++) {
        y = (i / segments) * 100; // Descenso vertical progresivo
        // Desviación horizontal caótica (entre -20 y +20 unidades)
        x += (Math.random() - 0.5) * 40;
        // Mantiene el rayo dentro de los límites visuales del SVG
        x = Math.max(5, Math.min(95, x));
        path += ` L ${x} ${y}`;
    }

    return path;
};

export const LightningBackground: React.FC = () => {
    const [bolts, setBolts] = useState<Bolt[]>([]);
    const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

    useEffect(() => {
        const generateBolt = () => {
            const duration = Math.random() * 0.15 + 0.1;
            const newBolt: Bolt = {
                id: Date.now(),
                startX: Math.random() * 80 + 10, // Cae entre el 10% y el 90% de la pantalla
                path: generateProceduralPath(),
                duration,
            };

            setBolts((prev) => [...prev, newBolt]);

            // Limpieza del rayo específico después de su animación
            const removalTimer = setTimeout(() => {
                setBolts((prev) => prev.filter((b) => b.id !== newBolt.id));
            }, (duration + 0.1) * 1000);
            timeoutsRef.current.push(removalTimer);

            // Programa el siguiente rayo (intervalo realista: 4s a 15s)
            const nextSpawnDelay = Math.random() * 11000 + 4000;
            const spawnTimer = setTimeout(generateBolt, nextSpawnDelay);
            timeoutsRef.current.push(spawnTimer);
        };

        // Primer rayo a los 2s de cargar
        const initialTimer = setTimeout(generateBolt, 2000);
        timeoutsRef.current.push(initialTimer);

        return () => {
            // Limpieza exhaustiva de memoria al desmontar
            timeoutsRef.current.forEach(clearTimeout);
        };
    }, []);

    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
            <AnimatePresence>
                {bolts.map((bolt) => (
                    <React.Fragment key={bolt.id}>

                        {/* Capa 1: Destello Volumétrico Radial Cálido */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 0.5, 0.1, 0.7, 0] }} // Patrón de parpadeo realista
                            transition={{ duration: bolt.duration, ease: 'linear' }}
                            className="absolute inset-0 pointer-events-none mix-blend-screen"
                            style={{
                                // Gradiente radial ámbar que nace desde la coordenada superior del rayo
                                background: `radial-gradient(circle at ${bolt.startX}% 0%, rgba(250, 204, 21, 0.1) 0%, transparent 70%)`
                            }}
                        />

                        {/* Capa 2: Contenedor del Rayo SVG */}
                        <svg
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none"
                            className="absolute top-0 h-full w-[20vw] sm:w-[12vw] pointer-events-none"
                            style={{ left: `calc(${bolt.startX}% - 6vw)` }} // Centra el SVG sobre startX
                        >
                            {/* Resplandor externo amarillo (Glow) */}
                            <motion.path
                                d={bolt.path}
                                stroke="#facc15" // yellow-400
                                strokeWidth="4"
                                fill="none"
                                vectorEffect="non-scaling-stroke"
                                className="blur-[2px] opacity-70"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: [0, 1, 0.5, 1, 0] }}
                                transition={{ duration: bolt.duration, ease: 'easeOut' }}
                            />

                            {/* Núcleo interno blanco súper brillante con glow amarillo (Core) */}
                            <motion.path
                                d={bolt.path}
                                stroke="#ffffff" // Blanco puro para máximo brillo central
                                strokeWidth="1.2"
                                fill="none"
                                vectorEffect="non-scaling-stroke"
                                className="drop-shadow-[0_0_6px_rgba(250,204,21,0.7)]" // Resplandor amarillo suave integrado
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: [0, 1, 0.2, 1, 0] }}
                                transition={{ duration: bolt.duration, ease: 'easeOut' }}
                            />
                        </svg>

                    </React.Fragment>
                ))}
            </AnimatePresence>
        </div>
    );
};