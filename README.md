# Mirea Nicole Lomeda — A Debut Invitation

A vintage-luxe, gold-on-plum debut invitation. Vite + React 19 + TypeScript + Tailwind v4, with Motion, GSAP ScrollTrigger and Lenis smooth scroll. Opens with a ribbon-tied vintage scroll loader and a scroll-scrubbed cinematic background.

## Local

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # type-check + production build → dist/
npm run preview    # preview the production build
```

## Deploy to Vercel

The project is Vercel-ready (`vercel.json` pins the Vite framework, build command, `dist` output, SPA rewrite, security headers and long-term asset caching). No env vars required.

The production domain is **`mirea-nicole.vercel.app`** — it is derived from the Vercel **project name**, so the project must be named `mirea-nicole`.

### Option A — Vercel CLI

```bash
npm i -g vercel
vercel            # first run: set project name to "mirea-nicole" when prompted
vercel --prod     # promote to production → https://mirea-nicole.vercel.app
```

### Option B — Vercel dashboard

1. Push this folder to a Git repo (GitHub/GitLab/Bitbucket).
2. Vercel → **Add New… → Project** → import the repo.
3. Set **Project Name** to `mirea-nicole` (this fixes the domain to `mirea-nicole.vercel.app`).
4. Framework preset auto-detects **Vite**. Deploy.

If the project was named something else, rename it under **Settings → General → Project Name**; the `.vercel.app` domain follows the project name. (`mirea-nicole.vercel.app` must be available in your scope.)

## Notes

- Large static assets live in `public/media/` (background video + scroll/frame images) and are cached immutably for one year.
- No router — single page with in-page anchor navigation; the SPA rewrite is a safety net.
