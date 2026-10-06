# CitySize

A small React app (Vite) to compare the size of two cities.

- Futuristic homepage presenting what the app can do
- Two autocomplete dropdowns backed by a static list of 150+ cities
  (France incl. Hyères-les-Palmiers, Europe, Australia, USA, rest of the world)
- Once both cities are selected, the **Compare** button opens a full-screen white page

## Prerequisites

- Node.js 18+ and npm

## Run the project

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

## Other scripts

```bash
npm run build     # production build in dist/
npm run preview   # serve the production build locally
```

## Project structure

```
src/
  data/cities.js          static list of cities
  components/CitySelect   autocomplete dropdown
  pages/Home.jsx          landing page
  pages/Result.jsx        full-screen result page (/result)
```

To add a city, edit `src/data/cities.js`.
