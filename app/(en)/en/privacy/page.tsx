import { getDict } from "@/content";
import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/pages/LegalPage";

export const metadata = pageMetadata("en", "privacy", getDict("en").meta);

export default function Page() {
  return <LegalPage locale="en" kind="privacy" />;
}
