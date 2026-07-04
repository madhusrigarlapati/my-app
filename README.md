# Calc Suite

A collection of quick, focused calculators grouped by domain, built with Next.js (App Router) and Tailwind CSS. Everything runs client-side in the browser.

**Live:** https://my-app-psi-eight-50.vercel.app

## Calculators

- **Finance** — EMI / Loan (`/finance/emi`), Compound Interest (`/finance/compound-interest`)
- **Health** — BMI (`/health/bmi`), Calorie / TDEE (`/health/calorie`)
- **Math** — Percentage (`/math/percentage`), Unit Converter (`/math/unit-converter`)
- **Everyday** — Tip Splitter (`/everyday/tip`), Age / Date Difference (`/everyday/age`)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it. Each calculator lives in `app/<domain>/<calculator>/page.tsx`, backed by a client component in `components/calculators/`. Domain and calculator metadata (used for the home page nav) lives in `lib/calculators.ts`.

## Deployment

Deployed on Vercel. Two things matter for a clean deploy:

- `package.json`'s `build` script forces `next build --webpack` — Turbopack production builds currently skip the build-trace collection step Vercel's builder needs, which otherwise silently ships an empty deployment (every route 404s, no error shown).
- `vercel.json` declares `"framework": "nextjs"` explicitly, since zero-config framework detection can fall back to `@vercel/static-build` otherwise.

```bash
npx vercel --prod
```
