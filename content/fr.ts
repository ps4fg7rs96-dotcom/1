import { site } from "@/lib/site";
import type { IconName } from "@/components/ui/Icon";

/**
 * Contenu FR — langue de référence.
 * Tout texte entre crochets [ … ] est un PLACEHOLDER à remplacer (voir PLACEHOLDERS.md).
 */
const t = site.trialDays;

export const fr = {
  meta: {
    siteTitle: "Kinetic — Thème Shopify rapide, pensé pour la conversion",
    siteDescription:
      "Kinetic est un thème Shopify qui remplace vos applications par des réglages natifs : upsells, panier intelligent, landing pages. Plus rapide, plus rentable, sans code.",
    home: {
      title: "Kinetic — Thème Shopify rapide, pensé pour la conversion",
      description:
        "Le thème Shopify qui met vos ventes en mouvement : outils de conversion intégrés, chargement éclair et design 100 % à votre image. Essai gratuit.",
    },
    features: {
      title: "Fonctionnalités du thème Shopify Kinetic",
      description:
        "Conversion, merchandising, design system, performance, SEO, international : découvrez tout ce que Kinetic intègre nativement, sans application tierce.",
    },
    pricing: {
      title: "Tarifs — Thème Shopify Kinetic",
      description: `Des formules simples, sans frais cachés. Essai gratuit de ${t} jours, mises à jour et support inclus, résiliable en un clic.`,
    },
    contact: {
      title: "Contact — Kinetic",
      description:
        "Une question avant de vous lancer, besoin d'aide sur votre boutique ou projet d'agence ? Écrivez à l'équipe Kinetic.",
    },
    legal: { title: "Mentions légales — Kinetic", description: "Mentions légales du site Kinetic." },
    privacy: {
      title: "Politique de confidentialité — Kinetic",
      description: "Comment Kinetic collecte, utilise et protège vos données personnelles.",
    },
  },

  common: {
    skipToContent: "Aller au contenu",
    nav: {
      features: "Fonctionnalités",
      demos: "Démos",
      reviews: "Avis",
      pricing: "Tarifs",
      contact: "Contact",
    },
    mainNav: "Navigation principale",
    login: "Se connecter",
    ctaTrial: "Essai gratuit",
    ctaTrialLong: "Démarrer l'essai gratuit",
    ctaDemos: "Explorer les démos",
    ctaFeatures: "Toutes les fonctionnalités",
    ctaPricing: "Voir les tarifs",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    themeToggle: "Basculer le thème clair / sombre",
    langLabel: "Langue",
    langSwitch: "English",
    langSwitchShort: "EN",
    langSwitchAria: "Switch to English",
    announcement: {
      badge: "Nouveau",
      text: "Kinetic 2.0 arrive avec les blocs imbriqués et un design system repensé.",
      cta: "Voir les nouveautés",
    },
    ratingLabel: "Note moyenne",
    placeholderTitle: "Contenu d'exemple à remplacer",
    reassurance: [`Essai gratuit ${t} jours`, "Sans carte bancaire", "Résiliable en 1 clic"],
    breadcrumbHome: "Accueil",
  },

  hero: {
    eyebrow: "Thème Shopify 2.0 · Conçu pour convertir",
    titleStart: "Le thème Shopify qui met vos ventes",
    titleHighlight: "en mouvement.",
    lead: "Kinetic réunit dans un seul thème ce que vous payiez en applications : panier intelligent, ventes croisées, avis, landing pages. Votre boutique se charge plus vite, vend davantage, et chaque pixel reste à votre image.",
    points: ["Prêt en une soirée", "Zéro ligne de code", "Mises à jour incluses"],
    primary: "Démarrer l'essai gratuit",
    secondary: "Explorer les démos",
    proof: "[4,9]/5 · [250+] avis vérifiés",
    proofSub: "[Note et volume d'avis à remplacer]",
  },

  mockups: {
    url: "votre-boutique.com",
    productName: "Montre Pulse — Blanc nacré",
    productPrice: "149 €",
    addToCart: "Ajouter au panier",
    inStock: "En stock · expédiée sous 24 h",
    freeShipping: "Plus que 12 € pour la livraison offerte",
    pageSpeed: "Score vitesse",
    conversions: "Conversion",
    cartTitle: "Votre panier",
    upsellTitle: "Souvent acheté avec",
    upsellItem: "Casque Onde",
    upsellPrice: "89 €",
    add: "Ajouter",
    checkout: "Commander",
    subtotal: "Sous-total",
    editorSections: "Sections",
    editorBlocks: ["Bannière animée", "Galerie produit", "Barre de réassurance", "Avis clients", "Ventes croisées", "FAQ"],
    editorAdd: "Ajouter un bloc",
    templates: ["Produit", "Collection", "Landing", "À propos", "Lancement", "Listicle"],
    landingTag: "Lancement",
    landingTitle: "La nouvelle collection est là",
    landingCta: "Je découvre",
    countdown: "Fin de l'offre dans",
    heroAlt: "Montre connectée blanche posée sur fond gris clair, présentée dans une fiche produit",
    upsellAlt: "Casque audio noir sur fond jaune",
  },

  logos: {
    title: "Ils accélèrent déjà leur boutique avec Kinetic",
    placeholder: "[Logo client]",
  },

  benefits: {
    eyebrow: "Pourquoi Kinetic",
    title: "Tout ce qu'il faut pour vendre. Rien qui ne ralentisse.",
    lead: "Nous avons pris les frictions habituelles d'une boutique Shopify — applis empilées, pages lourdes, design figé — et nous les avons retirées une par une.",
    items: [
      {
        icon: "puzzle" as IconName,
        title: "Moins d'applis, moins de frais",
        text: "Avis, ventes croisées, offres groupées, minuteurs, méga-menu : les fonctions que vous louiez à l'unité sont livrées avec le thème.",
      },
      {
        icon: "gauge" as IconName,
        title: "Une vitesse qui se ressent",
        text: "Le code est chargé à la demande et sans librairie externe. Chaque page n'embarque que ce qu'elle affiche réellement.",
      },
      {
        icon: "palette" as IconName,
        title: "Votre charte, partout",
        text: "Couleurs, typographies, rayons et espacements se règlent une fois dans le design system, puis s'appliquent à toute la boutique.",
      },
      {
        icon: "smartphone" as IconName,
        title: "Mobile d'abord",
        text: "Chaque section est pensée pour le pouce avant d'être élargie au desktop — là où se joue la majorité de vos commandes.",
      },
    ],
  },

  featureRows: {
    eyebrow: "Fonctionnalités",
    title: "Un thème, quatre leviers de croissance",
    lead: "Construisez, convertissez, déclinez, lancez : chaque étape a son outil natif dans l'éditeur Shopify.",
    rows: [
      {
        visual: "editor" as const,
        eyebrow: "Éditeur visuel",
        title: "Composez vos pages comme un jeu de construction",
        text: "Des dizaines de blocs combinables directement dans l'éditeur Shopify. Glissez, imbriquez, réordonnez : vous obtenez des mises en page uniques sans ouvrir un fichier de code.",
        bullets: [
          "Blocs imbriqués et sections dynamiques",
          "Aperçu instantané sur mobile et desktop",
          "Compatible avec les dernières évolutions de Shopify",
        ],
      },
      {
        visual: "cart" as const,
        eyebrow: "Conversion",
        title: "Les leviers de vente branchés dans le thème",
        text: "Jauge de livraison offerte, ventes croisées dans le panier, offres groupées, badges de réassurance : chaque levier s'active d'un interrupteur, sans script tiers ni abonnement en plus.",
        bullets: [
          "Panier tiroir avec recommandations",
          "Offres groupées et paliers de remise",
          "Urgence maîtrisée : stock bas, minuteur, précommande",
        ],
      },
      {
        visual: "templates" as const,
        eyebrow: "Modèles prêts à l'emploi",
        title: "Partez d'une page qui convertit déjà",
        text: "Une bibliothèque de modèles conçus par secteur — fiche produit, collection, à propos, page de lancement. Importez, remplacez vos textes et visuels, publiez.",
        bullets: [
          "Modèles importables en un clic",
          "Structures inspirées des meilleures pratiques e-commerce",
          "Nouveaux modèles ajoutés au fil des mises à jour",
        ],
      },
      {
        visual: "landing" as const,
        eyebrow: "Landing pages natives",
        title: "Vos pages de campagne, sans page builder",
        text: "Lancements, soldes, listicles, pages publicitaires : créez-les avec les mêmes blocs que le reste du site. Pas d'outil externe à payer, pas de script qui alourdit le chargement.",
        bullets: [
          "Pages de campagne en quelques minutes",
          "Même vitesse que le reste de la boutique",
          "Cohérence visuelle garantie par le design system",
        ],
      },
    ],
  },

  performance: {
    eyebrow: "Performance",
    title: "Pensé pour être rapide. Mesuré pour le rester.",
    lead: "Chaque milliseconde gagnée rapproche un visiteur de son panier. Kinetic part d'une base légère et refuse tout ce qui n'est pas indispensable.",
    points: [
      {
        icon: "layers" as IconName,
        title: "Chargement à la demande",
        text: "Seules les sections présentes sur la page envoient leur code au navigateur.",
      },
      {
        icon: "codeOff" as IconName,
        title: "Zéro dépendance",
        text: "Pas de jQuery, pas de librairie d'animation : du JavaScript natif, court et ciblé.",
      },
      {
        icon: "image" as IconName,
        title: "Images responsives",
        text: "Formats modernes, tailles adaptées à chaque écran et chargement différé hors champ.",
      },
    ],
    scoresTitle: "Scores Lighthouse mobile",
    scoresNote: "[Scores d'exemple — à remplacer par vos mesures]",
    scores: [
      { label: "Performance", value: 98 },
      { label: "Accessibilité", value: 100 },
      { label: "Bonnes pratiques", value: 100 },
      { label: "SEO", value: 100 },
    ],
    loadTitle: "Temps d'affichage du contenu principal",
    loadRows: [
      { label: "Kinetic", value: "[1,1 s]", width: 26, brand: true },
      { label: "Thème standard + 6 applis", value: "[3,4 s]", width: 80, brand: false },
    ],
  },

  demos: {
    eyebrow: "Boutiques démo",
    title: "Une base, autant de boutiques que de marques",
    lead: "Six univers fictifs pour voir Kinetic s'adapter à votre secteur. Changez de palette, de typographie, de rythme : la structure qui convertit reste la même.",
    cta: "Voir la démo",
    credit: "Photos : Unsplash",
    items: [
      { key: "mode", name: "Atelier Soleil", sector: "Mode & prêt-à-porter", accent: "#E8B23A", tone: "light" },
      { key: "beaute", name: "Sève", sector: "Cosmétique naturelle", accent: "#9C6B4A", tone: "light" },
      { key: "maison", name: "Nido", sector: "Mobilier & déco", accent: "#D9A21B", tone: "dark" },
      { key: "outdoor", name: "Altitude", sector: "Outdoor & randonnée", accent: "#3F7D4E", tone: "dark" },
      { key: "cafe", name: "Ruelle", sector: "Torréfaction & épicerie fine", accent: "#B4682E", tone: "dark" },
      { key: "audio", name: "Ondes", sector: "Audio & high-tech", accent: "#F2C230", tone: "light" },
    ],
    alt: {
      mode: "Personne en ensemble jaune posant en extérieur, illustrant une boutique de mode",
      beaute: "Flacon de sérum ambré posé sur un piédestal, illustrant une boutique de cosmétique",
      maison: "Fauteuil jaune dans un salon lumineux, illustrant une boutique de décoration",
      outdoor: "Randonneuse avec sac à dos dans une vallée verdoyante, illustrant une boutique outdoor",
      cafe: "Grains de café torréfiés en gros plan, illustrant une épicerie fine",
      audio: "Casque audio noir sur fond jaune, illustrant une boutique high-tech",
    } as Record<string, string>,
  },

  comparison: {
    eyebrow: "Avant / Avec Kinetic",
    title: "Arrêtez d'empiler les abonnements",
    lead: "Un thème classique vous oblige à compléter chaque manque par une application. Kinetic les remplace par des réglages natifs.",
    beforeTitle: "Thème classique + applications",
    afterTitle: "Avec Kinetic",
    note: "[Montants indicatifs à remplacer par vos propres estimations]",
    perMonth: "/mois",
    total: "Total mensuel",
    before: [
      { label: "Application d'avis clients", price: "[15 €]" },
      { label: "Ventes croisées & upsells", price: "[25 €]" },
      { label: "Page builder pour landing pages", price: "[40 €]" },
      { label: "Offres groupées & remises", price: "[20 €]" },
      { label: "Méga-menu & filtres avancés", price: "[12 €]" },
      { label: "Minuteur & barre d'annonce", price: "[10 €]" },
    ],
    beforeTotal: "[122 €]",
    beforeCons: ["Scripts tiers qui ralentissent chaque page", "Styles incohérents d'une appli à l'autre", "Conflits à chaque mise à jour"],
    after: [
      "Avis, upsells, bundles et minuteurs intégrés",
      "Landing pages avec les blocs natifs",
      "Un seul design system pour tout le site",
      "Un seul abonnement, un seul support",
    ],
    afterPriceLabel: "À partir de",
    afterPrice: `${site.prices.solo.yearly} €`,
    afterPros: ["Pages plus légères", "Rendu homogène", "Mises à jour sans casse"],
  },

  steps: {
    eyebrow: "Mise en route",
    title: "En ligne en trois étapes",
    lead: "Pas de prestataire à briefer, pas de délai d'intégration : vous restez maître du calendrier.",
    items: [
      {
        icon: "download" as IconName,
        title: "Activez votre essai",
        text: "Choisissez votre formule, sans engagement. Le thème est disponible immédiatement dans votre espace client.",
      },
      {
        icon: "upload" as IconName,
        title: "Installez sur Shopify",
        text: "Importez le fichier dans votre boutique ou partez d'une démo. Votre thème actuel reste en ligne pendant que vous travaillez.",
      },
      {
        icon: "rocket" as IconName,
        title: "Personnalisez, publiez",
        text: "Réglez couleurs, polices et contenus depuis l'éditeur, vérifiez le rendu mobile, puis mettez en ligne d'un clic.",
      },
    ],
  },

  stats: {
    eyebrow: "Résultats",
    title: "L'impact, en chiffres",
    note: "[Chiffres d'exemple — à remplacer par vos données mesurées et sourcées]",
    items: [
      { value: "[−40 %]", label: "de temps de chargement après migration" },
      { value: "[+20 %]", label: "de taux de conversion moyen constaté" },
      { value: "[120 €]", label: "économisés chaque mois en applications" },
      { value: "[< 6 h]", label: "de délai de réponse moyen du support" },
    ],
  },

  testimonials: {
    eyebrow: "Avis clients",
    title: "Ce que disent les marchands",
    lead: "[Témoignages d'exemple — remplacez-les par de vrais avis clients vérifiés.]",
    prev: "Avis précédent",
    next: "Avis suivant",
    carouselLabel: "Témoignages clients",
    slideLabel: "Avis {n} sur {total}",
    items: [
      {
        quote: "[Avis client à remplacer] Décrivez ici le résultat concret obtenu : vitesse, ventes, temps gagné.",
        name: "[Prénom N.]",
        role: "[Fondatrice · boutique de mode]",
      },
      {
        quote: "[Avis client à remplacer] Mentionnez les applications supprimées et l'économie réalisée chaque mois.",
        name: "[Prénom N.]",
        role: "[Gérant · épicerie fine]",
      },
      {
        quote: "[Avis client à remplacer] Racontez la prise en main de l'éditeur et la mise en ligne de la boutique.",
        name: "[Prénom N.]",
        role: "[E-commerçante · cosmétique]",
      },
      {
        quote: "[Avis client à remplacer] Citez un échange avec le support et la rapidité de la réponse.",
        name: "[Prénom N.]",
        role: "[Responsable e-commerce · déco]",
      },
      {
        quote: "[Avis client à remplacer] Expliquez pourquoi l'agence déploie Kinetic chez ses clients.",
        name: "[Prénom N.]",
        role: "[Directeur · agence Shopify]",
      },
      {
        quote: "[Avis client à remplacer] Partagez l'évolution du taux de conversion après la migration.",
        name: "[Prénom N.]",
        role: "[Co-fondateur · marque outdoor]",
      },
    ],
  },

  faq: {
    eyebrow: "FAQ",
    title: "Vos questions, nos réponses",
    lead: "Vous ne trouvez pas votre réponse ? L'équipe vous répond directement.",
    contactCta: "Poser une question",
    items: [
      {
        q: "Kinetic fonctionne-t-il avec ma boutique Shopify actuelle ?",
        a: "Oui. Kinetic est un thème Online Store 2.0 compatible avec toutes les boutiques Shopify. Vous l'installez à côté de votre thème actuel, vous le configurez tranquillement, puis vous le publiez quand tout est prêt. Vos produits, collections et commandes ne bougent pas.",
      },
      {
        q: "Faut-il savoir coder pour l'utiliser ?",
        a: "Non. Tout se règle depuis l'éditeur visuel de Shopify : couleurs, typographies, sections, blocs et fonctionnalités de conversion. Les développeurs peuvent bien sûr aller plus loin, mais ce n'est jamais nécessaire.",
      },
      {
        q: "Comment se déroule l'essai gratuit ?",
        a: `Vous accédez au thème complet pendant ${t} jours, sans carte bancaire. À la fin de l'essai, vous choisissez de continuer avec la formule qui vous convient — ou vous arrêtez, sans rien payer.`,
      },
      {
        q: "Combien de boutiques une licence couvre-t-elle ?",
        a: "Chaque licence couvre une boutique en production. Les boutiques de développement et de préproduction sont incluses gratuitement. Pour plusieurs marques ou pour vos clients d'agence, la formule Studio regroupe les licences.",
      },
      {
        q: "Que se passe-t-il si j'arrête mon abonnement ?",
        a: "Vous résiliez en un clic depuis votre espace client. Votre boutique continue de fonctionner avec la dernière version installée : vous perdez uniquement l'accès aux nouvelles mises à jour et au support.",
      },
      {
        q: "Les mises à jour sont-elles incluses ?",
        a: "Toutes les mises à jour sont incluses tant que votre abonnement est actif : nouvelles sections, nouveaux modèles, compatibilité avec les évolutions de Shopify et correctifs. Une feuille de route publique vous permet de voter pour les prochaines fonctionnalités.",
      },
      {
        q: "Puis-je désinstaller mes applications existantes ?",
        a: "Dans la plupart des cas, oui. Avis, ventes croisées, offres groupées, minuteurs, méga-menu et landing pages sont intégrés. Nous vous conseillons de migrer progressivement : activez la fonction Kinetic équivalente, vérifiez, puis supprimez l'application.",
      },
      {
        q: "Kinetic est-il optimisé pour le référencement ?",
        a: "Oui : HTML sémantique, données structurées produit et FAQ, balises meta configurables, images responsives et temps de chargement réduit. Autant de signaux que les moteurs de recherche prennent en compte.",
      },
    ],
  },

  finalCta: {
    title: "Donnez de l'élan à votre boutique.",
    lead: `Installez Kinetic ce soir, publiez quand vous êtes prêt. ${t} jours d'essai complet, sans carte bancaire.`,
    primary: "Démarrer l'essai gratuit",
    secondary: "Parler à l'équipe",
  },

  footer: {
    pitch: "Le thème Shopify rapide et pensé pour la conversion, conçu pour les marques qui veulent avancer sans empiler les applications.",
    product: "Produit",
    company: "Entreprise",
    legal: "Légal",
    links: {
      features: "Fonctionnalités",
      demos: "Boutiques démo",
      pricing: "Tarifs",
      reviews: "Avis clients",
      contact: "Contact",
      partners: "Programme agences",
      login: "Espace client",
      legal: "Mentions légales",
      privacy: "Confidentialité",
      cookies: "Gérer les cookies",
    },
    rights: "Tous droits réservés.",
    disclaimer: "Shopify est une marque déposée de Shopify Inc. Kinetic est un thème indépendant.",
    madeIn: "Conçu en France",
  },

  cookies: {
    title: "Vos préférences cookies",
    text: "Nous utilisons uniquement les cookies nécessaires au fonctionnement du site. Avec votre accord, nous mesurons aussi l'audience de façon anonyme pour améliorer nos pages.",
    accept: "Tout accepter",
    reject: "Tout refuser",
    customize: "Personnaliser",
    save: "Enregistrer mes choix",
    necessary: "Nécessaires",
    necessaryText: "Indispensables au fonctionnement du site (préférences de thème, de langue et de consentement).",
    analytics: "Mesure d'audience",
    analyticsText: "Statistiques anonymes de visite. Désactivée par défaut.",
    alwaysOn: "Toujours actifs",
    learnMore: "Politique de confidentialité",
  },

  stickyCta: {
    text: `Essai gratuit ${t} jours`,
    cta: "Commencer",
  },

  /* ── Page Fonctionnalités ─────────────────────────────── */
  featuresPage: {
    eyebrow: "Fonctionnalités",
    title: "Tout est déjà dans le thème",
    lead: "Conversion, merchandising, design, performance, SEO et international : une vue complète de ce que Kinetic intègre nativement, sans application tierce.",
    jump: "Aller à la catégorie",
    categories: [
      {
        id: "conversion",
        icon: "cart" as IconName,
        title: "Conversion",
        text: "Les leviers qui transforment une visite en commande.",
        items: [
          "Panier tiroir avec recommandations",
          "Jauge de livraison offerte",
          "Offres groupées et remises par palier",
          "Bouton d'achat collant sur mobile",
          "Minuteur et indicateur de stock bas",
          "Précommande et alerte de retour en stock",
        ],
      },
      {
        id: "merchandising",
        icon: "tag" as IconName,
        title: "Merchandising",
        text: "Mettre en valeur le bon produit, au bon moment.",
        items: [
          "Méga-menu avec visuels",
          "Filtres et tri avancés en collection",
          "Variantes en pastilles couleur et images",
          "Comparateur de produits",
          "Avis clients et galeries photo",
          "Badges personnalisables",
        ],
      },
      {
        id: "design",
        icon: "palette" as IconName,
        title: "Design system",
        text: "Une identité cohérente, réglée une seule fois.",
        items: [
          "Palettes de couleurs et schémas multiples",
          "Typographies et échelles de tailles",
          "Rayons, ombres et espacements globaux",
          "Blocs imbriqués et sections dynamiques",
          "Animations sobres au défilement",
          "Mode sombre optionnel",
        ],
      },
      {
        id: "performance",
        icon: "gauge" as IconName,
        title: "Performance",
        text: "Une base légère qui le reste.",
        items: [
          "Code chargé section par section",
          "Aucune librairie JavaScript externe",
          "Images responsives et différées",
          "Polices optimisées",
          "Préchargement intelligent des liens",
          "CSS critique minimal",
        ],
      },
      {
        id: "seo",
        icon: "search" as IconName,
        title: "SEO & accessibilité",
        text: "Être trouvé, et être utilisable par tous.",
        items: [
          "HTML sémantique",
          "Données structurées produit, FAQ et fil d'Ariane",
          "Balises meta et Open Graph configurables",
          "Navigation complète au clavier",
          "Contrastes conformes WCAG AA",
          "Textes alternatifs sur chaque visuel",
        ],
      },
      {
        id: "international",
        icon: "globe" as IconName,
        title: "International",
        text: "Vendre au-delà des frontières sans friction.",
        items: [
          "Sélecteur de langue et de devise",
          "Compatible Shopify Markets",
          "Mises en page compatibles langues RTL",
          "Formats de prix localisés",
          "Traductions des textes du thème",
          "Messages de livraison par pays",
        ],
      },
    ],
    replaceTitle: "Ce que Kinetic remplace",
    replaceLead: "Autant d'applications que vous pouvez désinstaller — et autant d'abonnements en moins.",
    replace: [
      "Avis clients",
      "Upsell & cross-sell",
      "Page builder",
      "Bundles",
      "Méga-menu",
      "Minuteur",
      "Barre d'annonce",
      "Filtres avancés",
      "Précommande",
      "Comparateur",
    ],
    supportTitle: "Et un accompagnement à la hauteur",
    support: [
      { icon: "book" as IconName, title: "Documentation pas à pas", text: "Chaque réglage expliqué, avec captures et vidéos courtes." },
      { icon: "headset" as IconName, title: "Support humain", text: "Une équipe qui connaît le thème par cœur, par e-mail et chat." },
      { icon: "refresh" as IconName, title: "Mises à jour continues", text: "Nouveautés régulières et feuille de route publique." },
    ],
  },

  /* ── Page Tarifs ───────────────────────────────────────── */
  pricingPage: {
    eyebrow: "Tarifs",
    title: "Un prix clair, toutes les fonctionnalités",
    lead: `Chaque formule inclut le thème complet, les mises à jour et le support. ${t} jours d'essai gratuit, sans carte bancaire.`,
    billingLabel: "Période de facturation",
    monthly: "Mensuel",
    yearly: "Annuel",
    yearlyBadge: "−20 %",
    perMonth: "€ HT / mois",
    billedYearly: "facturé annuellement",
    billedMonthly: "facturé chaque mois",
    popular: "Le plus choisi",
    onQuote: "Sur devis",
    plans: [
      {
        id: "solo",
        name: "Solo",
        desc: "Pour lancer ou relancer une boutique, avec tout le thème dès le premier jour.",
        cta: "Essayer gratuitement",
        features: [
          "1 boutique en production",
          "Toutes les sections et tous les blocs",
          "Outils de conversion intégrés",
          "Modèles de pages",
          "Mises à jour incluses",
          "Support par e-mail",
        ],
      },
      {
        id: "growth",
        name: "Croissance",
        desc: "Pour les marques qui accélèrent et veulent un accompagnement plus proche.",
        cta: "Essayer gratuitement",
        features: [
          "Jusqu'à 3 boutiques en production",
          "Tout Solo, plus :",
          "Modèles premium par secteur",
          "Support prioritaire par chat",
          "Session d'onboarding en visio",
          "Accès anticipé aux nouveautés",
        ],
      },
      {
        id: "studio",
        name: "Studio",
        desc: "Pour les agences et freelances qui déploient Kinetic chez leurs clients.",
        cta: "Nous contacter",
        features: [
          "Licences multiples à tarif dégressif",
          "Tout Croissance, plus :",
          "Accès au dépôt Git du thème",
          "Canal direct avec l'équipe technique",
          "Kit de présentation client",
          "Mise en avant dans l'annuaire partenaires",
        ],
      },
    ],
    guaranteeTitle: `Satisfait ou remboursé ${site.refundDays} jours`,
    guaranteeText: `Après votre essai, vous avez encore ${site.refundDays} jours pour changer d'avis. Un e-mail suffit, nous vous remboursons sans discussion.`,
    compareTitle: "Comparer les formules",
    compareFeature: "Fonctionnalité",
    compareRows: [
      { label: "Boutiques en production", values: ["1", "3", "Illimité"] },
      { label: "Boutiques de développement", values: ["✓", "✓", "✓"] },
      { label: "Sections, blocs et outils de conversion", values: ["✓", "✓", "✓"] },
      { label: "Modèles de pages", values: ["Standards", "Standards + premium", "Standards + premium"] },
      { label: "Mises à jour", values: ["✓", "✓ + accès anticipé", "✓ + accès anticipé"] },
      { label: "Support", values: ["E-mail", "Chat prioritaire", "Canal dédié"] },
      { label: "Onboarding en visio", values: ["—", "✓", "✓"] },
      { label: "Accès au dépôt Git", values: ["—", "—", "✓"] },
    ],
    yes: "Inclus",
    no: "Non inclus",
    faqTitle: "Questions sur la facturation",
    faq: [
      {
        q: "Puis-je changer de formule plus tard ?",
        a: "Oui, à tout moment depuis votre espace client. Le changement est immédiat et la différence est calculée au prorata.",
      },
      {
        q: "Quels moyens de paiement acceptez-vous ?",
        a: "Carte bancaire (Visa, Mastercard, American Express) et prélèvement SEPA. Les factures sont disponibles dans votre espace client.",
      },
      {
        q: "Les prix sont-ils HT ou TTC ?",
        a: "Les prix affichés sont hors taxes. La TVA applicable est ajoutée selon votre pays et votre statut (autoliquidation pour les entreprises européennes disposant d'un numéro de TVA).",
      },
      {
        q: "Que se passe-t-il à la fin de l'essai ?",
        a: "Rien d'automatique : aucun moyen de paiement n'est demandé pendant l'essai. Vous choisissez une formule pour continuer, ou le thème reste simplement non publié.",
      },
    ],
  },

  /* ── Page Contact ──────────────────────────────────────── */
  contactPage: {
    eyebrow: "Contact",
    title: "Parlons de votre boutique",
    lead: "Une question avant de vous lancer, un souci technique ou un projet d'agence ? Écrivez-nous : une vraie personne vous répond.",
    responseTime: "Réponse sous [24 h ouvrées]",
    channels: [
      { icon: "mail" as IconName, title: "Avant-vente", text: "Conseils sur la formule et la migration.", value: site.email },
      { icon: "headset" as IconName, title: "Support client", text: "Aide sur l'installation et les réglages.", value: site.supportEmail },
    ],
    faqLink: "Consulter la FAQ",
    form: {
      title: "Envoyer un message",
      name: "Nom complet",
      email: "Adresse e-mail",
      store: "URL de votre boutique",
      optional: "facultatif",
      subject: "Sujet",
      subjects: ["Question avant achat", "Support technique", "Partenariat agence", "Autre demande"],
      message: "Votre message",
      messageHint: "20 caractères minimum.",
      consent: "J'accepte que mes données soient utilisées pour traiter ma demande, conformément à la",
      consentLink: "politique de confidentialité",
      submit: "Envoyer le message",
      sending: "Envoi en cours…",
      required: "obligatoire",
      success: "Merci, votre message est bien parti ! Nous revenons vers vous très vite.",
      error: "Le message n'a pas pu être envoyé. Vérifiez les champs signalés ou réessayez dans un instant.",
      errors: {
        name: "Indiquez votre nom (2 caractères minimum).",
        email: "Saisissez une adresse e-mail valide, par exemple nom@domaine.fr.",
        store: "Saisissez une URL valide, par exemple https://ma-boutique.com.",
        subject: "Choisissez un sujet.",
        message: "Votre message doit contenir au moins 20 caractères.",
        consent: "Votre accord est nécessaire pour traiter la demande.",
      },
      errorSummary: "Le formulaire contient des erreurs :",
    },
  },

  legalPage: {
    title: "Mentions légales",
    updated: "Dernière mise à jour : [date]",
    sections: [
      {
        h: "Éditeur du site",
        p: `${site.legalName} — [forme juridique, capital social] — [adresse du siège] — RCS [ville et numéro] — TVA intracommunautaire [numéro] — Contact : ${site.email}`,
      },
      { h: "Directeur de la publication", p: "[Nom du directeur de la publication]" },
      {
        h: "Hébergement",
        p: "Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis — vercel.com. [À adapter si vous changez d'hébergeur]",
      },
      {
        h: "Propriété intellectuelle",
        p: "L'ensemble des contenus de ce site (textes, visuels, logo, code) est la propriété de l'éditeur, sauf mention contraire. Les photographies d'illustration proviennent d'Unsplash et sont utilisées selon la licence Unsplash.",
      },
    ],
    placeholder: "[Page à compléter et valider par votre conseil juridique]",
  },

  privacyPage: {
    title: "Politique de confidentialité",
    updated: "Dernière mise à jour : [date]",
    sections: [
      {
        h: "Données collectées",
        p: "Via le formulaire de contact : nom, adresse e-mail, URL de boutique (facultative) et contenu du message. Ces données servent uniquement à répondre à votre demande.",
      },
      {
        h: "Cookies",
        p: "Le site dépose uniquement des éléments de stockage nécessaires (thème clair/sombre, langue, choix de consentement). La mesure d'audience n'est activée qu'avec votre accord et peut être retirée à tout moment via « Gérer les cookies » en bas de page.",
      },
      { h: "Durée de conservation", p: "Les messages sont conservés [durée] au maximum, puis supprimés." },
      {
        h: "Vos droits",
        p: `Vous disposez d'un droit d'accès, de rectification, d'effacement, d'opposition et de portabilité. Pour l'exercer : ${site.email}. Vous pouvez également saisir la CNIL (cnil.fr).`,
      },
    ],
    placeholder: "[Page à compléter et valider par votre conseil juridique / DPO]",
  },

  notFound: {
    title: "Cette page a pris un raccourci.",
    text: "Le lien est peut-être ancien ou mal saisi. Pas de panique : tout le reste est encore là.",
    home: "Retour à l'accueil",
    contact: "Signaler le lien",
  },
};

export type Dict = typeof fr;
