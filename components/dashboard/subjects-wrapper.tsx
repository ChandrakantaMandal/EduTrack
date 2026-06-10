"use client"

import dynamic from "next/dynamic"

const Inner = dynamic(
  () =>
    import("@/module/user/subjects/components/subjects-page").then((m) => ({
      default: m.SubjectsPage,
    })),
  { ssr: false }
)

export function SubjectsPage({ userId }: { userId: string }) {
  return <Inner userId={userId} />
}
