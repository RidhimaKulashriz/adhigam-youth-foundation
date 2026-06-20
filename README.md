# Adhigam Youth Foundation – Official Website

This is the official website for **Adhigam Youth Foundation**, a non‑profit organisation dedicated to empowering communities through education, awareness, and skill development.  
The site is built with **SvelteKit** and features smooth scrolling, parallax effects, and interactive 3D elements – all customised to reflect the foundation’s brand and mission.

---

## Features

- Smooth scrolling with **Lenis**
- Scroll‑triggered animations and parallax
- Interactive 3D model (Three.js – optional)
- Fully responsive – mobile, tablet, desktop
- Lightweight and fast
- Clear, mission‑driven content
- Easy to update – content is centralised in components

---

## Tech Stack

- **SvelteKit** – frontend framework
- **Lenis** – smooth scroll engine
- **GSAP** – animations
- **Three.js** – 3D visuals (hand model)
- **TypeScript** – type safety
- **SCSS** – styling

---

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Installation

```bash
git clone https://github.com/RidhimaKulashriz/adhigam-youth-foundation.git
cd adhigam-youth-foundation
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The site will be available at [http://localhost:5173](http://localhost:5173).

### Production Build

```bash
npm run build
```

The build output is placed in the `build` folder (or a platform‑specific folder if you use a custom adapter).

### Preview the Production Build

```bash
npm run preview
```

---

## Deployment

The project uses `@sveltejs/adapter-auto`, which works out‑of‑the‑box with:

- **Vercel** (recommended – automatic deployments on push)
- **Netlify**
- **Cloudflare Pages**
- Any static hosting (upload the `build` folder)

### Deploy to Vercel (quickest)

1. Push your code to a Git repository (GitHub, GitLab, etc.).
2. Go to [Vercel](https://vercel.com) and import the repository.
3. Vercel will detect SvelteKit and deploy automatically.

---

## Customisation

All content and styling are located in `src/lib/components/`.  
Key files you may want to edit:

| File | Purpose |
|------|---------|
| `Footer.svelte` | Footer with contact details, social links, and copyright |
| `LNS.svelte` | The main logo displayed in the intro animation |
| `HeroTextIn.svelte` | The hero mission statement |
| `FeatureCards/FeatureCards.svelte` | The volunteer benefits cards |
| `Parallax.svelte` | Text sections with parallax effect |
| `Scrollbar.svelte` | The scroll progress indicator |

### Colour Palette

| Role | Hex |
|------|-----|
| Primary (Deep Blue) | `#1a365d` |
| Secondary (Orange) | `#ed8936` |
| Accent (Gold) | `#ecc94b` |
| Background (Light) | `#f7fafc` |
| Text (Dark) | `#2d3748` |

---

## Credits

This website is based on the original [Lenis smooth scroll demo](https://github.com/studio-freight/lenis) by Studio Freight, but has been heavily customised for the Adhigam Youth Foundation.  
All rights to the original code structure belong to the respective authors. This adaptation is used with permission for non‑commercial, educational, and charitable purposes.

---

## License

This project is intended for demonstration and educational use.  
For commercial applications, please refer to the original repository’s license.

---

## Contact

For questions regarding this website, please open an issue on the [GitHub repository](https://github.com/RidhimaKulashriz/adhigam-youth-foundation).
