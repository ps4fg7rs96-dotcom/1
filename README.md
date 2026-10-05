# Kinetic — site vitrine

Site vitrine de **Kinetic**, thème Shopify rapide et pensé pour la conversion.
Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · TypeScript · 100 % statique · FR / EN.

| Documents | |
|---|---|
| [BRAND.md](BRAND.md) | Identité : logo, palette, typos, ton, icônes, rayons, ombres |
| [DECISIONS.md](DECISIONS.md) | Analyse de la référence et décisions prises |
| [IMPROVEMENTS.md](IMPROVEMENTS.md) | Améliorations ajoutées et pourquoi |
| [PLACEHOLDERS.md](PLACEHOLDERS.md) | **Tout ce qu'il faut remplacer avant la mise en ligne** |

## Installation

Prérequis : Node.js ≥ 20.9 (testé avec 22) et npm.

```bash
npm install
cp .env.example .env.local   # puis ajustez les valeurs
```

## Lancement

```bash
npm run dev        # développement → http://localhost:3000
npm run build      # build de production
npm start          # serveur de production (après build)
npm run lint       # ESLint (config Next.js)
npm run typecheck  # TypeScript strict
```

## Pages

| FR | EN |
|---|---|
| `/` | `/en` |
| `/fonctionnalites` | `/en/features` |
| `/tarifs` | `/en/pricing` |
| `/contact` | `/en/contact` |
| `/mentions-legales` | `/en/legal` |
| `/confidentialite` | `/en/privacy` |

Plus : `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`, images Open Graph générées, 404 bilingue.

## Déploiement sur Vercel

1. Poussez le dépôt sur GitHub / GitLab / Bitbucket.
2. Sur [vercel.com/new](https://vercel.com/new), importez le dépôt : le framework **Next.js** est détecté automatiquement (aucun réglage de build à modifier).
3. Dans *Settings → Environment Variables*, ajoutez :
   - `NEXT_PUBLIC_SITE_URL` = votre domaine final (ex. `https://kinetic-theme.com`) — utilisé pour les canonical, le sitemap et l'Open Graph ;
   - `CONTACT_WEBHOOK_URL` (optionnel) = URL qui recevra les messages du formulaire en JSON.
4. Déployez, puis rattachez votre domaine dans *Settings → Domains*.

En ligne de commande : `npm i -g vercel && vercel --prod`.

## Architecture

```
app/
  (fr)/…               layout racine FR (<html lang="fr">) + pages FR
  (en)/en/…            layout racine EN (<html lang="en">) + pages EN
  actions/contact.ts   Server Action du formulaire
  global-not-found.tsx 404 bilingue
  globals.css          ★ design tokens (couleurs, rayons, ombres, polices, animations)
  og/[locale]/route.tsx images Open Graph (/og/fr, /og/en)
  sitemap.ts, robots.ts, manifest.ts, icon.svg, apple-icon.tsx
components/
  layout/   Header, Footer, AnnouncementBar, CookieBanner, StickyCta, ThemeToggle, LangSwitch…
  sections/ Hero, Benefits, FeatureRows, Performance, Demos, Comparison, Steps, Stats,
            Testimonials, Faq, FinalCta, PricingPlans, ContactForm, PageHero…
  mockups/  maquettes UI en CSS (fiche produit, éditeur, panier, modèles, landing)
  pages/    assemblage des pages (partagé FR/EN)
  ui/       Button, Icon, Logo, Section, Placeholder (<Ph>), Stars
content/    fr.ts (référence) · en.ts (typé sur fr) → TOUS les textes
lib/        site.ts (config & placeholders business), routes.ts, seo.tsx, og.tsx, fonts.ts, contact.ts
assets/fonts  polices auto-hébergées (woff2 site + ttf pour les images OG)
```

### Modifier…
- **un texte** → `content/fr.ts` et `content/en.ts` (le build échoue si une clé manque en anglais) ;
- **une couleur / un rayon / une ombre** → `app/globals.css` ;
- **prix, durée d'essai, e-mails, URL** → `lib/site.ts` ;
- **une page / un slug** → `lib/routes.ts` + dossier correspondant dans `app/`.

### Brancher un outil d'analytics (après consentement)
La bannière émet `window` → `kinetic:consent` (`detail.analytics: boolean`) et stocke le choix dans `localStorage["kinetic-consent"]`. Chargez votre script uniquement si `analytics === true`.

### Polices
Les fichiers de `assets/fonts/*.woff2` sont des instances réduites des polices variables Google Fonts (licence OFL) :

```bash
pip install fonttools brotli
python3 -c "
from fontTools.ttLib import TTFont; from fontTools.varLib import instancer
f=TTFont('Archivo-variable-latin.woff2'); i=instancer.instantiateVariableFont(f,{'wdth':112,'wght':(700,800)}); i.flavor='woff2'; i.save('Archivo-Wide-700-800.woff2')
f=TTFont('Inter-variable-latin.woff2');   i=instancer.instantiateVariableFont(f,{'opsz':14,'wght':(400,700)});   i.flavor='woff2'; i.save('Inter-400-700.woff2')"
```

## Qualité vérifiée

Lighthouse 12, build de production local, Chromium headless (Performance / Accessibilité / Bonnes pratiques / SEO) :

| Page | Mobile | Desktop |
|---|---|---|
| `/` | 97 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
| `/fonctionnalites` | 97 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
| `/tarifs` | 99 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
| `/contact` | 97 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
| `/en` | 95 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
| `/en/pricing` | 96 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
| `/mentions-legales` | 99 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |

CLS ≤ 0,02 partout. Les scores de performance mobile varient de ±3 points d'un passage à l'autre (simulation 4G lente).
Tests fonctionnels Playwright (bannière cookies, menu mobile + Échap, thème persistant, carrousel, CTA collant, bascule de langue, toggle de prix, formulaire : erreurs / succès / pré-remplissage) : tous au vert, aucune erreur console. Pas de défilement horizontal de 320 à 1440 px.

## Crédits

- **Photos** : [Unsplash](https://unsplash.com/license) (licence Unsplash, usage commercial libre). Fichiers sources :
  `photo-1523275335684-37898b6baf30` (montre), `photo-1505740420928-5e560c06d30e` (casque), `photo-1515886657613-9f3515b0c78f` (mode), `photo-1608571423902-eed4a5ad8108` (sérum), `photo-1586023492125-27b2c045efd7` (fauteuil), `photo-1501555088652-021faa106b9b` (randonnée), `photo-1447933601403-0c6688de566e` (café) — accessibles via `https://images.unsplash.com/<id>`. Pensez à créditer nommément les photographes depuis leur page Unsplash si vous les conservez.
- **Polices** : Archivo (Omnibus-Type) et Inter (Rasmus Andersson), SIL Open Font License 1.1.
- **Icônes, logo, maquettes** : créés pour le projet.
