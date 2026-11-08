import { ImageResponse } from "next/og"

export const size = { width: 64, height: 64 }
export const contentType = "image/png"

// Brand favicon: cyan "B" droplet badge on the site's dark navy.
export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#04070d",
        borderRadius: 14,
        color: "#67e8f9",
        fontSize: 46,
        fontWeight: 800,
      }}
    >
      B
    </div>,
    size
  )
}
