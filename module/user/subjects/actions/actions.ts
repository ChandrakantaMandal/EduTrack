"use server"

import prisma from "@/lib/prisma"

export async function getAllSubjects() {
  return prisma.subject.findMany({ orderBy: { name: "asc" } })
}

export async function getStudentAttendance(subjectId: string, userId: string) {
  const total = await prisma.attendance.count({ where: { subjectId, userId } })
  if (total === 0) return { percentage: 0, present: 0, total: 0 }
  const present = await prisma.attendance.count({
    where: { subjectId, userId, present: true },
  })
  return { percentage: Math.round((present / total) * 100), present, total }
}

export async function getSubjectsWithAttendance(userId: string) {
  const subjects = await prisma.subject.findMany({ orderBy: { name: "asc" } })
  return Promise.all(
    subjects.map(async (s) => {
      const attendance = await getStudentAttendance(s.id, userId)
      return { ...s, attendance }
    })
  )
}
