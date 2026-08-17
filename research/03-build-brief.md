# Phase 3: Website Build Brief
**Parish Educational Consulting, LLC**
Prepared: August 16, 2026
Inputs: `01-client-brand.md` (flyer plus client-supplied logo), `02-competitor-analysis.md` (10 firms scored, 5 analyzed deeply)

---

## 0. The Strategy in One Paragraph

Nine of ten competitors sell an organization. Parish sells a person: a doctorate-holding former
principal, district leader, and assistant professor who has personally turned schools around. The
site's entire job is to make that person unmistakably visible, prove she gets results, name her
method, publish what she charges, and route the visitor to one action. Every competitor in the study
leaves at least one of those five on the table. Parish takes all five.

**Positioning line for the build:** *Not a career consultant. A former principal who has done the work.*

---

## 1. Design Direction

### 1.1 Palette

Carried directly from the flyer and confirmed against the supplied logo. No invention.

| Token | Hex | Role |
|---|---|---|
| `--navy` | `#0A1F44` | Primary dark surface, headings on light, footer |
| `--navy-lift` | `#163A66` | Sampled from the logo. Gradient partner and hover state |
| `--gold` | `#C9A646` | Accent, pricing figures, rules, eyebrows, CTA on dark |
| `--gold-soft` | `#DEC17E` | Gold text on navy where AA contrast requires it |
| `--paper` | `#F8F6F0` | Page ground |
| `--sand` | `#EAE6DB` | Card fills |
| `--sand-deep` | `#E2D9C5` | Borders and hairlines |
| `--slate` | `#5C768D` | Tertiary accent, the "Accelerate" phase tint |
| `--pale` | `#D1E1FA` | Body copy reversed on navy |
| `--ink` | `#333333` | Body text |
| `--muted` | `#6B6660` | Captions and secondary text |

**Contrast note.** Gold `#C9A646` on navy `#0A1F44` passes AA for large text but not for small body
copy. Small type on navy uses `--pale` or `--gold-soft`. This is checked in the Phase 6 audit.

**Why this matters competitively.** Nine of ten competitor sites use cold blue on white. The navy,
antique gold, and warm ivory combination is the most distinctive palette in the category. It gets
pushed harder on the web than it is on the flyer.

### 1.2 Typography

Exact flyer match. Both families are on Google Fonts.

| Role | Family | Treatment |
|---|---|---|
| Display and headings | **Noto Serif** | 400 and 700. Tight tracking on large sizes |
| Body and interface | **Lato** | 400, 700, 900 |
| Eyebrows and labels | Lato | Uppercase, `letter-spacing: .18em`, minimum 12.5px |

Every one of the five deep-analyzed competitors uses sans-serif headings. A serif display face alone
differentiates the site on first glance and reinforces the academic register.

### 1.3 Logo Usage

| Placement | Asset | Notes |
|---|---|---|
| Nav, light state | `logo-mark-280.png` plus typeset Noto Serif wordmark | The full lockup is nearly square and will not fit a nav bar. The emblem crop carries no baked-in text, so pairing it with typeset text does not duplicate the wordmark |
| Nav, scrolled | Same, scaled down 12% | Height 52px resting, 46px scrolled. 44px on mobile |
| Footer on navy | `logo-mark-reversed.png` plus ivory wordmark | Navy remapped to ivory, gold gradient lifted for contrast |
| Contact section | `logo-lockup-reversed.png` | Full lockup including its own tagline |
| Social share | `og-image.jpg` | Reversed lockup on navy, 1200 x 630 |
| Browser | `favicon.svg`, `apple-touch-icon.png`, `icon-512.png` | |

At 380px and below the typeset wordmark hides and the emblem carries the brand alone.

### 1.4 Photography and Imagery

One real asset exists: the studio portrait of Dr. Parish. It is 1254 x 1254 and good enough to
anchor the hero.

- **Hero.** Portrait in a portrait-ratio frame with a gold rule offset behind it, subtle parallax on
  scroll, navy-to-transparent scrim at the base for text safety.
