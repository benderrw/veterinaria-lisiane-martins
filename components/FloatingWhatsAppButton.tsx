"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

const WHATSAPP_URL =
  process.env.NEXT_PUBLIC_WHATSAPP_URL ?? "https://wa.me/5553981166455";

export function FloatingWhatsAppButton() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <Link
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contato por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring focus-visible:ring-offset-2 whatsapp-pulse"
    >
      <WhatsAppIcon className="size-7" aria-hidden />
    </Link>
  );
}
