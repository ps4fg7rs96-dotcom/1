import type { MetadataRoute } from "next";
import { routes, type RouteKey } from "@/lib/routes";
import { absolute } from "@/lib/seo";

const priorities: Record<RouteKey, number> = { home: 1, pricing: 0.9, features: 0.9, contact: 0.6, legal: 0.2, privacy: 0.2 };

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return (Object.keys(routes) as RouteKey[]).flatMap((key) =>
    (["fr", "en"] as const).map((locale) => ({
      url: absolute(routes[key][locale]),
      lastModified: now,
      changeFrequency: key === "home" ? "weekly" : "monthly",
      priority: locale === "fr" ? priorities[key] : Math.max(0.1, priorities[key] - 0.1),
      alternates: { languages: { fr: absolute(routes[key].fr), en: absolute(routes[key].en) } },
    })),
  );
}
