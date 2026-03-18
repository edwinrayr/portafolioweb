/**
 * @fileoverview About Me application module - "Neon-Glass" Edition.
 * Features a perfectly balanced Bento Box grid with dynamic row heights.
 * Monochromatic tech aesthetic with electric yellow interactive accents.
 */

import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { MapPin, Code2, Briefcase, Instagram, Github, ArrowUpRight, TerminalSquare } from 'lucide-react';

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: 'spring', stiffness: 300, damping: 24 }
    },
};

const About = () => {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="p-5 h-full w-full grid grid-cols-4 auto-rows-[160px] gap-4 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
            {/* Caja 1: Perfil Principal (Dossier) */}
            <motion.div
                variants={itemVariants}
                className="col-span-4 md:col-span-2 row-span-2 bg-white/[0.015] border border-white/[0.06] rounded-[2rem] p-6 relative overflow-hidden group shadow-[inset_0_1px_0_0_rgba(255,255,255,0.02)] flex flex-col justify-between hover:bg-white/[0.03] transition-colors duration-500"
            >
                {/* Resplandor amarillo sutil en el fondo */}
                <div className="absolute -top-20 -right-20 w-72 h-72 bg-yellow-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {/* Patrón de cuadrícula tech de fondo (muy sutil) */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)] pointer-events-none opacity-20" />

                <div className="relative z-10 flex flex-col h-full justify-between">
                    <div className="flex items-start justify-between mb-4">
                        <div className="relative">
                            <div className="absolute inset-0 bg-yellow-400/20 blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <img
                                src="/img/EdwinRaya.webp"
                                alt="Edwin Raya"
                                className="relative w-20 h-20 rounded-2xl object-cover border border-white/10 shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:border-yellow-400/30 grayscale group-hover:grayscale-0"
                            />
                        </div>

                        {/* Etiqueta de estado "Neon" */}
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-[10px] font-bold tracking-wider uppercase shadow-[0_0_15px_rgba(250,204,21,0.1)] mt-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 shadow-[0_0_5px_rgba(250,204,21,0.8)] animate-pulse" />
                            Disponible
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <TerminalSquare className="w-4 h-4 text-white/30" />
                            <h1 className="text-[30px] leading-tight font-extrabold text-white tracking-tight">
                                Edwin Raya
                            </h1>
                        </div>
                        <h2 className="text-[14px] font-medium text-white/80 mb-3 flex items-center gap-2">
                            <Briefcase className="w-4 h-4 text-yellow-400 drop-shadow-[0_0_5px_rgba(250,204,21,0.5)]" />
                            Ingeniero en Computación <span className="text-white/20">|</span> Frontend Jr
                        </h2>
                        <p className="text-[13px] text-white/50 leading-relaxed font-light pr-4 group-hover:text-white/70 transition-colors">
                            Especializado en la construcción de interfaces web escalables y experiencias de usuario inmersivas. Liderando el desarrollo visual en eSoft Pasion.
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Caja 2: Tech Stack */}
            <motion.div
                variants={itemVariants}
                className="col-span-4 md:col-span-2 row-span-1 bg-white/[0.015] border border-white/[0.06] rounded-[2rem] p-6 flex flex-col justify-center shadow-[inset_0_1px_0_0_rgba(255,255,255,0.02)] group hover:border-white/10 transition-colors"
            >
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-white/70 group-hover:text-white/90 transition-colors">
                        <Code2 className="w-4 h-4 text-yellow-400" />
                        <h3 className="text-[13px] font-bold tracking-wide uppercase">Tech Stack Principal</h3>
                    </div>
                </div>
                <div className="flex flex-wrap gap-2">
                    {['React', 'TypeScript', 'Tailwind v4', 'Vite', 'Framer Motion', 'PHP', 'Git'].map((tech) => (
                        <span
                            key={tech}
                            className="px-3 py-1.5 bg-white/[0.03] border border-white/[0.05] rounded-xl text-[11px] font-medium text-white/60 hover:text-yellow-400 hover:bg-yellow-400/10 hover:border-yellow-400/30 hover:shadow-[0_0_10px_rgba(250,204,21,0.2)] hover:-translate-y-0.5 transition-all duration-300 cursor-default"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </motion.div>

            {/* Caja 3: Focus Actual */}
            <motion.div
                variants={itemVariants}
                className="col-span-4 md:col-span-2 row-span-1 bg-white/[0.015] border border-white/[0.06] rounded-[2rem] p-5 relative overflow-hidden shadow-[inset_0_1px_0_0_rgba(255,255,255,0.02)] group flex flex-col justify-center hover:bg-white/[0.03] transition-colors"
            >
                <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-yellow-500/5 blur-3xl rounded-full group-hover:bg-yellow-500/10 transition-colors duration-500" />
                <h3 className="text-[12px] font-bold uppercase tracking-widest text-white/50 mb-3 relative z-10">Procesos Activos</h3>
                <ul className="space-y-2.5 relative z-10">
                    <li className="flex items-center gap-3 text-[12px] text-white/80 group/item hover:translate-x-1 transition-transform cursor-default">
                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.8)]" />
                        <span className="font-medium group-hover/item:text-yellow-400 transition-colors">Rediseño UI/UX Nedimi</span>
                        <span className="text-yellow-400/50 text-[9px] border border-yellow-400/20 bg-yellow-400/5 px-2 py-0.5 rounded-full ml-auto">Tech Lead</span>
                    </li>
                    <li className="flex items-center gap-3 text-[12px] text-white/60 group/item hover:translate-x-1 transition-transform cursor-default">
                        <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                        <span className="font-medium group-hover/item:text-white transition-colors">Dolphin Dive Baja</span>
                        <span className="text-white/40 text-[9px] border border-white/10 px-2 py-0.5 rounded-full ml-auto">Frontend</span>
                    </li>
                    <li className="flex items-center gap-3 text-[12px] text-white/60 group/item hover:translate-x-1 transition-transform cursor-default">
                        <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                        <span className="font-medium group-hover/item:text-white transition-colors">eSoft-Pasion-V3 Core</span>
                        <span className="text-white/40 text-[9px] border border-white/10 px-2 py-0.5 rounded-full ml-auto">Dev</span>
                    </li>
                </ul>
            </motion.div>

            {/* Caja 4: Ubicación */}
            <motion.div
                variants={itemVariants}
                className="col-span-2 md:col-span-1 row-span-1 bg-white/[0.015] border border-white/[0.06] rounded-[2rem] p-5 flex flex-col items-center justify-center text-center group hover:bg-white/[0.03] hover:border-yellow-400/30 transition-all shadow-[inset_0_1px_0_0_rgba(255,255,255,0.02)] cursor-default"
            >
                <MapPin className="w-6 h-6 text-white/40 mb-2 group-hover:text-yellow-400 group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300 group-hover:drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]" />
                <span className="text-xs font-semibold text-white/70 group-hover:text-white transition-colors">Edo. de México</span>
                <span className="text-[10px] text-white/40 mt-0.5">México</span>
            </motion.div>

            {/* Caja 5: Instagram */}
            <motion.a
                href="https://instagram.com/rayrdev"
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                className="col-span-2 md:col-span-1 row-span-1 bg-white/[0.015] border border-white/[0.06] rounded-[2rem] p-5 flex flex-col items-center justify-center group hover:bg-yellow-400/5 hover:border-yellow-400/30 transition-all duration-300 cursor-pointer block text-center shadow-[inset_0_1px_0_0_rgba(255,255,255,0.02)] outline-none"
            >
                <Instagram className="w-6 h-6 text-white/40 mb-2 group-hover:text-yellow-400 group-hover:scale-110 group-hover:-translate-y-1 transition-all mx-auto group-hover:drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]" />
                <span className="text-[11px] font-semibold text-white/70 group-hover:text-yellow-400 transition-colors">@rayrdev</span>
                <span className="text-[10px] text-white/40 mt-0.5 block">Instagram</span>
            </motion.a>

            {/* Caja 6: GitHub */}
            <motion.a
                href="https://github.com/edwinrayr"
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                className="col-span-4 md:col-span-2 row-span-1 bg-white/[0.015] border border-white/[0.06] rounded-[2rem] p-6 flex items-center justify-between group hover:bg-white/[0.04] hover:border-yellow-400/30 transition-all shadow-[inset_0_1px_0_0_rgba(255,255,255,0.02)] cursor-pointer outline-none"
            >
                <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-yellow-400/10 group-hover:border-yellow-400/30 transition-colors">
                        <Github className="w-5 h-5 text-white/60 group-hover:text-yellow-400 transition-colors drop-shadow-md" />
                    </div>
                    <div>
                        <h3 className="text-[13px] font-bold text-white/80 group-hover:text-white transition-colors tracking-wide">Explora mi código</h3>
                        <p className="text-[11px] text-white/40 mt-0.5">@edwinrayr en GitHub</p>
                    </div>
                </div>
                <div className="w-8 h-8 rounded-full flex items-center justify-center group-hover:bg-white/5 transition-colors">
                    <ArrowUpRight className="w-5 h-5 text-white/30 group-hover:text-yellow-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
            </motion.a>

        </motion.div>
    );
};

export default About;