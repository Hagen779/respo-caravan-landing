# Landing page images

Optional assets for a pixel-perfect match with the original design. The app works without these (hero uses Unsplash; logos and config background fall back to layout/placeholder if missing).

| Filename | Usage |
|----------|--------|
| `logo-horizontal.png` | Navigation & mobile drawer logo |
| `logo-text.png` | Optional text logo |
| `hero-trailer.png` | Optional first hero slider image (replace first Unsplash slide) |
| `trailer-wide.png` | Camper Wide card image |
| `trailer-offroad.png` | Camper Off-Road card image |
| `config-bg.png` | Configurations section background (legacy) |
| `config-section-bg.jpg` | Choose Configuration section background (trailer in nature; use this for the expressive background with ~12% visibility) |
| `logo-vertical.png` | Footer logo |

Export from your Figma file or copy from the React project’s build output. External images (e.g. Unsplash) are loaded from URLs in the components. All images use Next.js `next/image` (WebP/AVIF, responsive sizes, lazy loading). Keep source assets under ~2 MB and ~1920px width when possible.
