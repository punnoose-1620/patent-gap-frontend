# Patent Gap AI - Frontend

This project was bootstrapped with Vite + React template.

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Project Structure

```
patent-gap-frontend/
├─ public/
├─ src/
│  ├─ assets/
│  ├─ components/
│  │  ├─ dashboard/
│  │  │  └─ ProjectCard.jsx
│  │  ├─ history/
│  │  │  ├─ HistoryCard.jsx
│  │  │  └─ StatCard.jsx
│  │  └─ ui/                # shadcn/ui primitives
│  │     ├─ card.jsx, badge.jsx, sidebar.jsx, ...
│  ├─ layouts/
│  │  ├─ Layout.jsx
│  │  └─ AppSidebar.jsx
│  ├─ pages/
│  │  ├─ history/
│  │  │  ├─ History.jsx
│  │  │  └─ mock.js
│  │  ├─ new-project/
│  │  │  └─ NewProject.jsx
│  │  ├─ Home.jsx, Results.jsx, Analysis.jsx, Comparison.jsx, NotFound.jsx, ...
│  ├─ redux/
│  │  ├─ services/
│  │  │  ├─ base-api.js     # RTK Query baseApi
│  │  │  └─ patent-api.js   # USPTO fetch mutation
│  │  ├─ modules/
│  │  │  └─ auth/
│  │  ├─ hooks.js           # typed Redux hooks
│  │  ├─ provider.jsx       # <Provider> wrapper
│  │  └─ store.js           # configureStore
│  ├─ router/
│  │  ├─ index.jsx          # createBrowserRouter
│  │  ├─ public.routes.jsx
│  │  └─ private.routes.jsx
│  ├─ lib/
│  │  └─ utils.js           # cn(), helpers
│  ├─ App.jsx               # RouterProvider + routes
│  ├─ main.jsx              # React root
│  └─ index.css
├─ .vscode/settings.json
├─ jsconfig.json            # @ alias → src
├─ vite.config.js           # Vite config + @ alias
├─ eslint.config.js
├─ .prettierrc
└─ package.json
```

## Conventions

- Imports use `@` alias for `src` (configured in [vite.config.js](vite.config.js) and [jsconfig.json](jsconfig.json)). Example: `import StatCard from '@/components/history/StatCard';`.
- UI is built with shadcn/ui primitives under [src/components/ui](src/components/ui).
- Data fetching uses RTK Query. See [base-api.js](src/redux/services/base-api.js) and [patent-api.js](src/redux/services/patent-api.js).
- Routing uses React Router with route modules in [src/router](src/router).

## Scripts

- Dev server: `npm run dev`
- Lint: `npm run lint`
- Format: `npm run format`
