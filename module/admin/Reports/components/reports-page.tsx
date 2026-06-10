"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  BarChart3,
  Download,
  FileText,
  TrendingUp,
  TrendingDown,
  Loader2,
} from "lucide-react"
import { getAdminReports } from "@/module/admin/Reports/actions/actions"

type AdminReportsData = {
  totalStudents: number
  totalSubjects: number
  avgAttendance: number
  atRiskCount: number
  bestSubject: { subject: string; percentage: number }
  worstSubject: { subject: string; percentage: number }
  subjectWise: {
    subject: string
    percentage: number
    present: number
    total: number
  }[]
  monthlyTrend: {
    month: string
    percentage: number
    present: number
    total: number
  }[]
}

export function ReportsPage() {
  const [data, setData] = useState<AdminReportsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAdminReports()
      .then(setData)
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!data) {
    return (
      <div className="space-y-6">
        <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          Reports
        </h1>
        <p className="text-sm text-muted-foreground">No data available</p>
      </div>
    )
  }

  function monthLabel(m: string) {
    const d = new Date(m + "-01")
    return d.toLocaleString("default", { month: "short", year: "numeric" })
  }

  const insights = [
    {
      label: "Total Students",
      value: String(data.totalStudents),
      change: `${data.totalSubjects} active courses`,
      up: true,
    },
    {
      label: "Avg Attendance",
      value: `${data.avgAttendance}%`,
      change: data.avgAttendance >= 75 ? "Healthy rate" : "Needs attention",
      up: data.avgAttendance >= 75,
    },
    {
      label: "At Risk Students",
      value: String(data.atRiskCount),
      change: "Below 50% attendance",
      up: data.atRiskCount === 0,
    },
    {
      label: "Best Subject",
      value: data.bestSubject.subject,
      change: `${data.bestSubject.percentage}% attendance`,
      up: true,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            Reports
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Institution-wide analytics and summaries
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-xl border bg-card px-4 py-2 text-sm font-medium text-foreground shadow-sm transition hover:bg-muted">
          <Download className="h-4 w-4" /> Export All
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {insights.map((ins, i) => {
          const Icon = ins.up ? TrendingUp : TrendingDown
          return (
            <Card key={i}>
              <CardContent className="p-4 sm:p-5">
                <p className="text-xs text-muted-foreground">{ins.label}</p>
                <p className="mt-1 text-xl font-bold text-foreground">
                  {ins.value}
                </p>
                {ins.change && (
                  <div className="mt-2 flex items-center gap-1 text-xs">
                    <Icon
                      className={`h-3.5 w-3.5 ${ins.up ? "text-green-500" : "text-red-500"}`}
                    />
                    <span
                      className={
                        ins.up
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }
                    >
                      {ins.change}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardContent className="p-5">
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              Monthly Attendance Trend
            </h3>
            <div className="space-y-3">
              {data.monthlyTrend.map((m) => (
                <div key={m.month}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-foreground">
                      {monthLabel(m.month)}
                    </span>
                    <span className="font-medium text-foreground">
                      {m.percentage}%
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${m.percentage}%` }}
                    />
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {m.present}/{m.total} across all students
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              Subject-wise Performance
            </h3>
            <div className="space-y-3">
              {data.subjectWise.map((s) => (
                <div key={s.subject}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-foreground">{s.subject}</span>
                    <span className="font-medium text-foreground">
                      {s.percentage}%
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className={`h-full rounded-full transition-all ${
                        s.percentage >= 75
                          ? "bg-green-500"
                          : s.percentage >= 50
                            ? "bg-amber-500"
                            : "bg-red-500"
                      }`}
                      style={{ width: `${s.percentage}%` }}
                    />
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {s.present}/{s.total} across all students
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="mb-4 text-sm font-semibold text-foreground">
          Generated Reports
        </h2>
        <div className="space-y-2">
          {[
            {
              title: "Institution Attendance Summary",
              date:
                data.monthlyTrend.length > 0
                  ? monthLabel(data.monthlyTrend[0].month)
                  : "N/A",
              type: "PDF",
            },
            {
              title: "Course-wise Performance",
              date: `${data.subjectWise.length} subjects`,
              type: "PDF",
            },
            {
              title: "Student Drop-out Risk Analysis",
              date: `${data.atRiskCount} at-risk students`,
              type: "CSV",
            },
            {
              title: "Faculty Workload Report",
              date: `Spring 2026`,
              type: "PDF",
            },
          ].map((r, i) => (
            <Card key={i} className="transition hover:shadow-sm">
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <FileText className="h-4 w-4 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">
                      {r.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {r.date} · {r.type}
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <span className="rounded-full bg-green-500/10 px-2 py-0.5 text-xs text-green-600">
                    Ready
                  </span>
                  <button className="rounded-lg border px-3 py-1.5 text-xs font-medium text-foreground transition hover:bg-muted">
                    Download
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center py-10">
          <BarChart3 className="mb-3 h-8 w-8 text-muted-foreground/50" />
          <p className="text-sm font-medium text-foreground">Custom Report</p>
          <p className="mt-1 mb-4 text-xs text-muted-foreground">
            Select parameters to generate a custom report
          </p>
          <button className="rounded-xl bg-primary px-5 py-2 text-sm font-medium text-primary-foreground shadow-sm transition hover:opacity-90">
            Generate Report
          </button>
        </CardContent>
      </Card>
    </div>
  )
}
