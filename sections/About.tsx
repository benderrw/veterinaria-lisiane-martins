import Image from "next/image";
import { SectionWrapper } from "@/components/SectionWrapper";

const ABOUT_IMAGE = "/sobre.jpg";

const VALUES = [
  {
    title: "Serenidade",
    description: "Ambiente acolhedor para que seu pet se sinta seguro durante o atendimento.",
  },
  {
    title: "Propósito",
    description: "Dedicação ao cuidado animal e à orientação dos tutores.",
  },
];

export function About() {
  return (
    <SectionWrapper
      id="sobre"
      variant="highlight"
      className="border-y border-border bg-surface"
    >
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div className="relative aspect-square overflow-hidden rounded-2xl border border-border">
          <Image
            src={ABOUT_IMAGE}
            alt="Clínica Veterinária Lisiane Martins - ambiente de atendimento"
            fill
            className="object-cover grayscale-[20%] opacity-95"
            loading="lazy"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div className="flex flex-col gap-8 pt-6">
          <h2 className="text-4xl font-light tracking-tight text-foreground sm:text-5xl [font-family:var(--font-heading),sans-serif]">
            Sobre nós
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            A Clínica Veterinária Lisiane Martins atua em Pelotas com foco em
            atendimento humanizado e qualidade no cuidado ao seu animal. Nossa
            equipe está pronta para oferecer consultas, vacinação, cirurgias e
            acompanhamento preventivo, sempre em diálogo com você.
          </p>
          <div className="grid gap-8 pt-6 sm:grid-cols-2">
            {VALUES.map(({ title, description }) => (
              <div key={title}>
                <h3 className="text-xs font-medium uppercase tracking-wider text-foreground [font-family:var(--font-heading),sans-serif]">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
