/**
 * @fileoverview Projects showcase application module.
 * Implements a cinematic card grid layout with high-fidelity glassmorphism,
 * hover-driven image scaling, and dynamic external routing.
 */

import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ExternalLink, Layers, LayoutTemplate, MonitorSmartphone } from 'lucide-react';

// Definición estricta de la estructura de datos para los proyectos
interface ProjectData {
    id: string;
    title: string;
    role: string;
    description: string;
    image: string;
    url: string;
    icon: React.ElementType;
    techStack: string[];
    statusColor: string;
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
        statusColor: 'bg-blue-400',
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
        statusColor: 'bg-green-400',
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
        statusColor: 'bg-yellow-400',
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
            <div className="mb-8">
                <h2 className="text-2xl font-extrabold text-white tracking-tight mb-2">Proyectos Destacados</h2>
                <p className="text-sm text-white/50 font-light max-w-xl">
                    Explora arquitecturas frontend e interfaces de usuario en producción. Selecciona cualquier proyecto para visitar su despliegue en vivo.
                </p>
            </div>

            {/* Grid responsivo: 1 columna en móvil, 2 en pantallas grandes */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">
                {projectsData.map((project) => {
                    const IconComponent = project.icon;

                    return (
                        <motion.div
                            key={project.id}
                            variants={cardVariants}
                            className="group relative flex flex-col bg-white/[0.02] border border-white/[0.08] rounded-3xl overflow-hidden shadow-[inset_0_1px_0_0_rgba(255,255,255,0.02)] transition-colors hover:bg-white/[0.04]"
                        >
                            {/* Contenedor de la Imagen (Cinematic View) */}
                            <div className="relative h-56 w-full overflow-hidden border-b border-white/[0.05] bg-black/50">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 pointer-events-none" />
                                <img
                                    src={project.image}
                                    alt={`Captura de ${project.title}`}
                                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 group-hover:rotate-[1deg]"
                                    loading="lazy"
                                />

                                {/* Badge flotante de Rol */}
                                <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 shadow-xl">
                                    <div className={`w-1.5 h-1.5 rounded-full ${project.statusColor} shadow-[0_0_8px_currentColor]`} />
                                    <span className="text-[10px] font-bold tracking-wider text-white uppercase">
                                        {project.role}
                                    </span>
                                </div>
                            </div>

                            {/* Contenedor de Información */}
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <h3 className="text-xl font-bold text-white tracking-tight mb-1 flex items-center gap-2">
                                            <IconComponent className="w-5 h-5 text-white/50" />
                                            {project.title}
                                        </h3>
                                    </div>
                                    {/* Botón de Enlace Externo */}
                                    <a
                                        href={project.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all group/btn"
                                        aria-label={`Visitar ${project.title}`}
                                    >
                                        <ExternalLink className="w-4 h-4 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 transition-transform" />
                                    </a>
                                </div>

                                <p className="text-[13px] text-white/60 leading-relaxed font-light mb-5 flex-grow">
                                    {project.description}
                                </p>

                                {/* Tags de Tecnologías */}
                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {project.techStack.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-2.5 py-1 bg-white/[0.03] border border-white/[0.08] rounded-lg text-[10px] font-medium text-white/70 cursor-default"
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