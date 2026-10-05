#!/usr/bin/env node
/**
 * Construit demo/demo.html : la page d'accueil du thème Kinetic rendue hors Shopify.
 *
 * Le rendu utilise les VRAIS fichiers du thème (layout/theme.liquid, sections, snippets,
 * templates/index.json, config/settings_data.json, locales/fr.default.json) via liquidjs,
 * avec des équivalents simplifiés des tags/filtres propres à Shopify.
 * Ensuite CSS, JS, polices et icônes sont intégrés en ligne → un seul fichier autonome.
 *
 * Usage : node scripts/build-demo.mjs [--locale=en]
 */
import { Liquid, Tag, Value } from 'liquidjs';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const THEME = join(ROOT, 'theme');
const LOCALE = (process.argv.find((a) => a.startsWith('--locale=')) || '--locale=fr').split('=')[1];
const read = (p) => readFileSync(join(THEME, p), 'utf8');
const readJson = (p) => JSON.parse(read(p));

/* ---------- Données de démonstration ---------- */
const locales = readJson(LOCALE === 'fr' ? 'locales/fr.default.json' : `locales/${LOCALE}.json`);
const linklists = {
  'main-menu': {
    links: [
      { title: LOCALE === 'fr' ? 'Fonctionnalités' : 'Features', url: '#fonctionnalites', links: [] },
      { title: LOCALE === 'fr' ? 'Démos' : 'Demos', url: '#demos', links: [] },
      { title: LOCALE === 'fr' ? 'Avis' : 'Reviews', url: '#avis', links: [] },
      { title: 'FAQ', url: '#faq', links: [] },
    ],
  },
  footer: {
    links: [
      { title: LOCALE === 'fr' ? 'Livraison' : 'Shipping', url: '#', links: [] },
      { title: LOCALE === 'fr' ? 'Retours' : 'Returns', url: '#', links: [] },
      { title: LOCALE === 'fr' ? 'Conditions de vente' : 'Terms of sale', url: '#', links: [] },
      { title: 'Contact', url: '#', links: [] },
    ],
  },
};
const fontObject = (handle) => ({ family: 'Assistant', fallback_families: 'sans-serif', weight: 400, style: 'normal', handle });

/** Convertit une valeur de réglage selon son type de schéma (comme le ferait Shopify). */
function convert(type, value) {
  switch (type) {
    case 'link_list': return linklists[value] || { links: [] };
    case 'url': return !value ? '' : String(value).startsWith('shopify://') ? '#' : value;
    case 'image_picker': case 'collection': case 'product': case 'page': case 'video': return null;
    case 'font_picker': return fontObject(value);
    default: return value;
  }
}
function withDefaults(schemaSettings = [], values = {}) {
  const out = {};
  for (const s of schemaSettings) {
    if (!s.id) continue;
    const v = Object.prototype.hasOwnProperty.call(values, s.id) ? values[s.id] : s.default;
    out[s.id] = convert(s.type, v === undefined ? (s.type === 'checkbox' ? false : '') : v);
  }
  return out;
}

const settingsSchema = readJson('config/settings_schema.json');
const themeSettings = withDefaults(settingsSchema.flatMap((g) => g.settings || []), readJson('config/settings_data.json').current);

/* ---------- Moteur Liquid ---------- */
// Objets globaux Shopify (settings, shop…) : visibles aussi dans les snippets {% render %}.
const GLOBALS = {};
const engine = new Liquid({
  globals: GLOBALS,
  root: [join(THEME, 'snippets')],
  extname: '.liquid',
  jsTruthy: false,
  strictFilters: false,
  strictVariables: false,
  greedy: false,
});

const getPath = (obj, path) => path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj);
const kw = (args) => Object.fromEntries(args.filter((a) => Array.isArray(a) && a.length === 2).map(([k, v]) => [k, v]));

