import { requireAuth } from "@/module/auth/utils/auth-utils"
import { AdminLayout } from "@/components/admin-layout"
import { ReportsPage } from "@/components/admin/reports-wrapper"

export default async function AdminReports() {
  const { user } = await requireAuth()
  return (
    <AdminLayout user={user}>
      <ReportsPage />
    </AdminLayout>
  )
}
