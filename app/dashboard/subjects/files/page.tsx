import { requireAuth } from "@/module/auth/utils/auth-utils"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { SubjectFilesPage } from "@/components/dashboard/subject-files-wrapper"

export default async function SubjectFilesRoute() {
  const { user } = await requireAuth()

  return (
    <DashboardLayout user={user}>
      <SubjectFilesPage />
    </DashboardLayout>
  )
}
