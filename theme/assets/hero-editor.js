/* Kinetic — Hero « éditeur en direct »
 * Carte unique, comme l'éditeur de thème Shopify sur mobile :
 *   barre d'outils → boutiques démo → aperçu défilant → panneau du bas
 *   (arborescence / réglages du bloc / catalogue « Ajouter un bloc »).
 * Modèle de données identique à un template OS 2.0 : sections → blocs (imbriqués) → réglages typés.
 * Vanilla JS, aucune dépendance, chargé uniquement par la section.
 */
(() => {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const clone = (o) => JSON.parse(JSON.stringify(o));
  let seq = 0;
  const uid = () => `b${Date.now().toString(36)}${(seq++).toString(36)}`;
  const plain = (html) => { const d = document.createElement('div'); d.innerHTML = html || ''; return (d.textContent || '').replace(/\s+/g, ' ').trim(); };
  const lines = (s) => String(s || '').split('\n').map((l) => l.trim()).filter(Boolean);

  /** Texte riche : on ne garde que les balises de l'éditeur Shopify. */
  function sanitize(html, lists) {
    const tpl = document.createElement('template');
    tpl.innerHTML = html || '';
    const ok = new Set(['B', 'STRONG', 'I', 'EM', 'A', 'BR', 'P', ...(lists ? ['UL', 'OL', 'LI'] : [])]);
    const walk = (node) => Array.from(node.childNodes).forEach((n) => {
      if (n.nodeType === 1) {
        walk(n);
        if (n.tagName === 'DIV') { const p = document.createElement('p'); p.append(...n.childNodes); n.replaceWith(p); return; }
        if (!ok.has(n.tagName)) { n.replaceWith(...n.childNodes); return; }
        Array.from(n.attributes).forEach((a) => { if (!(n.tagName === 'A' && a.name === 'href')) n.removeAttribute(a.name); });
        if (n.tagName === 'A' && !/^(https?:|\/|#|mailto:)/i.test(n.getAttribute('href') || '')) n.setAttribute('href', '#');
      } else if (n.nodeType !== 3) n.remove();
    });
    walk(tpl.content);
    return tpl.innerHTML;
  }

  /* ---------- Icônes (grille 24, trait 1.75) ---------- */
  const P = {
    layers: '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12.5 9 5 9-5M3 16.5l9 5 9-5"/>',
    block: '<path d="M8 3.5H5.5a2 2 0 0 0-2 2V8M16 3.5h2.5a2 2 0 0 1 2 2V8M8 20.5H5.5a2 2 0 0 1-2-2V16M16 20.5h2.5a2 2 0 0 0 2-2V16"/>',
    title: '<path d="M4 7h16M4 12h10M4 17h13"/>',
    text: '<path d="M4 6h16M4 10.5h16M4 15h16M4 19.5h9"/>',
    star: '<path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8L3.5 9.7l5.9-.9L12 3.5Z"/>',
    image: '<rect x="3" y="4.5" width="18" height="15" rx="2.5"/><circle cx="9" cy="10" r="1.8"/><path d="m21 16-5-5-9 8.5"/>',
    group: '<rect x="3.5" y="4.5" width="17" height="15" rx="2.5"/><path d="M3.5 9h17"/>',
    button: '<rect x="3" y="7" width="18" height="10" rx="5"/><path d="M9 12h6"/>',
    divider: '<path d="M4 12h16"/>',
    code: '<path d="m8 7-5 5 5 5M16 7l5 5-5 5"/>',
    video: '<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m10 9 5 3-5 3z"/>',
    tag: '<path d="M3.5 12.3V4.5a1 1 0 0 1 1-1h7.8l8.2 8.2a1.5 1.5 0 0 1 0 2.1l-6.7 6.7a1.5 1.5 0 0 1-2.1 0l-8.2-8.2Z"/><circle cx="8.5" cy="8.5" r="1.5"/>',
    cart: '<path d="M3 4h2.2l2.3 11h10.8l2-8H6.3"/><circle cx="9.5" cy="19" r="1.4"/><circle cx="17" cy="19" r="1.4"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    truck: '<path d="M3 6.5h11v9H3zM14 9.5h4l3 3v3h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17.5" cy="17.5" r="1.8"/>',
    box: '<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z"/><path d="m4 7.5 8 4.5 8-4.5M12 12v9"/>',
    quote: '<path d="M9.5 6C6.5 7 5 9.5 5 13v5h5v-5H7.5c0-2 .8-3.5 2.5-4.5L9.5 6Zm9 0c-3 1-4.5 3.5-4.5 7v5h5v-5h-2.5c0-2 .8-3.5 2.5-4.5L18.5 6Z"/>',
    avatar: '<circle cx="12" cy="8.5" r="4"/><path d="M4.5 20.5c1.4-3.6 4.2-5.5 7.5-5.5s6.1 1.9 7.5 5.5"/>',
    badge: '<path d="M12 3 4.5 6v5.5c0 4.5 3.2 8.2 7.5 9.5 4.3-1.3 7.5-5 7.5-9.5V6L12 3Z"/>',
    accordion: '<rect x="3.5" y="4" width="17" height="5" rx="1.5"/><rect x="3.5" y="11" width="17" height="4" rx="1.5"/><rect x="3.5" y="17" width="17" height="3" rx="1.5"/>',
    tabs: '<path d="M3.5 9V6a1.5 1.5 0 0 1 1.5-1.5h4.5A1.5 1.5 0 0 1 11 6v3M3.5 9h17v9.5A1.5 1.5 0 0 1 19 20H5a1.5 1.5 0 0 1-1.5-1.5V9Z"/>',
    slider: '<rect x="5" y="6" width="14" height="12" rx="2"/><path d="m3 10-1 2 1 2M21 10l1 2-1 2"/>',
    marquee: '<path d="M3 9h18M3 15h18"/><path d="m16 6 3 3-3 3" opacity=".5"/>',
    icon: '<path d="M12 3c.6 4.4 2.6 6.4 7 7-4.4.6-6.4 2.6-7 7-.6-4.4-2.6-6.4-7-7 4.4-.6 6.4-2.6 7-7Z"/>',
    logo: '<rect x="3" y="3" width="18" height="18" rx="5"/><path d="M9 7v10M9 12l5-5M10.5 11l4.5 6"/>',
    card: '<rect x="3.5" y="3.5" width="17" height="17" rx="3"/><path d="M3.5 13h17"/>',
    pack: '<path d="M4 7h16v12.5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7ZM3 3.5h18V7H3z"/><path d="M10 11h4"/>',
    cross: '<path d="M7 7h10v10H7z"/><path d="M12 3v4M12 17v4M3 12h4M17 12h4"/>',
    product: '<path d="M6 7h12l-1 13H7L6 7Z"/><path d="M9 7a3 3 0 0 1 6 0"/>',
    section: '<rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M3 9h18"/>',
    announcement: '<path d="M4 10v4h3l6 4V6L7 10H4Z"/><path d="M17 9a4 4 0 0 1 0 6"/>',
    header: '<rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M7 9h3M14 9h3"/>',
    eye: '<path d="M2.5 12C3.5 10.5 7 6 12 6s8.5 4.5 9.5 6c-1 1.5-4.5 6-9.5 6s-8.5-4.5-9.5-6Z"/><circle cx="12" cy="12" r="3"/>',
    eyeOff: '<path d="M3 3l18 18M10.6 6.2A9.6 9.6 0 0 1 12 6c5 0 8.5 4.5 9.5 6-.5.8-1.6 2.3-3.2 3.6M6.5 7.6C4.6 8.9 3.2 10.8 2.5 12c1 1.5 4.5 6 9.5 6 1.6 0 3-.4 4.3-1"/><path d="M9.9 10a3 3 0 0 0 4.2 4.1"/>',
    plusCircle: '<circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    chevron: '<path d="m9 6 6 6-6 6"/>',
    chevronDown: '<path d="m6 9 6 6 6-6"/>',
    left: '<path d="m15 6-6 6 6 6"/>',
    right: '<path d="m9 6 6 6-6 6"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    dots: '<circle cx="5.5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="18.5" cy="12" r="1.5"/>',
    grip: '<circle cx="9" cy="6.5" r="1.3"/><circle cx="15" cy="6.5" r="1.3"/><circle cx="9" cy="12" r="1.3"/><circle cx="15" cy="12" r="1.3"/><circle cx="9" cy="17.5" r="1.3"/><circle cx="15" cy="17.5" r="1.3"/>',
    copy: '<rect x="8" y="8" width="12" height="12" rx="2.5"/><path d="M16 8V6.5A2.5 2.5 0 0 0 13.5 4h-7A2.5 2.5 0 0 0 4 6.5v7A2.5 2.5 0 0 0 6.5 16H8"/>',
    trash: '<path d="M4.5 7h15M10 11v6M14 11v6M6.5 7l.8 12a2 2 0 0 0 2 1.9h5.4a2 2 0 0 0 2-1.9l.8-12M9 7V5a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 5v2"/>',
    up: '<path d="M12 19V5M6 11l6-6 6 6"/>',
    down: '<path d="M12 5v14M6 13l6 6 6-6"/>',
    sparkle: '<path d="M12 3c.6 4.4 2.6 6.4 7 7-4.4.6-6.4 2.6-7 7-.6-4.4-2.6-6.4-7-7 4.4-.6 6.4-2.6 7-7ZM19 15c.3 1.8 1.2 2.7 3 3-1.8.3-2.7 1.2-3 3-.3-1.8-1.2-2.7-3-3 1.8-.3 2.7-1.2 3-3Z"/>',
    bold: '<path d="M7 4.5h6a3.5 3.5 0 0 1 0 7H7zM7 11.5h7a3.75 3.75 0 0 1 0 7.5H7z"/>',
    italic: '<path d="M10 4.5h8M6 19.5h8M14.5 4.5 9.5 19.5"/>',
    link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
    ul: '<path d="M9 6.5h11M9 12h11M9 17.5h11"/><circle cx="4.5" cy="6.5" r="1"/><circle cx="4.5" cy="12" r="1"/><circle cx="4.5" cy="17.5" r="1"/>',
    ol: '<path d="M10 6.5h10M10 12h10M10 17.5h10M4 5l1.5-1v5M3.5 14.5a1.5 1.5 0 0 1 3 0c0 1.5-3 2.5-3 4h3"/>',
    search: '<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/>',
    dynamic: '<rect x="4" y="4" width="16" height="16" rx="2.5"/><path d="M8 9h8M8 13h8M8 17h4"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h10"/>',
    account: '<circle cx="12" cy="8.5" r="4"/><path d="M4.5 20.5c1.4-3.6 4.2-5.5 7.5-5.5s6.1 1.9 7.5 5.5"/>',
    bag: '<path d="M5 8h14l-1 12H6L5 8Z"/><path d="M9 8a3 3 0 0 1 6 0"/>',
    check: '<path d="m5 12.5 4.2 4.2L19 7"/>',
    leaf: '<path d="M5 19c0-8 5-13 15-14-1 10-6 15-14 15"/><path d="M5 19 13 11"/>',
    heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z"/>',
    gift: '<rect x="3.5" y="9" width="17" height="11" rx="1.5"/><path d="M3.5 9h17v3.5h-17zM12 9v11"/>',
    refresh: '<path d="M20 11a8 8 0 0 0-14.3-4.5L4 8.5"/><path d="M4 4v4.5h4.5M4 13a8 8 0 0 0 14.3 4.5L20 15.5"/><path d="M20 20v-4.5h-4.5"/>',
    shield: '<path d="M12 3 4.5 6v5.5c0 4.5 3.2 8.2 7.5 9.5 4.3-1.3 7.5-5 7.5-9.5V6L12 3Z"/><path d="m8.8 12 2.3 2.3 4.2-4.6"/>',
    play: '<path d="m9 7 9 5-9 5z"/>',
    apps: '<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><path d="M16.5 13v7M13 16.5h7"/>',
  };
  const FILLED = new Set(['star', 'quote', 'dots', 'grip', 'play']);
  const svg = (n, size = 16, cls = '') => `<svg class="ei ei-${n} ${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="${FILLED.has(n) ? 'currentColor' : 'none'}" stroke="${FILLED.has(n) ? 'none' : 'currentColor'}" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">${P[n] || P.block}</svg>`;
  const ICONS = ['leaf', 'truck', 'shield', 'refresh', 'heart', 'gift', 'star', 'clock', 'check', 'box'];

  /* ---------- Palettes de couleurs (comme les « schémas » Shopify) ---------- */
  const SCHEMES = {
    light: { bg: '#ffffff', fg: '#121214', border: '#e6e5e0', btn: '#121214', btnFg: '#ffffff' },
    soft: { bg: '#f4f2ed', fg: '#121214', border: '#e3dfd6', btn: '#121214', btnFg: '#ffffff' },
    dark: { bg: '#18181c', fg: '#f1efea', border: '#2c2c33', btn: '#f1efea', btnFg: '#121214' },
    accent: { bg: 'var(--acc)', fg: '#ffffff', border: 'transparent', btn: '#ffffff', btnFg: '#121214' },
    tint: { bg: 'color-mix(in srgb, var(--acc) 12%, #fff)', fg: '#121214', border: 'color-mix(in srgb, var(--acc) 25%, #fff)', btn: 'var(--acc)', btnFg: '#ffffff' },
  };
  const schemeStyle = (k) => { const s = SCHEMES[k] || SCHEMES.light; return `--sc-bg:${s.bg};--sc-fg:${s.fg};--sc-border:${s.border};--sc-btn:${s.btn};--sc-btn-fg:${s.btnFg};`; };

  class LiveEditor {
    constructor(root) {
      this.root = root;
      this.section = root.closest('section');
      this.t = this.json('[data-ed-strings]') || {};
      this.stores = this.json('[data-ed-stores]') || [];
      this.arts = {};
      $$('template[data-ed-arts]', this.section).forEach((tpl) => tpl.content.querySelectorAll('[data-art]').forEach((n) => { this.arts[n.dataset.art] = n.innerHTML; }));
      this.preview = $('[data-ed-preview]', root);
      this.stage = $('[data-ed-stage]', root);
      this.canvas = $('[data-ed-canvas]', root);
      this.panel = $('[data-ed-panel]', root);
      this.frame = $('[data-ed-frame]', root);
      this.hoverBox = $('[data-ed-hover]', root);
      this.live = $('[data-ed-live]', root);
      this.reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      this.fine = window.matchMedia('(pointer: fine)').matches;
      this.lang = document.documentElement.lang || 'fr';

      this.defs = this.buildDefs();
      this.states = {};
      this.hists = {};
      this.ui = {};
      this.idx = 0;
      this.selectMode = true;
      this.sel = null;
      this.view = 'tree';
      this.picker = { ctx: null, tab: 'blocks', q: '', closed: {} };
      this.collapsed = {};

      root.classList.add('is-ready', 'is-select');
      this.bind();
      this.load(0);
      this.tick = setInterval(() => this.updateCountdowns(), 1000);
    }

    T(k, vars) { let s = this.t[k] ?? k; if (vars) Object.entries(vars).forEach(([a, b]) => { s = s.split(`{${a}}`).join(b); }); return s; }
    json(sel) { const el = $(sel, this.section); try { return el ? JSON.parse(el.textContent) : null; } catch (e) { return null; } }
    say(m) { if (!this.live) return; this.live.textContent = ''; requestAnimationFrame(() => { this.live.textContent = m; }); }
    toast(m) { if (window.Kinetic && window.Kinetic.toast) window.Kinetic.toast(m); this.say(m); }
    get store() { return this.stores[this.idx] || {}; }
    get state() { return this.states[this.idx]; }
    set state(v) { this.states[this.idx] = v; }
    get hist() { return this.hists[this.idx]; }

    /* =========================================================
       Définitions des blocs (équivalent des schémas Shopify)
       ========================================================= */
    buildDefs() {
      const T = (k) => this.T(k);
      const opt = (...keys) => keys.map((k) => ({ value: k, label: T(`opt.${k}`) }));
      const iconOpts = ICONS.map((k) => ({ value: k, label: T(`icon.${k}`) }));
      const common = {
        top: [{ id: 'visibility', type: 'select', label: T('set.visibility'), options: opt('all', 'mobile', 'desktop') }],
        bottom: [
          { type: 'header', label: T('set.spacing') },
          { id: 'mt', type: 'range', label: T('set.margin_top'), min: 0, max: 48, step: 2, unit: 'px' },
          { id: 'mb', type: 'range', label: T('set.margin_bottom'), min: 0, max: 48, step: 2, unit: 'px' },
          { type: 'header', label: T('set.advanced') },
          { id: 'css', type: 'text', label: T('set.css_class') },
        ],
      };
      const D = {
        media: { cat: null, icon: 'image', locked: true, settings: [
          { id: 'art', type: 'select', label: T('set.illustration'), options: opt('bottle', 'bag', 'flask', 'candle') },
          { id: 'bg', type: 'color', label: T('set.background') },
          { id: 'show_badge', type: 'checkbox', label: T('set.show_badge') },
          { id: 'badge', type: 'text', label: T('set.badge_text') },
        ] },
        /* Avis */
        review: { cat: 'reviews', icon: 'quote', d: () => ({ quote: T('d.review'), author: T('d.author'), rating: 5 }), settings: [
          { id: 'quote', type: 'textarea', label: T('set.quote') }, { id: 'author', type: 'text', label: T('set.author') },
          { id: 'rating', type: 'range', label: T('set.rating'), min: 1, max: 5, step: 1 }] },
        review_avatar: { cat: 'reviews', icon: 'avatar', d: () => ({ quote: T('d.review'), author: T('d.author'), rating: 5, color: '#EC7454' }), settings: [
          { id: 'quote', type: 'textarea', label: T('set.quote') }, { id: 'author', type: 'text', label: T('set.author') },
          { id: 'rating', type: 'range', label: T('set.rating'), min: 1, max: 5, step: 1 }, { id: 'color', type: 'color', label: T('set.avatar_color') }] },
        stars: { cat: 'reviews', icon: 'star', d: () => ({ rating: 4.6, count: 87, format: 'full' }), settings: [
          { id: 'rating', type: 'range', label: T('set.rating'), min: 0, max: 5, step: 0.1 },
          { id: 'count', type: 'number', label: T('set.review_count') },
          { id: 'format', type: 'select', label: T('set.format'), options: opt('full', 'count', 'stars') }] },
        review_badge: { cat: 'reviews', icon: 'badge', d: () => ({ source: 'kinetic', rating: 4.8, count: 312 }), settings: [
          { id: 'source', type: 'select', label: T('set.source'), options: [{ value: 'kinetic', label: 'Kinetic Reviews' }, { value: 'google', label: 'Google' }, { value: 'trust', label: T('opt.trust_platform') }] },
          { id: 'rating', type: 'range', label: T('set.rating'), min: 0, max: 5, step: 0.1 },
          { id: 'count', type: 'number', label: T('set.review_count') }] },
        /* Code */
        custom_code: { cat: 'code', icon: 'code', d: () => ({ code: '<p><strong>HTML</strong> personnalisé</p>' }), settings: [
          { id: 'code', type: 'textarea', label: T('set.code'), info: T('info.code') }] },
        /* Composants de base */
        button: { cat: 'basic', icon: 'button', d: () => ({ label: T('d.button'), style: 'solid', full: true }), settings: [
          { id: 'label', type: 'text', label: T('set.label') },
          { id: 'style', type: 'segmented', label: T('set.style'), options: opt('solid', 'outline', 'link') },
          { id: 'full', type: 'checkbox', label: T('set.full_width') }] },
        icon: { cat: 'basic', icon: 'icon', d: () => ({ icon: 'leaf', size: 28, color: '' }), settings: [
          { id: 'icon', type: 'select', label: T('set.icon'), options: iconOpts },
          { id: 'size', type: 'range', label: T('set.size'), min: 16, max: 56, step: 2, unit: 'px' },
          { id: 'color', type: 'color', label: T('set.color'), allowEmpty: true }] },
        icon_text: { cat: 'basic', icon: 'icon', d: () => ({ icon: 'truck', text: T('d.icon_text') }), settings: [
          { id: 'icon', type: 'select', label: T('set.icon'), options: iconOpts }, { id: 'text', type: 'text', label: T('set.text') }] },
        image: { cat: 'basic', icon: 'image', d: () => ({ art: 'bag', ratio: 'landscape', radius: 12 }), settings: [
          { id: 'art', type: 'select', label: T('set.image'), options: opt('bottle', 'bag', 'flask', 'candle') },
          { id: 'ratio', type: 'select', label: T('set.ratio'), options: opt('square', 'landscape', 'portrait') },
          { id: 'radius', type: 'range', label: T('set.radius'), min: 0, max: 28, step: 2, unit: 'px' }] },
        logo: { cat: 'basic', icon: 'logo', d: () => ({ size: 22 }), settings: [
          { id: 'size', type: 'range', label: T('set.size'), min: 14, max: 40, step: 1, unit: 'px' }] },
        divider: { cat: 'basic', icon: 'divider', d: () => ({ thickness: 1, width: 100 }), settings: [
          { id: 'thickness', type: 'range', label: T('set.thickness'), min: 1, max: 6, step: 1, unit: 'px' },
          { id: 'width', type: 'range', label: T('set.width'), min: 10, max: 100, step: 5, unit: '%' }] },
        text: { cat: 'basic', icon: 'text', d: () => ({ text: `<p>${esc(T('d.text'))}</p>`, style: 'body', color: '', more: false }), settings: [
          { id: 'text', type: 'richtext', label: T('set.text') },
          { id: 'style', type: 'select', label: T('set.text_style'), options: opt('body', 'small', 'large') },
          { id: 'color', type: 'color', label: T('set.color'), allowEmpty: true },
          { id: 'more', type: 'checkbox', label: T('set.read_more') }] },
        title: { cat: 'basic', icon: 'title', d: () => ({ text: esc(T('d.title')), tag: 'h2', align: 'left', color: '' }), settings: [
          { id: 'text', type: 'inline_richtext', label: T('set.text'), dynamic: true, info: T('info.title_seo'), info2: T('info.title_style') },
          { id: 'tag', type: 'select', label: T('set.text_style'), options: opt('h1', 'h2', 'h3') },
          { id: 'align', type: 'segmented', label: T('set.align'), options: opt('left', 'center') },
          { id: 'color', type: 'color', label: T('set.color'), allowEmpty: true }] },
        video: { cat: 'basic', icon: 'video', d: () => ({ caption: T('d.video'), ratio: 'landscape' }), settings: [
          { id: 'caption', type: 'text', label: T('set.caption') },
          { id: 'ratio', type: 'select', label: T('set.ratio'), options: opt('square', 'landscape', 'portrait') }] },
        /* Mise en page */
        accordion: { cat: 'layout', icon: 'accordion', d: () => ({ items: T('d.accordion'), open: true }), settings: [
          { id: 'items', type: 'textarea', label: T('set.items'), info: T('info.pairs') }, { id: 'open', type: 'checkbox', label: T('set.open_first') }] },
        card: { cat: 'layout', icon: 'card', container: true, accepts: 'basic', d: () => ({ scheme: 'soft', border: true, padding: 14 }), settings: [
          { id: 'scheme', type: 'scheme', label: T('set.scheme') }, { id: 'border', type: 'checkbox', label: T('set.border') },
          { id: 'padding', type: 'range', label: T('set.padding'), min: 4, max: 32, step: 2, unit: 'px' }] },
        group: { cat: 'layout', icon: 'group', container: true, accepts: 'any', d: () => ({ direction: 'column', gap: 10, scheme: 'none' }), settings: [
          { id: 'direction', type: 'segmented', label: T('set.direction'), options: opt('column', 'row') },
          { id: 'gap', type: 'range', label: T('set.gap'), min: 0, max: 32, step: 2, unit: 'px' }] },
        icons_inline: { cat: 'layout', icon: 'icon', d: () => ({ items: T('d.icons_inline') }), settings: [
          { id: 'items', type: 'textarea', label: T('set.items'), info: T('info.icons') }] },
        tabs: { cat: 'layout', icon: 'tabs', d: () => ({ items: T('d.tabs') }), settings: [
          { id: 'items', type: 'textarea', label: T('set.items'), info: T('info.pairs') }] },
        slider_info: { cat: 'layout', icon: 'slider', d: () => ({ items: T('d.slider') }), settings: [
          { id: 'items', type: 'textarea', label: T('set.messages'), info: T('info.lines') }] },
        marquee: { cat: 'layout', icon: 'marquee', d: () => ({ text: T('d.marquee'), speed: 12, scheme: 'dark' }), settings: [
          { id: 'text', type: 'text', label: T('set.text') }, { id: 'speed', type: 'range', label: T('set.speed'), min: 4, max: 30, step: 1, unit: 's' },
          { id: 'scheme', type: 'scheme', label: T('set.scheme') }] },
        /* Offres */
        pack: { cat: 'offers', icon: 'pack', d: () => ({ title: T('d.pack_title'), items: T('d.pack_items') }), settings: [
          { id: 'title', type: 'text', label: T('set.title') }, { id: 'items', type: 'textarea', label: T('set.items'), info: T('info.lines') }] },
        countdown: { cat: 'offers', icon: 'clock', d: () => ({ label: T('d.countdown'), hours: 26, scheme: 'dark' }), settings: [
          { id: 'label', type: 'text', label: T('set.text') }, { id: 'hours', type: 'range', label: T('set.duration'), min: 1, max: 72, step: 1, unit: 'h' },
          { id: 'scheme', type: 'scheme', label: T('set.scheme') }] },
        cross_sell: { cat: 'offers', icon: 'cross', d: () => ({ mode: 'row', scheme: 'light', border: true, product: 0, title: '', desc: '', show_image: true, img: 90, fit: 'contain', price_pos: 'button', btn: 'text' }), settings: [
          { type: 'header', label: T('set.layout') },
          { id: 'mode', type: 'select', label: T('set.display_mode'), options: opt('row', 'stack') },
          { id: 'scheme', type: 'scheme', label: T('set.scheme') },
          { id: 'border', type: 'checkbox', label: T('set.card_border') },
          { type: 'header', label: T('set.content') },
          { id: 'product', type: 'product', label: T('set.products'), info: T('info.bundle') },
          { id: 'title', type: 'text', label: T('set.title_optional') },
          { id: 'desc', type: 'richtext', label: T('set.desc_optional') },
          { type: 'header', label: T('set.image') },
          { id: 'show_image', type: 'checkbox', label: T('set.show_image') },
          { id: 'img', type: 'range', label: T('set.image_width'), min: 48, max: 140, step: 2, unit: 'px' },
          { id: 'fit', type: 'select', label: T('set.image_fit'), options: opt('contain', 'cover') },
          { type: 'header', label: T('set.button') },
          { id: 'price_pos', type: 'select', label: T('set.price_position'), options: opt('button', 'side', 'hidden') },
          { id: 'btn', type: 'select', label: T('set.button_content'), options: opt('text', 'icon') }] },
        /* Produit */
        product_card: { cat: 'product', icon: 'product', d: () => ({ product: 1, show_price: true, scheme: 'light' }), settings: [
          { id: 'product', type: 'product', label: T('set.product') }, { id: 'show_price', type: 'checkbox', label: T('set.show_price') },
          { id: 'scheme', type: 'scheme', label: T('set.scheme') }] },
        shipping: { cat: 'product', icon: 'truck', d: () => ({ min: 2, max: 4 }), settings: [
          { id: 'min', type: 'range', label: T('set.min_days'), min: 0, max: 14, step: 1, unit: T('unit.days') },
          { id: 'max', type: 'range', label: T('set.max_days'), min: 1, max: 21, step: 1, unit: T('unit.days') }] },
        price: { cat: 'product', icon: 'tag', d: () => ({ price: '29,00 €', compare: '', size: 'm' }), settings: [
          { id: 'price', type: 'text', label: T('set.price') }, { id: 'compare', type: 'text', label: T('set.compare'), info: T('info.compare') },
          { id: 'size', type: 'segmented', label: T('set.size'), options: opt('s', 'm', 'l') }] },
        badges: { cat: 'product', icon: 'tag', container: true, accepts: ['badge'], d: () => ({ style: 'outline', hl: '' }), settings: [
          { id: 'style', type: 'segmented', label: T('set.style'), options: opt('solid', 'outline') },
          { id: 'hl', type: 'color', label: T('set.highlight'), allowEmpty: true }] },
        badge: { cat: null, icon: 'tag', d: () => ({ text: T('d.badge'), featured: false }), settings: [
          { id: 'text', type: 'text', label: T('set.text') }, { id: 'featured', type: 'checkbox', label: T('set.featured') }] },
      };
      Object.entries(D).forEach(([k, d]) => {
        d.type = k;
        d.name = T(`b.${k}`);
        // Comme dans Shopify : Titre et Texte ouvrent directement sur le champ de texte.
        if (k === 'media') d.fields = d.settings;
        else if (k === 'title' || k === 'text') d.fields = [...d.settings, ...common.top, ...common.bottom];
        else d.fields = [...common.top, ...d.settings, ...common.bottom];
      });
      this.cats = ['reviews', 'code', 'basic', 'layout', 'offers', 'product'];
      return D;
    }

    defaults(type) { return { visibility: 'all', mt: 0, mb: 0, css: '', ...(this.defs[type].d ? this.defs[type].d() : {}) }; }

    /* =========================================================
       État initial d'une boutique (≈ templates/product.json)
       ========================================================= */
    initial(s) {
      const B = (type, settings, blocks) => ({ id: uid(), type, hidden: false, settings: { ...this.defaults(type), ...settings }, ...(this.defs[type].container ? { blocks: blocks || [] } : {}) });
      const tags = (s.tags || []).map((x) => x.trim()).filter(Boolean);
      const rating = parseFloat(String(s.rating).replace(',', '.')) || 4.5;
      return {
        announcement: { hidden: false, settings: { text: s.announcement || '', bg: s.announcement_bg || '#121214', color: s.announcement_color || '#ffffff' } },
        header: { settings: { name: s.name, logo_style: s.logo_style || 'sans', cart: 2 } },
        product: {
          settings: { accent: s.accent, bg: s.tint },
          blocks: [
            { id: 'media', type: 'media', hidden: false, settings: { art: s.art || 'bottle', image: s.image || null, bg: '#FFFFFF', show_badge: !!s.badge, badge: s.badge || '' } },
            B('group', { gap: 10 }, [
              B('title', { text: esc(s.title), tag: 'h1' }),
              B('stars', { rating, count: parseInt(s.reviews, 10) || 0, format: 'full' }),
              B('badges', { style: 'outline', hl: s.tag_color || '' }, tags.map((t) => B('badge', { text: t, featured: t === (s.featured || '').trim() }))),
              B('text', { text: `<p>${esc(s.packaging)}</p>`, style: 'small' }),
              B('group', { gap: 8 }, []),
              B('text', { text: `<p>${esc(s.description || '')}</p>`, style: 'body', more: true }),
              B('button', { label: this.T('d.add_to_cart'), style: 'solid', full: true }),
            ]),
          ],
        },
      };
    }

    find(id, list = this.state.product.blocks, parent = null) {
      for (let i = 0; i < list.length; i += 1) {
        const b = list[i];
        if (b.id === id) return { block: b, list, parent, index: i };
        if (b.blocks) { const r = this.find(id, b.blocks, b); if (r) return r; }
      }
      return null;
    }

    /* =========================================================
       Historique, enregistrement
       ========================================================= */
    commit(debounce = false) {
      clearTimeout(this.cTimer);
      const push = () => {
        const h = this.hist;
        const snap = JSON.stringify(this.state);
        if (h.stack[h.i] === snap) { this.syncTools(); return; }
        h.stack = h.stack.slice(0, h.i + 1);
        h.stack.push(snap);
        if (h.stack.length > 80) { h.stack.shift(); h.saved -= 1; }
        h.i = h.stack.length - 1;
        this.syncTools();
      };
      if (debounce) { this.cTimer = setTimeout(push, 400); this.syncTools(true); } else push();
    }
    restore(i) {
      const h = this.hist;
      if (i < 0 || i >= h.stack.length) return;
      clearTimeout(this.cTimer);
      h.i = i;
      this.state = JSON.parse(h.stack[i]);
      if (this.sel && this.sel.kind === 'block' && !this.find(this.sel.id)) { this.sel = null; this.view = 'tree'; }
      this.render();
    }
    undo() { clearTimeout(this.cTimer); const h = this.hist; if (JSON.stringify(this.state) !== h.stack[h.i]) { this.commit(); } this.restore(this.hist.i - 1); }
    redo() { this.restore(this.hist.i + 1); }
    get dirty() { const h = this.hist; return JSON.stringify(this.state) !== h.stack[h.saved]; }
    syncTools(pending = false) {
      const h = this.hist;
      const u = $('[data-ed-action="undo"]', this.root);
      const r = $('[data-ed-action="redo"]', this.root);
      if (u) u.disabled = h.i <= 0 && !pending;
      if (r) r.disabled = h.i >= h.stack.length - 1;
      const dirty = pending || this.dirty;
      const save = $('[data-ed-action="save"]', this.root);
      if (save) { save.disabled = !dirty; save.setAttribute('aria-disabled', String(!dirty)); }
      this.root.classList.toggle('is-dirty', dirty);
    }
    save() {
      clearTimeout(this.cTimer);
      this.commit();
      this.hist.saved = this.hist.i;
      this.syncTools();
      const btn = $('[data-ed-action="save"]', this.root);
      btn.classList.add('is-saved');
      setTimeout(() => btn.classList.remove('is-saved'), 1300);
      this.toast(this.T('saved'));
    }

    /* =========================================================
       Boutiques
       ========================================================= */
    load(i, reset = false) {
      if (!this.stores[i]) return;
      clearTimeout(this.cTimer);
      this.idx = i;
      if (!this.states[i] || reset) {
        this.states[i] = this.initial(this.stores[i]);
        this.hists[i] = { stack: [JSON.stringify(this.states[i])], i: 0, saved: 0 };
      }
      this.aiN = 0;
      $$('[data-ed-store]', this.root).forEach((p) => { const on = Number(p.dataset.edStore) === i; p.setAttribute('aria-checked', String(on)); p.tabIndex = on ? 0 : -1; });
      this.sel = null;
      this.view = 'tree';
      this.render();
      this.preview.scrollTop = 0;
    }
    switchStore(i) {
      if (i === this.idx) return;
      const run = () => { this.load(i); this.canvas.classList.remove('is-switching'); this.say(`${this.T('switched')} ${this.state.header.settings.name}`); };
      if (this.reduce) run(); else { this.canvas.classList.add('is-switching'); setTimeout(run, 150); }
    }

    /* =========================================================
       Rendu de l'aperçu
       ========================================================= */
    excerpt(b) {
      const s = b.settings;
      const src = s.text || s.title || s.label || s.quote || s.caption || '';
      const t = plain(src);
      return t.length > 34 ? `${t.slice(0, 34)}…` : t;
    }

    blockHTML(b) {
      if (b.hidden) return '';
      const s = b.settings;
      if (s.visibility === 'desktop') return '';
      const prods = this.store.products || [];
      const style = `margin-top:${Number(s.mt) || 0}px;margin-bottom:${Number(s.mb) || 0}px`;
      const wrap = (inner, extra = '', st = '') => `<div class="pvb pvb--${b.type} ${esc(s.css || '')} ${extra}" data-bid="${b.id}" tabindex="0" style="${style};${st}">${inner}</div>`;
      const starRow = (r) => Array.from({ length: 5 }, (_, i) => `<span class="${r >= i + 0.75 ? 'on' : r >= i + 0.25 ? 'half' : ''}">★</span>`).join('');
      const kids = () => (b.blocks || []).map((k) => this.blockHTML(k)).join('');
      const emptyBtn = (into) => `<button type="button" class="pv-empty" data-ed-add-into="${into}">${esc(this.T('empty_group'))}</button>`;
      const num = (n, d = 1) => Number(n).toLocaleString(this.lang, { minimumFractionDigits: d, maximumFractionDigits: d });
      switch (b.type) {
        case 'media': {
          const art = s.image ? `<img src="${esc(s.image)}" alt="" loading="lazy">` : (this.arts[s.art] || this.arts.bottle || '');
          return `<div class="pvb pvb--media" data-bid="media" tabindex="0" style="background:${esc(s.bg)}"><div class="pv-art" style="--art:var(--acc)">${art}</div>${s.show_badge && s.badge ? `<span class="pv-badge">${esc(s.badge)}</span>` : ''}</div>`;
        }
        case 'group': {
          const visible = (b.blocks || []).some((k) => !k.hidden);
          return wrap(`${kids()}${visible ? '' : emptyBtn(b.id)}`, `is-${s.direction}`, `gap:${Number(s.gap)}px`);
        }
        case 'card': {
          const visible = (b.blocks || []).some((k) => !k.hidden);
          return wrap(`${kids()}${visible ? '' : emptyBtn(b.id)}`, `${s.border ? 'has-border' : ''}`, `${schemeStyle(s.scheme)}padding:${Number(s.padding)}px`);
        }
        case 'title': {
          const tag = ['h1', 'h2', 'h3'].includes(s.tag) ? s.tag : 'h2';
          return wrap(`<${tag} class="pv-title pv-title--${tag}" style="text-align:${s.align === 'center' ? 'center' : 'left'};${s.color ? `color:${esc(s.color)}` : ''}">${sanitize(s.text, false) || '&nbsp;'}</${tag}>`);
        }
        case 'text': {
          const html = sanitize(s.text, true) || '<p>&nbsp;</p>';
          return wrap(`<div class="pv-text pv-text--${s.style}${s.more ? ' is-clamped' : ''}" style="${s.color ? `color:${esc(s.color)}` : ''}">${html}</div>${s.more ? `<span class="pv-more">${esc(this.T('read_more'))}</span>` : ''}`);
        }
        case 'stars': {
          const r = Number(s.rating) || 0;
          const label = s.format === 'full' ? `${num(r)}/5 (${esc(s.count)} ${esc(this.T('reviews'))})` : s.format === 'count' ? `${esc(s.count)} ${esc(this.T('reviews'))}` : '';
          return wrap(`<span class="pv-stars" aria-hidden="true">${starRow(r)}</span>${label ? `<span class="pv-stars__label">${label}</span>` : ''}`);
        }
        case 'review': case 'review_avatar': {
          const av = b.type === 'review_avatar' ? `<span class="pv-avatar" style="background:${esc(s.color)}">${esc(plain(s.author).replace(/[[\]]/g, '').slice(0, 1) || '·')}</span>` : '';
          return wrap(`<span class="pv-stars" aria-hidden="true">${starRow(Number(s.rating))}</span><p class="pv-review__q">${esc(s.quote)}</p><p class="pv-review__a">${av}${esc(s.author)}</p>`);
        }
        case 'review_badge': {
          const src = { kinetic: 'Kinetic Reviews', google: 'Google', trust: this.T('opt.trust_platform') }[s.source] || '';
          return wrap(`<span class="pv-rb__logo">${svg(s.source === 'google' ? 'search' : 'shield', 16)}</span><span><b>${num(Number(s.rating))}</b> <span class="pv-stars pv-stars--sm" aria-hidden="true">${starRow(Number(s.rating))}</span><br><small>${esc(s.count)} ${esc(this.T('reviews'))} · ${esc(src)}</small></span>`);
        }
        case 'badges': {
          const items = (b.blocks || []).filter((k) => !k.hidden);
          const hl = s.hl || 'var(--tag-hl)';
          return wrap(items.length ? items.map((k) => `<span class="pv-chip${k.settings.featured ? ' is-hl' : ''} is-${s.style}" data-bid="${k.id}" tabindex="0" style="${k.settings.featured ? `--hl:${esc(hl)}` : ''}">${esc(k.settings.text)}</span>`).join('') : emptyBtn(b.id), 'pv-chips');
        }
        case 'badge': return `<span class="pv-chip${s.featured ? ' is-hl' : ''}" data-bid="${b.id}" tabindex="0">${esc(s.text)}</span>`;
        case 'button': return wrap(`<span class="pv-btn pv-btn--${s.style}${s.full ? ' is-full' : ''}">${esc(s.label)}</span>`);
        case 'icon': return wrap(`<span style="color:${esc(s.color || 'var(--acc)')}">${svg(s.icon, Number(s.size) || 28)}</span>`);
        case 'icon_text': return wrap(`<span class="pv-it">${svg(s.icon, 18)}<span>${esc(s.text)}</span></span>`);
        case 'image': {
          const ratio = { square: '1/1', landscape: '4/3', portrait: '3/4' }[s.ratio] || '4/3';
          return wrap(`<div class="pv-img" style="aspect-ratio:${ratio};border-radius:${Number(s.radius)}px;--art:var(--acc)">${this.arts[s.art] || ''}</div>`);
        }
        case 'logo': return wrap(`<span class="pv-logo pv-logo--${esc(this.state.header.settings.logo_style)}" style="font-size:${Number(s.size)}px">${esc(this.state.header.settings.name)}</span>`);
        case 'divider': return wrap(`<hr class="pv-hr" style="border-top-width:${Number(s.thickness)}px;width:${Number(s.width)}%">`);
        case 'video': {
          const ratio = { square: '1/1', landscape: '16/9', portrait: '9/16' }[s.ratio] || '16/9';
          return wrap(`<div class="pv-video" style="aspect-ratio:${ratio}"><span class="pv-video__play">${svg('play', 22)}</span></div>${s.caption ? `<p class="pv-caption">${esc(s.caption)}</p>` : ''}`);
        }
        case 'custom_code': return wrap(`<div class="pv-code">${sanitize(s.code, true) || '&nbsp;'}</div>`);
        case 'accordion': {
          const items = lines(s.items).map((l) => l.split('|').map((x) => x.trim()));
          return wrap(items.map(([q, a], i) => `<details class="pv-acc"${s.open && i === 0 ? ' open' : ''}><summary>${esc(q)}<span>${svg('plus', 14)}</span></summary><p>${esc(a || '')}</p></details>`).join(''));
        }
        case 'tabs': {
          const items = lines(s.items).map((l) => l.split('|').map((x) => x.trim()));
          const active = Math.min(this.ui[`tab-${b.id}`] || 0, Math.max(0, items.length - 1));
          return wrap(`<div class="pv-tabs" role="tablist">${items.map(([q], i) => `<button type="button" role="tab" class="pv-tab${i === active ? ' is-on' : ''}" data-tab-of="${b.id}" data-tab-i="${i}" aria-selected="${i === active}">${esc(q)}</button>`).join('')}</div><p class="pv-tabpanel">${esc((items[active] || [])[1] || '')}</p>`);
        }
        case 'icons_inline': {
          const items = lines(s.items).map((l) => l.split('|').map((x) => x.trim()));
          return wrap(items.map(([ic, tx]) => `<span class="pv-it">${svg(ICONS.includes(ic) ? ic : 'check', 16)}<span>${esc(tx || ic)}</span></span>`).join(''), 'pv-inline');
        }
        case 'slider_info': {
          const items = lines(s.items);
          const i = (this.ui[`sl-${b.id}`] || 0) % Math.max(1, items.length);
          return wrap(`<button type="button" class="pv-sl__arrow" data-slide="${b.id}" data-dir="-1" aria-label="‹">${svg('left', 14)}</button><span class="pv-sl__msg">${esc(items[i] || '')}</span><button type="button" class="pv-sl__arrow" data-slide="${b.id}" data-dir="1" aria-label="›">${svg('right', 14)}</button>`);
        }
        case 'marquee': {
          const item = `<span>${esc(s.text)}</span><span aria-hidden="true">✦</span>`;
          return wrap(`<div class="pv-mq__track" style="animation-duration:${Number(s.speed)}s">${item.repeat(6)}</div>`, '', schemeStyle(s.scheme));
        }
        case 'pack': return wrap(`<p class="pv-pack__t">${esc(s.title)}</p><ul>${lines(s.items).map((l) => `<li>${svg('check', 14)}<span>${esc(l)}</span></li>`).join('')}</ul>`);
        case 'countdown': {
          const end = Date.now() + Number(s.hours) * 3600e3;
          if (!this.ui[`cd-${b.id}`] || this.ui[`cdh-${b.id}`] !== s.hours) { this.ui[`cd-${b.id}`] = end; this.ui[`cdh-${b.id}`] = s.hours; }
          return wrap(`<span>${esc(s.label)}</span><span class="pv-cd" data-countdown="${this.ui[`cd-${b.id}`]}">${this.cdText(this.ui[`cd-${b.id}`])}</span>`, '', schemeStyle(s.scheme));
        }
        case 'cross_sell': {
          const p = prods[Number(s.product) || 0] || prods[0] || { title: '—', price: '', art: 'bag', desc: '' };
          const title = s.title || p.title;
          const desc = plain(s.desc) ? sanitize(s.desc, false) : esc(p.desc || '');
          const btnInner = s.btn === 'icon' ? svg('bag', 16) : esc(this.T('d.add'));
          const price = s.price_pos === 'button' ? ` <span class="pv-cs__sep">|</span> ${esc(p.price)}` : '';
          return wrap(`${s.show_image ? `<div class="pv-cs__img pv-cs__img--${s.fit}" style="width:${Number(s.img)}px;--art:var(--acc)">${this.arts[p.art] || ''}</div>` : ''}
            <div class="pv-cs__body"><p class="pv-cs__t">${esc(title)}</p><p class="pv-cs__d">${desc}</p>
            <div class="pv-cs__row">${s.price_pos === 'side' ? `<span class="pv-cs__price">${esc(p.price)}</span>` : ''}<span class="pv-cs__btn">${btnInner}${price}</span></div></div>`, `is-${s.mode}${s.border ? ' has-border' : ''}`, schemeStyle(s.scheme));
        }
        case 'product_card': {
          const p = prods[Number(s.product) || 0] || prods[0] || {};
          return wrap(`<div class="pv-pc__img" style="--art:var(--acc)">${this.arts[p.art] || ''}</div><p class="pv-pc__t">${esc(p.title || '')}</p>${s.show_price ? `<p class="pv-pc__p">${esc(p.price || '')}</p>` : ''}`, '', schemeStyle(s.scheme));
        }
        case 'shipping': {
          const d = (n) => { const x = new Date(); x.setDate(x.getDate() + Number(n)); return x.toLocaleDateString(this.lang, { weekday: 'short', day: 'numeric', month: 'short' }); };
          return wrap(`${svg('truck', 18)}<span>${esc(this.T('shipping_between', { a: d(s.min), b: d(Math.max(s.min, s.max)) }))}</span>`);
        }
        case 'price': return wrap(`<span class="pv-price pv-price--${s.size}">${esc(s.price)}</span>${s.compare ? `<s class="pv-compare">${esc(s.compare)}</s>` : ''}`);
        default: return '';
      }
    }

    cdText(end) {
      let d = Math.max(0, Math.floor((end - Date.now()) / 1000));
      const h = Math.floor(d / 3600); d -= h * 3600;
      const m = Math.floor(d / 60); const s = d - m * 60;
      const p = (n) => String(n).padStart(2, '0');
      return `<b>${p(h)}</b>:<b>${p(m)}</b>:<b>${p(s)}</b>`;
    }
    updateCountdowns() { $$('[data-countdown]', this.canvas).forEach((el) => { el.innerHTML = this.cdText(Number(el.dataset.countdown)); }); }

    renderPreview() {
      const st = this.state;
      const a = st.announcement;
      const h = st.header.settings;
      this.root.style.setProperty('--store-accent', st.product.settings.accent);
      this.root.style.setProperty('--store-tint', st.product.settings.bg);
      this.root.style.setProperty('--tag-hl', this.store.tag_color || 'color-mix(in srgb, var(--acc) 22%, #fff)');
      this.canvas.innerHTML = `
        ${a.hidden || !a.settings.text ? '' : `<div class="pv-ann" data-sid="announcement" style="background:${esc(a.settings.bg)};color:${esc(a.settings.color)}">${svg('left', 14)}<span>${esc(a.settings.text)}</span>${svg('right', 14)}</div>`}
        <header class="pv-head" data-sid="header">
          <span class="pv-head__i">${svg('menu', 18)}</span>
          <span class="pv-logo pv-logo--${esc(h.logo_style)}">${esc(h.name)}</span>
          <span class="pv-head__icons"><span class="pv-head__i">${svg('search', 17)}</span><span class="pv-head__i">${svg('account', 17)}</span><span class="pv-head__i pv-head__cart">${svg('bag', 17)}${h.cart > 0 ? `<b>${esc(h.cart)}</b>` : ''}</span></span>
        </header>
        <div class="pv-product" data-sid="product">${st.product.blocks.map((b) => this.blockHTML(b)).join('')}</div>`;
      requestAnimationFrame(() => this.positionFrame());
    }

    /* =========================================================
       Panneau du bas : arborescence
       ========================================================= */
    treeRows(list, depth, parentId) {
      return list.map((b) => {
        const def = this.defs[b.type];
        const sel = this.sel && this.sel.kind === 'block' && this.sel.id === b.id;
        const ex = this.excerpt(b);
        const isOpen = !this.collapsed[b.id];
        const caret = def.container ? `<button type="button" class="tr__caret" data-ed-collapse="${b.id}" aria-expanded="${isOpen}" aria-label="${esc(def.name)}">${svg(isOpen ? 'chevronDown' : 'chevron', 14)}</button>` : '<span class="tr__caret"></span>';
        const row = `<li class="tr__item" data-node="${b.id}" data-parent="${parentId}">
          <div class="tr__row${sel ? ' is-sel' : ''}${b.hidden ? ' is-hidden' : ''}" style="--d:${depth}">
            ${def.locked ? '<span class="tr__grip"></span>' : `<span class="tr__grip" data-ed-grip title="${esc(this.T('drag'))}">${svg('grip', 13)}</span>`}
            ${caret}
            <button type="button" class="tr__label" data-ed-select="${b.id}" aria-current="${sel}">${svg(def.icon, 16)}<span class="tr__text">${esc(def.name)}${ex && b.type !== 'media' ? ` – <i>${esc(ex)}</i>` : ''}</span></button>
            <button type="button" class="tr__eye" data-ed-eye="${b.id}" aria-pressed="${b.hidden}" title="${esc(b.hidden ? this.T('show') : this.T('hide'))}">${svg(b.hidden ? 'eyeOff' : 'eye', 15)}<span class="visually-hidden">${esc(b.hidden ? this.T('show') : this.T('hide'))}</span></button>
          </div>`;
        const children = def.container && isOpen ? `<ul class="tr__list" role="list">${this.addRow(b.id, depth + 1)}${this.treeRows(b.blocks || [], depth + 1, b.id)}</ul>` : '';
        return `${row}${children}</li>`;
      }).join('');
    }

    addRow(into, depth) { return `<li><button type="button" class="tr__add" style="--d:${depth}" data-ed-add-into="${into}">${svg('plusCircle', 16)} ${esc(this.T('add_block'))}</button></li>`; }

    renderTree() {
      const st = this.state;
      const secRow = (id, icon, label, hidden) => {
        const sel = this.sel && this.sel.kind === 'section' && this.sel.id === id;
        return `<li class="tr__item"><div class="tr__row tr__row--sec${sel ? ' is-sel' : ''}${hidden ? ' is-hidden' : ''}" style="--d:0"><span class="tr__grip"></span><span class="tr__caret">${id === 'product' ? svg('chevronDown', 14) : ''}</span>
          <button type="button" class="tr__label" data-ed-section="${id}" aria-current="${sel}">${svg(icon, 16)}<span class="tr__text">${esc(label)}</span></button>
          ${id === 'announcement' ? `<button type="button" class="tr__eye" data-ed-eye-section="${id}" aria-pressed="${hidden}">${svg(hidden ? 'eyeOff' : 'eye', 15)}<span class="visually-hidden">${esc(hidden ? this.T('show') : this.T('hide'))}</span></button>` : ''}</div>`;
      };
      this.panel.innerHTML = `
        <div class="pn__head pn__head--tree"><p class="pn__title">${esc(this.T('template_name'))}</p></div>
        <div class="pn__body pn__body--tree">
          <p class="tr__group">${esc(this.T('group_header'))}</p>
          <ul class="tr__list" role="list">${secRow('announcement', 'announcement', this.T('sec.announcement'), st.announcement.hidden)}</li>${secRow('header', 'header', this.T('sec.header'), false)}</li></ul>
          <p class="tr__group">${esc(this.T('group_template'))}</p>
          <ul class="tr__list" role="list">${secRow('product', 'section', this.T('sec.product'), false)}
            <ul class="tr__list" role="list">${this.addRow('root', 1)}${this.treeRows(st.product.blocks, 1, 'root')}</ul></li></ul>
        </div>`;
    }

    /* =========================================================
       Panneau du bas : réglages
       ========================================================= */
    current() {
      if (!this.sel) return null;
      if (this.sel.kind === 'section') {
        const id = this.sel.id;
        const fields = {
          announcement: [{ id: 'text', type: 'text', label: this.T('set.text') }, { id: 'bg', type: 'color', label: this.T('set.background') }, { id: 'color', type: 'color', label: this.T('set.text_color') }],
          header: [{ id: 'name', type: 'text', label: this.T('set.store_name') }, { id: 'logo_style', type: 'select', label: this.T('set.logo_style'), options: ['sans', 'serif', 'wide'].map((v) => ({ value: v, label: this.T(`opt.${v}`) })) }, { id: 'cart', type: 'range', label: this.T('set.cart_count'), min: 0, max: 9, step: 1 }],
          product: [{ id: 'accent', type: 'color', label: this.T('set.accent') }, { id: 'bg', type: 'color', label: this.T('set.background') }],
        }[id];
        return { name: this.T(`sec.${id}`), icon: { announcement: 'announcement', header: 'header', product: 'section' }[id], fields, values: this.state[id].settings, block: null };
      }
      const r = this.find(this.sel.id);
      if (!r) return null;
      const def = this.defs[r.block.type];
      return { name: def.name, icon: def.icon, fields: def.fields, values: r.block.settings, block: r.block, def, r };
    }

    field(f, v, p) {
      const id = `${p}-${f.id || Math.random().toString(36).slice(2)}`;
      const lab = (extra = '') => `<div class="ef__top"><label class="ef__label" for="${id}">${esc(f.label)}</label>${extra}</div>`;
      const info = `${f.info ? `<p class="ef__info">${esc(f.info)}</p>` : ''}${f.info2 ? `<p class="ef__info">${esc(f.info2)}</p>` : ''}`;
      const dyn = f.dynamic ? `<button type="button" class="ef__dyn" data-ed-dynamic title="${esc(this.T('dynamic'))}">${svg('dynamic', 15)}<span class="visually-hidden">${esc(this.T('dynamic'))}</span></button>` : '';
      switch (f.type) {
        case 'header': return `<p class="ef__header">${esc(f.label)}</p>`;
        case 'text': return `<div class="ef">${lab(dyn)}<input id="${id}" class="ef__input" type="text" value="${esc(v)}" data-k="${f.id}">${info}</div>`;
        case 'number': return `<div class="ef ef--inline">${lab()}<input id="${id}" class="ef__input ef__input--num" type="number" min="0" value="${esc(v)}" data-k="${f.id}" inputmode="numeric">${info}</div>`;
        case 'textarea': return `<div class="ef">${lab()}<textarea id="${id}" class="ef__input ef__ta" rows="4" data-k="${f.id}">${esc(v)}</textarea>${info}</div>`;
        case 'richtext': case 'inline_richtext': {
          const L = f.type === 'richtext';
          return `<div class="ef"><div class="ef__top"><span class="ef__label" id="${id}-l">${esc(f.label)}</span>${dyn}</div>
            <div class="rte" data-rte data-lists="${L}">
              <div class="rte__bar" role="toolbar" aria-label="${esc(this.T('format'))}">
                <button type="button" data-cmd="ai" title="${esc(this.T('ai'))}">${svg('sparkle', 15)}</button>
                <button type="button" data-cmd="style" class="rte__aa" title="${esc(this.T('text_style'))}">Aa ${svg('chevronDown', 12)}</button>
                <button type="button" data-cmd="bold" aria-pressed="false" title="${esc(this.T('bold'))}">${svg('bold', 15)}</button>
                <button type="button" data-cmd="italic" aria-pressed="false" title="${esc(this.T('italic'))}">${svg('italic', 15)}</button>
                <button type="button" data-cmd="link" title="${esc(this.T('link'))}">${svg('link', 15)}</button>
                <button type="button" data-cmd="insertUnorderedList" ${L ? '' : 'disabled'} title="${esc(this.T('list'))}">${svg('ul', 15)}</button>
                <button type="button" data-cmd="insertOrderedList" ${L ? '' : 'disabled'} title="${esc(this.T('olist'))}">${svg('ol', 15)}</button>
              </div>
              <div class="rte__link" data-linkbar hidden><input type="url" class="ef__input" placeholder="https://" aria-label="${esc(this.T('link'))}"><button type="button" class="ed-mini-btn" data-link-apply>${esc(this.T('apply'))}</button></div>
              <div id="${id}" class="rte__area" contenteditable="true" role="textbox" aria-multiline="${L}" aria-labelledby="${id}-l" spellcheck="false" data-k="${f.id}">${sanitize(v, L)}</div>
            </div>${info}</div>`;
        }
        case 'select': return `<div class="ef ef--inline">${lab()}<span class="ef__sel"><select id="${id}" class="ef__input" data-k="${f.id}">${f.options.map((o) => `<option value="${esc(o.value)}"${String(o.value) === String(v) ? ' selected' : ''}>${esc(o.label)}</option>`).join('')}</select></span>${info}</div>`;
        case 'product': {
          const prods = this.store.products || [];
          const p = prods[Number(v) || 0] || {};
          return `<div class="ef">${lab()}<div class="ef-prod"><span class="ef-prod__img" style="--art:var(--store-accent)">${this.arts[p.art] || ''}</span><span class="ef-prod__t">${esc(p.title || '')}<small>${esc(p.price || '')}</small></span><button type="button" class="ef-prod__swap" data-ed-swap="${f.id}">${esc(this.T('change'))}</button></div>${info}</div>`;
        }
        case 'segmented': return `<fieldset class="ef ef--seg"><legend class="ef__label">${esc(f.label)}</legend><div class="seg">${f.options.map((o) => `<label class="seg__o"><input type="radio" name="${id}" value="${esc(o.value)}" data-k="${f.id}"${String(o.value) === String(v) ? ' checked' : ''}><span>${esc(o.label)}</span></label>`).join('')}</div></fieldset>`;
        case 'range': return `<div class="ef ef--range">${lab()}<div class="rg"><input id="${id}" type="range" min="${f.min}" max="${f.max}" step="${f.step}" value="${esc(v)}" data-k="${f.id}" style="--p:${((Number(v) - f.min) / (f.max - f.min)) * 100}%"><span class="rg__v"><output data-out="${f.id}">${esc(v)}</output>${f.unit ? `<small>${esc(f.unit)}</small>` : ''}</span></div>${info}</div>`;
        case 'checkbox': return `<div class="ef ef--check"><label class="sw" for="${id}"><span class="sw__label">${esc(f.label)}</span><input id="${id}" type="checkbox" role="switch" data-k="${f.id}"${v ? ' checked' : ''}><span class="sw__track" aria-hidden="true"></span></label>${info}</div>`;
        case 'color': {
          const sw = ['#121214', '#FFFFFF', this.state.product.settings.accent, '#2B37DE', '#EC7454', '#F2D94E', '#3F6E5B', '#8A4B2A'];
          return `<div class="ef">${lab()}<div class="clr"><span class="clr__chip" style="background:${esc(v || 'transparent')}"><input id="${id}" type="color" value="${esc(this.hex(v))}" data-k="${f.id}" aria-label="${esc(f.label)}"></span><input type="text" class="ef__input clr__hex" value="${esc(String(v || '').toUpperCase())}" placeholder="${f.allowEmpty ? esc(this.T('auto')) : ''}" data-hex="${f.id}" maxlength="7" spellcheck="false" aria-label="${esc(f.label)} (hex)"></div>
            <div class="clr__sw">${[...new Set(sw.map((c) => String(c).toUpperCase()))].map((c) => `<button type="button" style="background:${c}" data-swatch="${f.id}" data-c="${c}" title="${c}"><span class="visually-hidden">${c}</span></button>`).join('')}${f.allowEmpty ? `<button type="button" class="clr__none" data-swatch="${f.id}" data-c="" title="${esc(this.T('auto'))}"><span class="visually-hidden">${esc(this.T('auto'))}</span></button>` : ''}</div>${info}</div>`;
        }
        case 'scheme': return `<div class="ef ef--scheme"><span class="ef__label">${esc(f.label)}</span><div class="sch" role="radiogroup" aria-label="${esc(f.label)}">${Object.keys(SCHEMES).map((k) => `<button type="button" role="radio" class="sch__o" aria-checked="${k === v}" data-scheme="${f.id}" data-v="${k}" style="${schemeStyle(k)}" title="${esc(this.T(`scheme.${k}`))}"><span>Aa</span><i></i></button>`).join('')}</div><button type="button" class="ef__link" data-ed-toast="coming">${esc(this.T('edit_scheme'))}</button></div>`;
        default: return '';
      }
    }

    hex(v) { const s = String(v || '').trim(); if (/^#[0-9a-f]{6}$/i.test(s)) return s.toLowerCase(); return '#000000'; }

    renderSettings() {
      const c = this.current();
      if (!c) { this.view = 'tree'; this.renderTree(); return; }
      const b = c.block;
      const locked = b && c.def.locked;
      const p = `f${this.idx}${b ? b.id : this.sel.id}`;
      this.panel.innerHTML = `
        <div class="pn__head">
          <span class="pn__icon">${svg(c.icon, 16)}</span>
          <p class="pn__title">${esc(c.name)}${b && b.hidden ? ` <small>· ${esc(this.T('hidden_state'))}</small>` : ''}</p>
          ${b ? `<div class="pn__menu-wrap"><button type="button" class="pn__btn" data-ed-action="block-menu" aria-haspopup="true" aria-expanded="false" title="${esc(this.T('more'))}">${svg('dots', 16)}<span class="visually-hidden">${esc(this.T('more'))}</span></button>
            <div class="ed-menu ed-menu--up" data-ed-block-menu hidden>
              ${locked ? '' : `<button type="button" data-ed-action="move-up">${svg('up', 15)} ${esc(this.T('move_up'))}</button><button type="button" data-ed-action="move-down">${svg('down', 15)} ${esc(this.T('move_down'))}</button><button type="button" data-ed-action="duplicate">${svg('copy', 15)} ${esc(this.T('duplicate'))}</button>`}
              <button type="button" data-ed-action="hide">${svg(b.hidden ? 'eye' : 'eyeOff', 15)} ${esc(b.hidden ? this.T('show') : this.T('hide'))}</button>
              ${locked ? '' : `<button type="button" class="is-danger" data-ed-action="delete">${svg('trash', 15)} ${esc(this.T('delete'))}</button>`}
            </div></div>` : ''}
          <button type="button" class="pn__btn" data-ed-action="close" title="${esc(this.T('close'))}">${svg('close', 16)}<span class="visually-hidden">${esc(this.T('close'))}</span></button>
        </div>
        <div class="pn__body">${c.fields.map((f) => this.field(f, c.values[f.id], p)).join('')}
          ${b && !locked ? `<button type="button" class="pn__remove" data-ed-action="delete">${svg('trash', 15)} ${esc(this.T('remove_block'))}</button>` : ''}
        </div>`;
    }

    /* =========================================================
       Panneau du bas : catalogue « Ajouter un bloc »
       ========================================================= */
    allowedTypes(ctx) {
      let parentType = null;
      if (ctx.into && ctx.into !== 'root') parentType = (this.find(ctx.into) || {}).block?.type;
      else if (ctx.after) { const r = this.find(ctx.after); parentType = r && r.parent ? r.parent.type : null; }
      const acc = parentType ? this.defs[parentType].accepts : 'any';
      if (Array.isArray(acc)) return acc;
      return Object.values(this.defs).filter((d) => d.cat && (acc === 'any' || d.cat === acc)).map((d) => d.type);
    }

    renderPicker() {
      const ctx = this.picker.ctx || { into: 'root' };
      const types = this.allowedTypes(ctx);
      const q = this.picker.q.trim().toLowerCase();
      const onlyBadge = types.length === 1;
      const items = (cat) => types.filter((t) => (onlyBadge || this.defs[t].cat === cat) && (!q || this.defs[t].name.toLowerCase().includes(q)));
      const groups = onlyBadge ? [{ cat: 'product', list: types }] : this.cats.map((cat) => ({ cat, list: items(cat) })).filter((g) => g.list.length);
      const body = this.picker.tab === 'apps'
        ? `<div class="pk__empty">${svg('apps', 28)}<p>${esc(this.T('apps_empty'))}</p></div>`
        : `${!q && !onlyBadge ? `<button type="button" class="pk__gen" data-ed-generate>${svg('sparkle', 16)} ${esc(this.T('generate'))}</button>` : ''}
           ${groups.length ? groups.map((g) => {
             const closed = this.picker.closed[g.cat] && !q;
             return `<div class="pk__cat"><button type="button" class="pk__cat-h" data-ed-cat="${g.cat}" aria-expanded="${!closed}">${esc(this.T(`cat.${g.cat}`))}${svg(closed ? 'chevronDown' : 'up', 14, closed ? '' : 'pk__chev')}</button>
               ${closed ? '' : `<ul class="pk__list" role="list">${g.list.map((t) => `<li><button type="button" data-pick="${t}">${svg(this.defs[t].icon, 16)}<span>${esc(this.defs[t].name)}</span></button></li>`).join('')}</ul>`}</div>`;
           }).join('') : `<p class="pk__none">${esc(this.T('no_results'))}</p>`}`;
      this.panel.innerHTML = `
        <div class="pn__head pn__head--picker">
          <button type="button" class="pn__btn" data-ed-action="picker-back" title="${esc(this.T('back'))}">${svg('left', 16)}<span class="visually-hidden">${esc(this.T('back'))}</span></button>
          <label class="pk__search">${svg('search', 15)}<input type="search" value="${esc(this.picker.q)}" placeholder="${esc(this.T('search_blocks'))}" data-ed-search aria-label="${esc(this.T('search_blocks'))}"></label>
        </div>
        <div class="pk__tabs" role="tablist"><button type="button" role="tab" data-pk-tab="blocks" aria-selected="${this.picker.tab === 'blocks'}">${esc(this.T('tab_blocks'))}</button><button type="button" role="tab" data-pk-tab="apps" aria-selected="${this.picker.tab === 'apps'}">${esc(this.T('tab_apps'))}</button></div>
        <div class="pn__body pn__body--picker" data-pk-body>${body}</div>`;
    }

    renderPanel(focusSearch = false) {
      if (this.view === 'settings') this.renderSettings();
      else if (this.view === 'picker') {
        this.renderPicker();
        const s = $('[data-ed-search]', this.panel);
        if (s && focusSearch && this.fine) { s.focus(); s.setSelectionRange(s.value.length, s.value.length); }
      } else this.renderTree();
    }

    render() { this.renderPreview(); this.renderPanel(); this.syncTools(); }

    /* =========================================================
       Sélection
       ========================================================= */
    select(sel, { scroll = true, view = 'settings' } = {}) {
      this.sel = sel;
      this.view = sel ? view : 'tree';
      this.closeMenus();
      this.renderPanel();
      this.positionFrame();
      this.panel.scrollTop = 0;
      if (sel) {
        const c = this.current();
        if (c) this.say(`${this.T('selected')} ${c.name}`);
        if (scroll) this.scrollToSel();
      }
    }

    selEl() {
      if (!this.sel) return null;
      return this.sel.kind === 'section' ? $(`[data-sid="${this.sel.id}"]`, this.canvas) : $(`[data-bid="${this.sel.id}"]`, this.canvas);
    }

    scrollToSel() {
      const el = this.selEl();
      if (!el) return;
      const pr = this.preview.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      if (r.top < pr.top + 28 || r.bottom > pr.bottom - 36) {
        const top = this.preview.scrollTop + (r.top - pr.top) - Math.max(36, (pr.height - r.height) / 3);
        this.preview.scrollTo({ top: Math.max(0, top), behavior: this.reduce ? 'auto' : 'smooth' });
      }
    }

    place(box, el) {
      const s = this.stage.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      box.style.top = `${r.top - s.top - 2}px`;
      box.style.left = `${r.left - s.left - 2}px`;
      box.style.width = `${r.width + 4}px`;
      box.style.height = `${r.height + 4}px`;
    }

    positionFrame() {
      const el = this.selEl();
      if (!el || !this.selectMode) { this.frame.hidden = true; return; }
      const c = this.current();
      const locked = c && c.block && c.def.locked;
      this.frame.hidden = false;
      this.frame.classList.toggle('is-section', this.sel.kind === 'section');
      $('[data-ed-label]', this.frame).innerHTML = `${svg(c ? c.icon : 'block', 12)}<span>${esc(c ? c.name : '')}</span>`;
      const mini = $('[data-ed-mini]', this.frame);
      mini.hidden = this.sel.kind === 'section';
      $$('[data-ed-action="duplicate"],[data-ed-action="delete"]', mini).forEach((x) => { x.hidden = !!locked; });
      $('[data-ed-action="plus"]', this.frame).hidden = this.sel.kind === 'section' && this.sel.id !== 'product';
      this.place(this.frame, el);
    }

    hover(id, kind, on) {
      $$('.tr__row.is-hover', this.panel).forEach((r) => r.classList.remove('is-hover'));
      if (!this.selectMode || !on || !id || (this.sel && this.sel.id === id)) { this.hoverBox.classList.remove('is-on'); return; }
      const el = kind === 'section' ? $(`[data-sid="${id}"]`, this.canvas) : $(`[data-bid="${id}"]`, this.canvas);
      if (!el) { this.hoverBox.classList.remove('is-on'); return; }
      this.place(this.hoverBox, el);
      this.hoverBox.classList.add('is-on');
      const row = $(`[data-node="${id}"] > .tr__row`, this.panel);
      if (row) row.classList.add('is-hover');
    }

    /* =========================================================
       Opérations
       ========================================================= */
    set(k, v, { debounce = false, panel = false } = {}) {
      const c = this.current();
      if (!c) return;
      c.values[k] = v;
      this.renderPreview();
      if (panel) this.renderSettings();
      else { const t = $('.pn__title', this.panel); if (t && c.block) t.firstChild.textContent = c.name; }
      this.commit(debounce);
    }

    insert(type, ctx) {
      const def = this.defs[type];
      const b = { id: uid(), type, hidden: false, settings: this.defaults(type), ...(def.container ? { blocks: [] } : {}) };
      if (type === 'badges') b.blocks = [{ id: uid(), type: 'badge', hidden: false, settings: { ...this.defaults('badge'), featured: true } }];
      const st = this.state;
      if (ctx.into && ctx.into !== 'root') { const r = this.find(ctx.into); (r ? r.block.blocks : st.product.blocks).unshift(b); }
      else if (ctx.after) { const r = this.find(ctx.after); if (r) r.list.splice(r.index + 1, 0, b); else st.product.blocks.push(b); }
      else st.product.blocks.splice(1, 0, b);
      this.commit();
      this.picker.q = '';
      this.renderPreview();
      this.select({ kind: 'block', id: b.id });
      this.toast(this.T('added', { name: def.name }));
    }

    duplicate(id) {
      const r = this.find(id);
      if (!r || this.defs[r.block.type].locked) return;
      const c = clone(r.block);
      const re = (b) => { b.id = uid(); (b.blocks || []).forEach(re); };
      re(c);
      c.hidden = false;
      r.list.splice(r.index + 1, 0, c);
      this.commit();
      this.renderPreview();
      this.select({ kind: 'block', id: c.id });
      this.toast(this.T('duplicated'));
    }

    toggleHide(id) {
      const r = this.find(id);
      if (!r) return;
      r.block.hidden = !r.block.hidden;
      this.commit();
      this.renderPreview();
      this.renderPanel();
      this.toast(r.block.hidden ? this.T('hidden') : this.T('shown'));
    }

    remove(id) {
      const r = this.find(id);
      if (!r || this.defs[r.block.type].locked) return;
      r.list.splice(r.index, 1);
      this.commit();
      this.sel = null;
      this.view = 'tree';
      this.render();
      this.toast(this.T('deleted'));
    }

    move(id, dir) {
      const r = this.find(id);
      if (!r) return;
      const to = r.index + dir;
      if (to < 0 || to >= r.list.length || (r.list[to] && this.defs[r.list[to].type].locked)) return;
      r.list.splice(to, 0, r.list.splice(r.index, 1)[0]);
      this.commit();
      this.renderPreview();
      this.renderPanel();
      this.say(this.T(dir < 0 ? 'moved_up' : 'moved_down'));
    }

    openPicker(ctx) {
      this.picker.ctx = ctx;
      this.picker.q = '';
      this.picker.tab = 'blocks';
      this.view = 'picker';
      this.closeMenus();
      this.renderPicker();
      this.panel.scrollTop = 0;
      const s = $('[data-ed-search]', this.panel);
      if (s && this.fine) s.focus();
    }

    generate() {
      const ctx = this.picker.ctx || { into: 'root' };
      const list = (this.store.ai && this.store.ai.length ? this.store.ai : this.T('ai_text').split('|')).map((x) => x.trim()).filter(Boolean);
      const text = list[(this.aiN++) % list.length];
      this.insert('text', ctx);
      const c = this.current();
      if (!c) return;
      const area = $('.rte__area', this.panel);
      this.root.classList.add('is-generating');
      let i = 0;
      const step = () => {
        i += this.reduce ? text.length : 2;
        const part = text.slice(0, i);
        c.values.text = `<p>${esc(part)}</p>`;
        if (area) area.innerHTML = c.values.text;
        this.renderPreview();
        if (i < text.length) this.gTimer = setTimeout(step, 22);
        else { this.root.classList.remove('is-generating'); this.commit(); }
      };
      step();
    }

    rewrite(area) {
      const c = this.current();
      if (!c) return;
      const isTitle = c.block && c.block.type === 'title';
      const list = (isTitle && this.store.ai_titles && this.store.ai_titles.length ? this.store.ai_titles : this.T('ai_text').split('|')).map((x) => x.trim()).filter(Boolean);
      const text = list[(this.aiN++) % list.length];
      const k = area.dataset.k;
      const L = area.closest('[data-rte]').dataset.lists === 'true';
      const w = (s) => (L ? `<p>${esc(s)}</p>` : esc(s));
      clearTimeout(this.gTimer);
      this.root.classList.add('is-generating');
      let i = 0;
      const step = () => {
        i += this.reduce ? text.length : 2;
        c.values[k] = w(text.slice(0, i));
        area.innerHTML = c.values[k];
        this.renderPreview();
        if (i < text.length) this.gTimer = setTimeout(step, 22);
        else { this.root.classList.remove('is-generating'); this.commit(); }
      };
      step();
    }

    closeMenus(except) {
      $$('[data-ed-menu],[data-ed-save-menu],[data-ed-block-menu]', this.root).forEach((m) => {
        if (m === except) return;
        m.hidden = true;
        const t = m.previousElementSibling;
        if (t && t.hasAttribute('aria-expanded')) t.setAttribute('aria-expanded', 'false');
      });
    }
    toggleMenu(btn, menu) {
      if (!menu) return;
      const open = menu.hidden;
      this.closeMenus(menu);
      menu.hidden = !open;
      btn.setAttribute('aria-expanded', String(open));
      if (open) $('button', menu)?.focus();
    }

    /* =========================================================
       Événements
       ========================================================= */
    bind() {
      const R = this.root;

      R.addEventListener('click', (e) => {
        const a = e.target.closest('[data-ed-action]');
        if (a && R.contains(a) && !a.disabled) { this.action(a.dataset.edAction, a); return; }
        const pill = e.target.closest('[data-ed-store]');
        if (pill) { this.switchStore(Number(pill.dataset.edStore)); return; }
        if (!e.target.closest('.ed-menu-wrap, .pn__menu-wrap, .ed__save-wrap')) this.closeMenus();
      });

      // Boutiques : flèches du clavier
      const pills = $$('[data-ed-store]', R);
      pills.forEach((p, i) => p.addEventListener('keydown', (e) => {
        const d = ['ArrowRight', 'ArrowDown'].includes(e.key) ? 1 : ['ArrowLeft', 'ArrowUp'].includes(e.key) ? -1 : 0;
        if (!d) return;
        e.preventDefault();
        const n = pills[(i + d + pills.length) % pills.length];
        n.focus();
        this.switchStore(Number(n.dataset.edStore));
      }));

      // Raccourcis
      R.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.closeMenus();
          if (this.view === 'picker') { this.view = this.sel ? 'settings' : 'tree'; this.renderPanel(); }
        }
        const mod = e.metaKey || e.ctrlKey;
        const inText = e.target.closest('input, textarea, [contenteditable="true"]');
        if (mod && !inText && e.key.toLowerCase() === 'z') { e.preventDefault(); if (e.shiftKey) this.redo(); else this.undo(); }
        if (mod && !inText && e.key.toLowerCase() === 'y') { e.preventDefault(); this.redo(); }
        if (mod && e.key.toLowerCase() === 's') { e.preventDefault(); if (this.dirty) this.save(); }
      });
      document.addEventListener('click', (e) => { if (!R.contains(e.target)) this.closeMenus(); });

      /* Aperçu */
      this.canvas.addEventListener('click', (e) => {
        const add = e.target.closest('[data-ed-add-into]');
        if (add) { e.preventDefault(); this.openPicker({ into: add.dataset.edAddInto }); return; }
        const tab = e.target.closest('[data-tab-of]');
        if (tab) { this.ui[`tab-${tab.dataset.tabOf}`] = Number(tab.dataset.tabI); this.renderPreview(); }
        const sl = e.target.closest('[data-slide]');
        if (sl) { const k = `sl-${sl.dataset.slide}`; this.ui[k] = (this.ui[k] || 0) + Number(sl.dataset.dir) + 100; this.renderPreview(); }
        if (!this.selectMode) return;
        if (e.target.closest('summary')) e.preventDefault();
        const b = e.target.closest('[data-bid]');
        if (b) { this.select({ kind: 'block', id: b.dataset.bid }, { scroll: false }); return; }
        const s = e.target.closest('[data-sid]');
        if (s) this.select({ kind: 'section', id: s.dataset.sid }, { scroll: false });
      });
      this.canvas.addEventListener('keydown', (e) => {
        const b = e.target.closest('[data-bid]');
        if (b && e.target === b && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); this.select({ kind: 'block', id: b.dataset.bid }); }
      });
      this.canvas.addEventListener('pointerover', (e) => {
        if (e.pointerType !== 'mouse') return;
        const b = e.target.closest('[data-bid]');
        const s = e.target.closest('[data-sid]');
        if (b) this.hover(b.dataset.bid, 'block', true); else if (s) this.hover(s.dataset.sid, 'section', true); else this.hover(null, null, false);
      });
      this.canvas.addEventListener('pointerleave', () => this.hover(null, null, false));
      this.preview.addEventListener('scroll', () => { this.positionFrame(); this.hoverBox.classList.remove('is-on'); }, { passive: true });
      window.addEventListener('resize', () => this.positionFrame());
      if ('ResizeObserver' in window) new ResizeObserver(() => this.positionFrame()).observe(this.canvas);

      /* Panneau */
      const P = this.panel;
      P.addEventListener('click', (e) => {
        const t = e.target;
        const eye = t.closest('[data-ed-eye]');
        if (eye) { this.toggleHide(eye.dataset.edEye); return; }
        const eyeS = t.closest('[data-ed-eye-section]');
        if (eyeS) { const s = this.state[eyeS.dataset.edEyeSection]; s.hidden = !s.hidden; this.commit(); this.render(); return; }
        const col = t.closest('[data-ed-collapse]');
        if (col) { this.collapsed[col.dataset.edCollapse] = !this.collapsed[col.dataset.edCollapse]; this.renderTree(); return; }
        const selB = t.closest('[data-ed-select]');
        if (selB) { this.select({ kind: 'block', id: selB.dataset.edSelect }); return; }
        const selS = t.closest('[data-ed-section]');
        if (selS) { this.select({ kind: 'section', id: selS.dataset.edSection }); return; }
        const add = t.closest('[data-ed-add-into]');
        if (add) { this.openPicker({ into: add.dataset.edAddInto }); return; }
        const pick = t.closest('[data-pick]');
        if (pick) { this.insert(pick.dataset.pick, this.picker.ctx || { into: 'root' }); return; }
        if (t.closest('[data-ed-generate]')) { this.generate(); return; }
        const cat = t.closest('[data-ed-cat]');
        if (cat) { this.picker.closed[cat.dataset.edCat] = !this.picker.closed[cat.dataset.edCat]; this.renderPicker(); return; }
        const tab = t.closest('[data-pk-tab]');
        if (tab) { this.picker.tab = tab.dataset.pkTab; this.renderPicker(); return; }
        const sw = t.closest('[data-swatch]');
        if (sw) { this.set(sw.dataset.swatch, sw.dataset.c, { panel: true }); return; }
        const sc = t.closest('[data-scheme]');
        if (sc) { this.set(sc.dataset.scheme, sc.dataset.v, { panel: true }); return; }
        const swap = t.closest('[data-ed-swap]');
        if (swap) { const c = this.current(); const n = (this.store.products || []).length || 1; this.set(swap.dataset.edSwap, ((Number(c.values[swap.dataset.edSwap]) || 0) + 1) % n, { panel: true }); return; }
        if (t.closest('[data-ed-dynamic]') || t.closest('[data-ed-toast]')) { this.toast(this.T('coming_soon')); return; }
        const cmd = t.closest('[data-cmd]');
        if (cmd) { this.rte(cmd); return; }
        if (t.closest('[data-link-apply]')) this.applyLink(t.closest('[data-rte]'));
      });
      P.addEventListener('mousedown', (e) => { if (e.target.closest('.rte__bar')) e.preventDefault(); });
      P.addEventListener('input', (e) => {
        const t = e.target;
        if (t.matches('[data-ed-search]')) { this.picker.q = t.value; this.renderPanel(true); return; }
        if (t.matches('.rte__area')) { this.set(t.dataset.k, sanitize(t.innerHTML, t.closest('[data-rte]').dataset.lists === 'true'), { debounce: true }); return; }
        if (t.matches('[data-hex]')) {
          const v = t.value.trim();
          if (/^#[0-9a-f]{6}$/i.test(v)) { const chip = t.parentElement.querySelector('.clr__chip'); chip.style.background = v; chip.querySelector('input').value = v.toLowerCase(); this.set(t.dataset.hex, v.toUpperCase(), { debounce: true }); }
          return;
        }
        const k = t.dataset.k;
        if (!k) return;
        if (t.type === 'range') {
          const out = $(`[data-out="${k}"]`, P);
          if (out) out.textContent = t.value;
          t.style.setProperty('--p', `${((t.value - t.min) / (t.max - t.min)) * 100}%`);
          this.set(k, Number(t.value), { debounce: true });
        } else if (t.type === 'color') {
          t.parentElement.style.background = t.value;
          const hex = t.closest('.clr').querySelector('[data-hex]');
          if (hex) hex.value = t.value.toUpperCase();
          this.set(k, t.value.toUpperCase(), { debounce: true });
        } else if (t.type === 'number') this.set(k, Math.max(0, parseInt(t.value || '0', 10)), { debounce: true });
        else if (t.type === 'text' || t.tagName === 'TEXTAREA') this.set(k, t.value, { debounce: true });
      });
      P.addEventListener('change', (e) => {
        const t = e.target;
        const k = t.dataset.k;
        if (!k) return;
        if (t.type === 'checkbox') this.set(k, t.checked, { panel: true });
        else if (t.type === 'radio') this.set(k, t.value);
        else if (t.tagName === 'SELECT') this.set(k, t.value);
        else if (t.type === 'range' || t.type === 'color') { clearTimeout(this.cTimer); this.commit(); }
      });
      P.addEventListener('keydown', (e) => {
        if (e.target.closest('[data-linkbar]') && e.key === 'Enter') { e.preventDefault(); this.applyLink(e.target.closest('[data-rte]')); }
        if (e.target.matches('[data-ed-search]') && e.key === 'Enter') { e.preventDefault(); const f = $('[data-pick]', P); if (f) f.click(); }
        const s = e.target.closest('[data-ed-select]');
        if (s && e.altKey && ['ArrowUp', 'ArrowDown'].includes(e.key)) { e.preventDefault(); this.sel = { kind: 'block', id: s.dataset.edSelect }; this.move(s.dataset.edSelect, e.key === 'ArrowUp' ? -1 : 1); $(`[data-ed-select="${s.dataset.edSelect}"]`, P)?.focus(); }
      });
      P.addEventListener('pointerover', (e) => {
        if (e.pointerType !== 'mouse') return;
        const n = e.target.closest('[data-node]');
        const s = e.target.closest('[data-ed-section]');
        if (n) this.hover(n.dataset.node, 'block', true); else if (s) this.hover(s.dataset.edSection, 'section', true);
      });
      P.addEventListener('pointerleave', () => this.hover(null, null, false));
      document.addEventListener('selectionchange', () => {
        const a = document.activeElement;
        if (!a || !a.classList || !a.classList.contains('rte__area') || !P.contains(a)) return;
        const rte = a.closest('[data-rte]');
        ['bold', 'italic'].forEach((c) => { const b = $(`[data-cmd="${c}"]`, rte); let on = false; try { on = document.queryCommandState(c); } catch (err) { on = false; } if (b) b.setAttribute('aria-pressed', String(on)); });
        const s = window.getSelection();
        if (s && s.rangeCount) this.range = s.getRangeAt(0).cloneRange();
      });
      this.bindDrag();
    }

    action(a, btn) {
      const id = this.sel && this.sel.kind === 'block' ? this.sel.id : null;
      switch (a) {
        case 'layers': this.sel = null; this.view = 'tree'; this.renderPanel(); this.positionFrame(); break;
        case 'select':
          this.selectMode = !this.selectMode;
          btn.setAttribute('aria-pressed', String(this.selectMode));
          btn.classList.toggle('is-active', this.selectMode);
          this.root.classList.toggle('is-select', this.selectMode);
          this.positionFrame();
          this.hoverBox.classList.remove('is-on');
          break;
        case 'undo': this.undo(); break;
        case 'redo': this.redo(); break;
        case 'menu': this.toggleMenu(btn, $('[data-ed-menu]', this.root)); break;
        case 'reset': this.closeMenus(); this.load(this.idx, true); this.toast(this.T('reset_done')); break;
        case 'save': this.closeMenus(); if (this.dirty) this.save(); break;
        case 'save-menu': this.toggleMenu(btn, $('[data-ed-save-menu]', this.root)); break;
        case 'discard': this.closeMenus(); if (this.dirty) { this.restore(this.hist.saved); this.hist.stack = this.hist.stack.slice(0, this.hist.saved + 1); this.syncTools(); this.toast(this.T('discarded')); } break;
        case 'close': this.select(null); break;
        case 'picker-back': this.view = this.sel ? 'settings' : 'tree'; this.renderPanel(); break;
        case 'block-menu': this.toggleMenu(btn, $('[data-ed-block-menu]', this.panel)); break;
        case 'move-up': if (id) this.move(id, -1); break;
        case 'move-down': if (id) this.move(id, 1); break;
        case 'duplicate': if (id) this.duplicate(id); break;
        case 'hide': if (id) this.toggleHide(id); break;
        case 'delete': if (id) this.remove(id); break;
        case 'plus': {
          if (!this.sel) return;
          if (this.sel.kind === 'section') { this.openPicker({ into: 'root' }); return; }
          const r = this.find(this.sel.id);
          if (r && r.block.type === 'media') this.openPicker({ after: 'media' });
          else this.openPicker({ after: this.sel.id });
          break;
        }
        default: break;
      }
    }

    rte(btn) {
      const rte = btn.closest('[data-rte]');
      const area = $('.rte__area', rte);
      const cmd = btn.dataset.cmd;
      if (cmd === 'ai') { this.rewrite(area); return; }
      if (cmd === 'style') {
        const c = this.current();
        if (!c) return;
        if ('tag' in c.values) { c.values.tag = { h1: 'h2', h2: 'h3', h3: 'h1' }[c.values.tag] || 'h2'; }
        else if ('style' in c.values) { c.values.style = { body: 'large', large: 'small', small: 'body' }[c.values.style] || 'body'; }
        this.renderPreview();
        this.commit();
        const sel = $('select[data-k="tag"], select[data-k="style"]', this.panel);
        if (sel) sel.value = c.values.tag || c.values.style;
        return;
      }
      if (cmd === 'link') {
        const s = window.getSelection();
        if (!s || s.isCollapsed || !area.contains(s.anchorNode)) { this.toast(this.T('select_text_first')); area.focus(); return; }
        this.range = s.getRangeAt(0).cloneRange();
        const bar = $('[data-linkbar]', rte);
        bar.hidden = false;
        $('input', bar).focus();
        return;
      }
      area.focus();
      try { document.execCommand(cmd, false, null); } catch (err) { /* ignoré */ }
      area.dispatchEvent(new Event('input', { bubbles: true }));
    }

    applyLink(rte) {
      const bar = $('[data-linkbar]', rte);
      const area = $('.rte__area', rte);
      const url = $('input', bar).value.trim();
      bar.hidden = true;
      if (!url || !this.range) return;
      area.focus();
      const s = window.getSelection();
      s.removeAllRanges();
      s.addRange(this.range);
      try { document.execCommand('createLink', false, url); } catch (err) { /* ignoré */ }
      area.dispatchEvent(new Event('input', { bubbles: true }));
    }

    /* Glisser-déposer dans l'arborescence (poignée ⋮⋮) */
    bindDrag() {
      this.panel.addEventListener('pointerdown', (e) => {
        const grip = e.target.closest('[data-ed-grip]');
        if (!grip) return;
        const item = grip.closest('[data-node]');
        const list = item.parentElement;
        e.preventDefault();
        grip.setPointerCapture(e.pointerId);
        const sibs = $$(':scope > [data-node]', list);
        const from = sibs.indexOf(item);
        const row = $(':scope > .tr__row', item);
        const y0 = e.clientY;
        let to = from;
        const mark = document.createElement('li');
        mark.className = 'tr__drop';
        item.classList.add('is-drag');
        const move = (ev) => {
          row.style.transform = `translateY(${ev.clientY - y0}px)`;
          to = from;
          sibs.forEach((s, i) => {
            if (s === item || this.defs[(this.find(s.dataset.node) || {}).block?.type]?.locked) return;
            const r = $(':scope > .tr__row', s).getBoundingClientRect();
            const mid = r.top + r.height / 2;
            if (i > from && ev.clientY > mid) to = i;
            if (i < from && ev.clientY < mid && to === from) to = i;
          });
          if (to === from) mark.remove(); else if (to > from) sibs[to].after(mark); else sibs[to].before(mark);
        };
        const up = () => {
          grip.removeEventListener('pointermove', move);
          grip.removeEventListener('pointerup', up);
          grip.removeEventListener('pointercancel', up);
          mark.remove();
          row.style.transform = '';
          item.classList.remove('is-drag');
          if (to === from) return;
          const r = this.find(item.dataset.node);
          if (!r) return;
          const target = this.find(sibs[to].dataset.node);
          const toIdx = target ? target.index : to;
          r.list.splice(toIdx, 0, r.list.splice(r.index, 1)[0]);
          this.commit();
          this.renderPreview();
          this.renderTree();
          this.say(this.T('moved'));
        };
        grip.addEventListener('pointermove', move);
        grip.addEventListener('pointerup', up);
        grip.addEventListener('pointercancel', up);
      });
    }
  }

  // Démarrage différé : l'aperçu statique s'affiche tout de suite, l'éditeur s'active
  // quand la carte approche de l'écran et que le navigateur est libre (pas de blocage au chargement).
  const start = (el) => { if (!el.__ed) el.__ed = new LiveEditor(el); };
  const idle = (fn) => ('requestIdleCallback' in window ? requestIdleCallback(fn, { timeout: 1500 }) : setTimeout(fn, 200));
  const boot = (scope = document, now = false) => scope.querySelectorAll('[data-editor]').forEach((el) => {
    if (now || !('IntersectionObserver' in window)) { start(el); return; }
    const io = new IntersectionObserver((entries) => {
      if (!entries.some((en) => en.isIntersecting)) return;
      io.disconnect();
      idle(() => start(el));
    }, { rootMargin: '200px' });
    io.observe(el);
    ['pointerdown', 'focusin'].forEach((t) => el.addEventListener(t, () => { io.disconnect(); start(el); }, { once: true, capture: true }));
  });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => boot()); else boot();
  document.addEventListener('shopify:section:load', (e) => boot(e.target, true));
})();
