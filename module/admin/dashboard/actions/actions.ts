"use server"

import prisma from "@/lib/prisma"

export async function getSubjects() {
  return prisma.subject.findMany({ orderBy: { name: "asc" } })
}

export async function getUsers() {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      studentId: true,
      course: true,
    },
    orderBy: { name: "asc" },
  })
}

export async function getAttendanceRecords(subjectId: string, date: string) {
  const start = new Date(date + "T00:00:00.000Z")
  const end = new Date(date + "T23:59:59.999Z")
  return prisma.attendance.findMany({
    where: { subjectId, date: { gte: start, lte: end } },
  })
}

export async function saveAttendance(
  subjectId: string,
  date: string,
  records: { userId: string; present: boolean }[]
) {
  const dateStart = new Date(date + "T00:00:00.000Z")

  await prisma.$transaction(
    records.map((r) =>
      prisma.attendance.upsert({
        where: {
          userId_subjectId_date: {
            userId: r.userId,
            subjectId,
            date: dateStart,
          },
        },
        update: { present: r.present },
        create: {
          userId: r.userId,
          subjectId,
          date: dateStart,
          present: r.present,
        },
      })
    )
  )
}

export async function getAdminDashboardData() {
  const totalStudents = await prisma.user.count({
    where: { studentId: { not: null } },
  })

  const totalSubjects = await prisma.subject.count()

  const attendanceRecords = await prisma.attendance.findMany({
    select: { present: true },
  })
  const totalAttendanceDays = attendanceRecords.length
  const presentDays = attendanceRecords.filter((r) => r.present).length
  const avgAttendance =
    totalAttendanceDays > 0
      ? Math.round((presentDays / totalAttendanceDays) * 100 * 10) / 10
      : 0

  const recentStudents = await prisma.user.findMany({
    where: { studentId: { not: null } },
    select: { name: true, email: true, studentId: true, course: true },
    orderBy: { id: "desc" },
    take: 4,
  })

  const subjects = await prisma.subject.findMany({
    select: { id: true, name: true },
  })

  const alerts: { name: string; students: number; status: string }[] = []
  for (const s of subjects) {
    const subjectAttendance = await prisma.attendance.findMany({
      where: { subjectId: s.id },
      select: { userId: true, present: true },
    })
    if (subjectAttendance.length === 0) continue

    const userMap = new Map<string, { total: number; present: number }>()
    for (const r of subjectAttendance) {
      if (!userMap.has(r.userId))
        userMap.set(r.userId, { total: 0, present: 0 })
      const entry = userMap.get(r.userId)!
      entry.total++
      if (r.present) entry.present++
    }

    let belowThreshold = 0
    for (const entry of userMap.values()) {
      const pct = (entry.present / entry.total) * 100
      if (pct < 75) belowThreshold++
    }

    if (belowThreshold > 0) {
      alerts.push({
        name: s.name,
        students: belowThreshold,
        status:
          belowThreshold > 10
            ? "critical"
            : belowThreshold > 5
              ? "warning"
              : "normal",
      })
    }
  }

  alerts.sort((a, b) => b.students - a.students)

  return {
    totalStudents,
    totalSubjects,
    avgAttendance,
    recentStudents,
    alerts,
  }
}

export async function generateRollNumbers() {
  const users = await prisma.user.findMany({
    where: { studentId: null },
    orderBy: { name: "asc" },
  })

  const lastRoll = await prisma.user.findFirst({
    where: { studentId: { not: null } },
    orderBy: { studentId: "desc" },
    select: { studentId: true },
  })

  let nextNum = 1
  if (lastRoll?.studentId) {
    const parts = lastRoll.studentId.split("-")
    const lastNum = parseInt(parts[parts.length - 1], 10)
    if (!isNaN(lastNum)) nextNum = lastNum + 1
  }

  const year = new Date().getFullYear()
  let count = 0
  for (const user of users) {
    const roll = `STU-${year}-${String(nextNum + count).padStart(3, "0")}`
    await prisma.user.update({
      where: { id: user.id },
      data: { studentId: roll },
    })
    count++
  }

  return { assigned: count }
}
