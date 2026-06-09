import { requireAuth } from "@/module/auth/utils/auth-utils"
import { AdminLayout } from "@/components/admin-layout"
import { UsersPage } from "@/components/admin/users-wrapper"

export default async function AdminUsers() {
  const { user } = await requireAuth()
  return (
    <AdminLayout user={user}>
      <UsersPage />
    </AdminLayout>
  )
}
