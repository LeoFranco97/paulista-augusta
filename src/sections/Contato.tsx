// A lucide tirou os ícones de marca, então AtSign faz as vezes do arroba.
import { MessageCircle, AtSign, MapPin, Mail } from 'lucide-react'
import FadeIn from '../components/FadeIn'
import { BotaoWhats } from '../components/Botoes'
import { perfil } from '../data/site'

const combinado = [
  { rotulo: 'Onde', valor: 'Avenida Paulista e rua Augusta, São Paulo. A gente combina o ponto de encontro.' },
  { rotulo: 'Quando', valor: 'Uma tarde ou uma noite, do seu jeito. Data acertada no WhatsApp.' },
  { rotulo: 'Quanto dura', valor: 'O tempo da caminhada, sem corrida contra o relógio.' },
  { rotulo: 'Quem pode', valor: 'Uma pessoa, um casal ou um grupo pequeno.' },
]

export default function Contato() {
  return (
    <section id="contato" className="bg-[#0C0C0C] px-5 pb-24 pt-20 sm:px-8 md:px-10 md:pb-32 md:pt-28">
      <div className="mx-auto max-w-6xl">
        <FadeIn delay={0} y={40}>
          <h2
            className="titulo-gradiente mb-12 text-center font-black uppercase leading-none tracking-tight sm:mb-16"
            style={{ fontSize: 'clamp(2.6rem, 11vw, 150px)' }}
          >
            Bora marcar
          </h2>
        </FadeIn>

        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <FadeIn delay={0.1} y={30}>
            <h3 className="mb-6 text-xs font-medium uppercase tracking-widest text-[#D7E2EA]/50">
              O combinado
            </h3>
            <dl className="flex flex-col">
              {combinado.map((linha) => (
                <div
                  key={linha.rotulo}
                  className="flex flex-col gap-1 border-t border-[#D7E2EA]/15 py-4 sm:flex-row sm:gap-6"
                >
                  <dt className="w-32 shrink-0 text-sm font-medium uppercase tracking-wider text-[#D7E2EA]/60">
                    {linha.rotulo}
                  </dt>
                  <dd className="text-sm font-light leading-relaxed text-[#D7E2EA] sm:text-base">
                    {linha.valor}
                  </dd>
                </div>
              ))}
            </dl>
          </FadeIn>

          <FadeIn delay={0.2} y={30}>
            <h3 className="mb-6 text-xs font-medium uppercase tracking-widest text-[#D7E2EA]/50">
              Falar com o Gus
            </h3>

            <div className="flex flex-col gap-4">
              <a
                href={perfil.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-[#D7E2EA] transition-opacity hover:opacity-70"
              >
                <MessageCircle size={18} strokeWidth={1.5} />
                <span className="text-sm font-light sm:text-base">{perfil.whatsapp}</span>
              </a>
              <a
                href={perfil.instagram}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-[#D7E2EA] transition-opacity hover:opacity-70"
              >
                <AtSign size={18} strokeWidth={1.5} />
                <span className="text-sm font-light sm:text-base">
                  {perfil.instagramHandle}
                  <span className="text-[#D7E2EA]/40"> · flash e rua</span>
                </span>
              </a>
              <a
                href={perfil.instagramAlt}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-[#D7E2EA] transition-opacity hover:opacity-70"
              >
                <AtSign size={18} strokeWidth={1.5} />
                <span className="text-sm font-light sm:text-base">
                  {perfil.instagramAltHandle}
                  <span className="text-[#D7E2EA]/40"> · fotografia</span>
                </span>
              </a>
              <a
                href={`mailto:${perfil.email}`}
                className="flex items-center gap-3 text-[#D7E2EA] transition-opacity hover:opacity-70"
              >
                <Mail size={18} strokeWidth={1.5} />
                <span className="text-sm font-light sm:text-base">{perfil.email}</span>
              </a>
              <p className="flex items-center gap-3 text-[#D7E2EA]/70">
                <MapPin size={18} strokeWidth={1.5} />
                <span className="text-sm font-light sm:text-base">{perfil.local}</span>
              </p>
            </div>

            <div className="mt-10 border-t border-[#D7E2EA]/15 pt-8">
              <BotaoWhats rotulo="Chamar no WhatsApp" />
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.3} y={20}>
          <p className="mt-16 border-t border-[#D7E2EA]/15 pt-8 text-center text-[0.65rem] font-light uppercase tracking-widest text-[#D7E2EA]/30">
            {perfil.nome} · {perfil.marca} · Todas as imagens são de autoria do fotógrafo
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
