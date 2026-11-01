# SysDesign Canvas

A local-first system architecture studio for designing, analyzing, and simulating scalable software systems.

## MVP foundation
- React 18 + TypeScript + Vite application scaffold
- Data-driven component registry with 20 architecture components
- Searchable palette with drag-and-drop and click-to-add
- Interactive React Flow canvas, directed connections, minimap, zoom, and pan
- Node and edge properties inspector
- Zustand local persistence and zundo undo/redo history (50 states)
- Capacity estimation: average/peak QPS, read/write QPS, annual storage, bandwidth
- Architecture checks: overload, possible SPOF, disconnected nodes, missing load balancer
- JSON import/export and URL Shortener / Rate Limiter templates
- Light/dark theme and architecture notes

## Stack
React 18 · TypeScript · Vite · @xyflow/react · Zustand · zundo · Tailwind CSS · Zod · Vitest

## Local development
```bash
npm install
npm run dev
npm run typecheck
npm test
npm run build
```

## Architecture
- `src/App.tsx`: application shell, palette, canvas, inspector, import/export
- `src/domain.ts`: component registry, graph types, capacity and validation services
- `src/store.ts`: graph state, persistence, and undo/redo
- `src/styles.css`: responsive visual system and themes

## Delivery workflow
- `main`: stable integration branch
- `feat/*`: feature development
- `fix/*`: isolated bug fixes
- `test/*`: test and quality improvements
- Each milestone is delivered through a pull request with acceptance criteria and verification notes.

Version 1 is a static frontend. Designs remain in browser storage by default; there is no account backend or real infrastructure deployment. Capacity defaults are configurable planning estimates, not vendor performance guarantees.
