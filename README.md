# TOONIFY.AI

Landing page — transformation de photos en style anime énergique & comique.

Stack : **Vite + React 18 + TypeScript + Tailwind CSS 3** • Icônes : lucide-react.

## Lancer en local

```bash
npm install
npm run dev        # http://localhost:5173
```

## Build de production

```bash
npm run build      # génère ./dist
npm run preview    # prévisualise le build
```

## Déploiement GitHub Pages (automatique)

Le workflow `.github/workflows/deploy.yml` build et publie sur chaque push sur `main`.

À faire **une seule fois** sur GitHub :
**Settings → Pages → Build and deployment → Source = GitHub Actions**

URL publique : `https://mohamedaminesani-ui.github.io/toonify-ai/`

> Si tu changes le nom du repo, mets à jour `base` dans `vite.config.ts`
> (`base: '/<nom-du-repo>/'`), sinon les fichiers CSS/JS renverront du 404.

## Structure

```
src/
  App.tsx      # toute la landing page (nav + hero + grille des directives artistiques)
  main.tsx     # point d'entrée React
  index.css    # directives Tailwind
```