engine.registerFilter('t', (key, ...args) => {
  const vars = kw(args);
  let s = getPath(locales, key);
  if (s && typeof s === 'object') s = Number(vars.count) === 1 ? s.one : s.other;
  if (typeof s !== 'string') return `[missing ${key}]`;
  return s.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, k) => (vars[k] ?? ''));
});
engine.registerFilter('asset_url', (name) => `asset://${name}`);
engine.registerFilter('stylesheet_tag', (url) => `<link rel="stylesheet" href="${url}" media="all">`);
engine.registerFilter('preload_tag', () => '');
engine.registerFilter('image_url', () => '');
engine.registerFilter('image_tag', () => '');
engine.registerFilter('placeholder_svg_tag', (_n, cls) => `<svg class="${cls || ''}" viewBox="0 0 100 100" aria-hidden="true"><rect width="100" height="100"/></svg>`);
const money = (cents) => `${(Number(cents || 0) / 100).toFixed(2).replace('.', ',')} €`;
engine.registerFilter('money', money);
engine.registerFilter('money_with_currency', (c) => `${money(c)} EUR`);
engine.registerFilter('money_without_currency', (c) => money(c).replace(' €', ''));
engine.registerFilter('handle', (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''));
engine.registerFilter('font_face', () => '');
engine.registerFilter('font_modify', (f) => f);
engine.registerFilter('link_to', (text, url) => `<a href="${url}">${text}</a>`);
engine.registerFilter('payment_type_svg_tag', () => '');
engine.registerFilter('default_errors', () => '');
engine.registerFilter('structured_data', () => '{}');

// Tags Shopify : {% schema %}, {% stylesheet %}, {% javascript %} → ignorés à l'affichage
for (const name of ['schema', 'stylesheet', 'javascript']) {
  engine.registerTag(name, class extends Tag {
    constructor(token, remain, liquid) {
      super(token, remain, liquid);
      while (remain.length) { const t = remain.shift(); if (t.name === `end${name}`) return; }
      throw new Error(`tag ${name} non fermé`);
    }
    *render() { return ''; }
  });
}

// {% form 'type', obj, class: '...' %} … {% endform %}
engine.registerTag('form', class extends Tag {
  constructor(token, remain, liquid) {
    super(token, remain, liquid);
    this.args = token.args;
    this.templates = [];
    const stream = liquid.parser.parseStream(remain)
      .on('tag:endform', () => stream.stop())
      .on('template', (tpl) => this.templates.push(tpl))
      .on('end', () => { throw new Error('tag form non fermé'); });
    stream.start();
  }
  *render(ctx, emitter) {
    const cls = (this.args.match(/class:\s*'([^']*)'/) || [])[1] || '';
    const id = (this.args.match(/id:\s*'([^']*)'/) || [])[1];
    const data = /data-([a-z-]+):/.exec(this.args);
    emitter.write(`<form method="post" action="#"${id ? ` id="${id}"` : ''} class="${cls}"${data ? ` data-${data[1]}` : ''} onsubmit="event.preventDefault()">`);
    ctx.push({ form: { posted_successfully: false, errors: null } });
    yield this.liquid.renderer.renderTemplates(this.templates, ctx, emitter);
    ctx.pop();
    emitter.write('</form>');
  }
});

// {% content_for 'blocks' %} (blocs de thème) — non utilisé sur la page d'accueil
engine.registerTag('content_for', class extends Tag { *render() { return ''; } });

/* ---------- Rendu des sections ---------- */
function sectionSchema(type) {
  const src = read(`sections/${type}.liquid`);
  const m = src.match(/\{%-?\s*schema\s*-?%\}([\s\S]*?)\{%-?\s*endschema\s*-?%\}/);
  return m ? JSON.parse(m[1]) : {};
}
const sectionCache = new Map();
async function renderSection(id, data, globals) {
  const schema = sectionSchema(data.type);
  const blocksSchema = Object.fromEntries((schema.blocks || []).map((b) => [b.type, b]));
  const order = data.block_order || Object.keys(data.blocks || {});
  const blocks = order.filter((k) => !(data.blocks[k] || {}).disabled).map((k) => {
    const b = data.blocks[k];
    return { id: k, type: b.type, settings: withDefaults((blocksSchema[b.type] || {}).settings, b.settings), shopify_attributes: '' };
  });
  const section = { id, settings: withDefaults(schema.settings, data.settings), blocks };
  if (!sectionCache.has(data.type)) sectionCache.set(data.type, engine.parse(read(`sections/${data.type}.liquid`)));
  const html = await engine.render(sectionCache.get(data.type), { ...globals, section });
  const tag = schema.tag || 'div';
  return `<${tag} id="shopify-section-${id}" class="shopify-section${schema.class ? ` ${schema.class}` : ''}">${html}</${tag}>`;
}
async function renderGroup(json, globals) {
  let out = '';
  for (const key of json.order) {
    if (json.sections[key].disabled) continue;
    out += await renderSection(key, json.sections[key], globals);
  }
  return out;
}

