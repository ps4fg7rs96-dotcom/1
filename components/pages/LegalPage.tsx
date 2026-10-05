import { getDict } from "@/content";
import type { Locale } from "@/lib/site";
import { routes } from "@/lib/routes";
import { Icon } from "@/components/ui/Icon";

export function LegalPage({ locale, kind }: { locale: Locale; kind: "legal" | "privacy" }) {
  const t = getDict(locale);
  const p = kind === "legal" ? t.legalPage : t.privacyPage;
  return (
    <article className="container-k max-w-3xl py-16 sm:py-20">
      <h1 className="text-4xl font-extrabold sm:text-5xl">{p.title}</h1>
      <p className="mt-3 text-sm text-subtle">{p.updated}</p>
      <p className="mt-8 flex items-start gap-3 rounded-xl border border-dashed border-warning bg-warning-soft p-4 text-sm font-medium text-warning">
        <Icon name="alert" size={18} className="mt-0.5 shrink-0" />
        {p.placeholder}
      </p>
      <div className="mt-10 space-y-8">
        {p.sections.map((s) => (
          <section key={s.h}>
            <h2 className="text-xl font-bold">{s.h}</h2>
            <p className="mt-2 leading-relaxed text-muted">{s.p}</p>
          </section>
        ))}
      </div>
      <p className="mt-12">
        <a href={routes.contact[locale]} className="font-semibold text-link hover:underline">
          {t.common.nav.contact} →
        </a>
      </p>
    </article>
  );
}
