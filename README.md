# Mohammad Heib — Portfolio

React + TypeScript + Vite + Tailwind CSS + Framer Motion + Lucide.

## Run locally
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview    # preview the build
```

## Edit your content
All personal content lives in `src/data/`:
- `profile.ts` — name, headline, roles, links (GitHub, LinkedIn, email, resume), education, experience
- `skills.ts` — skill categories
- `projects.ts` — projects; set `github` / `demo` URLs to show buttons, `screenshot` to replace the placeholder preview

Resume: put a PDF in `public/` (e.g. `public/Mohammad-Heib-CV.pdf`) and set `links.resume` to `./Mohammad-Heib-CV.pdf`.
Screenshots: put images in `public/projects/` and set `screenshot: './projects/name.png'`.

## Structure
```
src/
  components/  Navbar, MagneticButton, Reveal, ParticleField, RoleTicker, ProjectPreview, SectionHeading
  sections/    Hero, About, Skills, Projects, Journey, Contact, Footer
  data/        profile.ts, skills.ts, projects.ts
  hooks/       useSpotlight, useActiveSection, useCopy
  styles/      index.css (design tokens + Tailwind layers)
```

## Deploy
Any static host works (Vercel, Netlify, GitHub Pages): build command `npm run build`, output folder `dist`.
