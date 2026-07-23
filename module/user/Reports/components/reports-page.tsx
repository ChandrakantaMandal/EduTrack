"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  FileText,
  Loader2,
  FileSpreadsheet,
  FileDown,
} from "lucide-react"
import { getStudentReports } from "@/module/user/Reports/actions/actions"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import ExcelJS from "exceljs"

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

async function downloadExcel(
  filename: string,
  sheets: { name: string; headers: string[]; rows: (string | number)[][] }[]
) {
  const wb = new ExcelJS.Workbook()
  for (const s of sheets) {
    const ws = wb.addWorksheet(s.name)
    ws.addRow(s.headers)
    for (const row of s.rows) ws.addRow(row)
  }
  const buf = await wb.xlsx.writeBuffer()
  const blob = new Blob([buf], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

function downloadPDF(
  filename: string,
  title: string,
  tables: { header: string; headers: string[]; rows: (string | number)[][] }[]
) {
  const doc = new jsPDF()
  doc.setFontSize(16)
  doc.text(title, 14, 20)
  let y = 30
  for (const t of tables) {
    if (y > 250) {
      doc.addPage()
      y = 20
    }
    doc.setFontSize(12)
    doc.text(t.header, 14, y)
    y += 5
    autoTable(doc, {
      startY: y,
      head: [t.headers],
      body: t.rows,
      theme: "striped",
      margin: { left: 14 },
    })
    const lastTableY = (
      doc as import("jspdf").jsPDF & { lastAutoTable?: { finalY: number } }
    ).lastAutoTable?.finalY
    y = lastTableY !== undefined ? lastTableY + 15 : y + 40
  }
  doc.save(filename)
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
        <div className="flex gap-2">
          <button
            onClick={() => {
              downloadExcel(`reports-${userId}.xlsx`, [
                {
                  name: "Monthly",
                  headers: ["Month", "Percentage", "Present", "Total"],
                  rows: (data?.monthlySummary ?? []).map((m) => [
                    m.month,
                    m.percentage,
                    m.present,
                    m.total,
                  ]),
                },
                {
                  name: "Subjects",
                  headers: ["Subject", "Percentage", "Present", "Total"],
                  rows: (data?.subjectWise ?? []).map((s) => [
                    s.subject,
                    s.percentage,
                    s.present,
                    s.total,
                  ]),
                },
                {
                  name: "Weekly",
                  headers: ["Week", "Percentage", "Present", "Total"],
                  rows: (data?.weeklyTrend ?? []).map((w) => [
                    w.week,
                    w.percentage,
                    w.present,
                    w.total,
                  ]),
                },
              ]).catch(() => {})
            }}
            className="flex items-center justify-center gap-2 rounded-xl border bg-card px-5 py-2.5 text-sm font-medium text-foreground shadow-sm transition hover:bg-muted sm:self-start"
          >
            <FileSpreadsheet className="h-4 w-4 shrink-0" />
            <span className="sm:inline">Excel</span>
          </button>
          <button
            onClick={() =>
              downloadPDF(`reports-${userId}.pdf`, "Attendance Reports", [
                {
                  header: "Monthly Summary",
                  headers: ["Month", "Percentage", "Present", "Total"],
                  rows: (data?.monthlySummary ?? []).map((m) => [
                    m.month,
                    `${m.percentage}%`,
                    String(m.present),
                    String(m.total),
                  ]),
                },
                {
                  header: "Subject-wise",
                  headers: ["Subject", "Percentage", "Present", "Total"],
                  rows: (data?.subjectWise ?? []).map((s) => [
                    s.subject,
                    `${s.percentage}%`,
                    String(s.present),
                    String(s.total),
                  ]),
                },
              ])
            }
            className="flex items-center justify-center gap-2 rounded-xl border bg-card px-5 py-2.5 text-sm font-medium text-foreground shadow-sm transition hover:bg-muted sm:self-start"
          >
            <FileDown className="h-4 w-4 shrink-0" />
            <span className="sm:inline">PDF</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-4">
        {insights.map((insight, i) => {
          const Icon = insight.up ? TrendingUp : TrendingDown
          return (
            <Card key={i}>
              <CardContent className="p-3 sm:p-5">
                <p className="text-xs text-muted-foreground">{insight.label}</p>
                <p className="mt-1 truncate text-lg font-bold text-foreground sm:text-xl">
                  {insight.value}
                </p>
                {insight.change && (
                  <div className="mt-2 flex items-center gap-1 text-xs">
                    <Icon
                      className={`h-3.5 w-3.5 shrink-0 ${
                        insight.up ? "text-green-500" : "text-red-500"
                      }`}
                    />
                    <span
                      className={`truncate ${
                        insight.up
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
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
          <div className="flex h-40 items-end gap-1 sm:gap-3">
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
              key: "monthly",
              title: "Monthly Attendance Summary",
              date: monthLabel(data.monthlySummary[0]?.month ?? ""),
              headers: ["Month", "Percentage", "Present", "Total"],
              rows: data.monthlySummary.map((m) => [
                m.month,
                m.percentage,
                m.present,
                m.total,
              ]),
              pdfHeaders: ["Month", "Percentage", "Present", "Total"],
              pdfRows: data.monthlySummary.map((m) => [
                m.month,
                `${m.percentage}%`,
                String(m.present),
                String(m.total),
              ]),
            },
            {
              key: "subjects",
              title: "Subject-wise Performance",
              date: `${data.subjectWise.length} subjects`,
              headers: ["Subject", "Percentage", "Present", "Total"],
              rows: data.subjectWise.map((s) => [
                s.subject,
                s.percentage,
                s.present,
                s.total,
              ]),
              pdfHeaders: ["Subject", "Percentage", "Present", "Total"],
              pdfRows: data.subjectWise.map((s) => [
                s.subject,
                `${s.percentage}%`,
                String(s.present),
                String(s.total),
              ]),
            },
            {
              key: "weekly",
              title: "Weekly Trend Report",
              date: `${data.weeklyTrend.length} weeks`,
              headers: ["Week", "Percentage", "Present", "Total"],
              rows: data.weeklyTrend.map((w) => [
                w.week,
                w.percentage,
                w.present,
                w.total,
              ]),
              pdfHeaders: ["Week", "Percentage", "Present", "Total"],
              pdfRows: data.weeklyTrend.map((w) => [
                w.week,
                `${w.percentage}%`,
                String(w.present),
                String(w.total),
              ]),
            },
          ].map((r) => (
            <Card key={r.key} className="transition hover:shadow-sm">
              <CardContent className="flex flex-col justify-between gap-3 p-4 sm:flex-row sm:items-center sm:p-5">
                <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 sm:h-10 sm:w-10">
                    <FileText className="h-4 w-4 text-primary sm:h-5 sm:w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">
                      {r.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{r.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 self-end sm:gap-3 sm:self-auto">
                  <button
                    onClick={() => {
                      downloadExcel(`${r.key}-report.xlsx`, [
                        { name: r.title, headers: r.headers, rows: r.rows },
                      ]).catch(() => {})
                    }}
                    className="flex items-center gap-1 rounded-lg border px-3 py-1.5 text-xs font-medium text-foreground transition hover:bg-muted"
                  >
                    <FileSpreadsheet className="h-3.5 w-3.5" /> Excel
                  </button>
                  <button
                    onClick={() =>
                      downloadPDF(`${r.key}-report.pdf`, r.title, [
                        {
                          header: r.title,
                          headers: r.pdfHeaders,
                          rows: r.pdfRows,
                        },
                      ])
                    }
                    className="flex items-center gap-1 rounded-lg border px-3 py-1.5 text-xs font-medium text-foreground transition hover:bg-muted"
                  >
                    <FileDown className="h-3.5 w-3.5" /> PDF
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
