"use client"

import dynamic from "next/dynamic"

const Inner = dynamic(
  () =>
    import("@/module/user/Reports/components/reports-page").then((m) => ({
      default: m.ReportsPage,
    })),
  { ssr: false }
)

export function ReportsPage({ userId }: { userId: string }) {
  return <Inner userId={userId} />
}
