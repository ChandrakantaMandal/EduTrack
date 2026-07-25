import { requireAdminAuth } from "@/module/auth/utils/admin-auth-utils"
import { AdminLayout } from "@/components/admin-layout"
import { AttendancePage } from "@/components/admin/attendance-wrapper"

export default async function AdminUsers() {
  await requireAdminAuth()
  return (
    <AdminLayout>
      <AttendancePage />
    </AdminLayout>
  )
}