engine.registerTag('sections', class extends Tag {
  constructor(token, remain, liquid) { super(token, remain, liquid); this.name = token.args.replace(/['"\s]/g, ''); }
  *render(ctx, emitter) {
    const json = readJson(`sections/${this.name}.json`);
    emitter.write(yield renderGroup(json, ctx.getAll()));
  }
});

/* ---------- Rendu de la page ---------- */
const globals = {
  settings: themeSettings,
  shop: { name: 'Kinetic', description: 'Thème Shopify', customer_accounts_enabled: true, enabled_payment_types: [], currency: 'EUR' },
  request: { locale: { iso_code: LOCALE }, page_type: 'index', design_mode: false, origin: 'https://demo.kinetic-theme.com' },
  routes: { root_url: '/', cart_url: '#', cart_add_url: '/cart/add', cart_change_url: '/cart/change', search_url: '#', account_url: '#', all_products_collection_url: '#', product_recommendations_url: '#' },
  cart: { item_count: 0, items: [], total_price: 0, currency: { iso_code: 'EUR' }, cart_level_discount_applications: [] },
  localization: { available_countries: [], available_languages: [] },
  template: { name: 'index' },
  linklists,
  page_title: LOCALE === 'fr' ? 'Kinetic — Démo du thème Shopify' : 'Kinetic — Shopify theme demo',
  page_description: LOCALE === 'fr'
    ? "Démo autonome du thème Shopify Kinetic : éditeur en direct, outils de conversion intégrés et chargement rapide."
    : 'Standalone demo of the Kinetic Shopify theme: live editor, built-in conversion tools and fast loading.',
  canonical_url: 'https://demo.kinetic-theme.com/',
  current_page: 1,
  content_for_header: '',
  powered_by_link: '',
};

Object.assign(GLOBALS, globals);
const index = readJson('templates/index.json');
const content = await renderGroup(index, globals);
let html = await engine.parseAndRender(read('layout/theme.liquid'), { ...globals, content_for_layout: content });

/* ---------- Intégration des assets ---------- */
const b64 = (name) => readFileSync(join(THEME, 'assets', name)).toString('base64');
const mime = { woff2: 'font/woff2', svg: 'image/svg+xml' };
const inlineUrls = (text) => text.replace(/asset:\/\/([\w.-]+\.(woff2|svg))/g, (_, n, ext) => `data:${mime[ext]};base64,${b64(n)}`);
const minifyCss = (css) => css.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').replace(/\s*([{}:;,>])\s*/g, '$1').replace(/;}/g, '}').trim();

html = html
  .replace(/<link rel="stylesheet" href="asset:\/\/([\w.-]+\.css)"[^>]*>/g, (_, n) => `<style>${minifyCss(read(`assets/${n}`))}</style>`)
  .replace(/<script src="asset:\/\/([\w.-]+\.js)"[^>]*><\/script>/g, (_, n) => `<script>${read(`assets/${n}`).replace(/<\/script/gi, '<\\/script')}</script>`);
html = inlineUrls(html);

// Liens Shopify inexistants hors boutique → ancres neutres
html = html.replace(/href="#"/g, 'href="#top"');
html = html.replace('<body ', '<body id="top" ');
// Bandeau discret indiquant qu'il s'agit d'une démo (fermable)
const note = LOCALE === 'fr'
  ? 'Démo autonome du thème Kinetic — contenu d\'exemple, panier et paiements désactivés.'
  : 'Standalone Kinetic theme demo — sample content, cart and payments disabled.';
html = html.replace('</body>', `<p style="position:fixed;left:1rem;bottom:1rem;z-index:80;max-width:22rem;margin:0;padding:.6rem .9rem;border-radius:12px;background:#121214;color:#f1efea;font:500 .78rem/1.4 system-ui,sans-serif;box-shadow:0 10px 30px rgb(0 0 0 / .3)" id="demo-note">${note} <button type="button" onclick="this.parentNode.remove()" style="margin-left:.4rem;color:#9da4ff;font-weight:700" aria-label="OK">OK</button></p>\n<script>setTimeout(function(){var n=document.getElementById('demo-note');if(n)n.remove()},9000)</script>\n</body>`);

// Nettoyage des lignes vides
html = html.replace(/\n\s*\n+/g, '\n');

mkdirSync(join(ROOT, 'demo'), { recursive: true });
const out = join(ROOT, 'demo', LOCALE === 'fr' ? 'demo.html' : `demo.${LOCALE}.html`);
writeFileSync(out, html);
const missing = (html.match(/\[missing [^\]]+\]/g) || []);
console.log(`✓ ${out} — ${(Buffer.byteLength(html) / 1024).toFixed(0)} Ko${missing.length ? ` — CLÉS MANQUANTES : ${[...new Set(missing)].join(', ')}` : ''}`);
if (missing.length || /asset:\/\//.test(html)) process.exit(1);
