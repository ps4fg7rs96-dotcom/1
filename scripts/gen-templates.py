#!/usr/bin/env python3
"""Génère les templates JSON du thème (contenu FR par défaut). Relançable sans risque."""
import json, os
T = os.path.join(os.path.dirname(__file__), '..', 'theme', 'templates')
os.makedirs(T, exist_ok=True)

def section(type_, settings=None, blocks=None):
    s = {"type": type_, "settings": settings or {}}
    if blocks:
        s["blocks"] = {f"{b['type']}-{i+1}": b for i, b in enumerate(blocks)}
        s["block_order"] = list(s["blocks"].keys())
    return s

def template(sections, layout=None):
    t = {}
    if layout: t["layout"] = layout
    t["sections"] = {k: v for k, v in sections}
    t["order"] = [k for k, _ in sections]
    return t

def B(type_, **settings): return {"type": type_, "settings": settings}

def write(name, data):
    with open(os.path.join(T, name), 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        f.write('\n')

stores = [
  B("store", name="Sève", niche="Cosmétique naturelle", accent="#3F6E5B", tint="#EEF3EF",
    product_title="Sérum éclat à la vitamine C", price="34,00 €", rating="4,8", reviews="126",
    tags="Peaux sensibles, Vegan, Sans parfum", featured_tag="Vegan",
    packaging="Flacon verre 30 ml · environ 2 mois d'utilisation", badge="Nouveau", art="bottle",
    announcement="Livraison offerte dès 45 € · échantillon glissé dans chaque colis", announcement_bg="#1F3A30", announcement_color="#FFFFFF",
    logo_style="serif", tag_color="#F6E27A",
    description="Un sérum léger à la vitamine C stabilisée qui ravive l'éclat du teint, unifie la peau et s'applique matin et soir, sans picotement ni effet collant. Formulé et conditionné en France.",
    products="Brume tonique rose | 18,00 € | flask | Le geste fraîcheur à vaporiser après le sérum.\nCrème veloutée nuit | 29,00 € | candle | La texture fondante qui nourrit pendant le sommeil.\nTrousse voyage | 12,00 € | bag | Trois mini formats pour partir léger.",
    ai_texts="Testé sous contrôle dermatologique, convient aux peaux sensibles.|Flacon en verre recyclable, pipette doseuse incluse.|Résultat visible dès deux semaines d'utilisation.",
    ai_suggestions="Sérum éclat vitamine C — teint lumineux en 14 jours|Le sérum qui réveille les peaux fatiguées|Vitamine C stabilisée, zéro picotement"),
  B("store", name="Ruelle", niche="Café de spécialité", accent="#8A4B2A", tint="#F5EDE3",
    product_title="Espresso n°3 — notes cacao & noisette", price="12,50 €", rating="4,9", reviews="312",
    tags="Grains entiers, Torréfié cette semaine, Bio", featured_tag="Torréfié cette semaine",
    packaging="Sachet kraft 250 g · valve de fraîcheur", badge="Best-seller", art="bag",
    announcement="Torréfié le lundi, expédié le mardi · livraison offerte dès 35 €", announcement_bg="#3B2316", announcement_color="#F5EDE3",
    logo_style="wide", tag_color="#F2C98B",
    description="Un assemblage brésilien et éthiopien torréfié en petites fournées. En bouche : cacao, noisette grillée et une finale longue, pour l'espresso comme pour la cafetière italienne.",
    products="Moulin manuel Ruelle | 39,00 € | flask | Meule conique en céramique, 12 réglages.\nTasse double paroi | 16,00 € | candle | Garde la crème et la chaleur plus longtemps.\nDécaféiné n°5 | 13,50 € | bag | Toute la rondeur, sans la caféine.",
    ai_texts="Moulu à la commande sur simple demande, sans supplément.|Café de spécialité noté au-dessus de 84 points.|Abonnement possible : un sachet frais toutes les deux semaines.",
    ai_suggestions="Espresso n°3, l'intensité sans l'amertume|Le café du matin qui sent la torréfaction|Un espresso rond, torréfié à la commande"),
  B("store", name="Altitude", niche="Équipement outdoor", accent="#D9622B", tint="#FBEFE6",
    product_title="Gourde isotherme Crête 750 ml", price="29,90 €", rating="4,7", reviews="89",
    tags="24 h au frais, Inox recyclé, Sans BPA", featured_tag="Inox recyclé",
    packaging="Livrée sans plastique · carton 100 % recyclé", badge="−15 %", art="flask",
    announcement="Garantie 2 ans · retours gratuits sous 30 jours", announcement_bg="#D9622B", announcement_color="#FFFFFF",
    logo_style="sans", tag_color="#FFE08A",
    description="Double paroi en inox recyclé, bouchon étanche et anse intégrée : la gourde Crête garde l'eau fraîche 24 heures et une boisson chaude 12 heures, du parking au sommet.",
    products="Housse néoprène | 14,90 € | bag | Protège des chocs et ajoute une isolation.\nBouchon sport | 9,90 € | flask | Pipette à une main pour boire en marchant.\nLampe frontale Crête | 34,00 € | candle | 300 lumens, rechargeable en USB-C.",
    ai_texts="Testée de −10 °C à 40 °C sur nos sentiers de test.|Compatible lave-vaisselle, sans goût métallique.|Chaque gourde vendue finance 1 m de sentier entretenu.",
    ai_suggestions="Gourde Crête : l'eau fraîche jusqu'au sommet|750 ml d'inox recyclé, 24 h de fraîcheur|La gourde qui ne transpire jamais"),
  B("kpi", label="Panier moyen", value="[68,40 €]", delta="[+12 %]"),
  B("kpi", label="Taux de conversion", value="[3,4 %]", delta="[+0,8 pt]"),
]

index = template([
  ("hero", section("hero-editor", {
      "eyebrow": "Thème Shopify 2.0 · Pensé pour vendre",
      "heading": "Modifiez votre boutique",
      "heading_highlight": "en direct.",
      "subheading": "Cliquez sur un bloc, tapez, c'est en ligne. Kinetic réunit éditeur visuel, outils de conversion et vitesse de chargement dans un seul thème — sans une ligne de code.",
      "hand_word": "À vous de jouer : tout est vraiment cliquable",
      "cta_label": "Essayer gratuitement", "cta_link": "shopify://collections/all",
      "cta2_label": "Voir les boutiques démo", "cta2_link": "",
      "rating_text": "[4,9/5] · [250+] avis vérifiés",
      "save_label": "Enregistrer", "tint": "#FBF3DF", "tint_dark": "#2A2418"}, stores)),
  ("logos", section("logo-marquee", {"heading": "Ils accélèrent déjà leur boutique avec Kinetic", "speed": 40},
      [B("logo", name=f"[Logo client {i}]") for i in range(1, 9)])),
  ("benefits", section("benefits", {
      "eyebrow": "Pourquoi Kinetic",
      "heading": "Tout pour vendre. Rien qui ne ralentisse.",
      "lead": "Nous avons retiré une à une les frictions habituelles d'une boutique Shopify : applis empilées, pages lourdes, design figé.",
      "columns": "4"}, [
      B("benefit", icon="puzzle", title="Moins d'applis, moins de frais", text="Avis, ventes croisées, offres groupées, minuteurs : ce que vous louiez à l'unité est livré avec le thème."),
      B("benefit", icon="gauge", title="Une vitesse qui se ressent", text="Code chargé à la demande, aucune librairie externe : chaque page n'embarque que ce qu'elle affiche."),
      B("benefit", icon="palette", title="Votre charte, partout", text="Couleurs, typographies et arrondis se règlent une fois et s'appliquent à toute la boutique."),
      B("benefit", icon="smartphone", title="Pensé pour le pouce", text="Chaque section est dessinée pour le mobile avant d'être élargie à l'écran d'ordinateur."),
  ])),
  ("features", section("feature-rows", {
      "eyebrow": "Fonctionnalités",
      "heading": "Un thème, quatre leviers de croissance",
      "lead": "Construire, convertir, décliner, lancer : chaque étape a son outil natif dans l'éditeur Shopify."}, [
      B("row", eyebrow="Éditeur visuel", title="Composez vos pages comme un jeu de construction",
        text="<p>Des dizaines de blocs à combiner directement dans l'éditeur Shopify. Glissez, imbriquez, réordonnez : la mise en page vous ressemble, sans ouvrir un fichier de code.</p>",
        bullets="Blocs imbriqués et sections dynamiques\nAperçu instantané mobile et ordinateur\nCompatible avec les dernières évolutions de Shopify", visual="editor"),
      B("row", eyebrow="Conversion", title="Les leviers de vente branchés dans le thème",
        text="<p>Jauge de livraison offerte, ventes croisées dans le panier, offres groupées, badges de réassurance : chaque levier s'active d'un interrupteur.</p>",
        bullets="Panier tiroir avec recommandations\nOffres groupées et paliers de remise\nUrgence maîtrisée : stock bas, minuteur, précommande", visual="cart"),
      B("row", eyebrow="Modèles prêts à l'emploi", title="Partez d'une page qui convertit déjà",
        text="<p>Fiche produit, collection, à propos, lancement : importez un modèle conçu pour votre secteur, remplacez textes et visuels, publiez.</p>",
        bullets="Modèles importables en un clic\nStructures issues des bonnes pratiques e-commerce\nNouveaux modèles à chaque mise à jour", visual="templates"),
      B("row", eyebrow="Landing pages natives", title="Vos pages de campagne, sans page builder",
        text="<p>Soldes, lancements, listicles : créez-les avec les mêmes blocs que le reste du site, sans outil externe ni script qui alourdit le chargement.</p>",
        bullets="Pages de campagne en quelques minutes\nMême vitesse que le reste de la boutique\nCohérence garantie par le design system", visual="landing",
        button_label="Voir une landing page", button_link=""),
  ])),
  ("performance", section("performance", {
      "eyebrow": "Performance",
      "heading": "Pensé pour être rapide. Mesuré pour le rester.",
      "lead": "Chaque milliseconde gagnée rapproche un visiteur du paiement. Kinetic part d'une base légère et refuse tout ce qui n'est pas indispensable.",
      "scores_title": "Scores Lighthouse mobile", "bars_title": "Affichage du contenu principal",
      "note": "[Scores d'exemple — à remplacer par vos propres mesures]"}, [
      B("point", icon="layers", title="Chargement à la demande", text="Seules les sections présentes sur la page envoient leur code au navigateur."),
      B("point", icon="code-off", title="Zéro dépendance", text="Pas de jQuery, pas de librairie d'animation : du JavaScript natif, court et ciblé."),
      B("point", icon="image", title="Images responsives", text="Formats modernes, tailles adaptées à chaque écran et chargement différé hors champ."),
      B("score", label="Performance", value=98), B("score", label="Accessibilité", value=100),
      B("score", label="Bonnes pratiques", value=100), B("score", label="SEO", value=100),
      B("bar", label="Kinetic", value="[1,1 s]", width=26, brand=True),
      B("bar", label="Thème standard + 6 applis", value="[3,4 s]", width=80, brand=False),
  ])),
  ("demos", section("demo-stores", {
      "eyebrow": "Boutiques démo",
      "heading": "Une base, autant de boutiques que de marques",
      "lead": "Six univers fictifs pour voir Kinetic s'adapter à votre secteur. Changez de palette et de rythme : la structure qui convertit reste la même.",
      "cta_label": "Voir la démo"}, [
      B("store", name="Sève", niche="Cosmétique naturelle", accent="#3F6E5B", tint="#E3EEE7", art="bottle", link=""),
      B("store", name="Ruelle", niche="Café de spécialité", accent="#8A4B2A", tint="#F2E6D9", art="bag", link=""),
      B("store", name="Altitude", niche="Équipement outdoor", accent="#D9622B", tint="#FBE8DA", art="flask", link=""),
      B("store", name="Lueur", niche="Bougies & maison", accent="#B4567A", tint="#F7E6EE", art="candle", link=""),
      B("store", name="Atelier Soleil", niche="Mode & accessoires", accent="#C99A1E", tint="#FBF1D6", art="bag", link=""),
      B("store", name="Ondes", niche="Bien-être & sport", accent="#2B37DE", tint="#E0E3FF", art="flask", link=""),
  ])),
  ("comparison", section("comparison", {
      "eyebrow": "Applis payantes vs natif",
      "heading": "Arrêtez d'empiler les abonnements",
      "lead": "Un thème classique vous oblige à combler chaque manque par une application. Kinetic les remplace par des réglages natifs.",
      "before_title": "Thème classique + applications", "total_label": "Total mensuel", "total": "[122 €]",
      "cons": "Scripts tiers qui ralentissent chaque page\nStyles incohérents d'une appli à l'autre\nConflits à chaque mise à jour",
      "after_title": "Avec Kinetic",
      "pros": "Avis, upsells, bundles et minuteurs intégrés\nLanding pages avec les blocs natifs\nUn seul design system pour tout le site\nUn seul abonnement, un seul support",
      "price_label": "À partir de", "price": "31 €", "per_month": "/mois",
      "cta_label": "Démarrer l'essai gratuit", "cta_link": "",
      "note": "[Montants indicatifs à remplacer par vos propres estimations]"}, [
      B("app", label="Application d'avis clients", price="[15 €]"),
      B("app", label="Ventes croisées & upsells", price="[25 €]"),
      B("app", label="Page builder pour landing pages", price="[40 €]"),
      B("app", label="Offres groupées & remises", price="[20 €]"),
      B("app", label="Méga-menu & filtres avancés", price="[12 €]"),
      B("app", label="Minuteur & barre d'annonce", price="[10 €]"),
  ])),
  ("steps", section("steps", {
      "eyebrow": "Mise en route", "heading": "En ligne en trois étapes",
      "lead": "Pas de prestataire à briefer, pas de délai d'intégration : vous restez maître du calendrier."}, [
      B("step", icon="download", title="Téléchargez le thème", text="Récupérez le fichier .zip depuis votre espace client, prêt à importer."),
      B("step", icon="upload", title="Importez sur Shopify", text="Boutique en ligne > Thèmes > Importer. Votre thème actuel reste en ligne pendant que vous travaillez."),
      B("step", icon="rocket", title="Personnalisez, publiez", text="Réglez couleurs, polices et contenus dans l'éditeur, vérifiez le rendu mobile, puis publiez."),
  ])),
  ("reviews", section("testimonials", {
      "eyebrow": "Avis clients", "heading": "Ce que disent les marchands",
      "lead": "[Témoignages d'exemple — remplacez-les par de vrais avis clients vérifiés.]"}, [
      B("testimonial", quote="[Avis à remplacer] Décrivez ici le résultat concret obtenu : vitesse, ventes, temps gagné.", name="[Prénom N.]", role="[Fondatrice · boutique de mode]", rating=5),
      B("testimonial", quote="[Avis à remplacer] Mentionnez les applications supprimées et l'économie réalisée chaque mois.", name="[Prénom N.]", role="[Gérant · épicerie fine]", rating=5),
      B("testimonial", quote="[Avis à remplacer] Racontez la prise en main de l'éditeur et la mise en ligne.", name="[Prénom N.]", role="[E-commerçante · cosmétique]", rating=5),
      B("testimonial", quote="[Avis à remplacer] Citez un échange avec le support et la rapidité de la réponse.", name="[Prénom N.]", role="[Responsable e-commerce · déco]", rating=5),
      B("testimonial", quote="[Avis à remplacer] Expliquez pourquoi l'agence déploie le thème chez ses clients.", name="[Prénom N.]", role="[Directeur · agence Shopify]", rating=5),
  ])),
  ("faq", section("faq", {
      "eyebrow": "FAQ", "heading": "Vos questions, nos réponses",
      "lead": "Vous ne trouvez pas votre réponse ? L'équipe vous répond directement.",
      "link_label": "Poser une question", "link": "", "open_first": False}, [
      B("question", question="Kinetic fonctionne-t-il avec ma boutique actuelle ?", answer="<p>Oui. C'est un thème Online Store 2.0 compatible avec toutes les boutiques Shopify. Importez-le à côté de votre thème actuel, configurez-le à votre rythme, publiez quand tout est prêt.</p>"),
      B("question", question="Faut-il savoir coder ?", answer="<p>Non. Couleurs, typographies, sections, blocs et outils de conversion se règlent dans l'éditeur visuel de Shopify.</p>"),
      B("question", question="Puis-je désinstaller mes applications ?", answer="<p>Dans la plupart des cas. Avis, ventes croisées, offres groupées, minuteurs et landing pages sont intégrés : activez la fonction Kinetic, vérifiez, puis supprimez l'application.</p>"),
      B("question", question="Le thème est-il optimisé pour le référencement ?", answer="<p>Oui : HTML sémantique, données structurées produit, FAQ et organisation, balises meta, images responsives et chargement rapide.</p>"),
      B("question", question="Les mises à jour sont-elles incluses ?", answer="<p>Oui, tant que votre licence est active : nouvelles sections, nouveaux modèles et compatibilité avec les évolutions de Shopify.</p>"),
      B("question", question="Que se passe-t-il si j'arrête mon abonnement ?", answer="<p>Votre boutique continue de fonctionner avec la dernière version installée. Vous perdez seulement l'accès aux nouvelles mises à jour et au support.</p>"),
  ])),
  ("cta", section("final-cta", {
      "heading": "Donnez de l'élan à votre boutique.",
      "text": "Installez Kinetic ce soir, publiez quand vous êtes prêt. 21 jours d'essai complet, sans carte bancaire.",
      "cta_label": "Démarrer l'essai gratuit", "cta_link": "", "cta2_label": "Parler à l'équipe", "cta2_link": "",
      "reassurance": "Essai gratuit 21 jours | Sans carte bancaire | Résiliable en 1 clic"})),
])
write('index.json', index)

write('product.json', template([
  ("main", section("main-product", {"sticky_atc": True, "gallery_style": "thumbs", "enable_zoom": True}, [
      B("vendor"), B("title"), B("rating"), B("price", show_tax_note=True), B("sku"), B("inventory", threshold=8, show_bar=True),
      B("variant_picker", style="swatches"), B("size_chart", label="Guide des tailles"),
      B("quantity_breaks", heading="Plus vous en prenez, plus vous économisez", default=2),
      B("buy_buttons", show_quantity=True, show_dynamic_checkout=True, show_installments=True, show_wishlist=True, show_pickup=True),
      B("back_in_stock", heading="Prévenez-moi du retour en stock"),
      B("delivery", min_days=2, max_days=4, cutoff=14), B("free_shipping"),
      B("bundle", heading="Souvent achetés ensemble", use_recommendations=True, discount=0),
      B("trust", line_1="Livraison offerte dès 60 €", line_2="Retours gratuits sous 30 jours", line_3="Paiement 100 % sécurisé"),
      B("description", collapsed=False),
      B("collapsible", heading="Livraison et retours", icon="truck", content="<p>Expédition sous 24 h ouvrées. Retours gratuits pendant 30 jours.</p>"),
      B("collapsible", heading="Composition et entretien", icon="leaf", content="<p>Remplacez par les informations de votre produit.</p>"),
      B("complementary", heading="Complétez avec", limit=3), B("share"),
  ])),
  ("reco", section("product-recommendations", {"heading": "Vous aimerez aussi", "limit": 4})),
  ("recent", section("recently-viewed", {"heading": "Vous avez regardé", "limit": 4})),
]))
write('collection.json', template([("main", section("main-collection", {"per_page": 24, "columns": 4, "show_description": True, "enable_filters": True, "filter_layout": "sidebar", "enable_sorting": True, "pagination": "button"})), ("recent", section("recently-viewed", {"limit": 4}))]))
write('list-collections.json', template([("main", section("main-list-collections", {"heading": "Toutes les collections"}))]))
write('page.wishlist.json', template([("main", section("main-wishlist")), ("recent", section("recently-viewed", {"heading": "Vous avez regardé", "limit": 4}))]))
write('page.contact.json', template([
  ("main", section("main-page")),
  ("form", section("contact-form", {}, [B("info", icon="mail", title="E-mail", text="<p>[contact@votre-boutique.fr]</p>"), B("info", icon="clock", title="Horaires", text="<p>Du lundi au vendredi, 9 h – 18 h</p>")])),
  ("faq", section("faq", {"eyebrow": "FAQ", "heading": "Questions fréquentes"}, [B("question", question="Où en est ma commande ?", answer="<p>Remplacez par votre réponse.</p>"), B("question", question="Comment faire un retour ?", answer="<p>Remplacez par votre réponse.</p>")])),
]))
write('page.stores.json', template([("main", section("main-page")), ("stores", section("store-locator", {}, [B("store"), B("store", name="[Boutique Lyon]", address="<p>[5 place Exemple, 69000 Lyon]</p>")]))]))
write('cart.json', template([("main", section("main-cart")), ("reco", section("featured-collection", {"eyebrow": "", "heading": "Complétez votre commande", "limit": 4, "show_link": False, "layout": "slider"})), ("recent", section("recently-viewed", {"limit": 4}))]))
write('page.json', template([("main", section("main-page"))]))
write('page.landing.json', template([
  ("banner", section("hero-banner", {"eyebrow": "Lancement", "heading": "La nouvelle collection est là", "text": "Une page de campagne construite avec les blocs du thème, sans page builder ni script externe.", "cta_label": "Je découvre", "cta2_label": "En savoir plus"})),
  ("benefits", section("benefits", {"eyebrow": "Pourquoi l'adopter", "heading": "Trois bonnes raisons de craquer", "columns": "3"}, [
      B("benefit", icon="leaf", title="Matières responsables", text="Remplacez par l'argument n°1 de votre produit."),
      B("benefit", icon="truck", title="Livraison express", text="Expédié sous 24 h, livré en 48 h."),
      B("benefit", icon="refresh", title="Satisfait ou remboursé", text="30 jours pour changer d'avis."),
  ])),
  ("products", section("featured-collection", {"eyebrow": "La sélection", "heading": "Les pièces du moment", "limit": 4, "show_link": True})),
  ("free", section("custom-section", {"columns": "2", "gap": 32, "narrow": False, "alt": True}, [
      B("heading", eyebrow="Notre histoire", text="Une section libre composée de blocs", level="h2", size="h2", align="left"),
      B("text", text="<p>Ajoutez, imbriquez et réordonnez des blocs Titre, Texte, Bouton, Image ou Groupe pour construire la section dont vous avez besoin.</p>", align="left", size=1.1, muted=True),
      B("button", label="Découvrir la boutique", style="primary", arrow=True),
  ])),
  ("reviews", section("testimonials", {"eyebrow": "Avis", "heading": "Ils l'ont adoptée", "lead": "[Témoignages d'exemple à remplacer]"}, [
      B("testimonial", quote="[Avis à remplacer]", name="[Prénom N.]", role="[Cliente vérifiée]", rating=5),
      B("testimonial", quote="[Avis à remplacer]", name="[Prénom N.]", role="[Client vérifié]", rating=5),
      B("testimonial", quote="[Avis à remplacer]", name="[Prénom N.]", role="[Cliente vérifiée]", rating=5),
  ])),
  ("faq", section("faq", {"eyebrow": "FAQ", "heading": "Questions fréquentes"}, [
      B("question", question="Quels sont les délais de livraison ?", answer="<p>Remplacez par votre politique de livraison.</p>"),
      B("question", question="Puis-je retourner un article ?", answer="<p>Remplacez par votre politique de retour.</p>"),
  ])),
  ("cta", section("final-cta", {"heading": "Prêt à vous lancer ?", "text": "Une offre de lancement, valable quelques jours seulement.", "cta_label": "J'en profite", "cta2_label": "", "reassurance": "Livraison offerte | Retours 30 jours | Paiement sécurisé"})),
]))
write('blog.json', template([("main", section("main-blog", {"show_author": True}))]))
write('article.json', template([("main", section("main-article", {"show_author": True}))]))
write('search.json', template([("main", section("main-search"))]))
write('404.json', template([("main", section("main-404"))]))
write('password.json', template([("main", section("main-password", {"heading": "Ouverture très bientôt"}))], layout="password"))
print(sorted(os.listdir(T)))
