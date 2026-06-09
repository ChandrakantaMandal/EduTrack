import { requireAuth } from "@/module/auth/utils/auth-utils"
import { AdminLayout } from "@/components/admin-layout"
import { SubjectsPage } from "@/components/admin/subjects-wrapper"

export default async function AdminSubjects() {
  const { user } = await requireAuth()
  return (
    <AdminLayout user={user}>
      <SubjectsPage />
    </AdminLayout>
  )
}
