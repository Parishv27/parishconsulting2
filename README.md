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

## Cookie consent

TermsFeed Cookie Consent 4.2.0, **self-hosted** at
`site/vendor/cookie-consent/cookie-consent-code.js`. Config lives in
`site/js/cookie-consent-init.js`; brand styling is at the end of `site/css/style.css`.

TermsFeed's normal install is a small loader script that pulls the widget from their CDN
and also pings `termsfeed.com` with your visitor's hostname on every page load. The real
widget file is served here instead, so displaying the banner makes no third-party request.
The tradeoff is that updates are manual: to upgrade, re-download
`https://www.termsfeed.com/public/cookie-consent/<version>/cookie-consent-code.js`.

Two config values are load-bearing and easy to break:

- `notice_banner_insert_legal_urls: true` is required or the widget accepts
  `website_privacy_policy_url` and silently renders no link.
- `website_privacy_policy_url` must be **absolute**. The widget runs `isValidUrl()` and
  drops a relative path without warning. It is built from `window.location.origin`, so it
  follows localhost, the Vercel URL, and the production domain with no edit.
- `notice_banner_purposes_levels: ['strictly-necessary']` narrows the banner blurb. The
  vendor default claims the site measures interest and personalizes marketing, which is
  untrue here.

**If analytics are ever added** (Google Analytics, Meta Pixel, etc.), the banner is already
opt-in but the tags must be gated: load them only after consent, add the matching category
to `page_load_consent_levels` / `notice_banner_purposes_levels`, and add a row to the
cookie table in `site/cookie-policy.html`.

## Legal pages

Three pages, all sharing the `.legal` styles in `site/css/style.css` (no per-page CSS):

| Page | Covers |
|---|---|
| `site/privacy-policy.html` | What is and is not collected, the mailto form, Vercel server logs, third parties, rights, children, retention |
| `site/terms-of-service.html` | Site use, no-professional-advice, no engagement without a signed agreement, published pricing as estimates not quotes, IP including the 3-Phase Impact Model, Amazon links, warranties, liability, Mississippi governing law |
| `site/cookie-policy.html` | The single consent cookie and the third-party file loads |

All three are linked from the site footer; the consent banner links to the privacy policy.
They are indexable and listed in `sitemap.xml`.

**These are drafts, not legal advice, and no attorney has reviewed them.** Each page carries
a visible "Note for the site owner" box listing what counsel must confirm. Across the three,
the open items are: a business mailing address if one should be published; the actual
retention period for client correspondence; whether any specific state or international
privacy law applies to the client base; confirmation that Mississippi is the correct
governing law and venue; whether the 3-Phase Impact Model IP claim matches any trademark
filing; and whether an arbitration or dispute-resolution clause is wanted, which is
deliberately omitted. Remove the note boxes once counsel signs off.

Keep them accurate: any new service added to the site (analytics, a real form backend, a
chat widget, embedded video) changes what these pages must disclose.

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
