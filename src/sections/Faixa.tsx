import { marquee } from '../data/site'

/**
 * Faixa de palavras entre o topo e o texto.
 *
 * Serve de respiro depois do muro e de resumo do que a tarde tem dentro,
 * sem virar mais um parágrafo. Duas cópias da lista lado a lado e um
 * deslocamento de -50%: a segunda cópia entra exatamente onde a primeira
 * saiu, então o laço não tem emenda visível.
 */
export default function Faixa() {
  const lista = [...marquee, ...marquee]

  return (
    <section
      aria-hidden
      className="border-y border-[#D7E2EA]/10 bg-[#0C0C0C] py-5 md:py-7"
      style={{ overflow: 'hidden' }}
    >
      <div className="flex w-max">
        <div className="faixa-pista flex w-max shrink-0">
          {lista.map((palavra, i) => (
            <span key={i} className="flex shrink-0 items-center">
              <span
                className="px-5 font-light uppercase tracking-[0.2em] text-[#D7E2EA]/70 md:px-8"
                style={{ fontSize: 'clamp(0.8rem, 1.5vw, 1.4rem)' }}
              >
                {palavra}
              </span>
              <span className="h-1 w-1 shrink-0 rounded-full bg-[#C2763A]" />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
