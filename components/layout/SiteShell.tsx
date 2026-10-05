import type { ReactNode } from "react";
import { getDict } from "@/content";
import type { Locale } from "@/lib/site";
import { href } from "@/lib/routes";
import { archivo, inter } from "@/lib/fonts";
import { JsonLd, organizationLd } from "@/lib/seo";
import { ThemeScript } from "./ThemeScript";
import { AnnouncementBar } from "./AnnouncementBar";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CookieBanner } from "./CookieBanner";
import { StickyCta } from "./StickyCta";
import { RevealObserver } from "./RevealObserver";

/** Squelette HTML commun aux deux layouts racines (FR / EN). */
export function SiteShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  const t = getDict(locale);
  return (
    <html lang={locale} className={`${archivo.variable} ${inter.variable}`} suppressHydrationWarning>
      {/* eslint-disable-next-line @next/next/no-head-element -- <head> est valide dans un layout racine App Router */}
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-dvh">
        <a
          href="#contenu"
          className="sr-only z-[60] rounded-full bg-primary px-5 py-3 font-semibold text-primary-fg focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          {t.common.skipToContent}
        </a>
        <AnnouncementBar t={t.common.announcement} href={href(locale, "features")} />
        <Header locale={locale} t={t.common} />
        <main id="contenu" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer locale={locale} t={t.footer} common={t.common} />
        <StickyCta text={t.stickyCta.text} cta={t.stickyCta.cta} href={href(locale, "pricing")} />
        <CookieBanner t={t.cookies} privacyHref={href(locale, "privacy")} />
        <RevealObserver />
        <JsonLd data={organizationLd(locale, t)} />
      </body>
    </html>
  );
}
