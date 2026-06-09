import { requireAdminAuth } from "@/module/auth/utils/admin-auth-utils"
import { AdminLayout } from "@/components/admin-layout"
import { UsersPage } from "@/components/admin/users-wrapper"

export default async function AdminUsers() {
  await requireAdminAuth()
  return (
    <AdminLayout>
      <UsersPage />
    </AdminLayout>
  )
}
