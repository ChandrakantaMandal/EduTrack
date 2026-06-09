"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Plus,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

const initialSchedule = [
  {
    id: 1,
    day: "Monday",
    subject: "Mathematics",
    time: "08:00 - 09:30",
    room: "Hall A",
    professor: "Dr. Feynman",
  },
  {
    id: 2,
    day: "Monday",
    subject: "Physics",
    time: "10:00 - 11:30",
    room: "Lab 3",
    professor: "Dr. Curie",
  },
  {
    id: 3,
    day: "Tuesday",
    subject: "Computer Science",
    time: "08:00 - 09:30",
    room: "Lab 1",
    professor: "Dr. Turing",
  },
  {
    id: 4,
    day: "Tuesday",
    subject: "Chemistry",
    time: "10:00 - 11:30",
    room: "Lab 2",
    professor: "Dr. Pauling",
  },
  {
    id: 5,
    day: "Wednesday",
    subject: "Mathematics",
    time: "08:00 - 09:30",
    room: "Hall A",
    professor: "Dr. Feynman",
  },
  {
    id: 6,
    day: "Wednesday",
    subject: "Literature",
    time: "10:00 - 11:30",
    room: "Room 5",
    professor: "Dr. Tolkien",
  },
  {
    id: 7,
    day: "Thursday",
    subject: "Physics",
    time: "08:00 - 09:30",
    room: "Lab 3",
    professor: "Dr. Curie",
  },
  {
    id: 8,
    day: "Thursday",
    subject: "Computer Science",
    time: "10:00 - 11:30",
    room: "Lab 1",
    professor: "Dr. Turing",
  },
  {
    id: 9,
    day: "Friday",
    subject: "Biology",
    time: "09:00 - 10:30",
    room: "Lab 2",
    professor: "Dr. Darwin",
  },
]

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]

export function SchedulePage() {
  const [schedule, setSchedule] = useState(initialSchedule)
  const [day, setDay] = useState("Monday")
  const [editing, setEditing] = useState<
    (typeof initialSchedule)[number] | null
  >(null)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    subject: "",
    time: "",
    room: "",
    professor: "",
  })

  const daySchedule = schedule.filter((s) => s.day === day)

  function openNew() {
    setEditing(null)
    setForm({ subject: "", time: "", room: "", professor: "" })
    setShowForm(true)
  }

  function openEdit(entry: (typeof initialSchedule)[number]) {
    setEditing(entry)
    setForm({
      subject: entry.subject,
      time: entry.time,
      room: entry.room,
      professor: entry.professor,
    })
    setShowForm(true)
  }

  function save() {
    if (editing) {
      setSchedule((prev) =>
        prev.map((s) => (s.id === editing.id ? { ...s, ...form } : s))
      )
    } else {
      const newId = Math.max(...schedule.map((s) => s.id), 0) + 1
      setSchedule((prev) => [...prev, { id: newId, day, ...form }])
    }
    setShowForm(false)
  }

  function remove(id: number) {
    setSchedule((prev) => prev.filter((s) => s.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            Schedule
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Create and manage class schedules
          </p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition hover:opacity-90"
        >
          <Plus className="h-4 w-4" /> Add Entry
        </button>
      </div>

      <div className="flex items-center gap-1 overflow-x-auto pb-1">
        {days.map((d) => (
          <button
            key={d}
            onClick={() => setDay(d)}
            className={`shrink-0 rounded-xl px-4 py-2 text-sm font-medium transition ${
              day === d
                ? "bg-primary text-primary-foreground shadow-sm"
                : "border bg-card text-muted-foreground hover:text-foreground"
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="hidden grid-cols-5 gap-4 border-b px-5 py-3 text-xs font-medium tracking-wider text-muted-foreground uppercase sm:grid">
            <span>Subject</span>
            <span>Time</span>
            <span>Room</span>
            <span>Professor</span>
            <span className="text-right">Actions</span>
          </div>
          {daySchedule.length === 0 && (
            <div className="flex flex-col items-center py-12 text-sm text-muted-foreground">
              <Calendar className="mb-2 h-8 w-8 opacity-50" />
              No classes scheduled for {day}
            </div>
          )}
          {daySchedule.map((entry) => (
            <div
              key={entry.id}
              className="grid grid-cols-1 items-center gap-2 border-b px-5 py-4 transition last:border-0 hover:bg-muted/30 sm:grid-cols-5 sm:gap-4"
            >
              <p className="text-sm font-medium text-foreground">
                {entry.subject}
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-3.5 w-3.5 shrink-0" />
                {entry.time}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                {entry.room}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-3.5 w-3.5 shrink-0" />
                {entry.professor}
              </div>
              <div className="flex items-center justify-end gap-1">
                <button
                  onClick={() => openEdit(entry)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-muted"
                >
                  <Pencil className="h-4 w-4 text-muted-foreground" />
                </button>
                <button
                  onClick={() => remove(entry.id)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {showForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setShowForm(false)}
        >
          <Card
            className="w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <CardContent className="space-y-4 p-6">
              <h2 className="text-lg font-semibold text-foreground">
                {editing ? "Edit Entry" : "New Schedule Entry"}
              </h2>
              {["subject", "time", "room", "professor"].map((f) => (
                <div key={f}>
                  <label className="text-xs font-medium text-foreground capitalize">
                    {f}
                  </label>
                  <input
                    type="text"
                    value={form[f as keyof typeof form]}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, [f]: e.target.value }))
                    }
                    placeholder={
                      f === "time"
                        ? "e.g. 08:00 - 09:30"
                        : f === "room"
                          ? "e.g. Hall A"
                          : `Enter ${f}`
                    }
                    className="mt-1 w-full rounded-xl border bg-card px-4 py-2.5 text-sm text-foreground transition outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              ))}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={save}
                  className="flex-1 rounded-xl bg-primary py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition hover:opacity-90"
                >
                  {editing ? "Update" : "Create"}
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="flex-1 rounded-xl border py-2.5 text-sm font-medium text-foreground transition hover:bg-muted"
                >
                  Cancel
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
