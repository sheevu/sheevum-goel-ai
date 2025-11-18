# 🚀 Sheevum Goel – Founder Portfolio (Vite + React)

This is a production-ready, animated founder portfolio for **Sheevum Goel** – Founder of Sudarshan AI Labs, built with Vite + React + Tailwind.

## ✅ Features

- Gradient-heavy, neon dark UI
- Swadeshi CRM (Vyapaar OS) highlight section
- All key CTAs wired from simple.bio profile
- Responsive layout for mobile, tablet, desktop
- Ready for GitHub + Netlify deployment

## 📁 Structure

- `index.html` – Vite entry
- `vite.config.js` – Vite + React config
- `src/App.jsx` – Full portfolio UI
- `src/main.jsx` – React mount
- `src/index.css` – Tailwind setup
- `public/` – Favicon + (optional) images

## 🖼 Images

Put your images in:

- `public/images/IMG20221213220820-ANIMATION.gif`
- etc…

Then update them in `src/App.jsx` if needed.

## 🔧 Local Dev

```bash
npm install
npm run dev
```

## 🏗 Build

```bash
npm run build
```

## 🌐 Deploy to GitHub + Netlify

1. Create a repo, e.g. `sheevum-goel-ai`
2. Push this folder:

```bash
git init
git add .
git commit -m "Sheevum Goel founder portfolio"
git branch -M main
git remote add origin https://github.com/sheevu/sheevum-goel-ai.git
git push -u origin main
```

3. On Netlify: New Site from Git → select repo  
   - Build command: `npm run build`
   - Publish directory: `dist`
