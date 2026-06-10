"use client"

import dynamic from "next/dynamic"

export const ReportsPage = dynamic(
  () =>
    import("@/module/user/Reports/components/reports-page").then((m) => ({
      default: m.ReportsPage,
    })),
  { ssr: false }
)
