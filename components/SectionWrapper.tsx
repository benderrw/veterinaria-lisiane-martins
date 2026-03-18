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
}

export function SectionWrapper({
  variant = "normal",
  className,
  children,
  as: Component = "section",
  id,
}: SectionWrapperProps) {
  const { maxWidth, padding } = variantStyles[variant];
  return (
    <Component
      id={id}
      className={cn(
        "flex w-full justify-center px-4 sm:px-6 lg:px-8 scroll-mt-[var(--header-height)]",
        padding,
        className
      )}
    >
      <div className={cn("mx-auto flex w-full flex-col gap-8", maxWidth)}>
        {children}
      </div>
    </Component>
  );
}
