/** FAQ copy + ids — usado na secção FAQ e no JSON-LD FAQPage (layout). */
export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const FAQ_ITEMS: readonly FaqItem[] = [
  {
    id: "horario",
    question: "Quais são os horários de atendimento?",
    answer:
      "Segunda a sexta, das 9h às 18h. Agende pelo WhatsApp ou telefone com hora marcada — assim reduzimos espera e dedicamos mais tempo ao seu pet.",
  },
  {
    id: "primeira-consulta",
    question: "Preciso agendar a primeira consulta?",
    answer:
      "Sim. Fale pelo WhatsApp ou telefone para marcar. Na primeira consulta, traga carteira de vacinação e anotações sobre o dia a dia do pet, se tiver — avaliamos tudo com calma.",
  },
  {
    id: "sem-agendar",
    question: "Posso ir sem agendar?",
    answer:
      "Trabalhamos com hora marcada para garantir atenção e organização. Se precisar de encaixe, chame no WhatsApp: avaliamos conforme a agenda do dia.",
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
      "Os valores variam conforme o procedimento. No WhatsApp ou por telefone explicamos o que será feito e as formas de pagamento, para você decidir com transparência.",
  },
  {
    id: "emergencia",
    question: "Atendem emergências?",
    answer:
      "Em urgência, ligue ou envie mensagem no WhatsApp. Orientamos o melhor encaminhamento e, quando possível, avaliamos encaixe conforme a gravidade e a disponibilidade.",
  },
  {
    id: "formas-pagamento",
    question: "Quais formas de pagamento são aceitas?",
    answer:
      "Pix, cartão e outras opções podem estar disponíveis. Confirme no agendamento ou na recepção o que melhor se aplica ao seu caso.",
  },
  {
    id: "localizacao",
    question: "Onde fica a clínica e como chegar?",
    answer:
      "Estamos na Rua Viamão, 349, bairro Laranjal, Pelotas. Na seção Contato há mapa incorporado e link para abrir a rota no Google Maps.",
  },
] as const;
