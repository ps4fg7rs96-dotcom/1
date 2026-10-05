import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Marque visuellement une donnée d'exemple (avis, statistique, logo…) à remplacer.
 * Soulignement pointillé + infobulle ; repérable dans le code via « <Ph ».
 */
export function Ph({ children, title, className }: { children: ReactNode; title: string; className?: string }) {
  return (
    <span
      title={title}
      data-placeholder=""
      className={cn("underline decoration-dotted decoration-[1.5px] underline-offset-4 decoration-accent", className)}
    >
      {children}
    </span>
  );
}
