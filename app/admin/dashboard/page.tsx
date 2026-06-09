import { requireAuth } from "@/module/auth/utils/auth-utils"
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

export default async function AdminDashboard() {
  const { user } = await requireAuth()

  return (
    <AdminLayout user={user}>
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

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          <Card>
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <span className="flex items-center gap-0.5 text-xs text-green-600 dark:text-green-400">
                  <ArrowUpRight className="h-3 w-3" />
                  +12%
                </span>
              </div>
              <p className="mt-4 text-2xl font-bold text-foreground">1,248</p>
              <p className="text-xs text-muted-foreground">Total Students</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
                  <BookOpen className="h-5 w-5 text-secondary" />
                </div>
                <span className="flex items-center gap-0.5 text-xs text-green-600 dark:text-green-400">
                  <ArrowUpRight className="h-3 w-3" />
                  +3
                </span>
              </div>
              <p className="mt-4 text-2xl font-bold text-foreground">24</p>
              <p className="text-xs text-muted-foreground">Active Courses</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                  <TrendingUp className="h-5 w-5 text-accent" />
                </div>
                <span className="flex items-center gap-0.5 text-xs text-green-600 dark:text-green-400">
                  <ArrowUpRight className="h-3 w-3" />
                  +5%
                </span>
              </div>
              <p className="mt-4 text-2xl font-bold text-foreground">84.3%</p>
              <p className="text-xs text-muted-foreground">Avg Attendance</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
                  <UserPlus className="h-5 w-5 text-destructive" />
                </div>
                <span className="flex items-center gap-0.5 text-xs text-amber-600 dark:text-amber-400">
                  <ArrowUpRight className="h-3 w-3" />
                  +8
                </span>
              </div>
              <p className="mt-4 text-2xl font-bold text-foreground">18</p>
              <p className="text-xs text-muted-foreground">New This Month</p>
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
                {[
                  {
                    name: "Alice Johnson",
                    email: "alice@university.edu",
                    date: "Today",
                    course: "Mathematics",
                  },
                  {
                    name: "Bob Smith",
                    email: "bob@university.edu",
                    date: "Yesterday",
                    course: "Physics",
                  },
                  {
                    name: "Carol White",
                    email: "carol@university.edu",
                    date: "2 days ago",
                    course: "Computer Science",
                  },
                  {
                    name: "David Brown",
                    email: "david@university.edu",
                    date: "3 days ago",
                    course: "Chemistry",
                  },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between border-b py-2 last:border-0"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-foreground">
                        {s.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {s.email} · {s.course}
                      </p>
                    </div>
                    <span className="ml-2 shrink-0 text-xs text-muted-foreground">
                      {s.date}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5">
              <h2 className="mb-4 text-sm font-semibold text-foreground">
                Attendance Alerts
              </h2>
              <div className="space-y-3">
                {[
                  { name: "Mathematics 301", students: 12, status: "critical" },
                  { name: "Physics 205", students: 8, status: "warning" },
                  { name: "Chemistry 102", students: 5, status: "warning" },
                  { name: "Literature 105", students: 3, status: "normal" },
                ].map((c, i) => (
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
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
