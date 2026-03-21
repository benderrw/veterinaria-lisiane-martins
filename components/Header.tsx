"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { List, Stethoscope } from "@phosphor-icons/react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_LINKS: Array<{
  href: string;
  label: string;
  icon?: typeof Stethoscope;
}> = [
  { href: "#servicos", label: "Serviços", icon: Stethoscope },
  { href: "#sobre", label: "Sobre nós" },
  { href: "#faq", label: "FAQ" },
  { href: "#contato", label: "Contato" },
];

function DesktopNav() {
  return (
    <NavigationMenu align="end" className="max-w-none">
      <NavigationMenuList className="gap-6">
        {NAV_LINKS.map(({ href, label, icon: Icon }) => (
          <NavigationMenuItem key={href}>
            <NavigationMenuLink
              render={<Link href={href} />}
              className={cn(
                navigationMenuTriggerStyle(),
                "text-foreground/90 hover:text-primary hover:bg-muted/50 bg-transparent h-auto py-1.5"
              )}
            >
              {Icon ? (
                <Icon className="size-4 shrink-0" weight="duotone" aria-hidden />
              ) : null}
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
          {Icon ? (
            <Icon
              className="size-5 shrink-0 text-foreground/70"
              weight="duotone"
              aria-hidden
            />
          ) : null}
          <span>{label}</span>
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
      className="header-liquid-glass sticky top-0 z-40 w-full border-b bg-background/90 backdrop-blur-md supports-backdrop-filter:bg-background/70"
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
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

        <div className="hidden md:flex">
          <DesktopNav />
        </div>

        <div className="flex items-center md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" aria-label="Abrir menu">
                  <List className="size-5" weight="duotone" aria-hidden />
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
