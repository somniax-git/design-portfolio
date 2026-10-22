# Graphic Designer Portfolio

A portfolio site for a graphic designer. The home page shows the profile, short introduction, social/contact links, and links to three portfolios — **Design**, **AI Art**, and **Photography** — each on its own page (`/design/`, `/ai-art/`, `/photography/`) with its own image grid. Built as a static site — no database, backend, or tracking.

> **Status:** all personal content is placeholder. See [Remaining placeholders](#remaining-placeholders).

## Technology

- [Astro](https://astro.build/) (v7) — generates static HTML at build time
- Plain HTML and CSS (no UI framework); no client-side JavaScript files
- One data file, `src/data/portfolio.js`, holds all content
- Images served from `public/images/`

## Prerequisites

- Node.js 22.23.4 or newer (developed with Node 26)
- npm

## Commands

Run these from the `my-portfolio/` folder:

| Command | What it does |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Start the dev server at http://localhost:4321 with live reload |
| `npm run build` | Build the production site into `dist/` |
| `npm run preview` | Serve the built `dist/` folder locally to check it |

The build validates `portfolio.js` and **fails with a clear message** if a portfolio slug or project ID is duplicated, a required field is missing, a URL uses anything other than `https:` or `mailto:`, or a referenced image is not in `public/`. It also prints a warning while placeholder content remains.

## Project structure

```
public/
  favicon.svg
  robots.txt
  images/
    profile.svg            ← placeholder portrait
    design/*.svg           ← placeholder images, one folder per portfolio
    ai-art/*.svg
    photography/*.svg
src/
  data/portfolio.js        ← ALL content lives here
  data/validate.js         ← build-time content checks
  components/              ← Profile, SocialLinks, PortfolioLinks, SiteHeader,
                              ProjectGrid, ProjectCard, SiteFooter
  layouts/Layout.astro     ← <head>, metadata, skip link
  styles/global.css        ← colours, fonts, spacing (CSS custom properties)
  pages/index.astro        ← home page (profile + portfolio links)
  pages/[portfolio].astro  ← one page per portfolio, generated from the data
```

## Updating content

Everything is edited in `src/data/portfolio.js`. You never need to touch the components to change content.

### Name, title, bio, and photo

Edit the `profile` object. For the photo, add a square image (at least 400×400 px) to `public/images/`, e.g. `public/images/profile.webp`, and set `avatar: "/images/profile.webp"`. Set `location` to `""` to hide it.

### Social links and email

Edit the `links` array. Each entry has a `label`, a `url`, and an optional `icon` (`instagram`, `behance`, `dribbble`, `linkedin`, `mail`, or `link`). Email links use `mailto:you@yourdomain.com`. Only `https:` and `mailto:` URLs are accepted.

### Portfolios

The `portfolios` array defines the three portfolio pages, in the order they appear on the home page. Each has:

- `slug` — the page URL (`slug: "design"` → `/design/`); lowercase letters, numbers, and hyphens
- `title` and `description` — shown on the home page link and at the top of the portfolio page
- `cover` (optional) — image for the home page link; defaults to the portfolio's first project image
- `projects` — the images shown on that page

To add a fourth portfolio, add another entry with a new slug and create `public/images/<slug>/`. Its page and home page link are created automatically.

### Projects

**Add:** put the image in `public/images/<portfolio-slug>/` and add one entry to that portfolio's `projects` list:

```js
{
  id: "cafe-rebrand",                       // unique across all portfolios, lowercase, hyphenated
  title: "Café Rebrand",
  category: "Branding",                     // optional
  year: 2026,                               // optional
  image: "/images/design/cafe-rebrand.webp",
  alt: "Coffee cups and bags showing the new café logo in green and cream",
  description: "Identity system for a neighbourhood café.", // optional
  url: "https://www.behance.net/gallery/…", // optional; card is not clickable without it
  featured: true,                           // optional; featured projects are shown first
},
```

**Edit:** change the entry's fields. **Reorder:** move entries within the array (featured projects always come first). **Remove:** delete the entry and its image file. **Move** a project to another portfolio by moving its entry (and image) there.

Do not set `placeholder: true` on real work — that flag shows the "Placeholder" badge.

### Site title, description, and domain

Edit `siteSettings`. `domain` and `socialImage` are empty by default; see [Custom domain](#configuring-a-custom-domain).

## Images

- **Location and naming:** `public/images/<portfolio-slug>/`, lowercase and hyphenated, matching the project ID, e.g. `public/images/photography/mountain-dawn.webp`.
- **Format:** WebP (or AVIF). Export thumbnails around **1200 × 1500 px (4:5)** and aim for roughly **150–300 KB** each.
- **Cropping:** cards display images at a 4:5 ratio and fill the frame (`object-fit: cover`), so keep important content away from the edges or export at 4:5.
- **Originals:** keep full-resolution artwork and source files (PSD, AI, etc.) outside this project; only add web-optimised exports here.
- If an image fails to load, the card shows the project title instead.

Any image editor's "Export for web" works; [Squoosh](https://squoosh.app/) is a free browser option.

## Deploying to Cloudflare Pages

> Not done yet — deployment is currently out of scope for this project. These are the steps for when it is.

1. Put the project in a GitHub repository.
2. In the Cloudflare dashboard, create a Pages project and connect that repository.
3. Use these build settings:
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: `my-portfolio` (if the repository contains the parent folder)
4. Deploy. Every push to the main branch rebuilds the site.

Check these settings against Cloudflare's current documentation before deploying.

## Configuring a custom domain

1. Add the domain in the Cloudflare Pages project under **Custom domains** and follow the DNS instructions.
2. Set `domain: "https://yourdomain.com"` in `siteSettings` (adds the canonical and `og:url` tags).
3. Optionally set `site: "https://yourdomain.com"` in `astro.config.mjs`.
4. Optionally add a 1200×630 social preview image to `public/` and set `socialImage` in `siteSettings`. It is only used once `domain` is set, because social networks need an absolute URL.

## Remaining placeholders

The build warns while these remain:

- `profile`: name, title, bio, location, and the portrait (`public/images/profile.svg`)
- `links`: all `YOUR_USERNAME` URLs and `hello@example.com`
- `portfolios`: the three descriptions, and all 14 projects and their SVG images (marked `placeholder: true`)
- `siteSettings`: title and description; `domain` and `socialImage` are empty

## Troubleshooting

- **Build fails with "Invalid portfolio data"** — read the listed problems; usually a typo in an image path, a duplicate `id`, or a URL without `https://`.
- **Image not showing** — the path in `portfolio.js` must start with `/` and match the file in `public/` exactly, including upper/lower case.
- **Changes not visible** — `npm run preview` shows the last build; run `npm run build` again, or use `npm run dev` while editing.
- **Port 4321 in use** — run `npm run dev -- --port 4322`.

## Known limitations

- Images are served as-is from `public/`; there are no automatically generated responsive sizes (`srcset`). Export images at the recommended size.
- Only a light theme is implemented.
- No contact form (email link only), by design.
