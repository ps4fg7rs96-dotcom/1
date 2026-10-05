# Kinetic — thème Shopify + site vitrine

Ce dépôt contient trois livrables autour de la marque **Kinetic** :

| Livrable | Où | Quoi |
|---|---|---|
| **Thème Shopify** (Online Store 2.0) | [`theme/`](theme) → **[`theme.zip`](theme.zip)** | Thème complet, importable tel quel, éditable sans code |
| **Démo autonome** | **[`demo/demo.html`](demo/demo.html)** | Page d'accueil du thème en un seul fichier HTML, avec l'éditeur en direct interactif |
| Site vitrine (Next.js) | `app/`, `components/`… | Site marketing de la marque (livré précédemment) |

| Documents | |
|---|---|
| [BRAND.md](BRAND.md) | Identité : logo, palette, typos, ton, icônes, rayons, ombres |
| [DECISIONS.md](DECISIONS.md) | Analyse de la référence et décisions prises |
| [IMPROVEMENTS.md](IMPROVEMENTS.md) | Améliorations ajoutées et pourquoi |
| [PLACEHOLDERS.md](PLACEHOLDERS.md) | **Tout ce qu'il faut remplacer avant la mise en ligne** |

---

## 1. Thème Shopify

### Importer le thème dans une boutique
1. Dans l'admin Shopify : **Boutique en ligne › Thèmes**.
2. Dans la *Bibliothèque de thèmes* : **Ajouter un thème › Importer un fichier zip**.
3. Sélectionnez **`theme.zip`** (à la racine de ce dépôt), puis **Importer**.
4. Cliquez sur **Personnaliser** : toutes les sections, blocs, textes, couleurs et polices sont modifiables dans l'éditeur.
5. Quand tout est prêt : **Actions › Publier**.

> Le zip contient directement `layout/`, `templates/`, `sections/`, `snippets/`, `blocks/`, `assets/`, `config/` et `locales/` à sa racine (pas de sous-dossier), comme Shopify l'exige.

**À faire après l'import (2 minutes)** : créer les menus `main-menu` et `footer` dans *Contenu › Menus* si votre boutique ne les a pas, et choisir une collection dans la section « Collection en vedette » du panier.

### Prévisualiser / développer avec Shopify CLI
```bash
npm install -g @shopify/cli@3
shopify theme dev --path theme --store votre-boutique.myshopify.com   # aperçu local avec rechargement à chaud
shopify theme check --path theme                                       # lint (0 erreur au moment de la livraison)
shopify theme push --path theme --unpublished                          # envoyer comme nouveau thème non publié
```

### Régénérer les livrables
```bash
npm install                       # installe liquidjs (rendu de la démo)
npm run theme:check               # shopify theme check
npm run theme:zip                 # → theme.zip (vérifié automatiquement)
npm run demo:build                # → demo/demo.html
python3 scripts/gen-templates.py  # régénère les templates JSON (contenu FR par défaut)
python3 scripts/gen-locales.py    # régénère locales/fr.default.json et en.json (clés vérifiées identiques)
```

### Contenu du thème
```
theme/
  layout/      theme.liquid (SEO, mode sombre sans flash, tiroir panier), password.liquid
  templates/   index · product · collection · cart · page · page.landing · blog · article · search · 404 · password (JSON)
  sections/    hero-editor ★, announcement-bar, header, logo-marquee, benefits, feature-rows, performance,
               demo-stores, comparison, steps, testimonials, faq, final-cta, footer, featured-collection,
               custom-section (blocs de thème), hero-banner, main-* (produit, collection, panier, page, blog,
               article, recherche, 404, mot de passe), product-recommendations, cart-drawer
               + groupes header-group.json / footer-group.json
  blocks/      heading, text, button, image, group (blocs de thème imbriquables)
  snippets/    icon (59 icônes maison), logo, product-card, price, stars, cart-drawer, free-shipping-bar,
               mockup (visuels CSS), product-art (illustrations SVG), meta-tags, structured-data…
  assets/      base.css, theme.js (vanilla, ~11 Ko), hero-editor.css/js (chargés par la section seulement),
               polices woff2 auto-hébergées, kinetic-mark.svg
  config/      settings_schema.json (logo, couleurs clair/sombre, typo, mise en page, produits, panier, réseaux, SEO)
               settings_data.json (valeurs de la marque Kinetic par défaut)
  locales/     fr.default.json, en.json (161 clés chacune)
```

### Section phare : « Hero éditeur en direct »
Une fausse fenêtre d'éditeur de thème, entièrement interactive :
- barre d'outils (calques, sélection, annuler/rétablir, menu « … », bouton « Enregistrer » avec chevron) ;
- pastilles pour basculer entre 3 boutiques démo (Sève — cosmétique, Ruelle — café, Altitude — outdoor) : nom, couleurs, produit, illustration et tags changent instantanément ;
- sélection de bloc au survol/clic : cadre bleu + étiquette, bouton « + » rond, mini-barre (dupliquer, masquer, supprimer) ;
- panneau de réglages : le champ « Texte » met à jour l'aperçu **en temps réel** ; barre d'édition (IA qui réécrit le titre, taille, gras, italique, lien, listes) ;
- zone « Groupe vide — cliquez pour ajouter un bloc », annuler/rétablir (Ctrl/Cmd+Z), réinitialisation ;
- 2 cartes KPI flottantes (valeurs placeholders), mot manuscrit décoratif, fond teinté.

Dans l'éditeur Shopify : **boutiques démo = blocs « Boutique démo »** (nom, niche, couleurs, produit, prix, note, tags, tag mis en avant, conditionnement, badge, illustration ou image, suggestions IA), **KPI = blocs « Carte KPI »**, plus titre, sous-titre, boutons, note, mot manuscrit et teintes de fond.

