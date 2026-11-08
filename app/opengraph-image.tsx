import { ImageResponse } from "next/og"

import { CarSvg } from "@/components/car-illustration"
import { site } from "@/lib/site"

export const alt =
  "BayWashCare — Coming soon. Doorstep car care, booked from one simple app."
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

const TAGLINE = "Doorstep car care, booked from one simple app."
const SERVICES = ["Exterior", "Interior", "Full detail"]
const SLOTS = ["10:00", "12:30", "15:00"]

// Every string drawn below, so the font request only includes needed glyphs.
const GLYPHS = [
  site.name,
  "Coming Soon.",
  TAGLINE,
  "9:41 Good morning Let's make it shine B At your doorstep Doorstep car wash",
  "Choose a service Today Book a wash Washer on the way Arriving in 10 min",
  ...SERVICES,
  ...SLOTS,
].join("")

// Loads only the glyphs we render, in the site's heading font (Raleway). The
// image is generated at build time; if the fetch fails we fall back to the
// default font rather than failing the build.
async function loadRaleway(weight: number) {
  try {
    const css = await (
      await fetch(
        `https://fonts.googleapis.com/css2?family=Raleway:wght@${weight}&text=${encodeURIComponent(GLYPHS)}`
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

const NAVY = "#050a14"
const CYAN = "#67e8f9"

// Social share preview (WhatsApp, X, LinkedIn…). Mirrors the landing page.
export default async function OpengraphImage() {
  const weights = [300, 500, 700, 800] as const
  const loaded = await Promise.all(weights.map(loadRaleway))
  const fonts = weights.flatMap((weight, i) => {
    const data = loaded[i]
    return data
      ? [{ name: "Raleway", data, weight, style: "normal" as const }]
      : []
  })

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        background: NAVY,
        color: "white",
        fontFamily: fonts.length ? "Raleway" : undefined,
        overflow: "hidden",
      }}
    >
      {/* diagonal two-tone backdrop (same angles as the page) */}
      <svg
        width="1200"
        height="630"
        viewBox="0 0 1200 630"
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        <defs>
          <linearGradient id="plane" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#0a3550" />
            <stop offset="0.45" stopColor="#0b2740" />
            <stop offset="1" stopColor="#071a2c" />
          </linearGradient>
        </defs>
        <polygon
          points="0,139 696,365 1200,214 1200,630 0,630"
          fill="url(#plane)"
        />
      </svg>

      {/* glow, disc and ring behind the phone */}
      <div
        style={{
          position: "absolute",
          left: 560,
          top: -60,
          width: 700,
          height: 700,
          borderRadius: 9999,
          background:
            "radial-gradient(circle, rgba(56,212,255,0.28) 0%, rgba(56,212,255,0) 65%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 660,
          top: 60,
          width: 500,
          height: 500,
          borderRadius: 9999,
          background:
            "radial-gradient(circle at 30% 30%, #38d4ff 0%, #0e7fb0 55%, #0b3a5c 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 610,
          top: 10,
          width: 600,
          height: 600,
          borderRadius: 9999,
          border: "1.5px solid rgba(103,232,249,0.18)",
        }}
      />

      {/* left: wordmark, headline, tagline */}
      <div
        style={{
          position: "absolute",
          left: 80,
          top: 64,
          bottom: 64,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", fontSize: 36, fontWeight: 800 }}>
          <span>Bay</span>
          <span style={{ color: CYAN }}>Wash</span>
          <span>Care</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 156,
              lineHeight: 0.92,
              letterSpacing: -5,
            }}
          >
            <span style={{ fontWeight: 300 }}>Coming</span>
            <span style={{ fontWeight: 800, color: CYAN }}>Soon.</span>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 30,
              fontSize: 30,
              fontWeight: 500,
              color: "rgba(255,255,255,0.75)",
            }}
          >
            {TAGLINE}
          </div>
        </div>
        {/* spacer keeps the headline block vertically centred */}
        <div style={{ display: "flex", height: 36 }} />
      </div>

      {/* phone (bleeds off the bottom edge) */}
      <div
        style={{
          position: "absolute",
          left: 790,
          top: 86,
          width: 280,
          height: 600,
          display: "flex",
          padding: 10,
          borderRadius: 46,
          background: "#0b1220",
          boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            borderRadius: 36,
            background: "#f3fbff",
            color: "#04070d",
            padding: "12px 16px",
          }}
        >
          {/* status bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: 12,
              fontWeight: 700,
              padding: "0 6px",
            }}
          >
            <span>9:41</span>
            <div
              style={{
                display: "flex",
                width: 84,
                height: 24,
                borderRadius: 999,
                background: "#0b1220",
              }}
            />
            <div
              style={{
                display: "flex",
                width: 22,
                height: 11,
                borderRadius: 3,
                border: "1.5px solid #04070d",
                padding: 1.5,
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "75%",
                  background: "#04070d",
                  borderRadius: 1,
                }}
              />
            </div>
          </div>

          {/* greeting */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 12, color: "#64748b" }}>
                Good morning
              </span>
              <span style={{ fontSize: 18, fontWeight: 800 }}>
                Let&apos;s make it shine
              </span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 34,
                height: 34,
                borderRadius: 999,
                background: "#cffafe",
                color: "#0e7490",
                fontSize: 14,
                fontWeight: 800,
              }}
            >
              B
            </div>
          </div>

          {/* hero card with the car */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 14,
              padding: "12px 12px 0",
              borderRadius: 18,
              background:
                "radial-gradient(ellipse at 70% 20%, #13456b, #071423 70%)",
              color: "white",
            }}
          >
            <span style={{ fontSize: 11, color: "#a5f3fc" }}>
              At your doorstep
            </span>
            <span style={{ fontSize: 15, fontWeight: 700, marginTop: 2 }}>
              Doorstep car wash
            </span>
            <CarSvg
              uid="og"
              style={{ width: 224, height: 105, marginTop: 4 }}
            />
          </div>

          {/* services */}
          <span
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "#64748b",
              marginTop: 14,
            }}
          >
            Choose a service
          </span>
          <div style={{ display: "flex", marginTop: 7 }}>
            {SERVICES.map((s, i) => (
              <div
                key={s}
                style={{
                  display: "flex",
                  marginRight: 5,
                  padding: "5px 10px",
                  borderRadius: 999,
                  fontSize: 11,
                  fontWeight: 700,
                  background: i === 2 ? "#22d3ee" : "white",
                  border: i === 2 ? "1px solid #22d3ee" : "1px solid #e2e8f0",
                  color: i === 2 ? "#04070d" : "#475569",
                }}
              >
                {s}
              </div>
            ))}
          </div>

          {/* slots */}
          <span
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "#64748b",
              marginTop: 14,
            }}
          >
            Today
          </span>
          <div style={{ display: "flex", marginTop: 7 }}>
            {SLOTS.map((t, i) => (
              <div
                key={t}
                style={{
                  display: "flex",
                  flex: 1,
                  justifyContent: "center",
                  marginRight: i < 2 ? 6 : 0,
                  padding: "7px 0",
                  borderRadius: 12,
                  fontSize: 12,
                  fontWeight: 700,
                  background: i === 1 ? "#04070d" : "white",
                  border: i === 1 ? "1px solid #04070d" : "1px solid #e2e8f0",
                  color: i === 1 ? "white" : "#475569",
                }}
              >
                {t}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: 18,
              padding: "12px 0",
              borderRadius: 16,
              background: "#22d3ee",
              fontSize: 14,
              fontWeight: 800,
              boxShadow: "0 8px 20px rgba(34,211,238,0.5)",
            }}
          >
            Book a wash
          </div>
        </div>
      </div>

      {/* floating status card */}
      <div
        style={{
          position: "absolute",
          left: 640,
          top: 548,
          display: "flex",
          alignItems: "center",
          padding: "12px 16px",
          borderRadius: 18,
          background: "rgba(255,255,255,0.97)",
          color: "#04070d",
          boxShadow: "0 20px 40px rgba(0,0,0,0.45)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 38,
            height: 38,
            borderRadius: 999,
            background: "#cffafe",
            marginRight: 12,
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#0e7490"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
            <circle cx="7" cy="17" r="2" />
            <path d="M9 17h6" />
            <circle cx="17" cy="17" r="2" />
          </svg>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 16, fontWeight: 800 }}>
            Washer on the way
          </span>
          <span style={{ fontSize: 13, color: "#64748b" }}>
            Arriving in 10 min
          </span>
        </div>
      </div>
    </div>,
    { ...size, fonts }
  )
}
