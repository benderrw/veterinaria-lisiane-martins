"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  Stethoscope,
  Mail,
  Info,
  HelpCircle,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { WHATSAPP_HREF } from "@/lib/site";

const NAV_GROUPS = [
  {
    label: "Informações",
    items: [
      { href: "#sobre", label: "Sobre nós", icon: Info },
      { href: "#faq", label: "FAQ", icon: HelpCircle },
    ],
  },
] as const;

const NAV_LINKS = [
  { href: "#servicos", label: "Serviços", icon: Stethoscope },
  { href: "#contato", label: "Contato", icon: Mail },
] as const;

function DesktopNav() {
  return (
    <NavigationMenu align="end" className="max-w-none">
      <NavigationMenuList className="gap-6">
        {/* Grupo Informações (dropdown) */}
        {NAV_GROUPS.map((group) => (
          <NavigationMenuItem key={group.label}>
            <NavigationMenuTrigger className="text-sm font-medium text-foreground/90 hover:text-primary bg-transparent hover:bg-muted/50 h-auto py-1.5">
              {group.label}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="w-48 gap-1 p-1 flex flex-col">
                {group.items.map(({ href, label, icon: Icon }) => (
                  <li key={href}>
                    <NavigationMenuLink
                      render={<Link href={href} />}
                      className="cursor-pointer"
                    >
                      <Icon className="size-4 shrink-0" aria-hidden />
                      {label}
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
        {/* Links diretos com ícone */}
        {NAV_LINKS.map(({ href, label, icon: Icon }) => (
          <NavigationMenuItem key={href}>
            <NavigationMenuLink
              render={<Link href={href} />}
              className={cn(
                navigationMenuTriggerStyle(),
                "text-foreground/90 hover:text-primary hover:bg-muted/50 bg-transparent h-auto py-1.5"
              )}
            >
              <Icon className="size-4 shrink-0" aria-hidden />
              {label}
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function MobileNav({ onLinkClick }: { onLinkClick: () => void }) {
  const rowLink =
    "flex w-full items-center gap-3 py-3 px-6 text-base rounded-md hover:bg-muted/50 transition-colors hover:text-primary font-medium text-foreground/90";
  return (
    <nav className="flex flex-col w-full" aria-label="Menu principal">
      {/* Links diretos: ícone à esquerda do texto, linha inteira clicável */}
      {NAV_LINKS.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          onClick={onLinkClick}
          className={rowLink}
        >
          <Icon className="size-5 shrink-0 text-foreground/70" aria-hidden />
          <span>{label}</span>
        </Link>
      ))}
      {/* Accordion Informações: mesmo padrão visual */}
      <Accordion className="w-full">
        {NAV_GROUPS.map((group) => (
          <AccordionItem key={group.label} value={group.label} className="border-0">
            <AccordionTrigger
              className={cn(
                "w-full py-3 px-6 hover:no-underline rounded-md hover:bg-muted/50",
                "text-base font-medium text-foreground/90 text-left"
              )}
            >
              {group.label}
            </AccordionTrigger>
            <AccordionContent className="pb-2 pt-0">
              <div className="flex flex-col -mx-2">
                {group.items.map(({ href, label, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={onLinkClick}
                    className={cn(
                      rowLink,
                      "py-2.5 px-6"
                    )}
                  >
                    <Icon className="size-5 shrink-0 text-foreground/70" aria-hidden />
                    <span>{label}</span>
                  </Link>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
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
      className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60"
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

        {/* Desktop: nav + CTA secundário (mesmo destino do hero, menos proeminente) */}
        <div className="hidden items-center gap-3 md:flex">
          <DesktopNav />
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Agendar pelo WhatsApp (abre em nova aba)"
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "shrink-0 font-semibold focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring focus-visible:ring-offset-2"
            )}
          >
            Agendar
          </a>
        </div>

        {/* Mobile: CTA + menu */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Agendar pelo WhatsApp (abre em nova aba)"
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "shrink-0 font-semibold text-xs sm:text-sm focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring focus-visible:ring-offset-2"
            )}
          >
            Agendar
          </a>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" aria-label="Abrir menu">
                  <Menu className="size-5" />
                </Button>
              }
            />
            <SheetContent side="right" className="w-[min(20rem,85vw)]">
              <div className="pt-12">
                <h2 className="text-lg font-semibold text-foreground px-6 mb-6">
                  Menu
                </h2>
                <MobileNav onLinkClick={() => setOpen(false)} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
