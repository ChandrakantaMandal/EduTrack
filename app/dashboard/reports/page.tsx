import { requireAuth } from "@/module/auth/utils/auth-utils"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { ReportsPage } from "@/components/dashboard/reports-wrapper"
import { getUserProfile } from "@/module/user/Settings/actions/actions"

export default async function Reports() {
  const { user } = await requireAuth()
  const profile = await getUserProfile(user.id)

  return (
    <DashboardLayout user={{ ...user, ...profile }}>
      <ReportsPage userId={user.id} />
    </DashboardLayout>
  )
}
