# Phase 1: Client Brand Extraction
**Parish Educational Consulting, LLC**
Source: `parish_educational_consulting_flyer (1).pdf` (3 pages)
Extracted: August 16, 2026

## Brand Snapshot
- **Company:** Parish Educational Consulting, LLC
- **Primary Color:** `#0A1F44` (deep navy)
- **Secondary Color:** `#F8F6F0` (warm ivory / paper)
- **Accent Color:** `#C9A646` (antique gold)
- **Fonts:** Noto Serif (headings) / Lato (body)
- **Tone:** Authoritative
- **Core Message:** A veteran school turnaround leader partners with districts to lift instruction, leadership, and student achievement through a structured Assess, Align, Accelerate model.

## 1. Existing Web Presence: NONE

This is a greenfield build. A full search of the open web returned no owned website for
Parish Educational Consulting, LLC. What exists today is scattered social presence only:

| Channel | URL | Notes |
|---|---|---|
| Facebook (personal) | facebook.com/veronica.parish.5 | Posts published "from the desk of Parish Educational Consulting" |
| Instagram | instagram.com/drvmpdst27 | Identified as "founder of Parish Educational Consulting" |
| Superprof (tutoring marketplace) | superprof.ca listing | Lists Dr. Parish at $62/hr as a reading tutor |
| Third-party mentions | Facebook post by Gemar Mills | Describes her as founder of Parish Educational Consulting, LLC |

**Strategic implication.** There is nothing to redesign and nothing to preserve. There is also
a real positioning risk: the only indexed commercial listing for Dr. Parish prices her as an
hourly tutor while her flyer sells $2,500 to $4,500 per month district partnerships. A branded
site becomes the canonical, high-authority result and resolves that conflict.

## 2. Brand Colors (extracted from the PDF vector fills and text runs)

| Role | Hex | Where it appears in the flyer |
|---|---|---|
| Primary navy | `#0A1F44` | Masthead band, mission card, section headings, phase-1 card rule |
| Accent gold | `#C9A646` | Wordmark, hairline under masthead, section markers, all pricing figures |
| Paper / ivory | `#F8F6F0` | Page background, reversed type on the navy mission card |
| Sand (light) | `#EAE6DB` | "Why Choose Us" and "Engagement Options" card fills |
| Sand (mid) | `#E2D9C5` | Card borders, hairline dividers |
| Sand (deep) | `#D6CEBE` | Table rules |
| Slate blue | `#5C768D` | Phase-3 card rule (the "Accelerate" tint) |
| Pale blue | `#D1E1FA` | Reversed body copy on navy blocks |
| Body ink | `#333333` | Paragraph text |
| Muted ink | `#666666` / `#777777` | Captions, footer, page numbers |

The palette is already correct for the market. Navy plus gold reads as institutional credibility
without looking like a district letterhead, and the warm ivory ground is what separates it from
the cold blue-and-white default that nearly every competitor uses.

## 3. Typography

| Role | Family in flyer | Sizes observed |
|---|---|---|
| Display / wordmark | Noto Serif Bold | 24pt |
| Section headings | Noto Serif Bold | 20pt, 16pt, 14pt, 11pt |
| Pull quote / tagline | Noto Serif Italic, Lato Italic | 12pt, 10pt |
| Body | Lato Regular | 8.0 to 10.0pt |
| Emphasis | Lato Bold | 9.0 to 10.0pt |

Web equivalents: Noto Serif is available directly on Google Fonts. Lato is also on Google Fonts.
This pairing can be reproduced exactly, so the site and the flyer will be visually identical.

## 4. Founder Asset

One embedded image, 1254 x 1254 px, a professional studio portrait of Dr. Veronica Williams Parish
seated in an office setting, white blouse, neutral warm-grey background with navy and gold artwork
behind her. The artwork behind her happens to carry the exact brand palette.

Saved to: `site/assets/founders/dr-veronica-williams-parish.png`

This is the single most valuable asset in the package. In a founder-led consultancy the buyer is
purchasing the founder, and this portrait is high enough resolution to carry a full-bleed hero.

## 4b. Logo (supplied by client, August 16, 2026)

A 2048 x 2048 px full-color logo was provided after the flyer. It is a stacked lockup:

- **Emblem.** A navy and gold circular mark containing an interlocked serif "PE" monogram, an open
  book at the base, a rising human figure, and a gold star. Navy sampled at `#183C6C`, gold at
  `#C09048`, both consistent with the flyer palette.
- **Wordmark.** "PARISH" in navy serif caps, "EDUCATIONAL" in gold serif caps between two rules,
  "CONSULTING, LLC" in navy serif caps between two rules.
- **Baked-in tagline.** "TRANSFORMING COMMUNITY | STRENGTHENING INSTRUCTION | EMPOWERING STUDENT ACHIEVEMENT"

**Note a tagline conflict.** The logo tagline and the flyer tagline are different lines:

| Source | Line |
|---|---|
| Flyer | "Transforming Schools. Empowering Leaders. Elevating Student Success." |
| Logo | "Transforming Community | Strengthening Instruction | Empowering Student Achievement" |

Recommendation: keep both but assign them roles. The flyer line is the marketing tagline and belongs
in the hero. The logo line stays inside the logo artwork and is not repeated as live text, which
avoids two competing straplines on the same screen. Flagged for client confirmation.

### Derived web assets

The supplied file has an opaque white background, so it cannot sit on navy sections as delivered.
Nine derivatives were generated with proper alpha (solid ink held fully opaque, only the
antialiased rim feathered) and, for the reversed set, navy remapped to ivory with the darker end of
the gold gradient lifted so it holds contrast on a navy ground.

