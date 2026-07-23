import { requireAdminAuth } from "@/module/auth/utils/admin-auth-utils"
import { AdminLayout } from "@/components/admin-layout"
import { Card, CardContent } from "@/components/ui/card"
import {
  Users,
  BookOpen,
  TrendingUp,
  CalendarCheck,
  UserPlus,
  ArrowUpRight,
} from "lucide-react"
import { getAdminDashboardData } from "@/module/admin/dashboard/actions/actions"

export default async function AdminDashboard() {
  await requireAdminAuth()
  const data = await getAdminDashboardData()

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              Admin Dashboard
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Overview of the institution
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarCheck className="h-4 w-4" />
            <span>Spring 2026</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-4">
          <Card>
            <CardContent className="p-3 sm:p-5">
              <div className="flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 sm:h-10 sm:w-10">
                  <Users className="h-5 w-5 text-primary" />
                </div>
              </div>
              <p className="mt-3 truncate text-lg font-bold text-foreground sm:mt-4 sm:text-2xl">
                {data.totalStudents}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                Total Students
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 sm:p-5">
              <div className="flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary/10 sm:h-10 sm:w-10">
                  <BookOpen className="h-5 w-5 text-secondary" />
                </div>
              </div>
              <p className="mt-3 truncate text-lg font-bold text-foreground sm:mt-4 sm:text-2xl">
                {data.totalSubjects}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                Active Courses
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 sm:p-5">
              <div className="flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 sm:h-10 sm:w-10">
                  <TrendingUp className="h-5 w-5 text-accent" />
                </div>
                {data.avgAttendance > 0 && (
                  <span className="flex shrink-0 items-center gap-0.5 text-xs text-green-600 dark:text-green-400">
                    <ArrowUpRight className="h-3 w-3" />
                    {data.avgAttendance}%
                  </span>
                )}
              </div>
              <p className="mt-3 truncate text-lg font-bold text-foreground sm:mt-4 sm:text-2xl">
                {data.avgAttendance}%
              </p>
              <p className="truncate text-xs text-muted-foreground">
                Avg Attendance
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 sm:p-5">
              <div className="flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-destructive/10 sm:h-10 sm:w-10">
                  <UserPlus className="h-5 w-5 text-destructive" />
                </div>
              </div>
              <p className="mt-3 truncate text-lg font-bold text-foreground sm:mt-4 sm:text-2xl">
                {data.recentStudents.length}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                Recent Registrations
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
            <CardContent className="p-5">
              <h2 className="mb-4 text-sm font-semibold text-foreground">
                Recent Registrations
              </h2>
              <div className="space-y-3">
                {data.recentStudents.length > 0 ? (
                  data.recentStudents.map((s, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between border-b py-2 last:border-0"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-foreground">
                          {s.name ?? "Unnamed"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {s.email ?? ""}
                          {s.course ? ` · ${s.course}` : ""}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="py-4 text-center text-sm text-muted-foreground">
                    No registrations yet
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5">
              <h2 className="mb-4 text-sm font-semibold text-foreground">
                Attendance Alerts
              </h2>
              <div className="space-y-3">
                {data.alerts.length > 0 ? (
                  data.alerts.map((c, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between border-b py-2 last:border-0"
                    >
                      <p className="text-sm font-medium text-foreground">
                        {c.name}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          {c.students} below
                        </span>
                        <span
                          className={`h-2 w-2 rounded-full ${
                            c.status === "critical"
                              ? "bg-red-500"
                              : c.status === "warning"
                                ? "bg-amber-500"
                                : "bg-green-500"
                          }`}
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="py-4 text-center text-sm text-muted-foreground">
                    No alerts
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
