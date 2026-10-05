# Journal des décisions

Le projet a été mené en autonomie. Chaque choix non spécifié dans le brief est consigné ici avec sa justification.

## Analyse de la référence (themefullstack.com)

Ce qui a été retenu, c'est la **logique**, pas le contenu :

| Logique observée | Reprise dans Kinetic |
|---|---|
| Bandeau annonce « Nouveau » en haut | `AnnouncementBar` (nouveauté produit) |
| Hero : promesse + 3 réassurances + double CTA + note moyenne | `Hero` : promesse « mouvement », 3 points, CTA essai / démos, preuve sociale **placeholder** |
| Bandeau de compteur d'installations | Remplacé par un **bandeau logos clients placeholder** (demandé dans le brief) |
| Bénéfices courts puis blocs fonctionnalités | `Benefits` (4 cartes) puis `FeatureRows` (4 rangées alternées) |
| Bloc « performance » (chargement à la demande, zéro dépendance) | `Performance` : bande sombre, jauges et barre de comparaison (valeurs placeholder) |
| Démos par niche (boutiques fictives) | `Demos` : 6 univers **inventés** (Atelier Soleil, Sève, Nido, Altitude, Ruelle, Ondes) |
| Comparatif apps / builders vs approche native | `Comparison` avant / avec, coûts placeholder |
| Installation en 3 étapes | `Steps` |
| Avis en grand nombre | `Testimonials` carrousel, **6 placeholders** |
| FAQ longue (essai, licence, MAJ, résiliation…) | `Faq` — questions réécrites, réponses propres à Kinetic |
| CTA final + footer multi-colonnes | `FinalCta`, `Footer` |
| Page tarifs mensuel / annuel / entreprise | `PricingPage` : toggle + Solo / Croissance / Studio + tableau comparatif |

Écarts volontaires : pas de section « IA / MCP » (propre à la référence), pas de compteur d'installations, pas de liste de boutiques clientes réelles, pas de pseudo-chat. Aucune phrase, image, icône ou chiffre de la référence n'a été repris.

## Décisions

