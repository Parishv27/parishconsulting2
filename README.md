# Parish Educational Consulting, LLC — Website

Premium single-page site for Parish Educational Consulting, built from the research in
`research/` (brand extraction, competitor analysis, build brief). Static HTML, CSS, and
vanilla JS with GSAP scroll animation. No build step required.

## Structure

```
netlify.toml                        Pins publish dir to site/, sets cache headers
research/                           Client deliverables (brand, competitors, brief, audit)
site/                               The publish directory
  index.html                        The site (single long-scroll page)
  competitive-analysis.html         Client-only report (noindex + robots.txt disallow)
  404.html                          Not-found page
  robots.txt / sitemap.xml
  css/style.css                     All styles, design tokens at the top
  js/main.js                        Nav drawer, reveals, GSAP, form handling
  assets/                           Self-hosted logo set, portrait, icons, OG image
```

## Deploy

**Netlify:** drag the project folder into Netlify, or connect the repo. `netlify.toml`
already points the publish directory at `site/`.

**Vercel:** add a `vercel.json` with `{ "outputDirectory": "site" }`, or set the output
directory to `site` in project settings.

**Local preview:**

```bash
cd site
python -m http.server 8765
```

## Before launch checklist

1. **Domain.** Replace `https://www.parisheducationalconsulting.com/` with the real domain in:
   `site/index.html` (canonical + OG tags + both JSON-LD blocks), `site/sitemap.xml`,
   `site/robots.txt`.
2. **Form.** Ships as a `mailto:` compose (opens the visitor's email app, pre-filled).
   To capture leads server-side instead, use Formspree: set
   `action="https://formspree.io/f/YOUR_ID" method="POST"` on `#consult-form` in
   `index.html` and delete the `consult-form` submit handler in `js/main.js`.
   On Netlify you can instead add `data-netlify="true"` to the form tag.
3. **Email.** The site ships with the Gmail address from the flyer. A domain mailbox
   (e.g. `hello@parisheducationalconsulting.com`) is strongly recommended before print
   materials reference the site.
4. **Testimonial.** Section 10 currently shows Dr. Parish's own closing line as a pull
   quote. When the first district testimonial arrives, swap the quote and attribution
   (marked with an HTML comment in `index.html`).
5. **Outcome numbers.** The Outcomes section is written qualitatively on purpose. When
   real figures exist, replace each card's line (marked `READY FOR REAL NUMBERS`).
6. **Hero video.** The hero plays `assets/drparishheadervideo.mp4` (1280x720, 8s loop,
   muted autoplay) behind an ivory scrim, with `drparishheadervideo-poster.jpg` as the
   poster frame. On phones and for reduced-motion users the video hides and the static
   portrait returns. To swap the clip, replace the mp4 and regenerate the poster.

## Known items

- The footer emblem uses the reversed logo variant (navy remapped to ivory) supplied in
  `site/assets/`; no CSS filter tricks are involved.
- Tagline roles: the flyer line ("Transforming Schools...") is live hero text; the logo's
  baked-in tagline stays inside the artwork only.
- `competitive-analysis.html` is a private client deliverable: `noindex` meta plus a
  `robots.txt` disallow. Do not link to it from the public pages.

## Content updates

All copy lives in `site/index.html` in clearly commented sections (1 through 12,
matching the build brief). Design tokens (colors, fonts, spacing) are CSS custom
properties at the top of `site/css/style.css`.
