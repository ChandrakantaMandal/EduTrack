import { requireAdminAuth } from "@/module/auth/utils/admin-auth-utils"
import { AdminLayout } from "@/components/admin-layout"
import { ReportsPage } from "@/components/admin/reports-wrapper"

export default async function AdminReports() {
  await requireAdminAuth()
  return (
    <AdminLayout>
      <ReportsPage />
    </AdminLayout>
  )
}
