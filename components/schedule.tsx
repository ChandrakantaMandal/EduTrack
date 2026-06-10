"use client"

import { Card } from "@/components/ui/card"
import { getSchedule } from "@/module/admin/schedule/actions/actions"
import { Calendar, Clock, Loader2, X } from "lucide-react"
import { useEffect, useState } from "react"

type ScheduleItem = {
  id: string
  day: string
  startTime: string
  endTime: string
  room: string | null
  subject: { name: string; code: string; professor: string | null }
}

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]

interface Props {
  open: boolean
  onClose: () => void
}

export function ViewSchedule({ open, onClose }: Props) {
  const [schedule, setSchedule] = useState<ScheduleItem[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!open) return

    getSchedule(true).then((s) => {
      setSchedule(s as ScheduleItem[])
      setLoading(false)
    })
  }, [open])

  const grouped = days.map((day) => ({
    day,
    courses: schedule
      .filter((s) => s.day === day)
      .map((s) => ({
        name: s.subject.name,
        time: s.startTime ? `${s.startTime} - ${s.endTime}` : "All day",
        room: s.room ?? "—",
        professor: s.subject.professor ?? "—",
      })),
  }))

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      {/* 🔥 CENTER MODAL */}
      <Card className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl shadow-xl">
        {/* HEADER */}
        <div className="flex items-center justify-between border-b px-4 py-4">
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-primary" />
            <h2 className="text-base font-semibold">Weekly Schedule</h2>
          </div>

          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-muted"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* CONTENT */}
        <div className="overflow-y-auto p-5">
          {loading ? (
            <div className="flex items-center justify-center py-12 text-sm text-muted-foreground">
              <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading...
            </div>
          ) : (
            <div className="space-y-5">
              {grouped.map((day) => (
                <div key={day.day}>
                  <h3 className="mb-2 text-sm font-semibold">{day.day}</h3>

                  {day.courses.length === 0 ? (
                    <p className="text-xs text-muted-foreground">No classes</p>
                  ) : (
                    <div className="space-y-2">
                      {day.courses.map((course, i) => (
                        <div
                          key={i}
                          className="flex gap-3 rounded-xl border p-3"
                        >
                          <Clock className="mt-1 h-4 w-4 text-primary" />
                          <div>
                            <p className="text-sm font-medium">{course.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {course.time} • {course.room}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
