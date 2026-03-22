"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { FaqIllustration } from "./FaqIllustration";
import { SectionWrapper } from "@/components/SectionWrapper";
import { FAQ_ITEMS } from "@/lib/faq-data";

export function FaqSection() {
  return (
    <SectionWrapper
      id="faq"
      variant="faq"
      as="section"
      className="border-t border-border bg-surface"
      aria-labelledby="faq-heading"
    >
      <div className="flex flex-col gap-10">
        <h2
          id="faq-heading"
          className="text-bloom-h2 font-light text-foreground tracking-tight"
        >
          Perguntas frequentes
        </h2>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-stretch lg:gap-10">
          <div className="rounded-2xl border border-border/80 bg-elevated/80 p-6 shadow-[var(--shadow-faq-panel)] ring-1 ring-black/[0.04] dark:bg-elevated/50 lg:col-span-7">
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
          <div className="lg:col-span-5 lg:pl-2">
            <FaqIllustration className="h-full" />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
