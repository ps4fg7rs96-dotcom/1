import type { Dict } from "@/content";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";

export function Steps({ t }: { t: Dict["steps"] }) {
  return (
    <Section labelledBy="steps-title">
      <SectionHeading id="steps-title" eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
      <ol className="relative mt-14 grid gap-6 lg:grid-cols-3">
        <span aria-hidden="true" className="absolute left-[16%] right-[16%] top-10 hidden h-px border-t-2 border-dashed border-border-strong lg:block" />
        {t.items.map((s, i) => (
          <li
            key={s.title}
            data-reveal
            style={{ "--reveal-delay": `${i * 110}ms` } as React.CSSProperties}
            className="relative rounded-2xl border border-border bg-surface p-6 text-center shadow-xs sm:p-8"
          >
            <span className="relative mx-auto grid size-20 place-items-center rounded-[1.4rem] bg-primary text-primary-fg shadow-glow">
              <Icon name={s.icon} size={30} />
              <span className="absolute -right-2 -top-2 grid size-8 place-items-center rounded-full bg-coral-400 font-display text-sm font-extrabold text-ink-950 ring-4 ring-surface">
                {i + 1}
              </span>
            </span>
            <h3 className="mt-6 text-xl font-bold">{s.title}</h3>
            <p className="mt-2 leading-relaxed text-muted">{s.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
