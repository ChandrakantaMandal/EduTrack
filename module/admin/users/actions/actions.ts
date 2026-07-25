"use server"

import prisma from "@/lib/prisma"

export async function getAllUsers() {
  return prisma.user.findMany({
    orderBy: { name: "asc" },
  })
}

export async function deleteUser(id: string) {
  await prisma.user.delete({ where: { id } })
}
