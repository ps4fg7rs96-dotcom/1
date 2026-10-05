import "../globals.css";
import type { ReactNode } from "react";
import { SiteShell } from "@/components/layout/SiteShell";
import { rootMetadata, rootViewport } from "@/lib/layoutMeta";

export const metadata = rootMetadata("fr");
export const viewport = rootViewport;

export default function FrenchLayout({ children }: { children: ReactNode }) {
  return <SiteShell locale="fr">{children}</SiteShell>;
}
