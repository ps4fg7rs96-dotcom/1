import type { Dict } from "@/content";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export function FinalCta({
  t,
  reassurance,
  primaryHref,
  secondaryHref,
}: {
  t: Dict["finalCta"];
  reassurance: string[];
  primaryHref: string;
  secondaryHref: string;
}) {
  return (
    <section aria-labelledby="final-cta-title" className="py-20 sm:py-24">
      <div className="container-k">
        <div data-reveal className="relative overflow-hidden rounded-[2rem] bg-primary px-6 py-16 text-center text-primary-fg shadow-glow sm:px-12 lg:py-20">
          {/* Lignes de vitesse décoratives, reprises du logo */}
          <div aria-hidden="true" className="absolute left-10 top-1/2 hidden -translate-y-1/2 flex-col items-end gap-3 xl:flex">
            <span className="h-3 w-16 rounded-full bg-coral-400" />
            <span className="h-3 w-24 rounded-full bg-coral-400" />
            <span className="h-3 w-16 rounded-full bg-coral-400" />
          </div>
          <div aria-hidden="true" className="absolute -right-20 -top-20 size-72 rounded-full bg-white/10 blur-2xl" />
          <div aria-hidden="true" className="absolute -bottom-28 left-1/3 size-72 rounded-full bg-coral-400/25 blur-3xl" />

          <h2 id="final-cta-title" className="relative mx-auto max-w-3xl text-3xl font-extrabold sm:text-5xl">
            {t.title}
          </h2>
          <p className="relative mx-auto mt-5 max-w-xl text-lg text-blue-50">{t.lead}</p>
          <div className="relative mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href={primaryHref} variant="inverse" size="lg" icon="arrowRight">
              {t.primary}
            </ButtonLink>
            <ButtonLink href={secondaryHref} size="lg" className="bg-transparent shadow-none ring-1 ring-inset ring-white/50 hover:bg-white/10">
              {t.secondary}
            </ButtonLink>
          </div>
          <ul className="relative mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-blue-50">
            {reassurance.map((r) => (
              <li key={r} className="inline-flex items-center gap-1.5">
                <Icon name="check" size={16} strokeWidth={2.5} />
                {r}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
