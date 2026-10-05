import type { Dict } from "@/content";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/Section";
import { ScoreRing } from "@/components/mockups/Mockups";
import { Ph } from "@/components/ui/Placeholder";

/** Bande sombre « Performance » — force le thème sombre localement. */
export function Performance({ t, phTitle }: { t: Dict["performance"]; phTitle: string }) {
  return (
    <section aria-labelledby="perf-title" className="dark relative overflow-hidden bg-ink-950 py-20 text-fg sm:py-24 lg:py-28" style={{ colorScheme: "dark" }}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-1/3 h-96 w-[40rem] -rotate-12 rounded-full bg-blue-600/25 blur-3xl" />
      <div className="container-k relative">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading id="perf-title" align="left" eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
            <ul className="mt-10 space-y-6">
              {t.points.map((p, i) => (
                <li key={p.title} data-reveal style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties} className="flex gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/5 text-coral-300 ring-1 ring-white/10">
                    <Icon name={p.icon} size={22} />
                  </span>
                  <div>
                    <h3 className="font-bold">{p.title}</h3>
                    <p className="mt-1 text-muted">{p.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">{t.scoresTitle}</p>
            <ul className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {t.scores.map((s) => (
                <li key={s.label} className="flex flex-col items-center gap-2 text-center">
                  <ScoreRing value={s.value} size={84} stroke={6} label={`${s.label} : ${s.value}/100`} />
                  <span className="text-sm text-muted">{s.label}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10 border-t border-white/10 pt-8">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">{t.loadTitle}</p>
              <ul className="mt-5 space-y-4">
                {t.loadRows.map((r) => (
                  <li key={r.label}>
                    <div className="flex items-baseline justify-between text-sm">
                      <span className={cn("font-semibold", r.brand ? "text-white" : "text-muted")}>{r.label}</span>
                      <Ph title={phTitle} className="font-mono font-bold text-white">
                        {r.value}
                      </Ph>
                    </div>
                    <div className="mt-2 h-3 overflow-hidden rounded-full bg-white/5">
                      <div
                        className={cn("h-full rounded-full", r.brand ? "bg-gradient-to-r from-blue-500 to-coral-400" : "bg-ink-600")}
                        style={{ width: `${r.width}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-6 text-xs text-subtle">{t.scoresNote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
