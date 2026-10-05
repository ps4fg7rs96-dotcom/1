# Placeholders à remplacer avant mise en ligne

## A. Thème Shopify

Tout se remplace **dans l'éditeur Shopify** (Personnaliser), sans toucher au code. Sur la boutique, les données d'exemple sont soulignées en pointillé corail.

| Où (éditeur) | Placeholder | Fichier source |
|---|---|---|
| Hero éditeur en direct › Note et avis | `[4,9/5] · [250+] avis vérifiés` | `templates/index.json` |
| Hero éditeur en direct › blocs Boutique démo | produits, prix, notes (« 4,8/5 (126 avis) ») et descriptions des boutiques fictives Sève, Ruelle, Altitude — exemples de démonstration | `templates/index.json` |
| Hero éditeur en direct › blocs Carte KPI | `[68,40 €]` `[+12 %]`, `[3,4 %]` `[+0,8 pt]` | `templates/index.json` |
| Bandeau logos › blocs Logo | `[Logo client 1…8]` → téléversez les logos (SVG/PNG transparent) | `templates/index.json` |
| Performance › blocs Score et Barre + note | scores 98/100/100/100, `[1,1 s]`, `[3,4 s]` | `templates/index.json` |
| Comparatif › blocs Application + total | `[15 €]` … `[10 €]`, total `[122 €]`, prix « 31 € » | `templates/index.json` |
| Témoignages › blocs | 5 citations `[Avis à remplacer]`, `[Prénom N.]`, `[rôle]` (+ 3 sur la landing) | `templates/index.json`, `page.landing.json` |
| Boutiques démo › blocs | liens « Voir la démo » vides → URL de vos boutiques démo ; captures en option | `templates/index.json` |
| CTA final, Comparatif, Hero | liens des boutons (vides = collection « Tous les produits ») ; « 21 jours d'essai » | `templates/index.json` |
| FAQ | réponses à valider (politique de résiliation, mises à jour) | `templates/index.json` |
| En-tête › Bouton d'action | lien du bouton « Essai gratuit » | `sections/header-group.json` |
| Bandeau annonce | messages et liens | `sections/header-group.json` |
| Pied de page | texte de marque, menus (`main-menu`, `footer`) | `sections/footer-group.json` |
| Paramètres du thème › Réseaux sociaux / Référencement | URL des réseaux, image de partage, e-mail | `config/settings_data.json` |
| Paramètres du thème › Panier | seuil de livraison offerte (60), message de réassurance | `config/settings_data.json` |
| Fiche produit › Réassurance, Onglet repliable | « Livraison offerte dès 60 € », « Retours gratuits sous 30 jours »… | `templates/product.json` |
| Landing page (`page.landing`) | textes d'exemple, FAQ, avis | `templates/page.landing.json` |

| Section « Chiffres clés » | valeurs et libellés `[Clients satisfaits]`… + note de source | sections ajoutées dans l'éditeur |
| Section « Avis clients » | `[Prénom N.]`, `[Titre de l'avis]`, `[Avis à remplacer…]`, `[Mois Année]` | sections ajoutées dans l'éditeur |
| Section « Galerie sociale achetable » | auteurs `[@client]` (avec l'accord des personnes) | sections ajoutées dans l'éditeur |
| Sections « Points de vente » et « Formulaire de contact » | adresses `[Boutique Paris]`, e-mail `[contact@votre-boutique.fr]` | `templates/page.stores.json`, `page.contact.json` |
| Fiche produit › Remises par quantité / Lot | pourcentages affichés : **créez les réductions correspondantes** dans Shopify › Réductions | `templates/product.json` |
| Comptes à rebours | date de fin (2026-12-31 par défaut) | blocs et sections |
| Page Fonctionnalités | économies « Économisez X €/mois » et total « ≈ 322 € » : **estimations** à vérifier ou retirer (champ par bloc, 0 = « Inclus ») | `templates/page.features.json` |
| Pop-up | code promo (vide) et texte : section désactivée par défaut | `sections/footer-group.json` |

Note produit : les étoiles des fiches et cartes produit s'affichent **uniquement** si une application d'avis remplit le métachamp `reviews.rating` — rien n'est inventé.

---

## B. Site vitrine Next.js

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
