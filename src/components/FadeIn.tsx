import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  delay?: number
  duration?: number
  x?: number
  y?: number
  className?: string
  style?: React.CSSProperties
}

/**
 * Revela o conteúdo uma vez, quando ele entra na tela.
 *
 * Quem pediu menos animação no sistema recebe o bloco já montado, sem fade e
 * sem deslocamento. A regra de `prefers-reduced-motion` do index.css não
 * cobre isto sozinha: ela zera animação e transição do CSS, e o que move aqui
 * é estilo inline que o framer-motion escreve quadro a quadro. Sem esta
 * checagem a página inteira continuava entrando em fade para quem desligou
 * movimento.
 */
function usaMenosMovimento() {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export default function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className,
  style,
}: Props) {
  const [quieto, setQuieto] = useState(usaMenosMovimento)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const ler = () => setQuieto(mq.matches)
    ler()
    mq.addEventListener('change', ler)
    return () => mq.removeEventListener('change', ler)
  }, [])

  if (quieto) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ delay, duration, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  )
}
