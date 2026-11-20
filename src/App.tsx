import Topo from './sections/Topo'
import Faixa from './sections/Faixa'
import Experiencia from './sections/Experiencia'
import Roteiro from './sections/Roteiro'
import Formatos from './sections/Formatos'
import Galeria from './sections/Galeria'
import Fechamento from './sections/Fechamento'
import Contato from './sections/Contato'
import { LightboxProvider } from './components/Lightbox'

export default function App() {
  return (
    <LightboxProvider>
      {/* overflow-x clip e não hidden: hidden num ancestral quebra o
          position: sticky e o scroll suave das âncoras em alguns navegadores,
          e aqui só precisa segurar o brilho que vaza das laterais. */}
      <main id="topo" className="bg-[#0C0C0C]" style={{ overflowX: 'clip' }}>
        <Topo />
        <Faixa />
        <Experiencia />
        <Roteiro />
        <Formatos />
        <Galeria />
        <Fechamento />
        <Contato />
      </main>
    </LightboxProvider>
  )
}
