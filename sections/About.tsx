'use client';

import Image from "next/image";
import { SectionWrapper } from "@/components/SectionWrapper";
import { motion } from "framer-motion";

const ABOUT_IMAGE = "/sobre.jpg";

const VALUES = [
  {
    title: "Serenidade",
    description:
      "Ambiente acolhedor para que seu pet se sinta seguro durante o atendimento.",
  },
  {
    title: "Propósito",
    description:
      "Dedicação ao cuidado animal e à orientação dos tutores.",
  },
];

export function About() {
  return (
    <SectionWrapper
      id="sobre"
      variant="highlight"
      className="border-y border-border bg-surface"
    >
      <motion.div
        className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-16"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="relative aspect-square overflow-hidden rounded-2xl border border-border">
          <Image
            src={ABOUT_IMAGE}
            alt="Clínica Veterinária Lisiane Martins - ambiente de atendimento"
            fill
            className="object-cover grayscale-20 opacity-95"
            loading="lazy"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div className="flex flex-col gap-8 pt-6">
          <h2 className="text-bloom-h2 font-light text-foreground">
            Sobre nós
          </h2>
          <p className="text-bloom-intro text-muted-foreground">
            A Clínica Veterinária Lisiane Martins atua em Pelotas com foco em
            atendimento humanizado e qualidade no cuidado ao seu animal. Nossa
            equipe está pronta para oferecer consultas, vacinação, cirurgias e
            acompanhamento preventivo, sempre em diálogo com você.
          </p>
          <p className="text-bloom-body text-muted-foreground">
            Diferente de um atendimento apenas pontual, priorizamos explicações que você
            entende e um plano de cuidado alinhado à realidade do seu pet — no Laranjal,
            com hora marcada.
          </p>
          <div className="grid gap-8 pt-6 sm:grid-cols-2">
            {VALUES.map(({ title, description }) => (
              <div key={title}>
                <h3 className="text-bloom-caption font-medium uppercase tracking-wider text-foreground">
                  {title}
                </h3>
                <p className="text-bloom-body-sm mt-2 text-muted-foreground">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
