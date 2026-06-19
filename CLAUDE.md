# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

WintrChess is a free, self-hostable chess game analysis tool: users load a game (PGN, Chess.com, Lichess) and get Stockfish-powered move classifications (Best, Brilliant, Blunder, etc.), accuracy scores, and opening detection. It has no database and no external service dependencies (no accounts, OAuth, email, ads, or analytics) — clone, install, build, and run.

This is an npm workspaces monorepo with three packages:

- `client` — React + TypeScript frontend, bundled with Webpack/Babel (not bundled with the `tsc` compiler — `client`'s `build` script runs `webpack`, its `check` script runs `tsc --noEmit` purely for type-checking).
- `server` — Express backend (TypeScript, compiled with `tsc`), serves the static client bundle, HTML pages, and the analysis API route.
- `shared` — Code imported by both `client` and `server` (types, constants, and the core chess analysis/reporter logic). Compiled with `tsc` to `shared/dist` and consumed by the other two workspaces as the `shared` package (see `exports` in `shared/package.json`).

## Common commands

Run from the repo root unless noted.

```sh
npm install                 # install all workspace deps

npm run build                # build all workspaces (shared -> server -> client, in dependency order)
npm run build -w shared      # build a single workspace
npm run build -w server
npm run build -w client
npm run bbuild               # build only shared + server (skip client/webpack — useful for backend-only iteration)

npm start                    # node server/dist/index.js (requires build first)
npm run dev                  # build then start

npm run lint                  # eslint . (root eslint.config.js applies to **/*.ts and **/*.tsx across all workspaces)
```

Type-checking (no test suite exists in this repo):

```sh
npm run check -w client      # tsc --noEmit
npm run check -w server      # tsc --noEmit
```

There are no unit/integration tests configured anywhere in the repo currently.

### Local hosting

Requires Node 22+. No database or `.env` file is required to run the app — all environment variables documented in `docs/hosting.md` are optional. `docker compose up` will build and run the app in a single container.

## Architecture

### Server: clustered Express app

`server/src/index.ts` forks one Express worker process per CPU core via Node's `cluster` module — every worker independently listens on the same port. There is no database or shared external state between workers. Logging (e.g. "server running on port...") is gated to cluster worker `1` to avoid duplicate output. Keep this in mind when adding any in-memory state or startup logging: it will run once per worker, not once per process tree.

Request flow into `server/src/routes/index.ts` mounts (in order): `apiRouter`, `pagesRouter`. `apiRouter` (`server/src/routes/api/index.ts`) mounts the single analysis endpoint (`analyse`).

The analyze endpoint (`server/src/routes/api/analysis/analyse.ts`) is fully anonymous and unauthenticated — there is no accounts system, OAuth, email, or session/rate-limiting layer in front of it.

Page routes (`server/src/routes/pages`) serve server-rendered-ish HTML shells from `client/public/apps/*.html` via `appRouter()` (`server/src/lib/appRouter.ts`), which does simple `${placeholder}` string substitution (e.g. for SEO meta tags) before sending the file — there's no templating engine. The matching webpack entry bundle (see below) is what hydrates each page.

### Client: multi-page app, not a single SPA

There is no single React Router root for the whole site. `client/webpack.config.js` defines one entry point per "app" (`analysis`, `helpCenter`, `legal`, `settings`, `unfound`), each compiled to its own bundle and mounted into its own static HTML shell under `client/public/apps/`. Each `client/src/apps/<area>/<app>/index.tsx` is an independent React root (some, like `analysis`, use `react-router-dom` internally for sub-navigation within that one app). When adding a new top-level page, you need a new webpack entry, a new HTML shell in `client/public/apps/`, a server page route serving it, and an `index.tsx` entry under `client/src/apps`.

Path aliases (defined identically in `client/tsconfig.json` and `client/webpack.config.js`): `@/*` → `client/src/*`, `@analysis/*` → `client/src/apps/features/analysis/*` (shorthand for the largest app), `@assets/*` → `client/public/*`. `shared/*` resolves to the `shared` workspace package.

State management is Zustand (see `client/src/apps/features/analysis/stores/*` and `client/src/stores/*`) rather than Redux/Context for cross-component state; React Query (`@tanstack/react-query`) handles server data fetching (`client/src/hooks/api/*`).

### Shared: the analysis engine lives here, not in client or server

The actual move-classification logic (`shared/src/lib/reporter/`) is shared code, called both by the client (for instant local feedback while evaluating with the in-browser engine, see `client/src/apps/features/analysis/lib/reporter.ts`) and the server (`server/src/routes/api/analysis/analyse.ts`, used to produce the canonical game report). Key entry point: `getGameAnalysis()` in `shared/src/lib/reporter/report.ts`, which walks a `StateTreeNode` chain and annotates each node with `classification` (via `classify.ts`), `opening` (via `utils/opening.ts`, backed by `shared/src/resources/openings.json`), and `accuracy` (via `accuracy.ts`).

Games are represented as a `StateTreeNode` tree (`shared/src/types/game/position/StateTreeNode.ts`), not a flat move list — this supports variations/branches (used by the analysis board's move tree UI), with `mainline` flagging the primary line. Helper functions on this module (`getNodeChain`, `getNodeParentChain`, `addChildMove`, `findNodeRecursively`, etc.) are the primary way both client and server traverse/mutate game trees — prefer these over writing ad hoc tree-walking code. Nodes are serialized for network transfer via `serializeNode`/`deserializeNode`, which strip parent back-references (to avoid cycles in JSON) and drop all but the top 2 engine lines per node to reduce payload size; `deserializeNode` can optionally restore stripped engine lines from a client-held copy of the tree.

A "Risky" classification constant exists (`shared/src/constants/Classification.ts`) but is intentionally unused by the classifier — see `docs/contributing.md` for context if asked to implement it.

### Chess engine integration (client-side)

Analysis runs **client-side** using Stockfish 17 compiled to WASM/asm.js, loaded as a Web Worker (`client/src/apps/features/analysis/lib/engine.ts`, `Engine` class wraps the UCI protocol over `postMessage`). Multiple prebuilt binaries exist under `client/public/engines/` (full WASM, lite single-threaded WASM, asm.js fallback) selected via `EngineVersion` (`shared/src/constants/EngineVersion.ts`); `lichess-cloud` is also a valid "engine version" representing pulling pre-computed evaluations from Lichess's cloud eval API instead of running a local engine (`client/src/apps/features/analysis/lib/cloudEvaluate.ts`). The server is not involved in engine evaluation — `analyse.ts` only runs the *classification* step on a tree of FENs/evaluations the client already computed.

## Code style

Enforced by the root `eslint.config.js` (applies across all workspaces): double quotes, 4-space indent, no dangling commas, semicolons required. Beyond what ESLint checks, conventions established in `docs/contributing.md`:

- Import order: external libraries first (React first if present) → `shared`/other-package imports and same-package absolute (`@/...`) imports → local prop types and CSS module imports → asset imports (`@assets/...`) last.
- React components are written as named `function` declarations (not arrow functions) and default-exported.
- Prefer functions/interfaces over classes where reasonably possible.
- Commit/PR titles follow Conventional Commits with scopes `fe` (client), `be` (server), `sh` (shared) — omit the scope only when a change substantially touches multiple packages or root-level files, e.g. `feat(fe): add cool new feature`, `fix(be): handle missing session`.
- If a change touches personal/user data, describe in the PR what data is collected and what security considerations were taken (relevant to keeping the privacy policy accurate).
