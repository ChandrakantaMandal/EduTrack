import { redirect } from "next/navigation"
import { requireAuth } from "@/module/auth/utils/auth-utils"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { SubjectCard } from "@/module/user/subjects/components/subject-card"
import { MonthlyTrend } from "@/module/user/dashboard/components/bar-chart"
import { AttendanceCard } from "@/module/user/dashboard/components/attendance-card"
import { BookOpen, TrendingUp, CalendarCheck, Award } from "lucide-react"
import { getStudentDashboardData } from "@/module/user/dashboard/actions/actions"
import { getUserProfile } from "@/module/user/Settings/actions/actions"

export default async function Dashboard() {
  const { user } = await requireAuth()
  const profile = await getUserProfile(user.id)

  if (!profile?.studentId) {
    redirect("/onboarding")
  }

  const data = await getStudentDashboardData(user.id)

  return (
    <DashboardLayout user={{ ...user, ...profile }}>
      <div className="space-y-8">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              Welcome back, {user.name?.split(" ")[0] ?? "Student"}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Here&apos;s your academic overview for this semester
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2 text-sm text-muted-foreground">
            <CalendarCheck className="h-4 w-4" />
            <span>Spring 2026</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-4">
          <Card className="border-l-4 border-l-primary">
            <CardContent className="flex items-center gap-3 p-3 sm:gap-4 sm:p-5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 sm:h-11 sm:w-11">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs text-muted-foreground">
                  Subjects
                </p>
                <p className="truncate text-lg font-bold sm:text-xl">
                  {data.subjects.length}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-secondary">
            <CardContent className="flex items-center gap-3 p-3 sm:gap-4 sm:p-5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary/10 sm:h-11 sm:w-11">
                <TrendingUp className="h-5 w-5 text-secondary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs text-muted-foreground">
                  Avg. Attendance
                </p>
                <p className="truncate text-lg font-bold sm:text-xl">
                  {data.avgAttendance}%
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-accent">
            <CardContent className="flex items-center gap-3 p-3 sm:gap-4 sm:p-5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/10 sm:h-11 sm:w-11">
                <Award className="h-5 w-5 text-accent" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs text-muted-foreground">
                  Best Subject
                </p>
                <p className="truncate text-lg font-bold sm:text-xl">
                  {data.bestSubject?.name ?? "—"}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-destructive">
            <CardContent className="flex items-center gap-3 p-3 sm:gap-4 sm:p-5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-destructive/10 sm:h-11 sm:w-11">
                <CalendarCheck className="h-5 w-5 text-destructive" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs text-muted-foreground">
                  Days Present
                </p>
                <p className="truncate text-lg font-bold sm:text-xl">
                  {data.daysPresent}/{data.totalDays}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <AttendanceCard value={data.avgAttendance} />
          <div className="lg:col-span-2">
            <MonthlyTrend data={data.monthlyTrend} />
          </div>
        </div>

        <div>
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Course Attendance
              </h2>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Detailed breakdown by subject
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {data.subjects.map((s) => (
              <SubjectCard
                key={s.id}
                title={s.name}
                professor={s.professor ?? "—"}
                percent={s.attendance.percentage}
              />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
