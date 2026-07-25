"use client"

import dynamic from "next/dynamic"

export const AttendancePage = dynamic(
  () =>
    import("@/module/admin/users/components/attendance-page").then((m) => ({
      default: m.AttendancePage,
    })),
  { ssr: false }
)
