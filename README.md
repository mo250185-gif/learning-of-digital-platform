# The Learning of Digital Platform

A learning journal for weekly guest speaker sessions, built with React, Vite and Tailwind CSS.

## Run it

```bash
npm install
npm run dev      # local preview at http://localhost:5173
npm run build    # production files in dist/
```

## Add a new week

1. Put the week's images in `src/assets/` (for example `week03-cover.jpg`).
2. Import them at the top of `src/App.jsx`:
   `import week03Cover from "./assets/week03-cover.jpg";`
3. Add a new object to the **top** of the `POSTS` array (newest first). Copy the Week 02 entry and change:
   - `id`, `week`, `date`, `title`
   - `speakers`, `affiliation`
   - `cover` (image + short description) and `excerpt` (shown on the card)
   - `body`: a list of `{ p: "paragraph" }` blocks; add `{ img: week03Photo, alt: "..." }` anywhere to place an image between paragraphs
   - `reflection`: your reflection paragraph(s)
   - `closing` (optional): an image shown at the end of the article

## Personalise

In `About()` replace "Your Name", the bio, the LinkedIn URL and the email address.
