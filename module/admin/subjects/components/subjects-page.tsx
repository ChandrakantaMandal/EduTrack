"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Search, Clock, Plus, X, Loader2 } from "lucide-react"
import {
  getAllSubjects,
  createSubject,
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
  const [creating, setCreating] = useState(false)

  useEffect(() => {
    getAllSubjects().then((s) => {
      setSubjects(s as Subject[])
      setLoading(false)
    })
  }, [])

  const filtered = subjects.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  )

  async function handleCreate() {
    if (!form.name || !form.code) return
    setCreating(true)
    await createSubject({
      name: form.name,
      code: form.code,
      professor: form.professor || undefined,
      day: form.day || undefined,
    })
    setCreating(false)
    setShowForm(false)
    setForm({ name: "", code: "", professor: "", day: "" })
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
            onClick={() => setShowForm(true)}
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
                  <span className="text-xs text-muted-foreground">
                    {s.code}
                  </span>
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
          onClick={() => setShowForm(false)}
        >
          <Card
            className="w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <CardContent className="space-y-4 p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">
                  New Subject
                </h2>
                <button
                  onClick={() => setShowForm(false)}
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
                  onClick={handleCreate}
                  disabled={creating || !form.name || !form.code}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition hover:opacity-90 disabled:opacity-40"
                >
                  {creating && <Loader2 className="h-4 w-4 animate-spin" />}
                  {creating ? "Creating..." : "Create Subject"}
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
