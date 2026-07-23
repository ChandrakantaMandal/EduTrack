"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Check, X, Calendar, Loader2, Download } from "lucide-react"
import {
  getSubjects,
  getUsers,
  getAttendanceRecords,
  saveAttendance,
} from "@/module/admin/dashboard/actions/actions"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

type Subject = { id: string; name: string }
type Student = {
  id: string
  name: string | null
  email: string | null
  studentId: string | null
  course: string | null
}

export function UsersPage() {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [selectedSubject, setSelectedSubject] = useState("")
  const [date, setDate] = useState(new Date().toISOString().split("T")[0])
  const [students, setStudents] = useState<Student[]>([])
  const [attendance, setAttendance] = useState<Record<string, boolean>>({})
  const [search, setSearch] = useState("")
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState("")
  const [locked, setLocked] = useState(false)

  useEffect(() => {
    getSubjects().then((s) => {
      setSubjects(s)
      if (s.length > 0) setSelectedSubject(s[0].id)
    })
  }, [])

  useEffect(() => {
    if (!selectedSubject) return
    getUsers().then((users) => setStudents(users))
    getAttendanceRecords(selectedSubject, date).then((records) => {
      const map: Record<string, boolean> = {}
      for (const r of records) {
        map[r.userId] = r.present
      }
      setAttendance(map)
      setLocked(records.length > 0)
      setSaved(false)
      setError("")
    })
  }, [selectedSubject, date])

  const filtered = students
    .filter(
      (e) =>
        e.name?.toLowerCase().includes(search.toLowerCase()) ||
        e.email?.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (!a.studentId && !b.studentId) return 0
      if (!a.studentId) return 1
      if (!b.studentId) return -1
      return a.studentId.localeCompare(b.studentId)
    })

  function setPresent(userId: string) {
    setAttendance((prev) => ({ ...prev, [userId]: true }))
    setSaved(false)
  }

  function setAbsent(userId: string) {
    setAttendance((prev) => ({ ...prev, [userId]: false }))
    setSaved(false)
  }

  async function handleSave() {
    if (!selectedSubject) return
    setSaving(true)
    setError("")
    try {
      const records = Object.entries(attendance).map(([userId, present]) => ({
        userId,
        present,
      }))
      await saveAttendance(selectedSubject, date, records)
      const freshRecords = await getAttendanceRecords(selectedSubject, date)
      const map: Record<string, boolean> = {}
      for (const r of freshRecords) {
        map[r.userId] = r.present
      }
      setAttendance(map)
      setLocked(true)
      setSaving(false)
      setSaved(true)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed")
      setSaving(false)
    }
  }

  const markedCount = Object.keys(attendance).length

  const selectedSubjectName =
    subjects.find((s) => s.id === selectedSubject)?.name ?? "Subject"

  function handleDownloadPdf() {
    const doc = new jsPDF()

    doc.setFontSize(16)
    doc.text("Attendance Report", 14, 20)

    doc.setFontSize(11)
    doc.text(`Subject: ${selectedSubjectName}`, 14, 30)
    doc.text(`Date: ${date}`, 14, 37)

    const presentCount = Object.values(attendance).filter(Boolean).length
    const absentCount = markedCount - presentCount
    doc.text(
      `Summary: ${presentCount} Present, ${absentCount} Absent, ${markedCount} Total`,
      14,
      44
    )

    const rows = filtered.map((u) => [
      u.studentId ?? "—",
      u.name ?? "—",
      u.course ?? "—",
      attendance[u.id] === true
        ? "Present"
        : attendance[u.id] === false
          ? "Absent"
          : "Unmarked",
    ])

    autoTable(doc, {
      startY: 50,
      head: [["Roll No", "Name", "Course", "Status"]],
      body: rows,
      styles: { fontSize: 9 },
      headStyles: { fillColor: [37, 99, 235] },
    })

    doc.save(`attendance-${selectedSubjectName}-${date}.pdf`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          Attendance
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Mark student attendance
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex items-center gap-2 rounded-xl border bg-card px-4 py-2.5">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <input
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value)
              setSaved(false)
              setError("")
            }}
            className="bg-transparent text-sm text-foreground outline-none"
          />
        </div>
        <select
          value={selectedSubject}
          onChange={(e) => {
            setSelectedSubject(e.target.value)
            setError("")
          }}
          className="rounded-xl border bg-card px-4 py-2.5 text-sm text-foreground transition outline-none focus:ring-2 focus:ring-primary/20"
        >
          {subjects.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
        <div className="relative flex-1">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search student..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border bg-card py-2.5 pr-4 pl-9 text-sm text-foreground transition outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="hidden grid-cols-5 gap-4 border-b px-5 py-3 text-xs font-medium tracking-wider text-muted-foreground uppercase sm:grid">
            <span>Name</span>
            <span>Roll No</span>
            <span>Course</span>
            <span>Email</span>
            <span className="text-right">Mark</span>
          </div>
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-sm text-muted-foreground">
              No students found
            </div>
          ) : (
            filtered.map((u) => {
              const isPresent = attendance[u.id]
              return (
                <div
                  key={u.id}
                  className="grid grid-cols-1 items-center gap-3 border-b px-5 py-4 transition last:border-0 hover:bg-muted/30 sm:grid-cols-5 sm:gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                        isPresent === true
                          ? "bg-green-500/20 text-green-600"
                          : isPresent === false
                            ? "bg-red-500/20 text-red-600"
                            : "bg-primary/10 text-primary"
                      }`}
                    >
                      {u.name?.charAt(0) ?? "?"}
                    </div>
                    <span className="truncate text-sm font-medium text-foreground">
                      {u.name}
                    </span>
                  </div>
                  <div className="text-sm text-foreground">
                    {u.studentId ?? "—"}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {u.course ?? "—"}
                  </div>
                  <div className="truncate text-sm text-muted-foreground">
                    {u.email}
                  </div>
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => setPresent(u.id)}
                      disabled={locked}
                      className={`flex h-8 w-8 items-center justify-center rounded-lg border transition ${
                        isPresent === true
                          ? "border-green-500 bg-green-500/10 text-green-600"
                          : locked
                            ? "cursor-not-allowed border-muted text-muted-foreground opacity-40"
                            : "border-muted text-muted-foreground hover:border-green-300"
                      }`}
                    >
                      <Check className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setAbsent(u.id)}
                      disabled={locked}
                      className={`flex h-8 w-8 items-center justify-center rounded-lg border transition ${
                        isPresent === false
                          ? "border-red-500 bg-red-500/10 text-red-600"
                          : locked
                            ? "cursor-not-allowed border-muted text-muted-foreground opacity-40"
                            : "border-muted text-muted-foreground hover:border-red-300"
                      }`}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )
            })
          )}
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          {markedCount > 0 ? `${markedCount} students marked` : "No marks yet"}
          {saved && (
            <span className="ml-2 font-medium text-green-600">Saved</span>
          )}
          {error && (
            <span className="ml-2 font-medium text-red-600">{error}</span>
          )}
        </p>
        {!locked && (
          <button
            onClick={handleSave}
            disabled={markedCount === 0 || saving}
            className="flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition hover:opacity-90 disabled:opacity-40"
          >
            {saving && <Loader2 className="h-4 w-4 animate-spin" />}
            {saving ? "Saving..." : "Save Attendance"}
          </button>
        )}
        {locked && (
          <button
            onClick={handleDownloadPdf}
            className="flex items-center gap-2 rounded-xl border border-muted bg-card px-5 py-2.5 text-sm font-medium text-foreground shadow-sm transition hover:bg-muted/50"
          >
            <Download className="h-4 w-4" />
            Download PDF
          </button>
        )}
      </div>
    </div>
  )
}
