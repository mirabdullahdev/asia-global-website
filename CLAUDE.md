# Asia Global Textiles — Corporate Website

> Status: **Fresh start.** The previous website was deleted on 2026-07-08. Do NOT reference the old
> design, code, or assets — it was low quality and is not a basis for anything. Build from scratch.

## 1. Project Summary

Design and develop a modern, professional, **bilingual** corporate website for **Asia Global
Textiles**, a Pakistan-based textile sourcing company. The site is a digital platform to establish
credibility, showcase the company's textile sourcing capabilities, and present its product
portfolio to international buyers — with an initial focus on **Chile, Brazil, and Argentina**.

This is **not** an e-commerce platform. It functions as a **corporate profile and product
catalogue**, helping potential customers understand the company's services, sourcing process, and
manufacturing network. The design emphasizes **trust, professionalism, and product presentation**
through high-quality visuals, subtle animations, and a clean user experience.

Launch in **English first**, with **Spanish** support built in parallel to serve South American
markets.

## 1a. Objectives

- Establish Asia Global Textiles as a **trustworthy and credible sourcing partner**.
- Present the company's textile products and sourcing capabilities in a **professional** manner.
- Showcase **Pakistan's manufacturing strengths** to international buyers.
- Build confidence among textile importers and fashion brands in **Chile, Brazil, and Argentina**.
- Create a **scalable website structure** that can support future multilingual expansion and
  additional international markets.
- Position the company as a **long-term sourcing partner**, not simply another textile supplier.

## 1b. Hard Content Rules

- **No city names anywhere on the website without explicit approval.** Do not mention any city (in
  copy, metadata, alt text, examples, or placeholders) until the user has confirmed it. Countries
  are fine; cities are not — always ask first.

## 2. Core Requirements

- **Light theme.** The site should be light-themed.
- **Animations.** Include tasteful, subtle animations throughout.
- **Bilingual (English + Spanish).** Build Spanish in parallel with English from the start — not as
  an afterthought. Structure content/i18n so both languages are first-class.
- **Corporate catalogue, not e-commerce.** No cart, no checkout, no payments. Focus on company
  profile, services, sourcing process, manufacturing network, and product portfolio.
- **Audience:** international buyers, initial focus Chile, Brazil & Argentina (South America).
- **Design values:** trust, professionalism, product presentation, clean UX, high-quality visuals.

## 3. Company Info (verified)

- **Company:** Asia Global Textiles (Pakistan-based textile sourcing)
- **Contact email:** info@asiaglobaltex.com
- **Domains:** asiaglobaltex.com, www.asiaglobaltex.com

## 4. Deployment Infrastructure (existing — reuse for the fresh build)

The AWS S3 + CloudFront production infrastructure already exists and should be reused. The site is a
static build served from S3 behind CloudFront. (AWS account `986843603823`, region `us-east-1`.)

| Resource | Value |
|---|---|
| **S3 bucket** | `asiaglobaltex-production` |
| **CloudFront distribution ID** | `E2554Y51N8D9BM` |
| **CloudFront domain** | `d1oc7u0x87qv7n.cloudfront.net` |
| **Aliases (CNAMEs)** | `asiaglobaltex.com`, `www.asiaglobaltex.com` |
| **Origin Access Control (OAC)** | `E3PHGP9VL4JXO7` |
| **ACM certificate** | `arn:aws:acm:us-east-1:986843603823:certificate/c73cf83c-5973-4e61-8d0b-b5b03dc5f9ce` |
| **Default root object** | `index.html` |
| **Viewer protocol** | redirect-to-https, TLS 1.2_2021, HTTP/2, IPv6 |
| **Cache policy** | `658327ea-f89d-4fab-a63d-7e88639e58f6` (CachingOptimized) |

**SPA routing:** a CloudFront Function `asiaglobaltex-spa-rewrite`
(`arn:aws:cloudfront::986843603823:function/asiaglobaltex-spa-rewrite`) runs on `viewer-request` and
rewrites any path without a `.` to `/index.html`, so client-side routes (`/about`, `/services`,
`/products`, `/contact`, …) resolve correctly:

```js
function handler(event) {
  var request = event.request;
  var uri = request.uri;
  if (!uri.includes(".")) {
    request.uri = "/index.html";
  }
  return request;
}
```

**S3 bucket policy** grants `s3:GetObject` only to the CloudFront distribution via the
`cloudfront.amazonaws.com` service principal scoped to distribution `E2554Y51N8D9BM` (private
bucket, no public access).

**Deploy flow (typical):** build static assets → `aws s3 sync` to `asiaglobaltex-production` →
`aws cloudfront create-invalidation` on `E2554Y51N8D9BM`.

> Note: an older README described an EC2 + Nginx deployment — that is stale/abandoned. There are no
> EC2 instances in the account. S3 + CloudFront (above) is the real production setup.

## 5. Tech Stack (decided)

Chosen for fastest DX + best-in-class animation support (SEO deprioritized for now, so a SPA is
fine). Produces a static build that deploys to the existing S3 + CloudFront infra.

- **Build:** Vite 8 + React 19 + TypeScript. Path alias `@/*` → `src/*`.
- **Styling:** Tailwind CSS v4 (via `@tailwindcss/vite`, CSS-first config in `src/index.css`).
  Light theme; brand color tokens (`brand-*`) are placeholders pending design direction.
- **Animation:** Framer Motion (`framer-motion`) + Lenis smooth scroll (`SmoothScroll` wrapper,
  auto-disabled under `prefers-reduced-motion`).
