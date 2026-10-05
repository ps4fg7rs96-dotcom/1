import { getDict } from "@/content";
import { site, type Locale } from "@/lib/site";
import { href, routes } from "@/lib/routes";
import { JsonLd, breadcrumbLd, faqLd, productLd } from "@/lib/seo";
import { Icon } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { PageHero } from "@/components/sections/PageHero";
import { PricingPlans } from "@/components/sections/PricingPlans";
import { FaqList } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";

function Cell({ value, yes, no }: { value: string; yes: string; no: string }) {
  if (value === "✓")
    return (
      <span className="inline-flex text-success">
        <Icon name="check" size={20} strokeWidth={2.5} />
        <span className="sr-only">{yes}</span>
      </span>
    );
  if (value === "—")
    return (
      <span className="text-subtle">
        <span aria-hidden="true">—</span>
        <span className="sr-only">{no}</span>
      </span>
    );
  return <span>{value}</span>;
}

export function PricingPage({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const p = t.pricingPage;
  const crumbs = [
    { name: t.common.breadcrumbHome, href: routes.home[locale] },
    { name: t.common.nav.pricing, href: routes.pricing[locale] },
  ];
  const faq = [...p.faq, ...t.faq.items.slice(2, 5)];

  return (
    <>
      <PageHero eyebrow={p.eyebrow} title={p.title} lead={p.lead} crumbs={crumbs} />

      <Section className="pt-14 sm:pt-16 lg:pt-16">
        <PricingPlans locale={locale} t={p} contactHref={href(locale, "contact")} />

        <div data-reveal className="mx-auto mt-12 flex max-w-3xl flex-col items-center gap-4 rounded-2xl border border-border bg-surface p-6 text-center sm:flex-row sm:text-left">
          <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-success-soft text-success">
            <Icon name="shield" size={28} />
          </span>
          <div>
            <p className="font-display text-lg font-bold font-wide">{p.guaranteeTitle}</p>
            <p className="mt-1 text-muted">{p.guaranteeText}</p>
          </div>
        </div>
      </Section>

      <Section labelledBy="compare-plans" className="bg-surface-2/60">
        <SectionHeading id="compare-plans" title={p.compareTitle} />
        <div data-reveal className="mt-10 overflow-x-auto rounded-2xl border border-border bg-surface" tabIndex={0} role="region" aria-labelledby="compare-plans">
          <table className="w-full min-w-[40rem] text-left text-[0.95rem]">
            <thead>
              <tr className="border-b border-border bg-surface-2/60">
                <th scope="col" className="px-5 py-4 font-semibold text-muted">
                  {p.compareFeature}
                </th>
                {p.plans.map((pl, i) => (
                  <th key={pl.id} scope="col" className={`px-5 py-4 text-center font-display font-bold font-wide ${i === 1 ? "text-link" : ""}`}>
                    {pl.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {p.compareRows.map((row) => (
                <tr key={row.label} className="transition-colors hover:bg-surface-2/40">
                  <th scope="row" className="px-5 py-4 font-medium">
                    {row.label}
                  </th>
                  {row.values.map((v, i) => (
                    <td key={i} className={`px-5 py-4 text-center ${i === 1 ? "bg-primary-soft/40" : ""}`}>
                      <Cell value={v} yes={p.yes} no={p.no} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section labelledBy="billing-faq">
        <SectionHeading id="billing-faq" title={p.faqTitle} />
        <div data-reveal className="mx-auto mt-10 max-w-3xl">
          <FaqList items={faq} />
        </div>
      </Section>

      <FinalCta t={t.finalCta} reassurance={t.common.reassurance} primaryHref={site.signupUrl} secondaryHref={href(locale, "contact")} />
      <JsonLd data={[productLd(locale, t), faqLd(faq), breadcrumbLd(crumbs.map((c) => ({ name: c.name, path: c.href })))]} />
    </>
  );
}
