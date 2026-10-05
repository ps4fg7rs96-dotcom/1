#!/usr/bin/env python3
"""Génère locales/fr.default.json et locales/en.json (mêmes clés, vérifiées)."""
import json, os
L = os.path.join(os.path.dirname(__file__), '..', 'theme', 'locales')

fr = {
 "general": {"home": "Accueil", "close": "Fermer", "tagline": "Thème Shopify", "page": "Page {{ page }}", "tagged_with": "Avec le tag « {{ tags }} »",
   "placeholder": "Donnée d'exemple à remplacer",
   "pagination": {"label": "Pagination", "previous": "Page précédente", "next": "Page suivante", "page": "Page {{ number }}"}},
 "accessibility": {"skip_to_text": "Aller au contenu"},
 "sections": {
   "announcement": {"label": "Annonces"},
   "header": {"menu": "Menu", "search": "Rechercher", "search_placeholder": "Rechercher un produit…", "account": "Mon compte",
              "cart": {"one": "Panier ({{ count }} article)", "other": "Panier ({{ count }} articles)"}, "mode_toggle": "Basculer le thème clair / sombre"},
   "testimonials": {"previous": "Avis précédent", "next": "Avis suivant", "slide": "Avis {{ n }} sur {{ total }}"},
   "featured_collection": {"view_all": "Tout voir"},
   "footer": {"email": "Votre adresse e-mail", "subscribe": "S'inscrire", "newsletter_success": "Merci, c'est noté !", "country": "Pays / devise", "language": "Langue", "payment": "Moyens de paiement acceptés"}},
 "hero_editor": {
   "region_label": "Démonstration interactive de l'éditeur de thème", "toolbar": "Outils de l'éditeur", "layers": "Calques", "select": "Outil de sélection",
   "undo": "Annuler", "redo": "Rétablir", "more": "Plus d'options", "show_outlines": "Afficher les contours des blocs", "reset": "Réinitialiser la démo",
   "home_page": "Page d'accueil", "demo_store": "Boutique démo", "reviews": "avis", "add_to_cart": "Ajouter au panier",
   "empty_group": "Groupe vide — cliquez pour ajouter un bloc", "block_actions": "Actions du bloc", "duplicate": "Dupliquer", "hide": "Masquer", "delete": "Supprimer",
   "add_block": "Ajouter un bloc en dessous", "panel_hint": "Tapez : l'aperçu se met à jour en direct", "text": "Texte", "format": "Mise en forme",
   "ai": "Réécrire avec l'IA", "size": "Taille du texte", "bold": "Gras", "italic": "Italique", "link": "Lien", "list": "Liste à puces", "olist": "Liste numérotée",
   "saved": "Modifications enregistrées (démo)", "selected": "Bloc sélectionné :", "new_text": "Nouveau bloc de texte — tapez pour le modifier",
   "group_block": "Livraison offerte dès 49 €", "not_editable": "Ce bloc se règle dans ses propres paramètres.", "coming_soon": "Disponible dans le thème complet",
   "hidden": "Bloc masqué", "shown": "Bloc affiché", "deleted": "Bloc supprimé — Ctrl+Z pour annuler", "duplicated": "Bloc dupliqué", "switched": "Boutique affichée :",
   "blocks": {"title": "Titre", "rating": "Note", "price": "Prix", "tags": "Tags", "packaging": "Conditionnement", "button": "Bouton d'achat", "image": "Image produit",
              "store_name": "Nom de la boutique", "text": "Texte", "badge": "Badge réassurance"}},
 "mockup": {"sections": "Sections", "editor_blocks": "Bannière animée|Galerie produit|Réassurance|Avis clients|Ventes croisées|FAQ", "add_block": "Ajouter un bloc",
   "free_shipping": "Plus que 12 € pour la livraison offerte", "product": "Bougie Lueur", "upsell": "Souvent acheté avec", "upsell_item": "Mèche de rechange", "add": "Ajouter",
   "templates": "Produit|Collection|Landing|À propos|Lancement|Listicle", "url": "votre-boutique.com", "launch": "Lancement", "landing_title": "La nouvelle collection est là",
   "discover": "Je découvre", "countdown": "Fin de l'offre dans"},
 "products": {"product": {"add_to_cart": "Ajouter au panier", "sold_out": "Épuisé", "unavailable": "Indisponible", "price": "Prix", "regular_price": "Prix habituel",
   "price_from": "À partir de {{ price }}", "quantity": "Quantité", "increase": "Augmenter la quantité", "decrease": "Diminuer la quantité",
   "quick_add": "Ajouter {{ title }} au panier", "example_title": "Nom du produit", "gallery": "Galerie du produit", "show_media": "Afficher le média {{ n }}",
   "in_stock": "En stock, expédié sous 24 h", "low_stock": {"one": "Plus qu'un seul en stock", "other": "Plus que {{ count }} en stock"},
   "rating_label": "Noté {{ rating }} sur {{ max }}"}},
 "cart": {"title": "Votre panier", "empty": "Votre panier est vide.", "continue": "Continuer mes achats", "checkout": "Commander", "subtotal": "Sous-total",
   "taxes_note": "Taxes incluses. Frais de livraison calculés à l'étape suivante.", "view_cart": "Voir le panier", "remove": "Retirer", "update": "Mettre à jour",
   "note": "Instructions pour la commande", "summary": "Récapitulatif", "increase": "Augmenter la quantité de {{ title }}", "decrease": "Diminuer la quantité de {{ title }}",
   "added": "Ajouté au panier", "error": "Une erreur est survenue, réessayez.", "free_shipping_label": "Progression vers la livraison offerte",
   "free_shipping_remaining_html": "Plus que <strong>{{ amount }}</strong> pour la livraison offerte", "free_shipping_done": "Bravo, la livraison est offerte !"},
 "collections": {"label": "Collection", "products": "Produits", "sort_by": "Trier par", "apply": "Appliquer", "clear_all": "Tout effacer", "remove_filter": "Retirer le filtre",
   "price_min": "Prix minimum", "price_max": "Prix maximum", "empty": "Aucun produit ne correspond à ces filtres."},
 "search": {"title": "Recherche", "submit": "Rechercher", "results_count": {"one": "{{ count }} résultat pour « {{ terms }} »", "other": "{{ count }} résultats pour « {{ terms }} »"},
   "no_results": "Aucun résultat pour « {{ terms }} ». Essayez un autre mot-clé."},
 "blogs": {"label": "Journal", "by": "Par {{ author }}", "comments": {"one": "{{ count }} commentaire", "other": "{{ count }} commentaires"}, "name": "Nom", "email": "E-mail",
   "message": "Commentaire", "post": "Publier", "comment_posted": "Merci, votre commentaire est publié.", "comment_moderated": "Merci ! Votre commentaire sera publié après validation."},
 "templates": {"404": {"title": "Cette page a pris un raccourci.", "text": "Le lien est peut-être ancien ou mal saisi. Cherchez ce qu'il vous faut ou revenez à l'accueil.", "home": "Retour à l'accueil"}},
 "password": {"notify": "Me prévenir", "subscribed": "Merci ! Vous serez prévenu dès l'ouverture.", "enter_with_password": "Entrer avec le mot de passe", "password": "Mot de passe",
   "enter": "Entrer", "powered": "Boutique propulsée par"},
}

