import { BellRing, Mail, Phone } from "lucide-react"

import { HeroSceneLoader } from "@/components/hero-scene-loader"
import { site } from "@/lib/site"

const EMAIL = site.email
const PHONE_DISPLAY = site.phoneDisplay
const PHONE_HREF = site.phoneHref

const contactLink =
  "inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-cyan-200 focus-visible:text-cyan-200 focus-visible:outline-none"

export default function Page() {
  return (
    <main className="relative isolate flex min-h-svh flex-col overflow-hidden bg-[#04070d] text-white">
      {/* background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_75%_45%,rgba(56,212,255,0.18),transparent_70%),radial-gradient(ellipse_50%_40%_at_0%_100%,rgba(21,150,201,0.14),transparent_70%)]"
      />
      {/* faint grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] [background-size:64px_64px] opacity-[0.05]"
      />

      {/* nav */}
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 sm:px-8 md:py-7">
        <span className="font-heading text-xl font-bold tracking-tight">
          Bay<span className="text-cyan-300">Wash</span>Care
        </span>
        <a
          href={`mailto:${EMAIL}`}
          className="rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 text-sm text-white/80 backdrop-blur transition hover:border-cyan-300/60 hover:text-white focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:outline-none"
        >
          Contact
        </a>
      </header>

      {/* hero */}
      <section className="mx-auto grid w-full max-w-7xl flex-1 items-center gap-2 px-5 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:gap-8">
        <div className="max-w-xl pt-6 lg:pt-0">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-cyan-300/25 bg-cyan-300/[0.08] px-3.5 py-1.5 text-xs font-medium tracking-[0.14em] text-cyan-200 uppercase motion-safe:animate-in motion-safe:duration-700 motion-safe:fade-in motion-safe:slide-in-from-bottom-2">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full rounded-full bg-cyan-300 opacity-75 motion-safe:animate-ping" />
              <span className="relative inline-flex size-2 rounded-full bg-cyan-300" />
            </span>
            Coming soon
          </span>

          <h1 className="mt-6 font-heading text-[2.75rem] leading-[1.02] font-extrabold tracking-tight text-balance motion-safe:animate-in motion-safe:delay-100 motion-safe:duration-700 motion-safe:fill-mode-both motion-safe:fade-in motion-safe:slide-in-from-bottom-3 sm:text-6xl lg:text-7xl">
            Car care,{" "}
            <span className="bg-gradient-to-r from-cyan-200 via-cyan-300 to-sky-500 bg-clip-text text-transparent">
              made spotless.
            </span>
          </h1>

          <p className="mt-5 max-w-md text-base leading-relaxed text-white/70 motion-safe:animate-in motion-safe:delay-200 motion-safe:duration-700 motion-safe:fill-mode-both motion-safe:fade-in motion-safe:slide-in-from-bottom-3 sm:text-lg">
            BayWashCare is bringing professional car cleaning and care
            management to your doorstep. Our app is on the way.
          </p>

          <div className="mt-8 motion-safe:animate-in motion-safe:delay-300 motion-safe:duration-700 motion-safe:fill-mode-both motion-safe:fade-in motion-safe:slide-in-from-bottom-3">
            <a
              href={`mailto:${EMAIL}?subject=Notify%20me%20about%20BayWashCare`}
              className="group inline-flex items-center gap-2 rounded-full bg-cyan-300 px-6 py-3.5 text-sm font-semibold text-[#04070d] shadow-[0_0_0_1px_rgba(165,243,252,0.5),0_8px_30px_-4px_rgba(56,212,255,0.55)] transition hover:-translate-y-0.5 hover:bg-cyan-200 hover:shadow-[0_0_0_1px_rgba(165,243,252,0.7),0_12px_40px_-4px_rgba(56,212,255,0.7)] focus-visible:ring-2 focus-visible:ring-cyan-200 focus-visible:ring-offset-2 focus-visible:ring-offset-[#04070d] focus-visible:outline-none"
            >
              <BellRing
                aria-hidden
                className="size-4 transition group-hover:rotate-12"
              />
              Get notified at launch
            </a>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a href={`mailto:${EMAIL}`} className={contactLink}>
                <Mail aria-hidden className="size-4" />
                {EMAIL}
              </a>
              <a href={PHONE_HREF} className={contactLink}>
                <Phone aria-hidden className="size-4" />
                {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>

        <div className="relative -mx-5 h-[340px] motion-safe:animate-in motion-safe:delay-200 motion-safe:duration-1000 motion-safe:fill-mode-both motion-safe:fade-in sm:mx-0 sm:h-[440px] lg:h-[min(640px,calc(100svh-10rem))]">
          {/* soft halo behind the car */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-[15%] top-1/2 h-1/2 -translate-y-1/2 rounded-full bg-cyan-400/20 blur-3xl"
          />
          <HeroSceneLoader />
        </div>
      </section>

      <footer className="mx-auto w-full max-w-7xl px-5 py-6 text-xs text-white/50 sm:px-8">
        © {new Date().getFullYear()} BayWashCare. All rights reserved.
      </footer>
    </main>
  )
}
