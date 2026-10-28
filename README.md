# FocalForge Studios — 3D Portfolio Website

A responsive React + Vite portfolio for FocalForge Studios, Kampala, Uganda. It uses React Three Fiber / Three.js for floating 3D photo panels, Framer Motion for transitions, and a responsive editorial layout.

## Features
- Interactive 3D hero with floating image panels
- Responsive navigation and mobile menu
- Filterable portfolio gallery and project detail modals
- Studio services, about section, and project enquiry form
- Dark editorial styling with cyber-orange accents
- Reduced-motion accessibility support
- GitHub Pages deployment workflow

## Run locally
Requires Node.js 18 or newer.

```bash
npm install
npm run dev
```

## Production build
```bash
npm run build
npm run preview
```

## Images
The gallery currently uses remote sample photography from Unsplash so the site renders immediately. The original photographs supplied in the chat have **not yet been uploaded as binary assets** to this repository. To use those exact photos, add them to `public/assets/` and update the image URLs in `src/App.jsx` to local paths such as `/assets/portrait-01.jpg`.

## Contact form
The form opens the visitor's email app with a pre-filled message addressed to `billing@focalforgestudios.com`. It does not store submissions on a server. Connect a form backend or CRM before relying on it for production leads.

## Deploy
A GitHub Actions workflow is included for GitHub Pages. In the repository, open **Settings → Pages** and set the source to **GitHub Actions**. Pushes to `main` will then build and deploy the site.

## Before launch
- Replace the sample Unsplash images with portfolio images you have permission to publish.
- Confirm the contact email and replace placeholder social links with official profiles.
- Test the enquiry flow and connect a backend if you need reliable lead storage.