- **About.** Same portrait, second crop, paired with the credential list.
- **Everywhere else.** No stock photography. Competitors all use interchangeable stock classrooms.
  Parish uses typography, the brand palette, generous whitespace, and the logo emblem as a
  watermark motif instead. This is both a quality decision and an honesty decision, since we have no
  photographs of actual Parish engagements.
- **3D scroll asset.** A marked placeholder is left in the hero for the scroll-driven video the
  client may generate later.

### 1.5 Animation

Cinematic and restrained. Nothing bouncy, nothing playful. The register is institutional.

- Scroll-triggered reveal on every section, 24px rise with opacity, 60ms stagger between siblings
- Parallax on the founder portrait and on the navy Impact Model band
- The 3-Phase Impact Model animates as a connected sequence, with a gold progress line drawing
  between Assess, Align, and Accelerate as the user scrolls
- Count-up on quantities only. **Never on years.** A year animated through `toLocaleString()` renders
  as "2,010"
- Micro-interactions: gold underline sweep on nav links, card lift on hover, arrow travel on buttons
- `prefers-reduced-motion: reduce` disables all transforms and reveals content immediately
- Three-layer reveal fallback so no section can be stranded at `opacity: 0`

### 1.6 What to Avoid (drawn from competitor failures)

| Failure | Seen at | Rule for this build |
|---|---|---|
| Generic "Contact Us" | Creative Leadership Solutions | The CTA always names the deliverable |
| Service page with no proof | Creative Leadership Solutions | Proof appears on every service section |
| Personal brand with no portrait | Advanced Collaborative | The portrait is in the first viewport |
| Core offer buried under products | K12 Coalition | Services and pricing are top-level nav |
| Cold corporate blue | Nine of ten | Warm ivory ground, gold accent |
| Faceless institution | New Leaders, Zeal | One named human throughout |
| Invented statistics | n/a | Every number traces to the flyer or is not used |

---

## 2. Site Architecture

**Recommendation: a single long-scroll homepage plus two supporting pages.**

Rationale: the client has one seller, one method, and one conversion goal. A five-page brochure site
would spread thin content across more surfaces and weaken every one of them. A deep, well-sectioned
scroll page concentrates the argument and is how the highest-scoring competitor pages are structured.

```
site/
  index.html                 Primary long-scroll page
  competitive-analysis.html  Client deliverable, noindex, already built
  404.html
  robots.txt
  sitemap.xml
```

### 2.1 Navigation

`[PE emblem] Parish Educational Consulting` ... About | Approach | Services | Pricing | Contact | **[Request a Consultation]**

- Sticky, translucent ivory, gains a hairline and a shade of opacity on scroll
- Real mobile drawer: full-screen panel, body scroll lock, closes on link tap, Escape, backdrop, and
  on resize above the breakpoint. Hamburger morphs to X via `[aria-expanded="true"]`
- Nav toggle and brand sit above the drawer in stacking order so the close control is always reachable
- The CTA button keeps its ivory text inside the nav, and goes full-width in the drawer

### 2.2 Section Order and Purpose

| # | Section | Job | Conversion role |
|---|---|---|---|
| 1 | **Hero** | Name the district's problem, then the person who fixes it | Primary CTA plus secondary "See the approach" |
| 2 | **Credibility strip** | Four credential markers under the fold | Trust |
| 3 | **The problem** | Borrowed structurally from K12 Coalition's highest-performing device. States the cost of a stalled improvement plan | Tension |
| 4 | **About Dr. Parish** | Portrait, credentials, the "not a career consultant" claim, expertise tags | Trust. This is the whole differentiator |
| 5 | **The 3-Phase Impact Model** | Assess, Align, Accelerate as a scroll-driven navy band | Method credibility. No competitor has this |
| 6 | **Core Services** | Five pillars, each framed as a district problem, expandable to the 23 line items | Self-identification |
| 7 | **Outcomes** | The flyer's documented result areas, stated qualitatively and honestly | Proof |
| 8 | **Engagement Packages** | The full five-tier pricing table, published | Qualification. No competitor does this |
| 9 | **Engagement options** | Half-day through year-long partnership | Flexibility |
| 10 | **Testimonial slot** | Marked placeholder, ready for the first district quote | Social proof, currently empty |
| 11 | **Contact / Request a Consultation** | Form plus phone plus email on navy | Conversion |
| 12 | **Footer** | Nav, contact, service area, credit line | |

