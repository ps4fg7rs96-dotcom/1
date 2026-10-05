import type { Dict } from "@/content";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { LogoMark } from "@/components/ui/Logo";
import { Ph } from "@/components/ui/Placeholder";
import { ButtonLink } from "@/components/ui/Button";

export function Comparison({ t, phTitle, cta, ctaHref }: { t: Dict["comparison"]; phTitle: string; cta: string; ctaHref: string }) {
  return (
    <Section labelledBy="compare-title" className="bg-surface-2/60">
      <SectionHeading id="compare-title" eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
      <div className="mx-auto mt-14 grid max-w-5xl gap-6 lg:grid-cols-2">
        {/* Avant */}
        <div data-reveal className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
          <h3 className="flex items-center gap-3 text-lg font-bold">
            <span className="grid size-9 place-items-center rounded-full bg-danger-soft text-danger">
              <Icon name="x" size={18} strokeWidth={2.25} />
            </span>
            {t.beforeTitle}
          </h3>
          <ul className="mt-6 divide-y divide-border">
            {t.before.map((row) => (
              <li key={row.label} className="flex items-center justify-between gap-4 py-3 text-[0.95rem]">
                <span className="flex items-center gap-2.5 text-muted">
                  <Icon name="puzzle" size={16} className="shrink-0 text-subtle" />
                  {row.label}
                </span>
                <span className="shrink-0 font-semibold tabular-nums">
                  <Ph title={phTitle}>{row.price}</Ph>
                  <span className="text-xs font-normal text-subtle">{t.perMonth}</span>
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center justify-between rounded-xl bg-danger-soft px-4 py-3">
            <span className="font-semibold">{t.total}</span>
            <span className="font-display text-xl font-extrabold text-danger font-wide">
              <Ph title={phTitle}>{t.beforeTotal}</Ph>
              <span className="text-sm">{t.perMonth}</span>
            </span>
          </div>
          <ul className="mt-6 space-y-2 text-sm text-muted">
            {t.beforeCons.map((c) => (
              <li key={c} className="flex items-start gap-2">
                <Icon name="minus" size={16} className="mt-0.5 shrink-0 text-danger" />
                {c}
              </li>
            ))}
          </ul>
        </div>

        {/* Avec Kinetic */}
        <div
          data-reveal
          style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
          className="relative flex flex-col overflow-hidden rounded-3xl bg-primary p-6 text-primary-fg shadow-glow sm:p-8"
        >
          <div aria-hidden="true" className="absolute -right-16 -top-16 size-64 rounded-full bg-white/10 blur-2xl" />
          <h3 className="relative flex items-center gap-3 text-lg font-bold">
            <LogoMark className="size-9 rounded-[10px] ring-2 ring-white/30" />
            {t.afterTitle}
          </h3>
          <ul className="relative mt-6 space-y-4">
            {t.after.map((a) => (
              <li key={a} className="flex items-start gap-3 text-[0.95rem] font-medium">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-white text-blue-700">
                  <Icon name="check" size={14} strokeWidth={2.5} />
                </span>
                {a}
              </li>
            ))}
          </ul>
          <div className="relative mt-8 flex items-center justify-between rounded-xl bg-white/10 px-4 py-3 ring-1 ring-white/20">
            <span className="font-semibold">{t.afterPriceLabel}</span>
            <span className="font-display text-xl font-extrabold font-wide">
              {t.afterPrice}
              <span className="text-sm">{t.perMonth}</span>
            </span>
          </div>
          <ul className="relative mt-6 flex flex-wrap gap-2">
            {t.afterPros.map((p) => (
              <li key={p} className="rounded-full bg-white/15 px-3 py-1 text-sm font-medium">
                {p}
              </li>
            ))}
          </ul>
          <div className="relative mt-auto pt-8">
            <ButtonLink href={ctaHref} variant="inverse" size="lg" icon="arrowRight" className="w-full sm:w-auto">
              {cta}
            </ButtonLink>
          </div>
        </div>
      </div>
      <p className="mt-6 text-center text-xs text-subtle">{t.note}</p>
    </Section>
  );
}
