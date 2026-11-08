"use client"

import { useActionState, useId } from "react"
import { ArrowRight, CircleCheck, LoaderCircle } from "lucide-react"

import { joinWaitlist, type WaitlistState } from "@/app/actions"
import { cn } from "@/lib/utils"

const initialState: WaitlistState = { status: "idle" }

export function WaitlistForm({ className }: { className?: string }) {
  const [state, formAction, pending] = useActionState(
    joinWaitlist,
    initialState
  )
  const id = useId()
  const emailId = `${id}-email`
  const msgId = `${id}-msg`

  if (state.status === "success") {
    return (
      <div
        role="status"
        className={cn(
          "flex max-w-md items-center gap-3 rounded-2xl border border-cyan-300/25 bg-cyan-300/10 px-5 py-4 text-sm text-cyan-50",
          className
        )}
      >
        <CircleCheck aria-hidden className="size-5 shrink-0 text-cyan-300" />
        {state.message}
      </div>
    )
  }

  const error = state.status === "error" ? state.message : null

  return (
    <form action={formAction} noValidate className={cn("max-w-md", className)}>
      <label htmlFor={emailId} className="sr-only">
        Email address — get notified when we launch
      </label>
      <div
        className={cn(
          "flex items-center gap-1.5 rounded-full border bg-white/[0.06] p-1.5 backdrop-blur transition focus-within:border-cyan-300/70 focus-within:bg-white/[0.09] focus-within:shadow-[0_0_0_4px_rgba(56,212,255,0.12)]",
          error ? "border-rose-400/70" : "border-white/15"
        )}
      >
        <input
          id={emailId}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          maxLength={254}
          placeholder="Enter your email"
          defaultValue={state.status === "error" ? state.email : undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={msgId}
          className="min-w-0 flex-1 bg-transparent px-4 py-2.5 text-base text-white placeholder:text-white/35 focus:outline-none sm:text-sm"
        />
        {/* Honeypot: invisible to people and screen readers. */}
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          className="hidden"
        />
        <button
          type="submit"
          disabled={pending}
          className="group inline-flex shrink-0 items-center gap-1.5 rounded-full bg-cyan-300 px-5 py-2.5 text-sm font-semibold text-[#050a14] shadow-[0_8px_24px_-6px_rgba(56,212,255,0.6)] transition hover:bg-cyan-200 focus-visible:ring-2 focus-visible:ring-cyan-200 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050a14] focus-visible:outline-none disabled:opacity-70"
        >
          {pending ? (
            <LoaderCircle aria-hidden className="size-4 animate-spin" />
          ) : null}
          {pending ? "Joining…" : "Notify me"}
          {pending ? null : (
            <ArrowRight
              aria-hidden
              className="size-4 transition group-hover:translate-x-0.5"
            />
          )}
        </button>
      </div>
      {/* Always rendered so screen readers announce errors as they appear. */}
      <p
        id={msgId}
        aria-live="polite"
        className="mt-2.5 min-h-4 px-4 text-xs text-rose-300"
      >
        {error}
      </p>
    </form>
  )
}
