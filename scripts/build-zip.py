#!/usr/bin/env python3
"""Crée theme.zip : contenu de theme/ à la RACINE du zip (layout/, sections/…), prêt à importer dans Shopify."""
import os, zipfile, json
ROOT = os.path.join(os.path.dirname(__file__), '..')
SRC = os.path.join(ROOT, 'theme')
OUT = os.path.join(ROOT, 'theme.zip')
DIRS = ['assets', 'blocks', 'config', 'layout', 'locales', 'sections', 'snippets', 'templates']
if os.path.exists(OUT): os.remove(OUT)
with zipfile.ZipFile(OUT, 'w', zipfile.ZIP_DEFLATED, compresslevel=9) as z:
    for d in DIRS:
        for base, _, files in os.walk(os.path.join(SRC, d)):
            for f in sorted(files):
                if f.startswith('.'): continue
                full = os.path.join(base, f)
                z.write(full, os.path.relpath(full, SRC))
# Vérification
with zipfile.ZipFile(OUT) as z:
    names = z.namelist()
    assert z.testzip() is None
    tops = sorted({n.split('/')[0] for n in names})
    assert tops == DIRS, tops
    for required in ['layout/theme.liquid', 'config/settings_schema.json', 'config/settings_data.json', 'locales/fr.default.json', 'templates/index.json']:
        assert required in names, required
    for n in names:
        if n.endswith('.json'): json.loads(z.read(n))
print(f'theme.zip : {len(names)} fichiers, {os.path.getsize(OUT)//1024} Ko, dossiers racine = {tops}')
