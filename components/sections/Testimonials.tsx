"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Dict } from "@/content";
import { Icon } from "@/components/ui/Icon";
import { Stars } from "@/components/ui/Stars";
import { SectionHeading } from "@/components/ui/Section";

/** Carrousel accessible en scroll-snap natif : swipe, clavier, boutons. Aucune librairie. */
export function Testimonials({ t, phTitle }: { t: Dict["testimonials"]; phTitle: string }) {
  const track = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    update();
    const el = track.current;
    el?.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el?.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("[aria-roledescription=slide]");
    const step = card ? card.getBoundingClientRect().width + 20 : el.clientWidth * 0.8;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * step, behavior: reduce ? "auto" : "smooth" });
  };

  const total = t.items.length;

  return (
    <section id="avis" aria-labelledby="reviews-title" className="overflow-hidden py-20 sm:py-24 lg:py-28">
      <div className="container-k">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading id="reviews-title" align="left" eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scroll(-1)}
              disabled={atStart}
              aria-label={t.prev}
              className="grid size-12 place-items-center rounded-full border border-border-strong bg-surface text-fg transition-colors hover:bg-surface-2 disabled:opacity-40"
            >
              <Icon name="chevronLeft" />
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              disabled={atEnd}
              aria-label={t.next}
              className="grid size-12 place-items-center rounded-full bg-primary text-primary-fg transition-colors hover:bg-primary-hover disabled:opacity-40"
            >
              <Icon name="chevronRight" />
            </button>
          </div>
        </div>
      </div>

      <div
        role="region"
        aria-roledescription="carousel"
        aria-label={t.carouselLabel}
        className="container-k mt-12"
      >
        <div
          ref={track}
          tabIndex={0}
          className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-4 px-4 pb-4 sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:-mx-8 lg:scroll-px-8 lg:px-8"
        >
          {t.items.map((item, i) => (
            <div
              key={i}
              role="group"
              aria-roledescription="slide"
              aria-label={t.slideLabel.replace("{n}", String(i + 1)).replace("{total}", String(total))}
              className="w-[85%] shrink-0 snap-start sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]"
            >
              <figure className="flex h-full flex-col rounded-2xl border border-dashed border-border-strong bg-surface p-6 sm:p-7" title={phTitle}>
                <div className="flex items-center justify-between">
                  <Stars />
                  <Icon name="quote" filled size={28} className="text-primary-soft" />
                </div>
                <blockquote className="mt-5 flex-1 text-[1.05rem] leading-relaxed text-fg">
                  <p>{item.quote}</p>
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                  <span aria-hidden="true" className="grid size-11 place-items-center rounded-full bg-gradient-to-br from-blue-600 to-coral-400 font-bold text-white">
                    {i + 1}
                  </span>
                  <span>
                    <span className="block font-semibold">{item.name}</span>
                    <span className="block text-sm text-muted">{item.role}</span>
                  </span>
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
