# Kinetic — Identité de marque

> Tokens centralisés dans [`app/globals.css`](app/globals.css) (Tailwind v4, `@theme`). Toute modification de couleur, rayon, ombre ou police se fait **uniquement** là.

## 1. Analyse du logo

| Élément | Observation | Ce qu'on en tire |
|---|---|---|
| Carré arrondi bleu (`#2B37DE`) | Rayon ≈ 22 % du côté, aplat sans dégradé | Couleur primaire, rayons généreux, style « app icon » moderne |
| « K » blanc cassé (`#F1EFEA`) | Lettre massive, angles nets, fût vertical épais | Typo de titre grasse et **étendue** |
| 3 traits corail (`#EC7454`) à gauche du K | Lignes de vitesse, celle du milieu plus longue | Motif graphique récurrent (`SpeedLines`) = mouvement, rapidité |
| Fond noir (`#121214`) | Légèrement froid | Neutre sombre de base, mode sombre « natif » |
| Wordmark « KINETIC » | Grotesque très grasse, élargie | Archivo ExtraBold, largeur 112 % |
| Sous-titre « THÈME SHOPIFY » | Capitales espacées, gris `#A3A3A9` | Eyebrows / labels en capitales, `tracking ≈ 0.18em` |

Le logo a été **redessiné en SVG** ([`components/ui/Logo.tsx`](components/ui/Logo.tsx), [`app/icon.svg`](app/icon.svg)) pour être net à toutes les tailles.

## 2. Nom & proposition de valeur

- **Nom** : Kinetic (présent sur le logo) — « l'énergie du mouvement ».
- **Catégorie** : thème Shopify premium.
- **Promesse** : *« Le thème Shopify qui met vos ventes en mouvement. »*
- **Proposition de valeur** : remplacer une pile d'applications payantes par des réglages natifs → boutique plus rapide, plus rentable, cohérente visuellement, sans code.
- **Piliers** : Vitesse · Conversion · Liberté de design · Simplicité.

## 3. Palette

### Primaire — Kinetic Blue
| 50 | 100 | 200 | 300 | 400 | 500 | **600** | 700 | 800 | 900 | 950 |
|---|---|---|---|---|---|---|---|---|---|---|
| `#EEF0FF` | `#E0E3FF` | `#C4C9FF` | `#9DA4FF` | `#7178F8` | `#4A52EE` | **`#2B37DE`** | `#2129B8` | `#1D2493` | `#1C2273` | `#121443` |

### Secondaire — Spark Coral
| 50 | 100 | 200 | 300 | **400** | 500 | 600 | 700 | 800 | 900 |
|---|---|---|---|---|---|---|---|---|---|
| `#FEF3EF` | `#FDE3DA` | `#FAC5B3` | `#F5A084` | **`#EC7454`** | `#E15A37` | `#C8441F` | `#A53619` | `#862F1B` | `#6E2A1A` |

> ⚠️ Le corail 400 est **décoratif** (traits, badges sur fond sombre). Pour du texte corail sur fond clair : `coral-700` (`--accent-text`), contraste AA.

### Neutres — Ink
`0 #FFFFFF` · `25 #FBFAF7` (fond clair) · `50 #F1EFEA` (blanc cassé du logo) · `100 #E6E5E0` · `200 #D2D2CF` · `300 #A3A3A9` (gris du logo) · `400 #85858D` · `500 #6B6B73` · `600 #52525A` · `700 #3A3A41` · `800 #24242A` · `900 #18181C` · `950 #121214` (fond du logo)

### États
| État | Clair | Sombre |
|---|---|---|
| Succès | `#15803D` | `#4ADE80` |
| Avertissement | `#B45309` | `#FBBF24` |
| Erreur | `#B91C1C` | `#F87171` |
| Info / focus | `#2B37DE` | `#9DA4FF` |

### Tokens sémantiques (s'inversent en mode sombre)
`bg`, `surface`, `surface-2`, `fg`, `muted`, `subtle`, `border`, `border-strong`, `primary`, `primary-hover`, `primary-fg`, `primary-soft`, `link`, `accent`, `accent-text`, `accent-soft`, `success|warning|danger(-soft)`, `ring`.
→ Utilisation : `bg-surface`, `text-muted`, `border-border`, `text-link`…

**Contrastes** : texte courant `fg/bg` ≈ 18:1 · `muted/bg` ≥ 7:1 (clair) et ≥ 7:1 (sombre) · blanc sur `blue-600` ≈ 7,8:1 · `link` sombre `#9DA4FF` sur `#121214` ≈ 8:1.

## 4. Typographies (Google Fonts, auto-hébergées via `next/font/local`, zéro requête externe)

| Rôle | Police | Réglages |
|---|---|---|
| Titres / display | **Archivo** (instance largeur 112 %, graisses 700–800, 24 Ko) | 800, `letter-spacing: -0.02em`, `text-wrap: balance` |
| Texte courant / UI | **Inter** (taille optique 14, graisses 400–700, 35 Ko) | 400–600, interlignage 1.6 |
| Eyebrows / labels | Inter | 700, capitales, `tracking 0.18em`, `accent-text` |

Échelle : H1 40 → 60 px · H2 30 → 44 px · H3 20 → 34 px · corps 16–18 px.

## 5. Formes, rayons, ombres

- **Rayons** : `xs 6` · `sm 8` · `md 12` · `lg 16` · `xl 22` (≈ logo) · `2xl 28` · boutons en **pilule**. Cartes `rounded-2xl`, grands blocs `rounded-3xl`/`2rem`.
- **Ombres** (teintées encre, plus profondes en sombre) : `shadow-xs`, `shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-glow` (halo bleu sous les CTA primaires).
- **Motifs** : `SpeedLines` (3 traits corail), grille fine `bg-grid` masquée en radial, halos flous bleu/corail.

## 6. Iconographie

Jeu maison ([`components/ui/Icon.tsx`](components/ui/Icon.tsx)) : grille 24 px, trait **1.75 px**, extrémités et jonctions **arrondies**, outline par défaut (pleines seulement pour étoiles / guillemets). Icônes posées dans une pastille `rounded-xl` (`primary-soft` → `primary` au survol).

## 7. Mouvement

- Courbe maison `--ease-kinetic: cubic-bezier(.2,.8,.2,1)` (départ vif, arrivée douce = « élan »).
- Apparition au scroll : fondu + translation 18 px, 700 ms, décalages 80–120 ms.
- Micro-interactions : flèche qui avance au survol, cartes qui se soulèvent de 4 px, soulignement corail de la navigation.
- `prefers-reduced-motion` : toutes les animations sont neutralisées.

## 8. Ton de voix

| On est | On n'est pas |
|---|---|
| Direct, concret, orienté résultat | Pompeux, superlatif (« le meilleur du marché ») |
| Complice des e-commerçants (« vous ») | Jargonneux ou technique sans raison |
| Énergique — verbes d'action, phrases courtes | Agressif ou alarmiste |
| Honnête — chiffres sourcés uniquement | Vague (« des milliers de… » sans preuve) |

Règles : phrases courtes, un bénéfice par phrase, verbes d'action en tête de CTA (« Démarrer », « Explorer »), métaphore du **mouvement / élan** utilisée avec parcimonie, espaces insécables avant `: ; ? !` en français.

Exemples : « Tout ce qu'il faut pour vendre. Rien qui ne ralentisse. » · « Arrêtez d'empiler les abonnements. » · « Donnez de l'élan à votre boutique. »
