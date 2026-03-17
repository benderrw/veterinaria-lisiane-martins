"use client";

import { useState } from "react";
import Image from "next/image";
import { Instagram, HelpCircle } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { cn } from "@/lib/utils";

const WHATSAPP_URL =
  process.env.NEXT_PUBLIC_WHATSAPP_URL ?? "https://wa.me/5553981166455";
const INSTAGRAM_URL = "https://www.instagram.com/vet.lisianebtmartins/";
const FAQ_IMAGE = "/faq-illustration.png";

export function FaqIllustration({ className }: { className?: string }) {
  const [imgError, setImgError] = useState(false);
  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-2xl border border-border bg-elevated p-8 shadow-sm",
        className
      )}
      aria-labelledby="faq-illustration-heading"
    >
      <div className="flex flex-col items-center text-center">
        <div className="relative size-20 overflow-hidden rounded-xl">
          {!imgError ? (
            <Image
              src={FAQ_IMAGE}
              alt=""
              width={80}
              height={80}
              aria-hidden
              className="object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="flex size-full items-center justify-center text-muted-foreground" aria-hidden>
              <HelpCircle className="size-10" />
            </div>
          )}
        </div>
        <h3
          id="faq-illustration-heading"
          className="mt-4 text-lg font-medium text-foreground [font-family:var(--font-heading),sans-serif]"
        >
          Ainda tem dúvidas?
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Tire suas dúvidas pelo WhatsApp ou nos acompanhe no Instagram.
        </p>
      </div>
      <div className="mt-auto flex flex-col gap-2 pt-6">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <WhatsAppIcon className="size-4" aria-hidden />
          Fale pelo WhatsApp
        </a>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-primary bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <Instagram className="size-4" aria-hidden />
          Instagram
        </a>
      </div>
    </div>
  );
}
