# Immanuel Restaurant

Website for Immanuel Restaurant INC, 799 Stanley Avenue, Brooklyn (East New York). Panamanian
frituras, soul food and breakfast from Chef Yonayka Bryant Green, since June 2018.

The old sites (immanuelrest.com, immanuelrestaurantinc.com) are down. This replaces them.

## The idea

Set the table. The hero is the restaurant's own corn empanada photo, served as a round plate with
their logo line turning around it. Below it, four hand-drawn SVG plates of real dishes you can
switch between under "What are you hungry for?". Design notes live in `DESIGN.md`; photo sources
in `raw messy data/media/SOURCES.md`.

## Stack

- Next.js 16 (App Router), TypeScript, plain CSS with tokens (`src/app/globals.css`)
- GSAP (ticker, SplitText, page transitions), CSS animations for the illustrations
- Fonts self-hosted: Gloock (display, via next/font/google) and Switzer (text, `src/fonts`)

## Where things live

| What | File |
|---|---|
| Every business fact (address, phone, hours, links, story, reviews, honors) | `src/data/site.ts` |
| The menu and prices | `src/data/menu.ts` |
| Hero photo (self-hosted) and its animated plate | `public/photos/`, `src/components/home/HeroPhoto.tsx` |
| Food illustrations (pieces and plates) | `src/components/food/` |
| Home page and the plate switcher | `src/app/page.tsx`, `src/components/home/` |

Corrections are one-line edits in `src/data/site.ts` or `src/data/menu.ts`.

## Run

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start
```

## Before launch (owner to confirm)

- Hours (the site uses Mon, Tue, Thu, Fri, Sat 7 AM to 7 PM; Wed 7 AM to 5 PM; Sun closed)
- Spelling of the owner's first name (Yonayka is used)
- Which prices to show (online-ordering prices from Nov 2026 are used)
- A vector logo file, and real food and storefront photography
- The production domain (`site.url`, assumed https://immanuelrest.com)
