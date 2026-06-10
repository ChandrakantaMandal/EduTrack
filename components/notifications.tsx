"use client"

import { useState, useEffect, useRef } from "react"
import { Bell, X, AlertTriangle } from "lucide-react"
import { getAttendanceWarnings } from "@/module/user/dashboard/actions/actions"

export function NotificationsBell({ userId }: { userId: string }) {
  const [warnings, setWarnings] = useState<
    {
      subjectName: string
      percentage: number
      present: number
      total: number
    }[]
  >([])
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    getAttendanceWarnings(userId).then(setWarnings)
  }, [userId])

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative flex h-9 w-9 items-center justify-center rounded-lg transition hover:bg-muted"
      >
        <Bell className="h-5 w-5" />
        {warnings.length > 0 && (
          <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground">
            {warnings.length}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-80 rounded-xl border bg-card shadow-lg">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <h3 className="text-sm font-semibold text-foreground">
              Attendance Alerts
            </h3>
            <button
              onClick={() => setOpen(false)}
              className="flex h-6 w-6 items-center justify-center rounded hover:bg-muted"
            >
              <X className="h-3.5 w-3.5 text-muted-foreground" />
            </button>
          </div>
          <div className="max-h-72 overflow-y-auto p-2">
            {warnings.length === 0 ? (
              <p className="py-6 text-center text-sm text-muted-foreground">
                All subjects have 75%+ attendance
              </p>
            ) : (
              warnings.map((w, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-lg p-3 transition hover:bg-muted"
                >
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-destructive/10">
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground">
                      {w.subjectName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {w.percentage}% · {w.present}/{w.total} present
                    </p>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-destructive"
                        style={{ width: `${w.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
