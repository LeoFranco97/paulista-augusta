import { useEffect, useState } from 'react'
import FadeIn from '../components/FadeIn'
import { useLightbox } from '../components/Lightbox'
import { foto, galeria } from '../data/site'
import type { Quadro } from '../data/site'

/**
 * As onze fotos, em mosaico.
 *
 * Nada de cortar todo mundo num quadrado: há arquivo em pé e deitado no mesmo
 * conjunto, e recortar o quadro de um fotógrafo para caber na célula é
 * justamente o que não se faz. Cada foto entra na altura que tem.
 *
 * A distribuição é feita aqui e não com `column-count`. Colunas do CSS
 * equilibram como dá, mas não partem um item: com onze fotos de alturas bem
 * diferentes em duas colunas, a da esquerda fechava uns 300px antes da outra
 * e o pé da seção ficava serrilhado. Como a proporção de cada arquivo já está
 * no site.ts, dá para distribuir na mão, sempre jogando a próxima foto na
 * coluna mais curta até ali. É o mesmo algoritmo guloso de sempre, e com onze
 * itens ele fecha parelho.
 */

/** Quantas colunas, por largura de tela. */
function useColunas() {
  const [n, setN] = useState(() => (typeof window === 'undefined' ? 2 : largura(window.innerWidth)))

  useEffect(() => {
    const ler = () => setN(largura(window.innerWidth))
    ler()
    window.addEventListener('resize', ler)
    return () => window.removeEventListener('resize', ler)
  }, [])

  return n
}

function largura(l: number) {
  if (l >= 1024) return 3
  return 2
}

/** Joga cada foto na coluna mais baixa até o momento. */
function distribuir(quadros: Quadro[], colunas: number) {
  const pilhas: { quadro: Quadro; indice: number }[][] = Array.from({ length: colunas }, () => [])
  const alturas = new Array(colunas).fill(0)

  quadros.forEach((quadro, indice) => {
    // Altura relativa a uma coluna de largura 1, mais uma sobra fixa para a
    // legenda embaixo da foto, que também ocupa espaço na conta.
    const altura = 1 / quadro.prop + 0.12
    const menor = alturas.indexOf(Math.min(...alturas))
    pilhas[menor].push({ quadro, indice })
    alturas[menor] += altura
  })

  return pilhas
}

export default function Galeria() {
  const { abrir } = useLightbox()
  const colunas = useColunas()
  const pilhas = distribuir(galeria, colunas)

  return (
    <section id="galeria" className="bg-[#0C0C0C] px-5 py-20 sm:px-8 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <FadeIn delay={0} y={40}>
          <h2
            className="titulo-gradiente text-center font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(2.6rem, 11vw, 150px)' }}
          >
            As fotos
          </h2>
        </FadeIn>

        <FadeIn delay={0.1} y={20}>
          <p className="mx-auto mt-6 max-w-2xl text-center text-sm font-light leading-relaxed text-[#D7E2EA]/55 sm:text-base">
            Quadros de experiências que já aconteceram por ali, no filme e no
            digital. Abra qualquer uma para ver em tela cheia.
          </p>
        </FadeIn>

        <div className="mt-12 flex gap-3 sm:mt-16 md:gap-4">
          {pilhas.map((pilha, c) => (
            <div key={c} className="flex min-w-0 flex-1 flex-col gap-3 md:gap-4">
              {pilha.map(({ quadro, indice }) => (
                <button
                  key={quadro.nome}
                  type="button"
                  onClick={() => abrir(galeria, 'Paulista & Augusta', indice)}
                  className="group block w-full cursor-zoom-in text-left"
                  aria-label={`Abrir: ${quadro.legenda}`}
                >
                  <img
                    src={foto(quadro.nome)}
                    alt={quadro.legenda}
                    loading="lazy"
                    decoding="async"
                    className="block h-auto w-full bg-white/[0.04] object-cover transition-opacity duration-300 group-hover:opacity-80"
                    style={{ aspectRatio: String(quadro.prop), borderRadius: 2 }}
                  />
                  <span className="mt-2 block text-[0.68rem] font-light leading-snug text-[#D7E2EA]/40 sm:text-xs">
                    {quadro.legenda}
                  </span>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
