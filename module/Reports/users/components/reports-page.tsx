"use client"

import { Card, CardContent } from "@/components/ui/card"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  FileText,
} from "lucide-react"

const reports = [
  {
    id: 1,
    title: "Monthly Attendance Summary",
    date: "May 2026",
    type: "PDF",
    status: "ready",
  },
  {
    id: 2,
    title: "Subject-wise Performance",
    date: "Spring 2026",
    type: "PDF",
    status: "ready",
  },
  {
    id: 3,
    title: "Weekly Trend Report",
    date: "Jun 1–7, 2026",
    type: "CSV",
    status: "ready",
  },
  {
    id: 4,
    title: "Attendance History - Mathematics",
    date: "Full Semester",
    type: "PDF",
    status: "generating",
  },
]

const insights = [
  {
    label: "Best Day",
    value: "Wednesday",
    change: "+12% vs avg",
    up: true,
  },
  {
    label: "Needs Improvement",
    value: "Biology",
    change: "-15% vs avg",
    up: false,
  },
  {
    label: "Current Streak",
    value: "6 days",
    change: "+2 from last week",
    up: true,
  },
  {
    label: "Peak Month",
    value: "March",
    change: "94% attendance",
    up: true,
  },
]

export function ReportsPage() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            Reports
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Analytics and performance summaries
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 rounded-xl border bg-card px-5 py-2.5 text-sm font-medium text-foreground shadow-sm transition hover:bg-muted sm:self-start">
          <Download className="h-4 w-4 shrink-0" />
          <span className="hidden sm:inline">Export All</span>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {insights.map((insight, i) => {
          const Icon = insight.up ? TrendingUp : TrendingDown
          return (
            <Card key={i}>
              <CardContent className="p-5">
                <p className="text-xs text-muted-foreground">{insight.label}</p>
                <p className="mt-1 text-xl font-bold text-foreground">
                  {insight.value}
                </p>
                <div className="mt-2 flex items-center gap-1 text-xs">
                  <Icon
                    className={`h-3.5 w-3.5 ${
                      insight.up ? "text-green-500" : "text-red-500"
                    }`}
                  />
                  <span
                    className={
                      insight.up
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }
                  >
                    {insight.change}
                  </span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">
            Generated Reports
          </h2>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            Spring 2026
          </div>
        </div>

        <div className="space-y-3">
          {reports.map((r) => (
            <Card key={r.id} className="transition hover:shadow-sm">
              <CardContent className="flex flex-col justify-between gap-3 p-4 sm:flex-row sm:items-center sm:p-5">
                <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 sm:h-10 sm:w-10">
                    <FileText className="h-4 w-4 text-primary sm:h-5 sm:w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">
                      {r.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {r.date} &middot; {r.type}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 self-end sm:gap-3 sm:self-auto">
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-xs ${
                      r.status === "ready"
                        ? "bg-green-500/10 text-green-600 dark:text-green-400"
                        : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                    }`}
                  >
                    {r.status === "ready" ? "Ready" : "Generating"}
                  </span>
                  {r.status === "ready" && (
                    <button className="shrink-0 rounded-lg border px-3 py-1.5 text-xs font-medium text-foreground transition hover:bg-muted">
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
        <CardContent className="flex flex-col items-center justify-center py-12">
          <BarChart3 className="mb-3 h-8 w-8 text-muted-foreground/50" />
          <p className="text-sm font-medium text-foreground">Custom Report</p>
          <p className="mt-1 mb-4 text-xs text-muted-foreground">
            Select date range and subjects to generate a custom report
          </p>
          <button className="rounded-xl bg-primary px-5 py-2 text-sm font-medium text-primary-foreground shadow-sm transition hover:opacity-90">
            Generate Report
          </button>
        </CardContent>
      </Card>
    </div>
  )
}
