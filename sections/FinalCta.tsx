"use client";

import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/SectionWrapper";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { WHATSAPP_HREF } from "@/lib/site";

const BENEFITS = [
  "Hora marcada: mais atenção para você e para o pet, sem fila interminável.",
  "Consultas, vacinação, exames e cirurgias com equipe dedicada em Pelotas.",
  "Orientação clara em cada etapa — do preventivo ao pós-operatório.",
] as const;

export function FinalCta() {
  return (
    <SectionWrapper
      id="cta-final"
      variant="normal"
      className="border-t border-border bg-muted/40"
      aria-labelledby="cta-final-heading"
    >
      <motion.div
        className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <div className="flex flex-col gap-4">
          <h2
            id="cta-final-heading"
            className="text-bloom-h2-soft font-light text-foreground"
          >
            Saúde do pet em dia,{" "}
            <span className="font-semibold">sem deixar o cuidado para depois</span>
          </h2>
          <p className="text-bloom-intro text-muted-foreground">
            Agende pelo WhatsApp e tire dúvidas sobre horários, preparo da consulta ou
            encaminhamento do seu caso.
          </p>
        </div>
        <ul className="text-bloom-body w-full max-w-xl space-y-3 text-left text-muted-foreground">
          {BENEFITS.map((line) => (
            <li key={line} className="flex gap-3">
              <Check
                className="mt-0.5 size-5 shrink-0 text-primary"
                aria-hidden
              />
              <span>{line}</span>
            </li>
          ))}
        </ul>
        <a
          href={WHATSAPP_HREF}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Agendar consulta pelo WhatsApp (abre em nova aba)"
          className={cn(
            buttonVariants({ variant: "default", size: "cta" }),
            "text-base font-semibold sm:text-lg focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring focus-visible:ring-offset-2"
          )}
        >
          Agendar pelo WhatsApp
        </a>
      </motion.div>
    </SectionWrapper>
  );
}
