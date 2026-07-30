"use client"

import dynamic from "next/dynamic"

export const SubjectFilesPage = dynamic(
  () =>
    import("@/module/user/subjects/components/subject-files-page").then(
      (m) => ({
        default: m.SubjectFilesPage,
      })
    ),
  { ssr: false }
)
