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
import Image from "next/image";
import { SectionWrapper } from "@/components/SectionWrapper";
import { cn } from "@/lib/utils";

type Service = {
  icon: typeof Stethoscope;
  title: string;
  description: string;
  detail?: string;
  featuredImage?: {
    src: string;
    alt: string;
  };
};

const SERVICES: Service[] = [
  {
    icon: Stethoscope,
    title: "Consultas",
    description:
      "Atendimento clínico completo para cães e gatos, com avaliação individual e orientações para o bem-estar do seu pet.",
    detail:
      "Também oferecemos teleorientação com hora marcada: esclarecimento de dúvidas, retornos e continuidade do cuidado com explicação acessível. Quando o caso exigir exame físico ou procedimento, o atendimento segue presencialmente na clínica.",
    featuredImage: {
      src: "https://picsum.photos/seed/lm-consultas/880/560",
      alt:
        "Ambiente de consulta veterinária, atendimento clínico para cães e gatos.",
    },
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
        <div className="flex max-w-2xl flex-col gap-3 lg:max-w-none">
          <p className="text-bloom-body-sm font-medium uppercase tracking-wider text-muted-foreground">
            Pelotas · Cães e gatos
          </p>
          <h2 className="text-bloom-h2 font-light text-foreground tracking-tight">
            Nossos serviços
          </h2>
          <p className="text-bloom-body text-muted-foreground leading-relaxed max-w-[65ch]">
            Atendimento organizado por hora marcada, com foco em explicação clara
            e continuidade do cuidado.
          </p>
        </div>
        <motion.div
          variants={listVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-10 md:gap-y-10"
        >
          {SERVICES.map(
            ({ icon: Icon, title, description, detail, featuredImage }, index) => {
              const articleShell = cn(
                "group rounded-2xl border border-border/90 bg-card text-card-foreground shadow-[var(--shadow-card-rest)] transition-[box-shadow,border-color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-primary/25 hover:shadow-[var(--shadow-card-hover)] active:translate-y-px",
                index % 2 === 1 && "md:translate-y-8"
              );

              if (featuredImage) {
                return (
                  <motion.article
                    key={title}
                    variants={cardVariants}
                    className={cn(articleShell, "md:col-span-2 p-6 md:p-8")}
                  >
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,min(480px,52%))_minmax(280px,1fr)] lg:items-center lg:gap-14">
                      <div className="flex min-w-0 flex-col gap-4">
                        <div className="flex items-start gap-5">
                          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary/15">
                            <Icon className="size-6" weight="duotone" aria-hidden />
                          </div>
                          <div className="flex min-w-0 max-w-[55ch] flex-col gap-3">
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
                        </div>
                      </div>
                      <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl border border-border/50 bg-muted/20 shadow-[0_20px_40px_-15px_rgba(15,23,42,0.06)]">
                        <Image
                          src={featuredImage.src}
                          alt={featuredImage.alt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1023px) 100vw, 50vw"
                        />
                      </div>
                    </div>
                  </motion.article>
                );
              }

              return (
                <motion.article
                  key={title}
                  variants={cardVariants}
                  className={cn(
                    articleShell,
                    "flex flex-row items-start gap-5 p-6"
                  )}
                >
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary/15">
                    <Icon className="size-6" weight="duotone" aria-hidden />
                  </div>
                  <div className="flex min-w-0 flex-col gap-2">
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
              );
            }
          )}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