### 2.3 Content Hierarchy

- Exactly one `<h1>`, in the hero
- Each numbered section above opens with an `<h2>`
- Service pillars and pricing rows are `<h3>`
- The 23 service line items are list content, not headings

---

## 3. Content Framework

### 3.1 Homepage Headline: Three Options

All three follow the pattern that scored highest in the study, which is to open on the buyer's
problem rather than on the seller's category.

**Option A. The named-obstacle formula.** Recommended.
> **H1:** Your improvement plan is not failing for lack of effort.
> **Sub:** Parish Educational Consulting partners with school districts to turn data into
> instruction, principals into leaders, and stalled plans into measurable student results. Led by
> Dr. Veronica Williams Parish, a former principal, district leader, and assistant professor.

*Why:* Directly adapts the device that made K12 Coalition the strongest converter in the set. It
respects the superintendent rather than blaming them, and it sets up the method as the answer.

**Option B. The practitioner formula.**
> **H1:** A former principal. Not a career consultant.
> **Sub:** Dr. Veronica Williams Parish has turned around school culture and academic performance
> from inside the building. She now partners with districts to do it at scale, through a structured
> model of Assess, Align, Accelerate.

*Why:* Takes Zeal's sharpest line and makes it singular and personal, which Zeal cannot do with a
bench of a hundred. Strongest differentiation, slightly narrower appeal.

**Option C. The outcome formula. Closest to the existing flyer.**
> **H1:** Transforming schools. Empowering leaders. Elevating student success.
> **Sub:** District partnerships in instructional leadership, school culture, and student
> achievement, led by Dr. Veronica Williams Parish.

*Why:* Safest and fully on-brand, but it is a category statement rather than a problem statement,
which is the exact pattern shared by the two lowest scorers in the study.

**Recommendation: Option A for the H1, with the flyer tagline retained as the gold eyebrow above it.**
That keeps brand continuity with the flyer and the logo while opening on the buyer's problem.

### 3.2 Value Proposition Structure

1. **Problem.** Districts do not lack plans. They lack alignment between data, instruction, and leadership.
2. **Agitation.** Turnover, flat scores, discipline referrals, staff morale.
3. **Credential.** She has held the job the buyer is trying to fill, at building and district level.
4. **Method.** Assess, Align, Accelerate. Named, sequential, repeatable.
5. **Proof.** Documented result areas across attendance, morale, engagement, and discipline.
6. **Access.** Published pricing and clearly flexible engagement formats.
7. **Action.** Request a consultation.

### 3.3 Section Copy Direction

- **Services.** Each of the five pillars gets a district-problem lead sentence before the capability
  list. Example, pillar 3: "Some students are three grade levels behind and the schedule has no
  room for them." Then the four line items from the flyer, verbatim.
- **Impact Model.** Keep ASSESS / ALIGN / ACCELERATE verbatim from the flyer. Expand each with one
  sentence of what the district actually receives, drawn from the pricing table deliverables.
- **Outcomes.** Written qualitatively, because the flyer supplies no figures. Phrasing such as
  "documented reductions in out-of-school suspensions" rather than an invented percentage. Marked in
  the code as ready for real numbers.
- **Pricing.** Published verbatim from the flyer, with a plain-language note that every engagement is
  scoped to the district and that ranges reflect scope and travel.

### 3.4 SEO Targets

| Priority | Target | Placement |
|---|---|---|
| 1 | educational consultant Mississippi | Title, H1 area, contact section, schema |
| 2 | school improvement consultant for districts | H2 and services intro |
| 3 | how much does an education consultant cost | Pricing section H2 and FAQ schema |
| 4 | principal coaching cycle cost | Pricing table row |
| 5 | instructional rounds walkthrough consultant | Services pillar 1 |
| 6 | Science of Reading implementation support | Services pillar 1 |
| 7 | correctional education consulting | Services pillar 5. Effectively uncontested |
| 8 | dropout prevention credit recovery consultant | Services pillar 5 |

