"use client"

import dynamic from "next/dynamic"

export const SchedulePage = dynamic(
  () =>
    import("@/module/admin/schedule/components/schedule-page").then((m) => ({
      default: m.SchedulePage,
    })),
  { ssr: false }
)
