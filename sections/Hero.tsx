"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { WHATSAPP_HREF } from "@/lib/site";
import { HeroMagneticCta } from "@/components/HeroMagneticCta";

const HERO_IMAGE = "/hero.jpg";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.12,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 120, damping: 22 },
  },
};

export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative min-h-[calc(100dvh-var(--header-height))] overflow-hidden bg-background scroll-mt-[var(--header-height)]"
    >
      <div className="absolute inset-0">
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>

      {/* Mobile: scrim na base — copy sobre a foto full-bleed (sem faixa “página” à parte) */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/84 from-[12%] via-black/45 via-[55%] to-transparent md:hidden"
        aria-hidden
      />
      {/* md+: gradiente para a direita — imagem respira à esquerda, copy legível à direita */}
      <div
        className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-transparent from-[8%] via-background/55 via-[42%] to-background to-[96%] md:block"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex min-h-[calc(100dvh-var(--header-height))] w-full max-w-[1400px] flex-col justify-end px-4 pb-20 pt-3 sm:px-6 md:items-end md:justify-center md:pb-24 md:pt-6 md:pl-10 md:pr-12 lg:pr-16 xl:pr-20">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="ml-auto flex w-full max-w-md flex-col items-end gap-5 text-right md:max-w-sm md:gap-6 lg:max-w-md"
        >
          <motion.p
            variants={item}
            className="text-bloom-body-sm max-w-full font-medium tracking-wide text-bloom-on-dark-low md:text-bloom-emphasis-low"
          >
            Equipe veterinária em Pelotas · Atendimento com hora marcada
          </motion.p>
          <motion.h1 variants={item} id="hero-heading" className="hero-display">
            <span className="font-semibold text-bloom-on-dark-high md:text-bloom-emphasis-high">
              Cuidado clínico de verdade
            </span>{" "}
            <span className="text-bloom-on-dark-mid md:text-bloom-emphasis-mid">
              para tutores em Pelotas que não abrem mão do bem-estar do pet
            </span>
          </motion.h1>
          <motion.p
            variants={item}
            className="hero-intro max-w-full text-bloom-on-dark-mid md:text-bloom-emphasis-mid"
          >
            Consultas, vacinação, exames e cirurgias com orientação clara.
            Acompanhamento contínuo para cães e gatos — do preventivo ao
            pós-operatório.
          </motion.p>
          <motion.div variants={item} className="flex w-full justify-end pt-1">
            <HeroMagneticCta
              href={WHATSAPP_HREF}
              aria-label="Agende sua consulta (abre em nova aba)"
              className="w-full sm:w-auto"
            >
              Agende sua consulta
            </HeroMagneticCta>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
