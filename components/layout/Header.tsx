"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import type { Dict } from "@/content";
import type { Locale } from "@/lib/site";
import { site } from "@/lib/site";
import { href } from "@/lib/routes";
import { cn } from "@/lib/cn";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";
import { ButtonLink } from "@/components/ui/Button";
import { ThemeToggle } from "./ThemeToggle";
import { LangSwitch } from "./LangSwitch";

export function Header({ locale, t }: { locale: Locale; t: Dict["common"] }) {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const nav = [
    { label: t.nav.features, href: href(locale, "features"), key: "features" },
    { label: t.nav.demos, href: href(locale, "home", "demos"), key: "demos" },
    { label: t.nav.reviews, href: href(locale, "home", "avis"), key: "reviews" },
    { label: t.nav.pricing, href: href(locale, "pricing"), key: "pricing" },
    { label: t.nav.contact, href: href(locale, "contact"), key: "contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (h: string) => !h.includes("#") && pathname === h;

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled || open
          ? "border-border bg-bg/85 backdrop-blur-xl supports-[backdrop-filter]:bg-bg/75"
          : "border-transparent bg-bg",
      )}
    >
      <div className="container-k flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
        <Link href={href(locale, "home")} className="rounded-lg">
          <Logo />
          <span className="sr-only"> — {t.breadcrumbHome}</span>
        </Link>

        <nav aria-label={t.mainNav} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-[0.94rem] font-medium transition-colors hover:text-fg",
                    isActive(item.href) ? "text-fg" : "text-muted",
                    "after:absolute after:inset-x-3.5 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-accent after:transition-transform hover:after:scale-x-100",
                    isActive(item.href) && "after:scale-x-100",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <span className="hidden sm:contents">
            <LangSwitch locale={locale} label={t.langSwitch} short={t.langSwitchShort} aria={t.langSwitchAria} />
          </span>
          <ThemeToggle label={t.themeToggle} />
          <a href={site.loginUrl} className="hidden rounded-full px-3 py-2 text-sm font-semibold text-fg hover:bg-surface-2 xl:block">
            {t.login}
          </a>
          <span className="ml-1 hidden sm:contents">
            <ButtonLink href={href(locale, "pricing")} size="sm">
              {t.ctaTrial}
            </ButtonLink>
          </span>
          <button
            ref={buttonRef}
            type="button"
            className="ml-1 grid size-10 place-items-center rounded-full text-fg hover:bg-surface-2 lg:hidden"
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? t.closeMenu : t.openMenu}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? "x" : "menu"} size={22} />
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full z-40 h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-t border-border bg-bg pb-12 lg:hidden"
      >
        <nav aria-label={t.mainNav} className="container-k flex min-h-full flex-col py-6">
          <ul className="flex flex-col">
            {nav.map((item, i) => (
              <li key={item.key} className="border-b border-border">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="flex items-center justify-between py-4 font-display text-2xl font-bold font-wide"
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  {item.label}
                  <Icon name="arrowRight" className="text-accent" />
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3">
            <ButtonLink href={href(locale, "pricing")} size="lg" icon="arrowRight" onClick={() => setOpen(false)}>
              {t.ctaTrialLong}
            </ButtonLink>
            <a href={site.loginUrl} className="py-3 text-center font-semibold text-fg">
              {t.login}
            </a>
            <LangSwitch locale={locale} label={t.langSwitch} short={t.langSwitch} aria={t.langSwitchAria} className="mx-auto" />
          </div>
        </nav>
      </div>
    </header>
  );
}
