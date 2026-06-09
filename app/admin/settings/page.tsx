import { requireAdminAuth } from "@/module/auth/utils/admin-auth-utils"
import { AdminLayout } from "@/components/admin-layout"
import { SettingsPage } from "@/components/admin/settings-wrapper"

export default async function AdminSettings() {
  await requireAdminAuth()
  return (
    <AdminLayout>
      <SettingsPage />
    </AdminLayout>
  )
}
