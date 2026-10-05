# Améliorations par rapport à la référence

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
