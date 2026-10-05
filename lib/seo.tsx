import type { Metadata } from "next";
import type { Dict } from "@/content";
import { routes, type RouteKey } from "./routes";
import { site, type Locale } from "./site";

export function absolute(path: string) {
  return `${site.url}${path === "/" ? "" : path}` || site.url;
}

/** Métadonnées complètes d'une page : title, description, canonical, hreflang, Open Graph, Twitter. */
export function pageMetadata(locale: Locale, key: RouteKey, t: Dict["meta"]): Metadata {
  const m = key === "home" ? t.home : t[key];
  const path = routes[key][locale];
  const image = { url: `/og/${locale}`, width: 1200, height: 630, alt: t.siteTitle, type: "image/png" };
  return {
    title: key === "home" ? { absolute: m.title } : m.title,
    description: m.description,
    alternates: {
      canonical: path,
      languages: {
        fr: routes[key].fr,
        en: routes[key].en,
        "x-default": routes[key].fr,
      },
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      alternateLocale: locale === "fr" ? ["en_US"] : ["fr_FR"],
      url: path,
      title: m.title,
      description: m.description,
      images: [image],
    },
    twitter: { card: "summary_large_image", title: m.title, description: m.description, images: [image.url] },
  };
}

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      // Échappe « < » pour empêcher toute injection dans la balise script.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function organizationLd(locale: Locale, t: Dict) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.name,
      legalName: site.legalName,
      url: site.url,
      logo: `${site.url}/logo-mark.svg`,
      email: site.email,
      description: t.meta.siteDescription,
      contactPoint: [
        { "@type": "ContactPoint", contactType: "sales", email: site.email, availableLanguage: ["French", "English"] },
        { "@type": "ContactPoint", contactType: "customer support", email: site.supportEmail, availableLanguage: ["French", "English"] },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      name: site.name,
      url: absolute(routes.home[locale]),
      inLanguage: locale,
      publisher: { "@id": `${site.url}/#organization` },
    },
  ];
}

export function faqLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absolute(it.path),
    })),
  };
}

export function productLd(locale: Locale, t: Dict) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${site.name} — ${locale === "fr" ? "Thème Shopify" : "Shopify theme"}`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Shopify",
    description: t.meta.pricing.description,
    url: absolute(routes.pricing[locale]),
    publisher: { "@id": `${site.url}/#organization` },
    offers: [
      { "@type": "Offer", name: "Solo", price: site.prices.solo.monthly, priceCurrency: "EUR", url: absolute(routes.pricing[locale]) },
      { "@type": "Offer", name: t.pricingPage.plans[1].name, price: site.prices.growth.monthly, priceCurrency: "EUR", url: absolute(routes.pricing[locale]) },
    ],
  };
}
