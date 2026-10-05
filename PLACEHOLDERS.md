# Placeholders à remplacer avant mise en ligne

Astuce : `grep -rn "\[" content/` liste tous les textes entre crochets ; `grep -rn "PLACEHOLDER" lib/ components/` liste les valeurs de configuration.
Sur le site, les données d'exemple sont **soulignées en pointillé corail** (composant `<Ph>`).

## 1. Preuve sociale (obligatoire — ne jamais publier de faux avis)

| Élément | Fichier | Clé |
|---|---|---|
| Note et nombre d'avis du hero `[4,9]/5 · [250+]` + mention sous la note | `content/fr.ts`, `content/en.ts` | `hero.proof`, `hero.proofSub` |
| 6 logos clients `[Logo client N]` | `components/sections/LogoCloud.tsx` | tableau `shapes` → remplacer par des `<Image>`/SVG de vrais logos (avec autorisation) |
| 6 témoignages (citation, nom, rôle) | `content/*.ts` | `testimonials.items`, `testimonials.lead` |
| Avatars des témoignages (actuellement numéros) | `components/sections/Testimonials.tsx` | `figcaption` |
| Avatars du hero (initiales K L M N O) | `components/sections/Hero.tsx` | bloc `-space-x-2.5` |

Quand de vrais avis sont disponibles, ajouter un `aggregateRating` dans `productLd()` (`lib/seo.tsx`).

## 2. Statistiques et chiffres

| Élément | Fichier | Clé |
|---|---|---|
| 4 statistiques `[−40 %]`, `[+20 %]`, `[120 €]`, `[< 6 h]` + note | `content/*.ts` | `stats.items`, `stats.note` |
| Scores Lighthouse affichés (98/100/100/100) + note | `content/*.ts` | `performance.scores`, `performance.scoresNote` |
| Temps d'affichage `[1,1 s]` / `[3,4 s]` | `content/*.ts` | `performance.loadRows` |
| Score vitesse de la carte du hero `[98] / 100` | `components/mockups/Mockups.tsx` | `HeroMockup` |
| Coûts des applications `[15 €]`… total `[122 €]` + note | `content/*.ts` | `comparison.before`, `comparison.beforeTotal`, `comparison.note` |
| Délai de réponse `[24 h ouvrées]` | `content/*.ts` | `contactPage.responseTime` |

## 3. Données business (`lib/site.ts`)

| Valeur | Actuelle |
|---|---|
| Domaine (`NEXT_PUBLIC_SITE_URL`) | `https://kinetic-theme.com` |
| Raison sociale | `Kinetic Studio SAS` |
| E-mails | `bonjour@…`, `support@…` |
| Espace client / inscription | `https://app.kinetic-theme.com/login`, `/signup` |
| URL des boutiques démo | `https://demo.kinetic-theme.com/<univers>` |
| Durée d'essai | 21 jours |
| Garantie remboursement | 30 jours |
| Prix Solo / Croissance (mensuel / annuel) | 39 € / 31 € — 79 € / 63 € HT |

Aussi à valider dans `content/*.ts` : contenu des formules (`pricingPage.plans`, `compareRows`), politique de résiliation (FAQ), promesses de support, annonce « Kinetic 2.0 » (`common.announcement`).

## 4. Pages légales

`legalPage` et `privacyPage` dans `content/*.ts` : forme juridique, capital, adresse, RCS, TVA, directeur de publication, durée de conservation, date de mise à jour. **À faire valider par un juriste.**

## 5. Intégrations

| Sujet | Où |
|---|---|
| Réception des messages de contact | variable `CONTACT_WEBHOOK_URL` (sinon simple log serveur) |
| Outil d'analytics (après consentement) | écouter l'événement `kinetic:consent` (voir README) |
| Boutiques démo réelles | créer les boutiques puis ajuster `site.demoBaseUrl` / les clés `demos.items[].key` |

## 6. Visuels

Les 7 photos (`public/images/demos/`) sont des illustrations Unsplash. Remplacez-les par des captures de vos vraies boutiques démo (même nom de fichier = aucun changement de code).
