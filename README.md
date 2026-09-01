# Duluth Baduk Club — website

A small static site for the Duluth Baduk Club (a Go / baduk / weiqi club in
Duluth, MN). Front page only for now.

## Files

- `index.html` — the page
- `styles.css` — all styling (design tokens up top, then sections in page order)
- `script.js` — mobile menu, the "proverb of the day", and the next-meeting date
- `images/favicon.svg` — tab icon
- `sitemap.xml`, `robots.txt` — for search engines

No build step, no dependencies. The only external request is Google Fonts (two
woodblock-style typefaces, with a Georgia fallback). Open `index.html` directly,
or run any static server (e.g. `python -m http.server`) from this folder.

## Notes


- The **"Coming later"** section lists features that aren't built yet
  (ratings, game upload, gallery).
- The look shifts down the page through Go's three homes — Japan, then Korea,
  then China — over a constant goban-wood / sumi-ink base.

## Hosting

Deployed with GitHub Pages from this repo's `main` branch, custom domain
`duluthbadukclub.com` (Cloudflare DNS, records set to "DNS only").

## SEO

In place: per-page `<title>` / description, canonical URL, Open Graph + Twitter
card tags, `SportsClub` JSON-LD, `sitemap.xml`, `robots.txt`.

Still to do (needs a Google account — can't be done from the repo):

1. **Google Search Console** — add `duluthbadukclub.com`, verify with a DNS TXT
   record in Cloudflare, submit `sitemap.xml`, and "Request indexing" for the
   homepage. This is what actually gets it into Google.
2. Add `images/og-image.png` (1200×630) and an `og:image` tag so shared links
   show a thumbnail.

(No Google Business Profile — the club has no premises of its own.)
