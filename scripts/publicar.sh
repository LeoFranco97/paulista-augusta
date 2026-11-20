#!/usr/bin/env bash
# Publica as duas versões no GitHub Pages.
#
# O token do gh aqui não tem o escopo `workflow`, então em vez de um GitHub
# Action o deploy é o build local empurrado para o branch gh-pages. Para
# trocar por Action um dia: `gh auth refresh -s workflow` e depois um
# .github/workflows/deploy.yml comum.
set -euo pipefail
cd "$(dirname "$0")/.."

./scripts/build.sh

TMP=$(mktemp -d)
cp -R dist/. "$TMP/"
touch "$TMP/.nojekyll"

git worktree add --force /tmp/paulista-pages gh-pages 2>/dev/null \
  || git worktree add --force -b gh-pages /tmp/paulista-pages
rm -rf /tmp/paulista-pages/*
cp -R "$TMP/." /tmp/paulista-pages/
cd /tmp/paulista-pages
git add -A
git commit -q -m "Build $(date +%Y-%m-%d\ %H:%M)" || echo "nada mudou"
git push -q origin gh-pages
cd - >/dev/null
git worktree remove /tmp/paulista-pages --force
rm -rf "$TMP"

echo
echo "No ar:"
echo "  tabela 1: https://leofranco97.github.io/paulista-augusta/"
echo "  tabela 2: https://leofranco97.github.io/paulista-augusta/2/"
