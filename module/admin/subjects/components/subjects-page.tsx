"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  BookOpen,
  Search,
  Clock,
  Plus,
  X,
  Pencil,
  Trash2,
  Loader2,
} from "lucide-react"
import {
  getAllSubjects,
  createSubject,
  updateSubject,
  deleteSubject,
} from "@/module/admin/subjects/actions/actions"

type Subject = {
  id: string
  name: string
  code: string
  professor: string | null
  schedule: string | null
}

export function SubjectsPage() {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    name: "",
    code: "",
    professor: "",
    day: "",
  })
  const [editing, setEditing] = useState<Subject | null>(null)
  const [deleting, setDeleting] = useState<Subject | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    getAllSubjects().then((s) => {
      setSubjects(s as Subject[])
      setLoading(false)
    })
  }, [])

  function load() {
    getAllSubjects().then((s) => setSubjects(s as Subject[]))
  }

  const filtered = subjects.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  )

  async function handleSave() {
    if (!form.name || !form.code) return
    setSaving(true)
    const data = {
      name: form.name,
      code: form.code,
      professor: form.professor || undefined,
      day: form.day || undefined,
    }
    if (editing) {
      await updateSubject(editing.id, data)
    } else {
      await createSubject(data)
    }
    setSaving(false)
    setShowForm(false)
    setEditing(null)
    setForm({ name: "", code: "", professor: "", day: "" })
    load()
  }

  function openEdit(subject: Subject) {
    setEditing(subject)
    setForm({
      name: subject.name,
      code: subject.code,
      professor: subject.professor ?? "",
      day: subject.schedule ?? "",
    })
    setShowForm(true)
  }

  async function handleDelete() {
    if (!deleting) return
    await deleteSubject(deleting.id)
    setDeleting(null)
    load()
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            Subjects
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage all subjects visible to students
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-48 rounded-xl border bg-card py-2 pr-4 pl-9 text-sm transition outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <button
            onClick={() => {
              setEditing(null)
              setForm({ name: "", code: "", professor: "", day: "" })
              setShowForm(true)
            }}
            className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition hover:opacity-90"
          >
            <Plus className="h-4 w-4" /> Add
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16 text-sm text-muted-foreground">
          <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading...
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((s) => (
            <Card
              key={s.id}
              className="transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEdit(s)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-muted"
                    >
                      <Pencil className="h-4 w-4 text-muted-foreground" />
                    </button>
                    <button
                      onClick={() => setDeleting(s)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </button>
                  </div>
                </div>
                <h3 className="mt-4 font-semibold text-foreground">{s.name}</h3>
                <p className="text-xs text-muted-foreground">
                  {s.professor ?? "—"}
                </p>
                <div className="mt-4 space-y-1.5 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5" /> {s.schedule ?? "—"}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {showForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => {
            setShowForm(false)
            setEditing(null)
          }}
        >
          <Card
            className="w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <CardContent className="space-y-4 p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">
                  {editing ? "Edit Subject" : "New Subject"}
                </h2>
                <button
                  onClick={() => {
                    setShowForm(false)
                    setEditing(null)
                  }}
                  className="flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-muted"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              {(["name", "code", "professor"] as const).map((f) => (
                <div key={f}>
                  <label className="text-xs font-medium text-foreground capitalize">
                    {f === "code" ? "Code (unique)" : f}
                  </label>
                  <input
                    type="text"
                    value={form[f]}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, [f]: e.target.value }))
                    }
                    className="mt-1 w-full rounded-xl border bg-card px-4 py-2.5 text-sm text-foreground transition outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              ))}
              <div>
                <label className="text-xs font-medium text-foreground">
                  Day
                </label>
                <select
                  value={form.day}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, day: e.target.value }))
                  }
                  className="mt-1 w-full rounded-xl border bg-card px-4 py-2.5 text-sm text-foreground transition outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="">Select day</option>
                  {[
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                  ].map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={handleSave}
                  disabled={saving || !form.name || !form.code}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition hover:opacity-90 disabled:opacity-40"
                >
                  {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                  {saving
                    ? "Saving..."
                    : editing
                      ? "Update Subject"
                      : "Create Subject"}
                </button>
                <button
                  onClick={() => {
                    setShowForm(false)
                    setEditing(null)
                  }}
                  className="flex-1 rounded-xl border py-2.5 text-sm font-medium text-foreground transition hover:bg-muted"
                >
                  Cancel
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {deleting && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setDeleting(null)}
        >
          <Card
            className="w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <CardContent className="space-y-4 p-6">
              <h2 className="text-lg font-semibold text-foreground">
                Delete Subject
              </h2>
              <p className="text-sm text-muted-foreground">
                Are you sure you want to delete{" "}
                <span className="font-medium text-foreground">
                  {deleting.name}
                </span>
                ? This will also remove all related attendance and schedule
                entries.
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleDelete}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-destructive py-2.5 text-sm font-medium text-destructive-foreground shadow-sm transition hover:opacity-90"
                >
                  <Trash2 className="h-4 w-4" /> Delete
                </button>
                <button
                  onClick={() => setDeleting(null)}
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
