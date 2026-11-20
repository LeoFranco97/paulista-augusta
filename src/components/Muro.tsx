import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { foto, muro } from '../data/site'
import type { Quadro } from '../data/site'

/**
 * O muro de fotos do topo, herdado do site do Gus.
 *
 * Colunas verticais em velocidade constante e direções alternadas. De
 * propósito NÃO preso ao scroll: movimento preso ao scroll treme e volta de
 * ré, e num topo isso lê como defeito.
 *
 * Duas coisas são medidas no elemento em vez de fixadas no código, porque
 * como número fixo as duas quebram à vista:
 *
 * 1. QUANTAS COLUNAS. Fixo em três, uma tela de 1440 dá célula de 476px e só
 *    cabe um quadro por coluna, o que lê como três fotos grandes e não como
 *    corpo de trabalho. A conta persegue uma largura de célula, então a
 *    célula fica entre 300 e 380px em qualquer tamanho.
 *
 * 2. QUANTAS CÓPIAS. A pista precisa de cópias suficientes para o laço nunca
 *    mostrar buraco. Duas só bastam enquanto um conjunto for mais alto que a
 *    janela, o que é falso numa coluna curta em tela alta. Com K cópias a
 *    pista anda exatamente um conjunto (100/K por cento), sobrando (K-1)
 *    cobrindo a janela, então K = teto(altura da janela / altura do conjunto)
 *    + 1 nunca deixa vão.
 *
 * Aqui são onze fotos, menos que as dezessete do site dele, então o muro
 * repete mais cedo. A distribuição em rodízio pelas colunas é o que segura:
 * cada coluna leva um subconjunto diferente, e a repetição de uma coluna
 * nunca coincide com a da vizinha.
 *
 * A calha é margem dentro da célula, não gap de flex. Com gap as cópias
 * diferiam de uma calha e o laço andava de fração de calha a cada volta.
 */

/** Calha, em px. */
const CALHA = 6

/** Canto, em px. Quase reto, para ler editorial e não template. */
const RAIO = 2

/** Largura de célula que o layout persegue. Define quantas colunas cabem. */
const CELULA_ALVO = 320

/** Velocidade, px por segundo. Devagar para dar tempo de ver. */
const VELOCIDADE = 54

const DURACAO_MIN = 25
const DURACAO_MAX = 40

/** Os quadros até este índice carregam adiantados: são o primeiro quadro. */
const PRIORIDADE = 4

type Medida = { l: number; a: number }

function medidaInicial(): Medida {
  if (typeof window === 'undefined') return { l: 1440, a: 600 }
  return { l: window.innerWidth, a: Math.max(320, window.innerHeight * 0.58) }
}

function useMedir<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [medida, setMedida] = useState<Medida>(medidaInicial)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    const ler = () => {
      const l = el.clientWidth
      const a = el.clientHeight
      if (l > 0 && a > 0) {
        setMedida((antes) => (antes.l === l && antes.a === a ? antes : { l, a }))
      }
    }

    ler()
    if (typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(ler)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return { ref, medida }
}

/** Pausa a animação com o topo fora da tela, para não compor à toa. */
function useNaTela(ref: React.RefObject<HTMLElement | null>) {
  const [visivel, setVisivel] = useState(true)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver((e) => setVisivel(e[0].isIntersecting), { threshold: 0 })
    io.observe(el)
    return () => io.disconnect()
  }, [ref])

  return visivel
}

/** Trava em grade de 32px para uma barra de rolagem não virar a conta. */
const arredondar = (v: number) => Math.round(v / 32) * 32

function quantasColunas(largura: number, altura: number) {
  if (largura <= 0) return 3
  // Celular leva duas. Uma faixa só, na altura do campo, mostra uns 60 por
  // cento de um quadro numa tela de 375px, o que é slide e não muro.
  if (largura < 768) return 2

  const l = arredondar(largura)
  const a = arredondar(altura)

  // Em campo baixo (um notebook 1280x720 deixa o muro com uns 360px) o alvo
  // só pela largura dá célula tão alta que mal cabe um quadro por coluna.
  const alvo = Math.max(160, Math.min(CELULA_ALVO, a * 0.62))
  return Math.min(6, Math.max(3, Math.round(l / alvo)))
}

function Celula({ quadro, indice }: { quadro: Quadro; indice: number }) {
  const adiantado = indice < PRIORIDADE

  return (
    <div className="w-full" style={{ marginBottom: CALHA }}>
      <img
        src={foto(quadro.nome)}
        alt=""
        aria-hidden
        draggable={false}
        loading={adiantado ? 'eager' : 'lazy'}
        fetchPriority={adiantado ? 'high' : 'auto'}
        decoding="async"
        className="block h-auto w-full select-none bg-white/[0.04] object-cover"
        style={{ aspectRatio: String(quadro.prop), borderRadius: RAIO }}
      />
    </div>
  )
}

export default function Muro() {
  const { ref, medida } = useMedir<HTMLDivElement>()
  const visivel = useNaTela(ref)
  const estado = visivel ? 'running' : 'paused'

  const colunas = quantasColunas(medida.l, medida.a)
  const larguraCelula = (medida.l - (colunas - 1) * CALHA) / colunas

  // Rodízio, para os quadros 0 a 3 caírem no topo das primeiras colunas: o
  // primeiro quadro da página é sempre o trecho mais forte da curadoria,
  // seja qual for o número de colunas que a tela acabar pedindo.
  const pistas = Array.from({ length: colunas }, (_, c) => muro.filter((_, i) => i % colunas === c))

  return (
    <div ref={ref} className="flex h-full w-full overflow-hidden" style={{ gap: CALHA }}>
      {pistas.map((itens, c) => {
        // Altura de um conjunto completo, calhas incluídas.
        const alturaConjunto = itens.reduce((acc, q) => acc + larguraCelula / q.prop + CALHA, 0)
        const copias =
          alturaConjunto > 0 ? Math.max(2, Math.ceil(medida.a / alturaConjunto) + 1) : 2

        // A velocidade cai em célula estreita e nunca sobe. O olho lê quadros
        // por segundo, não pixels por segundo.
        const velocidade = VELOCIDADE * Math.min(1, larguraCelula / 300)
        const bruta = alturaConjunto / velocidade
        const presa = Math.min(DURACAO_MAX, Math.max(DURACAO_MIN, bruta))
        // Defasagem por coluna, para elas nunca marcharem juntas.
        const duracao = Math.min(DURACAO_MAX, presa * (1 + (c % 4) * 0.06))

        return (
          <div key={c} className="relative h-full min-w-0 flex-1 overflow-hidden">
            <div
              className="muro-pista absolute inset-x-0 top-0 will-change-transform"
              style={
                {
                  animationName: c % 2 === 1 ? 'muro-desce' : 'muro-sobe',
                  animationDuration: `${duracao.toFixed(2)}s`,
                  animationPlayState: estado,
                  '--andar': `${(-100 / copias).toFixed(4)}%`,
                } as React.CSSProperties
              }
            >
              {Array.from({ length: copias }, (_, k) =>
                itens.map((q) => (
                  <Celula key={`${k}-${q.nome}`} quadro={q} indice={muro.indexOf(q)} />
                )),
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
