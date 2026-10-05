import { renderOg } from "@/lib/og";
import type { Locale } from "@/lib/site";

/** Image Open Graph de marque : /og/fr et /og/en, générées au build. */
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: "fr" }, { locale: "en" }];
}

export async function GET(_req: Request, { params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return renderOg(locale as Locale);
}
