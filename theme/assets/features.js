/* Kinetic — features.js
 * Fonctionnalités habituellement vendues sous forme d'applications, intégrées au thème.
 * Vanilla, sans dépendance, chargé en defer. Chaque module ne s'active que si son
 * attribut data-* est présent dans la page.
 *
 *  data-hover-open            menus déroulants ouverts au survol (ordinateur)
 *  data-sticky="scroll-up"    en-tête qui se cache en descendant
 *  data-predictive-search     recherche prédictive (section predictive-search)
 *  data-wishlist-toggle       liste d'envies (localStorage) + [data-wishlist-grid]
 *  data-recently-viewed       produits récemment consultés
 *  data-quick-view            aperçu rapide d'un produit (section quick-view)
 *  data-popup                 pop-ups (délai, intention de sortie, défilement) + vérification d'âge
 *  data-countdown             comptes à rebours (date fixe ou « evergreen » par visiteur)
 *  data-before-after          comparateur avant / après
 *  data-hotspot               points cliquables (lookbook, shop the look)
 *  data-back-to-top           bouton retour en haut
 *  data-load-more             « Voir plus » / défilement infini des collections
 *  data-grid-toggle           choix du nombre de colonnes
 *  data-bundle                « Souvent achetés ensemble »
 *  data-qty-breaks            remises par quantité
 *  data-gift-wrap             emballage cadeau dans le panier
 *  data-terms                 case CGV obligatoire avant paiement
 *  data-tabs                  onglets accessibles
 *  data-dialog-open           fenêtres modales (<dialog>) : guide des tailles, zoom…
 *  data-count-to              compteurs animés
 *  data-video-facade          vidéo YouTube / Vimeo chargée au clic
 *  data-slideshow             diaporama (autoplay, points, pause)
 *  data-copy                  copier un code promo
 *  data-delivery              estimation de livraison (jours ouvrés, heure limite)
 *  data-share                 partage natif / copie du lien
 *  data-swatch-img            pastilles de couleur sur les cartes produit
 */
