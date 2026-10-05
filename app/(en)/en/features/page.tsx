import { getDict } from "@/content";
import { pageMetadata } from "@/lib/seo";
import { FeaturesPage } from "@/components/pages/FeaturesPage";

export const metadata = pageMetadata("en", "features", getDict("en").meta);

export default function Page() {
  return <FeaturesPage locale="en" />;
}
