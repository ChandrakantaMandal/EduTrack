import { requireAuth } from "@/module/auth/utils/auth-utils"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { SettingsPage } from "@/components/dashboard/settings-wrapper"
import { getUserProfile } from "@/module/user/Settings/actions/actions"

export default async function Settings() {
  const { user } = await requireAuth()
  const profile = await getUserProfile(user.id)

  return (
    <DashboardLayout user={{ ...user, ...profile }}>
      <SettingsPage user={{ ...user, ...profile }} />
    </DashboardLayout>
  )
}
