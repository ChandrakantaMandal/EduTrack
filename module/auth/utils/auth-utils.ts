"use server"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Session } from "next-auth"

type AuthenticatedSession = Session & {
  user: NonNullable<Session["user"]>
}

export async function requireAuth(): Promise<AuthenticatedSession> {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  if (!session.user) {
    redirect("/login")
  }

  return session as AuthenticatedSession
}

export async function requireUnAuth() {
  const session = await auth()

  if (session) {
    redirect("/dashboard")
  }

  return null
}
