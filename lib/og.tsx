import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getDict } from "@/content";
import type { Locale } from "./site";

export const ogSize = { width: 1200, height: 630 };

async function fonts() {
  const dir = join(process.cwd(), "assets/fonts");
  const [display, body] = await Promise.all([
    readFile(join(dir, "Archivo-ExtraBold-Wide.ttf")),
    readFile(join(dir, "Inter-Medium.ttf")),
  ]);
  return [
    { name: "Archivo", data: display, weight: 800 as const, style: "normal" as const },
    { name: "Inter", data: body, weight: 500 as const, style: "normal" as const },
  ];
}

function Mark({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64">
      <rect width="64" height="64" rx="13.5" fill="#2B37DE" />
      <rect x="19.6" y="14.9" width="8.4" height="34.9" rx="1.6" fill="#F1EFEA" />
      <path d="M28 27.8 42.4 14.9h9.7L35.7 32.3l16.4 17.5h-9.7L28 36.8z" fill="#F1EFEA" />
      <rect x="6.7" y="23" width="8.9" height="3.8" rx="1.9" fill="#EC7454" />
      <rect x="4.2" y="30.4" width="11.4" height="3.8" rx="1.9" fill="#EC7454" />
      <rect x="6.7" y="37.8" width="8.9" height="3.8" rx="1.9" fill="#EC7454" />
    </svg>
  );
}

/** Image Open Graph de marque, générée au build (aucune image externe). */
export async function renderOg(locale: Locale) {
  const t = getDict(locale);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "radial-gradient(circle at 85% 10%, rgba(43,55,222,0.55), transparent 55%), #121214",
          color: "#F1EFEA",
          fontFamily: "Inter",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <Mark size={84} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontFamily: "Archivo", fontSize: 44, letterSpacing: -0.5 }}>KINETIC</span>
            <span style={{ fontSize: 18, letterSpacing: 5, color: "#A3A3A9", textTransform: "uppercase" }}>
              {locale === "fr" ? "Thème Shopify" : "Shopify theme"}
            </span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12 }}>
            <div style={{ width: 54, height: 16, borderRadius: 8, background: "#EC7454" }} />
            <div style={{ width: 80, height: 16, borderRadius: 8, background: "#EC7454" }} />
            <div style={{ width: 54, height: 16, borderRadius: 8, background: "#EC7454" }} />
          </div>
          <div style={{ display: "flex", fontFamily: "Archivo", fontSize: 66, lineHeight: 1.05, maxWidth: 900, letterSpacing: -1.5 }}>
            {`${t.hero.titleStart} ${t.hero.titleHighlight}`}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#A3A3A9" }}>
          <span>{t.common.reassurance.join("  ·  ")}</span>
          <span style={{ color: "#F1EFEA" }}>kinetic-theme.com</span>
        </div>
      </div>
    ),
    { ...ogSize, fonts: await fonts() },
  );
}
