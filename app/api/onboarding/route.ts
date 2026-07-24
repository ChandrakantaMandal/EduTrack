import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { requireAuth } from "@/module/auth/utils/auth-utils"

export async function GET() {
  try {
    const { user } = await requireAuth()
    const profile = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        name: true,
        email: true,
        studentId: true,
        section: true,
        practicalGroup: true,
      },
    })
    return NextResponse.json({ user: profile })
  } catch (err) {
    console.error("[onboarding] GET error:", err)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}

export async function POST(req: Request) {
  try {
    const { user } = await requireAuth()
    const { studentId, section, practicalGroup } = await req.json()

    if (!studentId || !section) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const existing = await prisma.user.findUnique({ where: { studentId } })
    if (existing && existing.id !== user.id) {
      return NextResponse.json(
        { error: "Roll number is already taken" },
        { status: 409 }
      )
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        studentId,
        section,
        practicalGroup: practicalGroup ? practicalGroup.toLowerCase() : null,
      },
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("[onboarding] POST error:", err)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
