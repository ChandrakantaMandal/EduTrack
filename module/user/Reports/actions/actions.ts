"use server"

import prisma from "@/lib/prisma"

export async function getStudentReports(userId: string) {
  const records = await prisma.attendance.findMany({
    where: { userId },
    include: { subject: { select: { name: true } } },
    orderBy: { date: "asc" },
  })

  if (records.length === 0) {
    return {
      monthlySummary: [],
      subjectWise: [],
      weeklyTrend: [],
      insights: {
        bestDay: null,
        needsImprovement: null,
        currentStreak: 0,
        peakMonth: null,
      },
    }
  }

  const monthlyMap = new Map<string, { present: number; total: number }>()
  for (const r of records) {
    const key = `${r.date.getFullYear()}-${String(r.date.getMonth() + 1).padStart(2, "0")}`
    const entry = monthlyMap.get(key) || { present: 0, total: 0 }
    entry.total++
    if (r.present) entry.present++
    monthlyMap.set(key, entry)
  }
  const monthlySummary = Array.from(monthlyMap.entries())
    .map(([month, d]) => ({
      month,
      percentage: Math.round((d.present / d.total) * 100),
      present: d.present,
      total: d.total,
    }))
    .sort((a, b) => a.month.localeCompare(b.month))

  const subjectMap = new Map<string, { present: number; total: number }>()
  for (const r of records) {
    const entry = subjectMap.get(r.subject.name) || { present: 0, total: 0 }
    entry.total++
    if (r.present) entry.present++
    subjectMap.set(r.subject.name, entry)
  }
  const subjectWise = Array.from(subjectMap.entries())
    .map(([subject, d]) => ({
      subject,
      percentage: Math.round((d.present / d.total) * 100),
      present: d.present,
      total: d.total,
    }))
    .sort((a, b) => a.subject.localeCompare(b.subject))

  const weeklyMap = new Map<string, { present: number; total: number }>()
  for (const r of records) {
    const d = new Date(r.date)
    const day = d.getDay()
    const diff = d.getDate() - day + (day === 0 ? -6 : 1)
    const monday = new Date(d.setDate(diff))
    const key = `${monday.getFullYear()}-${String(monday.getMonth() + 1).padStart(2, "0")}-${String(monday.getDate()).padStart(2, "0")}`
    const entry = weeklyMap.get(key) || { present: 0, total: 0 }
    entry.total++
    if (r.present) entry.present++
    weeklyMap.set(key, entry)
  }
  const weeklyTrend = Array.from(weeklyMap.entries())
    .map(([week, d]) => ({
      week,
      percentage: Math.round((d.present / d.total) * 100),
      present: d.present,
      total: d.total,
    }))
    .sort((a, b) => a.week.localeCompare(b.week))

  const dayMap = new Map<string, { present: number; total: number }>()
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]
  for (const r of records) {
    const dayName = dayNames[r.date.getDay()]
    const entry = dayMap.get(dayName) || { present: 0, total: 0 }
    entry.total++
    if (r.present) entry.present++
    dayMap.set(dayName, entry)
  }
  let bestDay: string | null = null
  let bestDayPct = -1
  for (const [day, d] of dayMap) {
    const pct = Math.round((d.present / d.total) * 100)
    if (pct > bestDayPct) {
      bestDayPct = pct
      bestDay = day
    }
  }

  const worstSubject = subjectWise.reduce((worst, s) =>
    s.percentage < worst.percentage ? s : worst
  )

  let streak = 0
  const sortedDates = [
    ...new Set(
      records
        .filter((r) => r.present)
        .map((r) => r.date.toISOString().split("T")[0])
    ),
  ]
    .sort()
    .reverse()
  if (sortedDates.length > 0) {
    const expected = new Date(sortedDates[0])
    for (const dateStr of sortedDates) {
      if (dateStr === expected.toISOString().split("T")[0]) {
        streak++
        expected.setDate(expected.getDate() - 1)
      } else {
        break
      }
    }
  }

  const peakMonth = monthlySummary.reduce((peak, m) =>
    m.percentage > peak.percentage ? m : peak
  )

  return {
    monthlySummary,
    subjectWise,
    weeklyTrend,
    insights: {
      bestDay,
      needsImprovement: worstSubject.percentage < 100 ? worstSubject : null,
      currentStreak: streak,
      peakMonth: peakMonth.month,
    },
  }
}
