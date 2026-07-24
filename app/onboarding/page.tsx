import { requireAuth } from "@/module/auth/utils/auth-utils"
import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"
import { OnboardingForm } from "@/module/auth/components/onboarding-form"

export default async function OnboardingPage() {
  const { user } = await requireAuth()

  const profile = await prisma.user.findUnique({
    where: { id: user.id },
    select: { studentId: true, name: true, email: true },
  })

  if (profile?.studentId) {
    redirect("/dashboard")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <OnboardingForm
        userId={user.id}
        name={profile?.name ?? ""}
        email={profile?.email ?? ""}
      />
    </div>
  )
}
