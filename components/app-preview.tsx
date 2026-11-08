import {
  CalendarDays,
  Car,
  CircleCheck,
  Clock,
  House,
  MapPin,
  Sparkles,
  User,
} from "lucide-react"

import { CarIllustration } from "@/components/car-illustration"
import { cn } from "@/lib/utils"

const SERVICES = ["Exterior", "Interior", "Full detail"]
const SLOTS = ["10:00", "12:30", "15:00"]

/**
 * Illustrative mock-up of the upcoming BayWashCare app: a phone with a sample
 * booking screen, two floating status cards, and a backdrop of brand shapes.
 * Purely decorative, so it is exposed to assistive tech as a single image.
 */
export function AppPreview({ className }: { className?: string }) {
  return (
    <figure
      role="img"
      aria-label="Preview of the upcoming BayWashCare app: book a doorstep car wash, pick a service and a time slot."
      className={cn("relative mx-auto w-full max-w-[500px]", className)}
    >
      {/* backdrop shapes */}
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 aspect-square w-[92%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_30%_30%,#38d4ff,#0e7fb0_55%,#0b3a5c_100%)] opacity-90 shadow-[0_0_120px_20px_rgba(56,212,255,0.22)]"
      />
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 aspect-square w-[112%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/15"
      />
      {/* rising bubbles */}
      <div aria-hidden className="absolute inset-0">
        {[
          "left-[6%] bottom-[18%] size-6 [animation-delay:0s]",
          "left-[14%] bottom-[34%] size-3 [animation-delay:1.8s]",
          "right-[8%] bottom-[26%] size-8 [animation-delay:0.9s]",
          "right-[16%] bottom-[48%] size-4 [animation-delay:3s]",
          "left-[22%] bottom-[8%] size-4 [animation-delay:4.2s]",
        ].map((pos) => (
          <span
            key={pos}
            className={cn(
              "absolute rounded-full border border-white/70 bg-white/15 opacity-0 motion-safe:animate-rise motion-reduce:opacity-60",
              pos
            )}
          />
        ))}
      </div>

      {/* phone: real handset proportions (~71.5 × 147 mm) */}
      <div className="relative mx-auto aspect-[71.5/147] w-[236px] motion-safe:animate-float sm:w-[256px]">
        {/* side buttons */}
        <span
          aria-hidden
          className="absolute top-[18%] -left-[3px] h-8 w-[3px] rounded-l bg-[#1a2333]"
        />
        <span
          aria-hidden
          className="absolute top-[27%] -left-[3px] h-12 w-[3px] rounded-l bg-[#1a2333]"
        />
        <span
          aria-hidden
          className="absolute top-[24%] -right-[3px] h-16 w-[3px] rounded-r bg-[#1a2333]"
        />

        <div className="h-full rounded-[2.6rem] bg-[#0b1220] p-[9px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.75),inset_0_0_0_1.5px_rgba(255,255,255,0.1)]">
          <div className="relative flex h-full flex-col overflow-hidden rounded-[2.05rem] bg-[#f3fbff] text-[#04070d]">
            {/* status bar + dynamic island */}
            <div className="relative flex items-center justify-between px-5 pt-3 text-[10px] font-semibold">
              <span>9:41</span>
              <span className="absolute top-2 left-1/2 h-[22px] w-[74px] -translate-x-1/2 rounded-full bg-[#0b1220]" />
              <span className="flex items-end gap-[2px]">
                <span className="h-1.5 w-[3px] rounded-sm bg-current" />
                <span className="h-2 w-[3px] rounded-sm bg-current" />
                <span className="h-2.5 w-[3px] rounded-sm bg-current" />
                <span className="ml-1 h-2.5 w-5 rounded-[3px] border border-current p-[1px]">
                  <span className="block h-full w-3/4 rounded-[1px] bg-current" />
                </span>
              </span>
            </div>

            <div className="flex flex-1 flex-col px-3.5 pt-4">
              {/* greeting */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-slate-500">Good morning</p>
                  <p className="font-heading text-[15px] leading-tight font-extrabold">
                    Let&apos;s make it shine
                  </p>
                </div>
                <span className="grid size-8 place-items-center rounded-full bg-cyan-100 text-xs font-bold text-cyan-700">
                  B
                </span>
              </div>

              {/* hero card */}
              <div className="mt-3 overflow-hidden rounded-2xl bg-[radial-gradient(ellipse_at_70%_20%,#13456b,#071423_70%)] px-3 pt-2.5 text-white shadow-[0_10px_24px_-10px_rgba(4,7,13,0.6)]">
                <div className="flex items-center gap-1 text-[9px] text-cyan-200">
                  <MapPin className="size-2.5" aria-hidden />
                  At your doorstep
                </div>
                <p className="mt-0.5 font-heading text-[13px] font-bold">
                  Doorstep car wash
                </p>
                <CarIllustration className="mt-1 -mb-1 w-full" />
              </div>

              {/* services */}
              <p className="mt-3 text-[10px] font-semibold text-slate-500">
                Choose a service
              </p>
              <div className="mt-1.5 flex gap-1">
                {SERVICES.map((s, i) => (
                  <span
                    key={s}
                    className={cn(
                      "rounded-full px-2 py-1 text-[9px] font-semibold whitespace-nowrap",
                      i === 2
                        ? "bg-cyan-400 text-[#04070d]"
                        : "bg-white text-slate-600 ring-1 ring-slate-200"
                    )}
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* slots */}
              <p className="mt-3 text-[10px] font-semibold text-slate-500">
                Today
              </p>
              <div className="mt-1.5 grid grid-cols-3 gap-1">
                {SLOTS.map((t, i) => (
                  <span
                    key={t}
                    className={cn(
                      "rounded-xl py-1.5 text-center text-[10px] font-semibold",
                      i === 1
                        ? "bg-[#04070d] text-white"
                        : "bg-white text-slate-600 ring-1 ring-slate-200"
                    )}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* upcoming */}
              <div className="mt-3 flex items-center gap-2 rounded-xl bg-white p-2 ring-1 ring-slate-200">
                <span className="grid size-7 place-items-center rounded-lg bg-cyan-50 text-cyan-600">
                  <Clock className="size-3.5" aria-hidden />
                </span>
                <span className="leading-tight">
                  <span className="block text-[10px] font-bold">
                    Full detail · 12:30
                  </span>
                  <span className="block text-[9px] text-slate-500">
                    Washer arrives at your door
                  </span>
                </span>
              </div>

              {/* CTA */}
              <div className="mt-auto mb-3 rounded-2xl bg-cyan-400 py-2.5 text-center text-[11px] font-bold shadow-[0_8px_20px_-6px_rgba(34,211,238,0.8)]">
                Book a wash
              </div>
            </div>

            {/* tab bar + home indicator */}
            <div className="border-t border-slate-200 bg-white px-4 pt-2">
              <div className="flex items-center justify-around text-slate-400">
                <House className="size-4 text-cyan-600" aria-hidden />
                <CalendarDays className="size-4" aria-hidden />
                <Car className="size-4" aria-hidden />
                <User className="size-4" aria-hidden />
              </div>
              <div className="mx-auto mt-2.5 mb-1.5 h-1 w-20 rounded-full bg-[#04070d]" />
            </div>
          </div>
        </div>
      </div>

      {/* floating status cards */}
      <div
        aria-hidden
        className="absolute -top-2 left-0 flex items-center gap-2.5 rounded-2xl bg-white/95 px-3 py-2.5 text-[#04070d] shadow-[0_20px_40px_-12px_rgba(0,0,0,0.5)] backdrop-blur sm:top-[20%] sm:-left-8"
      >
        <span className="grid size-8 place-items-center rounded-full bg-cyan-100 text-cyan-700">
          <Car className="size-4" />
        </span>
        <span className="text-left leading-tight">
          <span className="block text-xs font-bold">Washer on the way</span>
          <span className="block text-[10px] text-slate-500">
            Arriving in 10 min
          </span>
        </span>
      </div>
      <div
        aria-hidden
        className="absolute right-0 bottom-[2%] flex items-center gap-2.5 rounded-2xl bg-white/95 px-3 py-2.5 text-[#04070d] shadow-[0_20px_40px_-12px_rgba(0,0,0,0.5)] backdrop-blur sm:-right-8 sm:bottom-[14%]"
      >
        <span className="grid size-8 place-items-center rounded-full bg-emerald-100 text-emerald-600">
          <CircleCheck className="size-4" />
        </span>
        <span className="text-left leading-tight">
          <span className="flex items-center gap-1 text-xs font-bold">
            Spotless <Sparkles className="size-3 text-cyan-500" />
          </span>
          <span className="block text-[10px] text-slate-500">
            Your car is ready
          </span>
        </span>
      </div>
    </figure>
  )
}
