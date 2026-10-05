import Image, { type StaticImageData } from "next/image";
import type { Dict } from "@/content";
import { Icon } from "@/components/ui/Icon";
import { site } from "@/lib/site";
import { Section, SectionHeading } from "@/components/ui/Section";
import mode from "@/public/images/demos/mode.webp";
import beaute from "@/public/images/demos/beaute.webp";
import maison from "@/public/images/demos/maison.webp";
import outdoor from "@/public/images/demos/outdoor.webp";
import cafe from "@/public/images/demos/cafe.webp";
import audio from "@/public/images/demos/audio.webp";

const images: Record<string, StaticImageData> = { mode, beaute, maison, outdoor, cafe, audio };

/** Boutiques démo fictives. Les liens « Voir la démo » pointent vers site.demoBaseUrl (PLACEHOLDER). */
export function Demos({ t }: { t: Dict["demos"] }) {
  return (
    <Section id="demos" labelledBy="demos-title">
      <SectionHeading id="demos-title" eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
      <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {t.items.map((d, i) => (
          <li key={d.key} data-reveal style={{ "--reveal-delay": `${(i % 3) * 80}ms` } as React.CSSProperties}>
            <article className="group relative h-full overflow-hidden rounded-2xl border border-border bg-surface shadow-xs transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lg focus-within:shadow-lg">
              {/* Mini-vitrine */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={images[d.key]}
                  alt={t.alt[d.key]}
                  fill
                  sizes="(min-width: 1024px) 370px, (min-width: 640px) 50vw, 100vw"
                  placeholder="blur"
                  className="object-cover transition-transform duration-700 ease-[var(--ease-kinetic)] group-hover:scale-105 motion-reduce:transform-none"
                />
                <div className="absolute inset-x-0 top-0 flex items-center justify-between bg-gradient-to-b from-black/50 to-transparent px-4 py-3 text-white">
                  <span className="font-display text-sm font-extrabold tracking-wide font-wide">{d.name}</span>
                  <span className="flex gap-2" aria-hidden="true">
                    <Icon name="search" size={15} />
                    <Icon name="cart" size={15} />
                  </span>
                </div>
                <span
                  aria-hidden="true"
                  className="absolute bottom-3 left-4 rounded-full px-3 py-1 text-[0.7rem] font-bold text-ink-950 shadow"
                  style={{ backgroundColor: d.accent }}
                >
                  {d.name}
                </span>
              </div>
              <div className="flex items-center justify-between gap-3 p-5">
                <div>
                  <h3 className="font-display text-lg font-bold font-wide">{d.name}</h3>
                  <p className="text-sm text-muted">{d.sector}</p>
                </div>
                <a
                  href={`${site.demoBaseUrl}/${d.key}`}
                  target="_blank"
                  rel="noopener"
                  data-placeholder-link=""
                  className="inline-flex shrink-0 items-center gap-1 rounded-full bg-surface-2 px-3.5 py-2 text-sm font-semibold text-fg transition-colors after:absolute after:inset-0 hover:bg-primary hover:text-primary-fg"
                >
                  {t.cta}
                  <span className="sr-only"> — {d.name}</span>
                  <Icon name="arrowUpRight" size={16} />
                </a>
              </div>
            </article>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-center text-xs text-subtle">
        {t.credit}{" "}
        <a href="https://unsplash.com/license" className="underline underline-offset-2 hover:text-fg" rel="noopener noreferrer" target="_blank">
          (licence)
        </a>
      </p>
    </Section>
  );
}
