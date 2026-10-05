import type { Dict } from "@/content";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Ph } from "@/components/ui/Placeholder";

export function Stats({ t, phTitle }: { t: Dict["stats"]; phTitle: string }) {
  return (
    <Section labelledBy="stats-title" className="pt-0 sm:pt-0 lg:pt-0">
      <div className="relative overflow-hidden rounded-[2rem] border border-border bg-surface px-6 py-14 shadow-sm sm:px-10 lg:px-14">
        <div aria-hidden="true" className="absolute -bottom-24 -right-24 size-80 rounded-full bg-coral-200/40 blur-3xl dark:bg-coral-500/10" />
        <SectionHeading id="stats-title" eyebrow={t.eyebrow} title={t.title} />
        <dl className="relative mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {t.items.map((s, i) => (
            <div key={s.label} data-reveal style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties} className="flex flex-col-reverse text-center">
              <dt className="mt-3 text-muted">{s.label}</dt>
              <dd>
                <Ph title={phTitle} className="block font-display text-4xl font-extrabold text-gradient font-wide sm:text-5xl">
                  {s.value}
                </Ph>
              </dd>
            </div>
          ))}
        </dl>
        <p className="relative mt-10 text-center text-xs text-subtle">{t.note}</p>
      </div>
    </Section>
  );
}
