import { getDict } from "@/content";
import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/pages/LegalPage";

export const metadata = pageMetadata("fr", "legal", getDict("fr").meta);

export default function Page() {
  return <LegalPage locale="fr" kind="legal" />;
}
