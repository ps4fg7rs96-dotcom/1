import { getDict } from "@/content";
import type { Locale } from "@/lib/site";
import { href, routes } from "@/lib/routes";
import { JsonLd, absolute, breadcrumbLd } from "@/lib/seo";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { Ph } from "@/components/ui/Placeholder";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/sections/ContactForm";

export function ContactPage({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const p = t.contactPage;
  const crumbs = [
    { name: t.common.breadcrumbHome, href: routes.home[locale] },
    { name: t.common.nav.contact, href: routes.contact[locale] },
  ];
  return (
    <>
      <PageHero eyebrow={p.eyebrow} title={p.title} lead={p.lead} crumbs={crumbs} />
      <Section className="pt-14 sm:pt-16 lg:pt-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-14">
          <aside className="space-y-5">
            <p className="inline-flex items-center gap-2 rounded-full bg-success-soft px-3.5 py-1.5 text-sm font-semibold text-success">
              <Icon name="clock" size={16} />
              <Ph title={t.common.placeholderTitle}>{p.responseTime}</Ph>
            </p>
            {p.channels.map((c) => (
              <div key={c.title} className="rounded-2xl border border-border bg-surface p-6">
                <span className="grid size-11 place-items-center rounded-xl bg-primary-soft text-link">
                  <Icon name={c.icon} size={22} />
                </span>
                <h2 className="mt-4 text-lg font-bold">{c.title}</h2>
                <p className="mt-1 text-muted">{c.text}</p>
                <a href={`mailto:${c.value}`} className="mt-3 inline-flex items-center gap-1.5 font-semibold text-link hover:underline">
                  {c.value}
                  <Icon name="arrowUpRight" size={16} />
                </a>
              </div>
            ))}
            <a href={href(locale, "home", "faq")} className="flex items-center justify-between rounded-2xl border border-dashed border-border-strong p-5 font-semibold transition-colors hover:border-primary hover:text-link">
              {p.faqLink}
              <Icon name="arrowRight" />
            </a>
          </aside>

          <div className="rounded-3xl border border-border bg-surface p-6 shadow-sm sm:p-8 lg:p-10">
            <h2 className="text-2xl font-extrabold">{p.form.title}</h2>
            <div className="mt-6">
              <ContactForm t={p.form} privacyHref={href(locale, "privacy")} />
            </div>
          </div>
        </div>
      </Section>
      <JsonLd
        data={[
          { "@context": "https://schema.org", "@type": "ContactPage", name: t.meta.contact.title, url: absolute(routes.contact[locale]) },
          breadcrumbLd(crumbs.map((c) => ({ name: c.name, path: c.href }))),
        ]}
      />
    </>
  );
}
