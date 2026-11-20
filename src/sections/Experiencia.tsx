import FadeIn from '../components/FadeIn'
import AnimatedText from '../components/AnimatedText'
import { experiencia, foto, retrato } from '../data/site'

/**
 * Banho de cor suave nos cantos, feito em CSS e não com render de banco. As
 * paradas são âmbar, barro e verde-petróleo, tiradas das próprias fotos, para
 * a página brilhar na mesma faixa de cor do trabalho.
 */
function Brilho({ className, cor }: { className: string; cor: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute rounded-full blur-[90px] ${className}`}
      style={{ background: cor }}
    />
  )
}

export default function Experiencia() {
  return (
    <section
      id="experiencia"
      className="relative overflow-hidden px-5 py-20 sm:px-8 md:px-10 md:py-28"
    >
      <Brilho
        className="left-[-10%] top-[8%] h-[280px] w-[280px] opacity-40 md:h-[420px] md:w-[420px]"
        cor="#8C5A2B"
      />
      <Brilho
        className="right-[-8%] top-[26%] h-[220px] w-[220px] opacity-30 md:h-[340px] md:w-[340px]"
        cor="#C2763A"
      />
      <Brilho
        className="bottom-[6%] left-[18%] h-[200px] w-[200px] opacity-25 md:h-[300px] md:w-[300px]"
        cor="#2E4A52"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <FadeIn delay={0} y={40}>
          <h2
            className="titulo-gradiente text-center font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(2.6rem, 11vw, 150px)' }}
          >
            A experiência
          </h2>
        </FadeIn>

        {/* O parágrafo de abertura sozinho, largo, revelado letra a letra
            conforme passa pela tela. É o texto que vende a tarde inteira. */}
        <div className="mt-12 sm:mt-16">
          <AnimatedText
            text={experiencia.abertura}
            className="mx-auto max-w-4xl text-center font-medium leading-relaxed text-[#D7E2EA]"
            style={{ fontSize: 'clamp(1.05rem, 2.2vw, 1.6rem)' }}
          />
        </div>

        {/* Retrato do fotógrafo ao lado do resto do texto. */}
        <div className="mt-14 grid items-center gap-10 sm:mt-18 md:grid-cols-[minmax(0,300px)_minmax(0,1fr)] md:gap-14">
          <FadeIn delay={0.1} y={30}>
            <figure>
              <img
                src={foto(retrato)}
                alt="Gus Franco, de boné e câmera analógica na mão"
                loading="lazy"
                decoding="async"
                width={960}
                height={1280}
                className="mx-auto w-full max-w-[300px] rounded-sm object-cover ring-1 ring-[#D7E2EA]/15"
              />
              <figcaption className="mt-3 text-center text-[0.65rem] font-light uppercase tracking-widest text-[#D7E2EA]/40">
                Quem fotografa
              </figcaption>
            </figure>
          </FadeIn>

          <div>
            {experiencia.paragrafos.map((p, i) => (
              <FadeIn key={i} delay={0.05 * i} y={24}>
                <p
                  className="mb-5 font-light leading-relaxed text-[#D7E2EA]/75"
                  style={{ fontSize: 'clamp(0.98rem, 1.7vw, 1.2rem)' }}
                >
                  {p}
                </p>
              </FadeIn>
            ))}

            {/* A pergunta da fita cassete, destacada: é a frase que faz a
                pessoa imaginar a cena, e dentro de um parágrafo ela passava
                batida. */}
            <FadeIn delay={0.1} y={24}>
              <p
                className="mt-8 border-l-2 border-[#C2763A] pl-5 font-light italic leading-snug text-[#D7E2EA] sm:pl-6"
                style={{ fontSize: 'clamp(1.1rem, 2.4vw, 1.75rem)' }}
              >
                {experiencia.destaque}
              </p>
            </FadeIn>

            <FadeIn delay={0.1} y={24}>
              <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-5">
                {experiencia.numeros.map((n) => (
                  <div key={n.rotulo}>
                    <dd className="text-2xl font-semibold leading-none text-[#D7E2EA] sm:text-3xl">
                      {n.valor}
                    </dd>
                    <dt className="mt-1 text-[0.65rem] font-light uppercase tracking-widest text-[#D7E2EA]/45 sm:text-xs">
                      {n.rotulo}
                    </dt>
                  </div>
                ))}
              </dl>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}
