"use client"

import dynamic from "next/dynamic"

export const SubjectsPage = dynamic(
  () =>
    import("@/module/admin/subjects/components/subjects-page").then((m) => ({
      default: m.SubjectsPage,
    })),
  { ssr: false }
)
