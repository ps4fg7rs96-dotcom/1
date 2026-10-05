import Image from "next/image";
import type { ReactNode } from "react";
import type { Dict } from "@/content";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import { Stars } from "@/components/ui/Stars";
import montre from "@/public/images/demos/montre.webp";
import audio from "@/public/images/demos/audio.webp";
import mode from "@/public/images/demos/mode.webp";
import maison from "@/public/images/demos/maison.webp";
import beaute from "@/public/images/demos/beaute.webp";
import outdoor from "@/public/images/demos/outdoor.webp";

type M = Dict["mockups"];

/** Cadre de navigateur réutilisable pour les maquettes (100 % CSS). */
export function BrowserFrame({ url, children, className }: { url: string; children: ReactNode; className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-2xl border border-border bg-surface shadow-lg", className)}>
      <div className="flex items-center gap-2 border-b border-border bg-surface-2 px-3.5 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-coral-400" />
          <span className="size-2.5 rounded-full bg-amber-400" />
          <span className="size-2.5 rounded-full bg-emerald-400" />
        </span>
        <span className="mx-auto flex h-6 w-1/2 min-w-0 items-center justify-center gap-1.5 truncate rounded-md bg-surface px-3 text-[0.68rem] text-subtle">
          <Icon name="shield" size={12} />
          {url}
        </span>
        <span className="w-10" aria-hidden="true" />
      </div>
      {children}
    </div>
  );
}

/* ── Hero : fiche produit + cartes flottantes ───────────────── */
export function HeroMockup({ t, imageAlt }: { t: M; imageAlt: string }) {
  return (
    <div className="relative">
      <BrowserFrame url={t.url}>
        <div className="grid gap-4 p-4 sm:grid-cols-[1.1fr_1fr] sm:p-5">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-ink-100 sm:aspect-square">
            <Image
              src={montre}
              alt={imageAlt}
              fill
              sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 90vw"
              className="object-cover"
              placeholder="blur"
            />
          </div>
          <div className="flex flex-col gap-3 text-left">
            <Stars />
            <p className="font-display text-lg font-bold leading-tight font-wide">{t.productName}</p>
            <p className="text-xl font-bold text-fg">{t.productPrice}</p>
            <div className="flex gap-2" aria-hidden="true">
              {["bg-ink-50 ring-2 ring-primary ring-offset-2 ring-offset-surface", "bg-ink-950", "bg-blue-600"].map((c, i) => (
                <span key={i} className={cn("size-6 rounded-full border border-border-strong", c)} />
              ))}
            </div>
            <p className="flex items-center gap-1.5 text-xs font-medium text-success">
              <span className="size-2 rounded-full bg-success" aria-hidden="true" />
              {t.inStock}
            </p>
            <span className="mt-auto flex h-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-fg">
              {t.addToCart}
            </span>
          </div>
        </div>
      </BrowserFrame>

      {/* Carte : jauge de livraison */}
      <div className="absolute -bottom-6 left-3 w-60 rounded-xl border border-border bg-surface p-3.5 shadow-lg sm:-left-8 motion-safe:animate-[float_6s_ease-in-out_infinite]">
        <p className="flex items-center gap-2 text-xs font-semibold">
          <Icon name="cart" size={16} className="text-link" />
          {t.freeShipping}
        </p>
        <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-surface-2">
          <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-blue-600 to-coral-400" />
        </div>
      </div>

      {/* Carte : score vitesse */}
      <div className="absolute -right-2 -top-6 flex items-center gap-3 rounded-xl border border-border bg-surface p-3 pr-4 shadow-lg sm:-right-6 motion-safe:animate-[float_7s_ease-in-out_1s_infinite]">
        <ScoreRing value={98} size={44} stroke={4} />
        <div className="text-left">
          <p className="text-[0.68rem] font-medium uppercase tracking-wider text-subtle">{t.pageSpeed}</p>
          <p className="font-display text-sm font-bold font-wide">[98] / 100</p>
        </div>
      </div>
    </div>
  );
}

