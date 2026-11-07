import { HeroSceneLoader } from "@/components/hero-scene-loader"

export default function Page() {
  return (
    <main className="relative flex min-h-svh flex-col overflow-hidden bg-[#04070d] text-white">
      {/* background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(56,212,255,0.22),transparent_55%),radial-gradient(ellipse_at_10%_90%,rgba(21,150,201,0.15),transparent_50%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)] [background-size:56px_56px] opacity-[0.07]"
      />

      {/* nav */}
      <header className="relative z-10 flex items-center justify-between px-6 py-6 md:px-12">
        <span className="font-heading text-xl font-bold tracking-tight">
          Bay<span className="text-cyan-300">Wash</span>Care
        </span>
        <a
          href="mailto:baywashcare@gmail.com"
          className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/80 backdrop-blur transition hover:border-cyan-300/60 hover:text-white"
        >
          Contact
        </a>
      </header>

      {/* hero */}
      <section className="relative z-10 grid flex-1 items-center gap-4 px-6 md:px-12 lg:grid-cols-2">
        <div className="max-w-xl py-8 lg:py-0">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs font-medium tracking-wider text-cyan-200 uppercase">
            <span className="size-1.5 animate-pulse rounded-full bg-cyan-300" />
            Coming soon
          </span>
          <h1 className="mt-6 font-heading text-5xl leading-[1.05] font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
            Car care,{" "}
            <span className="bg-gradient-to-r from-cyan-200 via-cyan-400 to-sky-500 bg-clip-text text-transparent">
              made spotless.
            </span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-white/65">
            BayWashCare is bringing professional car cleaning and care
            management to your doorstep. Our app is on the way.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="mailto:baywashcare@gmail.com?subject=Notify%20me%20about%20BayWashCare"
              className="rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-[#04070d] shadow-[0_0_30px_rgba(56,212,255,0.4)] transition hover:bg-cyan-200"
            >
              Get notified at launch
            </a>
            <span className="text-sm text-white/45">baywashcare@gmail.com</span>
          </div>
        </div>

        <div className="relative h-[380px] sm:h-[480px] lg:h-[calc(100svh-9rem)]">
          <HeroSceneLoader />
        </div>
      </section>

      <footer className="relative z-10 px-6 py-6 text-xs text-white/35 md:px-12">
        © {new Date().getFullYear()} BayWashCare. All rights reserved.
      </footer>
    </main>
  )
}
