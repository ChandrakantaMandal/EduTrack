"use client"

import dynamic from "next/dynamic"

export const SettingsPage = dynamic(
  () =>
    import("@/module/Settings/users/components/settings-page").then((m) => ({
      default: m.SettingsPage,
    })),
  { ssr: false }
)
