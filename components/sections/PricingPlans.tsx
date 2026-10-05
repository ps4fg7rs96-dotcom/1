"use client";

import { useId, useState } from "react";
import type { Dict } from "@/content";
import type { Locale } from "@/lib/site";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import { ButtonLink } from "@/components/ui/Button";

type Billing = "monthly" | "yearly";

export function PricingPlans({ locale, t, contactHref }: { locale: Locale; t: Dict["pricingPage"]; contactHref: string }) {
  const [billing, setBilling] = useState<Billing>("yearly");
  const name = useId();
  const lang = locale === "fr" ? "fr-FR" : "en-IE";
  const fmt = (n: number) => new Intl.NumberFormat(lang).format(n);
  const money = (n: number) => new Intl.NumberFormat(lang, { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
  const prices = [site.prices.solo, site.prices.growth];

  return (
    <div>
      <fieldset className="mx-auto flex w-fit items-center gap-1 rounded-full border border-border bg-surface p-1 shadow-xs">
        <legend className="sr-only">{t.billingLabel}</legend>
        {(["monthly", "yearly"] as const).map((b) => (
          <label
            key={b}
            className={cn(
              "relative flex cursor-pointer items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ring",
              billing === b ? "bg-fg text-bg" : "text-muted hover:text-fg",
            )}
          >
            <input type="radio" name={name} value={b} checked={billing === b} onChange={() => setBilling(b)} className="sr-only" />
            {b === "monthly" ? t.monthly : t.yearly}
            {b === "yearly" && (
              <span className="rounded-full bg-coral-400 px-2 py-0.5 text-[0.7rem] font-bold text-ink-950">{t.yearlyBadge}</span>
            )}
          </label>
        ))}
      </fieldset>

      <ul className="mt-12 grid gap-6 lg:grid-cols-3 lg:items-stretch">
        {t.plans.map((plan, i) => {
          const featured = i === 1;
          const price = prices[i];
          const amount = price ? (billing === "yearly" ? price.yearly : price.monthly) : null;
          return (
            <li
              key={plan.id}
              className={cn(
                "relative flex flex-col rounded-3xl border p-7 sm:p-8",
                featured ? "border-transparent bg-ink-950 text-ink-50 shadow-lg ring-2 ring-primary dark:bg-ink-900" : "border-border bg-surface",
              )}
            >
              {featured && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3.5 py-1 text-xs font-bold text-primary-fg shadow-glow">
                  {t.popular}
                </span>
              )}
              <h2 className="text-2xl font-extrabold">{plan.name}</h2>
              <p className={cn("mt-2 min-h-[4.5rem]", featured ? "text-ink-300" : "text-muted")}>{plan.desc}</p>

              <div className="mt-6 min-h-24">
                {amount !== null ? (
                  <>
                    <p className="flex items-baseline gap-1.5">
                      <span className="font-display text-5xl font-extrabold font-wide tabular-nums">{fmt(amount)}</span>
                      <span className={cn("text-sm", featured ? "text-ink-300" : "text-muted")}>{t.perMonth}</span>
                    </p>
                    <p className={cn("mt-1.5 text-sm", featured ? "text-ink-300" : "text-muted")} aria-live="polite">
                      {billing === "yearly" ? `${t.billedYearly} (${money(amount * 12)})` : t.billedMonthly}
                    </p>
                  </>
                ) : (
                  <p className="font-display text-4xl font-extrabold font-wide">{t.onQuote}</p>
                )}
              </div>

              <ButtonLink
                href={plan.id === "studio" ? `${contactHref}?sujet=agence` : `${site.signupUrl}?plan=${plan.id}&billing=${billing}`}
                variant={featured ? "primary" : "secondary"}
                size="lg"
                icon="arrowRight"
                className="mt-6 w-full"
              >
                {plan.cta}
              </ButtonLink>

              <ul className={cn("mt-8 space-y-3 border-t pt-6 text-[0.95rem]", featured ? "border-white/10" : "border-border")}>
                {plan.features.map((f) => {
                  const isHeader = f.endsWith(":");
                  return (
                    <li key={f} className={cn("flex items-start gap-2.5", isHeader && "font-semibold")}>
                      {!isHeader && (
                        <Icon name="check" size={18} strokeWidth={2.25} className={cn("mt-0.5 shrink-0", featured ? "text-coral-300" : "text-success")} />
                      )}
                      {f}
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