| File | Use |
|---|---|
| `logo-mark.png` (1006 x 929) | Emblem only, for light backgrounds |
| `logo-mark-reversed.png` | Emblem only, for navy backgrounds |
| `logo-mark-280.png` / `logo-mark-560.png` | Downscaled nav mark, 1x and 2x |
| `logo-full.png` / `logo-full-reversed.png` | Emblem plus wordmark, no tagline |
| `logo-lockup.png` / `logo-lockup-reversed.png` | Complete lockup including tagline and rule |
| `apple-touch-icon.png` (180) / `icon-512.png` | App icons, reversed mark on navy |
| `og-image.jpg` (1200 x 630) | Social share card |
| `favicon.svg` | Navy tile with gold and ivory PE monogram |

Original preserved at `site/assets/Parish Educational Consulting Logo.png`.

**Nav treatment.** The full lockup is nearly square (1606 x 1422) and will not fit a horizontal
nav bar. The nav uses the emblem crop paired with a typeset Noto Serif wordmark, which gives a
proper horizontal lockup and keeps the mark legible at small sizes. Because the emblem crop carries
no baked-in text, this does not duplicate the wordmark.

## 5. Tone of Voice

Formal, credentialed, outcome-focused. The flyer leads with proof of results before it describes
services. Verbs are transitive and measurable: "increased," "elevated," "reduced," "turned around."
Values language ("purpose, equity, and transformation") is present but subordinate to results
language. There is no casual register anywhere in the document.

Rule for the site: never soften this into coach-speak. District superintendents buy evidence.

## 6. Key Messaging (verbatim from the flyer)

- **Wordmark:** PARISH EDUCATIONAL CONSULTING
- **Tagline:** "Transforming Schools. Empowering Leaders. Elevating Student Success."
- **Triad:** LEADING / COLLABORATING / EMPOWERING
- **Mission:** To partner with school districts to improve academic outcomes, strengthen leadership
  capacity, and create safe, supportive, and high-performing learning environments for all students.
- **Closing line:** "Let's collaborate to build capacity, transform culture, and achieve sustainable excellence."

## 7. Full Content Inventory

### About
Founded by Dr. Veronica Williams Parish. Partners with school districts to drive measurable
improvements in teaching, leadership, and student achievement. Background: principal, district
leader, assistant professor, instructional expert. Documented outcomes: increased student and staff
attendance, elevated teacher morale, stronger parent and community engagement, significant reduction
in student discipline incidents and out-of-school suspensions. Expertise spans K-12 education,
higher education, and correctional education systems.

### Why Choose Us
1. Proven leadership across multiple educational settings
2. Deep understanding of diverse student populations
3. Strong record of increasing student achievement
4. Expertise in academic instruction and whole-child development
5. Work rooted in purpose, equity, and transformation

### Signature 3-Phase Impact Model
1. **ASSESS.** Deeply analyze school data, instructional practices, and organizational systems.
2. **ALIGN.** Develop targeted, strategic plans highly tailored to your district's specific goals.
3. **ACCELERATE.** Implement responsive solutions with ongoing executive coaching and staff support.

### Core Services (5 pillars, 23 line items)
1. **Instructional Leadership and School Improvement.** Data-driven school improvement planning;
   instructional coaching for teachers and leaders; curriculum alignment (ELA and Math focus);
   Science of Reading implementation support; classroom observation and feedback systems.
2. **Leadership Development.** Principal and assistant principal coaching; teacher leadership
   pipelines; professional learning communities (PLCs); culturally responsive leadership practices.
3. **Student Achievement and Intervention.** Targeted strategies for struggling learners; literacy
   and numeracy acceleration plans; MTSS/RTI framework support; closing achievement gaps for
   underserved populations.
4. **School Culture and Climate.** Building safe and supportive school environments; student
   behavior and discipline systems; restorative practices implementation; social-emotional learning
   integration; improving staff morale and community engagement.
5. **Alternative and Nontraditional Education.** Dropout prevention strategies; credit recovery
   program development; re-engagement systems for at-risk youth; correctional and alternative
   education consulting.

### Engagement Options
Half-Day / Full-Day Professional Development, 3 to 6 Month Leadership Coaching Cycles, Year-Long
Partnerships, Fully Customized Support Packages.

### Pricing (verified against the rendered page, not just the text layer)

| Package | Price | Unit |
|---|---|---|
| Walkthrough + Debrief Package | $500 to $700 | per visit |
| Professional Development (Half-Day / Full-Day) | Half-Day $700 to $800; Full-Day $850 to $1,000 | per session |
| Professional Development Series | $2,500 to $5,000 | per series |
| Leadership Coaching (Monthly Cycle) | $1,500 to $2,500 | per month, per leader |
| School Improvement Partnership (6 to 12 Months) | $2,500 to $4,500 | per month |

### Contact
- Phone: (662) 822-6283
- Email: parisheducationalconsultingllc@gmail.com
- Area code 662 places the practice in north Mississippi.

## 8. Gaps the Flyer Leaves Open (flag to client)

These are blanks the site will need. Where a claim cannot be sourced, the build uses honest,
non-numeric phrasing rather than invented statistics.

1. **No named district clients or testimonials.** The largest single conversion gap. Every top
   competitor leads with a named school or a quoted principal.
2. **No hard outcome numbers.** The flyer says "increased attendance" and "significant reduction in
   suspensions" without figures. One real percentage would outperform three paragraphs of adjectives.
3. **No years-of-experience figure.** Standard credibility marker in this category.
4. **No service area stated.** Districts want to know whether travel is in scope.
5. ~~No logo mark.~~ **Resolved.** Client supplied the full logo on August 16, 2026. See section 4b.
   One open item remains: the logo tagline and the flyer tagline do not match.
6. **Business email is a gmail.com address.** Recommend a domain mailbox before launch.
