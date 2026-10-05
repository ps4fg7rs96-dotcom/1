/**
 * Configuration globale du site.
 * ⚠️ Les valeurs marquées [PLACEHOLDER] sont à confirmer (voir PLACEHOLDERS.md).
 */
export const site = {
  name: "Kinetic",
  legalName: "Kinetic Studio SAS", // [PLACEHOLDER] raison sociale
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://kinetic-theme.com").replace(/\/$/, ""), // [PLACEHOLDER] domaine
  email: "bonjour@kinetic-theme.com", // [PLACEHOLDER]
  supportEmail: "support@kinetic-theme.com", // [PLACEHOLDER]
  loginUrl: "https://app.kinetic-theme.com/login", // [PLACEHOLDER] espace membre
  signupUrl: "https://app.kinetic-theme.com/signup", // [PLACEHOLDER] inscription à l'essai
  demoBaseUrl: "https://demo.kinetic-theme.com", // [PLACEHOLDER] boutiques démo
  trialDays: 21, // [PLACEHOLDER] durée de l'essai gratuit
  refundDays: 30, // [PLACEHOLDER] garantie satisfait ou remboursé
  prices: {
    // [PLACEHOLDER] grille tarifaire (€ HT / mois)
    solo: { monthly: 39, yearly: 31 },
    growth: { monthly: 79, yearly: 63 },
  },
  themeColor: "#2B37DE",
} as const;

export type Locale = "fr" | "en";
export const locales: Locale[] = ["fr", "en"];
