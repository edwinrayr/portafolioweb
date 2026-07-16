/**
 * @fileoverview About Me application module - "Neon-Glass" Edition.
 * Features a perfectly balanced Bento Box grid (4x4 layout).
 * Updated for a full Software Engineering profile with extensive project arrays.
 */

import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { MapPin, Cpu, Briefcase, Instagram, Github, ArrowUpRight, TerminalSquare, FolderGit2, TestTube2 } from 'lucide-react';

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
    // --- DATOS DEL PERFIL ---
    const skills = [
        { 
            category: "Lenguajes Core", 
            items: ["C", "C++", "C#", "Java", "Ensamblador", "Python", "SQL"] 
        },
        { 
            category: "Desarrollo Web", 
            items: ["React", "Angular", "Astro", "TypeScript", "JavaScript", "Vite", "Tailwind", "Bootstrap", "Node.js"] 
        },
        { 
            category: "Herramientas & Entorno", 
            items: ["Git", "GitHub", "Antigravity", "Figma", "Docker", "Linux"] 
        }
    ];

    const productionProjects = [
        "eSoft Pasion", "Nedimi", "NedimiPOS", "Dolphin Dive Baja", 
        "Pinturas el Mezquital", "C&E Page", "Gourmetrica", 
        "Project Room Bern", "SPIAMV", "ViveToxicFree", "The Money Bridge"
    ];

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="p-5 h-full w-full grid grid-cols-4 auto-rows-[160px] gap-4 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
            {/* 1. Caja: Perfil Principal (Dossier) - [2x2] */}
            <motion.div
                variants={itemVariants}
                className="col-span-4 md:col-span-2 row-span-2 bg-white/[0.015] border border-white/[0.06] rounded-[2rem] p-6 relative overflow-hidden group shadow-[inset_0_1px_0_0_rgba(255,255,255,0.02)] flex flex-col justify-between hover:bg-white/[0.03] transition-colors duration-500"
            >
                <div className="absolute -top-20 -right-20 w-72 h-72 bg-yellow-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)] pointer-events-none opacity-20" />

                <div className="relative z-10 flex flex-col h-full justify-between">
                    <div className="flex items-start justify-between mb-2">
                        <div className="relative">
                            <div className="absolute inset-0 bg-yellow-400/20 blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <img
                                src="/img/EdwinRaya.webp"
                                alt="Edwin Raya"
                                className="relative w-20 h-20 rounded-2xl object-cover border border-white/10 shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:border-yellow-400/30 grayscale group-hover:grayscale-0"
                            />
                        </div>

                        <div className="flex flex-col items-end gap-2">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-[10px] font-bold tracking-wider uppercase shadow-[0_0_15px_rgba(250,204,21,0.1)]">
                                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 shadow-[0_0_5px_rgba(250,204,21,0.8)] animate-pulse" />
                                Disponible
                            </div>
                            {/* Nuevo Badge de Especialidad */}
                            <div className="inline-flex px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 text-[9px] font-bold tracking-wider uppercase">
                                Frontend Specialist
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center gap-2 mb-1 mt-2">
                            <TerminalSquare className="w-4 h-4 text-white/30" />
                            <h1 className="text-[30px] leading-tight font-extrabold text-white tracking-tight">
                                Edwin Raya
                            </h1>
                        </div>
                        <h2 className="text-[13px] font-semibold text-white/80 mb-3 flex items-center gap-2">
                            <Briefcase className="w-4 h-4 text-yellow-400 drop-shadow-[0_0_5px_rgba(250,204,21,0.5)]" />
                            Ingeniero en Computación <span className="text-white/20">|</span> Software Engineer
                        </h2>
                        <p className="text-[12px] text-white/50 leading-relaxed font-light pr-2 group-hover:text-white/70 transition-colors text-justify">
                            Desarrollador con visión holística de la tecnología. Especializado en crear interfaces web inmersivas, respaldado por sólidos conocimientos en arquitectura de software, redes, ciberseguridad e Inteligencia Artificial para construir sistemas completos, seguros y escalables.
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* 2. Caja: Ecosistema Técnico (Skills) - [2x2] */}
            <motion.div
                variants={itemVariants}
                className="col-span-4 md:col-span-2 row-span-2 bg-white/[0.015] border border-white/[0.06] rounded-[2rem] p-6 flex flex-col shadow-[inset_0_1px_0_0_rgba(255,255,255,0.02)] group hover:border-white/10 transition-colors"
            >
                <div className="flex items-center gap-2 text-white/70 group-hover:text-white/90 transition-colors mb-4">
                    <Cpu className="w-4 h-4 text-yellow-400" />
                    <h3 className="text-[13px] font-bold tracking-wide uppercase">Core Skills</h3>
                </div>
                
                <div className="flex flex-col gap-4 h-full overflow-y-auto pr-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {skills.map((skillGroup, idx) => (
                        <div key={idx}>
                            <span className="text-[10px] uppercase tracking-widest text-white/40 mb-2 block font-semibold">
                                {skillGroup.category}
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                                {skillGroup.items.map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-2.5 py-1 bg-white/[0.03] border border-white/[0.05] rounded-lg text-[10px] font-medium text-white/60 hover:text-yellow-400 hover:bg-yellow-400/10 hover:border-yellow-400/30 transition-all duration-300 cursor-default"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* 3. Caja: Proyectos y Liderazgo - [2x2] */}
            <motion.div
                variants={itemVariants}
                className="col-span-4 md:col-span-2 row-span-2 bg-white/[0.015] border border-white/[0.06] rounded-[2rem] p-5 relative overflow-hidden shadow-[inset_0_1px_0_0_rgba(255,255,255,0.02)] group flex flex-col hover:bg-white/[0.03] transition-colors"
            >
                <div className="absolute -left-4 -bottom-4 w-32 h-32 bg-yellow-500/5 blur-3xl rounded-full group-hover:bg-yellow-500/10 transition-colors duration-500 pointer-events-none" />
                
                <div className="flex items-center justify-between mb-4 relative z-10">
                    <h3 className="text-[12px] font-bold uppercase tracking-widest text-white/60 flex items-center gap-2">
                        <FolderGit2 className="w-4 h-4 text-yellow-400" />
                        Proyectos Liderados
                    </h3>
                </div>

                {/* Contenedor scrolleable con máscara de difuminado al final */}
                <div className="relative h-full overflow-hidden">
                    <div className="h-full overflow-y-auto pb-8 pr-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden space-y-2 relative z-10">
                        {/* Categoría: En Producción */}
                        {productionProjects.map((project, idx) => (
                            <div key={idx} className="flex items-center gap-3 text-[12px] text-white/70 group/item hover:translate-x-1 transition-transform cursor-default">
                                <div className="w-1.5 h-1.5 rounded-full bg-yellow-400/50 group-hover/item:bg-yellow-400 group-hover/item:shadow-[0_0_8px_rgba(250,204,21,0.8)] transition-all" />
                                <span className="font-medium group-hover/item:text-white transition-colors">{project}</span>
                                <span className="text-white/30 text-[9px] border border-white/5 px-2 py-0.5 rounded-full ml-auto group-hover/item:border-yellow-400/20 group-hover/item:text-yellow-400/70 transition-colors">
                                    Tech Lead
                                </span>
                            </div>
                        ))}

                        {/* Separador */}
                        <div className="h-px w-full bg-white/5 my-3" />

                        {/* Categoría: I+D */}
                        <div className="flex items-center gap-3 text-[12px] text-white/50 group/item hover:translate-x-1 transition-transform cursor-default">
                            <TestTube2 className="w-3.5 h-3.5 text-blue-400" />
                            <span className="font-medium group-hover/item:text-white transition-colors">Miguel Servin</span>
                            <span className="text-blue-400/50 text-[9px] border border-blue-400/20 bg-blue-400/5 px-2 py-0.5 rounded-full ml-auto">I+D</span>
                        </div>
                    </div>
                    {/* Gradiente inferior para indicar que hay más scroll */}
                    <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#030303] to-transparent z-20 pointer-events-none" />
                </div>
            </motion.div>

            {/* 4. Caja: Ubicación - [1x1] */}
            <motion.div
                variants={itemVariants}
                className="col-span-2 md:col-span-1 row-span-1 bg-white/[0.015] border border-white/[0.06] rounded-[2rem] p-5 flex flex-col items-center justify-center text-center group hover:bg-white/[0.03] hover:border-yellow-400/30 transition-all shadow-[inset_0_1px_0_0_rgba(255,255,255,0.02)] cursor-default"
            >
                <MapPin className="w-6 h-6 text-white/40 mb-2 group-hover:text-yellow-400 group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300 group-hover:drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]" />
                <span className="text-xs font-semibold text-white/70 group-hover:text-white transition-colors">Edo. de México</span>
                <span className="text-[10px] text-white/40 mt-0.5">México</span>
            </motion.div>

            {/* 5. Caja: Instagram - [1x1] */}
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

            {/* 6. Caja: GitHub - [2x1] */}
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