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
      "Segunda a sexta, das 9h às 18h. Confirme pelo WhatsApp ou telefone e agende com hora marcada — assim reduzimos espera e dedicamos mais tempo ao seu pet.",
  },
  {
    id: "primeira-consulta",
    question: "Preciso agendar a primeira consulta?",
    answer:
      "Sim. Entre em contato pelo WhatsApp ou telefone para agendar. Na primeira consulta, traga o histórico de vacinas e cuidados do seu pet, se tiver, para avaliarmos tudo com calma.",
  },
  {
    id: "sem-agendar",
    question: "Posso ir sem agendar?",
    answer:
      "Trabalhamos com hora marcada para garantir atenção e organização. Se precisar de encaixe, chame no WhatsApp: avaliamos a possibilidade conforme a agenda do dia.",
  },
  {
    id: "especies",
    question: "Vocês atendem apenas cães e gatos?",
    answer:
      "Sim. Nossa equipe está focada no cuidado clínico de cães e gatos, com protocolos e equipamentos adequados a essas espécies.",
  },
  {
    id: "valores",
    question: "Consigo saber valores antes da consulta?",
    answer:
      "Valores podem variar conforme o procedimento. No WhatsApp ou telefone explicamos o que será feito e as opções de pagamento, para você decidir com transparência.",
  },
  {
    id: "emergencia",
    question: "Atendem emergências?",
    answer:
      "Em urgência, ligue ou envie mensagem no WhatsApp. Orientamos o melhor encaminhamento e, quando possível, encaixamos atendimento conforme a gravidade e a disponibilidade.",
  },
  {
    id: "formas-pagamento",
    question: "Quais formas de pagamento são aceitas?",
    answer:
      "Pix, cartão e outras opções podem estar disponíveis. Confirme no agendamento ou na recepção o que melhor se aplica ao seu caso.",
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
