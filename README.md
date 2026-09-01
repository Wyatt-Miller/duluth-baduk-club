# Duluth Baduk Club — website

A small static site for the Duluth Baduk Club (a Go / baduk / weiqi club in
Duluth, MN). Front page only for now.

## Files

- `index.html` — the page
- `styles.css` — all styling (design tokens up top, then sections in page order)
- `script.js` — mobile menu, the "proverb of the day", and the next-meeting date
- `images/favicon.svg` — tab icon

No build step, no dependencies. The only external request is Google Fonts (two
woodblock-style typefaces, with a Georgia fallback). Open `index.html` directly,
or run any static server (e.g. `python -m http.server`) from this folder.

## Notes


- The **"Coming later"** section lists features that aren't built yet
  (ratings, game upload, gallery).
- The look shifts down the page through Go's three homes — Japan, then Korea,
  then China — over a constant goban-wood / sumi-ink base.

## Hosting

Deployed with GitHub Pages from this repo's `main` branch.
