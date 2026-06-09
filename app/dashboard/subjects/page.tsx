import { requireAuth } from "@/module/auth/utils/auth-utils"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { SubjectsPage } from "@/components/dashboard/subjects-wrapper"

export default async function Subjects() {
  const { user } = await requireAuth()

  return (
    <DashboardLayout user={user}>
      <SubjectsPage />
    </DashboardLayout>
  )
}
