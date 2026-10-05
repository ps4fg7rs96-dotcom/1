import { getDict } from "@/content";
import { pageMetadata } from "@/lib/seo";
import { PricingPage } from "@/components/pages/PricingPage";

export const metadata = pageMetadata("fr", "pricing", getDict("fr").meta);

export default function Page() {
  return <PricingPage locale="fr" />;
}
