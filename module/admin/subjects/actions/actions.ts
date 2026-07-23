"use server"

import prisma from "@/lib/prisma"

export async function getAllSubjects() {
  return prisma.subject.findMany({ orderBy: { name: "asc" } })
}

export async function createSubject(data: {
  name: string
  code: string
  professor?: string
  day?: string
}) {
  const { day, ...rest } = data
  return prisma.subject.create({ data: { ...rest, schedule: day } })
}

export async function updateSubject(
  id: string,
  data: {
    name: string
    code: string
    professor?: string
    day?: string
  }
) {
  const { day, ...rest } = data
  return prisma.subject.update({
    where: { id },
    data: { ...rest, schedule: day },
  })
}

export async function deleteSubject(id: string) {
  await prisma.subject.delete({ where: { id } })
}
