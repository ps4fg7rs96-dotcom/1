/* Kinetic — hero « éditeur en direct ». Vanilla JS, chargé uniquement par la section. */
(() => {
  'use strict';

  class LiveEditor {
    constructor(root) {
      this.root = root;
      this.section = root.closest('section');
      this.preview = root.querySelector('[data-ed-preview]');
      this.canvas = root.querySelector('[data-ed-canvas]');
      this.frame = root.querySelector('[data-ed-frame]');
      this.hover = root.querySelector('.ed__hover');
      this.label = root.querySelector('[data-ed-label]');
      this.nameEl = root.querySelector('[data-ed-name]');
      this.input = root.querySelector('[data-ed-input]');
      this.live = root.querySelector('[data-ed-live]');
      this.menu = root.querySelector('[data-ed-menu]');
      this.stores = this.json('[data-ed-stores]') || [];
      this.str = this.json('[data-ed-strings]') || {};
      this.arts = {};
      this.section.querySelectorAll('template[data-ed-arts]').forEach((tpl) => {
        tpl.content.querySelectorAll('[data-art]').forEach((n) => { this.arts[n.dataset.art] = n.innerHTML; });
      });
      this.base = this.canvas.innerHTML;
      this.storeIndex = 0;
      this.selected = null;
      this.uid = 0;
      this.history = [];
      this.future = [];
      this.aiIndex = 0;
      this.selectMode = true;
      this.reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      root.classList.add('is-select');
      this.bind();
      this.tagBlocks();
      this.applyStore(0, false);
      this.snapshot(true);
      this.select(this.canvas.querySelector('[data-field="title"]'), false);
    }

    json(sel) {
      const el = this.section.querySelector(sel);
      try { return el ? JSON.parse(el.textContent) : null; } catch (e) { return null; }
    }

    say(msg) { if (this.live) this.live.textContent = msg; }

    toast(msg) {
      if (window.Kinetic && typeof window.Kinetic.toast === 'function') window.Kinetic.toast(msg);
      else this.say(msg);
    }

    tagBlocks() {
      this.canvas.querySelectorAll('[data-block]').forEach((b) => { if (!b.dataset.uid) b.dataset.uid = `b${++this.uid}`; });
    }

    /* ---------- Événements ---------- */
    bind() {
      this.root.addEventListener('click', (e) => {
        const act = e.target.closest('[data-ed-action]');
        if (act && this.root.contains(act)) { this.action(act.dataset.edAction, act); return; }
        const pill = e.target.closest('[data-ed-store]');
        if (pill) { this.switchStore(Number(pill.dataset.edStore)); return; }
        const tag = e.target.closest('.pv__tag');
        if (tag) this.toggleTag(tag);
        const block = e.target.closest('[data-block]');
        if (block && this.canvas.contains(block) && this.selectMode) this.select(block);
        if (!e.target.closest('.ed__menu-wrap')) this.closeMenu();
      });

      // Survol (souris uniquement)
      this.canvas.addEventListener('pointerover', (e) => {
        if (e.pointerType !== 'mouse' || !this.selectMode) return;
        const b = e.target.closest('[data-block]');
        if (b && b !== this.selected) this.place(this.hover, b) || this.hover.classList.add('is-on');
        else this.hover.classList.remove('is-on');
      });
      this.canvas.addEventListener('pointerleave', () => this.hover.classList.remove('is-on'));

      // Clavier
      this.canvas.addEventListener('keydown', (e) => {
        const b = e.target.closest('[data-block]');
        if (b && (e.key === 'Enter' || e.key === ' ') && e.target === b) { e.preventDefault(); this.select(b); this.input.focus(); }
      });
      const pills = Array.from(this.root.querySelectorAll('[data-ed-store]'));
      pills.forEach((p, i) => p.addEventListener('keydown', (e) => {
        const dir = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
        if (!dir) return;
        e.preventDefault();
        const next = pills[(i + dir + pills.length) % pills.length];
        next.focus();
        this.switchStore(Number(next.dataset.edStore));
      }));
      this.root.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') this.closeMenu();
        const mod = e.metaKey || e.ctrlKey;
        if (mod && e.key.toLowerCase() === 'z' && !e.target.matches('textarea')) { e.preventDefault(); e.shiftKey ? this.redo() : this.undo(); }
      });

      // Édition en temps réel
      this.input.addEventListener('input', () => {
        const el = this.selected;
        if (!el || !this.isEditable(el)) return;
        const target = el.querySelector('[data-text]') || el;
        target.textContent = this.input.value;
        this.reposition();
        clearTimeout(this.typing);
        this.typing = setTimeout(() => this.snapshot(), 500);
      });

      window.addEventListener('resize', () => this.reposition());
      if ('ResizeObserver' in window) new ResizeObserver(() => this.reposition()).observe(this.canvas);
    }

    action(name, btn) {
      const el = this.selected;
      switch (name) {
        case 'select':
          this.selectMode = !this.selectMode;
          btn.classList.toggle('is-active', this.selectMode);
          btn.setAttribute('aria-pressed', String(this.selectMode));
          this.root.classList.toggle('is-select', this.selectMode);
          if (!this.selectMode) { this.frame.hidden = true; this.hover.classList.remove('is-on'); } else this.reposition();
          break;
        case 'layers':
        case 'outlines': {
          const on = this.root.classList.toggle('is-outlines');
          this.root.querySelector('[data-ed-action="layers"]').setAttribute('aria-pressed', String(on));
          this.closeMenu();
          break;
        }
        case 'undo': this.undo(); break;
        case 'redo': this.redo(); break;
        case 'menu': {
          const open = this.menu.hidden;
          this.menu.hidden = !open;
          btn.setAttribute('aria-expanded', String(open));
          if (open) this.menu.querySelector('button').focus();
          break;
        }
        case 'reset': this.closeMenu(); this.switchStore(this.storeIndex, true); break;
        case 'save': {
          btn.classList.add('is-saved');
          this.toast(this.str.saved);
          setTimeout(() => btn.classList.remove('is-saved'), 1600);
          break;
        }
        case 'duplicate':
          if (!el) return;
          {
            const clone = el.cloneNode(true);
            clone.dataset.uid = `b${++this.uid}`;
            clone.classList.remove('is-hidden-block');
            el.after(clone);
            this.snapshot();
            this.select(clone);
            this.toast(this.str.duplicated);
          }
          break;
        case 'hide':
          if (!el) return;
          el.classList.toggle('is-hidden-block');
          this.snapshot();
          this.toast(el.classList.contains('is-hidden-block') ? this.str.hidden : this.str.shown);
          break;
        case 'delete':
          if (!el) return;
          {
            const blocks = this.blocks();
            const idx = blocks.indexOf(el);
            el.remove();
            this.snapshot();
            const rest = this.blocks();
            this.select(rest[Math.min(idx, rest.length - 1)] || null);
            this.toast(this.str.deleted);
          }
          break;
        case 'add': {
          const p = document.createElement('p');
          p.className = 'pv__text';
          p.dataset.block = '';
          p.dataset.blockName = this.str.newTextName;
          p.dataset.editable = '';
          p.dataset.uid = `b${++this.uid}`;
          p.tabIndex = 0;
          p.textContent = this.str.newText;
          (el && el.closest('.pv__info') ? el : this.canvas.querySelector('.pv__title')).after(p);
          this.snapshot();
          this.select(p);
          this.input.focus();
          this.input.select();
          break;
        }
        case 'fill-group': {
          const group = btn.closest('[data-group]');
          const b = document.createElement('p');
          b.className = 'pv__badge-block';
          b.dataset.block = '';
          b.dataset.blockName = this.str.groupBlockName;
          b.dataset.editable = '';
          b.dataset.uid = `b${++this.uid}`;
          b.tabIndex = 0;
          b.innerHTML = '<span aria-hidden="true">🚚</span><span data-text></span>';
          b.querySelector('[data-text]').textContent = this.str.groupBlock;
          group.insertBefore(b, btn);
          this.snapshot();
          this.select(b);
          break;
        }
        case 'ai': {
          if (!el || !this.isEditable(el)) return this.toast(this.str.notEditable);
          const list = (this.stores[this.storeIndex] && this.stores[this.storeIndex].ai) || [];
          if (!list.length || !el.matches('[data-field="title"]')) return this.toast(this.str.comingSoon);
          const text = list[this.aiIndex++ % list.length].trim();
          this.typeInto(el, text);
          break;
        }
        case 'size':
          if (!el || !el.matches('.pv__title')) return this.toast(this.str.comingSoon);
          if (el.classList.contains('is-size-l')) { el.classList.replace('is-size-l', 'is-size-s'); }
          else if (el.classList.contains('is-size-s')) { el.classList.remove('is-size-s'); }
          else el.classList.add('is-size-l');
          this.snapshot(); this.reposition();
          break;
        case 'bold':
        case 'italic': {
          if (!el || !this.isEditable(el)) return this.toast(this.str.notEditable);
          const cls = name === 'bold' ? 'is-light' : 'is-italic';
          el.classList.toggle(cls);
          this.snapshot(); this.syncFormat();
          break;
        }
        default:
          this.toast(this.str.comingSoon);
      }
    }

    /* ---------- Sélection ---------- */
    blocks() { return Array.from(this.canvas.querySelectorAll('[data-block]')); }

    isEditable(el) { return el && el.hasAttribute('data-editable'); }

    select(el, announce = true) {
      this.selected = el;
      this.hover.classList.remove('is-on');
      if (!el) { this.frame.hidden = true; this.nameEl.textContent = '—'; this.input.value = ''; this.input.disabled = true; return; }
      this.frame.hidden = !this.selectMode;
      const name = el.dataset.blockName || '';
      this.label.textContent = name;
      this.nameEl.textContent = name;
      const editable = this.isEditable(el);
      this.input.disabled = !editable;
      this.input.value = editable ? (el.querySelector('[data-text]') || el).textContent.trim() : this.str.notEditable;
      this.syncFormat();
      this.reposition();
      if (announce) this.say(`${this.str.selected} ${name}`);
    }

    syncFormat() {
      const el = this.selected;
      const b = this.root.querySelector('[data-ed-action="bold"]');
      const i = this.root.querySelector('[data-ed-action="italic"]');
      if (b) b.setAttribute('aria-pressed', String(!!el && !el.classList.contains('is-light') && this.isEditable(el)));
      if (i) i.setAttribute('aria-pressed', String(!!el && el.classList.contains('is-italic')));
    }

    place(box, el) {
      const p = this.preview.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      box.style.top = `${r.top - p.top - 3}px`;
      box.style.left = `${r.left - p.left - 3}px`;
      box.style.width = `${r.width + 6}px`;
      box.style.height = `${r.height + 6}px`;
    }

    reposition() {
      if (this.selected && this.selected.isConnected && this.selectMode) this.place(this.frame, this.selected);
    }

    typeInto(el, text) {
      const target = el.querySelector('[data-text]') || el;
      if (this.reduce) { target.textContent = text; this.input.value = text; this.reposition(); this.snapshot(); return; }
      let i = 0;
      clearInterval(this.typer);
      this.typer = setInterval(() => {
        i += 1;
        const part = text.slice(0, i);
        target.textContent = part;
        this.input.value = part;
        this.reposition();
        if (i >= text.length) { clearInterval(this.typer); this.snapshot(); }
      }, 22);
    }

    toggleTag(tag) {
      if (!this.selectMode || (this.selected && this.selected.matches('[data-field="tags"]'))) {
        this.canvas.querySelectorAll('.pv__tag').forEach((t) => {
          const on = t === tag;
          t.classList.toggle('is-featured', on);
          t.setAttribute('aria-pressed', String(on));
        });
      }
    }

    /* ---------- Boutiques ---------- */
    switchStore(index, force = false) {
      if (!this.stores[index] || (index === this.storeIndex && !force)) return;
      this.root.querySelectorAll('[data-ed-store]').forEach((p) => {
        const on = Number(p.dataset.edStore) === index;
        p.setAttribute('aria-checked', String(on));
        p.tabIndex = on ? 0 : -1;
      });
      const run = () => {
        this.canvas.innerHTML = this.base;
        this.tagBlocks();
        this.applyStore(index, true);
        this.history = [];
        this.future = [];
        this.snapshot(true);
        this.select(this.canvas.querySelector('[data-field="title"]'), false);
        this.canvas.classList.remove('is-switching');
        this.say(`${this.str.switched} ${this.stores[index].name}`);
      };
      if (this.reduce) run();
      else { this.canvas.classList.add('is-switching'); setTimeout(run, 180); }
    }

    applyStore(index, rebuild) {
      const s = this.stores[index];
      if (!s) return;
      this.storeIndex = index;
      this.aiIndex = 0;
      this.root.style.setProperty('--store-accent', s.accent);
      this.root.style.setProperty('--store-tint', s.tint);
      const set = (field, value) => this.canvas.querySelectorAll(`[data-field="${field}"]`).forEach((n) => {
        const t = n.querySelector('[data-text]') || n;
        t.textContent = value;
      });
      set('name', s.name);
      set('niche', s.niche);
      set('title', s.title);
      set('rating', s.rating);
      set('reviews', s.reviews);
      set('price', s.price);
      set('packaging', s.packaging);
      set('badge', s.badge);
      const doc = this.root.querySelector('[data-ed-doc]');
      if (doc) doc.textContent = s.name;
      if (!rebuild) return;
      const art = this.canvas.querySelector('[data-field="art"]');
      if (art) {
        art.style.setProperty('--art', s.accent);
        if (s.image) {
          art.innerHTML = '';
          const img = new Image();
          img.src = s.image;
          img.alt = s.title;
          img.loading = 'lazy';
          art.appendChild(img);
        } else art.innerHTML = this.arts[s.art] || this.arts.bottle || '';
      }
      const tags = this.canvas.querySelector('[data-field="tags"]');
      if (tags) {
        tags.innerHTML = '';
        (s.tags || []).forEach((raw) => {
          const t = raw.trim();
          if (!t) return;
          const li = document.createElement('li');
          const b = document.createElement('button');
          b.type = 'button';
          b.className = 'pv__tag';
          const on = t === (s.featured || '').trim();
          b.classList.toggle('is-featured', on);
          b.setAttribute('aria-pressed', String(on));
          b.textContent = t;
          li.appendChild(b);
          tags.appendChild(li);
        });
      }
    }

    /* ---------- Historique ---------- */
    snapshot(reset = false) {
      const html = this.canvas.innerHTML;
      if (!reset && this.history[this.history.length - 1] === html) return;
      this.history.push(html);
      if (this.history.length > 40) this.history.shift();
      if (!reset) this.future = [];
      this.syncHistory();
    }

    restore(html) {
      const uid = this.selected && this.selected.dataset.uid;
      this.canvas.innerHTML = html;
      this.select(this.canvas.querySelector(`[data-uid="${uid}"]`) || this.canvas.querySelector('[data-field="title"]'), false);
      this.syncHistory();
    }

    undo() {
      if (this.history.length < 2) return;
      this.future.push(this.history.pop());
      this.restore(this.history[this.history.length - 1]);
    }

    redo() {
      if (!this.future.length) return;
      const html = this.future.pop();
      this.history.push(html);
      this.restore(html);
    }

    syncHistory() {
      const u = this.root.querySelector('[data-ed-action="undo"]');
      const r = this.root.querySelector('[data-ed-action="redo"]');
      if (u) u.disabled = this.history.length < 2;
      if (r) r.disabled = !this.future.length;
    }

    closeMenu() {
      if (!this.menu || this.menu.hidden) return;
      this.menu.hidden = true;
      this.root.querySelector('[data-ed-action="menu"]').setAttribute('aria-expanded', 'false');
    }
  }

  const boot = (scope = document) => scope.querySelectorAll('[data-editor]').forEach((el) => {
    if (!el.__liveEditor) el.__liveEditor = new LiveEditor(el);
  });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => boot());
  else boot();
  document.addEventListener('shopify:section:load', (e) => boot(e.target));
})();
