"use client"

import { useState } from "react"
import {
  Calendar,
  X,
  Clock,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Card } from "@/components/ui/card"

const scheduleData = [
  {
    day: "Monday",
    courses: [
      {
        name: "Mathematics",
        time: "10:00 AM - 11:30 AM",
        room: "Room 301",
        professor: "Feynman",
      },
      {
        name: "Chemistry",
        time: "2:00 PM - 3:30 PM",
        room: "Lab 102",
        professor: "Pauling",
      },
    ],
  },
  {
    day: "Tuesday",
    courses: [
      {
        name: "Physics",
        time: "8:00 AM - 9:30 AM",
        room: "Room 205",
        professor: "Marie Curie",
      },
      {
        name: "Computer Science",
        time: "10:00 AM - 11:30 AM",
        room: "Lab 201",
        professor: "Turing",
      },
    ],
  },
  {
    day: "Wednesday",
    courses: [
      {
        name: "Mathematics",
        time: "10:00 AM - 11:30 AM",
        room: "Room 301",
        professor: "Feynman",
      },
      {
        name: "Literature",
        time: "11:00 AM - 12:30 PM",
        room: "Room 105",
        professor: "Tolkien",
      },
    ],
  },
  {
    day: "Thursday",
    courses: [
      {
        name: "Physics",
        time: "8:00 AM - 9:30 AM",
        room: "Room 205",
        professor: "Marie Curie",
      },
      {
        name: "Computer Science",
        time: "10:00 AM - 11:30 AM",
        room: "Lab 201",
        professor: "Turing",
      },
    ],
  },
  {
    day: "Friday",
    courses: [
      {
        name: "Biology",
        time: "9:00 AM - 10:30 AM",
        room: "Room 104",
        professor: "Darwin",
      },
    ],
  },
]

export function ViewSchedule({ compact }: { compact?: boolean }) {
  const [open, setOpen] = useState(false)
  const [mobileDay, setMobileDay] = useState(0)

  return (
    <>
      {compact ? (
        <button
          onClick={() => setOpen(true)}
          className="flex h-9 w-9 items-center justify-center rounded-lg transition hover:bg-muted"
        >
          <Calendar className="h-5 w-5" />
        </button>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition hover:opacity-90"
        >
          <Calendar className="h-4 w-4 shrink-0" />
          <span className="hidden sm:inline">View Schedule</span>
          <span className="sm:hidden">Schedule</span>
        </button>
      )}

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm sm:items-center">
          <Card className="animate-in slide-in-from-bottom-4 sm:slide-in-from-bottom-0 fade-in-0 flex max-h-[90vh] w-full flex-col overflow-hidden rounded-t-2xl duration-200 sm:max-h-[85vh] sm:max-w-2xl sm:rounded-2xl sm:rounded-b-2xl">
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between border-b px-4 py-4 sm:px-5">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 shrink-0 text-primary" />
                <h2 className="text-base font-semibold text-foreground sm:text-lg">
                  Weekly Schedule
                </h2>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-muted"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>

            {/* Mobile day selector */}
            <div className="flex items-center justify-between border-b px-4 py-2.5 sm:hidden">
              <button
                onClick={() => setMobileDay((p) => Math.max(0, p - 1))}
                disabled={mobileDay === 0}
                className="flex h-7 w-7 items-center justify-center rounded-lg transition hover:bg-muted disabled:opacity-30"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-sm font-semibold text-foreground">
                {scheduleData[mobileDay].day}
              </span>
              <button
                onClick={() =>
                  setMobileDay((p) => Math.min(scheduleData.length - 1, p + 1))
                }
                disabled={mobileDay === scheduleData.length - 1}
                className="flex h-7 w-7 items-center justify-center rounded-lg transition hover:bg-muted disabled:opacity-30"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto p-4 sm:p-5">
              {/* Desktop: all days */}
              <div className="hidden space-y-5 sm:block">
                {scheduleData.map((day) => (
                  <div key={day.day}>
                    <h3 className="mb-2.5 flex items-center gap-2 text-sm font-semibold text-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {day.day}
                    </h3>
                    <div className="space-y-2 pl-3.5">
                      {day.courses.map((course, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 rounded-xl border bg-card p-3.5"
                        >
                          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                            <Clock className="h-4 w-4 text-primary" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="xs:flex-row xs:items-center xs:justify-between flex flex-col gap-0.5">
                              <p className="truncate text-sm font-medium text-foreground">
                                {course.name}
                              </p>
                              <span className="shrink-0 text-xs text-muted-foreground">
                                {course.time}
                              </span>
                            </div>
                            <p className="mt-0.5 text-xs text-muted-foreground">
                              {course.professor}
                            </p>
                            <div className="mt-1.5 flex items-center gap-3 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3 shrink-0" />
                                {course.room}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile: single day */}
              <div className="space-y-2 sm:hidden">
                <h3 className="mb-3 text-xs font-medium tracking-wider text-muted-foreground uppercase">
                  Courses
                </h3>
                {scheduleData[mobileDay].courses.map((course, i) => (
                  <div key={i} className="rounded-xl border bg-card p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-foreground">
                          {course.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {course.professor}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-3 border-t pt-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        {course.time}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" />
                        {course.room}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  )
}
