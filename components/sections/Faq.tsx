import Link from "next/link";
import type { Dict } from "@/content";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";

type Item = { q: string; a: string };

/** FAQ en accordéon natif (<details>) : accessible et fonctionnel sans JavaScript. */
export function FaqList({ items }: { items: Item[] }) {
  return (
    <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface">
      {items.map((item) => (
        <details key={item.q} className="group">
          <summary className="flex items-center justify-between gap-6 px-5 py-5 text-left font-semibold transition-colors hover:bg-surface-2/60 sm:px-7 sm:text-lg">
            <h3 className="font-sans font-semibold" style={{ fontStretch: "100%", letterSpacing: 0 }}>
              {item.q}
            </h3>
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-surface-2 text-fg transition-transform duration-300 group-open:rotate-45 group-open:bg-primary group-open:text-primary-fg">
              <Icon name="plus" size={18} />
            </span>
          </summary>
          <div className="px-5 pb-6 leading-relaxed text-muted sm:px-7">
            <p>{item.a}</p>
          </div>
        </details>
      ))}
    </div>
  );
}

export function Faq({ t, contactHref }: { t: Dict["faq"]; contactHref: string }) {
  return (
    <Section id="faq" labelledBy="faq-title" className="bg-surface-2/60">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading id="faq-title" align="left" eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
          <Link href={contactHref} className="mt-6 inline-flex items-center gap-2 font-semibold text-link hover:underline">
            {t.contactCta}
            <Icon name="arrowRight" size={18} />
          </Link>
        </div>
        <div data-reveal>
          <FaqList items={t.items} />
        </div>
      </div>
    </Section>
  );
}
