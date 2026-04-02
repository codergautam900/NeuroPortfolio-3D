<div align="center">

<br/>

```
███╗   ██╗███████╗██╗   ██╗██████╗  ██████╗
████╗  ██║██╔════╝██║   ██║██╔══██╗██╔═══██╗
██╔██╗ ██║█████╗  ██║   ██║██████╔╝██║   ██║
██║╚██╗██║██╔══╝  ██║   ██║██╔══██╗██║   ██║
██║ ╚████║███████╗╚██████╔╝██║  ██║╚██████╔╝
╚═╝  ╚═══╝╚══════╝ ╚═════╝ ╚═╝  ╚═╝ ╚═════╝
     P O R T F O L I O  ·  3 D
```

# ✦ NeuroPortfolio 3D

### *A cinematic, AI-powered 3D developer portfolio experience*

<br/>

[![Next.js](https://img.shields.io/badge/Next.js-16.2-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-r183-000000?style=for-the-badge&logo=threedotjs&logoColor=white)](https://threejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-brightgreen?style=for-the-badge)](LICENSE)

<br/>

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/codergautam900/NeuroPortfolio-3D)

<br/>

> **"A portfolio that doesn't just *show* your work — it *immerses* visitors in it."**

<br/>

---

</div>

## 📖 Table of Contents

- [✨ What Makes This Special](#-what-makes-this-special)
- [🌌 Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📂 Project Structure](#-project-structure)
- [🏁 Getting Started](#-getting-started)
- [🔐 Environment Variables](#-environment-variables)
- [🤖 AI Features](#-ai-features)
- [🎬 Animations & 3D Pipeline](#-animations--3d-pipeline)
- [🚢 Deployment](#-deployment)
- [⚡ Performance Tips](#-performance-tips)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ What Makes This Special

**NeuroPortfolio 3D** isn't a template — it's a statement. While most portfolios are static pages with project cards, this one is a fully immersive **3D cinematic experience** that guides visitors through your story with physics, post-processing effects, and an AI that speaks on your behalf.

| Ordinary Portfolio | NeuroPortfolio 3D |
|---|---|
| Static HTML / CSS | Real-time WebGL 3D scenes |
| Basic scroll | Physics-driven interactions via Rapier |
| Contact form | AI Oracle + streaming chat |
| Generic animations | GSAP scroll-timelines + Framer Motion |
| Boring taglines | AI-generated taglines on every visit |
| Flat lighting | Bloom, depth of field, post-processing FX |

---

## 🌌 Features

<br/>

### 🎮 3D & Visuals
- **Real-time 3D Scenes** — Built with React Three Fiber on top of Three.js, achieving GPU-accelerated rendering directly in the browser
- **Physics Simulation** — Rigid body & collider physics via `@react-three/rapier` (Rapier WASM engine)
- **Post-Processing FX** — Bloom, depth-of-field, vignette, and more via `@react-three/postprocessing`
- **Cinematic Camera Work** — Controlled camera paths and orbital transitions for a film-quality feel

### 🤖 AI & Intelligence
- **AI Oracle** — An embedded streaming chat endpoint (`/api/oracle`) trained with context about the developer, letting visitors ask anything
- **AI Tagline Generator** — Unique, creative taglines generated via OpenAI on every visit, using `/api/tagline`
- **Vercel AI SDK** — Streaming responses, structured output, and OpenAI integration with minimal boilerplate

### 🎞️ Motion & Scroll
- **Scroll-Driven Storytelling** — GSAP ScrollTrigger drives 3D scene transitions as users scroll
- **Framer Motion** — Declarative React animations for UI elements, page transitions, and micro-interactions
- **Lenis Smooth Scroll** — Buttery-smooth, momentum-based scrolling for a premium feel

### 💌 Contact & Communication
- **Contact Form** — Fully functional email delivery via **Resend** + **React Email** components
- **Zod Validation** — Server-side input validation to keep everything safe and type-correct

### 🎨 Design & UX
- **Responsive Design** — Flawlessly adapts across all screen sizes from mobile to ultrawide
- **Optimized Typography** — **Syne**, **Manrope**, and **Space Mono** served locally via `@fontsource`
- **Utility-First Styling** — Tailwind CSS v4 with `tailwind-merge` and `clsx` for clean conditional classes
- **Lucide Icons** — A lean, consistent icon set across the entire UI

---

## 🛠️ Tech Stack

```
┌─────────────────────────────────────────────────────┐
│                   NeuroPortfolio 3D                 │
│                                                     │
│  ┌──────────────────────────────────────────────┐   │
│  │               Next.js 16 (App Router)        │   │
│  │    TypeScript 5  ·  Tailwind CSS v4          │   │
│  └────────────────────┬─────────────────────────┘   │
│                       │                             │
│        ┌──────────────┼──────────────┐              │
│        ▼              ▼              ▼              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐          │
│  │  3D/WebGL│  │  Motion  │  │    AI    │          │
│  │          │  │          │  │          │          │
│  │ Three.js │  │  Framer  │  │  OpenAI  │          │
│  │  RTF/R3F │  │  Motion  │  │ Vercel   │          │
│  │  Drei    │  │  GSAP    │  │  AI SDK  │          │
│  │  Rapier  │  │  Lenis   │  │          │          │
│  │  PostFX  │  │          │  │          │          │
│  └──────────┘  └──────────┘  └──────────┘          │
│                                                     │
│  ┌──────────────────────────────────────────────┐   │
│  │            Infrastructure                    │   │
│  │   Vercel · Resend · React Email · Zod        │   │
│  └──────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

| Layer | Technology | Version |
|---|---|---|
| **Framework** | [Next.js](https://nextjs.org/) (App Router) | 16.2.1 |
| **Language** | TypeScript | ^5 |
| **UI Library** | React | 19.2.4 |
| **3D Engine** | [Three.js](https://threejs.org/) | ^0.183 |
| **3D React Bindings** | [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) | ^9.5 |
| **3D Helpers** | [@react-three/drei](https://github.com/pmndrs/drei) | ^10.7 |
| **Physics** | [@react-three/rapier](https://github.com/pmndrs/react-three-rapier) | ^2.2 |
| **Post-Processing** | [@react-three/postprocessing](https://github.com/pmndrs/react-postprocessing) | ^3.0 |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) | ^12.38 |
| **Scroll Timelines** | [GSAP](https://gsap.com/) | ^3.14 |
| **Smooth Scroll** | [Lenis](https://github.com/darkroomengineering/lenis) | ^1.3 |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | ^4 |
| **AI** | [Vercel AI SDK](https://sdk.vercel.ai/) + OpenAI | ^6.0 |
| **Email** | [Resend](https://resend.com/) + React Email | ^6.10 |
| **Validation** | [Zod](https://zod.dev/) | ^4.3 |
| **Icons** | [Lucide React](https://lucide.dev/) | ^1.7 |

---

## 📂 Project Structure

```
NeuroPortfolio-3D/
│
├── 📁 app/                         # Next.js App Router root
│   ├── 📁 api/
│   │   ├── 📁 oracle/              # AI chat — streams answers about the dev
│   │   │   └── route.ts
│   │   └── 📁 tagline/            # AI tagline generator endpoint
│   │       └── route.ts
│   ├── layout.tsx                  # Root layout (fonts, providers, metadata)
│   └── page.tsx                    # Main portfolio page (entry point)
│
├── 📁 public/                      # Static assets
│   ├── 📁 models/                  # GLTF/GLB 3D models
│   ├── 📁 textures/                # Texture maps (env maps, materials)
│   └── 📁 images/                  # Static images & OG images
│
├── next.config.ts                  # Next.js + WebAssembly config (for Rapier)
├── tailwind.config.ts              # Tailwind CSS v4 configuration
├── tsconfig.json                   # TypeScript compiler options
├── postcss.config.mjs              # PostCSS pipeline
└── package.json                    # Dependencies & scripts
```

---

## 🏁 Getting Started

### Prerequisites

Make sure you have the following installed:

| Tool | Version | Link |
|---|---|---|
| Node.js | ≥ 18.x | [nodejs.org](https://nodejs.org/) |
| npm / pnpm / yarn | latest | — |
| Git | any | [git-scm.com](https://git-scm.com/) |

You'll also need API keys for:
- 🤖 **OpenAI** — for the AI Oracle & tagline generator
- 📧 **Resend** — for the contact form email delivery

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/codergautam900/NeuroPortfolio-3D.git
cd NeuroPortfolio-3D

# 2. Install dependencies
npm install
# or
pnpm install

# 3. Set up environment variables
cp .env.example .env.local
# Then open .env.local and fill in your API keys (see below)

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser 🎉

---

## 🔐 Environment Variables

Create a `.env.local` file in the root directory with the following:

```env
# ─────────────────────────────────────────────────────────────
# OpenAI — AI Oracle conversation & tagline generation
# Get yours at: https://platform.openai.com/api-keys
# ─────────────────────────────────────────────────────────────
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# ─────────────────────────────────────────────────────────────
# Resend — Contact form email delivery
# Get yours at: https://resend.com/api-keys
# ─────────────────────────────────────────────────────────────
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

> [!WARNING]
> Never commit your `.env.local` file to Git. It's already included in `.gitignore`, but double-check before pushing!

> [!NOTE]
> Without `OPENAI_API_KEY`, the AI Oracle and tagline generator will not function. Without `RESEND_API_KEY`, the contact form will not send emails. The 3D visuals will still work normally.

---

## 🤖 AI Features

### 🔮 Oracle — `/api/oracle`

An intelligent, streaming chat endpoint powered by the **Vercel AI SDK** and **OpenAI**. The Oracle is given a system prompt with rich context about the developer — projects, skills, experience, personality. Visitors can ask it anything and get instant, streamed responses.

**How it works:**
```
User message → POST /api/oracle → OpenAI (stream) → Response chunks → UI
```

The response is streamed back token-by-token for a fast, conversational feel.

### ✍️ Tagline Generator — `/api/tagline`

Calls OpenAI on every visit to generate a fresh, creative tagline so the portfolio never feels stale. Taglines reflect the developer's personality and are constrained to be punchy and impactful.

**How it works:**
```
Page load → GET /api/tagline → OpenAI → unique tagline → Rendered in hero
```

---

## 🎬 Animations & 3D Pipeline

### Scroll-Driven 3D with GSAP
GSAP's `ScrollTrigger` plugin pins sections and orchestrates 3D camera movements, object animations, and scene transitions as the user scrolls. This creates a **narrative-driven experience** where each scroll position tells part of the story.

### Physics with Rapier
`@react-three/rapier` wraps the Rapier WASM physics engine, enabling real-time rigid body simulation, colliders, and gravity effects — all running at 60fps in the browser.

### Post-Processing Stack
The rendering pipeline applies effects on top of the Three.js scene using `@react-three/postprocessing`:
- **Bloom** — glowing highlights for lights and emissive materials
- **Depth of Field** — cinematic focus blur for depth
- **Vignette** — subtle dark edges for a cinematic frame

### Lenis + Framer Motion
Lenis intercepts native scroll events to provide momentum-based smooth scrolling, which feeds into GSAP's ScrollTrigger. Framer Motion handles all React UI animations, from page entry transitions to hover states and modal reveals.

---

## 🚢 Deployment

### Vercel (Recommended)

The fastest path from code to production:

1. Push your code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new) and import your repository
3. Add environment variables in the **Environment Variables** section:
   - `OPENAI_API_KEY`
   - `RESEND_API_KEY`
4. Click **Deploy** 🚀

> [!TIP]
> Vercel auto-detects Next.js, handles incremental builds, and gives you a globally distributed CDN — perfect for a portfolio that needs to load fast everywhere.

### Self-Hosted / Other Platforms

```bash
# Build the production bundle
npm run build

# Start the production server
npm run start
```

Make sure your platform supports **Node.js ≥ 18** and set the environment variables in your hosting dashboard.

> [!IMPORTANT]
> Rapier uses WebAssembly. Ensure your CDN/host serves `.wasm` files with the correct `Content-Type: application/wasm` header. Vercel handles this automatically.

---

## ⚡ Performance Tips

- **3D model optimization** — Use tools like [gltf-transform](https://gltf-transform.donmccurdy.com/) or Blender to compress GLTF models before adding them to `/public/models/`
- **Texture compression** — Use `.ktx2` (Basis Universal) textures with drei's `useKTX2` for best GPU performance
- **Lazy-load 3D scenes** — Use `React.lazy` + `Suspense` around heavy canvas components so they don't block the initial paint
- **Reduce draw calls** — Merge static geometries and use instanced meshes for repeated objects
- **Environment maps** — Use compressed `.hdr` files at 512px resolution for environment lighting

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Here's how to get started:

```bash
# 1. Fork the repository on GitHub

# 2. Create your feature branch
git checkout -b feat/your-amazing-feature

# 3. Commit your changes
git commit -m "feat: add your amazing feature"

# 4. Push to the branch
git push origin feat/your-amazing-feature

# 5. Open a Pull Request
```

Please follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.

---

## 📄 License

This project is open-source and available under the **[MIT License](LICENSE)**.

```
MIT License — feel free to use, modify, and distribute with attribution.
```

---

<div align="center">

<br/>

```
  ╔═══════════════════════════════════════╗
  ║   Built with ❤️ by Gautam             ║
  ║   github.com/codergautam900           ║
  ╚═══════════════════════════════════════╝
```

**If this project wowed you, drop a ⭐ on GitHub — it means a lot!**

<br/>

[![GitHub stars](https://img.shields.io/github/stars/codergautam900/NeuroPortfolio-3D?style=social)](https://github.com/codergautam900/NeuroPortfolio-3D/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/codergautam900/NeuroPortfolio-3D?style=social)](https://github.com/codergautam900/NeuroPortfolio-3D/network/members)
[![GitHub issues](https://img.shields.io/github/issues/codergautam900/NeuroPortfolio-3D?style=social)](https://github.com/codergautam900/NeuroPortfolio-3D/issues)

<br/>

*Made in India 🇮🇳 · Powered by WebGL, AI & ☕*

</div>
