import { ImageResponse } from "next/og"

import { site } from "@/lib/site"

export const alt = "BayWashCare — Car care, made spotless. Coming soon."
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

const HEADLINE = "Car care,"
const HEADLINE_ACCENT = "made spotless."

// Loads only the glyphs we render, in the site's heading font (Raleway). The
// image is generated at build time; if the fetch fails we fall back to the
// default font rather than failing the build.
async function loadRaleway(weight: number, text: string) {
  try {
    const css = await (
      await fetch(
        `https://fonts.googleapis.com/css2?family=Raleway:wght@${weight}&text=${encodeURIComponent(text)}`
      )
    ).text()
    const url = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)
    if (!url) return null
    const res = await fetch(url[1])
    return res.ok ? await res.arrayBuffer() : null
  } catch {
    return null
  }
}

// Social share preview (also used for Twitter/X via the same OG tags).
export default async function OpengraphImage() {
  const glyphs = `${site.name}COMING SOON${HEADLINE}${HEADLINE_ACCENT}${site.email}`
  const [bold, medium] = await Promise.all([
    loadRaleway(800, glyphs),
    loadRaleway(500, glyphs),
  ])
  const fonts = [
    bold && { name: "Raleway", data: bold, weight: 800 as const },
    medium && { name: "Raleway", data: medium, weight: 500 as const },
  ].filter((f) => !!f)

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        color: "white",
        fontFamily: fonts.length ? "Raleway" : undefined,
        background:
          "radial-gradient(ellipse 70% 60% at 80% 40%, rgba(56,212,255,0.28), transparent 70%), #04070d",
      }}
    >
      <div style={{ display: "flex", fontSize: 40, fontWeight: 800 }}>
        <span>Bay</span>
        <span style={{ color: "#67e8f9" }}>Wash</span>
        <span>Care</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            alignSelf: "flex-start",
            padding: "8px 20px",
            borderRadius: 999,
            border: "2px solid rgba(103,232,249,0.35)",
            color: "#a5f3fc",
            fontSize: 24,
            fontWeight: 500,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          Coming soon
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 28,
            fontSize: 104,
            fontWeight: 800,
            lineHeight: 1.02,
            letterSpacing: -3,
          }}
        >
          <span>{HEADLINE}</span>
          <span style={{ color: "#67e8f9" }}>{HEADLINE_ACCENT}</span>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 26,
          fontWeight: 500,
          color: "#94a3b8",
        }}
      >
        {site.email}
      </div>
    </div>,
    { ...size, fonts }
  )
}
