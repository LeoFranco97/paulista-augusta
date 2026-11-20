import { Check, Plus } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import { BotaoWhats } from '../components/Botoes'
import { amostras, foto } from '../data/site'
import { tabela } from '../data/precos'
import type { Formato } from '../data/precos'

/**
 * Os três formatos e o adicional.
 *
 * Aqui a página vira proposta, então é o único bloco em colunas fechadas: a
 * pessoa precisa comparar preço com preço e item com item na horizontal, e
 * uma lista corrida como a de "Como funciona" obriga a rolar para cima e para
 * baixo para fazer essa conta.
 *
 * Cada formato leva a família de foto que ele entrega: o analógico mostra o
 * 35mm preto e branco com borda de filme, o digital mostra o neon tratado. É
 * o argumento mais honesto que a página tem, porque a diferença entre os dois
 * preços é exatamente a diferença entre as duas imagens.
 */

function Cartao({ formato, indice }: { formato: Formato; indice: number }) {
  const fotos = amostras[formato.chave]
  const destaque = formato.destaque

  return (
    <FadeIn delay={0.06 * indice} y={30} className="h-full">
      <article
        className={`relative flex h-full flex-col border bg-[#0C0C0C] ${
          destaque ? 'border-[#C2763A]/60' : 'border-[#D7E2EA]/15'
        }`}
      >
        {/* Tira de três fotos do que aquele formato entrega. Proporção fixa
            para os três cartões começarem na mesma linha de base, seja qual
            for a orientação dos arquivos. */}
        <div className="grid grid-cols-3 gap-px bg-[#D7E2EA]/10">
          {fotos.map((nome) => (
            <img
              key={nome}
              src={foto(nome)}
              alt=""
              aria-hidden
              loading="lazy"
              decoding="async"
              className="aspect-[3/4] w-full bg-white/[0.04] object-cover"
            />
          ))}
        </div>

        {/* O selo fica por cima da foto, e não no fluxo do texto. No fluxo
            ele empurrava o título e o preço do cartão em destaque alguns
            pixels para baixo, e aí os três preços deixavam de ficar na mesma
            linha, que é justamente a leitura que esta seção existe para
            permitir. */}
        {destaque && (
          <span className="absolute left-0 top-0 border-b border-r border-[#C2763A]/60 bg-[#0C0C0C]/90 px-3 py-1.5 text-[0.6rem] font-medium uppercase tracking-widest text-[#C2763A] backdrop-blur-sm">
            O mais completo
          </span>
        )}

        <div className="flex flex-1 flex-col p-6 sm:p-7">
          <h3 className="text-lg font-medium uppercase tracking-wide text-[#D7E2EA] sm:text-xl">
            {formato.nome}
          </h3>
          <p className="mt-2 text-sm font-light leading-relaxed text-[#D7E2EA]/55">
            {formato.resumo}
          </p>

          <p className="mt-6 flex items-baseline gap-2.5">
            <span className="text-3xl font-semibold leading-none text-[#D7E2EA] sm:text-4xl">
              {formato.preco}
            </span>
            <span className="text-xs font-light uppercase tracking-widest text-[#D7E2EA]/45">
              {formato.parcelas}
            </span>
          </p>

          <ul className="mt-6 flex flex-col gap-3 border-t border-[#D7E2EA]/12 pt-6">
            {formato.itens.map((item) => (
              <li key={item} className="flex gap-3">
                <Check
                  size={15}
                  strokeWidth={2}
                  className="mt-[3px] shrink-0 text-[#C2763A]"
                  aria-hidden
                />
                <span className="text-sm font-light leading-relaxed text-[#D7E2EA]/75">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          {/* mt-auto gruda o botão no rodapé do cartão, então os três botões
              ficam alinhados mesmo com listas de alturas diferentes. */}
          <div className="mt-auto pt-8">
            <BotaoWhats rotulo="Quero esta" />
          </div>
        </div>
      </article>
    </FadeIn>
  )
}

export default function Formatos() {
  return (
    <section id="formatos" className="bg-[#0C0C0C] px-5 py-20 sm:px-8 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <FadeIn delay={0} y={40}>
          <h2
            className="titulo-gradiente text-center font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(2.6rem, 11vw, 150px)' }}
          >
            Formatos
          </h2>
        </FadeIn>

        <FadeIn delay={0.1} y={20}>
          <p className="mx-auto mt-6 max-w-2xl text-center text-sm font-light leading-relaxed text-[#D7E2EA]/55 sm:text-base">
            A mesma caminhada pela Paulista e pela Augusta. O que muda é a
            câmera que vai junto e o que você recebe depois.
          </p>
        </FadeIn>

        <div className="mt-12 grid gap-6 sm:mt-16 md:grid-cols-3 md:gap-5">
          {tabela.formatos.map((formato, i) => (
            <Cartao key={formato.chave} formato={formato} indice={i} />
          ))}
        </div>

        {/* O adicional, numa faixa larga: é acréscimo a qualquer um dos três,
            não um quarto formato, e um cartão igual aos outros diria o
            contrário. */}
        <FadeIn delay={0.1} y={24}>
          <div className="mt-6 flex flex-col gap-5 border border-dashed border-[#D7E2EA]/25 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
            <div className="flex items-start gap-4">
              <Plus size={20} strokeWidth={1.5} className="mt-1 shrink-0 text-[#C2763A]" aria-hidden />
              <div>
                <h3 className="text-base font-medium uppercase tracking-wide text-[#D7E2EA] sm:text-lg">
                  {tabela.adicional.nome}
                </h3>
                <p className="mt-1.5 max-w-xl text-sm font-light leading-relaxed text-[#D7E2EA]/60">
                  {tabela.adicional.texto}
                </p>
              </div>
            </div>
            <p className="flex shrink-0 items-baseline gap-2 sm:flex-col sm:items-end sm:gap-0.5">
              <span className="text-2xl font-semibold leading-none text-[#D7E2EA]">
                {tabela.adicional.preco}
              </span>
              <span className="text-[0.65rem] font-light uppercase tracking-widest text-[#D7E2EA]/45">
                adicional
              </span>
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
