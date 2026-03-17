import {
  Stethoscope,
  Syringe,
  Scissors,
  Heart,
  ShieldCheck,
  PhoneCall,
} from "lucide-react";
import { SectionWrapper } from "@/components/SectionWrapper";

const SERVICES = [
  {
    icon: Stethoscope,
    title: "Consultas",
    description:
      "Atendimento clínico completo para cães e gatos, com avaliação individual e orientações para o bem-estar do seu pet.",
  },
  {
    icon: Syringe,
    title: "Vacinação",
    description:
      "Esquema vacinal adequado para cada fase da vida, protegendo contra as principais doenças.",
  },
  {
    icon: Scissors,
    title: "Cirurgias",
    description:
      "Procedimentos cirúrgicos em ambiente seguro, com acompanhamento pré e pós-operatório.",
  },
  {
    icon: Heart,
    title: "Cardiologia",
    description:
      "Avaliação cardíaca e acompanhamento de pacientes com suspeita ou diagnóstico de cardiopatia.",
  },
  {
    icon: ShieldCheck,
    title: "Preventivo",
    description:
      "Check-ups e programas de medicina preventiva para manter seu animal saudável.",
  },
  {
    icon: PhoneCall,
    title: "Atendimento humanizado",
    description:
      "Acolhimento e comunicação clara com os tutores em todas as etapas do atendimento.",
  },
];

export function Services() {
  return (
    <SectionWrapper id="servicos" variant="normal">
      <h2 className="text-4xl font-light tracking-tight text-foreground [font-family:var(--font-heading),sans-serif]">
        Nossos serviços
      </h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map(({ icon: Icon, title, description }) => (
          <article
            key={title}
            className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Icon className="size-6" aria-hidden />
            </div>
            <h3 className="text-lg font-semibold [font-family:var(--font-heading),sans-serif]">
              {title}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          </article>
        ))}
      </div>
    </SectionWrapper>
  );
}
