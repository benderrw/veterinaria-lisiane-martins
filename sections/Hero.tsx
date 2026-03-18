'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
          <h1
            id="hero-heading"
            className="text-4xl font-light leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl [font-family:var(--font-heading),sans-serif] [text-shadow:0_2px_10px_rgba(0,0,0,0.7),0_0_2px_rgba(0,0,0,0.9)]"
          >
            <span className="font-semibold">Clínica Veterinária</span> em Pelotas com cuidado completo para seu pet
          </h1>
          <p className="text-lg text-white/95 [text-shadow:0_2px_8px_rgba(0,0,0,0.7),0_0_2px_rgba(0,0,0,0.8)]">
            Consultas, vacinação, exames e cirurgias com atendimento humanizado. Acompanhamento contínuo para cães e gatos em Pelotas.
          </p>
          <div className="flex w-full max-w-sm flex-col gap-3 sm:flex-row sm:max-w-none sm:gap-4 lg:justify-end">
            <a
              href={process.env.NEXT_PUBLIC_WHATSAPP_URL ?? "https://wa.me/5553981166455"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Agende sua consulta (abre em nova aba)"
              className={cn(
                buttonVariants({ variant: "default", size: "cta" }),
                "w-full text-base font-semibold shadow-md sm:w-auto sm:text-lg focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring focus-visible:ring-offset-2"
              )}
            >
              Agende sua consulta
            </a>
            <a
              href="#contato"
              className={cn(
                buttonVariants({ variant: "secondary", size: "cta" }),
                "w-full text-base font-semibold shadow-md sm:w-auto sm:text-lg"
              )}
            >
              Ver informações de contato
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
