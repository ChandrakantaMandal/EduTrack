"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Calendar,
  Clock,
  MapPin,
  Plus,
  Pencil,
  Trash2,
  Loader2,
  Users,
} from "lucide-react"
import {
  getSubjects,
  getSchedule,
  createScheduleEntry,
  updateScheduleEntry,
  deleteScheduleEntry,
} from "@/module/admin/schedule/actions/actions"
import { PRACTICAL_GROUPS } from "@/lib/constants"

type Subject = { id: string; name: string; code: string }
type ScheduleItem = {
  id: string
  day: string
  startTime: string
  endTime: string
  room: string | null
  group: string | null
  subjectId: string
  subject: Subject
}

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]

const groupOptions = ["", ...PRACTICAL_GROUPS]

export function SchedulePage() {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [schedule, setSchedule] = useState<ScheduleItem[]>([])
  const [day, setDay] = useState("Monday")
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<ScheduleItem | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    subjectId: "",
    startTime: "",
    endTime: "",
    room: "",
    group: "",
  })

  useEffect(() => {
    getSubjects().then((s) => {
      setSubjects(s as Subject[])
      setLoading(false)
    })
    getSchedule().then((sch) => {
      setSchedule(sch as ScheduleItem[])
    })
  }, [])

  function load() {
    getSchedule().then((sch) => setSchedule(sch as ScheduleItem[]))
  }

  const daySchedule = schedule.filter((s) => s.day === day)

  function openNew() {
    setEditing(null)
    setForm({
      subjectId: subjects[0]?.id ?? "",
      startTime: "",
      endTime: "",
      room: "",
      group: "",
    })
    setShowForm(true)
  }

  function openEdit(entry: ScheduleItem) {
    setEditing(entry)
    setForm({
      subjectId: entry.subjectId,
      startTime: entry.startTime,
      endTime: entry.endTime,
      room: entry.room ?? "",
      group: entry.group ?? "",
    })
    setShowForm(true)
  }

  async function save() {
    if (!form.subjectId || !form.startTime || !form.endTime) return
    setSaving(true)
    const data = {
      subjectId: form.subjectId,
      day,
      startTime: form.startTime,
      endTime: form.endTime,
      room: form.room || undefined,
      group: form.group || undefined,
    }
    if (editing) {
      await updateScheduleEntry(editing.id, data)
    } else {
      await createScheduleEntry(data)
    }
    setSaving(false)
    setShowForm(false)
    load()
  }

  async function remove(id: string) {
    await deleteScheduleEntry(id)
    load()
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
          <div className="hidden grid-cols-6 gap-4 border-b px-5 py-3 text-xs font-medium tracking-wider text-muted-foreground uppercase sm:grid">
            <span>Subject</span>
            <span>Time</span>
            <span>Room</span>
            <span>Group</span>
            <span>Code</span>
            <span className="text-right">Actions</span>
          </div>
          {loading ? (
            <div className="flex items-center justify-center py-12 text-sm text-muted-foreground">
              <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading...
            </div>
          ) : daySchedule.length === 0 ? (
            <div className="flex flex-col items-center py-12 text-sm text-muted-foreground">
              <Calendar className="mb-2 h-8 w-8 opacity-50" />
              No classes scheduled for {day}
            </div>
          ) : (
            daySchedule.map((entry) => (
              <div
                key={entry.id}
                className="grid grid-cols-1 items-center gap-2 border-b px-5 py-4 transition last:border-0 hover:bg-muted/30 sm:grid-cols-6 sm:gap-4"
              >
                <p className="text-sm font-medium text-foreground">
                  {entry.subject.name}
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-3.5 w-3.5 shrink-0" />
                  {entry.startTime} - {entry.endTime}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 shrink-0" />
                  {entry.room ?? "—"}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-3.5 w-3.5 shrink-0" />
                  {entry.group ?? "All"}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="rounded-full bg-muted px-2 py-0.5 text-xs">
                    {entry.subject.code}
                  </span>
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
            ))
          )}
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
              <div>
                <label className="text-xs font-medium text-foreground">
                  Subject
                </label>
                <select
                  value={form.subjectId}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, subjectId: e.target.value }))
                  }
                  className="mt-1 w-full rounded-xl border bg-card px-4 py-2.5 text-sm text-foreground transition outline-none focus:ring-2 focus:ring-primary/20"
                >
                  {subjects.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.code})
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-foreground">
                    Start Time
                  </label>
                  <input
                    type="time"
                    value={form.startTime}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        startTime: e.target.value,
                      }))
                    }
                    className="mt-1 w-full rounded-xl border bg-card px-4 py-2.5 text-sm text-foreground transition outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground">
                    End Time
                  </label>
                  <input
                    type="time"
                    value={form.endTime}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, endTime: e.target.value }))
                    }
                    className="mt-1 w-full rounded-xl border bg-card px-4 py-2.5 text-sm text-foreground transition outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-foreground">
                  Room
                </label>
                <input
                  type="text"
                  value={form.room}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, room: e.target.value }))
                  }
                  placeholder="e.g. Hall A"
                  className="mt-1 w-full rounded-xl border bg-card px-4 py-2.5 text-sm text-foreground transition outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-foreground">
                  Group
                </label>
                <select
                  value={form.group}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, group: e.target.value }))
                  }
                  className="mt-1 w-full rounded-xl border bg-card px-4 py-2.5 text-sm text-foreground transition outline-none focus:ring-2 focus:ring-primary/20"
                >
                  {groupOptions.map((g) => (
                    <option key={g} value={g}>
                      {g || "All groups"}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={save}
                  disabled={
                    saving ||
                    !form.subjectId ||
                    !form.startTime ||
                    !form.endTime
                  }
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition hover:opacity-90 disabled:opacity-40"
                >
                  {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                  {saving ? "Saving..." : editing ? "Update" : "Create"}
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
