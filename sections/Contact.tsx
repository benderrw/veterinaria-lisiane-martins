"use client";

import { MapPin } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/SectionWrapper";
import { EmailIcon } from "@/components/icons/EmailIcon";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { WHATSAPP_HREF } from "@/lib/site";

const ADDRESS = "Rua Viamão, 349, Laranjal, Pelotas - RS, Brasil";
const PHONE = "+55 53 98116-6455";
const EMAIL = "vet.lisianebtmartins@gmail.com";
const MAPS_LINK = "https://maps.google.com/?q=Rua+Viamão+349+Laranjal+Pelotas+RS";

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 120, damping: 24 },
  },
};

export function Contact() {
  return (
    <SectionWrapper
      id="contato"
      variant="highlight"
      className="border-y border-border bg-background"
    >
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:items-center lg:gap-16">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.07, delayChildren: 0.04 } },
          }}
          className="flex w-full flex-col gap-8 items-end text-right"
        >
          <motion.h2
            variants={fadeUp}
            className="text-bloom-h2 font-light text-foreground tracking-tight"
          >
            Contato
          </motion.h2>
          <div className="flex w-full flex-col gap-8 text-foreground items-end">
            <motion.div variants={fadeUp} className="flex max-w-full items-start justify-end gap-4">
              <div>
                <p className="text-bloom-body-md font-medium text-muted-foreground">
                  Endereço
                </p>
                <a
                  href={MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-bloom-body text-foreground/90 transition-colors duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-primary"
                >
                  {ADDRESS}
                </a>
              </div>
              <MapPin
                className="size-5 shrink-0 text-muted-foreground"
                weight="duotone"
                aria-hidden
              />
            </motion.div>
            <motion.div variants={fadeUp} className="flex max-w-full items-start justify-end gap-4">
              <div>
                <p className="text-bloom-body-md font-medium text-muted-foreground">
                  Telefone / WhatsApp
                </p>
                <a
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-bloom-body text-foreground/90 transition-colors duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-primary"
                >
                  {PHONE}
                </a>
              </div>
              <WhatsAppIcon
                className="size-5 shrink-0 text-muted-foreground"
                aria-hidden
              />
            </motion.div>
            <motion.div variants={fadeUp} className="flex max-w-full items-start justify-end gap-4">
              <div>
                <p className="text-bloom-body-md font-medium text-muted-foreground">
                  E-mail
                </p>
                <a
                  href={`mailto:${EMAIL}`}
                  className="text-bloom-body text-foreground/90 transition-colors duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-primary"
                >
                  {EMAIL}
                </a>
              </div>
              <EmailIcon
                className="size-5 shrink-0 text-muted-foreground"
                aria-hidden
              />
            </motion.div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ type: "spring", stiffness: 100, damping: 22 }}
          className="flex flex-col gap-3"
        >
          <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border/80 shadow-[var(--shadow-card-rest)] ring-1 ring-black/[0.04]">
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
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
