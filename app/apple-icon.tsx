import { ImageResponse } from "next/og"

export const size = { width: 180, height: 180 }
export const contentType = "image/png"

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "radial-gradient(circle at 70% 30%, #0e3a4f 0%, #04070d 70%)",
        color: "#67e8f9",
        fontSize: 120,
        fontWeight: 800,
      }}
    >
      B
    </div>,
    size
  )
}
