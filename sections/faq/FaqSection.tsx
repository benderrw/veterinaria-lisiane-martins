"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { FaqIllustration } from "./FaqIllustration";
import { SectionWrapper } from "@/components/SectionWrapper";
import { motion } from "framer-motion";

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
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col gap-8"
      >
        <h2
          id="faq-heading"
          className="text-bloom-h2 font-light text-foreground"
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
                  <AccordionContent className="text-bloom-body text-muted-foreground leading-relaxed">
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
      </motion.div>
    </SectionWrapper>
  );
}
