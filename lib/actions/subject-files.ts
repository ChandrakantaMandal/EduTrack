"use server"

import { supabaseAdmin } from "@/lib/supabase-admin"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

const BUCKET = "subject-files"
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

export async function ensureBucket() {
  const { data: buckets } = await supabaseAdmin.storage.listBuckets()
  if (!buckets?.find((b) => b.name === BUCKET)) {
    await supabaseAdmin.storage.createBucket(BUCKET, {
      public: true,
    })
  }
}

export async function createSignedUploadUrl(
  subjectId: string,
  label: string,
  type: "SYLLABUS" | "NOTES",
  fileName: string,
  fileSize: number
) {
  await ensureBucket()

  if (fileSize > MAX_FILE_SIZE) {
    throw new Error("File exceeds the 10MB limit")
  }

  const ext = fileName.split(".").pop()
  const path = `${subjectId}/${type.toLowerCase()}/${crypto.randomUUID()}.${ext}`

  const { data, error } = await supabaseAdmin.storage
    .from(BUCKET)
    .createSignedUploadUrl(path)

  if (error || !data)
    throw new Error(error?.message ?? "Failed to create upload")

  const {
    data: { publicUrl },
  } = supabaseAdmin.storage.from(BUCKET).getPublicUrl(path)

  return { signedUrl: data.signedUrl, path, publicUrl }
}

export async function saveSubjectFile(
  subjectId: string,
  label: string,
  type: "SYLLABUS" | "NOTES",
  filePath: string,
  publicUrl: string
) {
  await prisma.subjectFile.create({
    data: {
      subjectId,
      label,
      type,
      fileUrl: publicUrl,
      filePath,
    },
  })

  revalidatePath("/admin/subjects")
  revalidatePath("/admin/subjects/files")
  revalidatePath("/dashboard/subjects/files")
}

export async function deleteSubjectFile(id: string) {
  const file = await prisma.subjectFile.findUniqueOrThrow({ where: { id } })

  await supabaseAdmin.storage.from(BUCKET).remove([file.filePath])
  await prisma.subjectFile.delete({ where: { id } })

  revalidatePath("/admin/subjects")
  revalidatePath("/admin/subjects/files")
  revalidatePath("/dashboard/subjects/files")
}

export async function getSubjectFiles(subjectId: string) {
  return prisma.subjectFile.findMany({
    where: { subjectId },
    orderBy: { createdAt: "desc" },
  })
}

export async function getAllSubjectsWithFiles() {
  const subjects = await prisma.subject.findMany({
    include: {
      subjectFiles: { orderBy: { createdAt: "desc" } },
    },
    orderBy: { name: "asc" },
  })
  return subjects
}
