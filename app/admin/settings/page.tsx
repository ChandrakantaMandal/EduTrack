import { requireAuth } from "@/module/auth/utils/auth-utils"
import { AdminLayout } from "@/components/admin-layout"
import { SettingsPage } from "@/components/admin/settings-wrapper"

export default async function AdminSettings() {
  const { user } = await requireAuth()
  return (
    <AdminLayout user={user}>
      <SettingsPage />
    </AdminLayout>
  )
}
