import { getDict } from "@/content";
import { pageMetadata } from "@/lib/seo";
import { PricingPage } from "@/components/pages/PricingPage";

export const metadata = pageMetadata("en", "pricing", getDict("en").meta);

export default function Page() {
  return <PricingPage locale="en" />;
}
