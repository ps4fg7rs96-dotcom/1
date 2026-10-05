import Link from "next/link";
import type { Dict } from "@/content";
import type { Locale } from "@/lib/site";
import { site } from "@/lib/site";
import { href } from "@/lib/routes";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";
import { CookieSettingsButton } from "./CookieBanner";

export function Footer({ locale, t, common }: { locale: Locale; t: Dict["footer"]; common: Dict["common"] }) {
  const linkCls = "text-ink-300 transition-colors hover:text-white";
  const year = new Date().getFullYear();
  const cols = [
    {
      title: t.product,
      links: [
        { label: t.links.features, href: href(locale, "features") },
        { label: t.links.demos, href: href(locale, "home", "demos") },
        { label: t.links.pricing, href: href(locale, "pricing") },
        { label: t.links.reviews, href: href(locale, "home", "avis") },
      ],
    },
    {
      title: t.company,
      links: [
        { label: t.links.contact, href: href(locale, "contact") },
        { label: t.links.partners, href: `${href(locale, "contact")}?sujet=agence` },
        { label: t.links.login, href: site.loginUrl, external: true },
      ],
    },
    {
      title: t.legal,
      links: [
        { label: t.links.legal, href: href(locale, "legal") },
        { label: t.links.privacy, href: href(locale, "privacy") },
      ],
    },
  ];

  return (
    <footer className="dark relative overflow-hidden bg-ink-950 text-ink-50" style={{ colorScheme: "dark" }}>
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-blue-600/25 blur-3xl" />
      <div className="container-k relative py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div className="max-w-sm">
            <Link href={href(locale, "home")} className="inline-flex rounded-lg">
              <Logo tagline taglineText={locale === "fr" ? "Thème Shopify" : "Shopify theme"} />
              <span className="sr-only"> — {common.breadcrumbHome}</span>
            </Link>
            <p className="mt-5 leading-relaxed text-ink-300">{t.pitch}</p>
            <a href={`mailto:${site.email}`} className="mt-5 inline-flex items-center gap-2 font-semibold text-white hover:underline">
              <Icon name="mail" size={18} />
              {site.email}
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {cols.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <p className="font-display text-sm font-bold uppercase tracking-[0.14em] text-white">{col.title}</p>
                <ul className="mt-4 space-y-3 text-[0.95rem]">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      {"external" in l && l.external ? (
                        <a href={l.href} className={linkCls}>
                          {l.label}
                        </a>
                      ) : (
                        <Link href={l.href} className={linkCls}>
                          {l.label}
                        </Link>
                      )}
                    </li>
                  ))}
                  {col.title === t.legal && (
                    <li>
                      <CookieSettingsButton label={t.links.cookies} className={`${linkCls} text-left`} />
                    </li>
                  )}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-ink-300 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. {t.rights} · {t.madeIn}
          </p>
          <p>{t.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
