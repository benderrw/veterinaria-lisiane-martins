import Image from "next/image";

const HERO_IMAGE = "/hero.jpg";

export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative flex min-h-[100vh] flex-col items-center justify-center overflow-hidden bg-muted scroll-mt-[var(--header-height)]"
    >
      <div className="absolute inset-0">
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          className="object-cover opacity-20"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/55 to-background/75" />
      </div>

      <div className="relative z-10 flex w-full max-w-6xl flex-col items-center gap-8 px-4 py-24 text-center sm:px-6 lg:px-8">
        <h1
          id="hero-heading"
          className="max-w-3xl text-4xl font-light leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl [font-family:var(--font-heading),sans-serif]"
        >
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
            className="inline-flex h-11 items-center justify-center gap-1.5 rounded-lg bg-primary px-6 text-lg font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            Agende sua consulta
          </a>
        </div>

        <div className="mt-6 grid gap-4 text-sm text-slate-600 sm:grid-cols-3">
          <div className="rounded-2xl bg-primary/20 p-3 shadow-sm">
            <p className="font-semibold text-slate-900">
              Consultas e vacinação
            </p>
            <p className="text-xs text-slate-500">
              Acompanhamento clínico e prevenção para manter o seu pet saudável.
            </p>
          </div>
          <div className="rounded-2xl bg-primary/20 p-3 shadow-sm">
            <p className="font-semibold text-slate-900">
              Exames e procedimentos
            </p>
            <p className="text-xs text-slate-500">
              Estrutura para exames, cirurgias e cuidados em situações delicadas.
            </p>
          </div>
          <div className="rounded-2xl bg-primary/20 p-3 shadow-sm">
            <p className="font-semibold text-slate-900">
              Confiança dos tutores
            </p>
            <p className="text-xs text-slate-500">
              Atendimento humanizado e avaliações positivas dos clientes em Pelotas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
