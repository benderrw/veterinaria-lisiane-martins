"use client";

import Image from "next/image";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { SectionWrapper } from "@/components/SectionWrapper";
import { FAQ_ITEMS } from "@/lib/faq-data";

/** Troca o ficheiro em `public/` quando tiveres o design final. */
const FAQ_BG_IMAGE = "/images/confused-dog.png";

/**
 * Colunas do acordeão em `lg` (resto da grelha 12 = zona da imagem).
 * Manter igual a `lg:col-span-*` no JSX (Tailwind não aceita classe dinâmica).
 */
const FAQ_ACCORDION_COLS = 6;

const FAQ_GRID_COLS = 12;

/** Igual a `gap-10` na grelha — o fundo começa após o gap que segue a última coluna do acordeão. */
const FAQ_GRID_GAP_REM = 2.5;

/**
 * Início da primeira coluna *depois* do acordeão (após `FAQ_ACCORDION_COLS` colunas + gaps).
 * innerLeft + k×track + k×gap, com k = FAQ_ACCORDION_COLS.
 */
const faqBleedLeftFromSection = `calc(2rem + (100% - 4rem - min(80rem, calc(100% - 4rem))) / 2 + ${FAQ_ACCORDION_COLS} * (min(80rem, calc(100% - 4rem)) - 11 * ${FAQ_GRID_GAP_REM}rem) / ${FAQ_GRID_COLS} + ${FAQ_ACCORDION_COLS} * ${FAQ_GRID_GAP_REM}rem)`;

const faqDesktopBleed = (
  <div
    className="pointer-events-none absolute inset-y-0 right-0 z-0 hidden lg:block"
    style={{ left: faqBleedLeftFromSection }}
    aria-hidden
  >
    <Image
      src={FAQ_BG_IMAGE}
      alt=""
      fill
      className="object-cover"
      sizes="55vw"
    />
  </div>
);

export function FaqSection() {
  return (
    <SectionWrapper
      id="faq"
      variant="faq"
      as="section"
      className="border-t border-border bg-surface overflow-x-clip"
      aria-labelledby="faq-heading"
      bleedBackground={faqDesktopBleed}
    >
      <div className="flex flex-col gap-10">
        <h2
          id="faq-heading"
          className="text-bloom-h2 font-light text-foreground tracking-tight"
        >
          Perguntas frequentes
        </h2>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-stretch">
          <div className="rounded-2xl border border-border/80 bg-elevated/80 p-6 shadow-[var(--shadow-faq-panel)] ring-1 ring-black/[0.04] dark:bg-elevated/50 lg:col-span-6">
            <Accordion
              defaultValue={FAQ_ITEMS[0]?.id ? [FAQ_ITEMS[0].id] : []}
              className="w-full"
            >
              {FAQ_ITEMS.map((item) => (
                <AccordionItem key={item.id} value={item.id}>
                  <AccordionTrigger className="py-4 text-left font-medium">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-bloom-body text-muted-foreground leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
