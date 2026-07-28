# Banaras Hospital — Website

A modern, animated marketing website for **Banaras Hospital** (Banjari More, Gopalganj, Bihar) — built as static HTML/CSS/JS with no build step required.

## ✨ Design

- **Palette** — deep teal (`#0F3D3A`) for trust, warm ivory (`#FAF7F1`) paper background, amber gold (`#E2A63B`) for calls-to-action and warmth.
- **Type** — `Fraunces` (display serif) paired with `Manrope` (body sans) for an editorial, trustworthy feel.
- **Signature motif** — an animated ECG "pulse line" that draws itself in the hero and re-appears as a section divider, tying the visual language back to cardiology/hospital care.
- **Motion** — scroll-triggered reveals, animated stat counters, magnetic buttons, glassmorphism sticky nav, hover-lift cards, and a lightbox viewer on the gallery — all built with lightweight vanilla JS (`IntersectionObserver`, no animation library dependency). Respects `prefers-reduced-motion`.

All original copy, contact details, doctor information, service list, map embed, and images are unchanged — only the presentation layer was rebuilt.

## 📁 Project Structure

```
Banaras-Hospital-Website/
├── index.html                  # Home page (hero, about, services, doctors, location, contact)
├── gallery.html                # Photo gallery page (masonry + lightbox)
├── README.md
└── assets/
    ├── css/
    │   ├── style.css            # Design tokens + all styles for index.html
    │   └── gallery.css          # Styles specific to gallery.html
    ├── js/
    │   ├── main.js               # Nav, scroll-reveal, counters, back-to-top, appointment form
    │   └── gallery.js            # Masonry layout + lightbox viewer
    └── images/
        ├── branding/             # Logo/hero/about imagery (bhimg.png, bhlogimg.jpg)
        ├── services/              # Service card images (Emergency, ICU, Surgery, Cardio, Ortho, Pathology)
        ├── doctors/                # Doctor profile photos
        └── gallery/                 # Gallery masonry photos
```

## 🚀 Running locally

No build tools needed — just open `index.html` in a browser, or serve the folder:

```bash
npx serve .
# or
python3 -m http.server 8000
```

## 🔧 Notes for editing

- Design tokens (colors, radii, shadows, fonts) live at the top of `assets/css/style.css` under `:root` — change them once to re-theme the whole site.
- The appointment form posts to Formspree (`action="https://formspree.io/f/xyznpkeq"`) — update the endpoint in `index.html` if you set up your own form.
- Doctor names, fees, timings, and phone/email details are plain text in `index.html` — search and edit directly.
