# Property Search — Coursework Project

This repository contains the Property Search website built for the "Advanced Client-Side Development"
coursework. The site is a Vite-powered React app that demonstrates component design, state
management with Context and custom hooks, client-side filtering, and testing.

What this README covers

- A concise description of the website and its main features.
- The coursework tasks implemented and where to find them in the codebase.
- The development process and technical decisions that guided the implementation.

Website overview

- The app implements a searchable property gallery with filtering (location, price, bedrooms),
  a favourites system, and property details. The main UI lives in `src/` under
  `components/`, `context/`, and `hooks/`.

Coursework deliverables (completed)

- Implemented component-based UI for listing properties and viewing details.
- Built a `useProperties` hook to fetch and normalise property data.
- Implemented `FilterContext` and `FavouritesContext` to manage application state.
- Created `filterProperties.js` in `src/utils/` and unit-tested it.
- Wrote a test suite (unit, integration, component) with at least five meaningful tests
  under `src/__tests__/` (uses Vitest and Testing Library).

Where to look in the code

- UI and pages: `src/components/` and `src/pages/` (gallery, image cards, details)
- State + hooks: `src/context/` and `src/hooks/` (`useProperties`, `useFavourites`, `useFilters`)
- Utilities: `src/utils/filterProperties.js`
- Tests: `src/__tests__/` (examples include `filterProperties.test.js`, `favourites.test.jsx`,
  `gallery.test.jsx`, `useProperties.test.jsx`, and `optionsGenerator.test.js`)

Development process & important decisions

- Exploration & constraints: React 19 + Vite is the project baseline. Early attempts to use
  Jest introduced peer-dependency issues with some testing libraries and ESM transforms.
- Runner choice: I used Vitest (Vite-native, ESM-friendly) for stable test runs and fast
  iteration. `jsdom` is the test environment for component tests.
- Test hygiene: JSX test files use a `.jsx` extension to avoid parser/transform errors.
- Mocking and isolation: Hooks and provider-dependent components are either wrapped with
  their providers in tests or have their hooks mocked using `vi.*` (Vitest mocking API).
- Tooling tweaks: ESLint was updated to accept test globals used by Vitest and avoid
  noise during development.

How to run and validate

1. Install dependencies:

```bash
npm install
```

1. Start the dev server and open the site at the address Vite prints:

```bash
npm run dev
```

1. Run the test suite:

```bash
npm test
```

1. Run tests in watch mode while developing:

```bash
npm run test:watch
```

Reviewer checklist (what to look for)

- Visual: gallery displays properties, filters narrow results, favourites toggle persists in
  UI state.
- Code: `useProperties` cleanly separates fetching and state; `filterProperties.js` covers
  edge cases (missing fields, inclusive/exclusive filters).
- Tests: unit tests for utilities, integration tests for hooks, and a component test that
  exercises real rendering with `jsdom`.

Notes & future improvements

- Some dev-time warnings (ReactDOMTestUtils.act deprecation) may appear; they are non-fatal
  and can be addressed by updating small test utilities if needed.
- If an assessor requires Jest specifically, the code can be adapted, but Vitest was
  chosen for better compatibility with Vite/ESM in this project.

Contact / author notes

- If you want a walkthrough or to see specific parts of the implementation, tell me which
  feature and I will point to the exact files and tests.