| # | Sujet | Décision | Pourquoi |
|---|---|---|---|
| D-01 | Nom de marque | **Kinetic**, catégorie « Thème Shopify » | Écrit sur le logo fourni ; le nom évoque mouvement → vitesse → conversion. |
| D-02 | Proposition de valeur | « Le thème Shopify qui met vos ventes en mouvement » + angle **« moins d'applis »** | Angle différenciant, mesurable et cohérent avec les lignes de vitesse du logo. |
| D-03 | Logo | Redessiné en SVG fidèle (carré `#2B37DE`, K `#F1EFEA`, traits `#EC7454`) | Netteté à toute taille, favicon, OG image, poids quasi nul. |
| D-04 | Palette | Échelles complètes bleu / corail / encre + tokens sémantiques clair/sombre | Couleurs échantillonnées sur le logo ; tokens = thème sombre sans dupliquer les classes. Voir BRAND.md. |
| D-05 | Usage du corail | Décoratif (traits, badges), texte corail = `coral-700` / `coral-300` | `#EC7454` sur fond clair échoue au contraste AA. |
| D-06 | Typographies | Archivo étendue (titres) + Inter (texte) | Archivo à 112 % de largeur reproduit l'allure du wordmark ; Inter = lisibilité. |
| D-07 | Stack | Next.js 16 (App Router, Turbopack) + React 19 + Tailwind CSS v4 + TypeScript strict | Demandé ; versions stables les plus récentes. Tailwind v4 = tokens dans le CSS (`@theme`), pas de config JS. |
| D-08 | Dépendances | **Zéro dépendance runtime** hors next/react | Objectif Lighthouse et brief (« zéro dépendance inutile ») : pas de clsx, framer-motion, carousel, zod, i18n lib. |
| D-09 | i18n | FR à la racine, EN sous `/en`, **slugs localisés**, deux layouts racines `(fr)` / `(en)` | `<html lang>` correct sans middleware, 100 % statique, hreflang propres. 404 globale via `experimental.globalNotFound` (bilingue). |
| D-10 | Contenu | Dictionnaires typés `content/fr.ts` (référence) et `content/en.ts` (`Dict`) | Le compilateur refuse une traduction manquante ; un seul endroit pour éditer les textes. |
| D-11 | Visuels | Maquettes UI en **CSS/SVG** + 7 photos Unsplash sans marque visible, en WebP, servies via `next/image` (AVIF/WebP) | Aucun visuel de la référence ; photos choisies pour ne montrer aucun logo (Nike, Polaroid… écartés). |
| D-12 | Polices auto-hébergées & instanciées | Fichiers variables Google Fonts réduits avec `fontTools.varLib.instancer` : Archivo `wdth=112, wght=700–800` (88 → 24 Ko), Inter `opsz=14, wght=400–700` (71 → 35 Ko). Inter non préchargée. | Le LCP mobile simulé (texte du hero) dépendait du poids des polices : score perf mobile 85–92 → 96–98. Régénération : voir README § Polices. |
| D-13 | Placeholders | Valeurs entre `[crochets]` + composant `<Ph>` (soulignement pointillé corail, infobulle) | Le brief exige des avis/stats identifiables ; faciles à trouver (`grep "\["`). |
| D-14 | Données structurées | Organization, WebSite, FAQPage, BreadcrumbList, SoftwareApplication+Offer, ContactPage. **Pas d'AggregateRating** | Une note fictive en JSON-LD enfreindrait les règles Google ; à ajouter avec de vrais avis. |
| D-15 | Essai / garantie / prix | Essai **21 jours**, garantie **30 jours**, Solo 39 €/31 €, Croissance 79 €/63 €, Studio sur devis | Valeurs de départ plausibles, distinctes de la référence ; centralisées dans `lib/site.ts`. À valider. |
| D-16 | Politique de résiliation | Le thème **continue de fonctionner** après résiliation (sans MAJ ni support) | Argument de confiance fort, différenciant. À confirmer côté business. |
| D-17 | FAQ | `<details>/<summary>` natifs | Accessible au clavier et lecteurs d'écran, fonctionne sans JS. |
| D-18 | Carrousel | Scroll-snap natif + 2 boutons, ARIA `carousel/slide` | Swipe mobile natif, pas de librairie, pas de défilement automatique (WCAG 2.2.2). |
| D-19 | Animations | Un seul `IntersectionObserver` global (`data-reveal`) ; contenu visible si JS absent ; tout neutralisé sous `prefers-reduced-motion` | Coût JS minimal, pas de contenu caché aux robots. Le hero n'est jamais animé (LCP). |
| D-20 | Mode sombre | Suit le système par défaut, bascule manuelle mémorisée, script inline anti-flash | Le logo est présenté sur fond sombre : la marque a une version sombre « naturelle ». |
| D-21 | Formulaire de contact | Server Action + validation partagée client/serveur + pot de miel ; envoi vers `CONTACT_WEBHOOK_URL` si défini | Fonctionne sur Vercel sans service tiers imposé ; compatible Formspree/Make/Zapier/Slack. |
| D-22 | Cookies | Bannière avec « Tout refuser » aussi visible qu'« Accepter », personnalisation, réouverture depuis le footer | Exigences CNIL. Aucun traceur installé : branchement documenté dans le README. |
| D-23 | Liens non encore existants | Démos → `site.demoBaseUrl`, essai → `site.signupUrl`, connexion → `site.loginUrl` | URL placeholder centralisées plutôt que des `href="#"`. |
| D-24 | Pages légales | Mentions légales + confidentialité avec trame et encadré « à compléter » | Requis en France ; contenu juridique non inventable. |
| D-25 | Open Graph | Images OG générées au build par `next/og` sur une route statique `/og/fr` et `/og/en`, référencées explicitement dans les métadonnées de chaque page | Le fichier `opengraph-image` d'un segment parent est écrasé dès qu'une page définit `openGraph` : une URL stable évite ce piège. |
| D-26 | Hébergement | Vercel, pages 100 % statiques (SSG) | Demandé ; temps de réponse minimal. |
