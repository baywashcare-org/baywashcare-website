import type { Metadata, Viewport } from "next"
import { Geist_Mono, DM_Sans, Raleway } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

const ralewayHeading = Raleway({
  subsets: ["latin"],
  variable: "--font-heading",
})

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    title: site.title,
    description: "Professional car cleaning and care. Our app is coming soon.",
    url: "/",
    siteName: site.name,
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: "Professional car cleaning and care. Our app is coming soon.",
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: site.themeColor,
  colorScheme: "dark",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        dmSans.variable,
        ralewayHeading.variable
      )}
    >
      <body>
        {/* The landing page is designed dark-only; keep the theme fixed. */}
        <ThemeProvider forcedTheme="dark">{children}</ThemeProvider>
      </body>
    </html>
  )
}
