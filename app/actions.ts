"use server"

import { getPool } from "@/lib/db"

export type WaitlistState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | { status: "error"; message: string; email?: string }

// Pragmatic check: one @, no spaces, a dot in the domain. Real verification
// happens when we email them at launch.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export async function joinWaitlist(
  _prev: WaitlistState,
  formData: FormData
): Promise<WaitlistState> {
  // Honeypot: hidden from people, often filled by bots. Pretend it worked.
  if (formData.get("company")) {
    return { status: "success", message: "You're on the list." }
  }

  const raw = String(formData.get("email") ?? "")
  const email = raw.trim().toLowerCase()

  if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
    return {
      status: "error",
      message: "Please enter a valid email address.",
      email: raw,
    }
  }

  try {
    const { rowCount } = await getPool().query(
      "INSERT INTO waitlist (email) VALUES ($1) ON CONFLICT (email) DO NOTHING",
      [email]
    )
    return {
      status: "success",
      message:
        rowCount === 0
          ? "You're already on the list. We'll be in touch at launch."
          : "You're on the list! We'll email you the moment we launch.",
    }
  } catch (err) {
    console.error("joinWaitlist failed", err)
    return {
      status: "error",
      message: "Something went wrong on our side. Please try again.",
      email: raw,
    }
  }
}
