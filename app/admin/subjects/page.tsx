import { requireAdminAuth } from "@/module/auth/utils/admin-auth-utils"
import { AdminLayout } from "@/components/admin-layout"
import { SubjectsPage } from "@/components/admin/subjects-wrapper"

export default async function AdminSubjects() {
  await requireAdminAuth()
  return (
    <AdminLayout>
      <SubjectsPage />
    </AdminLayout>
  )
}
