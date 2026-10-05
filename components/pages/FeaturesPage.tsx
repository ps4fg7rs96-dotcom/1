import { getDict } from "@/content";
import type { Locale } from "@/lib/site";
import { href, routes } from "@/lib/routes";
import { JsonLd, breadcrumbLd } from "@/lib/seo";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCta } from "@/components/sections/FinalCta";
import { Comparison } from "@/components/sections/Comparison";

export function FeaturesPage({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const p = t.featuresPage;
  const crumbs = [
    { name: t.common.breadcrumbHome, href: routes.home[locale] },
    { name: t.common.nav.features, href: routes.features[locale] },
  ];
  return (
    <>
      <PageHero eyebrow={p.eyebrow} title={p.title} lead={p.lead} crumbs={crumbs}>
        <nav aria-label={p.jump} className="mt-8">
          <ul className="flex flex-wrap justify-center gap-2">
            {p.categories.map((c) => (
              <li key={c.id}>
                <a
                  href={`#${c.id}`}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-semibold transition-colors hover:border-primary hover:text-link"
                >
                  <Icon name={c.icon} size={16} />
                  {c.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      <Section labelledBy="cats-title">
        <h2 id="cats-title" className="sr-only">
          {p.title}
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {p.categories.map((c, i) => (
            <article
              key={c.id}
              id={c.id}
              data-reveal
              style={{ "--reveal-delay": `${(i % 3) * 80}ms` } as React.CSSProperties}
              className="scroll-mt-28 rounded-2xl border border-border bg-surface p-6 shadow-xs sm:p-7"
            >
              <span className="grid size-12 place-items-center rounded-xl bg-primary text-primary-fg shadow-glow">
                <Icon name={c.icon} size={24} />
              </span>
              <h3 className="mt-5 text-xl font-bold">{c.title}</h3>
              <p className="mt-1.5 text-muted">{c.text}</p>
              <ul className="mt-5 space-y-2.5 border-t border-border pt-5">
                {c.items.map((it) => (
                  <li key={it} className="flex items-start gap-2.5 text-[0.95rem]">
                    <Icon name="check" size={18} strokeWidth={2.25} className="mt-0.5 shrink-0 text-success" />
                    {it}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <Section labelledBy="replace-title" className="bg-surface-2/60">
        <SectionHeading id="replace-title" title={p.replaceTitle} lead={p.replaceLead} />
        <ul className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-3">
          {p.replace.map((r) => (
            <li key={r} className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 font-medium">
              <span className="relative text-subtle">
                <Icon name="puzzle" size={16} />
              </span>
              <span className="line-through decoration-coral-400 decoration-2">{r}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section labelledBy="support-title">
        <SectionHeading id="support-title" title={p.supportTitle} />
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {p.support.map((s) => (
            <li key={s.title} data-reveal className="rounded-2xl border border-border bg-surface p-6 text-center">
              <span className="mx-auto grid size-12 place-items-center rounded-xl bg-accent-soft text-accent-text">
                <Icon name={s.icon} size={24} />
              </span>
              <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
              <p className="mt-1.5 text-muted">{s.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Comparison t={t.comparison} phTitle={t.common.placeholderTitle} cta={t.common.ctaTrialLong} ctaHref={href(locale, "pricing")} />

      <FinalCta
        t={t.finalCta}
        reassurance={t.common.reassurance}
        primaryHref={href(locale, "pricing")}
        secondaryHref={href(locale, "contact")}
      />
      <JsonLd data={breadcrumbLd(crumbs.map((c) => ({ name: c.name, path: c.href })))} />
    </>
  );
}
