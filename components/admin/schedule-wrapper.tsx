"use client"

import dynamic from "next/dynamic"

export const SchedulePage = dynamic(
  () =>
    import("@/module/schedule/admin/components/schedule-page").then((m) => ({
      default: m.SchedulePage,
    })),
  { ssr: false }
)
