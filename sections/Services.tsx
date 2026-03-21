"use client";

import {
  Stethoscope,
  Syringe,
  Scissors,
  Heart,
  ShieldCheck,
  PhoneCall,
} from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/SectionWrapper";
import { cn } from "@/lib/utils";

type Service = {
  icon: typeof Stethoscope;
  title: string;
  description: string;
  detail?: string;
};

const SERVICES: Service[] = [
  {
    icon: Stethoscope,
    title: "Consultas",
    description:
      "Atendimento clínico completo para cães e gatos, com avaliação individual e orientações para o bem-estar do seu pet.",
    detail:
      "Também oferecemos teleorientação com hora marcada: esclarecimento de dúvidas, retornos e continuidade do cuidado com explicação acessível. Quando o caso exigir exame físico ou procedimento, o atendimento segue presencialmente na clínica.",
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

const listVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.06 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 140, damping: 24 },
  },
};

export function Services() {
  return (
    <SectionWrapper id="servicos" variant="normal">
      <div className="flex flex-col gap-12 lg:gap-16">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-end">
          <div className="flex max-w-2xl flex-col gap-3 lg:max-w-none">
            <h2 className="text-bloom-h2 font-light text-foreground tracking-tight">
              Nossos serviços
            </h2>
            <p className="text-bloom-body text-muted-foreground leading-relaxed max-w-[65ch]">
              Atendimento organizado por hora marcada, com foco em explicação clara
              e continuidade do cuidado.
            </p>
          </div>
          <p
            className="hidden text-bloom-body-sm font-medium uppercase tracking-wider text-muted-foreground lg:block lg:justify-self-end lg:text-right lg:max-w-xs"
            aria-hidden
          >
            Pelotas · Cães e gatos
          </p>
        </div>
        <motion.div
          variants={listVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-10 md:gap-y-10"
        >
          {SERVICES.map(({ icon: Icon, title, description, detail }, index) => (
            <motion.article
              key={title}
              variants={cardVariants}
              className={cn(
                "group flex flex-row items-start gap-5 rounded-2xl border border-border/90 bg-card p-6 text-card-foreground shadow-[var(--shadow-card-rest)] transition-[box-shadow,border-color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-primary/25 hover:shadow-[var(--shadow-card-hover)] active:translate-y-px",
                index % 2 === 1 && "md:translate-y-8",
                index === 0 && "md:col-span-2 md:grid md:grid-cols-[auto_1fr] md:items-start md:gap-8 md:p-8"
              )}
            >
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary/15">
                <Icon className="size-6" weight="duotone" aria-hidden />
              </div>
              <div
                className={cn(
                  "flex min-w-0 flex-col gap-2",
                  index === 0 && "gap-3 md:max-w-[65ch] lg:max-w-[70ch]"
                )}
              >
                <h3 className="text-bloom-h5 font-semibold text-foreground tracking-tight">
                  {title}
                </h3>
                <p className="text-bloom-body-sm text-muted-foreground leading-relaxed">
                  {description}
                </p>
                {detail ? (
                  <p className="text-bloom-body-sm text-muted-foreground leading-relaxed">
                    {detail}
                  </p>
                ) : null}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
