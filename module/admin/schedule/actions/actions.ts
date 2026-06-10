"use server"

import prisma from "@/lib/prisma"

export async function getSubjects() {
  return prisma.subject.findMany({ orderBy: { name: "asc" } })
}

export async function getSchedule(includeSubjects = false) {
  const entries = await prisma.scheduleEntry.findMany({
    include: { subject: true },
    orderBy: [{ day: "asc" }, { startTime: "asc" }],
  })
  if (!includeSubjects) return entries
  const subjects = await prisma.subject.findMany({
    where: { schedule: { not: null } },
  })
  const subjectEntries = subjects.map((s) => ({
    id: `subject-${s.id}`,
    day: s.schedule!,
    startTime: "",
    endTime: "",
    room: null as string | null,
    subjectId: s.id,
    subject: { id: s.id, name: s.name, code: s.code, professor: s.professor },
  }))
  return [...entries, ...subjectEntries].sort(
    (a, b) => daysOrder.indexOf(a.day) - daysOrder.indexOf(b.day)
  )
}

const daysOrder = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
]

export async function createScheduleEntry(data: {
  subjectId: string
  day: string
  startTime: string
  endTime: string
  room?: string
}) {
  return prisma.scheduleEntry.create({ data })
}

export async function updateScheduleEntry(
  id: string,
  data: {
    subjectId: string
    day: string
    startTime: string
    endTime: string
    room?: string
  }
) {
  return prisma.scheduleEntry.update({ where: { id }, data })
}

export async function deleteScheduleEntry(id: string) {
  await prisma.scheduleEntry.delete({ where: { id } })
}
