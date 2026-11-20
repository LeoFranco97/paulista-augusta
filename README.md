# Paulista & Augusta | experiência fotográfica do Gus Franco

Landing de venda da experiência fotográfica na Avenida Paulista e na rua
Augusta, feita para os clientes do Gus. Mesmo desenho do site dele
(`~/gus-franco-site`): preto #0C0C0C, Kanit, título em gradiente, muro de
fotos no topo e pílula quente como chamada.

O texto todo saiu do PDF `experiencias_paulista_augusta_land_1_e_2.pdf`, que
está na pasta do iCloud junto com as fotos.

## Como rodar

```bash
npm install
npm run dev
```

## As duas versões

O PDF trazia duas tabelas de preço para a mesma experiência. A página é a
mesma nas duas, só os números mudam, então a tabela entra por variável de
ambiente no build em vez de código duplicado:

| Saída | Tabela | Analógica | Digital | Combo | Instax |
| --- | --- | --- | --- | --- | --- |
| `dist/` | 1 | R$ 450 | R$ 750 | R$ 1.200 | R$ 200 |
| `dist/2/` | 2 | R$ 650 | R$ 880 | R$ 1.530 | R$ 300 |

```bash
./scripts/build.sh
```

Gera as duas de uma vez. São dois builds inteiros e independentes, cada um
com sua cópia das fotos, porque o preço fica embutido no JS e os dois não
podem dividir a mesma pasta de assets. Dá uns 9,5 MB somados.

Depois de escolher uma tabela, apagar a outra de `src/data/precos.ts` e o
segundo build de `scripts/build.sh`.

## As fotos

Os originais ficam no iCloud, em `paulista landing/`. O script gera as
versões web dentro de `public/fotos`:

```bash
python3 scripts/preparar-fotos.py
```

Duas medidas por foto: `media` (1000px, usada no muro e na grade) e `grande`
(1800px, usada no visor em tela cheia). Rodar de novo pula o que já existe;
`--forcar` refaz tudo.

Para trocar ou acrescentar foto: colocar o arquivo na pasta do iCloud, dar um
nome curto a ele no dicionário `NOMES` do script, rodar o script e registrar o
quadro em `muro` e `galeria` dentro de `src/data/site.ts`, com a proporção que
o próprio script imprime no fim.

## Estrutura

| Arquivo | O que é |
| --- | --- |
| `src/data/site.ts` | Todo o texto e a curadoria das fotos |
| `src/data/precos.ts` | As duas tabelas de preço |
| `src/sections/` | Uma seção por bloco da página |
| `src/components/` | Muro do topo, visor em tela cheia, botões, animações |

`FadeIn`, `Magnet` e `AnimatedText` vieram do site do Gus sem alteração, para
as duas páginas se moverem igual.

## Decisões que não são óbvias no código

- **O selo "o mais completo" fica por cima da foto**, e não no fluxo do texto.
  No fluxo ele empurrava o título e o preço do cartão em destaque alguns
  pixels para baixo, e os três preços deixavam de ficar na mesma linha, que é
  a leitura que a seção existe para permitir.
- **A galeria distribui as fotos na mão**, pela altura, em vez de usar
  `column-count`. As colunas do CSS equilibram como dá, mas não partem um
  item: com onze fotos de alturas diferentes, a coluna da esquerda fechava uns
  300px antes da outra.
- **O corpo do título do topo olha a altura da tela** (`min(15vw, 22vh)`). Só
  pela largura, num notebook de 1280x720 as duas linhas comiam 444px e sobrava
  uma tira de 276px para o muro.
- **O botão vai direto para o WhatsApp com a mensagem já escrita.** Quem
  clica ali já leu a página inteira e não deveria ter que redigir a abordagem.

## Pendências

- Escolher uma das duas tabelas e apagar a outra.
- Confirmar com o Gus o WhatsApp e os @ (hoje estão os mesmos do site dele:
  +55 11 98945-7354, @gus.flashh e @ogusfranco).
- Revisar com ele os textos de "Como funciona" e de "O combinado", que foram
  escritos a partir do PDF e não copiados dele.
- Publicar. Não está no ar ainda.
