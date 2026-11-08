import { Mail, Phone } from "lucide-react"

import { AppPreview } from "@/components/app-preview"
import { WaitlistForm } from "@/components/waitlist-form"
import { site } from "@/lib/site"

const footerLink =
  "inline-flex items-center gap-1.5 transition hover:text-cyan-200 focus-visible:text-cyan-200 focus-visible:outline-none"

const reveal =
  "motion-safe:animate-in motion-safe:fill-mode-both motion-safe:duration-700 motion-safe:fade-in motion-safe:slide-in-from-bottom-3"

export default function Page() {
  return (
    <main className="relative isolate flex min-h-svh flex-col overflow-hidden bg-[#050a14] text-white">
      {/* diagonal two-tone backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(160deg,#0a3550_0%,#0b2740_45%,#071a2c_100%)] [clip-path:polygon(0_46%,100%_34%,100%_100%,0_100%)] lg:[clip-path:polygon(0_22%,58%_58%,100%_34%,100%_100%,0_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_50%_at_78%_50%,rgba(56,212,255,0.18),transparent_70%)]"
      />

      {/* nav */}
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-6 sm:px-8 md:py-8">
        <span className="font-heading text-2xl font-extrabold tracking-tight">
          Bay<span className="text-cyan-300">Wash</span>Care
        </span>
        <a
          href={`mailto:${site.email}`}
          className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/80 transition hover:border-cyan-300/60 hover:text-white focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:outline-none"
        >
          Say hello
        </a>
      </header>

      {/* hero */}
      <section className="mx-auto grid w-full max-w-7xl flex-1 items-center gap-14 px-5 pt-4 pb-12 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:gap-6 lg:py-0">
        <div>
          <h1
            className={`font-heading text-[4.5rem] leading-[0.9] tracking-tight sm:text-8xl xl:text-[9rem] ${reveal}`}
          >
            <span className="block font-light">Coming</span>
            <span className="block bg-gradient-to-r from-cyan-200 via-cyan-300 to-sky-400 bg-clip-text pb-2 font-extrabold text-transparent">
              Soon.
            </span>
          </h1>

          <p
            className={`mt-6 max-w-md text-base leading-relaxed text-pretty text-white/70 sm:text-lg ${reveal} motion-safe:delay-100`}
          >
            Doorstep car care, booked from one simple app.
          </p>

          <WaitlistForm className={`mt-8 ${reveal} motion-safe:delay-200`} />
        </div>

        <AppPreview
          className={`${reveal} motion-safe:delay-200 motion-safe:duration-1000`}
        />
      </section>

      <footer className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-5 py-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>© {new Date().getFullYear()} BayWashCare. All rights reserved.</p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <a href={`mailto:${site.email}`} className={footerLink}>
            <Mail aria-hidden className="size-3.5" />
            {site.email}
          </a>
          <a href={site.phoneHref} className={footerLink}>
            <Phone aria-hidden className="size-3.5" />
            {site.phoneDisplay}
          </a>
        </div>
      </footer>
    </main>
  )
}