- **Routing:** React Router 7 (`BrowserRouter`). **Multi-page** — pages in nav order: `/` (Home,
  the full landing), `/about`, `/what-we-do`, `/products`, `/contact`. Only Home is built; the other
  four render `ComingSoon` placeholders. Nav/footer/CTA use `<Link>` (route nav, not scroll-to-
  section); `ScrollToTop` in `App.tsx` resets scroll on route change; navbar is transparent only on
  `/` and solid on every other page; unknown paths redirect to `/`. Deep links rely on the existing
  CloudFront `asiaglobaltex-spa-rewrite` function.
- **i18n:** `react-i18next` + `i18next-browser-languagedetector`. Locales in
  `src/i18n/locales/{en,es}.json`; both languages first-class. EN/ES toggle via `LanguageSwitcher`.
- **Icons:** `lucide-react`.
- **Scripts:** `npm run dev` / `build` / `lint` (oxlint) / `preview`.

Project layout: `src/{components,pages,i18n}`. Current baseline is a Layout (sticky header + nav +
language switcher + footer) and an animated Home hero — placeholder content to prove the stack.

## 6. Landing Page (built)

Single-page landing built with anchor sections + smooth scroll (Lenis). Sections in order:
Hero → Intro/"who we are" → What We Do (full-bleed dark section over `backgrounds/end-to-end.jpg`;
left = sticky heading + tagline + pill CTA button linking to `/what-we-do`, right = static
hairline-divided list of the 6 capabilities — the auto-rotating `CapabilityCarousel` was removed
per client) → Products (6 category tiles with real photos in `public/categories/`) → Process (6 steps)
→ Services (8 items) → CTA/Contact → Footer. (Markets section removed per client request.)
Nav: Home · Capabilities · Products · Services · Contact. **Default language is Spanish** (fallback
`es`, detector = localStorage only so browser lang doesn't override); toggle order is ES/EN. Hero is
single-column (the second showcase video was removed): text + CTAs ("Book a Meeting" secondary)
over the looping `agt-cover.mp4` background. Hero heading is
"From Concept to Container." / "Del concepto al contenedor."; overlay is left-weighted dark for
heading contrast.

- **Typography:** Inter throughout (both display and body). Loaded via Google Fonts in `index.html`.
  `--font-display` maps to Inter; the section "eyebrow" labels were removed per client request.
- **Palette (light):** warm cream grounds (`cream-50/100/200`), `ink` text. **Blue is the accent
  throughout** (`clay-*` scale, `clay-500` = Pantone 286 C `#0039a6`) — used for buttons, links,
  icons, process numbers, etc. The `brand-*` (red) scale now only appears in the logo mark's center
  dot. Footer is dark neutral (`neutral-900`), not colored. Defined in `src/index.css` `@theme`.
  NB: token names are historical — `clay-*` is blue, `brand-*` is red.
- **Animations:** Framer Motion — hero stagger on load, `Reveal` component (fade-and-rise on scroll,
  once) across sections, hover lifts on cards, animated mobile menu. Shared easing/variants in
  `src/lib/motion.ts`. All respect `prefers-reduced-motion`.
- **Navbar:** fixed, transparent over the hero, switches to solid cream + blur on scroll; EN/ES
  switcher + clay CTA; full-screen animated mobile menu.
- **Hero cover video:** `public/videos/agt-cover.mp4` (720p/30fps, 32s, ~6.8 MB, muted,
  `+faststart`) with `agt-cover-poster.jpg` poster. Autoplay + loop + `playsInline`, dark overlay.
  It's a montage cut from `~/Downloads/VIDEO - AGT/` in this order: starting(0:02–0:08) →
  processing(0:04–0:07) → starting(0:30–0:34) → ironing(0:04–0:07) → starting(0:54–0:58) →
  stitching(0:00–0:03) → threading-logo(0:00–0:02 + 0:06–0:09) → finished-denim(0:00–0:04) →
  container(0:00–0:04, portrait source center-cropped to 16:9 at y=600 — truck departing, closes
  the "concept to container" tagline). Hard cuts (no transitions), per-clip gamma correction for
  consistent brightness; `weaving.mp4` intentionally unused (per client). Total 36s, ~7.4 MB.
- **Content:** all copy is bilingual in `src/i18n/locales/{en,es}.json`. **No city names** anywhere
  (per §1b) — only countries (Pakistan, Chile, Brazil, Argentina). Copy is placeholder-quality
  marketing prose; no fabricated stats/certifications.

## 7. Not Yet Decided / To Do

- Real, client-approved copy for both languages (current copy is drafted, not final).
- Real product/section photography (product tiles currently use gradient placeholders).
- Additional pages if needed (About, Products detail, Contact form) — currently single-page.
- Final brand palette (tokens are a tasteful default, not confirmed brand colors).
- Logo: the client's **real logo** (Asia-map + "ASIA GLOBAL TEXTILES" + cotton boll). Source
  `~/Downloads/asia.png` (white bg) processed into `public/brand/`: `asia-logo.png` (transparent,
  navy/maroon — light bgs), `asia-logo-light.png` (transparent, reversed cream/clay — dark bgs),
  `asia-logo-white.png` (original white bg). Navbar swaps navy/reversed by scroll state; footer uses
  reversed. `public/favicon.png` = Asia-map silhouette on a blue tile. (Earlier hand-made monogram
  SVGs were removed.)
- Verify hero video autoplay/quality in a real browser (not yet previewed — per workflow rules).
