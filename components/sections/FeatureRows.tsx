import type { Dict } from "@/content";
import type { Locale } from "@/lib/site";
import { href } from "@/lib/routes";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { CartMockup, EditorMockup, LandingMockup, TemplatesMockup } from "@/components/mockups/Mockups";

export function FeatureRows({ locale, t, m, cta }: { locale: Locale; t: Dict["featureRows"]; m: Dict["mockups"]; cta: string }) {
  const visuals = {
    editor: <EditorMockup t={m} />,
    cart: <CartMockup t={m} upsellAlt={m.upsellAlt} />,
    templates: <TemplatesMockup t={m} />,
    landing: <LandingMockup t={m} />,
  };

  return (
    <Section id="fonctionnalites" labelledBy="features-title" className="overflow-hidden bg-surface-2/60">
      <SectionHeading id="features-title" eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
      <div className="mt-16 space-y-20 lg:mt-20 lg:space-y-28">
        {t.rows.map((row, i) => (
          <article key={row.title} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div data-reveal className={cn("min-w-0", i % 2 === 1 && "lg:order-2")}>
              <Eyebrow>{row.eyebrow}</Eyebrow>
              <h3 className="mt-3 text-2xl font-extrabold sm:text-3xl lg:text-[2.1rem] lg:leading-tight">{row.title}</h3>
              <p className="mt-4 text-lg leading-relaxed text-muted">{row.text}</p>
              <ul className="mt-6 space-y-3">
                {row.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-primary text-primary-fg">
                      <Icon name="check" size={14} strokeWidth={2.5} />
                    </span>
                    <span className="font-medium">{b}</span>
                  </li>
                ))}
              </ul>
              {i === t.rows.length - 1 && (
                <ButtonLink href={href(locale, "features")} variant="secondary" icon="arrowRight" className="mt-8">
                  {cta}
                </ButtonLink>
              )}
            </div>
            <div data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties} className={cn("relative min-w-0", i % 2 === 1 && "lg:order-1")}>
              <div aria-hidden="true" className={cn("absolute -inset-6 -z-0 rounded-[2rem] opacity-60 blur-2xl", i % 2 ? "bg-coral-200/50 dark:bg-coral-500/10" : "bg-blue-200/60 dark:bg-blue-600/15")} />
              <div className="relative">{visuals[row.visual]}</div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
