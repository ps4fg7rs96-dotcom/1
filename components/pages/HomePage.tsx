import { getDict } from "@/content";
import type { Locale } from "@/lib/site";
import { href } from "@/lib/routes";
import { JsonLd, faqLd } from "@/lib/seo";
import { Hero } from "@/components/sections/Hero";
import { LogoCloud } from "@/components/sections/LogoCloud";
import { Benefits } from "@/components/sections/Benefits";
import { FeatureRows } from "@/components/sections/FeatureRows";
import { Performance } from "@/components/sections/Performance";
import { Demos } from "@/components/sections/Demos";
import { Comparison } from "@/components/sections/Comparison";
import { Steps } from "@/components/sections/Steps";
import { Stats } from "@/components/sections/Stats";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";

export function HomePage({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const ph = t.common.placeholderTitle;
  return (
    <>
      <Hero locale={locale} t={t.hero} m={t.mockups} common={t.common} />
      <LogoCloud t={t.logos} />
      <Benefits t={t.benefits} />
      <FeatureRows locale={locale} t={t.featureRows} m={t.mockups} cta={t.common.ctaFeatures} />
      <Performance t={t.performance} phTitle={ph} />
      <Demos t={t.demos} />
      <Comparison t={t.comparison} phTitle={ph} cta={t.common.ctaTrialLong} ctaHref={href(locale, "pricing")} />
      <Steps t={t.steps} />
      <Stats t={t.stats} phTitle={ph} />
      <Testimonials t={t.testimonials} phTitle={ph} />
      <Faq t={t.faq} contactHref={href(locale, "contact")} />
      <FinalCta
        t={t.finalCta}
        reassurance={t.common.reassurance}
        primaryHref={href(locale, "pricing")}
        secondaryHref={href(locale, "contact")}
      />
      <JsonLd data={faqLd(t.faq.items)} />
    </>
  );
}
