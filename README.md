# thai-quiz-2 (fixed)

- Vite + React + PWA
- Mobile-first (phone frame), works on desktop too
- Category -> questions mapping is a single source of truth so category-click never becomes a blank screen.

## Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy (Vercel)

- Framework: Vite
- Build Command: `npm run build`
- Output Directory: `dist`

## Edit content only

All quiz content lives in:

- `src/data/quizContent.ts`

Do **not** change component structure if you only want to update content.

### Optional fields

- `thai` and `pronRoman` are optional. Leave empty/undefined and UI will not render them.
