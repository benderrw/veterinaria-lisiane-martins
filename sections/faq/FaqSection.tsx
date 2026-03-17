"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { FaqIllustration } from "./FaqIllustration";
import { SectionWrapper } from "@/components/SectionWrapper";

const FAQ_ITEMS = [
  {
    id: "horario",
    question: "Quais são os horários de atendimento?",
    answer:
      "Consulte nossos horários pelo telefone ou WhatsApp. Atendemos com hora marcada para melhor acolher você e seu pet.",
  },
  {
    id: "primeira-consulta",
    question: "Preciso agendar a primeira consulta?",
    answer:
      "Sim. Entre em contato pelo WhatsApp ou telefone para agendar. Na primeira consulta trazemos o histórico de vacinas e cuidados do seu pet, se tiver.",
  },
  {
    id: "emergencia",
    question: "Atendem emergências?",
    answer:
      "Em casos de emergência, entre em contato pelo telefone ou WhatsApp para orientação e possibilidade de atendimento.",
  },
  {
    id: "formas-pagamento",
    question: "Quais formas de pagamento são aceitas?",
    answer:
      "Consulte as formas de pagamento no momento do agendamento ou na recepção.",
  },
];

export function FaqSection() {
  return (
    <SectionWrapper
      id="faq"
      variant="faq"
      as="section"
      className="border-t border-border bg-surface"
      aria-labelledby="faq-heading"
    >
      <h2
        id="faq-heading"
        className="text-4xl font-light tracking-tight text-foreground [font-family:var(--font-heading),sans-serif]"
      >
        Perguntas frequentes
      </h2>
      <div className="grid gap-8 lg:grid-cols-6 lg:items-stretch">
        <div className="rounded-2xl border border-border bg-elevated/50 p-6 shadow-sm lg:col-span-4">
          <Accordion
            defaultValue={FAQ_ITEMS[0]?.id ? [FAQ_ITEMS[0].id] : []}
            className="w-full"
          >
            {FAQ_ITEMS.map((item) => (
              <AccordionItem key={item.id} value={item.id}>
                <AccordionTrigger className="py-4 text-left font-medium">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <div className="lg:col-span-2">
          <FaqIllustration className="h-full" />
        </div>
      </div>
    </SectionWrapper>
  );
}
