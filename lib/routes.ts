import type { Locale } from "./site";

export type RouteKey = "home" | "features" | "pricing" | "contact" | "legal" | "privacy";

/** Chemins localisés : un slug par langue, FR à la racine, EN sous /en. */
export const routes: Record<RouteKey, Record<Locale, string>> = {
  home: { fr: "/", en: "/en" },
  features: { fr: "/fonctionnalites", en: "/en/features" },
  pricing: { fr: "/tarifs", en: "/en/pricing" },
  contact: { fr: "/contact", en: "/en/contact" },
  legal: { fr: "/mentions-legales", en: "/en/legal" },
  privacy: { fr: "/confidentialite", en: "/en/privacy" },
};

export function href(locale: Locale, key: RouteKey, hash?: string) {
  const base = routes[key][locale];
  if (!hash) return base;
  return `${base}#${hash}`;
}

/** Retrouve la route équivalente dans l'autre langue à partir d'un pathname. */
export function alternatePath(pathname: string, target: Locale): string {
  const clean = pathname.replace(/\/$/, "") || "/";
  for (const key of Object.keys(routes) as RouteKey[]) {
    const r = routes[key];
    if (r.fr === clean || r.en === clean) return r[target];
  }
  return routes.home[target];
}

export function localeFromPath(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "fr";
}
