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
