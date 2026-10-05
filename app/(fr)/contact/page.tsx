import { getDict } from "@/content";
import { pageMetadata } from "@/lib/seo";
import { ContactPage } from "@/components/pages/ContactPage";

export const metadata = pageMetadata("fr", "contact", getDict("fr").meta);

export default function Page() {
  return <ContactPage locale="fr" />;
}
