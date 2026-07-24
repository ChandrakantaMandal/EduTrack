"use server"

import prisma from "@/lib/prisma"

export async function getUserProfile(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      name: true,
      email: true,
      studentId: true,
      course: true,
      section: true,
      practicalGroup: true,
      image: true,
    },
  })
  return user
}

export async function updateUserProfile(
  userId: string,
  data: {
    studentId?: string
    course?: string
    section?: string
    practicalGroup?: string
  }
) {
  return prisma.user.update({
    where: { id: userId },
    data: {
      ...data,
      practicalGroup: data.practicalGroup
        ? data.practicalGroup.toLowerCase()
        : data.practicalGroup,
    },
  })
}

export async function completeOnboarding(
  userId: string,
  data: { studentId: string; section: string; practicalGroup?: string }
) {
  return prisma.user.update({
    where: { id: userId },
    data: {
      studentId: data.studentId,
      section: data.section,
      practicalGroup: data.practicalGroup
        ? data.practicalGroup.toLowerCase()
        : null,
    },
  })
}

export async function getNotificationPreferences(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { preferences: true },
  })
  return (
    (user?.preferences as { notifications?: Record<string, boolean> } | null)
      ?.notifications ?? null
  )
}

export async function updateNotificationPreferences(
  userId: string,
  prefs: Record<string, boolean>
) {
  const existing = await prisma.user.findUnique({
    where: { id: userId },
    select: { preferences: true },
  })
  await prisma.user.update({
    where: { id: userId },
    data: {
      preferences: {
        ...(existing?.preferences as Record<string, unknown> | undefined),
        notifications: prefs,
      },
    },
  })
}
