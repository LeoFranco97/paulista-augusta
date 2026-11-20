import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import type { MotionValue } from 'framer-motion'

type Props = {
  text: string
  className?: string
  style?: React.CSSProperties
}

/** One character that brightens as the paragraph moves through the viewport. */
function Char({
  char,
  range,
  progress,
}: {
  char: string
  range: [number, number]
  progress: MotionValue<number>
}) {
  const opacity = useTransform(progress, range, [0.2, 1])
  return (
    <span className="relative inline-block whitespace-pre">
      <span className="opacity-20">{char}</span>
      <motion.span style={{ opacity }} className="absolute left-0 top-0">
        {char}
      </motion.span>
    </span>
  )
}

/**
 * Revelação letra a letra, conduzida pelo scroll.
 *
 * Quem pediu menos movimento no sistema recebe o parágrafo inteiro legível de
 * uma vez. Sem isso o texto ficava permanentemente a 20 por cento de opacidade
 * para essa pessoa: o que acende cada letra é estilo inline do framer-motion,
 * que a regra de prefers-reduced-motion do CSS não alcança, e aqui a conta de
 * opacidade nem chega a rodar porque depende do progresso do scroll.
 */
export default function AnimatedText({ text, className, style }: Props) {
  const ref = useRef<HTMLParagraphElement>(null)
  const [quieto, setQuieto] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false,
  )

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const ler = () => setQuieto(mq.matches)
    ler()
    mq.addEventListener('change', ler)
    return () => mq.removeEventListener('change', ler)
  }, [])

  // Depois do useScroll, nunca antes: sair do componente com um hook por
  // chamar muda a ordem dos hooks entre renders e o React quebra quando a
  // pessoa liga ou desliga o movimento com a página aberta.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  })

  if (quieto) {
    return (
      <p className={className} style={style}>
        {text}
      </p>
    )
  }

  const words = text.split(' ')
  let charIndex = 0
  const total = text.length

  return (
    <p ref={ref} className={className} style={style}>
      {words.map((word, w) => {
        // Keep whole words together so they never break mid-word on wrap.
        const chars = (word + (w < words.length - 1 ? ' ' : '')).split('')
        return (
          <span key={w} className="inline-block whitespace-pre">
            {chars.map((char, c) => {
              const start = charIndex / total
              const end = (charIndex + 1) / total
              charIndex += 1
              return <Char key={c} char={char} range={[start, end]} progress={scrollYProgress} />
            })}
          </span>
        )
      })}
    </p>
  )
}
