/**
 * Todo o texto e toda a curadoria de foto da pagina ficam aqui, para mudar
 * copy sem abrir componente.
 *
 * As fotos sao servidas pelo proprio repositorio, em public/fotos, geradas
 * por scripts/preparar-fotos.py a partir dos originais do iCloud. Duas
 * medidas: `media` para o muro e a grade, `grande` para o lightbox.
 */

/** Caminho da foto na medida pedida. BASE_URL para funcionar em subpasta. */
export function foto(nome: string, medida: 'media' | 'grande' = 'media'): string {
  return `${import.meta.env.BASE_URL}fotos/${medida}/${nome}.jpg`
}

export const perfil = {
  nome: 'Gus Franco',
  marca: 'FRNCO',
  papel: 'Fotógrafo e diretor de fotografia',
  whatsapp: '+55 11 98945-7354',
  whatsappUrl:
    'https://wa.me/5511989457354?text=' +
    encodeURIComponent('Oi Gus! Vi a página da experiência na Paulista e Augusta e quero saber mais.'),
  instagram: 'https://www.instagram.com/gus.flashh/',
  instagramHandle: '@gus.flashh',
  instagramAlt: 'https://www.instagram.com/ogusfranco',
  instagramAltHandle: '@ogusfranco',
  email: 'chiarovisuals@gmail.com',
  local: 'Avenida Paulista e rua Augusta, São Paulo',
}

export const nav = [
  { label: 'A experiência', href: '#experiencia' },
  { label: 'Formatos', href: '#formatos' },
  { label: 'Fotos', href: '#galeria' },
  { label: 'Contato', href: '#contato' },
]

export const titulo = {
  linha1: 'Paulista',
  linha2: '& Augusta',
  chamada: 'Uma experiência fotográfica por São Paulo, no analógico e no digital',
}

export type Quadro = {
  nome: string
  /** Proporcao real do arquivo. Segura o layout para a foto nao pular. */
  prop: number
  legenda: string
}

/**
 * O muro do hero.
 *
 * Alternado entre deitada e em pé de propósito: numa coluna de largura fixa
 * isso faz os quadros saírem com alturas bem diferentes, que é o que dá a
 * sensação de muro e não de carrossel. Os índices 0 a 3 são os que caem no
 * topo das primeiras colunas na abertura, então são os quadros mais fortes.
 */
export const muro: Quadro[] = [
  { nome: 'dg-neon', prop: 1867 / 2800, legenda: 'Retrato no neon da Augusta, digital' },
  { nome: 'an-rua', prop: 2800 / 1857, legenda: 'Noite na Augusta, 35mm' },
  { nome: 'dg-roxo', prop: 1867 / 2800, legenda: 'Luz roxa, digital' },
  { nome: 'an-banca', prop: 2800 / 1892, legenda: 'Banca de livros na calçada, 35mm' },
  { nome: 'an-camiseta', prop: 1857 / 2800, legenda: 'Detalhe do visual, 35mm' },
  { nome: 'dg-avenida', prop: 2800 / 1477, legenda: 'A avenida em movimento, digital' },
  { nome: 'dg-pb', prop: 1867 / 2800, legenda: 'Preto e branco digital, alta resolução' },
  { nome: 'an-livro', prop: 2800 / 1857, legenda: 'Quadro cheio, com a borda do filme' },
  { nome: 'an-luz', prop: 1857 / 2800, legenda: 'Luz da avenida no fim do rolo' },
  { nome: 'dg-vermelho', prop: 2800 / 1587, legenda: 'A luz vermelha do trânsito, digital' },
  { nome: 'an-banco', prop: 2800 / 1857, legenda: 'Retrato no escuro, 35mm' },
]

/** Retrato do Gus, para a seção de quem fotografa. */
export const retrato = 'gus-retrato'

export const marquee = [
  'filme 35mm',
  'retrato',
  'avenida paulista',
  'rua augusta',
  'discos',
  'café',
  'instax',
  'cinema',
  'livros',
  'luz de rua',
]

