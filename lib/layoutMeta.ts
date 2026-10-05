import type { Metadata, Viewport } from "next";
import { getDict } from "@/content";
import { site, type Locale } from "./site";

export function rootMetadata(locale: Locale): Metadata {
  const t = getDict(locale).meta;
  return {
    metadataBase: new URL(site.url),
    title: { default: t.siteTitle, template: `%s` },
    description: t.siteDescription,
    applicationName: site.name,
    authors: [{ name: site.name }],
    creator: site.name,
    formatDetection: { telephone: false },
    robots: { index: true, follow: true },
  };
}

export const rootViewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FBFAF7" },
    { media: "(prefers-color-scheme: dark)", color: "#121214" },
  ],
};
