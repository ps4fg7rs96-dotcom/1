import localFont from "next/font/local";

/**
 * Polices auto-hébergées, instanciées depuis les versions variables Google Fonts (OFL)
 * avec fontTools pour ne garder que ce que le site utilise :
 *  - Archivo : largeur figée à 112 % (look « étendu » du logotype), graisses 700–800 → 24 Ko (au lieu de 88 Ko)
 *  - Inter : taille optique 14, graisses 400–700 → 35 Ko (au lieu de 71 Ko)
 * Voir DECISIONS.md (D-12) pour régénérer les fichiers.
 */
export const archivo = localFont({
  src: "../assets/fonts/Archivo-Wide-700-800.woff2",
  weight: "700 800",
  variable: "--font-archivo",
  display: "swap",
  fallback: ["Arial Black", "Arial", "sans-serif"],
});

export const inter = localFont({
  src: "../assets/fonts/Inter-400-700.woff2",
  weight: "400 700",
  variable: "--font-inter",
  display: "swap",
  preload: false,
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Arial", "sans-serif"],
});
