import { requireAdminAuth } from "@/module/auth/utils/admin-auth-utils"
import { AdminLayout } from "@/components/admin-layout"
import { SubjectFilesPage } from "@/components/admin/subject-files-wrapper"

export default async function SubjectFilesRoute() {
  await requireAdminAuth()

  return (
    <AdminLayout>
      <SubjectFilesPage />
    </AdminLayout>
  )
}
