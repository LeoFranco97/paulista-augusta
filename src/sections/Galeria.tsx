import { useEffect, useMemo, useState } from 'react'
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

/**
 * Decide em que coluna cada foto entra, procurando o arranjo que deixa a
 * coluna mais alta o mais baixa possível.
 *
 * A primeira versão disto era a gulosa de sempre, jogar cada foto na coluna
 * mais curta até ali. Ela trava num arranjo ruim: com estas onze fotos em
 * três colunas, fechava 4,03 / 3,70 / 4,87 de altura relativa, uns 440px de
 * diferença entre a coluna mais curta e a mais alta, bem em cima da frase de
 * fechamento. A busca exata fecha 4,52 / 4,04 / 4,03, o melhor que esse
 * conjunto permite em três (cinco fotos em pé contra seis deitadas não
 * dividem parelho), e derruba a diferença para uns 180px. Em duas colunas,
 * que é o caso do celular, ela zera: 6,298 contra 6,296.
 *
 * Buscar tudo cabe no orçamento: são onze fotos e no máximo três colunas. A
 * quebra de simetria abaixo, que só deixa a foto i abrir uma coluna nova por
 * vez, tira as permutações repetidas e de quebra garante que a primeira
 * fileira leia na ordem da curadoria, da esquerda para a direita. A poda corta
 * o ramo assim que uma coluna passa da melhor altura já encontrada.
 */
function distribuir(quadros: Quadro[], colunas: number) {
  // Altura de cada foto numa coluna de largura 1, mais uma sobra fixa para a
  // legenda embaixo, que também ocupa espaço.
  const alturas = quadros.map((q) => 1 / q.prop + 0.12)

  const plano = new Array<number>(quadros.length).fill(0)
  const melhorPlano = new Array<number>(quadros.length).fill(0)
  const soma = new Array<number>(colunas).fill(0)
  let melhorMax = Infinity
  let abertas = 0

  const passo = (i: number) => {
    if (i === quadros.length) {
      const maior = Math.max(...soma)
      if (maior < melhorMax) {
        melhorMax = maior
        for (let k = 0; k < plano.length; k++) melhorPlano[k] = plano[k]
      }
      return
    }

    const limite = Math.min(colunas, abertas + 1)
    for (let c = 0; c < limite; c++) {
      if (soma[c] + alturas[i] >= melhorMax) continue // já perdeu, nem desce
      const novaColuna = c === abertas
      soma[c] += alturas[i]
      plano[i] = c
      if (novaColuna) abertas += 1
      passo(i + 1)
      if (novaColuna) abertas -= 1
      soma[c] -= alturas[i]
    }
  }

  passo(0)

  const pilhas: { quadro: Quadro; indice: number }[][] = Array.from({ length: colunas }, () => [])
  quadros.forEach((quadro, indice) => pilhas[melhorPlano[indice]].push({ quadro, indice }))
  return pilhas
}

export default function Galeria() {
  const { abrir } = useLightbox()
  const colunas = useColunas()
  // A busca só precisa rodar quando o número de colunas muda, não a cada
  // render: o acervo é fixo.
  const pilhas = useMemo(() => distribuir(galeria, colunas), [colunas])

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
