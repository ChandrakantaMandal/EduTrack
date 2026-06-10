"use client"

import dynamic from "next/dynamic"

export const SettingsPage = dynamic(
  () =>
    import("@/module/admin/Settings/components/settings-page").then((m) => ({
      default: m.SettingsPage,
    })),
  { ssr: false }
)
