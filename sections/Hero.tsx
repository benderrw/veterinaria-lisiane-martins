import Image from "next/image";

const HERO_IMAGE = "/hero.jpg";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100vh] flex-col items-center justify-center overflow-hidden bg-muted scroll-mt-[var(--header-height)]"
    >
      <div className="absolute inset-0">
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          className="object-cover opacity-65"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/35 to-background/55" />
      </div>

      <div className="relative z-10 flex w-full max-w-6xl flex-col items-center gap-8 px-4 py-24 text-center sm:px-6 lg:px-8">
        <h1 className="max-w-3xl text-4xl font-light leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl [font-family:var(--font-heading),sans-serif]">
          Cuidado e carinho para o seu pet em Pelotas
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground">
          Clínica Veterinária Lisiane Martins — atendimento humanizado para o que você ama.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <a
            href={process.env.NEXT_PUBLIC_WHATSAPP_URL ?? "https://wa.me/5553981166455"}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Agendar consulta pelo WhatsApp"
            className="inline-flex h-11 items-center justify-center gap-1.5 rounded-lg bg-primary px-6 text-lg font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            Agende sua consulta
          </a>
        </div>
      </div>
    </section>
  );
}
