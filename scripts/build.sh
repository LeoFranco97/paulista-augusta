#!/usr/bin/env bash
# Gera as duas versões da página.
#
#   dist/     tabela 1  (analógica 450, digital 750, combo 1.200, instax 200)
#   dist/2/   tabela 2  (analógica 650, digital 880, combo 1.530, instax 300)
#
# São dois builds inteiros e independentes, cada um com sua própria cópia das
# fotos. Dá uns 9 MB somados, o que o GitHub Pages carrega sem reclamar, e
# evita o problema de uma versão apontar para os arquivos da outra: o JS de
# cada build tem o preço embutido, então os dois não podem dividir a mesma
# pasta de assets.
#
# A ordem importa: dist/2 fica dentro de dist, então o build da tabela 1 tem
# que rodar primeiro, senão ele apaga a pasta do outro ao limpar a saída.
set -euo pipefail
cd "$(dirname "$0")/.."

echo "==> tabela 1 -> dist/"
VITE_TABELA=1 npm run build

echo "==> tabela 2 -> dist/2/"
VITE_TABELA=2 npx vite build --outDir dist/2

touch dist/.nojekyll

echo
echo "Pronto."
echo "  dist/index.html    tabela 1"
echo "  dist/2/index.html  tabela 2"
du -sh dist 2>/dev/null || true
