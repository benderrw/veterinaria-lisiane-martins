"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/SectionWrapper";

const ABOUT_IMAGE = "/images/about-team.webp";

const VALUES = [
  {
    title: "Serenidade",
    description:
      "Ambiente acolhedor para o pet e calma para você acompanhar cada etapa com confiança.",
  },
  {
    title: "Propósito",
    description:
      "Cuidado clínico responsável e orientação honesta — para decisões que fazem sentido na vida real.",
  },
];

const block = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 22 },
  },
};

const textContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export function About() {
  return (
    <SectionWrapper
      id="sobre"
      variant="highlight"
      className="border-y border-border bg-surface"
    >
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-center lg:gap-14">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={block}
          className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border/80 shadow-[var(--shadow-card-rest)] ring-1 ring-black/[0.04] lg:aspect-auto lg:min-h-[min(100%,28rem)] lg:-ml-2 lg:-translate-y-2 xl:-ml-6 xl:min-h-[32rem]"
        >
          <Image
            src={ABOUT_IMAGE}
            alt="Clínica Veterinária Lisiane Martins - ambiente de atendimento"
            fill
            className="object-cover"
            loading="lazy"
            sizes="(max-width: 1024px) 100vw, 44vw"
          />
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={textContainer}
          className="flex flex-col gap-8 pt-2 lg:pt-0 lg:pl-4 xl:pl-10"
        >
          <motion.h2
            variants={block}
            className="text-bloom-h2 font-light text-foreground tracking-tight"
          >
            Sobre nós
          </motion.h2>
          <motion.p
            variants={block}
            className="text-bloom-intro text-muted-foreground leading-relaxed max-w-[65ch]"
          >
            A Clínica Veterinária Lisiane Martins está no bairro Laranjal, em
            Pelotas, com equipe veterinária focada em consultas, vacinação,
            cirurgias e medicina preventiva — sempre com tempo para ouvir você e
            examinar o pet com atenção.
          </motion.p>
          <motion.p
            variants={block}
            className="text-bloom-body text-muted-foreground leading-relaxed max-w-[65ch]"
          >
            Não é só “passar na clínica”: explicamos o que observamos, o que
            pode esperar e próximos passos, para o cuidado acompanhar o dia a dia
            do seu animal — com hora marcada e organização.
          </motion.p>
          <motion.div
            variants={block}
            className="grid gap-8 border-t border-border/80 pt-8 sm:grid-cols-2 sm:gap-10"
          >
            {VALUES.map(({ title, description }) => (
              <div key={title}>
                <h3 className="text-bloom-caption font-medium uppercase tracking-wider text-foreground">
                  {title}
                </h3>
                <p className="text-bloom-body-sm mt-2 text-muted-foreground leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
