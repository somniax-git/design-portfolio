// Single source of truth for all site content.
// To add a project: put an image in public/images/<portfolio-slug>/ and add one entry
// to that portfolio's `projects` list in `portfolios` below.
//
// PLACEHOLDERS: every value marked "PLACEHOLDER" (and every YOUR_... token)
// must be replaced with the designer's real information before publishing.
// Projects with `placeholder: true` are shown with a visible "Placeholder" badge.

export const siteSettings = {
  title: "Your Name — Graphic Designer", // PLACEHOLDER
  description:
    "Portfolio of Your Name, a graphic designer working in brand identity, editorial design, and packaging.", // PLACEHOLDER
  // Light theme only. Used for the browser theme-color meta tag.
  themeColor: "#f5f2ec",
  // Production domain, e.g. "https://yourname.com". Leave empty until known:
  // canonical and og:url tags are only added when this is set.
  domain: "",
  // Optional social preview image in public/, e.g. "/social-preview.jpg" (1200×630).
  socialImage: "",
};

export const profile = {
  name: "Your Name", // PLACEHOLDER
  title: "Graphic Designer & Visual Artist", // PLACEHOLDER
  bio: "PLACEHOLDER — Write two or three sentences about your practice: what you design, who you work with, and what you care about.",
  avatar: "/images/profile.svg", // PLACEHOLDER — replace with e.g. /images/profile.webp
  location: "City, Country", // PLACEHOLDER — optional, remove or set to "" to hide
};

// `icon` is optional: "instagram", "behance", "dribbble", "linkedin", "mail", or "link".
export const links = [
  { label: "Instagram", url: "https://instagram.com/YOUR_USERNAME", icon: "instagram" },
  { label: "Behance", url: "https://www.behance.net/YOUR_USERNAME", icon: "behance" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/YOUR_USERNAME", icon: "linkedin" },
  { label: "Email me", url: "mailto:hello@example.com", icon: "mail" },
];

// The three portfolios linked from the home page. Each gets its own page at /<slug>/.
// `slug` becomes the URL, so use lowercase letters, numbers, and hyphens.
// `cover` (optional) is the image on the home page link; defaults to the first project's image.
// Inside each portfolio: projects appear in list order, with featured ones first.
// Required per project: id (unique across all portfolios), title, image, alt.
export const portfolios = [
  {
    slug: "design",
    title: "Design Portfolio",
    description: "Brand identities, print, packaging, and editorial work.", // PLACEHOLDER
    projects: [
      {
        id: "brand-identity",
        title: "Brand Identity",
        category: "Branding",
        year: 2026,
        image: "/images/design/branding-studio.svg",
        alt: "Placeholder artwork standing in for a brand identity project",
        description: "Placeholder for a short description of the project.",
        url: "https://www.behance.net/YOUR_PROJECT",
        featured: true,
        placeholder: true,
      },
      {
        id: "poster-series",
        title: "Poster Series",
        category: "Print",
        year: 2025,
        image: "/images/design/poster-series.svg",
        alt: "Placeholder artwork standing in for a series of posters",
        url: "https://www.behance.net/YOUR_PROJECT",
        featured: true,
        placeholder: true,
      },
      {
        id: "packaging-design",
        title: "Packaging Design",
        category: "Packaging",
        year: 2025,
        image: "/images/design/packaging-design.svg",
        alt: "Placeholder artwork standing in for a packaging design project",
        url: "https://www.behance.net/YOUR_PROJECT",
        placeholder: true,
      },
      {
        id: "editorial-layout",
        title: "Editorial Layout",
        category: "Editorial",
        year: 2024,
        image: "/images/design/editorial-layout.svg",
        alt: "Placeholder artwork standing in for a magazine layout project",
        url: "https://www.behance.net/YOUR_PROJECT",
        placeholder: true,
      },
      {
        id: "type-specimen",
        title: "Type Specimen",
        category: "Typography",
        year: 2024,
        image: "/images/design/type-specimen.svg",
        alt: "Placeholder artwork standing in for a typeface specimen project",
        url: "https://www.behance.net/YOUR_PROJECT",
        placeholder: true,
      },
      {
        id: "event-campaign",
        title: "Event Campaign",
        category: "Campaign",
        image: "/images/design/event-campaign.svg",
        alt: "Placeholder artwork standing in for an event campaign project",
        url: "https://www.behance.net/YOUR_PROJECT",
        placeholder: true,
      },
    ],
  },
  {
    slug: "ai-art",
    title: "AI Art Portfolio",
    description: "Experiments in generative and AI-assisted imagery.", // PLACEHOLDER
    projects: [
      {
        id: "dreamscape",
        title: "Dreamscape",
        category: "Generative",
        year: 2026,
        image: "/images/ai-art/dreamscape.svg",
        alt: "Placeholder artwork standing in for a dreamlike AI-generated landscape",
        placeholder: true,
      },
      {
        id: "synthetic-portrait",
        title: "Synthetic Portrait",
        category: "Portrait",
        year: 2026,
        image: "/images/ai-art/synthetic-portrait.svg",
        alt: "Placeholder artwork standing in for an AI-generated portrait",
        placeholder: true,
      },
      {
        id: "liquid-forms",
        title: "Liquid Forms",
        category: "Abstract",
        year: 2025,
        image: "/images/ai-art/liquid-forms.svg",
        alt: "Placeholder artwork standing in for abstract AI-generated fluid shapes",
        placeholder: true,
      },
      {
        id: "neon-city",
        title: "Neon City",
        category: "Concept art",
        year: 2025,
        image: "/images/ai-art/neon-city.svg",
        alt: "Placeholder artwork standing in for an AI-generated night city scene",
        placeholder: true,
      },
    ],
  },
  {
    slug: "photography",
    title: "Photography Portfolio",
    description: "Landscapes, streets, and still life.", // PLACEHOLDER
    projects: [
      {
        id: "mountain-dawn",
        title: "Mountain Dawn",
        category: "Landscape",
        year: 2025,
        image: "/images/photography/mountain-dawn.svg",
        alt: "Placeholder image standing in for a photograph of mountains at sunrise",
        placeholder: true,
      },
      {
        id: "coastline",
        title: "Coastline",
        category: "Landscape",
        year: 2025,
        image: "/images/photography/coastline.svg",
        alt: "Placeholder image standing in for a photograph of a rocky coastline",
        placeholder: true,
      },
      {
        id: "street-light",
        title: "Street Light",
        category: "Street",
        year: 2024,
        image: "/images/photography/street-light.svg",
        alt: "Placeholder image standing in for a night street photograph",
        placeholder: true,
      },
      {
        id: "still-life",
        title: "Still Life",
        category: "Still life",
        year: 2024,
        image: "/images/photography/still-life.svg",
        alt: "Placeholder image standing in for a still life photograph of objects on a table",
        placeholder: true,
      },
    ],
  },
];
