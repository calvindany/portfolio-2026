# Portfolio – Fullstack Developer

A clean, dark-terminal aesthetic portfolio built with React + Vite. All content is driven from a single JSON file.

## 📁 Project Structure

```
portfolio/
├── public/
│   └── favicon.svg
├── src/
│   ├── data/
│   │   └── portfolio.json   ← Edit all your content here
│   ├── App.jsx              ← Main app (all components + styles)
│   └── main.jsx             ← Entry point
├── index.html
├── vite.config.js
├── vercel.json
└── package.json
```

## ✏️ Updating Content

All your personal data lives in **`src/data/portfolio.json`**. Just edit that file:

- `personal` — name, title, bio, email, location, LinkedIn, GitHub
- `experience` — work history with company, role, period, description, stack
- `projects` — projects with optional `github` and `production` links (set to `null` if not available)
- `skills` — languages, backend, frontend, databases, devops, tools

## 🚀 Local Development

```bash
npm install
npm run dev
```

## 📦 Deploy to Vercel

**Option 1 – Vercel CLI:**
```bash
npm install -g vercel
vercel
```

**Option 2 – GitHub + Vercel Dashboard:**
1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → Import Project
3. Select your repo → Vercel auto-detects Vite → click Deploy

Build settings (auto-detected):
- Framework: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
