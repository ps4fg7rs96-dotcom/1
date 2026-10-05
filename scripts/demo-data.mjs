/**
 * Données fictives pour les pages de démonstration (scripts/build-demo.mjs) :
 * produits, collection, filtres, images. Les visuels sont des illustrations SVG
 * générées à partir de snippets/product-art.liquid — aucune photo, aucun contenu tiers.
 */
import { Drop } from 'liquidjs';

/** Valeur d'option (se compare comme une chaîne, porte une pastille de couleur). */
class OptionValue extends Drop {
  constructor(name, color) { super(); this.name = name; this.swatch = color ? { color } : null; }
  valueOf() { return this.name; }
  toString() { return this.name; }
}

const svgUri = (svg) => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;

/** Fabrique les visuels à partir des SVG de product-art (art → code SVG). */
export function makeImages(arts) {
  const product = (art, color, bg = '#F4F1EA') => {
    const inner = (arts[art] || arts.bottle).replace(/var\(--art\)/g, color).replace(/<svg[^>]*>/, '').replace('</svg>', '');
    return {
      src: svgUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><rect width="600" height="600" fill="${bg}"/><ellipse cx="300" cy="520" rx="150" ry="22" fill="#000" opacity=".08"/><svg x="150" y="80" width="300" height="440" viewBox="0 0 200 240">${inner}</svg></svg>`),
      alt: '',
      width: 600,
      height: 600,
    };
  };
  const scene = (c1, c2, art, color, w = 1600, h = 900) => {
    const inner = (arts[art] || arts.bag).replace(/var\(--art\)/g, color).replace(/<svg[^>]*>/, '').replace('</svg>', '');
    return {
      src: svgUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs><rect width="${w}" height="${h}" fill="url(#g)"/><circle cx="${w * 0.72}" cy="${h * 0.42}" r="${h * 0.36}" fill="#fff" opacity=".18"/><circle cx="${w * 0.12}" cy="${h * 0.9}" r="${h * 0.3}" fill="#fff" opacity=".08"/><svg x="${w * 0.6}" y="${h * 0.14}" width="${h * 0.5}" height="${h * 0.6}" viewBox="0 0 200 240">${inner}</svg></svg>`),
      alt: '',
      width: w,
      height: h,
    };
  };
  return { product, scene };
}

const cents = (eur) => Math.round(eur * 100);

