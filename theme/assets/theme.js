/* Kinetic — theme.js (vanilla, sans dépendance). Chargé en defer. */
(() => {
  'use strict';
  const K = window.Kinetic || { routes: { root: '/', cart: '/cart', cartAdd: '/cart/add', cartChange: '/cart/change' }, strings: {} };
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Toast ---------- */
  let toastTimer;
  K.toast = (msg) => {
    const t = $('[data-toast]');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('is-visible'), 2600);
  };

  /* ---------- Mode clair / sombre ---------- */
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-mode-toggle]');
    if (!btn) return;
    const dark = document.documentElement.classList.toggle('dark');
    try { localStorage.setItem('kinetic-mode', dark ? 'dark' : 'light'); } catch (_) {}
    btn.setAttribute('aria-pressed', String(dark));
  });

  /* ---------- Apparition au scroll ---------- */
  const reveal = () => {
    const els = $$('[data-reveal]:not(.is-visible)');
    if (!('IntersectionObserver' in window) || reduceMotion) return els.forEach((el) => el.classList.add('is-visible'));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    els.forEach((el) => io.observe(el));
  };

  /* ---------- En-tête ---------- */
  const header = () => {
    const wrap = $('[data-header]');
    if (wrap) {
      const onScroll = () => wrap.classList.toggle('is-scrolled', window.scrollY > 8);
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }
    // Ferme menus <details> : Échap et clic extérieur
    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      $$('details[open][data-dismissable]').forEach((d) => { d.open = false; d.querySelector('summary')?.focus(); });
      closeDrawer();
      closeSearch();
    });
    document.addEventListener('click', (e) => {
      $$('details[open][data-dismissable]').forEach((d) => { if (!d.contains(e.target)) d.open = false; });
    });
    // Menu mobile : panneau plein écran sous l'en-tête (l'en-tête perd son flou pour ne pas piéger le position:fixed)
    $$('.menu-drawer').forEach((d) => d.addEventListener('toggle', () => {
      const w = d.closest('[data-header]');
      if (w) {
        w.classList.toggle('is-menu-open', d.open);
        document.documentElement.style.setProperty('--header-bottom', `${Math.max(0, w.getBoundingClientRect().bottom)}px`);
      }
      document.body.style.overflow = d.open ? 'hidden' : '';
    }));
  };

  /* ---------- Recherche (modale) ---------- */
  const searchModal = () => $('[data-search-modal]');
  function closeSearch() { const m = searchModal(); if (m && !m.hidden) { m.hidden = true; $('[data-search-open]')?.focus(); } }
  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-search-open]')) {
      const m = searchModal();
      if (!m) return;
      e.preventDefault();
      m.hidden = false;
      m.querySelector('input')?.focus();
    } else if (e.target.matches('[data-search-modal]') || e.target.closest('[data-search-close]')) closeSearch();
  });

  /* ---------- Annonces rotatives ---------- */
  const announcements = () => {
    $$('[data-slides]').forEach((wrap) => {
      const slides = $$('.announcement__slide', wrap);
      if (slides.length < 2 || reduceMotion) return;
      let i = 0;
      setInterval(() => {
        if (wrap.matches(':hover, :focus-within')) return;
        slides[i].classList.remove('is-active');
        i = (i + 1) % slides.length;
        slides[i].classList.add('is-active');
      }, Number(wrap.dataset.slides) || 5000);
    });
  };

  /* ---------- Panier ---------- */
  let lastFocus = null;
  const drawer = () => $('[data-cart-drawer]');
  function openDrawer() {
    const d = drawer();
    if (!d) return false;
    lastFocus = document.activeElement;
    d.hidden = false;
    requestAnimationFrame(() => d.classList.add('is-open'));
    document.body.style.overflow = 'hidden';
    setTimeout(() => $('.drawer__panel', d)?.focus(), 50);
    return true;
  }
  function closeDrawer() {
    const d = drawer();
    if (!d || d.hidden) return;
    d.classList.remove('is-open');
    document.body.style.overflow = '';
    setTimeout(() => { d.hidden = true; lastFocus?.focus?.(); }, reduceMotion ? 0 : 320);
  }
  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-drawer-close]')) closeDrawer();
    const trigger = e.target.closest('[data-cart-open]');
    if (trigger && K.cartType === 'drawer' && drawer()) { e.preventDefault(); openDrawer(); }
  });
  // Piège de focus minimal dans le tiroir
  document.addEventListener('keydown', (e) => {
    const d = drawer();
    if (e.key !== 'Tab' || !d || d.hidden) return;
    const f = $$('a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])', d).filter((el) => el.offsetParent !== null);
    if (!f.length) return;
    if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
    else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
  });

  async function refreshCart(cartJson) {
    const cart = cartJson || (await (await fetch(`${K.routes.cart}.js`)).json());
    $$('[data-cart-count]').forEach((el) => { el.textContent = cart.item_count; el.dataset.count = cart.item_count; });
    const d = drawer();
    if (d) {
      const res = await fetch(`${K.routes.root}?sections=cart-drawer`);
      const json = await res.json();
      const html = new DOMParser().parseFromString(json['cart-drawer'], 'text/html');
      const next = $('[data-cart-drawer-inner]', html);
      const cur = $('[data-cart-drawer-inner]', d);
      if (next && cur) cur.replaceWith(next);
    }
    document.dispatchEvent(new CustomEvent('kinetic:cart-updated', { detail: cart }));
    return cart;
  }

  document.addEventListener('submit', async (e) => {
    const form = e.target.closest('form[data-cart-form]');
    if (!form || K.cartType !== 'drawer' || !drawer()) return;
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    btn?.classList.add('is-loading');
    btn?.setAttribute('aria-disabled', 'true');
    try {
      const res = await fetch(`${K.routes.cartAdd}.js`, { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.description || data.message);
      await refreshCart();
      document.dispatchEvent(new CustomEvent('kinetic:added'));
      openDrawer();
    } catch (err) {
      K.toast(err.message || K.strings.error);
    } finally {
      btn?.classList.remove('is-loading');
      btn?.removeAttribute('aria-disabled');
    }
  });

  document.addEventListener('click', async (e) => {
    const btn = e.target.closest('[data-qty-change]');
    if (!btn || !btn.closest('[data-cart-drawer]')) return;
    const inner = btn.closest('[data-cart-drawer-inner]');
    inner?.classList.add('is-updating');
    try {
      const res = await fetch(`${K.routes.cartChange}.js`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ line: Number(btn.dataset.line), quantity: Number(btn.dataset.qtyChange) }),
      });
      const cart = await res.json();
      if (!res.ok) throw new Error(cart.description);
      await refreshCart(cart);
    } catch (err) {
      K.toast(err.message || K.strings.error);
      inner?.classList.remove('is-updating');
    }
  });

  /* ---------- Quantité (+/−) ---------- */
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-qty-step]');
    if (!b) return;
    const input = b.closest('.qty')?.querySelector('input');
    if (!input) return;
    const min = Number(input.min) || 0;
    input.value = Math.max(min, (Number(input.value) || 0) + Number(b.dataset.qtyStep));
    input.dispatchEvent(new Event('change', { bubbles: true }));
  });

  /* ---------- Fiche produit : variantes, médias, ATC collant ---------- */
  const initProduct = (root) => {
    if (!root || root.dataset.kProduct) return;
    root.dataset.kProduct = '1';
    {
      const data = JSON.parse($('[data-product-json]', root)?.textContent || '{}');
      const variants = data.variants || [];
      const idInput = $('input[name="id"]', root);
      const priceEl = $('[data-price-target]', root);
      const addBtn = $('[data-add-btn]', root);
      const inModal = !!root.closest('dialog');
      const stickyPrice = inModal ? null : $('[data-sticky-price]');
      const stickyBtn = inModal ? null : $('[data-sticky-btn]');

      const groups = () => $$('[data-option]', root);
      const selected = () => groups().map((g) => { const sel = $('select', g); return sel ? sel.value : ($('input:checked', g) || {}).value; });
      const update = () => {
        const opts = selected();
        const v = variants.find((x) => x.options.every((o, i) => o === opts[i]));
        groups().forEach((fs, idx) => { const m = $('legend .muted', fs); if (m) m.textContent = opts[idx] || ''; });
        // Disponibilité des valeurs (boutons barrés, options de liste annotées)
        groups().forEach((fs, idx) => {
          $$('input, option', fs).forEach((inp) => {
            const test = opts.slice(); test[idx] = inp.value;
            const ok = variants.some((x) => x.available && x.options.every((o, i) => o === test[i]));
            inp.classList.toggle('is-unavailable', !ok);
            if (inp.tagName === 'OPTION') inp.textContent = ok ? inp.value : `${inp.value} — ${K.strings.soldOut}`;
          });
        });
        const sku = $('[data-sku]', root);
        if (sku && v) { sku.textContent = v.sku || ''; sku.parentElement.hidden = !v.sku; }
        const stock = $('[data-stock]', root);
        if (stock && v) {
          const low = Number(stock.dataset.threshold) || 5;
          const q = v.inventory;
          const state = !v.available ? 'out' : q === null ? 'in' : q <= low ? 'low' : 'in';
          stock.dataset.state = state;
          const label = $(`[data-stock-label="${state}"]`, stock);
          $$('[data-stock-label]', stock).forEach((l) => { l.hidden = l !== label; });
          const n = $('[data-stock-count]', label || stock);
          if (n && q !== null) n.textContent = q;
          const bar = $('[data-stock-bar]', stock);
          if (bar && q !== null) bar.style.setProperty('--level', `${Math.min(100, Math.max(6, (q / (low * 4)) * 100))}%`);
        }
        $$('[data-variant-only]', root).forEach((el) => { el.hidden = !v || (el.dataset.variantOnly === 'sold-out' ? v.available : !v.available); });
        $$('input[name="variant_id"][data-variant-input]', root).forEach((i) => { if (v) i.value = v.id; });
        root.dispatchEvent(new CustomEvent('kinetic:variant-change', { bubbles: true, detail: v }));
        if (!v) {
          if (addBtn) { addBtn.disabled = true; addBtn.querySelector('span').textContent = K.strings.unavailable; }
          return;
        }
        idInput.value = v.id;
        if (priceEl && data.prices) {
          const p = data.prices[v.id];
          if (p) { priceEl.innerHTML = p; if (stickyPrice) stickyPrice.innerHTML = p; }
        }
        const label = v.available ? K.strings.addToCart : K.strings.soldOut;
        [addBtn, stickyBtn].forEach((b) => { if (b) { b.disabled = !v.available; const s = b.querySelector('span'); if (s) s.textContent = label; } });
        if (v.featured_media_id) showMedia(root, String(v.featured_media_id));
        const url = new URL(window.location.href);
        url.searchParams.set('variant', v.id);
        window.history.replaceState({}, '', url);
      };
      root.addEventListener('change', (e) => { if (e.target.closest('[data-option]')) update(); });

      $$('[data-thumb]', root).forEach((t) => t.addEventListener('click', () => showMedia(root, t.dataset.thumb)));

      // Barre d'achat collante (mobile)
      const sticky = inModal ? null : $('[data-sticky-atc]');
      if (sticky && addBtn && 'IntersectionObserver' in window) {
        new IntersectionObserver(([en]) => {
          const show = !en.isIntersecting && en.boundingClientRect.top < 0;
          sticky.classList.toggle('is-visible', show);
          sticky.setAttribute('aria-hidden', String(!show));
          sticky.inert = !show;
        }).observe(addBtn);
        stickyBtn?.addEventListener('click', () => addBtn.click());
      }
    }
  };
  const productForms = () => $$('[data-product]').forEach(initProduct);
  function showMedia(root, id) {
    const target = $(`[data-media-id="${id}"]`, root);
    if (!target) return;
    $$('[data-media-id]', root).forEach((m) => m.classList.toggle('is-active', m === target));
    $$('[data-thumb]', root).forEach((t) => t.setAttribute('aria-current', String(t.dataset.thumb === id)));
    const track = target.parentElement;
    if (track && track.scrollWidth > track.clientWidth + 4) track.scrollTo({ left: target.offsetLeft - track.offsetLeft, behavior: reduceMotion ? 'auto' : 'smooth' });
    else if (target.closest('.product__gallery--grid, .product__gallery--stack') && window.innerWidth >= 990) target.scrollIntoView({ block: 'nearest', behavior: reduceMotion ? 'auto' : 'smooth' });
  }
  // Carrousel mobile : synchronise les vignettes avec le défilement
  document.addEventListener('scroll', (e) => {
    const track = e.target;
    if (!track.matches || !track.matches('[data-gallery-track]')) return;
    clearTimeout(track._t);
    track._t = setTimeout(() => {
      const items = $$('[data-media-id]', track);
      const i = Math.round(track.scrollLeft / Math.max(1, track.clientWidth));
      const it = items[i];
      if (!it) return;
      const g = track.closest('.product__gallery');
      $$('[data-thumb]', g).forEach((t) => t.setAttribute('aria-current', String(t.dataset.thumb === it.dataset.mediaId)));
    }, 80);
  }, true);

  /* ---------- Carrousels (scroll-snap) ---------- */
  const carousels = () => {
    $$('[data-carousel]').forEach((c) => {
      const track = $('[data-carousel-track]', c);
      const prev = $('[data-carousel-prev]', c);
      const next = $('[data-carousel-next]', c);
      if (!track) return;
      const sync = () => {
        if (prev) prev.disabled = track.scrollLeft <= 4;
        if (next) next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
      };
      const step = (dir) => {
        const slide = track.firstElementChild;
        const w = slide ? slide.getBoundingClientRect().width + 20 : track.clientWidth;
        track.scrollBy({ left: dir * w, behavior: reduceMotion ? 'auto' : 'smooth' });
      };
      prev?.addEventListener('click', () => step(-1));
      next?.addEventListener('click', () => step(1));
      track.addEventListener('scroll', sync, { passive: true });
      window.addEventListener('resize', sync);
      sync();
    });
  };

  /* ---------- Filtres de collection : envoi automatique ---------- */
  document.addEventListener('change', (e) => {
    const form = e.target.closest('form[data-auto-submit]');
    if (form && !e.target.matches('input[type="number"]')) form.requestSubmit ? form.requestSubmit() : form.submit();
  });

  /* ---------- Init ---------- */
  const init = () => { reveal(); header(); announcements(); productForms(); carousels(); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
  document.addEventListener('shopify:section:load', () => { reveal(); carousels(); announcements(); productForms(); });
  document.addEventListener('kinetic:content-added', reveal);
  K.openDrawer = openDrawer;
  K.initProduct = initProduct;
  K.refreshCart = refreshCart;
  window.Kinetic = K;
})();
