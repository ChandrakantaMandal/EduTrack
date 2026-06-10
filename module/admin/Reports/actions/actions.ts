"use server"

import prisma from "@/lib/prisma"

export async function getAdminReports() {
  const totalStudents = await prisma.user.count({
    where: { studentId: { not: null } },
  })

  const totalSubjects = await prisma.subject.count()

  const allRecords = await prisma.attendance.findMany({
    select: {
      present: true,
      userId: true,
      subjectId: true,
      date: true,
      subject: { select: { name: true } },
    },
    orderBy: { date: "asc" },
  })

  const totalAttendanceDays = allRecords.length
  const presentDays = allRecords.filter((r) => r.present).length
  const avgAttendance =
    totalAttendanceDays > 0
      ? Math.round((presentDays / totalAttendanceDays) * 100 * 10) / 10
      : 0

  const atRisk = new Set<string>()
  const userSubjectMap = new Map<
    string,
    Map<string, { present: number; total: number }>
  >()
  for (const r of allRecords) {
    if (!userSubjectMap.has(r.userId)) userSubjectMap.set(r.userId, new Map())
    const subjectMap = userSubjectMap.get(r.userId)!
    if (!subjectMap.has(r.subjectId))
      subjectMap.set(r.subjectId, { present: 0, total: 0 })
    const entry = subjectMap.get(r.subjectId)!
    entry.total++
    if (r.present) entry.present++
  }
  for (const [, subjectMap] of userSubjectMap) {
    for (const [, entry] of subjectMap) {
      if ((entry.present / entry.total) * 100 < 50) {
        const uid = [...userSubjectMap.keys()].find(
          (k) => userSubjectMap.get(k) === subjectMap
        )
        if (uid) atRisk.add(uid)
      }
    }
  }

  const subjectAttendanceMap = new Map<
    string,
    { present: number; total: number }
  >()
  for (const r of allRecords) {
    const entry = subjectAttendanceMap.get(r.subject.name) || {
      present: 0,
      total: 0,
    }
    entry.total++
    if (r.present) entry.present++
    subjectAttendanceMap.set(r.subject.name, entry)
  }
  const subjectWise = Array.from(subjectAttendanceMap.entries())
    .map(([subject, d]) => ({
      subject,
      percentage: Math.round((d.present / d.total) * 100),
      present: d.present,
      total: d.total,
    }))
    .sort((a, b) => a.subject.localeCompare(b.subject))

  const monthlyMap = new Map<string, { present: number; total: number }>()
  for (const r of allRecords) {
    const key = `${r.date.getFullYear()}-${String(r.date.getMonth() + 1).padStart(2, "0")}`
    const entry = monthlyMap.get(key) || { present: 0, total: 0 }
    entry.total++
    if (r.present) entry.present++
    monthlyMap.set(key, entry)
  }
  const monthlyTrend = Array.from(monthlyMap.entries())
    .map(([month, d]) => ({
      month,
      percentage: Math.round((d.present / d.total) * 100),
      present: d.present,
      total: d.total,
    }))
    .sort((a, b) => a.month.localeCompare(b.month))

  const bestSubject = subjectWise.reduce((best, s) =>
    s.percentage > best.percentage ? s : best
  )
  const worstSubject = subjectWise.reduce((worst, s) =>
    s.percentage < worst.percentage ? s : worst
  )

  return {
    totalStudents,
    totalSubjects,
    avgAttendance,
    atRiskCount: atRisk.size,
    bestSubject,
    worstSubject,
    subjectWise,
    monthlyTrend,
  }
}
