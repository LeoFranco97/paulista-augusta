import FadeIn from '../components/FadeIn'
import Muro from '../components/Muro'
import { BotaoWhats } from '../components/Botoes'
import { nav, perfil, titulo } from '../data/site'

/**
 * O topo.
 *
 * Três faixas, empilhadas em fluxo normal:
 *
 *   1. Faixa de cima, em preto limpo: a navegação e o título. Nada fica atrás
 *      do título em nenhum tamanho de tela, e isso é estrutural e não margem
 *      calibrada: uma coluna flex com o muro em flex-1 torna impossível, por
 *      construção, o título bater na área de foto.
 *   2. Poço da imagem: o muro, sangrando nas bordas, ocupando a altura que
 *      sobrar.
 *   3. Barra de baixo: a chamada e o botão, flutuando sobre o muro em cima de
 *      um véu, para o texto manter contraste seja qual for o quadro que
 *      estiver passando ali embaixo. Nunca confiar que a foto vai estar
 *      escura naquele ponto.
 *
 * A altura vem de `.topo-viewport` (src/index.css), não de h-screen: no
 * Safari do iPhone 100vh é mais alto que a página visível e esconde a faixa 3.
 */
export default function Topo() {
  return (
    <section className="topo-viewport relative flex flex-col overflow-hidden bg-[#0C0C0C]">
      {/* 1. Faixa de cima */}
      <div className="relative z-20 shrink-0 bg-[#0C0C0C] pb-5 md:pb-7">
        <FadeIn delay={0} y={-20}>
          {/* A marca some no celular. A 375px a marca mais quatro links não
              cabem na largura útil e o último link ficava cortado na borda.
              O título logo abaixo já diz de quem é a página, então é a marca
              que cede. */}
          <nav className="flex items-baseline justify-between gap-4 px-6 pt-6 md:px-10 md:pt-8">
            <a
              href="#topo"
              className="hidden text-sm font-semibold uppercase tracking-[0.3em] text-[#D7E2EA] sm:inline md:text-lg"
            >
              {perfil.marca}
            </a>
            <span className="flex w-full justify-between gap-3 sm:w-auto sm:justify-end sm:gap-5 md:gap-8">
              {nav.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-[0.68rem] font-medium uppercase tracking-wide text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70 sm:text-xs sm:tracking-wider md:text-base"
                >
                  {item.label}
                </a>
              ))}
            </span>
          </nav>
        </FadeIn>

        <div className="overflow-hidden px-4">
          <FadeIn delay={0.15} y={40}>
            {/* Duas linhas em vez de uma: "Paulista & Augusta" numa linha só
                ficaria com corpo de 6vw para caber, metade do tamanho que o
                nome dos bairros merece aqui.

                O corpo olha a altura da tela além da largura. Só por largura,
                num notebook de 1280x720 as duas linhas comiam 444px dos 720 e
                sobrava uma tira de 276px para o muro, que é pouco para ler
                como corpo de trabalho. O min() com 22vh segura isso sem
                encolher nada no celular, onde quem manda é sempre a largura. */}
            <h1
              className="titulo-gradiente mt-7 w-full text-center font-black uppercase leading-[0.86] tracking-tight sm:mt-8"
              style={{ fontSize: 'clamp(3.2rem, min(15vw, 22vh), 15rem)' }}
            >
              <span className="block whitespace-nowrap">{titulo.linha1}</span>
              <span className="block whitespace-nowrap">{titulo.linha2}</span>
            </h1>
          </FadeIn>
        </div>
      </div>

      {/* 2. Poço da imagem. Entrada quase sem atraso: a foto é o argumento,
          não pode ser a última coisa a chegar. min-h-0 deixa o filho flex
          encolher de verdade. */}
      <div className="relative z-0 min-h-0 flex-1">
        <FadeIn delay={0} duration={0.5} y={0} className="h-full">
          <div
            className="h-full"
            role="img"
            aria-label="Fotografias feitas na Avenida Paulista e na rua Augusta, em filme 35mm e em digital"
          >
            <Muro />
          </div>
        </FadeIn>
      </div>

      {/* 3. Véu, e depois a barra.
          A altura acompanha a largura da tela, porque é ela que manda em
          quanto a barra cresce: a chamada quebra em três linhas a 1280 e em
          cinco a 1920. A curva é mais densa que um degradê linear: na borda
          de cima do texto o véu está perto de 0,70, o que segura por volta de
          4,8:1 no pior caso de um quadro claro passando bem ali, e a sombra
          no texto cobre o resto. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10"
        style={{
          height: 'clamp(180px, 15vw, 300px)',
          background:
            'linear-gradient(to top, #0C0C0C 0%, rgba(12,12,12,0.97) 28%, rgba(12,12,12,0.88) 52%, rgba(12,12,12,0.68) 72%, rgba(12,12,12,0.30) 88%, rgba(12,12,12,0) 100%)',
        }}
      />

      <div className="absolute inset-x-0 bottom-0 z-20 flex items-end justify-between gap-4 px-6 pb-7 sm:pb-8 md:px-10 md:pb-10">
        <FadeIn delay={0.35} y={20}>
          <p
            className="max-w-[170px] font-light uppercase leading-snug tracking-wide text-[#D7E2EA] sm:max-w-[240px] md:max-w-[320px]"
            style={{
              fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)',
              // Cinto e suspensório por cima do véu, para o quadro em que uma
              // foto clara passa bem embaixo da linha.
              textShadow: '0 1px 10px rgba(0,0,0,0.85)',
            }}
          >
            {titulo.chamada}
          </p>
        </FadeIn>

        <FadeIn delay={0.5} y={20}>
          <BotaoWhats />
        </FadeIn>
      </div>
    </section>
  )
}
