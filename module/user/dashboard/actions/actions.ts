"use server"

import prisma from "@/lib/prisma"
import { calcMonthly } from "@/lib/attendance"

export async function getAttendanceWarnings(userId: string) {
  const subjects = await prisma.subject.findMany({ orderBy: { name: "asc" } })

  const warnings = await Promise.all(
    subjects.map(async (s) => {
      const total = await prisma.attendance.count({
        where: { subjectId: s.id, userId },
      })
      if (total === 0) return null
      const present = await prisma.attendance.count({
        where: { subjectId: s.id, userId, present: true },
      })
      const percentage = Math.round((present / total) * 100)
      if (percentage >= 75) return null
      return { subjectName: s.name, percentage, present, total }
    })
  )

  return warnings.filter((w): w is NonNullable<typeof w> => w !== null)
}

export async function getStudentDashboardData(userId: string) {
  const subjects = await prisma.subject.findMany({ orderBy: { name: "asc" } })

  const subjectsWithAttendance = await Promise.all(
    subjects.map(async (s) => {
      const total = await prisma.attendance.count({
        where: { subjectId: s.id, userId },
      })
      if (total === 0)
        return { ...s, attendance: { percentage: 0, present: 0, total: 0 } }
      const present = await prisma.attendance.count({
        where: { subjectId: s.id, userId, present: true },
      })
      return {
        ...s,
        attendance: {
          percentage: Math.round((present / total) * 100),
          present,
          total,
        },
      }
    })
  )

  const allRecords = await prisma.attendance.findMany({
    where: { userId },
    select: { present: true, date: true },
  })

  const totalDays = allRecords.length
  const daysPresent = allRecords.filter((r) => r.present).length
  const avgAttendance =
    totalDays > 0 ? Math.round((daysPresent / totalDays) * 100) : 0

  const monthlyTrend = calcMonthly(allRecords)

  const bestSubject =
    subjectsWithAttendance.length > 0
      ? subjectsWithAttendance.reduce((best, s) =>
          s.attendance.percentage > (best.attendance?.percentage ?? -1)
            ? s
            : best
        )
      : null

  return {
    subjects: subjectsWithAttendance,
    avgAttendance,
    totalDays,
    daysPresent,
    monthlyTrend,
    bestSubject: bestSubject
      ? {
          name: bestSubject.name,
          percentage: bestSubject.attendance.percentage,
        }
      : null,
  }
}