**Title:** `Parish Educational Consulting | K-12 School Improvement & Leadership Coaching`
Pipe separator, not a dash.

**Schema:** `ProfessionalService` with `founder` as a `Person` carrying the doctoral credential,
plus `OfferCatalog` for the five packages with their published price ranges, plus `FAQPage` on the
pricing questions.

---

## 4. Conversion Playbook

**Primary goal.** Consultation requests. One goal, one form, repeated CTA.

**CTA language.** "Request a Consultation" throughout. It beat "Contact Us" in the study because it
names the deliverable. Secondary CTAs are "See the 3-Phase Model" and "View engagement packages."

**Lead capture.** A form with Name, Role, District or School, Email, Phone, Area of need
(select, mapped to the five pillars), and Message. Ships with a `mailto:` fallback plus a documented
one-line swap to Formspree or Netlify Forms. Phone and email are always visible as fallbacks and are
never hidden behind the form.

**Social proof plan.**

| Signal | Status | Placement |
|---|---|---|
| Founder portrait and credentials | Have it | Hero and About |
| Doctoral credential | Have it | Nav-adjacent, About, schema |
| Named methodology | Have it | Dedicated section |
| Published pricing | Have it | Dedicated section. Genuine differentiator |
| Documented outcome areas | Have it, qualitative | Outcomes section |
| District testimonial | **Missing** | Marked placeholder, section 10 |
| Named client district | **Missing** | Marked placeholder |
| Hard outcome numbers | **Missing** | Marked in code, ready to drop in |
| Years of experience | **Missing** | Requested from client |

**Trust signals shipped:** LLC name in the footer, physical service area, direct phone, professional
email recommendation, credential-forward bio, transparent pricing, honest absence of fabricated
statistics.

---

## 5. Open Questions for the Client

None of these block the build. Each has a stated default.

1. **Tagline conflict.** Logo says "Transforming Community | Strengthening Instruction | Empowering
   Student Achievement." Flyer says "Transforming Schools. Empowering Leaders. Elevating Student
   Success." *Default: flyer line is live text in the hero, logo line stays inside the artwork.*
2. **Years of experience.** *Default: omitted rather than guessed.*
3. **Service area.** 662 suggests north Mississippi. *Default: "Mississippi and the surrounding region, with national engagements by arrangement."*
4. **Domain.** *Default: relative links throughout, one constant to update at launch.*
5. **Professional email.** Gmail address is live in the flyer. *Default: ship the Gmail address, recommend a domain mailbox in the README.*
6. **First testimonial.** *Default: placeholder section, clearly marked, hidden by a single flag if the client prefers.*

---

## 6. Deliverables

```
netlify.toml                        Pins publish = "site", cache headers
README.md                           Deployment, form wiring, content updates
research/01-client-brand.md         Done
research/02-competitor-analysis.md  Done
research/03-build-brief.md          This document
research/04-quality-audit.md        Phase 6
site/index.html
site/competitive-analysis.html      Done
site/404.html
site/robots.txt  site/sitemap.xml
site/css/style.css
site/js/main.js
site/assets/                        Logo set, founder portrait, icons, OG image
```

---

## HARD STOP: APPROVAL CHECKPOINT

Key decisions requiring sign-off:

1. **Headline: Option A**, "Your improvement plan is not failing for lack of effort," with the flyer
   tagline as the gold eyebrow above it.
2. **Publish the pricing table.** No competitor does. This is the single biggest differentiator
   available and it also pre-qualifies inquiries.
3. **Single long-scroll homepage** rather than a multi-page brochure site.
4. **Dr. Parish's portrait in the first viewport.** The brand is a person.
5. **No stock photography and no invented statistics.** Typography and palette carry the design;
   missing proof is left as marked placeholders.

**Ready to build?**
