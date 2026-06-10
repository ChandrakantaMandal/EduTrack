import { requireAuth } from "@/module/auth/utils/auth-utils"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { SubjectsPage } from "@/components/dashboard/subjects-wrapper"
import { getUserProfile } from "@/module/user/Settings/actions/actions"

export default async function Subjects() {
  const { user } = await requireAuth()
  const profile = await getUserProfile(user.id)

  return (
    <DashboardLayout user={{ ...user, ...profile }}>
      <SubjectsPage userId={user.id} />
    </DashboardLayout>
  )
}
