import { requireAuth } from "@/module/auth/utils/auth-utils"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { SettingsPage } from "@/components/dashboard/settings-wrapper"

export default async function Settings() {
  const { user } = await requireAuth()

  return (
    <DashboardLayout user={user}>
      <SettingsPage />
    </DashboardLayout>
  )
}
