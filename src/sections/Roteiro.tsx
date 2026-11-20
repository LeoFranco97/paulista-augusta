import FadeIn from '../components/FadeIn'
import { roteiro } from '../data/site'

/** Como a tarde corre, em lista numerada e não em grade de cartões. */
export default function Roteiro() {
  return (
    <section className="bg-[#0C0C0C] px-5 py-20 sm:px-8 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <FadeIn delay={0} y={40}>
          <h2
            className="titulo-gradiente text-center font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(2.6rem, 11vw, 150px)' }}
          >
            Como funciona
          </h2>
        </FadeIn>

        <ul className="mt-12 sm:mt-16">
          {roteiro.map((passo, i) => (
            <FadeIn key={passo.n} delay={0.04 * i} y={24}>
              <li className="grid gap-2 border-t border-[#D7E2EA]/15 py-7 md:grid-cols-[4rem_minmax(0,16rem)_minmax(0,1fr)] md:items-baseline md:gap-8">
                <span className="text-xs font-light tracking-widest text-[#D7E2EA]/35">
                  {passo.n}
                </span>
                <h3 className="text-lg font-medium uppercase tracking-wide text-[#D7E2EA] sm:text-xl">
                  {passo.nome}
                </h3>
                <p className="text-sm font-light leading-relaxed text-[#D7E2EA]/60 sm:text-base">
                  {passo.texto}
                </p>
              </li>
            </FadeIn>
          ))}
        </ul>
      </div>
    </section>
  )
}
