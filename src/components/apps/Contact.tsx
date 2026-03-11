/**
 * @fileoverview Interactive Terminal Contact module.
 * Features staggered command-line animations, clipboard integration,
 * and quick-action contact buttons updated with real user data.
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Mail, Copy, Linkedin, Terminal as TerminalIcon, Github, MessageCircle } from 'lucide-react';
import { sileo } from 'sileo';

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
        navigator.clipboard.writeText(email);
        sileo.success('Correo copiado al portapapeles');
    };

    return (
        <div className="h-full w-full bg-black/60 p-1 font-mono text-sm overflow-hidden flex flex-col">
            {/* Falso Header de Terminal */}
            <div className="flex items-center gap-2 px-4 py-2 bg-white/[0.05] border-b border-white/[0.1]">
                <TerminalIcon className="w-4 h-4 text-white/50" />
                <span className="text-white/50 text-xs tracking-wider">bash - edwin@macbook-pro - 80x24</span>
            </div>

            {/* Cuerpo de la Terminal */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="p-5 flex-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden flex flex-col"
            >
                <motion.div variants={lineVariants} className="mb-2">
                    <span className="text-green-400">edwin@macbook-pro</span>
                    <span className="text-white"> ~ % </span>
                    <span className="text-white/90">./fetch_contact_info.sh</span>
                </motion.div>

                <motion.div variants={lineVariants} className="mb-4 text-white/50 text-[13px]">
                    [==================================] 100% Resolviendo dependencias...
                </motion.div>

                <motion.div variants={lineVariants} className="mb-6">
                    <pre className="text-blue-300 font-mono text-[13px] leading-relaxed whitespace-pre-wrap">
                        {`{
  "name": "Edwin Raya",
  "role": "Frontend Developer Jr",
  "email": "edraya.reyna@gmail.com",
  "phone": "+52 5582561666",
  "location": "Estado de México, México",
  "socials": {
    "linkedin": "in/edraya-reyna",
    "github": "github.com/edwinrayr"
  }
}`}
                    </pre>
                </motion.div>

                <motion.div variants={lineVariants} className="mb-4">
                    <span className="text-green-400">edwin@macbook-pro</span>
                    <span className="text-white"> ~ % </span>
                    <span className="text-white/90">Selecciona una acción:</span>
                    <span className="inline-block w-2 h-4 bg-white/80 ml-1 mt-1 animate-pulse align-middle" />
                </motion.div>

                {/* Botones de Acción Rápida */}
                <motion.div variants={lineVariants} className="mt-auto pt-2 grid grid-cols-2 gap-3">
                    <button
                        onClick={handleCopyEmail}
                        className="flex items-center justify-center gap-2 py-2.5 px-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl text-white/80 hover:text-white transition-all group"
                    >
                        <Copy className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span className="text-[13px]">Copiar Email</span>
                    </button>

                    <a
                        href={`mailto:${email}`}
                        className="flex items-center justify-center gap-2 py-2.5 px-3 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 hover:border-blue-500/40 rounded-xl text-blue-400 hover:text-blue-300 transition-all group"
                    >
                        <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span className="text-[13px]">Enviar Correo</span>
                    </a>

                    <a
                        href="https://www.linkedin.com/in/edraya-reyna"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 py-2.5 px-3 bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 border border-[#0A66C2]/20 hover:border-[#0A66C2]/40 rounded-xl text-[#0A66C2] hover:text-blue-400 transition-all group"
                    >
                        <Linkedin className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span className="text-[13px]">LinkedIn</span>
                    </a>

                    <a
                        href="https://github.com/edwinrayr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 py-2.5 px-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl text-white/80 hover:text-white transition-all group"
                    >
                        <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span className="text-[13px]">GitHub</span>
                    </a>

                    {/* Botón de WhatsApp - Ocupa ambas columnas para destacar */}
                    <a
                        href="https://wa.me/525582561666"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="col-span-2 flex items-center justify-center gap-2 py-2.5 px-3 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/20 hover:border-[#25D366]/40 rounded-xl text-[#25D366] hover:text-green-300 transition-all group"
                    >
                        <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span className="text-[13px] font-medium">Contactar por WhatsApp</span>
                    </a>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Contact;