"use server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import crypto from "crypto"

const COOKIE_NAME = "admin_token"

function token(): string {
  const secret = process.env.ADMIN_SECRET
  if (!secret) throw new Error("ADMIN_SECRET env var not set")
  return crypto
    .createHash("sha256")
    .update(secret + "::admin")
    .digest("hex")
}

export async function requireAdminAuth() {
  const cookieStore = await cookies()
  if (cookieStore.get(COOKIE_NAME)?.value !== token()) redirect("/admin/login")
}

export async function adminLogin(formData: FormData) {
  const code = formData.get("code") as string
  if (!code || code !== process.env.ADMIN_SECRET)
    redirect("/admin/login?error=1")

  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, token(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 8,
    path: "/",
  })
  redirect("/admin/dashboard")
}

export async function adminLogout() {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
  redirect("/admin/login")
}
