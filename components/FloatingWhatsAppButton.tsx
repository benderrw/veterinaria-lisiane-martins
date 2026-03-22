"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { WHATSAPP_HREF } from "@/lib/site";
import { cn } from "@/lib/utils";

/** FAB visível quando a hero não intersecta ou tem ≤ esta fração visível no viewport. */
const HERO_FAB_VISIBLE_RATIO_MAX = 0.15;

/** Com a hero ainda “grande” no ecrã, basta esta fração da secção seguinte visível para mostrar o FAB. */
const NEXT_SECTION_AFTER_HERO_ID = "servicos";
const NEXT_SECTION_FAB_MIN_VISIBLE = 0.1;

const IO_THRESHOLDS = Array.from({ length: 21 }, (_, i) => i / 20);

type FabScrollState = "pending" | "show" | "hide";

function elementVisibilityRatio(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight;
  const visibleHeight = Math.max(
    0,
    Math.min(rect.bottom, vh) - Math.max(rect.top, 0),
  );
  if (rect.height <= 0) return 0;
  return Math.min(1, visibleHeight / rect.height);
}

function computeFabVisible(hero: HTMLElement, nextSection: HTMLElement | null) {
  const heroRatio = elementVisibilityRatio(hero);
  const heroIntersecting = heroRatio > 0;
  const heroAllowsShow =
    !heroIntersecting || heroRatio <= HERO_FAB_VISIBLE_RATIO_MAX;
  if (heroAllowsShow) return true;
  if (!nextSection) return false;
  return elementVisibilityRatio(nextSection) >= NEXT_SECTION_FAB_MIN_VISIBLE;
}

function computeFabVisibleFromIoEntries(
  entries: IntersectionObserverEntry[],
  hero: HTMLElement,
  nextSection: HTMLElement | null,
) {
  const heroEntry = entries.find((e) => e.target === hero);
  const nextEntry = nextSection
    ? entries.find((e) => e.target === nextSection)
    : undefined;

  const heroRatio = heroEntry
    ? heroEntry.intersectionRatio
    : elementVisibilityRatio(hero);
  const heroIntersecting = heroEntry ? heroEntry.isIntersecting : heroRatio > 0;
  const heroAllowsShow =
    !heroIntersecting || heroRatio <= HERO_FAB_VISIBLE_RATIO_MAX;
  if (heroAllowsShow) return true;
  if (!nextSection) return false;
  const nextRatio = nextEntry
    ? nextEntry.intersectionRatio
    : elementVisibilityRatio(nextSection);
  return nextRatio >= NEXT_SECTION_FAB_MIN_VISIBLE;
}

export function FloatingWhatsAppButton() {
  const pathname = usePathname();
  const [fabScrollState, setFabScrollState] = useState<FabScrollState>("pending");

  useLayoutEffect(() => {
    let io: IntersectionObserver | null = null;

    const apply = () => {
      io?.disconnect();
      io = null;

      const hero = document.getElementById("hero");
      if (!hero) {
        setFabScrollState("show");
        return;
      }

      const nextSection = document.getElementById(NEXT_SECTION_AFTER_HERO_ID);
      setFabScrollState(
        computeFabVisible(hero, nextSection) ? "show" : "hide",
      );

      io = new IntersectionObserver(
        (entries) => {
          const h = document.getElementById("hero");
          if (!h) {
            setFabScrollState("show");
            return;
          }
          const next = document.getElementById(NEXT_SECTION_AFTER_HERO_ID);
          setFabScrollState(
            computeFabVisibleFromIoEntries(entries, h, next) ? "show" : "hide",
          );
        },
        { threshold: IO_THRESHOLDS, rootMargin: "0px" },
      );
      io.observe(hero);
      if (nextSection) io.observe(nextSection);
    };

    apply();
    return () => {
      io?.disconnect();
    };
  }, []);

  if (pathname?.startsWith("/admin")) return null;

  const fabConcealed =
    fabScrollState === "pending" || fabScrollState === "hide";

  return (
    <Link
      href={WHATSAPP_HREF}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contato por WhatsApp"
      aria-hidden={fabConcealed ? true : undefined}
      tabIndex={fabConcealed ? -1 : undefined}
      className={cn(
        "fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center overflow-visible rounded-full border border-transparent bg-primary text-primary-foreground opacity-100 shadow-[var(--shadow-primary-btn)] transition-[transform,background-color,box-shadow,filter,opacity,visibility] duration-300 ease-out hover:scale-105 hover:bg-[var(--primary-hover)] hover:shadow-[var(--shadow-primary-btn-hover)] active:brightness-[0.96] active:shadow-[var(--shadow-primary-btn)] focus-visible:outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-offset-2 whatsapp-pulse",
        fabConcealed && "pointer-events-none opacity-0",
      )}
    >
      <WhatsAppIcon className="size-7" aria-hidden />
    </Link>
  );
}
