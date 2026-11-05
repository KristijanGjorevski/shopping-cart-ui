# ShopMate

A small shopping cart UI built while learning React (Vite + Tailwind CSS).

## Features

- Product catalog loaded from a mock REST API
- Add to cart, change quantities, remove items, clear cart
- Cart persists across reloads (localStorage)
- State handled with React Context (`ProductContext`, `CartContext`)

## Run locally

The products come from a mock API, so start **two** processes:

```bash
npm install

# Terminal 1 - mock API on http://localhost:8000
npm run json-server

# Terminal 2 - the app (Vite proxies /api to the mock API)
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

If you see "Could not load products", the mock API in terminal 1 isn't running.

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run json-server` | Start the mock API from `src/data/db.json` |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |
