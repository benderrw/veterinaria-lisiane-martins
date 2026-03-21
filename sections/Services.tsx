'use client';

import {
  Stethoscope,
  Syringe,
  Scissors,
  Heart,
  ShieldCheck,
  PhoneCall,
} from "lucide-react";
import { SectionWrapper } from "@/components/SectionWrapper";
import { motion } from "framer-motion";

const SERVICES = [
  {
    icon: Stethoscope,
    title: "Consultas",
    description:
      "Atendimento clínico completo para cães e gatos, com avaliação individual e orientações para o bem-estar do seu pet.",
  },
  {
    icon: Syringe,
    title: "Vacinação",
    description:
      "Esquema vacinal adequado para cada fase da vida, protegendo contra as principais doenças.",
  },
  {
    icon: Scissors,
    title: "Cirurgias",
    description:
      "Procedimentos cirúrgicos em ambiente seguro, com acompanhamento pré e pós-operatório.",
  },
  {
    icon: Heart,
    title: "Cardiologia",
    description:
      "Avaliação cardíaca e acompanhamento de pacientes com suspeita ou diagnóstico de cardiopatia.",
  },
  {
    icon: ShieldCheck,
    title: "Preventivo",
    description:
      "Check-ups e programas de medicina preventiva para manter seu animal saudável.",
  },
  {
    icon: PhoneCall,
    title: "Atendimento humanizado",
    description:
      "Acolhimento e comunicação clara com os tutores em todas as etapas do atendimento.",
  },
];

export function Services() {
  return (
    <SectionWrapper id="servicos" variant="normal">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col gap-8"
      >
        <h2 className="text-bloom-h2 font-light text-foreground">
          Nossos serviços
        </h2>
        <div className="mt-4 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className="flex flex-row items-start gap-4 rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-6" aria-hidden />
              </div>
              <div className="flex min-w-0 flex-col gap-2">
                <h3 className="text-bloom-h5 font-semibold text-foreground">
                  {title}
                </h3>
                <p className="text-bloom-body-sm text-muted-foreground leading-relaxed">
                  {description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
