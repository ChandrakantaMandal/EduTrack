"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  BookOpen,
  Search,
  FileText,
  File,
  Loader2,
  ChevronRight,
  ArrowUpRight,
  X,
  FolderOpen,
} from "lucide-react"
import { getAllSubjectsWithFiles } from "@/lib/actions/subject-files"

type SubjectFile = {
  id: string
  label: string
  type: string
  fileUrl: string
  createdAt: string
}

type Subject = {
  id: string
  name: string
  code: string
  professor: string | null
  subjectFiles: SubjectFile[]
}

export function SubjectFilesPage() {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Subject | null>(null)

  useEffect(() => {
    getAllSubjectsWithFiles().then((s) => {
      setSubjects(s as unknown as Subject[])
      setLoading(false)
    })
  }, [])

  const filtered = subjects.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16 text-sm text-muted-foreground">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading...
      </div>
    )
  }

  if (selected) {
    const syllabusFiles = selected.subjectFiles.filter(
      (f) => f.type === "SYLLABUS"
    )
    const notesFiles = selected.subjectFiles.filter((f) => f.type === "NOTES")

    return (
      <div className="space-y-6">
        <button
          onClick={() => setSelected(null)}
          className="flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground"
        >
          <ChevronRight className="h-4 w-4 rotate-180" /> All Subjects
        </button>

        <div>
          <h1 className="text-xl font-bold text-foreground">{selected.name}</h1>
          <p className="text-sm text-muted-foreground">{selected.code}</p>
        </div>

        {syllabusFiles.length > 0 && (
          <div className="space-y-3">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <FileText className="h-4 w-4 text-muted-foreground" /> Syllabus
            </h2>
            <div className="space-y-2">
              {syllabusFiles.map((f) => (
                <a
                  key={f.id}
                  href={f.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border bg-card px-4 py-3 transition hover:bg-muted/50"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <File className="h-4 w-4 shrink-0 text-primary" />
                    <span className="truncate text-sm font-medium text-foreground">
                      {f.label}
                    </span>
                  </div>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                </a>
              ))}
            </div>
          </div>
        )}

        {notesFiles.length > 0 && (
          <div className="space-y-3">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <FileText className="h-4 w-4 text-muted-foreground" /> Notes &
              Files
            </h2>
            <div className="space-y-2">
              {notesFiles.map((f) => (
                <a
                  key={f.id}
                  href={f.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border bg-card px-4 py-3 transition hover:bg-muted/50"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <File className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <span className="truncate text-sm font-medium text-foreground">
                      {f.label}
                    </span>
                  </div>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                </a>
              ))}
            </div>
          </div>
        )}

        {syllabusFiles.length === 0 && notesFiles.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-12 text-sm text-muted-foreground">
            <FolderOpen className="h-10 w-10" />
            <p>No files available for this subject yet</p>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-xl font-bold text-foreground sm:text-2xl">
          Subject Files
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Access syllabus, notes, and other files
        </p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search subjects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border bg-card py-2.5 pr-4 pl-10 text-sm text-foreground transition outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-sm text-muted-foreground">
          No subjects found
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {filtered.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelected(s)}
              className="text-left"
            >
              <Card className="cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-md">
                <CardContent className="p-5 sm:p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
                  </div>
                  <h3 className="mt-4 font-semibold text-foreground">
                    {s.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">{s.code}</p>
                  <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <FileText className="h-3.5 w-3.5" />
                      {s.subjectFiles.length} file
                      {s.subjectFiles.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
