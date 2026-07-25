import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const { token } = await req.json()
  if (!token)
    return NextResponse.json({ error: "Missing token" }, { status: 400 })

  const isProd = process.env.NODE_ENV === "production"
  const res = NextResponse.json({ restored: true })
  res.headers.set(
    "Set-Cookie",
    `next-auth.session-token=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${30 * 24 * 60 * 60};${isProd ? " Secure;" : ""}`
  )
  return res
}
