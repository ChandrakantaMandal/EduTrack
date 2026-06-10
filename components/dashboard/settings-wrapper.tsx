"use client"

import dynamic from "next/dynamic"

const Inner = dynamic(
  () =>
    import("@/module/user/Settings/components/settings-page").then((m) => ({
      default: m.SettingsPage,
    })),
  { ssr: false }
)

export function SettingsPage({
  user,
}: {
  user: {
    id?: string
    name?: string | null
    email?: string | null
    image?: string | null
  }
}) {
  return <Inner user={user} />
}
