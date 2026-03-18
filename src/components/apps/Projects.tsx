/**
 * @fileoverview Projects showcase application module - "Neon-Glass" Edition.
 * Implements a cinematic card grid layout with high-fidelity glassmorphism,
 * grayscale-to-color hover reveals, and electric yellow tech accents.
 */

import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ExternalLink, Layers, LayoutTemplate, MonitorSmartphone, FolderCode } from 'lucide-react';

// Simplificamos la interfaz: eliminamos 'statusColor' ya que unificaremos todo al amarillo eléctrico
interface ProjectData {
    id: string;
    title: string;
    role: string;
    description: string;
    image: string;
    url: string;
    icon: React.ElementType;
    techStack: string[];
}

const projectsData: ProjectData[] = [
    {
        id: 'esoft',
        title: 'eSoft Pasion',
        role: 'Frontend Developer',
        description: 'Desarrollo core y mantenimiento de la plataforma web principal. Enfoque en arquitectura escalable, rendimiento y renderizado de interfaces modernas.',
        image: '/img/eSoftWeb.webp',
        url: 'https://www.esoftpasion.com/',
        icon: MonitorSmartphone,
        techStack: ['React', 'TypeScript', 'Tailwind v4', 'Vite'],
    },
    {
        id: 'nedimi',
        title: 'Nedimi',
        role: 'Tech Lead | UI/UX',
        description: 'Liderazgo técnico y rediseño completo de la experiencia de usuario (UX) e interfaz visual (UI), elevando los estándares de interacción de la plataforma.',
        image: '/img/NedimiWeb.webp',
        url: 'https://nedimi.com/',
        icon: LayoutTemplate,
        techStack: ['Figma', 'React', 'Frontend Architecture'],
    },
    {
        id: 'dolphin',
        title: 'Dolphin Dive Baja',
        role: 'Frontend Developer',
        description: 'Desarrollo frontend especializado para la plataforma de buceo. Creación de una experiencia inmersiva, optimizada para reservas y exploración visual.',
        image: '/img/DolphinWeb.webp',
        url: 'https://v2dolphin.nedimi.com/',
        icon: Layers,
        techStack: ['React', 'UI Design', 'Responsive Web'],
    },
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.15 },
    },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: 'spring', stiffness: 250, damping: 25 }
    },
};

const Projects = () => {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="p-6 h-full w-full overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
            <div className="mb-8 pl-2">
                <div className="flex items-center gap-3 mb-2">
                    <FolderCode className="w-6 h-6 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" />
                    <h2 className="text-2xl font-extrabold text-white tracking-tight">Archivo de Proyectos</h2>
                </div>
                <p className="text-[13px] text-white/50 font-light max-w-xl leading-relaxed">
                    Explora arquitecturas frontend e interfaces de usuario en producción. Selecciona cualquier proyecto para inicializar su entorno en vivo.
                </p>
            </div>

            {/* Grid responsivo */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">
                {projectsData.map((project) => {
                    const IconComponent = project.icon;

                    return (
                        <motion.div
                            key={project.id}
                            variants={cardVariants}
                            className="group relative flex flex-col bg-white/[0.015] border border-white/[0.06] rounded-[2rem] overflow-hidden shadow-[inset_0_1px_0_0_rgba(255,255,255,0.02)] transition-all duration-500 hover:bg-white/[0.03] hover:border-yellow-400/30"
                        >
                            {/* Brillo de fondo al hacer hover */}
                            <div className="absolute inset-0 bg-yellow-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            {/* Contenedor de la Imagen (Cinematic View) */}
                            <div className="relative h-56 w-full overflow-hidden border-b border-white/[0.05] bg-black">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 pointer-events-none" />
                                <img
                                    src={project.image}
                                    alt={`Captura de ${project.title}`}
                                    // Efecto de revelado de color y zoom al hacer hover
                                    className="w-full h-full object-cover object-top transition-all duration-700 ease-out grayscale opacity-70 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105 group-hover:rotate-[1deg]"
                                    loading="lazy"
                                />

                                {/* Badge flotante de Rol - Estilo Neon */}
                                <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/[0.08] shadow-xl group-hover:border-yellow-400/30 transition-colors duration-300">
                                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.8)] animate-pulse" />
                                    <span className="text-[10px] font-bold tracking-wider text-yellow-400 uppercase drop-shadow-[0_0_5px_rgba(250,204,21,0.3)]">
                                        {project.role}
                                    </span>
                                </div>
                            </div>

                            {/* Contenedor de Información */}
                            <div className="p-6 flex flex-col flex-grow relative z-20">
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <h3 className="text-xl font-bold text-white tracking-tight mb-1 flex items-center gap-2 group-hover:text-yellow-400 transition-colors duration-300">
                                            <IconComponent className="w-5 h-5 text-white/40 group-hover:text-yellow-400 transition-colors duration-300" />
                                            {project.title}
                                        </h3>
                                    </div>
                                    {/* Botón de Enlace Externo interactivo */}
                                    <a
                                        href={project.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white/50 hover:text-yellow-400 hover:bg-yellow-400/10 hover:border-yellow-400/30 transition-all duration-300 group/btn outline-none shadow-sm"
                                        aria-label={`Visitar ${project.title}`}
                                    >
                                        <ExternalLink className="w-4 h-4 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 transition-transform" />
                                    </a>
                                </div>

                                <p className="text-[13px] text-white/50 leading-relaxed font-light mb-6 flex-grow group-hover:text-white/70 transition-colors duration-300">
                                    {project.description}
                                </p>

                                {/* Tags de Tecnologías Neon */}
                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {project.techStack.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-2.5 py-1 bg-white/[0.02] border border-white/[0.06] rounded-lg text-[10px] font-medium text-white/50 cursor-default transition-all duration-300 group-hover:border-white/[0.1] hover:!text-yellow-400 hover:!bg-yellow-400/10 hover:!border-yellow-400/30 hover:shadow-[0_0_10px_rgba(250,204,21,0.2)]"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
};

export default Projects;