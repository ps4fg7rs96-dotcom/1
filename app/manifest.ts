import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — Thème Shopify`,
    short_name: site.name,
    description: "Le thème Shopify rapide, pensé pour la conversion.",
    start_url: "/",
    display: "standalone",
    background_color: "#121214",
    theme_color: site.themeColor,
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
