# SysDesign Canvas

A local-first system architecture studio for designing, analyzing, and simulating scalable software systems.

## MVP foundation
- React 18 + TypeScript + Vite application scaffold
- Data-driven component registry with 22 architecture component variants
- Searchable palette with drag-and-drop and click-to-add
- Interactive React Flow canvas, directed connections, minimap, zoom, and pan
- Node and edge properties inspector
- Zustand local persistence with 500 ms debounced writes, page-exit flush, quota/error recovery warning, and zundo undo/redo history (50 states)
- Capacity estimation: average/peak QPS, read/write QPS, annual storage, bandwidth
- Architecture checks: overload, possible SPOF, disconnected nodes, missing load balancer
- JSON import/export, full-canvas PNG/SVG exports, Markdown architecture reports, six system design templates, and request-flow simulation
- Light/dark theme, responsive read-only mode below 1024 × 600, error boundary, and architecture notes

## Stack
React 18 · TypeScript · Vite · @xyflow/react · Zustand · zundo · Tailwind CSS · Zod · Vitest · Playwright

## Local development
```bash
npm install
npm run dev
npm run typecheck
npm test
npm run test:e2e
npm run build
```

## Architecture
- `src/App.tsx`: application shell, palette, canvas, inspector, import/export
- `src/domain.ts`: component registry, graph types, capacity and validation services
- `src/store.ts`: graph state, persistence integration, and undo/redo
- `src/persistence.ts`: debounced localStorage adapter and recovery hooks
- `src/ErrorBoundary.tsx`: application-level rendering error recovery
- `e2e/editor.spec.ts`: browser tests for add, persistence, undo, and connections
- `src/export.ts`: Markdown architecture report generation
- `src/simulation.ts`: deterministic request-path tracing and latency calculation
- `src/styles.css`: responsive visual system and themes

## Delivery workflow
- `main`: stable integration branch
- `feat/*`: feature development
- `fix/*`: isolated bug fixes
- `test/*`: test and quality improvements
- Each milestone is delivered through a pull request with acceptance criteria and verification notes.

Version 1 is a static frontend. Designs remain in browser storage by default; there is no account backend or real infrastructure deployment. Capacity defaults are configurable planning estimates, not vendor performance guarantees.
