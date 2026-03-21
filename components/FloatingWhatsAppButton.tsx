"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { WHATSAPP_HREF } from "@/lib/site";

export function FloatingWhatsAppButton() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <Link
      href={WHATSAPP_HREF}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contato por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center overflow-visible rounded-full bg-[#25D366] text-white shadow-lg transition-[transform,background-color,color] duration-200 hover:scale-105 hover:bg-white hover:text-[#25D366] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring focus-visible:ring-offset-2 whatsapp-pulse"
    >
      <WhatsAppIcon className="size-7" aria-hidden />
    </Link>
  );
}
