// Build-time checks for portfolio.js. Errors stop the build; warnings are logged.
import { existsSync } from "node:fs";
import { join } from "node:path";

// Astro runs builds from the project root, so public/ is resolved from there.
const PUBLIC_DIR = join(process.cwd(), "public");
const ALLOWED_PROTOCOLS = ["https:", "mailto:"];

function checkUrl(url, where, errors) {
  try {
    const { protocol } = new URL(url);
    if (!ALLOWED_PROTOCOLS.includes(protocol)) {
      errors.push(`${where}: URL "${url}" must use https: or mailto:`);
    }
  } catch {
    errors.push(`${where}: "${url}" is not a valid URL`);
  }
}

function checkLocalImage(path, where, errors) {
  if (!path.startsWith("/")) {
    errors.push(`${where}: image path "${path}" must start with "/" (relative to public/)`);
  } else if (!existsSync(join(PUBLIC_DIR, path))) {
    errors.push(`${where}: image "${path}" not found in public/`);
  }
}

let warned = false;

const isPlaceholder = (value) => /YOUR_|PLACEHOLDER|example\.com/i.test(String(value));

export function validatePortfolio({ profile, links, portfolios, siteSettings }) {
  const errors = [];
  const warnings = [];

  if (!profile?.name) errors.push("profile.name is required");
  if (profile?.avatar) checkLocalImage(profile.avatar, "profile.avatar", errors);

  links.forEach((link, i) => {
    const where = `links[${i}] (${link.label ?? "no label"})`;
    if (!link.label) errors.push(`${where}: label is required`);
    if (!link.url) errors.push(`${where}: url is required`);
    else checkUrl(link.url, where, errors);
  });

  const slugs = new Set();
  const ids = new Set();
  portfolios.forEach((portfolio, p) => {
    const where = `portfolios[${p}] (${portfolio.slug ?? "no slug"})`;
    if (!portfolio.title) errors.push(`${where}: title is required`);
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(portfolio.slug ?? "")) {
      errors.push(`${where}: slug must be lowercase letters, numbers, and hyphens`);
    } else if (slugs.has(portfolio.slug)) errors.push(`${where}: duplicate slug "${portfolio.slug}"`);
    slugs.add(portfolio.slug);
    if (portfolio.cover) checkLocalImage(portfolio.cover, `${where}.cover`, errors);

    (portfolio.projects ?? []).forEach((project, i) => {
      const where = `${portfolio.slug}.projects[${i}] (${project.id ?? "no id"})`;
      if (!project.id) errors.push(`${where}: id is required`);
      else if (ids.has(project.id)) errors.push(`${where}: duplicate id "${project.id}"`);
      ids.add(project.id);
      for (const field of ["title", "image", "alt"]) {
        if (!project[field]?.toString().trim()) errors.push(`${where}: ${field} is required`);
      }
      if (project.image) checkLocalImage(project.image, where, errors);
      if (project.url) checkUrl(project.url, where, errors);
    });
  });

  if (siteSettings?.domain) checkUrl(siteSettings.domain, "siteSettings.domain", errors);
  if (siteSettings?.socialImage) checkLocalImage(siteSettings.socialImage, "siteSettings.socialImage", errors);

  const placeholderCount =
    [profile.name, profile.bio, siteSettings.title, ...links.map((l) => l.url)].filter(isPlaceholder).length +
    portfolios.flatMap((p) => p.projects ?? []).filter((p) => p.placeholder).length;
  if (placeholderCount > 0) {
    warnings.push(`${placeholderCount} placeholder value(s) remain in src/data/portfolio.js`);
  }

  if (errors.length) {
    throw new Error(`Invalid portfolio data:\n  - ${errors.join("\n  - ")}`);
  }
  if (!warned) warnings.forEach((w) => console.warn(`[portfolio] ${w}`));
  warned = true;
}
