"use client"

import { Card, CardContent } from "@/components/ui/card"
import {
  BarChart3,
  Download,
  FileText,
  TrendingUp,
  TrendingDown,
  Calendar,
} from "lucide-react"

const reports = [
  {
    id: 1,
    title: "Institution Attendance Summary",
    date: "May 2026",
    type: "PDF",
    status: "ready",
  },
  {
    id: 2,
    title: "Course-wise Performance",
    date: "Spring 2026",
    type: "PDF",
    status: "ready",
  },
  {
    id: 3,
    title: "Student Drop-out Risk Analysis",
    date: "Jun 2026",
    type: "CSV",
    status: "ready",
  },
  {
    id: 4,
    title: "Faculty Workload Report",
    date: "Spring 2026",
    type: "PDF",
    status: "generating",
  },
]

const insights = [
  {
    label: "Total Enrollments",
    value: "1,248",
    change: "+8.2% vs last sem",
    up: true,
  },
  {
    label: "Avg Attendance",
    value: "84.3%",
    change: "+2.1% vs last sem",
    up: true,
  },
  {
    label: "At Risk Students",
    value: "42",
    change: "-15% vs last sem",
    up: true,
  },
  {
    label: "Active Faculty",
    value: "36",
    change: "+4 this semester",
    up: true,
  },
]

export function ReportsPage() {
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
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div>
        <h2 className="mb-4 text-sm font-semibold text-foreground">
          Generated Reports
        </h2>
        <div className="space-y-2">
          {reports.map((r) => (
            <Card key={r.id} className="transition hover:shadow-sm">
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
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs ${
                      r.status === "ready"
                        ? "bg-green-500/10 text-green-600"
                        : "bg-amber-500/10 text-amber-600"
                    }`}
                  >
                    {r.status === "ready" ? "Ready" : "Generating"}
                  </span>
                  {r.status === "ready" && (
                    <button className="rounded-lg border px-3 py-1.5 text-xs font-medium text-foreground transition hover:bg-muted">
                      Download
                    </button>
                  )}
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
