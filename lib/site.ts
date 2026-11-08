// Single source of truth for site-wide details used in metadata and copy.

function resolveSiteUrl() {
  // Explicit override (set in Vercel project env vars once the domain is live).
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL
  // Vercel sets this automatically to the project's production domain.
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }
  return "https://baywashcare.com"
}

export const site = {
  name: "BayWashCare",
  url: resolveSiteUrl(),
  title: "BayWashCare — Coming Soon",
  description:
    "BayWashCare is bringing professional car cleaning and care management to your doorstep. Our app is coming soon.",
  email: "contact@baywashcare.com",
  phoneDisplay: "+91 97517 17979",
  phoneHref: "tel:+919751717979",
  themeColor: "#04070d",
} as const
