# Findspot

Tourism spot discovery for Laguna. React 19 + TypeScript + Vite, styled with
Tailwind CSS v4, server state handled by Redux Toolkit Query.

## Getting started

```bash
npm install
cp .env.example .env   # then point VITE_API_URL at your API
npm run dev
```

| Script            | What it does                          |
| ----------------- | ------------------------------------- |
| `npm run dev`     | Vite dev server with HMR              |
| `npm run build`   | Typecheck (`tsc -b`) and build        |
| `npm run lint`    | ESLint over the project               |
| `npm run preview` | Serve the production build            |

## Folder structure

Feature-first: code that changes together lives together. A new feature is a
new folder under `features/`, not edits scattered across five type folders.

```
src/
├── app/                  # application wiring — store, providers, root App
│   ├── App.tsx
│   ├── hooks.ts          # typed useAppDispatch / useAppSelector
│   ├── providers.tsx     # every app-wide provider, composed once
│   └── store.ts          # configureStore + RTK Query middleware
├── assets/               # images, fonts and other bundled files
├── components/           # presentational components shared by features
│   ├── icons/
│   └── layout/           # Header, and future Footer / shells
├── config/               # env.ts — the only place import.meta.env is read
├── constants/            # app-wide constant values
├── features/             # one folder per domain capability
│   ├── home/
│   │   ├── components/   # Hero
│   │   └── constants/    # hero slides
│   ├── search/
│   │   ├── components/   # SearchBar
│   │   ├── searchSlice.ts
│   │   └── index.ts      # the feature's public surface
│   └── spots/
│       ├── api/          # RTK Query endpoints injected into baseApi
│       └── types/
├── functions/            # pure, framework-agnostic functions (see below)
│   ├── formatters/
│   ├── helpers/
│   └── validators/
├── hooks/                # reusable React hooks not tied to one feature
├── pages/                # route-level composition of features
├── services/             # outside-world clients
│   └── api/              # baseApi + cache tags
└── types/                # types shared across features
```

Import with the `@/` alias (`@/functions`, `@/features/search`) rather than
`../../..`. It is configured in both `vite.config.ts` and `tsconfig.app.json`.

### The `functions/` folder

Deliberately separate from `hooks/` and `components/`. Everything in it is a
plain function with no React, no store access and no imports from `features/`,
so it is trivial to test and safe to use anywhere:

- `formatters/` — turn values into display or wire formats (`formatDateLabel`)
- `validators/` — answer yes/no questions about data (`isBrokenDateRange`)
- `helpers/` — small general utilities (`cn`, `storage`, `compactParams`)

If only one feature will ever need a function, it belongs in that feature.

### Feature boundaries

- Import from a feature's barrel (`@/features/search`), never reach into its
  internals from another feature.
- `pages/` composes features; features do not know which page renders them.
- Slices are imported into the store from their module, not the barrel, so the
  store's import graph stays free of React components.

## State management

Redux Toolkit Query owns **server state**; slices own **client state**.

`services/api/baseApi.ts` holds the one and only `createApi` call — it sets the
base URL, attaches the auth header and declares the cache tags. Features add
endpoints with `injectEndpoints`, which keeps a single cache, reducer and
middleware however many features exist:

```ts
export const spotsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    searchSpots: builder.query<Paginated<Spot>, SpotSearchParams>({ ... }),
  }),
})

export const { useSearchSpotsQuery } = spotsApi
```

Because endpoints only register when their module is loaded, feature APIs that
no mounted component imports yet are imported in `app/store.ts`.

Anything that is not server data — the hero search form, UI toggles — goes in a
slice, as `features/search/searchSlice.ts` does. Read and write it through the
typed `useAppSelector` / `useAppDispatch` in `app/hooks.ts`.
