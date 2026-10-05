#!/usr/bin/env python3
"""Ajoute à chaque section les réglages communs « Palette » et « Espacement vertical »
(idempotent). Usage : python3 scripts/section-style.py [section ...]"""
import json, os, re, sys
S = os.path.join(os.path.dirname(__file__), '..', 'theme', 'sections')
SCHEMES = [("theme", "Thème"), ("alt", "Alternée"), ("tint", "Teintée"), ("dark", "Sombre"),
           ("primary", "Couleur primaire"), ("accent", "Couleur d'accent"), ("custom-1", "Personnalisée 1"), ("custom-2", "Personnalisée 2")]
PADS = [("none", "Aucun"), ("s", "Petit"), ("m", "Moyen"), ("l", "Grand"), ("xl", "Très grand")]

def settings(scheme="theme", pad="l"):
    return [
        {"type": "header", "content": "Mise en forme de la section"},
        {"type": "select", "id": "color_scheme", "label": "Palette de couleurs", "options": [{"value": v, "label": l} for v, l in SCHEMES], "default": scheme},
        {"type": "select", "id": "padding", "label": "Espacement vertical", "options": [{"value": v, "label": l} for v, l in PADS], "default": pad},
    ]

CLASS = "section scheme-{{ section.settings.color_scheme }} pad-{{ section.settings.padding }}"

def patch(name, force_scheme=None, force_pad=None):
    p = os.path.join(S, f"{name}.liquid")
    src = open(p, encoding="utf-8").read()
    m = re.search(r"\{%-?\s*schema\s*-?%\}([\s\S]*?)\{%-?\s*endschema\s*-?%\}", src)
    schema = json.loads(m.group(1))
    if any(s.get("id") == "color_scheme" for s in schema.get("settings", [])):
        return False
    head = re.search(r'<section class="(section[^"]*)"', src)
    scheme, pad = "theme", "l"
    if head and 'scheme-{{' in head.group(1):
        head = None
    if head:
        cls = head.group(1)
        if "section--alt" in cls: scheme = "alt"
        if "scheme-dark" in cls: scheme = "dark"
        if "section--tight" in cls: pad = "m"
        extra = " ".join(c for c in cls.split() if c not in ("section", "section--alt", "scheme-dark", "section--tight"))
        src = src.replace(head.group(0), f'<section class="{CLASS}{(" " + extra) if extra else ""}"', 1)
    scheme = force_scheme or scheme
    pad = force_pad or pad
    # Insère les réglages à la fin du tableau "settings" sans reformater le reste du schéma
    m = re.search(r"\{%-?\s*schema\s*-?%\}([\s\S]*?)\{%-?\s*endschema\s*-?%\}", src)
    body = m.group(1)
    add = ",\n    ".join(json.dumps(x, ensure_ascii=False) for x in settings(scheme, pad))
    i = body.index('"settings"')
    depth, j = 0, body.index('[', i)
    for k in range(j, len(body)):
        if body[k] == '[': depth += 1
        elif body[k] == ']':
            depth -= 1
            if depth == 0: break
    before = body[:k].rstrip()
    sep = "" if before.endswith("[") else ","
    body = before + sep + "\n    " + add + "\n  " + body[k:]
    json.loads(body)
    src = src[:m.start(1)] + body + src[m.end(1):]
    open(p, "w", encoding="utf-8").write(src)
    return True

if __name__ == "__main__":
    for arg in sys.argv[1:]:
        n, *rest = arg.split(":")
        print(n, "patched" if patch(n, *rest) else "already")
