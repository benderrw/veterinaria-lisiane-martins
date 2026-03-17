"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "#servicos", label: "Serviços" },
  { href: "#sobre", label: "Sobre nós" },
  { href: "#contato", label: "Contato" },
  { href: "#faq", label: "FAQ" },
];

function NavLinks({
  className,
  onLinkClick,
  variant = "desktop",
}: {
  className?: string;
  onLinkClick?: () => void;
  variant?: "desktop" | "mobile";
}) {
  const isMobile = variant === "mobile";
  return (
    <nav
      className={cn(
        "flex flex-col md:flex-row md:items-center md:gap-6",
        isMobile ? "gap-1" : "gap-4",
        className
      )}
    >
      {NAV_LINKS.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          onClick={onLinkClick}
          className={cn(
            "font-medium text-foreground/90 transition-colors hover:text-primary",
            isMobile
              ? "block py-3 text-base rounded-md hover:bg-muted/50 px-1"
              : "text-sm"
          )}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!headerRef.current) return;
    const updateHeaderHeight = () => {
      const rect = headerRef.current?.getBoundingClientRect();
      if (rect?.height) {
        document.documentElement.style.setProperty(
          "--header-height",
          `${rect.height}px`
        );
      }
    };

    updateHeaderHeight();
    window.addEventListener("resize", updateHeaderHeight);
    return () => window.removeEventListener("resize", updateHeaderHeight);
  }, []);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="#hero"
          className="flex items-center focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
          aria-label="Ir para o topo - Clínica Veterinária Lisiane Martins"
        >
          <Image
            src="/logo.png"
            alt="Clínica Veterinária Lisiane Martins"
            width={180}
            height={48}
            className="h-10 w-auto md:h-12"
            priority
          />
        </Link>

        {/* Desktop nav: from 769px */}
        <div className="hidden md:block">
          <NavLinks />
        </div>

        {/* Mobile/tablet: hamburger + Sheet (<=768px) */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" aria-label="Abrir menu">
                  <Menu className="size-5" />
                </Button>
              }
            />
            <SheetContent side="right" className="w-[min(20rem,85vw)]">
              <div className="px-6 pt-12">
                <h2 className="text-lg font-semibold text-foreground mb-6">Menu</h2>
                <NavLinks variant="mobile" onLinkClick={() => setOpen(false)} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
