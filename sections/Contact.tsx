"use client";

import { MapPin } from "lucide-react";
import { SectionWrapper } from "@/components/SectionWrapper";
import { EmailIcon } from "@/components/icons/EmailIcon";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { motion } from "framer-motion";
import { WHATSAPP_HREF } from "@/lib/site";

const ADDRESS = "Rua Viamão, 349, Laranjal, Pelotas - RS, Brasil";
const PHONE = "+55 53 98116-6455";
const EMAIL = "vet.lisianebtmartins@gmail.com";
const MAPS_LINK = "https://maps.google.com/?q=Rua+Viamão+349+Laranjal+Pelotas+RS";

export function Contact() {
  return (
    <SectionWrapper
      id="contato"
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
        <div className="flex flex-col gap-8">
          <h2 className="text-bloom-h2 font-light text-foreground">
            Contato
          </h2>
          <div className="flex flex-col gap-8 text-foreground">
            <div className="flex gap-3">
              <MapPin className="mt-0.5 size-5 shrink-0 text-muted-foreground" aria-hidden />
              <div>
                <p className="text-bloom-body-sm font-medium text-muted-foreground">Endereço</p>
                <a
                  href={MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-bloom-body hover:text-primary"
                >
                  {ADDRESS}
                </a>
              </div>
            </div>
            <div className="flex gap-3">
              <WhatsAppIcon className="mt-0.5 size-5 shrink-0 text-muted-foreground" aria-hidden />
              <div>
                <p className="text-bloom-body-sm font-medium text-muted-foreground">Telefone / WhatsApp</p>
                <a
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-bloom-body hover:text-primary"
                >
                  {PHONE}
                </a>
              </div>
            </div>
            <div className="flex gap-3">
              <EmailIcon className="mt-0.5 size-5 shrink-0 text-muted-foreground" aria-hidden />
              <div>
                <p className="text-bloom-body-sm font-medium text-muted-foreground">E-mail</p>
                <a href={`mailto:${EMAIL}`} className="text-bloom-body hover:text-primary">
                  {EMAIL}
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border">
            <iframe
              title="Localização da Clínica Veterinária Lisiane Martins no mapa"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3392.0685868865435!2d-52.23998132352324!3d-31.76861521336876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9511b179c3f1926f%3A0xdaf5971a7dfa32ca!2sR.%20Viam%C3%A3o%2C%20349%20-%20Laranjal%2C%20Pelotas%20-%20RS%2C%2096090-180!5e0!3m2!1spt-BR!2sbr!4v1773722555639!5m2!1spt-BR!2sbr"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full max-w-full object-cover"
            />
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
