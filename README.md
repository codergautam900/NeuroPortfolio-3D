<div align="center">

# ✦ NeuroPortfolio 3D

### A cinematic, AI-powered 3D developer portfolio built with Next.js & Three.js

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-r183-000000?style=for-the-badge&logo=threedotjs)](https://threejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)

</div>

---

## 🚀 Overview

**NeuroPortfolio 3D** is an immersive, cinematic developer portfolio experience combining real-time 3D graphics, smooth animations, and AI-powered interactions. It pushes the limits of what a personal website can be — featuring physics simulations, post-processing visual effects, scroll-driven animations, and a built-in AI oracle that talks about the developer.

> A portfolio that doesn't just *show* your work — it *immerses* visitors in it.

---

## ✨ Features

- 🌌 **Real-time 3D Scenes** — Built with React Three Fiber & Three.js, with physics via Rapier
- 🎞️ **Cinematic Animations** — Scroll-driven storytelling using GSAP & Framer Motion
- 🤖 **AI Oracle** — Ask the site anything about the developer via an integrated AI chat (powered by OpenAI)
- ✍️ **AI Tagline Generator** — Dynamic taglines generated on-the-fly using AI
- 🌊 **Smooth Scrolling** — Buttery lenis-powered scrolling experience
- 💌 **Contact Form** — Email delivery via Resend
- 🎨 **Post-Processing Effects** — Bloom, depth of field, and other visual FX via `@react-three/postprocessing`
- 📱 **Responsive Design** — Looks stunning on every screen size
- ⚡ **Optimized Fonts** — Syne, Manrope & Space Mono via `@fontsource`

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) |
| **Language** | TypeScript 5 |
| **3D Engine** | [Three.js](https://threejs.org/) + [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) |
| **3D Helpers** | [@react-three/drei](https://github.com/pmndrs/drei) |
| **Physics** | [@react-three/rapier](https://github.com/pmndrs/react-three-rapier) |
| **Post FX** | [@react-three/postprocessing](https://github.com/pmndrs/react-postprocessing) |
| **Animations** | [Framer Motion 12](https://www.framer.com/motion/) + [GSAP 3](https://gsap.com/) |
| **Smooth Scroll** | [Lenis](https://github.com/darkroomengineering/lenis) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) |
| **AI** | [Vercel AI SDK](https://sdk.vercel.ai/) + OpenAI |
| **Email** | [Resend](https://resend.com/) + React Email |
| **Icons** | [Lucide React](https://lucide.dev/) |

---

## 📂 Project Structure

```
.
├── app/                    # Next.js App Router
│   ├── api/
│   │   ├── oracle/         # AI chat API route
│   │   └── tagline/        # AI tagline generator API route
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Main portfolio page
├── public/                 # Static assets (models, textures, images)
├── next.config.ts          # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json
```

---

## 🏁 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** / yarn / pnpm / bun
- An **OpenAI API key** for the AI features
- A **Resend API key** for the contact form

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/codergautam900/NeuroPortfolio-3D.git
cd NeuroPortfolio-3D

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# OpenAI — used for the AI Oracle & tagline generator
OPENAI_API_KEY=your_openai_api_key_here

# Resend — used for the contact form email delivery
RESEND_API_KEY=your_resend_api_key_here
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. 🎉

### Building for Production

```bash
npm run build
npm run start
```

---

## 🤖 AI Features

### Oracle (`/api/oracle`)
An AI-powered chat endpoint that answers questions about the developer. Visitors can ask it anything — experience, tech stack, projects, and more. Built with the Vercel AI SDK and OpenAI.

### Tagline Generator (`/api/tagline`)
Generates a unique, creative tagline on each visit to keep the portfolio feeling fresh and dynamic.

---

## 📦 Key Dependencies

```json
{
  "@react-three/fiber":        "Real-time 3D rendering in React",
  "@react-three/drei":         "Useful 3D helpers & abstractions",
  "@react-three/rapier":       "Physics engine for 3D objects",
  "@react-three/postprocessing": "Visual post-processing effects",
  "framer-motion":             "Declarative animations & gestures",
  "gsap":                      "Scroll-driven & timeline animations",
  "lenis":                     "Smooth scroll experience",
  "ai":                        "Vercel AI SDK for streaming AI responses",
  "resend":                    "Email delivery for the contact form"
}
```

---

## 🚢 Deployment

The easiest way to deploy is on **[Vercel](https://vercel.com)** — the platform built for Next.js:

1. Push your code to GitHub
2. Import the repository on [vercel.com/new](https://vercel.com/new)
3. Add your environment variables (`OPENAI_API_KEY`, `RESEND_API_KEY`) in the Vercel dashboard
4. Click **Deploy** 🚀

> [!TIP]
> Vercel automatically handles the build process and gives you a free global CDN, perfect for a portfolio!

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

**Built with ❤️ by [Gautam](https://github.com/codergautam900)**

*If you like this project, consider giving it a ⭐ on GitHub!*

</div>
