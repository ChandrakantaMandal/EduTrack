import { requireAuth } from "@/module/auth/utils/auth-utils"
import { AdminLayout } from "@/components/admin-layout"
import { SchedulePage } from "@/components/admin/schedule-wrapper"

export default async function AdminSchedule() {
  const { user } = await requireAuth()
  return (
    <AdminLayout user={user}>
      <SchedulePage />
    </AdminLayout>
  )
}
