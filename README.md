# Meteora 2.0

Loja virtual demonstrativa para portfólio, com catálogo local, pesquisa,
filtros, detalhes de produtos e carrinho persistido no navegador.

## Tecnologias

- Frontend: React, Vite, React Router, CSS Modules, Swiper e Vitest.
- Backend: Node.js, Express, MongoDB e Mongoose.

## Estrutura

```text
Meteora/
├── FrontMeteora/
│   ├── public/            # arquivos públicos
│   └── src/
│       ├── Components/    # componentes reutilizáveis
│       ├── Pages/         # páginas e layout compartilhado
│       ├── context/       # estado e persistência do carrinho
│       ├── data/          # catálogo local
│       └── styles/        # tokens visuais globais
└── BackMeteora/backend/   # API Express em evolução
```

## Frontend

Requer Node.js 20.19 ou superior e npm.

```bash
cd FrontMeteora
npm install
npm run dev
```

Validação:

```bash
npm test -- --run
npm run build
npm run preview
```

O build de produção é gerado em `FrontMeteora/dist/`.

### Convenções visuais

Os tokens globais ficam em `FrontMeteora/src/styles/tokens.css`. Componentes
devem priorizar as variáveis semânticas de cor, a escala `--space-*`, as
famílias tipográficas e `--content-max-width`. Os breakpoints documentados no
arquivo servem como referência para as media queries dos CSS Modules.

Inter é usada para textos e Space Grotesk para destaques, com fontes do sistema
como fallback. As combinações principais de contraste são off-white sobre
preto, preto sobre off-white e preto sobre verde-lima.

### Persistência do carrinho

O carrinho usa a chave versionada `meteora-cart-v1` no `localStorage` e salva
somente uma lista de objetos com `productId` e `quantity`. Produtos inexistentes
e quantidades inválidas são descartados durante a restauração.

Os dados permanecem somente no navegador atual e não são sincronizados entre
dispositivos. Caso o armazenamento esteja indisponível, o carrinho continua
funcionando em memória durante a sessão.

## Backend

```bash
cd BackMeteora/backend
npm install
```

Copie `.env.example` para `.env`, configure `MONGODB_URI` localmente e inicie:

```bash
npm run dev
```

O backend ainda está em evolução. Credenciais e demais configurações locais não
devem ser versionadas.