export const experiencia = {
  abertura:
    'Uma tarde ou noite explorando a Paulista e a Augusta entre cafés, livros, arte, música, discos e lugares interessantes. Mais do que um ensaio, um tempo dedicado à cidade e à criação de retratos com um profissional de 16 anos de experiência e formação em fotografia e cinema.',
  paragrafos: [
    'Vai além de uma experiência fotográfica, é também uma conversa no flow sobre vida e arte profunda.',
    'Inclui ajuda na escolha do visual e na construção do conceito. Podemos fotografar pelas ruas ou em ambientes internos da região.',
  ],
  destaque: 'Imagina criar uma história escutando músicas em fita e fones, por exemplo?',
  numeros: [
    { valor: '16', rotulo: 'anos de fotografia' },
    { valor: '2', rotulo: 'bairros para caminhar' },
    { valor: '35mm', rotulo: 'filme de verdade' },
  ],
}

export const roteiro = [
  {
    n: '01',
    nome: 'O visual',
    texto:
      'Antes do dia eu ajudo a escolher a roupa e a montar o conceito. Nada é decidido na hora, no susto.',
  },
  {
    n: '02',
    nome: 'A caminhada',
    texto:
      'A gente sai andando pela Paulista e pela Augusta. Café, sebo, loja de disco, galeria, o que aparecer no caminho entra na história.',
  },
  {
    n: '03',
    nome: 'Rua ou dentro',
    texto:
      'Dá para fotografar na calçada e também em ambientes internos da região, se a luz ou a vontade pedir.',
  },
  {
    n: '04',
    nome: 'A conversa',
    texto:
      'O ensaio corre no flow, conversando sobre vida e arte. É isso que solta a pessoa e é por isso que o retrato sai parecido com ela.',
  },
  {
    n: '05',
    nome: 'A entrega',
    texto:
      'Você recebe as fotos digitalizadas ou tratadas, conforme o formato escolhido. O que foi feito em filme passa por revelação e digitalização.',
  },
]

/** Imagens que ilustram cada formato, uma família de foto por formato. */
export const amostras = {
  analogica: ['an-livro', 'an-banca', 'an-camiseta'],
  digital: ['dg-neon', 'dg-vermelho', 'dg-roxo'],
  combo: ['an-rua', 'dg-avenida', 'dg-pb'],
}

export const fechamento = 'Para algumas culturas, fotografia “rouba a alma” em cada quadro.'

/** A galeria inteira, na ordem em que aparece na página. */
export const galeria: Quadro[] = [
  { nome: 'dg-neon', prop: 1867 / 2800, legenda: 'Retrato no neon da Augusta, digital' },
  { nome: 'an-livro', prop: 2800 / 1857, legenda: 'Quadro cheio, com a borda do filme' },
  { nome: 'dg-roxo', prop: 1867 / 2800, legenda: 'Luz roxa, digital' },
  { nome: 'an-banca', prop: 2800 / 1892, legenda: 'Banca de livros na calçada, 35mm' },
  { nome: 'dg-avenida', prop: 2800 / 1477, legenda: 'A avenida em movimento, digital' },
  { nome: 'an-camiseta', prop: 1857 / 2800, legenda: 'Detalhe do visual, 35mm' },
  { nome: 'dg-pb', prop: 1867 / 2800, legenda: 'Preto e branco digital, alta resolução' },
  { nome: 'an-rua', prop: 2800 / 1857, legenda: 'Noite na Augusta, 35mm' },
  { nome: 'dg-vermelho', prop: 2800 / 1587, legenda: 'A luz vermelha do trânsito, digital' },
  { nome: 'an-luz', prop: 1857 / 2800, legenda: 'Luz da avenida no fim do rolo' },
  { nome: 'an-banco', prop: 2800 / 1857, legenda: 'Retrato no escuro, 35mm' },
]
