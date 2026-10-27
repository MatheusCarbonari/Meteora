# Meteora

Frontend da loja demonstrativa Meteora, desenvolvido com React, Vite, React Router, Swiper e CSS Modules.

## Requisitos

- Node.js 20.19 ou superior
- npm

## Execução

```bash
npm install
npm run dev
```

## Validação

```bash
npm test -- --run
npm run build
npm run preview
```

O build de produção é gerado em `dist/`.

## Fundação visual

Os tokens globais ficam em `src/styles/tokens.css`. Novos componentes devem
preferir as variáveis semânticas de cor, a escala `--space-*`, as famílias
tipográficas e `--content-max-width`. Os tokens legados permanecem disponíveis
apenas para preservar a interface existente durante a evolução incremental.

Inter foi definida para texto e Space Grotesk para destaques, sempre com fontes
do sistema como fallback. Nenhuma fonte externa nova é obrigatória. Os
breakpoints documentados no arquivo de tokens são referências e devem ser
escritos como valores literais nas media queries.

Para contraste, use off-white sobre preto, preto sobre off-white e preto sobre
verde-lima. Off-white sobre roxo atende texto normal; roxo sobre preto e
verde-lima sobre off-white devem ficar restritos a elementos decorativos.

## Persistência do carrinho

O carrinho é salvo no `localStorage` com a chave versionada
`meteora-cart-v1`. O valor utiliza o formato
`{"items":[{"productId":"product-001","quantity":1}]}` e não armazena
nomes, preços ou outras informações do catálogo.

Os dados são locais ao navegador e não são sincronizados entre dispositivos.
Na restauração, produtos inexistentes e quantidades inválidas são descartados.
Quando o armazenamento está indisponível, o carrinho continua funcionando
somente em memória durante a sessão atual.
