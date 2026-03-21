"use client";

import { useState } from "react";
import Image from "next/image";
import { Question } from "@phosphor-icons/react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const WHATSAPP_URL =
  process.env.NEXT_PUBLIC_WHATSAPP_URL ?? "https://wa.me/5553981166455";
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
              <Question className="size-10" weight="duotone" />
            </div>
          )}
        </div>
        <h3
          id="faq-illustration-heading"
          className="text-bloom-h5 mt-4 font-medium text-foreground"
        >
          Ainda tem dúvidas?
        </h3>
        <p className="text-bloom-body-sm mt-2 text-muted-foreground">
          Tire suas dúvidas pelo WhatsApp — respondemos com calma.
        </p>
      </div>
      <div className="mt-auto pt-6">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: "default", size: "cta" }), "w-full")}
        >
          <WhatsAppIcon className="size-4" aria-hidden />
          Fale pelo WhatsApp
        </a>
      </div>
    </div>
  );
}
