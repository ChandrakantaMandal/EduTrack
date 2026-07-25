import { decode, getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const bearer = req.headers.get("authorization")?.replace("Bearer ", "")
  if (bearer) {
    const valid = await decode({
      token: bearer,
      secret: process.env.AUTH_SECRET!,
    })
    if (!valid)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    return NextResponse.json({ token: bearer })
  }

  const token = await getToken({
    req,
    raw: true,
    cookieName: "next-auth.session-token",
    secret: process.env.AUTH_SECRET,
  })
  if (!token)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  return NextResponse.json({ token })
}
