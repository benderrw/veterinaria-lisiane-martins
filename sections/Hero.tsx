"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { WHATSAPP_HREF } from "@/lib/site";

const HERO_IMAGE = "/hero.jpg";

export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative flex min-h-[100vh] flex-col items-center justify-center overflow-hidden bg-muted scroll-mt-[var(--header-height)]"
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

      <motion.div
        className="relative z-10 flex w-full max-w-7xl flex-col items-center gap-8 px-4 py-24 text-center sm:px-6 lg:grid lg:grid-cols-[1fr_minmax(0,560px)] lg:place-items-center lg:px-8 lg:pr-12"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div aria-hidden="true" className="hidden lg:block" />
        <div className="flex w-full max-w-xl flex-col items-center gap-8 text-center lg:items-end lg:text-right">
          <div className="flex flex-col items-center gap-3 lg:items-end">
            <p className="text-bloom-body-sm max-w-md text-white/85 [text-shadow:0_1px_6px_rgba(0,0,0,0.75)] lg:text-right">
              Equipe veterinária em Pelotas · Atendimento com hora marcada
            </p>
          </div>
          <h1
            id="hero-heading"
            className="font-light text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.7),0_0_2px_rgba(0,0,0,0.9)]"
          >
            <span className="font-semibold">Cuidado clínico de verdade</span> para tutores em Pelotas que não abrem mão do bem-estar do pet
          </h1>
          <p className="text-bloom-intro max-w-xl text-white/95 [text-shadow:0_2px_8px_rgba(0,0,0,0.7),0_0_2px_rgba(0,0,0,0.8)]">
            Consultas, vacinação, exames e cirurgias com orientação clara. Acompanhamento contínuo para cães e gatos — do preventivo ao pós-operatório.
          </p>
          <div className="flex w-full max-w-sm justify-center lg:max-w-none lg:justify-end">
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Agende sua consulta (abre em nova aba)"
              className={cn(
                buttonVariants({ variant: "default", size: "cta" }),
                "w-full text-base font-semibold sm:w-auto sm:text-lg focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring focus-visible:ring-offset-2"
              )}
            >
              Agende sua consulta
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
