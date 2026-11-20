import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { foto } from '../data/site'
import type { Quadro } from '../data/site'

/**
 * Visor em tela cheia, herdado do site do Gus e enxugado: aqui são onze
 * fotos, então não precisa da faixa de miniaturas com janela deslizante nem
 * da linha de EXIF que aquele usa nos ensaios de cem quadros.
 */

type Estado = { fotos: Quadro[]; titulo: string; indice: number } | null

type Api = { abrir: (fotos: Quadro[], titulo: string, indice?: number) => void }

const Ctx = createContext<Api>({ abrir: () => {} })

export const useLightbox = () => useContext(Ctx)

export function LightboxProvider({ children }: { children: ReactNode }) {
  const [estado, setEstado] = useState<Estado>(null)

  const abrir = useCallback((fotos: Quadro[], titulo: string, indice = 0) => {
    if (fotos.length) setEstado({ fotos, titulo, indice })
  }, [])
  const fechar = useCallback(() => setEstado(null), [])
  const andar = useCallback(
    (passo: number) =>
      setEstado((e) =>
        e ? { ...e, indice: (e.indice + passo + e.fotos.length) % e.fotos.length } : e,
      ),
    [],
  )

  // Trava o scroll do fundo e liga o teclado enquanto está aberto.
  useEffect(() => {
    if (!estado) return
    const antes = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const tecla = (e: KeyboardEvent) => {
      if (e.key === 'Escape') fechar()
      else if (e.key === 'ArrowRight') andar(1)
      else if (e.key === 'ArrowLeft') andar(-1)
    }
    window.addEventListener('keydown', tecla)
    return () => {
      document.body.style.overflow = antes
      window.removeEventListener('keydown', tecla)
    }
  }, [estado, fechar, andar])

  return (
    <Ctx.Provider value={{ abrir }}>
      {children}
      {estado &&
        createPortal(<Visor estado={estado} fechar={fechar} andar={andar} />, document.body)}
    </Ctx.Provider>
  )
}

function Visor({
  estado,
  fechar,
  andar,
}: {
  estado: NonNullable<Estado>
  fechar: () => void
  andar: (p: number) => void
}) {
  const { fotos, indice } = estado
  const varias = fotos.length > 1
  const atual = fotos[indice]

  // Carrega as vizinhas antes de a pessoa clicar na seta, senão cada passo
  // espera uma requisição fria.
  useEffect(() => {
    for (const passo of [1, -1]) {
      const vizinha = fotos[(indice + passo + fotos.length) % fotos.length]
      if (!vizinha) continue
      const im = new Image()
      im.src = foto(vizinha.nome, 'grande')
    }
  }, [indice, fotos])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={estado.titulo}
      onClick={fechar}
      className="fixed inset-0 z-[120] flex flex-col bg-[#0C0C0C]"
      style={{ animation: 'lb-fade 0.2s ease-out' }}
    >
      <style>{`@keyframes lb-fade{from{opacity:0}to{opacity:1}}`}</style>

      <div className="flex shrink-0 items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <div className="flex min-w-0 items-baseline gap-3">
          <span className="truncate text-sm font-medium uppercase tracking-widest text-[#D7E2EA] sm:text-base">
            {estado.titulo}
          </span>
          {varias && (
            <span className="shrink-0 text-xs font-light tracking-wider text-[#D7E2EA]/50">
              {indice + 1} / {fotos.length}
            </span>
          )}
        </div>
        <button
          onClick={fechar}
          aria-label="Fechar"
          className="shrink-0 rounded-full border border-[#D7E2EA]/25 p-2 text-[#D7E2EA] transition-colors hover:bg-[#D7E2EA]/10"
        >
          <X size={18} strokeWidth={1.75} />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden px-4 sm:px-16">
        {varias && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              andar(-1)
            }}
            aria-label="Anterior"
            className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-[#D7E2EA]/25 bg-[#0C0C0C]/60 p-2.5 text-[#D7E2EA] transition-colors hover:bg-[#D7E2EA]/10 sm:left-5"
          >
            <ChevronLeft size={22} strokeWidth={1.75} />
          </button>
        )}

        <img
          key={atual.nome}
          src={foto(atual.nome, 'grande')}
          alt={atual.legenda}
          onClick={(e) => e.stopPropagation()}
          className="max-h-full w-auto max-w-full rounded-sm object-contain shadow-2xl"
          style={{ animation: 'lb-fade 0.25s ease-out' }}
        />

        {varias && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              andar(1)
            }}
            aria-label="Próxima"
            className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-[#D7E2EA]/25 bg-[#0C0C0C]/60 p-2.5 text-[#D7E2EA] transition-colors hover:bg-[#D7E2EA]/10 sm:right-5"
          >
            <ChevronRight size={22} strokeWidth={1.75} />
          </button>
        )}
      </div>

      <p
        onClick={(e) => e.stopPropagation()}
        className="shrink-0 px-5 pb-6 pt-4 text-center text-xs font-light leading-relaxed text-[#D7E2EA]/70 sm:px-8 sm:text-sm"
      >
        {atual.legenda}
      </p>
    </div>
  )
}
