import { requireAdminAuth } from "@/module/auth/utils/admin-auth-utils"
import { AdminLayout } from "@/components/admin-layout"
import { SchedulePage } from "@/components/admin/schedule-wrapper"

export default async function AdminSchedule() {
  await requireAdminAuth()
  return (
    <AdminLayout>
      <SchedulePage />
    </AdminLayout>
  )
}