export function ScoreRing({ value, size = 96, stroke = 7, label }: { value: number; size?: number; stroke?: number; label?: string }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="currentColor" strokeWidth={stroke} className="text-success/15" />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="currentColor"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - value / 100)}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        className="text-success"
      />
      {size >= 64 && (
        <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle" className="fill-fg font-display text-[1.4rem] font-bold">
          {value}
        </text>
      )}
    </svg>
  );
}

/* ── Éditeur visuel ─────────────────────────────────────────── */
export function EditorMockup({ t }: { t: M }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-lg">
      <div className="grid grid-cols-[9.5rem_1fr] sm:grid-cols-[12rem_1fr]">
        <div className="border-r border-border bg-surface-2 p-3">
          <p className="px-1 text-[0.65rem] font-bold uppercase tracking-wider text-subtle">{t.editorSections}</p>
          <ul className="mt-2 space-y-1.5">
            {t.editorBlocks.map((b, i) => (
              <li
                key={b}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-2 py-1.5 text-[0.7rem] font-medium sm:text-xs",
                  i === 2 ? "bg-primary text-primary-fg shadow-glow" : "bg-surface text-fg",
                )}
              >
                <span className="grid grid-cols-2 gap-0.5 opacity-60" aria-hidden="true">
                  {Array.from({ length: 4 }, (_, k) => (
                    <span key={k} className="size-[3px] rounded-full bg-current" />
                  ))}
                </span>
                <span className="truncate">{b}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 flex items-center gap-1.5 rounded-lg border border-dashed border-border-strong px-2 py-1.5 text-[0.7rem] font-semibold text-link sm:text-xs">
            <Icon name="plus" size={14} />
            {t.editorAdd}
          </p>
        </div>
        <div className="space-y-3 p-3 sm:p-4">
          <div className="relative h-24 overflow-hidden rounded-lg sm:h-28">
            <Image src={mode} alt="" fill sizes="(min-width: 1024px) 360px, 60vw" className="object-cover object-top" />
            <div className="absolute inset-0 bg-gradient-to-r from-ink-950/70 to-transparent" />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 space-y-1.5">
              <span className="block h-2.5 w-24 rounded bg-white/90" />
              <span className="block h-2 w-16 rounded bg-white/60" />
              <span className="mt-2 block h-5 w-14 rounded-full bg-coral-400" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[maison, beaute, outdoor].map((img, i) => (
              <div key={i} className="relative aspect-square overflow-hidden rounded-lg">
                <Image src={img} alt="" fill sizes="120px" className="object-cover" />
              </div>
            ))}
          </div>
          <div className="rounded-lg ring-2 ring-primary ring-offset-2 ring-offset-surface">
            <div className="flex items-center justify-around rounded-lg bg-surface-2 px-2 py-2.5">
              {(["shield", "refresh", "clock"] as const).map((n) => (
                <span key={n} className="flex items-center gap-1.5 text-subtle">
                  <Icon name={n} size={14} />
                  <span className="h-1.5 w-8 rounded bg-current opacity-40" />
                </span>
              ))}
            </div>
          </div>
          <div className="space-y-1.5" aria-hidden="true">
            <span className="block h-2 w-3/4 rounded bg-surface-2" />
            <span className="block h-2 w-1/2 rounded bg-surface-2" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Panier tiroir ──────────────────────────────────────────── */
export function CartMockup({ t, upsellAlt }: { t: M; upsellAlt: string }) {
  return (
    <div className="relative mx-auto max-w-md">
      <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-lg">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <p className="font-display font-bold font-wide">{t.cartTitle} · 1</p>
          <Icon name="x" size={18} className="text-subtle" />
        </div>
        <div className="space-y-4 p-5">
          <div className="rounded-xl bg-primary-soft p-3">
            <p className="text-xs font-semibold text-link">{t.freeShipping}</p>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface">
              <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-blue-600 to-coral-400" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-ink-100">
              <Image src={montre} alt="" fill sizes="64px" className="object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{t.productName}</p>
              <p className="text-sm text-muted">{t.productPrice}</p>
            </div>
            <span className="flex items-center gap-2 rounded-full border border-border px-2 py-1 text-xs" aria-hidden="true">
              <Icon name="minus" size={12} /> 1 <Icon name="plus" size={12} />
            </span>
          </div>
          <div className="rounded-xl border border-dashed border-border-strong p-3">
            <p className="text-[0.7rem] font-bold uppercase tracking-wider text-accent-text">{t.upsellTitle}</p>
            <div className="mt-2 flex items-center gap-3">
              <div className="relative size-12 shrink-0 overflow-hidden rounded-lg">
                <Image src={audio} alt={upsellAlt} fill sizes="48px" className="object-cover" />
              </div>
              <p className="flex-1 text-sm font-medium">
                {t.upsellItem} <span className="text-muted">· {t.upsellPrice}</span>
              </p>
              <span className="rounded-full bg-fg px-3 py-1 text-xs font-semibold text-bg">{t.add}</span>
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-border pt-4 text-sm">
            <span className="text-muted">{t.subtotal}</span>
            <span className="font-bold">{t.productPrice}</span>
          </div>
          <span className="flex h-11 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-fg">
            {t.checkout}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Bibliothèque de modèles ────────────────────────────────── */
export function TemplatesMockup({ t }: { t: M }) {
  const imgs = [montre, mode, maison, beaute, outdoor, audio];
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {t.templates.map((name, i) => (
        <div
          key={name}
          className={cn(
            "group overflow-hidden rounded-xl border border-border bg-surface shadow-sm transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-md",
            i === 2 && "ring-2 ring-primary ring-offset-2 ring-offset-bg",
          )}
        >
          <div className="relative aspect-[4/3]">
            <Image src={imgs[i]} alt="" fill sizes="(min-width: 1024px) 160px, 40vw" className="object-cover" />
          </div>
          <div className="space-y-1.5 p-2.5">
            <p className="text-xs font-semibold">{name}</p>
            <span className="block h-1.5 w-3/4 rounded bg-surface-2" aria-hidden="true" />
            <span className="block h-1.5 w-1/2 rounded bg-surface-2" aria-hidden="true" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Landing page native ────────────────────────────────────── */
export function LandingMockup({ t }: { t: M }) {
  return (
    <BrowserFrame url={`${t.url}/pages/lancement`}>
      <div className="relative">
        <div className="relative aspect-[16/9]">
          <Image src={outdoor} alt="" fill sizes="(min-width: 1024px) 520px, 90vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5 text-left">
            <span className="rounded-full bg-coral-400 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-ink-950">
              {t.landingTag}
            </span>
            <p className="mt-2 font-display text-xl font-extrabold text-white font-wide sm:text-2xl">{t.landingTitle}</p>
            <span className="mt-3 inline-flex rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-ink-950">{t.landingCta}</span>
          </div>
        </div>
        <div className="flex items-center justify-between gap-3 bg-ink-950 px-5 py-3 text-white">
          <p className="text-xs text-ink-200">{t.countdown}</p>
          <p className="flex gap-1.5 font-mono text-sm font-bold" aria-hidden="true">
            {["02", "14", "37", "09"].map((n, i) => (
              <span key={i} className="rounded bg-white/10 px-1.5 py-0.5">
                {n}
              </span>
            ))}
          </p>
        </div>
        <div className="grid grid-cols-3 gap-3 p-4">
          {[audio, montre, beaute].map((img, i) => (
            <div key={i} className="space-y-1.5">
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <Image src={img} alt="" fill sizes="120px" className="object-cover" />
              </div>
              <span className="block h-1.5 w-3/4 rounded bg-surface-2" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </BrowserFrame>
  );
}
