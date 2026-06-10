"use client"

import { Card, CardContent } from "@/components/ui/card"
import {
  BookOpen,
  Search,
  Clock,
  User,
  ChevronRight,
  X,
  Calendar,
  Loader2,
} from "lucide-react"
import { useState, useEffect } from "react"
import { getSubjectsWithAttendance } from "@/module/user/subjects/actions/actions"

type Subject = {
  id: string
  name: string
  code: string
  professor: string | null
  schedule: string | null
  attendance: { percentage: number; present: number; total: number }
}

export function SubjectsPage({ userId }: { userId: string }) {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState<Subject | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) return
    getSubjectsWithAttendance(userId).then((s) => {
      setSubjects(s as Subject[])
      setLoading(false)
    })
  }, [userId])

  const filtered = subjects.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  )

  function attendanceColor(percent: number) {
    if (percent >= 85) return "text-green-600 dark:text-green-400"
    if (percent >= 75) return "text-amber-600 dark:text-amber-400"
    return "text-red-600 dark:text-red-400"
  }

  return (
    <>
      <div className="space-y-6 sm:space-y-8">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              My Subjects
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              View all subjects and your attendance
            </p>
          </div>
        </div>

        <div className="relative max-w-md">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search subjects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border bg-card py-2.5 pr-4 pl-10 text-sm text-foreground transition outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16 text-sm text-muted-foreground">
            <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading...
          </div>
        ) : filtered.length === 0 ? (
          <p className="py-16 text-center text-sm text-muted-foreground">
            No subjects yet
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {filtered.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelected(s)}
                className="text-left"
              >
                <Card className="cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-md">
                  <CardContent className="p-5 sm:p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                        <BookOpen className="h-5 w-5 text-primary" />
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
                    </div>
                    <h3 className="mt-4 font-semibold text-foreground">
                      {s.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {s.professor ?? "—"}
                    </p>
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="h-3.5 w-3.5 shrink-0" />{" "}
                      {s.schedule ?? "—"}
                    </div>
                    <div className="mt-4 flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Attendance</span>
                      <span
                        className={`font-semibold ${attendanceColor(s.attendance.percentage)}`}
                      >
                        {s.attendance.percentage}%
                      </span>
                    </div>
                    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{ width: `${s.attendance.percentage}%` }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </button>
            ))}
          </div>
        )}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 backdrop-blur-sm sm:items-center sm:p-4">
          <Card className="animate-in slide-in-from-bottom-4 sm:slide-in-from-bottom-0 fade-in-0 max-h-[90vh] w-full overflow-y-auto rounded-t-2xl duration-200 sm:max-h-[85vh] sm:max-w-xl sm:rounded-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-card px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                  <BookOpen className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-foreground">
                    {selected.name}
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    {selected.code}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-muted"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-5 p-5">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-muted/50 p-3.5">
                  <p className="text-xs text-muted-foreground">Professor</p>
                  <p className="mt-0.5 text-sm font-medium text-foreground">
                    {selected.professor ?? "—"}
                  </p>
                </div>
                <div className="rounded-xl bg-muted/50 p-3.5">
                  <p className="text-xs text-muted-foreground">Schedule</p>
                  <p className="mt-0.5 text-sm font-medium text-foreground">
                    {selected.schedule ?? "—"}
                  </p>
                </div>
                <div className="rounded-xl bg-muted/50 p-3.5">
                  <p className="text-xs text-muted-foreground">Attendance</p>
                  <p
                    className={`mt-0.5 text-sm font-medium ${attendanceColor(selected.attendance.percentage)}`}
                  >
                    {selected.attendance.percentage}%
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Calendar className="h-4 w-4 text-muted-foreground" />{" "}
                  Schedule
                </h3>
                <div className="space-y-2 rounded-xl border bg-card p-3.5 text-sm">
                  <div className="flex items-center gap-2.5">
                    <Clock className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <span className="text-foreground">
                      {selected.schedule ?? "—"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <User className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {selected.professor ?? "—"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  )
}