(() => {
  'use strict';
  const K = window.Kinetic || {};
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* stockage indisponible */ } },
  };
  const t = (k, fb) => (K.strings && K.strings[k]) || fb;
  const toast = (m) => (K.toast ? K.toast(m) : null);
  const root = () => (K.routes && K.routes.root) || '/';
  const fetchSection = async (url, id) => {
    const u = new URL(url, window.location.origin);
    u.searchParams.set('section_id', id);
    const res = await fetch(u.toString());
    if (!res.ok) throw new Error(res.statusText);
    return res.text();
  };
  const parse = (html) => new DOMParser().parseFromString(html, 'text/html');
  const debounce = (fn, ms) => { let id; return (...a) => { clearTimeout(id); id = setTimeout(() => fn(...a), ms); }; };
  const once = (el, key) => { if (el.dataset[key]) return false; el.dataset[key] = '1'; return true; };

  /* ---------- Menus au survol (ordinateur) ---------- */
  const hoverMenus = () => {
    if (!window.matchMedia('(hover: hover) and (min-width: 990px)').matches) return;
    $$('details[data-hover-open]').forEach((d) => {
      if (!once(d, 'kHover')) return;
      const li = d.parentElement;
      let timer;
      li.addEventListener('mouseenter', () => { clearTimeout(timer); $$('details[data-hover-open][open]').forEach((o) => { if (o !== d) o.open = false; }); d.open = true; });
      li.addEventListener('mouseleave', () => { timer = setTimeout(() => { d.open = false; }, 160); });
    });
  };

  /* ---------- En-tête qui se cache en descendant ---------- */
  const stickyHeader = () => {
    const h = $('[data-sticky="scroll-up"]');
    if (!h || !once(h, 'kSticky')) return;
    let last = window.scrollY;
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      const open = h.querySelector('details[open]');
      h.classList.toggle('is-hidden', !open && y > last && y > 160);
      last = y;
    }, { passive: true });
  };

  /* ---------- Recherche prédictive ---------- */
  const predictive = () => {
    $$('form[data-predictive-search]').forEach((form) => {
      if (!once(form, 'kPred')) return;
      const input = $('input[name="q"]', form);
      const out = form.parentElement.querySelector('[data-predictive-results]');
      const popular = form.parentElement.querySelector('.predictive__popular');
      if (!input || !out) return;
      let ctrl;
      const run = debounce(async () => {
        const q = input.value.trim();
        if (q.length < 2) { out.innerHTML = ''; input.setAttribute('aria-expanded', 'false'); if (popular) popular.hidden = false; return; }
        ctrl?.abort();
        ctrl = new AbortController();
        try {
          const u = `${root()}search/suggest?q=${encodeURIComponent(q)}&resources[type]=product,collection,page,article,query&resources[limit]=6&section_id=predictive-search`;
          const res = await fetch(u, { signal: ctrl.signal });
          if (!res.ok) return;
          const doc = parse(await res.text());
          const inner = doc.querySelector('#shopify-section-predictive-search') || doc.body;
          out.innerHTML = inner.innerHTML;
          input.setAttribute('aria-expanded', 'true');
          if (popular) popular.hidden = true;
        } catch (e) { /* requête annulée */ }
      }, 220);
      input.addEventListener('input', run);
      input.addEventListener('keydown', (e) => {
        if (!['ArrowDown', 'ArrowUp'].includes(e.key)) return;
        const items = $$('a', out);
        if (!items.length) return;
        e.preventDefault();
        const i = items.indexOf(document.activeElement);
        const n = items[(i + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length];
        n.focus();
      });
      out.addEventListener('keydown', (e) => {
        if (!['ArrowDown', 'ArrowUp'].includes(e.key)) return;
        e.preventDefault();
        const items = $$('a', out);
        const i = items.indexOf(document.activeElement);
        if (e.key === 'ArrowUp' && i <= 0) { input.focus(); return; }
        items[Math.min(items.length - 1, i + (e.key === 'ArrowDown' ? 1 : -1))]?.focus();
      });
    });
  };

  /* ---------- Liste d'envies ---------- */
  const WL = 'kinetic-wishlist';
  const wishlist = {
    all: () => store.get(WL, []),
    has: (h) => wishlist.all().includes(h),
    toggle(h) {
      const list = wishlist.all();
      const i = list.indexOf(h);
      if (i > -1) list.splice(i, 1); else list.unshift(h);
      store.set(WL, list.slice(0, 60));
      return i === -1;
    },
    sync() {
      const n = wishlist.all().length;
      $$('[data-wishlist-count]').forEach((el) => { el.textContent = n || ''; el.dataset.count = n; });
      $$('[data-wishlist-toggle]').forEach((b) => {
        const on = wishlist.has(b.dataset.wishlistToggle);
        b.setAttribute('aria-pressed', String(on));
        b.classList.toggle('is-active', on);
      });
    },
  };
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-wishlist-toggle]');
    if (!b) return;
    e.preventDefault();
    const added = wishlist.toggle(b.dataset.wishlistToggle);
    wishlist.sync();
    toast(added ? t('wishlistAdded', 'Ajouté à la liste d\'envies') : t('wishlistRemoved', 'Retiré de la liste d\'envies'));
    if (!added) $$(`[data-wishlist-grid] [data-handle="${b.dataset.wishlistToggle}"]`).forEach((c) => c.remove());
    $$('[data-wishlist-grid]').forEach((g) => { const empty = g.parentElement.querySelector('[data-wishlist-empty]'); if (empty) empty.hidden = g.children.length > 0; });
  });

  /** Remplit une grille avec les cartes produit des handles donnés (section product-card-ajax). */
  async function fillCards(grid, handles) {
    const items = await Promise.all(handles.map(async (h) => {
      try {
        const html = await fetchSection(`${root()}products/${h}`, 'product-card-ajax');
        const card = parse(html).querySelector('[data-card]');
        if (!card) return null;
        const li = document.createElement('li');
        li.dataset.handle = h;
        li.append(card);
        return li;
      } catch (e) { return null; }
    }));
    grid.replaceChildren(...items.filter(Boolean));
    wishlist.sync();
    return grid.children.length;
  }
  const wishlistPage = () => {
    $$('[data-wishlist-grid]').forEach(async (grid) => {
      if (!once(grid, 'kWl')) return;
      const n = await fillCards(grid, wishlist.all());
      const empty = grid.parentElement.querySelector('[data-wishlist-empty]');
      if (empty) empty.hidden = n > 0;
    });
  };

  /* ---------- Récemment consultés ---------- */
  const RV = 'kinetic-recent';
  const recentlyViewed = () => {
    const cur = $('[data-product-handle]');
    if (cur && once(cur, 'kRv')) {
      const h = cur.dataset.productHandle;
      const list = store.get(RV, []).filter((x) => x !== h);
      list.unshift(h);
      store.set(RV, list.slice(0, 12));
    }
    $$('[data-recently-viewed]').forEach(async (sec) => {
      if (!once(sec, 'kRvs')) return;
      const grid = $('[data-recent-grid]', sec);
      const current = cur ? cur.dataset.productHandle : null;
      const handles = store.get(RV, []).filter((x) => x !== current).slice(0, Number(sec.dataset.limit) || 4);
      if (!handles.length || !grid) return;
      const n = await fillCards(grid, handles);
      sec.hidden = n === 0;
    });
  };

  /* ---------- Fenêtres modales (<dialog>) ---------- */
  const openDialog = (dlg) => {
    if (!dlg) return;
    if (typeof dlg.showModal === 'function') dlg.showModal(); else dlg.setAttribute('open', '');
    document.documentElement.classList.add('has-dialog');
  };
  const closeDialog = (dlg) => {
    if (!dlg) return;
    if (typeof dlg.close === 'function') dlg.close(); else dlg.removeAttribute('open');
  };
  document.addEventListener('click', (e) => {
    const opener = e.target.closest('[data-dialog-open]');
    if (opener) {
      e.preventDefault();
      const dlg = document.getElementById(opener.dataset.dialogOpen);
      openDialog(dlg);
      if (dlg && opener.dataset.lightboxIndex) $(`[data-lightbox-item="${opener.dataset.lightboxIndex}"]`, dlg)?.scrollIntoView({ block: 'start' });
      return;
    }
    const closer = e.target.closest('[data-dialog-close]');
    if (closer) { closeDialog(closer.closest('dialog')); return; }
    if (e.target.matches('dialog.modal') && !e.target.hasAttribute('data-locked')) closeDialog(e.target);
  });
  document.addEventListener('close', (e) => { if (e.target.matches && e.target.matches('dialog')) { document.documentElement.classList.remove('has-dialog'); e.target.dispatchEvent(new CustomEvent('kinetic:dialog-closed', { bubbles: true })); } }, true);
  document.addEventListener('cancel', (e) => { if (e.target.hasAttribute && e.target.hasAttribute('data-locked')) e.preventDefault(); }, true);

  /* ---------- Aperçu rapide ---------- */
  let qvDialog;
  document.addEventListener('click', async (e) => {
    const b = e.target.closest('[data-quick-view]');
    if (!b) return;
    e.preventDefault();
    if (!qvDialog) {
      qvDialog = document.createElement('dialog');
      qvDialog.className = 'modal modal--wide quick-view';
      qvDialog.setAttribute('aria-label', t('quickView', 'Aperçu rapide'));
      document.body.append(qvDialog);
    }
    qvDialog.innerHTML = `<div class="modal__box"><button type="button" class="icon-btn modal__close" data-dialog-close aria-label="${t('close', 'Fermer')}">✕</button><div class="quick-view__loading" aria-busy="true"></div></div>`;
    openDialog(qvDialog);
    try {
      const html = await fetchSection(b.dataset.quickView, 'quick-view');
      const content = parse(html).querySelector('[data-quick-view-content]');
      const box = $('.modal__box', qvDialog);
      box.querySelector('.quick-view__loading').replaceWith(content);
      if (K.initProduct) K.initProduct(content);
    } catch (err) { closeDialog(qvDialog); window.location.href = b.dataset.quickView; }
  });
  document.addEventListener('kinetic:added', () => { if (qvDialog && qvDialog.open) closeDialog(qvDialog); });

  /* ---------- Pop-ups (newsletter, promo, âge) ---------- */
  const popups = () => {
    $$('dialog[data-popup]').forEach((dlg) => {
      if (!once(dlg, 'kPop')) return;
      const key = `kinetic-popup-${dlg.dataset.popup}`;
      const days = Number(dlg.dataset.frequency || 7);
      const seen = store.get(key, 0);
      if (dlg.dataset.designMode !== 'true' && seen && Date.now() - seen < days * 864e5) return;
      const show = () => { if (dlg.open || document.documentElement.classList.contains('has-dialog')) return; openDialog(dlg); store.set(key, Date.now()); };
      const trig = dlg.dataset.trigger || 'delay';
      if (dlg.dataset.designMode === 'true') return;
      if (trig === 'immediate') show();
      if (trig === 'delay') setTimeout(show, (Number(dlg.dataset.delay) || 8) * 1000);
      if (trig === 'scroll') {
        const onScroll = () => {
          const p = window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
          if (p > (Number(dlg.dataset.scroll) || 40) / 100) { window.removeEventListener('scroll', onScroll); show(); }
        };
        window.addEventListener('scroll', onScroll, { passive: true });
      }
      if (trig === 'exit') {
        const onOut = (e) => { if (e.clientY <= 0) { document.removeEventListener('mouseout', onOut); show(); } };
        document.addEventListener('mouseout', onOut);
        setTimeout(show, 45000); // mobile : pas d'intention de sortie détectable
      }
    });
    // Vérification de l'âge : bloque la page jusqu'à confirmation
    $$('dialog[data-age-gate]').forEach((dlg) => {
      if (!once(dlg, 'kAge')) return;
      if (dlg.dataset.designMode === 'true' || store.get('kinetic-age-ok', false)) return;
      openDialog(dlg);
      dlg.addEventListener('click', (e) => {
        if (e.target.closest('[data-age-yes]')) { store.set('kinetic-age-ok', true); closeDialog(dlg); }
        if (e.target.closest('[data-age-no]')) { $('[data-age-denied]', dlg).hidden = false; $('[data-age-question]', dlg).hidden = true; }
      });
    });
  };

  /* ---------- Comptes à rebours ---------- */
  const pad = (n) => String(n).padStart(2, '0');
  const countdowns = () => {
    $$('[data-countdown]').forEach((el) => {
      if (!once(el, 'kCd')) return;
      let end = Date.parse(el.dataset.countdown);
      if (el.dataset.evergreen) {
        const key = `kinetic-cd-${el.dataset.evergreen}`;
        const hours = Number(el.dataset.hours) || 24;
        let start = store.get(key, 0);
        if (!start || Date.now() - start > hours * 36e5) { start = Date.now(); store.set(key, start); }
        end = start + hours * 36e5;
      }
      if (Number.isNaN(end)) return;
      const parts = { d: $('[data-cd="d"]', el), h: $('[data-cd="h"]', el), m: $('[data-cd="m"]', el), s: $('[data-cd="s"]', el) };
      const tick = () => {
        let diff = Math.max(0, Math.floor((end - Date.now()) / 1000));
        const d = Math.floor(diff / 86400); diff -= d * 86400;
        const h = Math.floor(diff / 3600); diff -= h * 3600;
        const m = Math.floor(diff / 60); const s = diff - m * 60;
        if (parts.d) parts.d.textContent = pad(d);
        if (parts.h) parts.h.textContent = pad(parts.d ? h : h + d * 24);
        if (parts.m) parts.m.textContent = pad(m);
        if (parts.s) parts.s.textContent = pad(s);
        if (end - Date.now() <= 0) {
          clearInterval(id);
          el.classList.add('is-ended');
          if (el.dataset.hideEnded === 'true') (el.closest('[data-countdown-wrap]') || el).hidden = true;
        }
      };
      const id = setInterval(tick, 1000);
      tick();
    });
  };

  /* ---------- Avant / après ---------- */
  const beforeAfter = () => {
    $$('[data-before-after]').forEach((el) => {
      if (!once(el, 'kBa')) return;
      const input = $('input[type="range"]', el);
      const set = () => el.style.setProperty('--pos', `${input.value}%`);
      input.addEventListener('input', set);
      set();
    });
  };

  /* ---------- Points cliquables (lookbook) ---------- */
  document.addEventListener('click', (e) => {
    const dot = e.target.closest('[data-hotspot]');
    $$('[data-hotspot][aria-expanded="true"]').forEach((d) => { if (d !== dot) { d.setAttribute('aria-expanded', 'false'); } });
    if (!dot) return;
    const open = dot.getAttribute('aria-expanded') !== 'true';
    dot.setAttribute('aria-expanded', String(open));
  });

  /* ---------- Retour en haut ---------- */
  const backToTop = () => {
    const b = $('[data-back-to-top]');
    if (!b || !once(b, 'kTop')) return;
    window.addEventListener('scroll', () => b.classList.toggle('is-visible', window.scrollY > window.innerHeight * 1.5), { passive: true });
    b.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }));
  };

  /* ---------- Collections : voir plus / défilement infini, colonnes ---------- */
  const loadMore = () => {
    $$('[data-load-more]').forEach((btn) => {
      if (!once(btn, 'kLm')) return;
      const grid = document.getElementById(btn.dataset.loadMore);
      const go = async () => {
        const url = btn.dataset.next;
        if (!url || btn.classList.contains('is-loading')) return;
        btn.classList.add('is-loading');
        try {
          const doc = parse(await (await fetch(url)).text());
          const nextGrid = doc.getElementById(btn.dataset.loadMore);
          if (nextGrid) grid.append(...Array.from(nextGrid.children));
          const nextBtn = doc.querySelector(`[data-load-more="${btn.dataset.loadMore}"]`);
          if (nextBtn && nextBtn.dataset.next) btn.dataset.next = nextBtn.dataset.next; else btn.closest('[data-load-more-wrap]')?.remove();
          const count = doc.querySelector('[data-shown-count]');
          if (count) $$('[data-shown-count]').forEach((c) => { c.textContent = grid.children.length; });
          wishlist.sync();
          document.dispatchEvent(new CustomEvent('kinetic:content-added'));
        } finally { btn.classList.remove('is-loading'); }
      };
      btn.addEventListener('click', go);
      if (btn.dataset.infinite === 'true' && 'IntersectionObserver' in window) {
        const io = new IntersectionObserver((en) => { if (en[0].isIntersecting) go(); }, { rootMargin: '600px' });
        io.observe(btn);
      }
    });
  };
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-grid-toggle]');
    if (!b) return;
    const grid = document.getElementById(b.dataset.target);
    if (!grid) return;
    grid.style.setProperty('--cols-desktop', b.dataset.gridToggle);
    grid.dataset.cols = b.dataset.gridToggle;
    $$(`[data-grid-toggle][data-target="${b.dataset.target}"]`).forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    store.set('kinetic-grid', b.dataset.gridToggle);
  });
  const gridPref = () => {
    const pref = store.get('kinetic-grid', null);
    if (!pref) return;
    const b = $(`[data-grid-toggle="${pref}"]`);
    if (b && b.getAttribute('aria-pressed') !== 'true') b.click();
  };

  /* ---------- Souvent achetés ensemble ---------- */
  const fmt = (cents) => {
    const f = K.moneyFormat || '{{amount_with_comma_separator}} €';
    const v = (cents / 100).toFixed(2);
    const [i, d] = v.split('.');
    const withSep = (s, sep) => s.replace(/\B(?=(\d{3})+(?!\d))/g, sep);
    return f.replace(/\{\{\s*(\w+)\s*\}\}/, (_, k) => {
      if (k === 'amount_with_comma_separator') return `${withSep(i, '.')},${d}`;
      if (k === 'amount_no_decimals') return withSep(i, ',');
      if (k === 'amount_no_decimals_with_comma_separator') return withSep(i, '.');
      if (k === 'amount_with_space_separator') return `${withSep(i, ' ')},${d}`;
      return `${withSep(i, ',')}.${d}`;
    });
  };
  const bundles = () => {
    $$('[data-bundle]').forEach((b) => {
      if (!once(b, 'kBundle')) return;
      const update = () => {
        const checked = $$('input[data-bundle-item]:checked', b);
        const total = checked.reduce((s, i) => s + Number(i.dataset.price), 0);
        const pct = Number(b.dataset.discount) || 0;
        $('[data-bundle-total]', b).textContent = fmt(total);
        const after = $('[data-bundle-after]', b);
        if (after) { after.hidden = !pct || checked.length < 2; after.textContent = fmt(Math.round(total * (1 - pct / 100))); }
        $('[data-bundle-count]', b).textContent = checked.length;
        $('[data-bundle-add]', b).disabled = checked.length === 0;
        $$('[data-bundle-visual]', b).forEach((v) => { v.classList.toggle('is-off', !$(`input[data-bundle-item][value="${v.dataset.bundleVisual}"]`, b)?.checked); });
      };
      b.addEventListener('change', (e) => {
        const sel = e.target.closest('select[data-bundle-variant]');
        if (sel) {
          const opt = sel.selectedOptions[0];
          const box = $(`input[data-bundle-item][data-index="${sel.dataset.index}"]`, b);
          box.value = sel.value; box.dataset.price = opt.dataset.price;
          $(`[data-bundle-price="${sel.dataset.index}"]`, b).textContent = fmt(Number(opt.dataset.price));
        }
        update();
      });
      $('[data-bundle-add]', b).addEventListener('click', async (e) => {
        const btn = e.currentTarget;
        const items = $$('input[data-bundle-item]:checked', b).map((i) => ({ id: Number(i.value), quantity: 1 }));
        if (!items.length) return;
        btn.classList.add('is-loading');
        try {
          const res = await fetch(`${K.routes.cartAdd}.js`, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ items }) });
          const data = await res.json();
          if (!res.ok) throw new Error(data.description || data.message);
          if (K.refreshCart) await K.refreshCart();
          if (K.cartType === 'drawer' && K.openDrawer && K.openDrawer()) { /* ouvert */ } else window.location.href = K.routes.cart;
        } catch (err) { toast(err.message || t('error', 'Erreur')); } finally { btn.classList.remove('is-loading'); }
      });
      update();
    });
  };

  /* ---------- Remises par quantité ---------- */
  const qtyBreaks = () => {
    $$('[data-qty-breaks]').forEach((w) => {
      if (!once(w, 'kQb')) return;
      const form = document.getElementById(w.dataset.qtyBreaks);
      w.addEventListener('change', (e) => {
        const r = e.target.closest('input[type="radio"]');
        if (!r || !form) return;
        const q = form.querySelector('input[name="quantity"]');
        if (q) { q.value = r.value; q.dispatchEvent(new Event('change', { bubbles: true })); }
      });
      const checked = $('input:checked', w);
      if (checked) checked.dispatchEvent(new Event('change', { bubbles: true }));
    });
  };

  /* ---------- Emballage cadeau & CGV dans le panier ---------- */
  document.addEventListener('change', async (e) => {
    const gw = e.target.closest('input[data-gift-wrap]');
    if (gw) {
      gw.disabled = true;
      try {
        if (gw.checked) {
          await fetch(`${K.routes.cartAdd}.js`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ items: [{ id: Number(gw.dataset.giftWrap), quantity: 1 }] }) });
        } else {
          await fetch(`${K.routes.cartChange}.js`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: String(gw.dataset.giftWrap), quantity: 0 }) });
        }
        if (K.refreshCart && $('[data-cart-drawer]')) await K.refreshCart(); else window.location.reload();
      } finally { gw.disabled = false; }
    }
    const terms = e.target.closest('input[data-terms]');
    if (terms) $$('[name="checkout"]', terms.form || document).forEach((b) => { b.disabled = !terms.checked; });
  });
  const termsInit = () => $$('input[data-terms]').forEach((c) => $$('[name="checkout"]', c.form || document).forEach((b) => { b.disabled = !c.checked; }));
  document.addEventListener('kinetic:cart-updated', termsInit);

  /* ---------- Onglets ---------- */
  const tabs = () => {
    $$('[data-tabs]').forEach((w) => {
      if (!once(w, 'kTabs')) return;
      const list = $$('[role="tab"]', w);
      const select = (tab, focus) => {
        list.forEach((tb) => {
          const on = tb === tab;
          tb.setAttribute('aria-selected', String(on));
          tb.tabIndex = on ? 0 : -1;
          const panel = document.getElementById(tb.getAttribute('aria-controls'));
          if (panel) panel.hidden = !on;
        });
        if (focus) tab.focus();
      };
      list.forEach((tb, i) => {
        tb.addEventListener('click', () => select(tb));
        tb.addEventListener('keydown', (e) => {
          const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
          if (d) { e.preventDefault(); select(list[(i + d + list.length) % list.length], true); }
        });
      });
    });
  };

  /* ---------- Compteurs animés ---------- */
  const counters = () => {
    const els = $$('[data-count-to]').filter((el) => once(el, 'kCount'));
    if (!els.length) return;
    const run = (el) => {
      const to = parseFloat(el.dataset.countTo);
      const dec = (el.dataset.countTo.split(/[.,]/)[1] || '').length;
      const lang = document.documentElement.lang || 'fr';
      if (reduce || Number.isNaN(to)) { el.textContent = Number(to).toLocaleString(lang, { minimumFractionDigits: dec, maximumFractionDigits: dec }); return; }
      const t0 = performance.now();
      const step = (now) => {
        const p = Math.min(1, (now - t0) / 1400);
        const v = to * (1 - (1 - p) ** 3);
        el.textContent = v.toLocaleString(lang, { minimumFractionDigits: dec, maximumFractionDigits: dec });
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    if (!('IntersectionObserver' in window)) { els.forEach(run); return; }
    const io = new IntersectionObserver((en) => en.forEach((x) => { if (x.isIntersecting) { run(x.target); io.unobserve(x.target); } }), { threshold: 0.4 });
    els.forEach((el) => io.observe(el));
  };

  /* ---------- Vidéo chargée au clic ---------- */
  document.addEventListener('click', (e) => {
    const f = e.target.closest('[data-video-facade]');
    if (!f) return;
    e.preventDefault();
    const { provider, videoId } = f.dataset;
    const src = provider === 'vimeo'
      ? `https://player.vimeo.com/video/${videoId}?autoplay=1`
      : `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
    const iframe = document.createElement('iframe');
    iframe.src = src;
    iframe.title = f.getAttribute('aria-label') || 'Vidéo';
    iframe.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    iframe.allowFullscreen = true;
    f.replaceWith(iframe);
  });

  /* ---------- Diaporama ---------- */
  const slideshows = () => {
    $$('[data-slideshow]').forEach((s) => {
      if (!once(s, 'kSlides')) return;
      const track = $('[data-slideshow-track]', s);
      const slides = Array.from(track.children);
      const dots = $$('[data-slide-to]', s);
      const toggle = $('[data-slideshow-toggle]', s);
      let i = 0;
      const go = (n, smooth = true) => {
        i = (n + slides.length) % slides.length;
        track.scrollTo({ left: slides[i].offsetLeft - track.offsetLeft, behavior: smooth && !reduce ? 'smooth' : 'auto' });
      };
      const sync = () => {
        const n = Math.round(track.scrollLeft / Math.max(1, track.clientWidth));
        i = n;
        dots.forEach((d, k) => d.setAttribute('aria-current', String(k === n)));
        slides.forEach((sl, k) => sl.setAttribute('aria-hidden', String(k !== n)));
      };
      track.addEventListener('scroll', debounce(sync, 60), { passive: true });
      dots.forEach((d) => d.addEventListener('click', () => go(Number(d.dataset.slideTo))));
      $('[data-slide-prev]', s)?.addEventListener('click', () => go(i - 1));
      $('[data-slide-next]', s)?.addEventListener('click', () => go(i + 1));
      const delay = Number(s.dataset.autoplay) * 1000;
      let timer = null;
      let paused = reduce || !delay;
      const start = () => { clearInterval(timer); if (!paused && slides.length > 1) timer = setInterval(() => { if (!s.matches(':hover, :focus-within')) go(i + 1); }, delay); };
      if (toggle) {
        toggle.hidden = !delay;
        toggle.setAttribute('aria-pressed', String(paused));
        toggle.addEventListener('click', () => { paused = !paused; toggle.setAttribute('aria-pressed', String(paused)); start(); });
      }
      start();
      sync();
    });
  };

  /* ---------- Copier un code ---------- */
  document.addEventListener('click', async (e) => {
    const b = e.target.closest('[data-copy]');
    if (!b) return;
    try { await navigator.clipboard.writeText(b.dataset.copy); toast(t('copied', 'Code copié !')); b.classList.add('is-copied'); setTimeout(() => b.classList.remove('is-copied'), 1600); }
    catch (err) { window.prompt('', b.dataset.copy); }
  });

  /* ---------- Partage ---------- */
  document.addEventListener('click', async (e) => {
    const b = e.target.closest('[data-share]');
    if (!b) return;
    const data = { title: document.title, url: b.dataset.share || window.location.href };
    try {
      if (navigator.share) await navigator.share(data);
      else { await navigator.clipboard.writeText(data.url); toast(t('linkCopied', 'Lien copié')); }
    } catch (err) { /* annulé */ }
  });

  /* ---------- Estimation de livraison (jours ouvrés) ---------- */
  const delivery = () => {
    $$('[data-delivery]').forEach((el) => {
      if (!once(el, 'kDel')) return;
      const min = Number(el.dataset.min) || 2;
      const max = Number(el.dataset.max) || 4;
      const cutoff = Number(el.dataset.cutoff) || 14;
      const skip = (el.dataset.skip || '0,6').split(',').map(Number);
      const lang = document.documentElement.lang || 'fr';
      const add = (n) => {
        const d = new Date();
        if (d.getHours() >= cutoff) d.setDate(d.getDate() + 1);
        while (skip.includes(d.getDay())) d.setDate(d.getDate() + 1);
        let left = n;
        while (left > 0) { d.setDate(d.getDate() + 1); if (!skip.includes(d.getDay())) left -= 1; }
        return d.toLocaleDateString(lang, { weekday: 'long', day: 'numeric', month: 'long' });
      };
      const a = $('[data-delivery-min]', el); const b = $('[data-delivery-max]', el);
      if (a) a.textContent = add(min);
      if (b) b.textContent = add(max);
      const left = $('[data-delivery-cutoff]', el);
      if (left) {
        const now = new Date();
        const end = new Date(); end.setHours(cutoff, 0, 0, 0);
        const diff = end - now;
        if (diff > 0 && !skip.includes(now.getDay())) {
          const h = Math.floor(diff / 36e5); const m = Math.floor((diff % 36e5) / 6e4);
          left.textContent = `${h} h ${pad(m)}`;
          left.closest('[data-delivery-cutoff-wrap]').hidden = false;
        }
      }
    });
  };

  /* ---------- Pastilles de couleur des cartes ---------- */
  document.addEventListener('mouseover', (e) => {
    const sw = e.target.closest('[data-swatch-img]');
    if (sw) swap(sw);
  });
  document.addEventListener('click', (e) => {
    const sw = e.target.closest('[data-swatch-img]');
    if (sw) { e.preventDefault(); swap(sw); }
  });
  function swap(sw) {
    const card = sw.closest('[data-card]');
    const img = card && card.querySelector('.product-card__media img');
    if (!img || !sw.dataset.swatchImg) return;
    img.srcset = '';
    img.src = sw.dataset.swatchImg;
    $$('[data-swatch-img]', card).forEach((x) => x.setAttribute('aria-current', String(x === sw)));
    const link = card.querySelector('a[href*="/products/"]');
    if (link && sw.dataset.variantUrl) $$('a[href*="/products/"]', card).forEach((a) => { a.href = sw.dataset.variantUrl; });
  }

  /* ---------- Init ---------- */
  const init = () => {
    hoverMenus(); stickyHeader(); predictive(); wishlist.sync(); wishlistPage(); recentlyViewed(); popups();
    countdowns(); beforeAfter(); backToTop(); loadMore(); gridPref(); bundles(); qtyBreaks(); termsInit(); tabs(); counters();
    slideshows(); delivery();
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
  document.addEventListener('shopify:section:load', init);
  // Éditeur de thème : ouvre la pop-up / la vérification d'âge quand la section est sélectionnée
  document.addEventListener('shopify:section:select', (e) => { const d = e.target.querySelector('dialog[data-popup], dialog[data-age-gate]'); if (d) openDialog(d); });
  document.addEventListener('shopify:section:deselect', (e) => { const d = e.target.querySelector('dialog[data-popup], dialog[data-age-gate]'); if (d) closeDialog(d); });
  document.addEventListener('kinetic:content-added', () => { wishlist.sync(); countdowns(); });
  document.addEventListener('kinetic:cart-updated', () => { countdowns(); });
  K.wishlist = wishlist;
  K.openDialog = openDialog;
  window.Kinetic = K;
})();
