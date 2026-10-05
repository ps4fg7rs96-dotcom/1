import { getDict } from "@/content";
import { pageMetadata } from "@/lib/seo";
import { HomePage } from "@/components/pages/HomePage";

export const metadata = pageMetadata("fr", "home", getDict("fr").meta);

export default function Page() {
  return <HomePage locale="fr" />;
}
