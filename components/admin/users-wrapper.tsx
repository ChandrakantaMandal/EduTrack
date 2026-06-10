"use client"

import dynamic from "next/dynamic"

export const UsersPage = dynamic(
  () =>
    import("@/module/admin/users/components/users-page").then((m) => ({
      default: m.UsersPage,
    })),
  { ssr: false }
)
