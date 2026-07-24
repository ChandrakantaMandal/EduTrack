import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const { userId, studentId, section, practicalGroup } = await req.json()

    if (!userId || !studentId || !section) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const existing = await prisma.user.findUnique({ where: { studentId } })
    if (existing && existing.id !== userId) {
      return NextResponse.json(
        { error: "Roll number is already taken" },
        { status: 409 }
      )
    }

    await prisma.user.update({
      where: { id: userId },
      data: { studentId, section, practicalGroup: practicalGroup || null },
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
