/**
 * As duas tabelas de preço do PDF.
 *
 * A página é a mesma nas duas versões, só os números mudam, então a tabela
 * entra por variável de ambiente no build e não por código duplicado:
 *
 *   VITE_TABELA=1  ->  dist/      (analógica 450, digital 750, combo 1.200)
 *   VITE_TABELA=2  ->  dist/2/    (analógica 650, digital 880, combo 1.530)
 *
 * scripts/publicar.sh roda os dois builds. Para fechar numa tabela só, apagar
 * a outra daqui e o segundo build do script.
 */

export type Formato = {
  chave: 'analogica' | 'digital' | 'combo'
  nome: string
  resumo: string
  itens: string[]
  preco: string
  parcelas: string
  /** O combo é o que a página empurra, então ganha o selo e a borda clara. */
  destaque?: boolean
}

export type Tabela = {
  versao: '1' | '2'
  formatos: Formato[]
  adicional: { nome: string; texto: string; preco: string }
}

const formatos = (analogica: string, digital: string, combo: string): Formato[] => [
  {
    chave: 'analogica',
    nome: 'Fotografia analógica',
    resumo: 'Filme 35mm, colorido ou preto e branco.',
    itens: [
      'Cerca de 20 a 30 fotos digitalizadas',
      'Filme, revelação e digitalização inclusos',
      'Ajuda na escolha do visual e do conceito',
    ],
    preco: analogica,
    parcelas: 'até 2x',
  },
  {
    chave: 'digital',
    nome: 'Fotografia digital',
    resumo: 'Alta resolução, com tratamento de cor.',
    itens: [
      'Cerca de 30 retratos em alta resolução',
      'Tratamento de cor em todas as fotos',
      'Vídeo de aproximadamente 30 segundos',
    ],
    preco: digital,
    parcelas: 'até 4x',
  },
  {
    chave: 'combo',
    nome: 'Analógico + digital',
    resumo: 'As duas experiências em uma mesma produção.',
    itens: [
      'Tudo da analógica: filme 35mm revelado e digitalizado',
      'Tudo da digital: retratos tratados e vídeo de 30 segundos',
      'Uma só tarde ou noite, as duas câmeras na rua',
    ],
    preco: combo,
    parcelas: 'até 5x',
    destaque: true,
  },
]

export const tabelas: Record<'1' | '2', Tabela> = {
  '1': {
    versao: '1',
    formatos: formatos('R$ 450', 'R$ 750', 'R$ 1.200'),
    adicional: {
      nome: 'Fotos Instax',
      texto: '10 fotos instantâneas, feitas durante a experiência e entregues na hora.',
      preco: 'R$ 200',
    },
  },
  '2': {
    versao: '2',
    formatos: formatos('R$ 650', 'R$ 880', 'R$ 1.530'),
    adicional: {
      nome: 'Fotos Instax',
      texto: '10 fotos instantâneas, feitas durante a experiência e entregues na hora.',
      preco: 'R$ 300',
    },
  },
}

const escolhida = import.meta.env.VITE_TABELA === '2' ? '2' : '1'

export const tabela = tabelas[escolhida]
