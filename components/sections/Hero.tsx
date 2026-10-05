import type { Dict } from "@/content";
import type { Locale } from "@/lib/site";
import { href } from "@/lib/routes";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Stars } from "@/components/ui/Stars";
import { Ph } from "@/components/ui/Placeholder";
import { SpeedLines } from "@/components/ui/Section";
import { HeroMockup } from "@/components/mockups/Mockups";

export function Hero({ locale, t, m, common }: { locale: Locale; t: Dict["hero"]; m: Dict["mockups"]; common: Dict["common"] }) {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
      <div aria-hidden="true" className="pointer-events-none absolute -top-40 left-1/2 h-[36rem] w-[60rem] -translate-x-1/2 rounded-full bg-blue-600/15 blur-3xl dark:bg-blue-600/25" />

      <div className="container-k relative grid items-center gap-16 pb-20 pt-12 sm:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-12 lg:pb-28 lg:pt-20">
        <div className="text-center lg:text-left">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-muted shadow-xs sm:text-sm">
            <Icon name="bolt" size={16} className="text-accent" />
            {t.eyebrow}
          </p>
          <h1 id="hero-title" className="mt-6 text-[2.35rem] font-extrabold leading-[1.05] sm:text-[3.4rem] xl:text-[3.75rem]">
            {t.titleStart}{" "}
            <span className="relative inline-flex items-center whitespace-nowrap">
              <SpeedLines className="mr-2 scale-125 sm:scale-150" />
              <span className="text-gradient">{t.titleHighlight}</span>
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted lg:mx-0">{t.lead}</p>

          <ul className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm font-medium lg:justify-start">
            {t.points.map((p) => (
              <li key={p} className="inline-flex items-center gap-1.5">
                <span className="grid size-5 place-items-center rounded-full bg-success-soft text-success">
                  <Icon name="check" size={13} strokeWidth={2.5} />
                </span>
                {p}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <ButtonLink href={href(locale, "pricing")} size="lg" icon="arrowRight">
              {t.primary}
            </ButtonLink>
            <ButtonLink href={href(locale, "home", "demos")} size="lg" variant="secondary">
              {t.secondary}
            </ButtonLink>
          </div>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <div className="flex -space-x-2.5" aria-hidden="true">
              {["bg-blue-600", "bg-coral-400", "bg-ink-700", "bg-blue-300", "bg-coral-200"].map((c, i) => (
                <span key={i} className={`grid size-9 place-items-center rounded-full border-2 border-bg text-xs font-bold text-white ${c}`}>
                  {"KLMNO"[i]}
                </span>
              ))}
            </div>
            <div className="text-sm">
              <div className="flex items-center justify-center gap-2 sm:justify-start">
                <Stars />
                <Ph title={common.placeholderTitle} className="font-semibold">
                  {t.proof}
                </Ph>
              </div>
              <p className="mt-0.5 text-xs text-subtle">{t.proofSub}</p>
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-xl lg:max-w-none">
          <HeroMockup t={m} imageAlt={m.heroAlt} />
        </div>
      </div>
    </section>
  );
}