export function makeCatalog(img) {
  let vid = 1000;
  const mk = ({ handle, title, vendor, art, color, price, compare = 0, tags = [], options = null, soldOut = false, description, daysOld = 90, inventory = 42 }) => {
    const media = [];
    const variants = [];
    const opts = [];
    if (options && options.colors) {
      const values = options.colors.map(([n, c]) => new OptionValue(n, c));
      opts.push({ name: 'Couleur', values, selected_value: values[0] });
      options.colors.forEach(([n, c], i) => {
        const m = { id: vid + 500 + i, media_type: 'image', ...img.product(art, c), preview_image: img.product(art, c) };
        media.push(m);
        variants.push({ id: vid++, title: n, options: [n], price: cents(price), compare_at_price: compare ? cents(compare) : 0, available: !(soldOut || (options.soldOutColor === n)), url: '#', featured_media: m, featured_image: m, sku: `${handle.toUpperCase().slice(0, 4)}-${i + 1}`, inventory_management: 'shopify', inventory_quantity: options.soldOutColor === n ? 0 : (i === 1 ? 4 : inventory), inventory_policy: 'deny', store_availabilities: [] });
      });
    } else if (options && options.sizes) {
      const values = options.sizes.map((n) => new OptionValue(n));
      opts.push({ name: options.label || 'Format', values, selected_value: values[0] });
      const m = { id: vid + 500, media_type: 'image', ...img.product(art, color), preview_image: img.product(art, color) };
      media.push(m, { id: vid + 501, media_type: 'image', ...img.product(art, color, '#E9E4DA'), preview_image: img.product(art, color, '#E9E4DA') });
      options.sizes.forEach((n, i) => variants.push({ id: vid++, title: n, options: [n], price: cents(price + i * (options.step || 8)), compare_at_price: 0, available: !soldOut, url: '#', featured_media: null, featured_image: null, sku: `${handle.toUpperCase().slice(0, 4)}-${n}`, inventory_management: 'shopify', inventory_quantity: inventory, inventory_policy: 'deny', store_availabilities: [] }));
    } else {
      const m = { id: vid + 500, media_type: 'image', ...img.product(art, color), preview_image: img.product(art, color) };
      media.push(m, { id: vid + 501, media_type: 'image', ...img.product(art, color, '#E9E4DA'), preview_image: img.product(art, color, '#E9E4DA') });
      variants.push({ id: vid++, title: 'Default Title', options: ['Default Title'], price: cents(price), compare_at_price: compare ? cents(compare) : 0, available: !soldOut, url: '#', featured_media: null, featured_image: null, sku: handle.toUpperCase().slice(0, 6), inventory_management: 'shopify', inventory_quantity: soldOut ? 0 : inventory, inventory_policy: 'deny', store_availabilities: [] });
    }
    const first = variants.find((v) => v.available) || variants[0];
    return {
      id: vid++, handle, title, vendor, url: '#', tags, description: `<p>${description}</p>`,
      price: first.price, price_min: Math.min(...variants.map((v) => v.price)), price_max: Math.max(...variants.map((v) => v.price)),
      price_varies: new Set(variants.map((v) => v.price)).size > 1, compare_at_price: first.compare_at_price,
      available: variants.some((v) => v.available), has_only_default_variant: opts.length === 0,
      options_with_values: opts, options: opts.map((o) => o.name), variants, selected_or_first_available_variant: first,
      featured_media: media[0], media, images: media, published_at: new Date(Date.now() - daysOld * 864e5).toISOString(),
      metafields: {}, gift_card: false, 'gift_card?': false, type: '', selling_plan_groups: [], requires_selling_plan: false,
    };
  };

  const products = [
    mk({ handle: 'gourde-crete', title: 'Gourde isotherme Crête 750 ml', vendor: 'Altitude', art: 'flask', color: '#D9622B', price: 29.9, compare: 34.9, tags: ['badge:Best-seller'], options: { colors: [['Corail', '#D9622B'], ['Sauge', '#3F6E5B'], ['Nuit', '#1F2A44'], ['Sable', '#C9A77C']], soldOutColor: 'Sable' }, description: "Double paroi en inox recyclé, bouchon étanche et anse intégrée : l'eau reste fraîche 24 heures et une boisson chaude 12 heures. Compatible lave-vaisselle." }),
    mk({ handle: 'serum-eclat', title: 'Sérum éclat vitamine C', vendor: 'Sève', art: 'bottle', color: '#3F6E5B', price: 34, options: { sizes: ['30 ml', '50 ml'], label: 'Contenance', step: 14 }, description: 'Un sérum léger qui ravive l\'éclat du teint, sans picotement ni effet collant.', daysOld: 6 }),
    mk({ handle: 'espresso-3', title: 'Espresso n°3 — cacao & noisette', vendor: 'Ruelle', art: 'bag', color: '#8A4B2A', price: 12.5, options: { sizes: ['250 g', '500 g', '1 kg'], label: 'Poids', step: 10 }, description: 'Un assemblage torréfié en petites fournées, rond et intense.' }),
    mk({ handle: 'bougie-lueur', title: 'Bougie Lueur — figue & cèdre', vendor: 'Atelier Soleil', art: 'candle', color: '#C99A1E', price: 24, compare: 29, description: 'Cire végétale coulée à la main, 45 heures de combustion.' }),
    mk({ handle: 'brume-tonique', title: 'Brume tonique à la rose', vendor: 'Sève', art: 'flask', color: '#B5536B', price: 18, description: 'Le geste fraîcheur à vaporiser après le sérum.', daysOld: 3 }),
    mk({ handle: 'moulin-manuel', title: 'Moulin à café manuel', vendor: 'Ruelle', art: 'bag', color: '#2B37DE', price: 39, soldOut: true, description: 'Meule conique en céramique, 12 réglages de mouture.' }),
    mk({ handle: 'tasse-double-paroi', title: 'Tasse double paroi 250 ml', vendor: 'Ruelle', art: 'candle', color: '#0369A1', price: 16, description: 'Garde la crème et la chaleur plus longtemps.' }),
    mk({ handle: 'trousse-voyage', title: 'Trousse voyage trio', vendor: 'Sève', art: 'bag', color: '#7C3AED', price: 12, tags: ['badge:Édition limitée'], description: 'Trois mini formats pour partir léger.' }),
  ];
  const byHandle = Object.fromEntries(products.map((p) => [p.handle, p]));
  // Plans d'abonnement (normalement créés par une appli d'abonnements)
  byHandle['gourde-crete'].selling_plan_groups = [{ name: 'Abonnement', selling_plans: [
    { id: 9001, name: 'Livré chaque mois, 10 % de réduction', price_adjustments: [{ value_type: 'percentage', value: 10 }] },
    { id: 9002, name: 'Tous les 2 mois, 5 % de réduction', price_adjustments: [{ value_type: 'percentage', value: 5 }] },
  ] }];
  // Produits complémentaires (normalement fournis par Search & Discovery)
  const comp = (h, list) => { byHandle[h].metafields = { 'shopify--discovery--product_recommendation': { complementary_products: { value: list.map((x) => byHandle[x]) } } }; };
  comp('gourde-crete', ['tasse-double-paroi', 'bougie-lueur', 'trousse-voyage']);
  comp('serum-eclat', ['brume-tonique', 'trousse-voyage']);

  const colorFilter = {
    label: 'Couleur', type: 'list', presentation: 'swatch', param_name: 'filter.v.option.couleur',
    values: [['Corail', '#D9622B', 3], ['Sauge', '#3F6E5B', 4], ['Nuit', '#1F2A44', 2], ['Sable', '#C9A77C', 0]].map(([l, c, n]) => ({ label: l, value: l, count: n, active: l === 'Sauge', param_name: 'filter.v.option.couleur', swatch: { color: c } })),
  };
  colorFilter.active_values = colorFilter.values.filter((v) => v.active).map((v) => ({ ...v, url_to_remove: '#' }));
  const filters = [
    { label: 'Disponibilité', type: 'boolean', param_name: 'filter.v.availability', values: [{ label: 'En stock', value: '1', count: 7, active: false, param_name: 'filter.v.availability' }], active_values: [] },
    { label: 'Prix', type: 'price_range', min_value: { param_name: 'filter.v.price.gte', value: null }, max_value: { param_name: 'filter.v.price.lte', value: null }, range_max: 3900, active_values: [], url_to_remove: '#' },
    colorFilter,
    { label: 'Marque', type: 'list', param_name: 'filter.p.vendor', values: ['Altitude', 'Sève', 'Ruelle', 'Atelier Soleil'].map((l, i) => ({ label: l, value: l, count: [1, 3, 3, 1][i], active: false, param_name: 'filter.p.vendor' })), active_values: [] },
    { label: 'Type de produit', type: 'list', param_name: 'filter.p.product_type', values: ['Accessoires', 'Soin', 'Café'].map((l, i) => ({ label: l, value: l, count: [3, 3, 2][i], active: false, param_name: 'filter.p.product_type' })), active_values: [] },
  ];
  const collection = {
    title: 'Toute la boutique', handle: 'tout', url: '#', description: '<p>Une collection d\'exemple générée pour la démo : filtres, pastilles, badges et vignette promotionnelle.</p>',
    products, products_count: products.length, all_products_count: products.length, filters,
    sort_options: [{ value: 'manual', name: 'En vedette' }, { value: 'best-selling', name: 'Meilleures ventes' }, { value: 'price-ascending', name: 'Prix croissant' }, { value: 'price-descending', name: 'Prix décroissant' }, { value: 'created-descending', name: 'Nouveautés' }],
    sort_by: 'manual', default_sort_by: 'manual', image: img.scene('#2B37DE', '#EC7454', 'flask', '#121214'), featured_image: img.scene('#2B37DE', '#EC7454', 'flask', '#121214', 800, 800),
  };
  const collections = {
    tout: collection,
    soin: { ...collection, title: 'Soin', handle: 'soin', products: [byHandle['serum-eclat'], byHandle['brume-tonique'], byHandle['trousse-voyage'], byHandle['bougie-lueur']], products_count: 4, featured_image: img.scene('#3F6E5B', '#BFD8C8', 'bottle', '#F4F1EA', 800, 800) },
    cafe: { ...collection, title: 'Café', handle: 'cafe', products: [byHandle['espresso-3'], byHandle['moulin-manuel'], byHandle['tasse-double-paroi'], byHandle['bougie-lueur']], products_count: 4, featured_image: img.scene('#8A4B2A', '#E9C9A5', 'bag', '#3B2316', 800, 800) },
    outdoor: { ...collection, title: 'Outdoor', handle: 'outdoor', products: [byHandle['gourde-crete'], byHandle['tasse-double-paroi'], byHandle['trousse-voyage'], byHandle['brume-tonique']], products_count: 4, featured_image: img.scene('#D9622B', '#FBD0B5', 'flask', '#1F2A44', 800, 800) },
    maison: { ...collection, title: 'Maison', handle: 'maison', products: [byHandle['bougie-lueur'], byHandle['tasse-double-paroi'], byHandle['moulin-manuel'], byHandle['espresso-3']], products_count: 4, featured_image: img.scene('#C99A1E', '#F6E7B8', 'candle', '#7A5C2E', 800, 800) },
    nouveautes: { ...collection, title: 'Nouveautés', handle: 'nouveautes', products: [byHandle['brume-tonique'], byHandle['serum-eclat'], byHandle['gourde-crete'], byHandle['trousse-voyage']], products_count: 4, featured_image: img.scene('#7C3AED', '#E4D8FF', 'bottle', '#FFB703', 800, 800) },
  };
  return { products, byHandle, collection, collections };
}
