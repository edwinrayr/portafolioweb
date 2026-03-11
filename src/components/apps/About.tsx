/**
 * @fileoverview About Me application module.
 * Features a perfectly balanced Bento Box grid with dynamic row heights.
 * Includes professional Instagram integration for visual portfolio sharing.
 */

import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { MapPin, Code2, Briefcase, Instagram, Github, ArrowUpRight } from 'lucide-react';

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
            className="p-6 h-full w-full grid grid-cols-4 auto-rows-[160px] gap-4 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
            <motion.div
                variants={itemVariants}
                className="col-span-4 md:col-span-2 row-span-2 bg-gradient-to-br from-white/[0.05] to-transparent border border-white/[0.08] rounded-3xl p-6 relative overflow-hidden group shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] flex flex-col justify-between"
            >
                <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-700 pointer-events-none" />

                <div className="relative z-10 flex flex-col h-full justify-between">
                    <div className="flex items-start justify-between mb-4">
                        <div className="relative">
                            <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-2xl" />
                            <img
                                src="/img/EdwinRaya.webp"
                                alt="Edwin Raya"
                                className="relative w-20 h-20 rounded-2xl object-cover border border-white/20 shadow-2xl transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>

                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold tracking-wider uppercase shadow-sm mt-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                            Disponible
                        </div>
                    </div>

                    <div>
                        <h1 className="text-[32px] leading-tight font-extrabold text-white tracking-tight mb-1">
                            Edwin Raya
                        </h1>
                        <h2 className="text-[14px] font-medium text-[#E0E0E0] mb-3 flex items-center gap-2">
                            <Briefcase className="w-4 h-4 text-yellow-500" />
                            Ingeniero en Computación <span className="text-white/30">|</span> Frontend Jr
                        </h2>
                        <p className="text-[13px] text-white/60 leading-relaxed font-light pr-4">
                            Especializado en la construcción de interfaces web escalables y experiencias de usuario inmersivas. Liderando el desarrollo visual en eSoft Pasion.
                        </p>
                    </div>
                </div>
            </motion.div>

            <motion.div
                variants={itemVariants}
                className="col-span-4 md:col-span-2 row-span-1 bg-white/[0.02] border border-white/[0.08] rounded-3xl p-6 flex flex-col justify-center shadow-[inset_0_1px_0_0_rgba(255,255,255,0.02)]"
            >
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-white/80">
                        <Code2 className="w-4 h-4" />
                        <h3 className="text-sm font-semibold tracking-wide">Tech Stack Principal</h3>
                    </div>
                </div>
                <div className="flex flex-wrap gap-2">
                    {['React', 'TypeScript', 'Tailwind v4', 'Vite', 'Framer Motion', 'PHP', 'Git'].map((tech) => (
                        <span
                            key={tech}
                            className="px-3 py-1.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-[11px] font-medium text-[#ECECEC] hover:bg-white/10 hover:border-white/20 hover:-translate-y-0.5 transition-all duration-200 cursor-default shadow-sm"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </motion.div>

            <motion.div
                variants={itemVariants}
                className="col-span-4 md:col-span-2 row-span-1 bg-white/[0.02] border border-white/[0.08] rounded-3xl p-5 relative overflow-hidden shadow-[inset_0_1px_0_0_rgba(255,255,255,0.02)] group flex flex-col justify-center"
            >
                <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-green-500/10 blur-3xl rounded-full group-hover:bg-green-500/20 transition-colors duration-500" />
                <h3 className="text-sm font-semibold tracking-wide text-white/80 mb-2.5 relative z-10">Focus Actual</h3>
                <ul className="space-y-2 relative z-10">
                    <li className="flex items-center gap-3 text-[12px] text-[#ECECEC] group/item hover:translate-x-1 transition-transform cursor-default">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
                        <span className="font-medium">Rediseño UI/UX Nedimi</span>
                        <span className="text-white/40 text-[9px] border border-white/10 px-2 py-0.5 rounded-full ml-auto">Tech Lead</span>
                    </li>
                    <li className="flex items-center gap-3 text-[12px] text-[#ECECEC] group/item hover:translate-x-1 transition-transform cursor-default">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
                        <span className="font-medium">Dolphin Dive Baja</span>
                        <span className="text-white/40 text-[9px] border border-white/10 px-2 py-0.5 rounded-full ml-auto">Frontend</span>
                    </li>
                    <li className="flex items-center gap-3 text-[12px] text-white/70 group/item hover:translate-x-1 transition-transform cursor-default">
                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.6)]" />
                        <span>eSoft-Pasion-V3 Core</span>
                        <span className="text-white/40 text-[9px] border border-white/10 px-2 py-0.5 rounded-full ml-auto">Dev</span>
                    </li>
                </ul>
            </motion.div>

            <motion.div
                variants={itemVariants}
                className="col-span-2 md:col-span-1 row-span-1 bg-white/[0.02] border border-white/[0.08] rounded-3xl p-5 flex flex-col items-center justify-center text-center group hover:bg-white/[0.04] transition-colors shadow-[inset_0_1px_0_0_rgba(255,255,255,0.02)]"
            >
                <MapPin className="w-6 h-6 text-red-400 mb-2 group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300 drop-shadow-[0_0_10px_rgba(248,113,113,0.3)]" />
                <span className="text-xs font-semibold text-white/90">Edo. de México</span>
                <span className="text-[10px] text-white/40 mt-0.5">México</span>
            </motion.div>

            {/* Caja 5 Restaurada: Instagram */}
            <motion.a
                href="https://instagram.com/rayrdev"
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                className="col-span-2 md:col-span-1 row-span-1 bg-gradient-to-br from-pink-500/10 to-orange-400/10 border border-white/[0.08] rounded-3xl p-5 flex flex-col items-center justify-center group hover:border-pink-500/30 transition-all duration-300 cursor-pointer block text-center shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]"
            >
                <Instagram className="w-6 h-6 text-pink-400 mb-2 group-hover:scale-110 group-hover:-translate-y-1 transition-all mx-auto drop-shadow-[0_0_10px_rgba(244,114,182,0.3)]" />
                <span className="text-[11px] font-semibold text-white/90">@rayrdev</span>
                <span className="text-[10px] text-white/40 mt-0.5 block">Instagram</span>
            </motion.a>

            {/* Caja 6: GitHub */}
            <motion.a
                href="https://github.com/edwinrayr"
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                className="col-span-4 md:col-span-2 row-span-1 bg-white/[0.02] border border-white/[0.08] rounded-3xl p-6 flex items-center justify-between group hover:bg-white/[0.04] transition-colors shadow-[inset_0_1px_0_0_rgba(255,255,255,0.02)] cursor-pointer"
            >
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                        <Github className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-white/90">Explora mi código</h3>
                        <p className="text-[11px] text-white/40 mt-0.5">@edwinrayr en GitHub</p>
                    </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-white/30 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </motion.a>

        </motion.div>
    );
};

export default About;