import { requireAuth } from "@/module/auth/utils/auth-utils"

export default async function AdminRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await requireAuth()
  return <>{children}</>
}
