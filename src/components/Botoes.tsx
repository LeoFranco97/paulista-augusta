import Magnet from './Magnet'
import { perfil } from '../data/site'

type BotaoProps = {
  href?: string
  rotulo?: string
  className?: string
}

/**
 * Pílula de gradiente quente, a chamada principal.
 *
 * A paleta sai das próprias fotos: o âmbar do vazamento de luz no filme
 * caindo no verde-petróleo do neon da Augusta. O ímã no cursor é afordância
 * conhecida e aqui é alvo de verdade. Puxão reto, sem inclinação, porque
 * pílula cortada em perspectiva lê como defeito.
 *
 * Vai direto para o WhatsApp com a mensagem já escrita: a pessoa que clica
 * aqui já leu a página inteira, não deve ter que redigir a abordagem.
 */
export function BotaoWhats({
  href = perfil.whatsappUrl,
  rotulo = 'Quero marcar',
  className = '',
}: BotaoProps) {
  return (
    <Magnet className="inline-block" padding={70} strength={5} tilt={0}>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={`inline-block shrink-0 rounded-full px-8 py-3 text-xs font-medium uppercase tracking-widest text-white transition-transform duration-200 hover:scale-105 sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base ${className}`}
        style={{
          background:
            'linear-gradient(123deg, #1A1208 7%, #C2763A 37%, #8C5A2B 70%, #2E4A52 100%)',
          boxShadow: '0px 4px 4px rgba(194, 118, 58, 0.25), 4px 4px 12px #8C5A2B inset',
          outline: '2px solid #fff',
          outlineOffset: '-3px',
        }}
      >
        {rotulo}
      </a>
    </Magnet>
  )
}

type FantasmaProps = {
  href?: string
  rotulo?: string
  className?: string
  onClick?: () => void
}

/** Pílula vazada, a ação secundária. */
export function BotaoVazado({
  href,
  rotulo = 'Ver',
  className = '',
  onClick,
}: FantasmaProps) {
  const cls = `inline-block shrink-0 rounded-full border-2 border-[#D7E2EA] px-8 py-3 text-xs font-medium uppercase tracking-widest text-[#D7E2EA] transition-colors duration-200 hover:bg-[#D7E2EA]/10 sm:px-10 sm:py-3.5 sm:text-sm ${className}`

  if (onClick || !href) {
    return (
      <button type="button" onClick={onClick} className={cls}>
        {rotulo}
      </button>
    )
  }

  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noreferrer' : undefined}
      className={cls}
    >
      {rotulo}
    </a>
  )
}
