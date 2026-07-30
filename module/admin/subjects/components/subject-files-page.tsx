"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  BookOpen,
  FileText,
  Upload,
  Trash2,
  Loader2,
  ChevronRight,
  X,
  File,
  FileUp,
} from "lucide-react"
import {
  getAllSubjectsWithFiles,
  uploadSubjectFile,
  deleteSubjectFile,
} from "@/lib/actions/subject-files"

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
  subjectFiles: SubjectFile[]
}

export function SubjectFilesPage() {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Subject | null>(null)
  const [uploading, setUploading] = useState<string | null>(null)
  const [uploadData, setUploadData] = useState<{
    label: string
    type: "SYLLABUS" | "NOTES"
  }>({
    label: "",
    type: "NOTES",
  })

  useEffect(() => {
    getAllSubjectsWithFiles().then((s) => {
      setSubjects(s as unknown as Subject[])
      setLoading(false)
    })
  }, [])

  function load() {
    getAllSubjectsWithFiles().then((s) =>
      setSubjects(s as unknown as Subject[])
    )
  }

  async function handleUpload(subjectId: string, formData: FormData) {
    setUploading(subjectId)
    try {
      await uploadSubjectFile(
        subjectId,
        uploadData.label || "Untitled",
        uploadData.type,
        formData
      )
      setUploadData({ label: "", type: "NOTES" })
      load()
    } catch {}
    setUploading(null)
  }

  async function handleDelete(fileId: string) {
    await deleteSubjectFile(fileId)
    load()
  }

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
          <ChevronRight className="h-4 w-4 rotate-180" /> Back to all subjects
        </button>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground">
              {selected.name}
            </h1>
            <p className="text-sm text-muted-foreground">{selected.code}</p>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-5">
          <div className="mb-4 flex items-center gap-2">
            <FileUp className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">
              Upload File
            </span>
          </div>
          <form
            action={async (fd) => {
              await handleUpload(selected.id, fd)
            }}
            className="flex flex-wrap items-end gap-3"
          >
            <div className="flex-1 space-y-1.5">
              <label className="text-xs font-medium text-foreground">
                Label
              </label>
              <input
                name="label"
                type="text"
                placeholder="e.g. Midterm Notes"
                value={uploadData.label}
                onChange={(e) =>
                  setUploadData((p) => ({ ...p, label: e.target.value }))
                }
                className="w-full rounded-xl border bg-card px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">
                Type
              </label>
              <select
                value={uploadData.type}
                onChange={(e) =>
                  setUploadData((p) => ({
                    ...p,
                    type: e.target.value as "SYLLABUS" | "NOTES",
                  }))
                }
                className="rounded-xl border bg-card px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="NOTES">Notes</option>
                <option value="SYLLABUS">Syllabus</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">
                File
              </label>
              <input
                name="file"
                type="file"
                required
                className="block w-full text-xs file:mr-3 file:rounded-lg file:border-0 file:bg-primary/10 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-primary hover:file:bg-primary/20"
              />
            </div>
            <button
              type="submit"
              disabled={uploading === selected.id || !uploadData.label}
              className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-40"
            >
              {uploading === selected.id ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Upload className="h-4 w-4" />
              )}
              Upload
            </button>
          </form>
        </div>

        {syllabusFiles.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-foreground">Syllabus</h2>
            <div className="space-y-2">
              {syllabusFiles.map((f) => (
                <FileRow key={f.id} file={f} onDelete={handleDelete} />
              ))}
            </div>
          </div>
        )}

        {notesFiles.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-foreground">
              Notes & Files
            </h2>
            <div className="space-y-2">
              {notesFiles.map((f) => (
                <FileRow key={f.id} file={f} onDelete={handleDelete} />
              ))}
            </div>
          </div>
        )}

        {syllabusFiles.length === 0 && notesFiles.length === 0 && (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No files uploaded yet
          </p>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground sm:text-2xl">
          Subject Files
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Upload and manage syllabus & notes per subject
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {subjects.map((s) => (
          <Card
            key={s.id}
            className="cursor-pointer transition hover:-translate-y-0.5 hover:shadow-md"
            onClick={() => setSelected(s)}
          >
            <CardContent className="p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mt-4 font-semibold text-foreground">{s.name}</h3>
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
        ))}
      </div>
    </div>
  )
}

function FileRow({
  file,
  onDelete,
}: {
  file: SubjectFile
  onDelete: (id: string) => void
}) {
  const [confirming, setConfirming] = useState(false)

  return (
    <div className="flex items-center justify-between rounded-xl border bg-card px-4 py-3">
      <a
        href={file.fileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-w-0 items-center gap-3 text-sm text-foreground transition hover:text-primary"
      >
        <File className="h-4 w-4 shrink-0 text-muted-foreground" />
        <span className="truncate">{file.label}</span>
      </a>
      <div className="flex items-center gap-2">
        {confirming ? (
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onDelete(file.id)}
              className="rounded-lg bg-destructive px-2.5 py-1 text-xs font-medium text-destructive-foreground transition hover:opacity-90"
            >
              Confirm
            </button>
            <button
              onClick={() => setConfirming(false)}
              className="rounded-lg border px-2.5 py-1 text-xs font-medium text-foreground transition hover:bg-muted"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setConfirming(true)}
            className="flex h-7 w-7 items-center justify-center rounded-lg transition hover:bg-destructive/10"
          >
            <Trash2 className="h-3.5 w-3.5 text-destructive" />
          </button>
        )}
      </div>
    </div>
  )
}
