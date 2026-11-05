# ShopMate

A small shopping cart UI built while learning React (Vite + Tailwind CSS).

**Live demo:** https://shopping-card-ui.vercel.app/

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

## Where the product data comes from

The app reads the products URL from `VITE_API_PRODUCTS`:

| Mode | File | URL | Source |
| --- | --- | --- | --- |
| Development (`npm run dev`) | `.env.development` | `/api/products` | json-server, a simulated backend (`src/data/db.json`) |
| Production (Vercel) | `.env.production` | `/products.json` | static sample data in `public/products.json` |

Vercel can't run json-server, so the deployed app serves the same products as a static file.
Keep `public/products.json` in sync with `src/data/db.json`.

## Deploy to Vercel

1. Push the repo to GitHub.
2. On [vercel.com](https://vercel.com), choose **Add New > Project** and import the repo.
3. Vercel detects Vite (build `npm run build`, output `dist`). No environment variables are needed.
4. Click **Deploy**. Every push to `main` redeploys automatically.

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run json-server` | Start the mock API from `src/data/db.json` |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |
