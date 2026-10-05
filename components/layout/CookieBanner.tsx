"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useState } from "react";
import type { Dict } from "@/content";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

const KEY = "kinetic-consent";
export const OPEN_COOKIES_EVENT = "kinetic:open-cookies";

type Consent = { necessary: true; analytics: boolean; date: string };

function readConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Consent) : null;
  } catch {
    return null;
  }
}

/**
 * Bannière de consentement RGPD.
 * - Refuser est aussi simple qu'accepter (exigence CNIL).
 * - Aucun traceur n'est chargé sans accord : branchez votre outil d'analytics
 *   dans `onConsent` (voir README).
 */
export function CookieBanner({ t, privacyHref }: { t: Dict["cookies"]; privacyHref: string }) {
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const titleId = useId();
  const toggleId = useId();

  useEffect(() => {
    if (readConsent()) return;
    const id = window.setTimeout(() => setOpen(true), 600);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    const onOpen = () => {
      setAnalytics(readConsent()?.analytics ?? false);
      setDetails(true);
      setOpen(true);
    };
    window.addEventListener(OPEN_COOKIES_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_COOKIES_EVENT, onOpen);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (open) root.setAttribute("data-cookie-open", "");
    else root.removeAttribute("data-cookie-open");
  }, [open]);

  const save = useCallback((value: boolean) => {
    const consent: Consent = { necessary: true, analytics: value, date: new Date().toISOString() };
    try {
      localStorage.setItem(KEY, JSON.stringify(consent));
    } catch {}
    window.dispatchEvent(new CustomEvent("kinetic:consent", { detail: consent }));
    setAnalytics(value);
    setOpen(false);
  }, []);

  if (!open) return null;

  return (
    <div
      role="region"
      aria-labelledby={titleId}
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-xl rounded-2xl border border-border bg-surface p-5 text-sm shadow-lg sm:inset-x-auto sm:left-6 sm:bottom-6 sm:p-6"
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 hidden size-9 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent-text sm:grid">
          <Icon name="cookie" />
        </span>
        <div className="min-w-0">
          <p id={titleId} className="font-display text-base font-bold font-wide">
            {t.title}
          </p>
          <p className="mt-1.5 leading-relaxed text-muted">
            {t.text}{" "}
            <Link href={privacyHref} className="font-semibold text-link underline underline-offset-2">
              {t.learnMore}
            </Link>
          </p>
        </div>
      </div>

      {details && (
        <ul className="mt-4 space-y-3 rounded-xl bg-surface-2 p-4">
          <li className="flex items-start justify-between gap-4">
            <div>
              <p className="font-semibold">{t.necessary}</p>
              <p className="text-muted">{t.necessaryText}</p>
            </div>
            <span className="shrink-0 rounded-full bg-success-soft px-2 py-0.5 text-xs font-semibold text-success">{t.alwaysOn}</span>
          </li>
          <li className="flex items-start justify-between gap-4">
            <div>
              <label htmlFor={toggleId} className="font-semibold">
                {t.analytics}
              </label>
              <p className="text-muted">{t.analyticsText}</p>
            </div>
            <button
              id={toggleId}
              type="button"
              role="switch"
              aria-checked={analytics}
              onClick={() => setAnalytics((v) => !v)}
              className="group relative mt-0.5 h-6 w-11 shrink-0 rounded-full bg-ink-300 transition-colors dark:bg-ink-600 aria-checked:bg-primary dark:aria-checked:bg-primary"
            >
              <span className="absolute left-0.5 top-0.5 size-5 rounded-full bg-white shadow transition-transform group-aria-checked:translate-x-5" />
            </button>
          </li>
        </ul>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        <Button size="sm" variant="secondary" onClick={() => save(false)}>
          {t.reject}
        </Button>
        <Button size="sm" onClick={() => save(true)}>
          {t.accept}
        </Button>
        {details ? (
          <Button size="sm" variant="ghost" onClick={() => save(analytics)}>
            {t.save}
          </Button>
        ) : (
          <Button size="sm" variant="ghost" onClick={() => setDetails(true)}>
            {t.customize}
          </Button>
        )}
      </div>
    </div>
  );
}

export function CookieSettingsButton({ label, className }: { label: string; className?: string }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(OPEN_COOKIES_EVENT))}>
      {label}
    </button>
  );
}