---

## 2. Démo autonome `demo/demo.html`

Ouvrez simplement le fichier dans un navigateur (double-clic) : aucune dépendance, aucun réseau requis.
Il est **généré à partir des vrais fichiers du thème** (`scripts/build-demo.mjs` rend `layout/theme.liquid` + `templates/index.json` avec liquidjs, puis intègre CSS, JS et polices) : ce que vous voyez est la page d'accueil du thème. Panier et paiement sont désactivés hors Shopify.

---

## 3. Qualité vérifiée

| Vérification | Résultat |
|---|---|
| `shopify theme check` (CLI 3.94) | **67 fichiers, 0 erreur, 0 avertissement** — y compris sur le contenu extrait de `theme.zip` |
| `theme.zip` | 75 fichiers, 200 Ko, 8 dossiers à la racine, JSON valides |
| Éditeur en direct (Playwright, ordinateur + iPhone 13 tactile) | 28/28 tests ×2 : saisie en temps réel, changement de boutique, dupliquer/masquer/supprimer, annuler/rétablir, « + », groupe vide, IA, enregistrer, menu, clavier, aucun débordement, aucune erreur JS |
| Lighthouse sur la démo (servie en gzip comme sur un hébergeur) | Mobile **93–99** / 100 / 100 / 100 · Ordinateur 100 / 100 / 100 / 100 |

Limite : le thème n'a pas pu être testé dans une vraie boutique Shopify depuis cet environnement (pas d'accès à une boutique). Les gabarits commerce (produit, collection, panier…) sont validés par `theme check`, mais doivent être vérifiés avec `shopify theme dev` sur une boutique de développement.

---

## 4. Site vitrine (Next.js)

Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · TypeScript · 100 % statique · FR / EN.

### Installation

Prérequis : Node.js ≥ 20.9 (testé avec 22) et npm.

```bash
npm install
cp .env.example .env.local   # puis ajustez les valeurs
```

### Lancement

```bash
npm run dev        # développement → http://localhost:3000
npm run build      # build de production
npm start          # serveur de production (après build)
npm run lint       # ESLint (config Next.js)
npm run typecheck  # TypeScript strict
```

### Pages

| FR | EN |
|---|---|
| `/` | `/en` |
| `/fonctionnalites` | `/en/features` |
| `/tarifs` | `/en/pricing` |
| `/contact` | `/en/contact` |
| `/mentions-legales` | `/en/legal` |
| `/confidentialite` | `/en/privacy` |

Plus : `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`, images Open Graph générées, 404 bilingue.

### Déploiement sur Vercel

1. Poussez le dépôt sur GitHub / GitLab / Bitbucket.
2. Sur [vercel.com/new](https://vercel.com/new), importez le dépôt : le framework **Next.js** est détecté automatiquement (aucun réglage de build à modifier).
3. Dans *Settings → Environment Variables*, ajoutez :
   - `NEXT_PUBLIC_SITE_URL` = votre domaine final (ex. `https://kinetic-theme.com`) — utilisé pour les canonical, le sitemap et l'Open Graph ;
   - `CONTACT_WEBHOOK_URL` (optionnel) = URL qui recevra les messages du formulaire en JSON.
4. Déployez, puis rattachez votre domaine dans *Settings → Domains*.

En ligne de commande : `npm i -g vercel && vercel --prod`.

### Architecture

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

#### Modifier…
- **un texte** → `content/fr.ts` et `content/en.ts` (le build échoue si une clé manque en anglais) ;
- **une couleur / un rayon / une ombre** → `app/globals.css` ;
- **prix, durée d'essai, e-mails, URL** → `lib/site.ts` ;
- **une page / un slug** → `lib/routes.ts` + dossier correspondant dans `app/`.

#### Brancher un outil d'analytics (après consentement)
La bannière émet `window` → `kinetic:consent` (`detail.analytics: boolean`) et stocke le choix dans `localStorage["kinetic-consent"]`. Chargez votre script uniquement si `analytics === true`.

#### Polices
Les fichiers de `assets/fonts/*.woff2` sont des instances réduites des polices variables Google Fonts (licence OFL) :

```bash
pip install fonttools brotli
python3 -c "
from fontTools.ttLib import TTFont; from fontTools.varLib import instancer
f=TTFont('Archivo-variable-latin.woff2'); i=instancer.instantiateVariableFont(f,{'wdth':112,'wght':(700,800)}); i.flavor='woff2'; i.save('Archivo-Wide-700-800.woff2')
f=TTFont('Inter-variable-latin.woff2');   i=instancer.instantiateVariableFont(f,{'opsz':14,'wght':(400,700)});   i.flavor='woff2'; i.save('Inter-400-700.woff2')"
```

### Qualité vérifiée

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

- **Polices** : Archivo (Omnibus-Type), Inter (Rasmus Andersson) et Caveat (Impallari Type) — SIL Open Font License 1.1, auto-hébergées en versions réduites.
- **Thème Shopify** : aucune photo ; icônes, logo, illustrations produit et maquettes dessinés pour le projet (SVG/CSS).
- **Site vitrine — photos** : [Unsplash](https://unsplash.com/license) (licence Unsplash). Fichiers : `photo-1523275335684-37898b6baf30` (montre), `photo-1505740420928-5e560c06d30e` (casque), `photo-1515886657613-9f3515b0c78f` (mode), `photo-1608571423902-eed4a5ad8108` (sérum), `photo-1586023492125-27b2c045efd7` (fauteuil), `photo-1501555088652-021faa106b9b` (randonnée), `photo-1447933601403-0c6688de566e` (café) — via `https://images.unsplash.com/<id>`. Créditez nommément les photographes depuis leur page Unsplash si vous les conservez.
