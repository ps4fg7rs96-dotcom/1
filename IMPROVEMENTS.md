# Améliorations par rapport à la référence

## Thème Shopify

| Amélioration | Où | Pourquoi |
|---|---|---|
| **Éditeur en direct fidèle à Shopify** : arborescence, réglages générés depuis le schéma, catalogue de 30 blocs réellement rendus, glisser-déposer, annuler/rétablir, Enregistrer/Annuler les modifications, 3 boutiques complètes | `sections/hero-editor.liquid`, `assets/hero-editor.js` | Le visiteur *essaie* le produit au lieu de le regarder. |
| **Éditeur chargé à la demande** (aperçu statique, activation à l'approche) | `assets/hero-editor.js` | Un éditeur riche sans pénaliser le score mobile. |
| **Tout est éditable côté marchand** : boutiques démo (bandeau, logo, produits associés, propositions IA) en blocs de section | `hero-editor.liquid` (schéma) | Adapter la démo à sa propre niche sans code. |
| **Mode sombre** complet (auto / clair / sombre + bouton, sans flash) | `layout/theme.liquid`, `base.css` | Confort, tendance forte, cohérent avec le logo sur fond noir. |
| **Tiroir panier AJAX** avec quantités, remises et réassurance | `snippets/cart-drawer.liquid`, `theme.js` | Le client reste sur la page produit → moins d'abandons. |
| **Jauge de livraison offerte** (tiroir, page panier, fiche produit) | `snippets/free-shipping-bar.liquid` | Levier classique d'augmentation du panier moyen. |
| **Barre d'achat collante sur mobile** | `main-product.liquid`, `theme.js` | Le bouton d'achat reste accessible au pouce après le défilement. |
| **Ajout rapide** depuis les cartes produit (produits sans variantes) | `snippets/product-card.liquid` | Un clic de moins. |
| **Sélecteur de variantes** : pastilles, valeurs indisponibles barrées, prix/média/URL mis à jour | `main-product.liquid`, `theme.js` | Clarté du choix, partage d'URL de variante. |
| **Indicateur de stock bas** (seuil réglable) | bloc « État du stock » | Urgence honnête, basée sur le vrai stock. |
| **Filtres et tri de collection** (Search & Discovery) avec envoi automatique et filtres actifs supprimables | `main-collection.liquid` | Navigation rapide dans les grands catalogues. |
| **Recommandations produit** chargées à l'approche | `product-recommendations.liquid` | Ventes croisées sans pénaliser le chargement initial. |
| **Blocs de thème + Section libre** (titre, texte, bouton, image, groupe imbriqué) | `blocks/`, `custom-section.liquid` | Créer de nouvelles sections sans développeur. |
| **Gabarit landing page** (`page.landing`) | `templates/page.landing.json` | Pages de campagne sans page builder externe. |
| **Bandeau logos défilant** accessible (pause au survol/focus, statique si mouvement réduit) | `logo-marquee.liquid` | Preuve sociale animée sans nuire à l'accessibilité. |
| **Annonces rotatives** (pause au survol) | `announcement-bar.liquid` | Plusieurs messages sans encombrer. |
| **Recherche en modale** + page de résultats produits/articles/pages | `header.liquid`, `main-search.liquid` | Trouver vite, sur mobile comme sur ordinateur. |
| **Données structurées** Product/Offer, FAQPage, Organization, WebSite (SearchAction), BlogPosting | sections + snippets | Résultats enrichis Google. |
| **Placeholders visibles** (`.ph`) | `base.css` | Aucun faux avis ou faux chiffre publié par erreur. |
| **Polices réduites** (−60 %) et chargées seulement si utilisées | `assets/*.woff2` | Performance mobile. |
| **Démo autonome générée depuis le thème** | `scripts/build-demo.mjs` | Montrer le thème sans boutique Shopify, sans écart avec le vrai rendu. |
| **Page 404 et page mot de passe soignées** | `main-404.liquid`, `main-password.liquid` | Pages souvent négligées, vues par les premiers visiteurs. |

## Site vitrine Next.js

| Amélioration | Où | Pourquoi |
|---|---|---|
| **Mode sombre** complet (système + bascule mémorisée, sans flash) | `ThemeToggle`, `ThemeScript`, tokens `.dark` | Confort, cohérence avec le logo sur fond noir, attendu d'un produit « tech ». |
| **Site bilingue FR / EN** avec slugs localisés et hreflang | `content/`, `lib/routes.ts`, `(fr)` / `(en)` | Thème vendu à l'international ; SEO par langue ; le sélecteur garde la page courante. |
| **CTA mobile collant** (après le hero, masqué près du footer et quand la bannière cookies est ouverte) | `StickyCta` | L'action principale reste à portée du pouce sans gêner. |
| **Formulaire de contact** validé côté client *et* serveur, résumé d'erreurs focalisé, messages par champ, pot de miel, sujet pré-rempli (`?sujet=agence`) | `ContactForm`, `app/actions/contact.ts` | Moins d'abandons, accessible (aria-invalid / describedby), pas de spam. |
| **Page 404 soignée et bilingue** (lignes de vitesse animées) | `app/global-not-found.tsx` | Récupère les visiteurs perdus avec un ton de marque. |
| **Bannière cookies RGPD** (refus en un clic, personnalisation, réouverture via le footer) | `CookieBanner` | Conformité CNIL, sans dépendance. |
| **Micro-interactions** : flèches qui avancent, cartes qui se soulèvent, soulignement corail de la nav, cartes flottantes du hero, pastilles d'icônes qui s'inversent | composants UI | Sensation de mouvement fidèle à la marque. |
| **Apparitions au scroll** en un seul observer, respect de `prefers-reduced-motion` | `RevealObserver`, `globals.css` | Effet premium à coût JS quasi nul, accessible. |
| **Comparatif chiffré avant / après** avec total mensuel et CTA intégré | `Comparison` | Rend l'économie tangible au moment de la décision. |
| **Tableau comparatif des formules** + garantie satisfait ou remboursé | `PricingPage` | Lève les dernières objections avant l'achat. |
| **Toggle mensuel / annuel** accessible (vrais boutons radio) avec total annuel calculé | `PricingPlans` | Transparence du prix, navigation clavier native. |
| **Fil d'Ariane** visible + JSON-LD BreadcrumbList | `PageHero` | Orientation et résultats enrichis. |
| **Données structurées** Organization, WebSite, FAQPage, SoftwareApplication/Offer, ContactPage | `lib/seo.tsx` | Visibilité dans les résultats de recherche. |
| **Images Open Graph générées** (FR / EN) + apple-touch-icon + manifest | `lib/og.tsx`, `app/og/[locale]/route.tsx`, `app/apple-icon.tsx`, `app/manifest.ts` | Partages sociaux propres, installable. |
| **Polices instanciées** (−60 % de poids) et auto-hébergées | `lib/fonts.ts`, `assets/fonts` | LCP mobile, RGPD (aucun appel à Google). |
| **Lien d'évitement** « Aller au contenu », focus visibles, menu mobile fermable par Échap | `SiteShell`, `Header` | Navigation clavier complète. |
| **Placeholders visuellement repérables** (`<Ph>` + crochets) | `components/ui/Placeholder.tsx` | Impossible de publier par erreur un faux avis ou une fausse statistique. |
| **En-têtes de sécurité** (nosniff, referrer-policy, frame-options, permissions-policy) | `next.config.ts` | Score « Bonnes pratiques » et hygiène. |
| **Contenu typé** : une traduction manquante casse le build | `content/en.ts: Dict` | Pas de page à moitié traduite en production. |
