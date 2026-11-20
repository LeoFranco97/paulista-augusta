import FadeIn from '../components/FadeIn'
import { fechamento, foto } from '../data/site'

/**
 * A frase da alma, em tela cheia sobre uma foto.
 *
 * É a última linha do PDF e funciona como respiro antes do contato: depois
 * da tabela de preço a página precisa voltar a ser sobre fotografia, senão
 * termina como orçamento.
 *
 * A foto escolhida é a do livro na frente do rosto, com a borda do filme à
 * mostra: é a imagem da pasta que mais combina com a ideia de um quadro que
 * leva alguma coisa de quem está nele.
 */
export default function Fechamento() {
  return (
    <section className="relative isolate flex min-h-[60vh] items-center justify-center overflow-hidden px-6 py-24 md:min-h-[70vh] md:py-32">
      <img
        src={foto('an-livro', 'grande')}
        alt=""
        aria-hidden
        loading="lazy"
        decoding="async"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      {/* Véu em cima da foto. Sem ele o texto claro cai nas áreas queimadas do
          negativo e some no meio da frase.
          O negativo já é escuro, então o véu é leve: 0,45 no centro, onde o
          texto cai, subindo para 0,85 nas bordas. Mais que isso e a foto
          some, que foi o que aconteceu na primeira tentativa, com a imagem a
          40 por cento debaixo de um véu de 0,72: a seção virava uma tela
          preta com um fantasma no meio. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(12,12,12,0.45) 0%, rgba(12,12,12,0.68) 55%, rgba(12,12,12,0.92) 100%)',
        }}
      />

      <FadeIn delay={0} y={30}>
        <blockquote
          className="mx-auto max-w-4xl text-center font-light leading-snug text-[#D7E2EA]"
          style={{
            fontSize: 'clamp(1.4rem, 4.2vw, 3.2rem)',
            textShadow: '0 2px 20px rgba(0,0,0,0.8)',
          }}
        >
          {fechamento}
        </blockquote>
      </FadeIn>
    </section>
  )
}
