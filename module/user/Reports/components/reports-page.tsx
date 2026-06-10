"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  FileText,
  Loader2,
} from "lucide-react"
import { getStudentReports } from "@/module/user/Reports/actions/actions"

type ReportsData = {
  monthlySummary: {
    month: string
    percentage: number
    present: number
    total: number
  }[]
  subjectWise: {
    subject: string
    percentage: number
    present: number
    total: number
  }[]
  weeklyTrend: {
    week: string
    percentage: number
    present: number
    total: number
  }[]
  insights: {
    bestDay: string | null
    needsImprovement: { subject: string; percentage: number } | null
    currentStreak: number
    peakMonth: string | null
  }
}

export function ReportsPage({ userId }: { userId: string }) {
  const [data, setData] = useState<ReportsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getStudentReports(userId)
      .then(setData)
      .finally(() => setLoading(false))
  }, [userId])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!data || data.monthlySummary.length === 0) {
    return (
      <div className="space-y-6 sm:space-y-8">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            Reports
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            No attendance data yet
          </p>
        </div>
      </div>
    )
  }

  const insights = [
    {
      label: "Best Day",
      value: data.insights.bestDay ?? "Not available",
      change: data.insights.bestDay ? "Highest attendance day" : "No data yet",
      up: true,
    },
    {
      label: "Needs Improvement",
      value: data.insights.needsImprovement?.subject ?? "Not available",
      change: data.insights.needsImprovement
        ? `${data.insights.needsImprovement.percentage}% attendance`
        : "No improvements needed",
      up: false,
    },
    {
      label: "Current Streak",
      value: `${data.insights.currentStreak} days`,
      change:
        data.insights.currentStreak > 0
          ? "Consecutive present days"
          : "No streak yet",
      up: data.insights.currentStreak > 0,
    },
    {
      label: "Peak Month",
      value: data.insights.peakMonth
        ? new Date(data.insights.peakMonth + "-01").toLocaleString("default", {
            month: "long",
            year: "numeric",
          })
        : "Not available",
      change: "Highest monthly attendance",
      up: true,
    },
  ]

  function monthLabel(m: string) {
    const d = new Date(m + "-01")
    return d.toLocaleString("default", { month: "short", year: "numeric" })
  }

  function weekLabel(w: string) {
    const d = new Date(w)
    return `${d.toLocaleString("default", { month: "short" })} ${d.getDate()}`
  }

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
                {insight.change && (
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
              Monthly Attendance Summary
            </h3>
            <div className="space-y-3">
              {data.monthlySummary.map((m) => (
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
                    {m.present}/{m.total} present
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
                    {s.present}/{s.total} present
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-5">
          <h3 className="mb-4 text-sm font-semibold text-foreground">
            Weekly Trend Report
          </h3>
          <div className="flex h-40 items-end gap-3">
            {data.weeklyTrend.map((w) => (
              <div
                key={w.week}
                className="flex h-full flex-1 flex-col items-center justify-end"
              >
                <div
                  className="w-full rounded bg-primary transition-all"
                  style={{ height: `${Math.max(w.percentage, 4)}%` }}
                />
                <span className="mt-1 text-[10px] text-muted-foreground">
                  {weekLabel(w.week)}
                </span>
              </div>
            ))}
          </div>
          {data.weeklyTrend.length > 0 && (
            <div className="mt-6 space-y-2">
              {data.weeklyTrend.map((w) => (
                <div
                  key={w.week}
                  className="flex items-center justify-between border-b py-2 text-sm last:border-0"
                >
                  <span className="text-foreground">{weekLabel(w.week)}</span>
                  <span className="text-muted-foreground">
                    {w.present}/{w.total} · {w.percentage}%
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

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
          {[
            {
              title: "Monthly Attendance Summary",
              date: monthLabel(data.monthlySummary[0]?.month ?? ""),
              type: "PDF",
            },
            {
              title: "Subject-wise Performance",
              date: `${data.subjectWise.length} subjects`,
              type: "PDF",
            },
            {
              title: "Weekly Trend Report",
              date: `${data.weeklyTrend.length} weeks`,
              type: "CSV",
            },
          ].map((r, i) => (
            <Card key={i} className="transition hover:shadow-sm">
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
                  <span className="shrink-0 rounded-full bg-green-500/10 px-2 py-0.5 text-xs text-green-600 dark:text-green-400">
                    Ready
                  </span>
                  <button className="shrink-0 rounded-lg border px-3 py-1.5 text-xs font-medium text-foreground transition hover:bg-muted">
                    Download
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
