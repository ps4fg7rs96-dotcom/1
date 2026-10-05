import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function SpeedLines({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cn("inline-flex flex-col items-end gap-[3px]", className)}>
      <span className="h-[3px] w-3 rounded-full bg-accent" />
      <span className="h-[3px] w-4 rounded-full bg-accent" />
      <span className="h-[3px] w-3 rounded-full bg-accent" />
    </span>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-accent-text", className)}>
      <SpeedLines />
      {children}
    </p>
  );
}

type HeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "center" | "left";
  as?: "h1" | "h2";
  id?: string;
  className?: string;
  children?: ReactNode;
  /** false pour les en-têtes au-dessus de la ligne de flottaison (préserve le LCP). */
  reveal?: boolean;
};

export function SectionHeading({ eyebrow, title, lead, align = "center", as: Tag = "h2", id, className, children, reveal = true }: HeadingProps) {
  return (
    <div
      data-reveal={reveal ? "" : undefined}
      className={cn("max-w-3xl", align === "center" ? "mx-auto text-center" : "text-left", className)}
    >
      {eyebrow && <Eyebrow className={align === "center" ? "justify-center" : ""}>{eyebrow}</Eyebrow>}
      <Tag
        id={id}
        className={cn(
          "mt-3 font-extrabold text-fg",
          Tag === "h1" ? "text-4xl sm:text-5xl lg:text-6xl" : "text-3xl sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]",
        )}
      >
        {title}
      </Tag>
      {lead && <p className="mt-4 text-lg leading-relaxed text-muted">{lead}</p>}
      {children}
    </div>
  );
}

export function Section({
  id,
  children,
  className,
  labelledBy,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  labelledBy?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("py-20 sm:py-24 lg:py-28", className)}>
      <div className="container-k">{children}</div>
    </section>
  );
}
