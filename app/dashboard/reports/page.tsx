import { requireAuth } from "@/module/auth/utils/auth-utils"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { ReportsPage } from "@/components/dashboard/reports-wrapper"

export default async function Reports() {
  const { user } = await requireAuth()

  return (
    <DashboardLayout user={user}>
      <ReportsPage userId={user.id!} />
    </DashboardLayout>
  )
}
