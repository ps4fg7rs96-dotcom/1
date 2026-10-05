# Kinetic — thème Shopify + site vitrine

Ce dépôt contient trois livrables autour de la marque **Kinetic** :

| Livrable | Où | Quoi |
|---|---|---|
| **Thème Shopify** (Online Store 2.0) | [`theme/`](theme) → **[`theme.zip`](theme.zip)** | Thème complet, importable tel quel, éditable sans code |
| **Démos autonomes** | **[`demo/`](demo)** | 5 pages HTML autonomes générées depuis le thème : accueil (éditeur en direct), fonctionnalités, sections universelles, fiche produit, collection — avec un sélecteur des 10 styles |
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

**À faire après l'import (5 minutes)** :
1. *Contenu › Menus* : créer `main-menu` et `footer` si besoin (un menu à 3 niveaux s'affiche automatiquement en méga-menu).
2. *Paramètres du thème › Style de la boutique* : choisir l'un des 10 styles (ou garder « Mes réglages »).
3. *Pages* : créer une page « Liste d'envies » avec le modèle **wishlist**, puis la choisir dans *Paramètres du thème › Fonctionnalités*. Idem si besoin pour les modèles **contact** et **stores** (points de vente).
4. *Paramètres du thème › Panier* : seuils de récompense, produit « emballage cadeau », collection de secours pour les suggestions.
5. Pour les produits complémentaires et les filtres : installer l'application **gratuite** Shopify *Search & Discovery*.
6. **Page « Fonctionnalités »** : *Boutique en ligne › Pages › Ajouter une page*, titre « Fonctionnalités » (identifiant `fonctionnalites`), modèle **features**. Le lien s'ajoute tout seul au menu de l'en-tête (réglable dans *En-tête › Lien « Fonctionnalités »*).

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
npm run demo:build                # → demo/*.html (5 pages)
python3 scripts/gen-templates.py  # régénère les templates JSON (contenu FR par défaut)
python3 scripts/gen-locales.py    # régénère locales/fr.default.json et en.json (clés vérifiées identiques)
python3 scripts/section-style.py <section>  # ajoute « Palette » + « Espacement » à une nouvelle section
```

### Contenu du thème
```
theme/
  layout/      theme.liquid (SEO, mode sombre sans flash, tiroir panier, barre mobile), password.liquid
  templates/   index · product · collection · list-collections · cart · page · page.landing · page.contact ·
               page.stores · page.wishlist · page.features · blog · article · search · 404 · password (JSON) + gift_card.liquid
  sections/    59 fichiers (dont 26 nouvelles sections universelles) — voir le tableau ci-dessous + groupes header-group.json / footer-group.json
  blocks/      heading, text, button, image, group (blocs de thème imbriquables)
  snippets/    product-card, product-gallery, variant-picker, product-json, cart-drawer, cart-upsell,
               cart-options, free-shipping-bar (paliers), icon (92 icônes), theme-styles (10 styles)…
  assets/      base.css · theme.js (panier, variantes) · features.js (fonctions « applis », ~34 Ko)
               sections.css · component-product.css · component-collection.css (chargés à la demande)
               hero-editor.css/js · polices woff2 auto-hébergées
  config/      settings_schema.json : style, couleurs, palettes de sections, typo, mise en page, produits,
               panier, fonctionnalités, réseaux, SEO — settings_data.json : 10 styles prédéfinis
  locales/     fr.default.json, en.json (473 clés chacune, identiques)
```

### S'adapter à n'importe quelle marque : les combinaisons
| Niveau | Réglage | Choix |
|---|---|---|
| Boutique entière | *Style de la boutique* | **10 styles** : Kinetic, Minimaliste, Luxe, Nature & bio, Audacieux (streetwear), Doux (beauté), Tech, Ludique (enfants), Gourmand (épicerie), Sport & outdoor — couleurs, polices, arrondis, forme des boutons et casse des titres changent ensemble |
| Boutique entière | *Typographie / Mise en page* | polices de la bibliothèque Shopify, casse des titres et des boutons, style des cartes (ombrées, bordure, à plat), largeur, arrondis |
| Chaque section | *Palette de couleurs* | **8 palettes** : Thème, Alternée, Teintée, Sombre, Primaire, Accent, Personnalisée 1 et 2 (définies dans *Palettes de sections*) |
| Chaque section | *Espacement vertical* | Aucun, petit, moyen, grand, très grand |
| En-tête | *Disposition* | logo à gauche / logo centré / logo centré + menu dessous ; fixe, réapparition en remontant ou non fixe |
| Cartes produit | *Produits* | standard / minimal / encadré, texte à gauche ou centré, format d'image, 2e image au survol, pastilles, badges |
| Fiche produit | *Galerie* | vignettes dessous / à gauche / grille 2 colonnes / empilée ; galerie à gauche ou à droite ; 3 largeurs ; zoom |
| Collection | *Filtres* | colonne latérale ou tiroir ; pagination, « Voir plus » ou défilement infini ; 2 à 5 colonnes |

### Sections disponibles (Ajouter une section)
| Catégorie | Sections |
|---|---|
| Mise en avant | Diaporama, Bannière (image, vidéo, image mobile), Image avec texte, Texte enrichi, Vidéo (Shopify, YouTube, Vimeo, vidéo achetable), Mosaïque, Bannière compte à rebours, Texte défilant, Hero éditeur en direct |
| Produits | Collection en vedette (grille ou carrousel), Produits par onglets, Produit en vedette (achetable), Liste de collections, Recommandations, Récemment consultés, Lookbook / shop the look, Galerie sociale achetable |
| Confiance | Avis clients (note moyenne et répartition, filtres), Témoignages, Barre de réassurance, Colonnes (icônes / images), Chiffres clés, Tableau comparatif, Avant / après, Logos, FAQ |
| Marque & contact | Fonctionnalités (catalogue illustré), Frise chronologique, Newsletter (code de bienvenue), Formulaire de contact, Points de vente, Étapes, CTA final, Section libre (blocs imbriqués) |
| Pied de page | Pop-up (newsletter, code promo, annonce ; délai, défilement, intention de sortie), Vérification de l'âge (désactivées par défaut) |

### Fonctions intégrées qui remplacent des applications payantes
| Fonction | Où l'activer | Remplace typiquement |
|---|---|---|
| Liste d'envies (sans compte) + page dédiée | Paramètres › Fonctionnalités | appli wishlist |
| Aperçu rapide depuis les cartes | Paramètres › Produits | appli quick view |
| Recherche prédictive (produits, collections, pages, suggestions) | En-tête | appli de recherche |
| Méga-menu avec visuels | En-tête › bloc Méga-menu | appli de menu |
| Pastilles de couleur, badges auto (promo %, nouveau, `badge:Texte`) | Paramètres › Produits | appli de swatches / badges |
| Remises par quantité (lots 1/2/3) | Fiche produit › bloc | appli « volume discount » |
| Souvent achetés ensemble (ajout groupé) | Fiche produit › bloc | appli « bundles / FBT » |
| Compte à rebours (date fixe ou par visiteur) | Fiche produit, bannière, bandeau | appli countdown |
| Stock en direct + jauge (vrai stock) | Fiche produit › bloc | appli de stock |
| Estimation de livraison (jours ouvrés, heure limite) | Fiche produit › bloc | appli « delivery date » |
| Alerte retour en stock | Fiche produit › bloc | appli « back in stock » |
| Guide des tailles en fenêtre | Fiche produit › bloc | appli « size chart » |
| Personnalisation (gravure…), précommande, carte cadeau à offrir | Fiche produit › Boutons d'achat | appli de personnalisation |
| Zoom plein écran, barre d'achat collante | Fiche produit | appli d'images / sticky cart |
| Paliers de récompense (livraison puis cadeau) | Paramètres › Panier | appli « free shipping bar » |
| Suggestions dans le panier, emballage cadeau, code promo, date de livraison, case CGV | Paramètres › Panier | applis d'upsell / cart |
| Pop-ups et vérification d'âge | Pied de page | applis de pop-up / age gate |
| Cadeau offert dès un montant (choix de variante, ajout et retrait automatiques) | Paramètres › Panier › Cadeau offert | appli « gift with purchase » |
| Bloc abonnement (achat unique / s'abonner, fréquence, remise) | Fiche produit › bloc Abonnement | widget d'abonnement (les plans restent créés par une appli, ex. Shopify Subscriptions, gratuite) |
| Récemment consultés, lookbook, galerie sociale achetable, avant/après, points de vente, avis | Sections | applis dédiées |
| Barre d'onglets mobile, retour en haut, « Voir plus » / défilement infini | Paramètres › Fonctionnalités, Collection | applis d'UX |

Les blocs d'applications (`@app`) restent pris en charge sur la fiche produit et la collection pour les besoins spécifiques (avis automatiques, abonnements…).

### Section phare : « Hero éditeur en direct »
Une reproduction fidèle de **l'éditeur de thème Shopify (version mobile)**, dans une seule carte, entièrement interactive : barre d'outils, 3 boutiques démo, aperçu défilant avec sélection de blocs, panneau du bas à 3 vues (arborescence, réglages, catalogue de 30 blocs). Boutiques = blocs « Boutique démo », KPI = blocs « Carte KPI ».

---

## 2. Démos autonomes `demo/`

Ouvrez simplement un fichier dans un navigateur : aucune dépendance, aucun réseau requis. Chaque page est **générée à partir des vrais fichiers du thème** (`scripts/build-demo.mjs` + liquidjs) avec des produits d'exemple illustrés en SVG (`scripts/demo-data.mjs`).

| Page | Contenu |
|---|---|
| [`demo.html`](demo/demo.html) | Page d'accueil Kinetic avec l'éditeur en direct |
| [`fonctionnalites.html`](demo/fonctionnalites.html) | **Page « Fonctionnalités »** : les 40 fonctions avec aperçu illustré, économie estimée, type et catégorie, filtres et recherche |
| [`sections.html`](demo/sections.html) | Les sections universelles (diaporama, onglets, lookbook, avant/après, avis, comparatif…) |
| [`produit.html`](demo/produit.html) | Fiche produit complète : pastilles, stock, remises par quantité, lot, livraison, guide des tailles, zoom |
| [`collection.html`](demo/collection.html) | Collection : filtres en colonne (tiroir sur mobile), pastilles, badges, choix des colonnes |

Un sélecteur **« Style »** (en bas à droite) applique en direct les 10 styles prédéfinis. Panier, paiement et aperçu rapide nécessitent Shopify et sont inactifs hors boutique.

---

## 3. Qualité vérifiée

| Vérification | Résultat |
|---|---|
| `shopify theme check` (CLI 3.94) | **113 fichiers, 0 erreur, 0 avertissement** |
| `theme.zip` | 126 fichiers, 353 Ko, 8 dossiers à la racine |
| Fonctions v2 (Playwright, ordinateur + mobile tactile) | **25/25** : pastilles → image, stock et prix ; variante épuisée → alerte retour en stock ; remises par quantité ; total du lot ; guide des tailles et zoom ; liste d'envies (persistante) ; compte à rebours ; onglets ; lookbook ; avant/après ; diaporama ; points de vente ; tiroir de filtres mobile ; colonnes ; aucune erreur JS |
| Page Fonctionnalités + abonnement | **11/11** : lien du menu, 40 cartes, filtre par catégorie, recherche, état vide, bloc abonnement (badge, plan, prix, achat unique) |
| Éditeur en direct (non-régression) | 12/12 |
| Lighthouse mobile (démos servies en gzip) | accueil **93** · fonctionnalités **92** · sections **99** · produit **100** · collection **100** en performance ; **100** en accessibilité, bonnes pratiques et SEO sur les 5 pages |

Limite : le thème n'a pas pu être testé dans une vraie boutique Shopify depuis cet environnement. Les fonctions qui dépendent de Shopify (panier AJAX, aperçu rapide, recherche prédictive, filtres, code promo, retrait en boutique, paiement fractionné) suivent les API documentées et sont validées par `theme check`, mais doivent être vérifiées sur la boutique après import.

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
