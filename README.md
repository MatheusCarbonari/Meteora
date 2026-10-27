# Meteora 2.0

Loja virtual demonstrativa para portfólio, com catálogo local, pesquisa,
filtros, detalhes de produtos e carrinho persistido no navegador.

## Tecnologias

- Frontend: React, Vite, React Router, CSS Modules, Swiper e Vitest.
- Backend: Node.js, Express, MongoDB e Mongoose.

## Estrutura

```text
Meteora/
├── FrontMeteora/          # aplicação React
└── BackMeteora/backend/   # API Express em evolução
```

## Frontend

```bash
cd FrontMeteora
npm install
npm run dev
```

Validação:

```bash
npm test -- --run
npm run build
```

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