en = {
 "general": {"home": "Home", "close": "Close", "tagline": "Shopify theme", "page": "Page {{ page }}", "tagged_with": "Tagged “{{ tags }}”",
   "placeholder": "Sample data to replace",
   "pagination": {"label": "Pagination", "previous": "Previous page", "next": "Next page", "page": "Page {{ number }}"}},
 "accessibility": {"skip_to_text": "Skip to content"},
 "sections": {
   "announcement": {"label": "Announcements"},
   "header": {"menu": "Menu", "search": "Search", "search_placeholder": "Search for a product…", "account": "My account",
              "cart": {"one": "Cart ({{ count }} item)", "other": "Cart ({{ count }} items)"}, "mode_toggle": "Toggle light / dark theme"},
   "testimonials": {"previous": "Previous review", "next": "Next review", "slide": "Review {{ n }} of {{ total }}"},
   "featured_collection": {"view_all": "View all"},
   "footer": {"email": "Your email address", "subscribe": "Subscribe", "newsletter_success": "Thanks, you're in!", "country": "Country / currency", "language": "Language", "payment": "Accepted payment methods"}},
 "hero_editor": {
   "region_label": "Interactive theme editor demo", "toolbar": "Editor tools", "layers": "Layers", "select": "Select tool",
   "undo": "Undo", "redo": "Redo", "more": "More options", "show_outlines": "Show block outlines", "reset": "Reset the demo",
   "home_page": "Home page", "demo_store": "Demo store", "reviews": "reviews", "add_to_cart": "Add to cart",
   "empty_group": "Empty group — click to add a block", "block_actions": "Block actions", "duplicate": "Duplicate", "hide": "Hide", "delete": "Delete",
   "add_block": "Add a block below", "panel_hint": "Type: the preview updates live", "text": "Text", "format": "Formatting",
   "ai": "Rewrite with AI", "size": "Text size", "bold": "Bold", "italic": "Italic", "link": "Link", "list": "Bulleted list", "olist": "Numbered list",
   "saved": "Changes saved (demo)", "selected": "Selected block:", "new_text": "New text block — type to edit it",
   "group_block": "Free shipping from €49", "not_editable": "This block is configured in its own settings.", "coming_soon": "Available in the full theme",
   "hidden": "Block hidden", "shown": "Block shown", "deleted": "Block deleted — Ctrl+Z to undo", "duplicated": "Block duplicated", "switched": "Showing store:",
   "blocks": {"title": "Title", "rating": "Rating", "price": "Price", "tags": "Tags", "packaging": "Packaging", "button": "Buy button", "image": "Product image",
              "store_name": "Store name", "text": "Text", "badge": "Trust badge"}},
 "mockup": {"sections": "Sections", "editor_blocks": "Animated banner|Product gallery|Trust bar|Reviews|Cross-sells|FAQ", "add_block": "Add block",
   "free_shipping": "€12 away from free shipping", "product": "Lueur candle", "upsell": "Often bought with", "upsell_item": "Spare wick", "add": "Add",
   "templates": "Product|Collection|Landing|About|Launch|Listicle", "url": "your-store.com", "launch": "Launch", "landing_title": "The new collection has landed",
   "discover": "Discover", "countdown": "Offer ends in"},
 "products": {"product": {"add_to_cart": "Add to cart", "sold_out": "Sold out", "unavailable": "Unavailable", "price": "Price", "regular_price": "Regular price",
   "price_from": "From {{ price }}", "quantity": "Quantity", "increase": "Increase quantity", "decrease": "Decrease quantity",
   "quick_add": "Add {{ title }} to cart", "example_title": "Product name", "gallery": "Product gallery", "show_media": "Show media {{ n }}",
   "in_stock": "In stock, ships within 24h", "low_stock": {"one": "Only one left in stock", "other": "Only {{ count }} left in stock"},
   "rating_label": "Rated {{ rating }} out of {{ max }}"}},
 "cart": {"title": "Your cart", "empty": "Your cart is empty.", "continue": "Continue shopping", "checkout": "Check out", "subtotal": "Subtotal",
   "taxes_note": "Taxes included. Shipping calculated at checkout.", "view_cart": "View cart", "remove": "Remove", "update": "Update",
   "note": "Order instructions", "summary": "Order summary", "increase": "Increase quantity of {{ title }}", "decrease": "Decrease quantity of {{ title }}",
   "added": "Added to cart", "error": "Something went wrong, please try again.", "free_shipping_label": "Progress towards free shipping",
   "free_shipping_remaining_html": "Only <strong>{{ amount }}</strong> away from free shipping", "free_shipping_done": "Nice, shipping is on us!"},
 "collections": {"label": "Collection", "products": "Products", "sort_by": "Sort by", "apply": "Apply", "clear_all": "Clear all", "remove_filter": "Remove filter",
   "price_min": "Minimum price", "price_max": "Maximum price", "empty": "No products match these filters."},
 "search": {"title": "Search", "submit": "Search", "results_count": {"one": "{{ count }} result for “{{ terms }}”", "other": "{{ count }} results for “{{ terms }}”"},
   "no_results": "No results for “{{ terms }}”. Try another keyword."},
 "blogs": {"label": "Journal", "by": "By {{ author }}", "comments": {"one": "{{ count }} comment", "other": "{{ count }} comments"}, "name": "Name", "email": "Email",
   "message": "Comment", "post": "Post", "comment_posted": "Thanks, your comment is live.", "comment_moderated": "Thanks! Your comment will appear once approved."},
 "templates": {"404": {"title": "This page took a shortcut.", "text": "The link may be old or mistyped. Search for what you need or head back home.", "home": "Back to home"}},
 "password": {"notify": "Notify me", "subscribed": "Thanks! We'll let you know when we open.", "enter_with_password": "Enter using password", "password": "Password",
   "enter": "Enter", "powered": "Store powered by"},
}

def keys(d, p=''):
    out = set()
    for k, v in d.items():
        out |= keys(v, f'{p}{k}.') if isinstance(v, dict) else {p + k}
    return out
assert keys(fr) == keys(en), keys(fr) ^ keys(en)
for name, data in (('fr.default.json', fr), ('en.json', en)):
    with open(os.path.join(L, name), 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2); f.write('\n')
print(len(keys(fr)), 'keys')
