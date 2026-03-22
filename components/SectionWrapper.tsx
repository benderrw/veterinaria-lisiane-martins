import { cn } from "@/lib/utils";

type SectionVariant = "normal" | "highlight" | "faq";

const variantStyles: Record<
  SectionVariant,
  { maxWidth: string; padding: string }
> = {
  normal: { maxWidth: "max-w-7xl", padding: "py-16 lg:py-24" },
  highlight: { maxWidth: "max-w-7xl", padding: "py-32" },
  faq: { maxWidth: "max-w-7xl", padding: "py-32" },
};

interface SectionWrapperProps {
  variant?: SectionVariant;
  className?: string;
  children: React.ReactNode;
  as?: "section" | "div";
  id?: string;
  /** Camada atrás do contentor `max-w-7xl` (ex.: imagem full-bleed); a secção fica `relative` e o interior `z-10`. */
  bleedBackground?: React.ReactNode;
}

export function SectionWrapper({
  variant = "normal",
  className,
  children,
  as: Component = "section",
  id,
  bleedBackground,
}: SectionWrapperProps) {
  const { maxWidth, padding } = variantStyles[variant];
  return (
    <Component
      id={id}
      className={cn(
        "flex w-full justify-center px-4 sm:px-6 lg:px-8 scroll-mt-[var(--header-height)]",
        padding,
        bleedBackground && "relative",
        className
      )}
    >
      {bleedBackground}
      <div
        className={cn(
          "mx-auto flex w-full flex-col gap-8",
          maxWidth,
          bleedBackground && "relative z-10"
        )}
      >
        {children}
      </div>
    </Component>
  );
}
