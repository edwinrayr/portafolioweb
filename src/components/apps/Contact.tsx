/**
 * @fileoverview Interactive Terminal Contact module - "Neon-Glass" Edition.
 * Features staggered command-line animations, monochromatic tech styling,
 * electric yellow accents, and glassmorphism quick-action buttons.
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Mail, Copy, Linkedin, Terminal as TerminalIcon, Github, MessageCircle } from 'lucide-react';

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.15 },
    },
};

const lineVariants: Variants = {
    hidden: { opacity: 0, x: -10 },
    show: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
};

const Contact = () => {
    const [email] = useState('edraya.reyna@gmail.com');

    const handleCopyEmail = () => {
        navigator.clipboard.writeText(email).then(() => {
            alert('¡Correo copiado al portapapeles!');
        });
    };

    return (
        <div className="h-full w-full bg-black/40 font-mono text-sm overflow-hidden flex flex-col rounded-b-xl">
            {/* Falso Header de Terminal */}
            <div className="flex items-center gap-2 px-4 py-2 bg-white/[0.02] border-b border-white/[0.06] shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
                <TerminalIcon className="w-4 h-4 text-yellow-400 drop-shadow-[0_0_5px_rgba(250,204,21,0.5)]" />
                <span className="text-white/50 text-[11px] tracking-widest uppercase font-bold">Terminal // rayr.OS - root</span>
            </div>

            {/* Cuerpo de la Terminal */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="p-6 flex-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden flex flex-col"
            >
                <motion.div variants={lineVariants} className="mb-2">
                    <span className="text-yellow-400 drop-shadow-[0_0_5px_rgba(250,204,21,0.4)]">admin@rayr.os</span>
                    <span className="text-white/50"> ~ % </span>
                    <span className="text-white/90 tracking-wide">./fetch_contact_info.sh</span>
                </motion.div>

                <motion.div variants={lineVariants} className="mb-5 text-white/40 text-[12px] tracking-widest uppercase">
                    [==================================] 100% Extrayendo datos...
                </motion.div>

                <motion.div variants={lineVariants} className="mb-8 relative group">
                    {/* Efecto de resplandor sutil detrás del JSON */}
                    <div className="absolute -inset-4 bg-yellow-400/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                    <pre className="relative z-10 text-white/70 font-mono text-[13px] leading-relaxed whitespace-pre-wrap pl-2 border-l-2 border-white/10 group-hover:border-yellow-400/50 transition-colors duration-300">
                        {`{
  "name": `}<span className="text-yellow-400">"Edwin Raya"</span>{`,
  "role": `}<span className="text-yellow-400">"Frontend Developer Jr"</span>{`,
  "email": `}<span className="text-yellow-400">"edraya.reyna@gmail.com"</span>{`,
  "phone": `}<span className="text-yellow-400">"+52 5582561666"</span>{`,
  "location": `}<span className="text-yellow-400">"Estado de México, México"</span>{`,
  "socials": {
    "linkedin": `}<span className="text-yellow-400">"in/edraya-reyna"</span>{`,
    "github": `}<span className="text-yellow-400">"github.com/edwinrayr"</span>{`
  }
}`}
                    </pre>
                </motion.div>

                <motion.div variants={lineVariants} className="mb-5">
                    <span className="text-yellow-400 drop-shadow-[0_0_5px_rgba(250,204,21,0.4)]">admin@rayr.os</span>
                    <span className="text-white/50"> ~ % </span>
                    <span className="text-white/80">Selecciona un protocolo de comunicación:</span>
                    <span className="inline-block w-2.5 h-4 bg-yellow-400 ml-1.5 mt-1 animate-pulse align-middle shadow-[0_0_8px_rgba(250,204,21,0.8)]" />
                </motion.div>

                {/* Botones de Acción Rápida - Diseño Neon-Glass */}
                <motion.div variants={lineVariants} className="mt-auto pt-2 grid grid-cols-2 gap-3 font-sans">
                    <button
                        onClick={handleCopyEmail}
                        className="flex items-center justify-center gap-2 py-3 px-3 bg-white/[0.02] border border-white/[0.06] rounded-xl text-white/60 hover:text-yellow-400 hover:bg-yellow-400/10 hover:border-yellow-400/30 hover:shadow-[0_0_15px_rgba(250,204,21,0.2)] transition-all duration-300 group outline-none"
                    >
                        <Copy className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span className="text-[12px] font-semibold tracking-wide uppercase">Copiar Email</span>
                    </button>

                    <a
                        href={`mailto:${email}`}
                        className="flex items-center justify-center gap-2 py-3 px-3 bg-white/[0.02] border border-white/[0.06] rounded-xl text-white/60 hover:text-yellow-400 hover:bg-yellow-400/10 hover:border-yellow-400/30 hover:shadow-[0_0_15px_rgba(250,204,21,0.2)] transition-all duration-300 group outline-none"
                    >
                        <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span className="text-[12px] font-semibold tracking-wide uppercase">Enviar Correo</span>
                    </a>

                    <a
                        href="https://www.linkedin.com/in/edraya-reyna"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 py-3 px-3 bg-white/[0.02] border border-white/[0.06] rounded-xl text-white/60 hover:text-yellow-400 hover:bg-yellow-400/10 hover:border-yellow-400/30 hover:shadow-[0_0_15px_rgba(250,204,21,0.2)] transition-all duration-300 group outline-none"
                    >
                        <Linkedin className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span className="text-[12px] font-semibold tracking-wide uppercase">LinkedIn</span>
                    </a>

                    <a
                        href="https://github.com/edwinrayr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 py-3 px-3 bg-white/[0.02] border border-white/[0.06] rounded-xl text-white/60 hover:text-yellow-400 hover:bg-yellow-400/10 hover:border-yellow-400/30 hover:shadow-[0_0_15px_rgba(250,204,21,0.2)] transition-all duration-300 group outline-none"
                    >
                        <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span className="text-[12px] font-semibold tracking-wide uppercase">GitHub</span>
                    </a>

                    {/* Botón de WhatsApp - Destacado pero respetando el tema */}
                    <a
                        href="https://wa.me/525582561666"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="col-span-2 flex items-center justify-center gap-2 py-3.5 px-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white/80 hover:text-yellow-400 hover:bg-yellow-400/10 hover:border-yellow-400/40 hover:shadow-[0_0_20px_rgba(250,204,21,0.25)] transition-all duration-300 group outline-none"
                    >
                        <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span className="text-[13px] font-bold tracking-widest uppercase">Contactar por WhatsApp</span>
                    </a>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Contact;