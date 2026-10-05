"use client";

import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

/** Barre d'action collante, mobile uniquement, après le hero et avant le footer. */
export function StickyCta({ text, cta, href }: { text: string; cta: string; href: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const footer = document.querySelector("footer");
    const onScroll = () => {
      const pastHero = window.scrollY > 640;
      const nearFooter = footer ? footer.getBoundingClientRect().top < window.innerHeight : false;
      setVisible(pastHero && !nearFooter);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      data-sticky-cta
      aria-hidden={!visible}
      inert={!visible}
      className={cn(
        "fixed inset-x-0 bottom-0 z-30 border-t border-border bg-surface/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-lg transition-transform duration-300 lg:hidden",
        visible ? "translate-y-0" : "translate-y-full",
      )}
    >
      <div className="mx-auto flex max-w-md items-center justify-between gap-3">
        <p className="text-sm font-semibold text-fg">{text}</p>
        <ButtonLink href={href} size="sm" icon="arrowRight">
          {cta}
        </ButtonLink>
      </div>
    </div>
  );
}
