# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Landing page for **La Cantina de Fredy's** — a Mexican restaurant.

Single-file architecture: `index.html` at root contains all HTML, CSS, and JavaScript.

## Stack

- **Architecture:** Plain HTML + embedded CSS + embedded JavaScript (no build step)
- **Fonts:** Google Fonts — Bebas Neue (display), Playfair Display (headings), Inter (body)
- **Icons:** Font Awesome 6.5 (CDN)
- **Animations:** GSAP 3.12 + ScrollTrigger (CDN)
- **Smooth scroll:** Lenis 1.1 (CDN)
- **Deployment:** Any static file host (GitHub Pages, Netlify, Vercel, shared hosting)

## Development

Open `index.html` directly in a browser, or serve with any static server:
```
npx serve .
```
or with Python:
```
python -m http.server 8080
```

## Asset structure

```
assets/
  raw/
    logo_cantina_fredys_transparent.webp   ← logo usado en web
    logo_cantina_fredys_transparent.png    ← favicon
    MENU LA CANTINA DE FREDYS.pdf          ← menú descargable
    LOGO CANTINA DE FREDYS.pdf
    photos_webp/
      cantina-photo-01.webp .. cantina-photo-17.webp
      the best/
        cantina-photo-03.webp .. (8 mejores fotos)
  to-use/
    img1.png .. img7.png  ← imágenes procesadas / destacadas
    img3.webp

docs/
  01-images/
    video1.mp4 .. video5.mp4   ← vídeos del restaurante
    WhatsApp Image *.jpeg      ← fotos originales WhatsApp
    WhatsApp Video *.mp4       ← vídeos originales WhatsApp
  02-prompts/
    prompt_claude_landing_cantina_fredys.md  ← prompt original del proyecto
```

## Key customization points (search for TODO: in index.html)

- `RESTAURANT` JS object (line ~580) — phone, WhatsApp number, address, Google Maps URL
- Google Maps iframe in `#map-frame` section
- Hero video: `docs/01-images/video1.mp4` — swap for best video
- Social media links (Instagram, Facebook, TikTok) — all set to `#` placeholder
- Dish prices — verify against real menu PDF
- Opening hours in `#horario` section
- Canonical URL and OG URL in `<head>`

## Architecture notes

- Light/dark theme via `data-theme` attribute on `<html>`, persisted in localStorage
- All contact data is centralized in `const RESTAURANT = {...}` — edit once, applies everywhere
- GSAP animations respect `prefers-reduced-motion`
- Images use `loading="lazy" decoding="async"` throughout
- The `the best` subfolder name has a space — HTML uses URL-encoded `the%20best` in src paths
