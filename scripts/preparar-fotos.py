#!/usr/bin/env python3
"""Gera as versoes web das fotos a partir dos originais do iCloud.

Os originais tem 2800px de lado maior e de 0,9 a 4 MB cada, o que e peso de
arquivo de entrega, nao de pagina. Cada foto sai em duas medidas:

  grande/  lado maior 1800px, qualidade 82  -> lightbox
  media/   lado maior 1000px, qualidade 80  -> muro do hero e grade

Rodar de novo e barato: pula o que ja existe, a nao ser com --forcar.
"""
import sys
from pathlib import Path
from PIL import Image, ImageOps

ORIGEM = Path.home() / "Library/Mobile Documents/com~apple~CloudDocs/paulista landing"
DESTINO = Path(__file__).resolve().parent.parent / "public/fotos"

MEDIDAS = {"grande": (1800, 82), "media": (1000, 80)}

# nome do arquivo original -> nome curto usado no site
NOMES = {
    "Gus.Flashh_Ro_Analogica556.jpg": "an-banco",
    "Gus.Flashh_Ro_Analogica557.jpg": "an-luz",
    "Gus.Flashh_Ro_Analogica560.jpg": "an-livro",
    "Gus.Flashh_Ro_Analogica562.jpg": "an-camiseta",
    "Gus.Flashh_Ro_Analogica566.jpg": "an-banca",
    "Gus.Flashh_Ro_Analogica575.jpg": "an-rua",
    "GusFranco+Isa-12.jpg": "dg-neon",
    "GusFranco+Isa-14.jpg": "dg-roxo",
    "GusFranco+Isa-17.jpg": "dg-avenida",
    "GusFranco+Isa-18.jpg": "dg-vermelho",
    "GusFranco+IsaPB-28.jpg": "dg-pb",
    "IMG-20261107-WA0016.jpg": "gus-retrato",
}


def main() -> int:
    forcar = "--forcar" in sys.argv
    if not ORIGEM.is_dir():
        print(f"origem nao encontrada: {ORIGEM}")
        return 1

    for pasta in MEDIDAS:
        (DESTINO / pasta).mkdir(parents=True, exist_ok=True)

    proporcoes = {}
    for arquivo, curto in sorted(NOMES.items()):
        caminho = ORIGEM / arquivo
        if not caminho.is_file():
            print(f"  falta {arquivo}")
            continue

        # exif_transpose porque foto de celular guarda a rotacao no EXIF e o
        # navegador ja aplica: sem isso a proporcao gravada aqui sai trocada.
        with Image.open(caminho) as im:
            im = ImageOps.exif_transpose(im).convert("RGB")
            proporcoes[curto] = (im.width, im.height)
            for pasta, (lado, qualidade) in MEDIDAS.items():
                saida = DESTINO / pasta / f"{curto}.jpg"
                if saida.exists() and not forcar:
                    continue
                copia = im.copy()
                copia.thumbnail((lado, lado), Image.LANCZOS)
                copia.save(saida, "JPEG", quality=qualidade, optimize=True, progressive=True)
                print(f"  {pasta}/{curto}.jpg  {copia.width}x{copia.height}")

    print("\nproporcoes (largura/altura) para o site.ts:")
    for curto, (w, h) in sorted(proporcoes.items()):
        print(f"  {curto}: {w} / {h},   // {w/h:.3f}")

    total = sum(f.stat().st_size for f in DESTINO.rglob("*.jpg"))
    print(f"\ntotal em public/fotos: {total/1e6:.1f} MB")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
