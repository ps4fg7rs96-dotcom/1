import "../../globals.css";
import type { ReactNode } from "react";
import { SiteShell } from "@/components/layout/SiteShell";
import { rootMetadata, rootViewport } from "@/lib/layoutMeta";

export const metadata = rootMetadata("en");
export const viewport = rootViewport;

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return <SiteShell locale="en">{children}</SiteShell>;
}
