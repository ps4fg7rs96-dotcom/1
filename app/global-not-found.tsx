import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import { archivo, inter } from "@/lib/fonts";
import { fr } from "@/content/fr";
import { en } from "@/content/en";
import { ThemeScript } from "@/components/layout/ThemeScript";
import { LogoMark } from "@/components/ui/Logo";
import { buttonClasses } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "404 — Kinetic",
  description: fr.notFound.text,
  robots: { index: false, follow: true },
};

/** Page 404 globale, bilingue (le site a deux layouts racines FR / EN). */
export default function GlobalNotFound() {
  return (
    <html lang="fr" className={`${archivo.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>
        <main className="relative grid min-h-dvh place-items-center overflow-hidden px-4 py-16">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
          <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/3 h-96 w-[44rem] -translate-x-1/2 rounded-full bg-blue-600/15 blur-3xl" />
          <div className="relative max-w-2xl text-center">
            <Link href="/" aria-label="Kinetic — Accueil" className="inline-flex">
              <LogoMark className="size-14" />
            </Link>
            <p aria-hidden="true" className="mt-8 flex items-center justify-center gap-4 font-display text-[7rem] font-extrabold leading-none sm:text-[10rem]" style={{ fontStretch: "125%" }}>
              <span className="flex flex-col items-end gap-2.5">
                <span className="h-3 w-10 rounded-full bg-coral-400 motion-safe:animate-speed sm:w-14" />
                <span className="h-3 w-16 rounded-full bg-coral-400 motion-safe:animate-speed [animation-delay:150ms] sm:w-20" />
                <span className="h-3 w-10 rounded-full bg-coral-400 motion-safe:animate-speed [animation-delay:300ms] sm:w-14" />
              </span>
              <span className="text-gradient">404</span>
            </p>
            <h1 className="mt-6 text-3xl font-extrabold sm:text-4xl">{fr.notFound.title}</h1>
            <p className="mt-3 text-lg text-muted">{fr.notFound.text}</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/" className={buttonClasses("primary", "lg")}>
                {fr.notFound.home}
              </Link>
              <Link href="/contact" className={buttonClasses("secondary", "lg")}>
                {fr.notFound.contact}
              </Link>
            </div>

            <div lang="en" className="mt-12 border-t border-border pt-8">
              <p className="font-display text-xl font-bold font-wide">{en.notFound.title}</p>
              <p className="mt-2 text-muted">{en.notFound.text}</p>
              <p className="mt-4 flex justify-center gap-6 font-semibold">
                <Link href="/en" className="text-link hover:underline">
                  {en.notFound.home}
                </Link>
                <Link href="/en/contact" className="text-link hover:underline">
                  {en.notFound.contact}
                </Link>
              </p>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
