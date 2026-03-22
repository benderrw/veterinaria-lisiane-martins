"use client";

import { Check } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/SectionWrapper";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { WHATSAPP_HREF } from "@/lib/site";

const BENEFITS = [
  "Hora marcada: menos espera e mais tempo de consulta para o seu pet.",
  "Equipe veterinária no Laranjal, Pelotas: consultas, vacinação, exames e cirurgias.",
  "Você entende o plano de cuidado — do preventivo ao pós-operatório.",
] as const;

const listParent = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.08 },
  },
};

const listItem = {
  hidden: { opacity: 0, x: -10 },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: "spring" as const, stiffness: 140, damping: 26 },
  },
};

export function FinalCta() {
  return (
    <SectionWrapper
      id="cta-final"
      variant="normal"
      className="border-t border-border bg-muted/30"
      aria-labelledby="cta-final-heading"
    >
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ type: "spring", stiffness: 90, damping: 22 }}
        className="grid w-full gap-10 rounded-3xl border border-border/80 bg-card/90 px-6 py-10 shadow-[var(--shadow-card-rest)] ring-1 ring-black/[0.04] backdrop-blur-sm sm:px-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-14 lg:px-12 lg:py-14"
      >
        <div className="flex flex-col gap-5 text-left">
          <h2
            id="cta-final-heading"
            className="text-bloom-h2-soft font-light text-foreground tracking-tight"
          >
            Saúde do pet em dia,{" "}
            <span className="font-semibold">sem deixar o cuidado para depois</span>
          </h2>
          <p className="text-bloom-intro text-muted-foreground leading-relaxed max-w-[65ch]">
            Chame no WhatsApp para agendar, tirar dúvidas sobre horários, preparo da
            visita ou encaixe — respondemos com o que fizer sentido para o seu caso.
          </p>
        </div>
        <div className="flex flex-col gap-8 lg:pl-4">
          <motion.ul
            variants={listParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-20px" }}
            className="text-bloom-body space-y-3 text-left text-muted-foreground"
          >
            {BENEFITS.map((line) => (
              <motion.li key={line} variants={listItem} className="flex gap-3">
                <Check
                  className="mt-0.5 size-5 shrink-0 text-primary"
                  weight="duotone"
                  aria-hidden
                />
                <span className="leading-relaxed">{line}</span>
              </motion.li>
            ))}
          </motion.ul>
          <motion.a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Agendar consulta pelo WhatsApp (abre em nova aba)"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
            className={cn(
              buttonVariants({ variant: "default", size: "cta" }),
              "w-full text-center text-base font-semibold sm:w-auto sm:text-lg focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring focus-visible:ring-offset-2 active:translate-y-px lg:self-start"
            )}
          >
            Agendar pelo WhatsApp
          </motion.a>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
