import { getToken } from "next-auth/jwt"
import { jwtDecode } from "jwt-decode"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const bearer = req.headers.get("authorization")?.replace("Bearer ", "")
  if (bearer) {
    try {
      const decoded = jwtDecode<{ exp?: number }>(bearer)
      if (decoded.exp && Date.now() >= decoded.exp * 1000) {
        return NextResponse.json({ error: "Token expired" }, { status: 401 })
      }
      return NextResponse.json({ token: bearer })
    } catch {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
  }

  const token = await getToken({ req, raw: true })
  if (!token)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  return NextResponse.json({ token })
}
