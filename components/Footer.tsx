import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { EmailIcon } from "@/components/icons/EmailIcon";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="border-t border-border bg-background" role="contentinfo">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div
            className="relative h-10 w-36 shrink-0 overflow-hidden"
          >
            <Image
              src="/logo.png"
              alt="Clínica Veterinária Lisiane Martins"
              fill
              className="object-contain"
            />
          </div>

          <div className="grid min-w-0 gap-8 text-sm md:grid-cols-2">
            {/* Localização / Horários */}
            <div className="min-w-0">
              <h2
                id="footer-location-heading"
                className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground [font-family:var(--font-heading),sans-serif]"
              >
                Localização
              </h2>
              <address className="not-italic text-muted-foreground">
                <a
                  href="https://maps.google.com/?q=Rua+Viamão+349+Laranjal+Pelotas+RS"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-start gap-2 hover:text-primary"
                >
                  <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden />
                  Rua Viamão, 349
                  <br />
                  Laranjal, Pelotas - RS
                </a>
              </address>
            </div>

            {/* Contato: redes + e-mail */}
            <section
              aria-labelledby="footer-contact-heading"
              className="min-w-0"
            >
              <h2
                id="footer-contact-heading"
                className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground [font-family:var(--font-heading),sans-serif]"
              >
                Contato
              </h2>
              <ul className="flex flex-col gap-2 text-muted-foreground">
                <li>
                  <a
                    href="mailto:vet.lisianebtmartins@gmail.com"
                    className="inline-flex items-center gap-2 hover:text-primary"
                  >
                    <EmailIcon className="size-4 shrink-0" aria-hidden />
                    vet.lisianebtmartins@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href={process.env.NEXT_PUBLIC_WHATSAPP_URL ?? "https://wa.me/5553981166455"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 hover:text-primary"
                    aria-label="Contato por WhatsApp"
                  >
                    <WhatsAppIcon className="size-4 shrink-0" aria-hidden />
                    +55 53 98116-6455
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/vet.lisianebtmartins/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 hover:text-primary"
                    aria-label="Instagram da clínica"
                  >
                    <InstagramIcon className="size-4 shrink-0" aria-hidden />
                    @vet.lisianebtmartins
                  </a>
                </li>
              </ul>
            </section>
          </div>
        </div>

        <div className="border-t border-border pt-4 text-center text-xs text-muted-foreground">
          <p>
            © {CURRENT_YEAR} Clínica Veterinária Lisiane Martins · Todos os direitos reservados
          </p>
        </div>
      </div>
    </footer>
  );
}
