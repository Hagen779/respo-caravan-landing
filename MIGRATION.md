# React to Next.js Landing Migration

This document describes the migration of the Respo Caravan landing page from the React (Vite) project to Next.js and the resulting structure.

## Folder structure

```
respo-caravan-landing/
├── app/
│   ├── layout.tsx          # Root layout, Toaster, metadata
│   ├── page.tsx             # Landing page (client wrapper + sections)
│   ├── globals.css          # Tailwind, theme variables, scrollbar, Ant overrides
│   └── fonts.css            # Font references (optional @font-face)
├── components/
│   ├── Navbar/
│   │   └── Navbar.tsx
│   ├── Hero/
│   │   └── Hero.tsx
│   ├── TrailerTypes/
│   │   └── TrailerTypes.tsx
│   ├── Configurations/
│   │   └── Configurations.tsx
│   ├── TechnicalSpecs/
│   │   └── TechnicalSpecs.tsx
│   ├── Advantages/
│   │   └── Advantages.tsx
│   ├── PriceCalculator/
│   │   └── PriceCalculator.tsx
│   ├── CTASection/
│   │   └── CTASection.tsx
│   ├── Footer/
│   │   └── Footer.tsx
│   ├── ConsultationForm/
│   │   └── ConsultationForm.tsx
│   └── FloatingFeedbackButton/
│       └── FloatingFeedbackButton.tsx
├── contexts/
│   └── LanguageContext.tsx  # EN/UA translations and provider
├── public/
│   └── images/
│       └── README.md        # Which assets to add (logos, trailer images, etc.)
├── next.config.ts           # images.remotePatterns for Unsplash
├── package.json
└── tsconfig.json
```

## Section components (render order)

| Order | Section             | Component               | Id / notes        |
|-------|--------------------|-------------------------|-------------------|
| 1     | Navigation         | `Navbar`                | Fixed, sticky     |
| 2     | Hero               | `Hero`                  | `#hero`           |
| 3     | Trailer types      | `TrailerTypes`          | `#types`          |
| 4     | Configurations     | `Configurations`        | `#configurations` |
| 5     | Technical specs    | `TechnicalSpecs`        | `#specs`          |
| 6     | Advantages         | `Advantages`           | `#advantages`     |
| 7     | Price calculator   | `PriceCalculator`       | `#calculator`     |
| 8     | Final CTA          | `CTASection`            | —                 |
| 9     | Footer             | `Footer`                | —                 |
| 10    | Floating feedback  | `FloatingFeedbackButton`| Fixed bottom-right |
| —     | Consultation modal | `ConsultationForm`      | Modal             |

## How the main page imports and renders sections

The landing is implemented as a **client** page because it uses shared state (trailer type, configuration, consultation modal) and scroll behavior.

- **`app/page.tsx`**  
  - Default export: `LandingPage`.  
  - Wraps the app in `LanguageProvider` and Ant Design `ConfigProvider` (Respo theme).  
  - Renders an inner `LandingContent` that holds:
    - `useState` for `selectedTrailerType`, `selectedConfig`, `consultationFormOpen`
    - Handlers that scroll to `#configurations` or `#specs` and open the consultation modal
  - Renders sections in the order above; each section is a separate component under `components/`.

Example of how sections are composed:

```tsx
// app/page.tsx (conceptually)
<LanguageProvider>
  <ConfigProvider theme={...}>
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero onCTAClick={() => setConsultationFormOpen(true)} />
      <TrailerTypes selectedType={...} onSelectType={...} />
      <Configurations selectedConfig={...} onSelectConfig={...} onOrderClick={...} selectedTrailerType={...} />
      <TechnicalSpecs trailerType={...} configType={...} />
      <Advantages />
      <PriceCalculator trailerType={...} configType={...} onGetProposal={...} />
      <CTASection onCTAClick={...} />
      <Footer />
      <FloatingFeedbackButton onClick={...} />
      <ConsultationForm open={...} onClose={...} />
    </div>
  </ConfigProvider>
</LanguageProvider>
```

## Example: one section component

**Hero** (`components/Hero/Hero.tsx`):

- **Props:** `onCTAClick: () => void` for the main CTA.
- **Behavior:** Client component (`'use client'`), slider with `useState`/`useEffect`, motion animations, uses `useLanguage()` for copy.
- **Assets:** Hero backgrounds are Unsplash URLs (and optional first slide from `/public/images/`); no Figma imports.
- **Styling:** Tailwind classes and inline `style` for clamp font size and text shadow to match the original pixel‑perfect layout.

Same pattern for other sections: clear props, `'use client'` where needed (hooks, Ant Design, motion), and Tailwind + minimal inline styles for exact match.

## Images and assets

- **Local:** Place files in `public/images/` (see `public/images/README.md`). Referenced as `/images/...` (e.g. logos, trailer type images, config background, footer logo).
- **Remote:** Unsplash URLs are used for hero slides and configuration cards. `next.config.ts` configures `images.remotePatterns` for `images.unsplash.com` so `next/image` can be used if you switch to it later.
- **No missing images:** Hero uses Unsplash by default so the page works without any local assets; add optional files as in the README for a full pixel‑perfect match.

## Styling

- **Global:** `app/globals.css` imports Tailwind, theme variables (`--respo-orange`, etc.), smooth scroll, custom scrollbar (Respo orange), and Ant Design primary button / checkbox overrides.
- **Per section:** Tailwind utility classes and inline `style` where needed (e.g. `#FF5A2F`, clamp, shadows). No duplicated global styles; section-specific styles live in each component file.

## Best practices for keeping a pixel‑perfect design

1. **Don’t change layout or spacing** – Keep section padding/margins, grid gaps, and max-widths (e.g. `max-w-6xl`, `py-12 px-4`) identical to the React version.
2. **Preserve typography** – Same font stacks and sizes (including `clamp()` for hero); use CSS variables in `globals.css` if you centralize later.
3. **Match colors** – Use the same hex values (e.g. `#FF5A2F`) in Tailwind or inline styles; avoid replacing with generic tokens unless you update the design system.
4. **Responsive behavior** – Keep breakpoints and visibility (e.g. `md:flex`, `hidden md:block`) the same so desktop/mobile match the original.
5. **Assets** – Use the same image crop and aspect ratio; prefer Next.js `Image` for local/remote images when you want optimization, and keep dimensions/object-fit consistent.
6. **One section per component** – Easier to compare with the original and to adjust a single section without side effects.
7. **Shared state in one place** – Keep `selectedTrailerType`, `selectedConfig`, and `consultationFormOpen` in the page (or a small wrapper) and pass props/callbacks so section components stay presentational and testable.

## Running the project

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Add images under `public/images/` as described in `public/images/README.md` for logos and optional graphics.
