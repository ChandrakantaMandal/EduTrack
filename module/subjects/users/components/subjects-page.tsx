"use client"

import { Card, CardContent } from "@/components/ui/card"
import {
  BookOpen,
  Search,
  Clock,
  MapPin,
  User,
  FileText,
  ChevronRight,
  X,
  Calendar,
} from "lucide-react"
import { useState } from "react"

const subjectsData = [
  {
    id: 1,
    name: "Mathematics",
    professor: "Dr. Feynman",
    email: "feynman@university.edu",
    schedule: "Mon / Wed 10:00 AM - 11:30 AM",
    room: "Room 301, Science Block",
    credits: 4,
    attendance: 90,
    grade: "A",
    projects: [
      {
        name: "Calculus Project",
        due: "Jun 15, 2026",
        status: "submitted",
        score: 92,
      },
      {
        name: "Statistics Report",
        due: "Jul 10, 2026",
        status: "pending",
        score: null,
      },
    ],
    syllabus: "Algebra, Calculus, Statistics, Geometry",
  },
  {
    id: 2,
    name: "Physics",
    professor: "Dr. Marie Curie",
    email: "curie@university.edu",
    schedule: "Tue / Thu 8:00 AM - 9:30 AM",
    room: "Room 205, Science Block",
    credits: 4,
    attendance: 78,
    grade: "B+",
    projects: [
      {
        name: "Quantum Mechanics Paper",
        due: "Jun 20, 2026",
        status: "submitted",
        score: 85,
      },
      {
        name: "Lab Experiment Report",
        due: "Jul 5, 2026",
        status: "grading",
        score: null,
      },
    ],
    syllabus: "Mechanics, Thermodynamics, Quantum Physics, Electromagnetism",
  },
  {
    id: 3,
    name: "Chemistry",
    professor: "Dr. Pauling",
    email: "pauling@university.edu",
    schedule: "Mon / Wed 2:00 PM - 3:30 PM",
    room: "Lab 102, Chemistry Wing",
    credits: 3,
    attendance: 85,
    grade: "B",
    projects: [
      {
        name: "Organic Chemistry Report",
        due: "Jun 18, 2026",
        status: "submitted",
        score: 88,
      },
    ],
    syllabus: "Organic Chemistry, Inorganic Chemistry, Analytical Chemistry",
  },
  {
    id: 4,
    name: "Computer Science",
    professor: "Dr. Turing",
    email: "turing@university.edu",
    schedule: "Tue / Thu 10:00 AM - 11:30 AM",
    room: "Lab 201, IT Building",
    credits: 4,
    attendance: 92,
    grade: "A-",
    projects: [
      {
        name: "Algorithm Implementation",
        due: "Jun 12, 2026",
        status: "submitted",
        score: 95,
      },
      {
        name: "Database Design Project",
        due: "Jul 8, 2026",
        status: "grading",
        score: null,
      },
      {
        name: "Final Capstone",
        due: "Aug 1, 2026",
        status: "pending",
        score: null,
      },
    ],
    syllabus: "Data Structures, Algorithms, Databases, Networks",
  },
  {
    id: 5,
    name: "Biology",
    professor: "Dr. Darwin",
    email: "darwin@university.edu",
    schedule: "Friday 9:00 AM - 10:30 AM",
    room: "Room 104, Life Sciences",
    credits: 3,
    attendance: 70,
    grade: "C+",
    projects: [
      {
        name: "Research Paper",
        due: "Jun 25, 2026",
        status: "pending",
        score: null,
      },
    ],
    syllabus: "Cell Biology, Genetics, Ecology, Evolution",
  },
  {
    id: 6,
    name: "Literature",
    professor: "Dr. Tolkien",
    email: "tolkien@university.edu",
    schedule: "Wed / Fri 11:00 AM - 12:30 PM",
    room: "Room 105, Arts Block",
    credits: 2,
    attendance: 88,
    grade: "B+",
    projects: [
      {
        name: "Essay: Modern Poetry",
        due: "Jun 14, 2026",
        status: "submitted",
        score: 90,
      },
    ],
    syllabus: "Shakespeare, Modern Poetry, Literary Theory, Creative Writing",
  },
]

function statusColor(status: string) {
  switch (status) {
    case "submitted":
      return "bg-green-500/10 text-green-600 dark:text-green-400"
    case "grading":
      return "bg-amber-500/10 text-amber-600 dark:text-amber-400"
    case "pending":
      return "bg-muted text-muted-foreground"
    default:
      return "bg-muted text-muted-foreground"
  }
}

function attendanceColor(percent: number) {
  if (percent >= 85) return "text-green-600 dark:text-green-400"
  if (percent >= 75) return "text-amber-600 dark:text-amber-400"
  return "text-red-600 dark:text-red-400"
}

export function SubjectsPage() {
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState<
    (typeof subjectsData)[number] | null
  >(null)

  const subjects = subjectsData.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <div className="space-y-6 sm:space-y-8">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              My Subjects
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              View details, projects, and attendance for each subject
            </p>
          </div>
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

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {subjects.map((s) => (
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
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-muted-foreground">
                        {s.grade}
                      </span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
                    </div>
                  </div>

                  <h3 className="mt-4 font-semibold text-foreground">
                    {s.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">{s.professor}</p>

                  <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5 shrink-0" />
                    {s.schedule}
                  </div>
                  <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 shrink-0" />
                    {s.room}
                  </div>

                  <div className="mt-4 flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Attendance</span>
                    <span
                      className={`font-semibold ${attendanceColor(s.attendance)}`}
                    >
                      {s.attendance}%
                    </span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${s.attendance}%` }}
                    />
                  </div>

                  <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <FileText className="h-3.5 w-3.5 shrink-0" />
                    {s.projects.length} project
                    {s.projects.length > 1 ? "s" : ""}
                  </div>
                </CardContent>
              </Card>
            </button>
          ))}
        </div>
      </div>

      {/* Detail Panel */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 backdrop-blur-sm sm:items-center sm:p-4">
          <Card className="animate-in slide-in-from-bottom-4 sm:slide-in-from-bottom-0 fade-in-0 max-h-[90vh] w-full overflow-y-auto rounded-t-2xl duration-200 sm:max-h-[85vh] sm:max-w-xl sm:rounded-2xl">
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-card px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                  <BookOpen className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-foreground">
                    {selected.name}
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    {selected.syllabus}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-muted"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-5 p-5">
              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-muted/50 p-3.5">
                  <p className="text-xs text-muted-foreground">Professor</p>
                  <p className="mt-0.5 text-sm font-medium text-foreground">
                    {selected.professor}
                  </p>
                </div>
                <div className="rounded-xl bg-muted/50 p-3.5">
                  <p className="text-xs text-muted-foreground">Grade</p>
                  <p className="mt-0.5 text-sm font-medium text-foreground">
                    {selected.grade}
                  </p>
                </div>
                <div className="rounded-xl bg-muted/50 p-3.5">
                  <p className="text-xs text-muted-foreground">Credits</p>
                  <p className="mt-0.5 text-sm font-medium text-foreground">
                    {selected.credits}
                  </p>
                </div>
                <div className="rounded-xl bg-muted/50 p-3.5">
                  <p className="text-xs text-muted-foreground">Attendance</p>
                  <p
                    className={`mt-0.5 text-sm font-medium ${attendanceColor(selected.attendance)}`}
                  >
                    {selected.attendance}%
                  </p>
                </div>
              </div>

              {/* Schedule & Location */}
              <div className="space-y-2">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  Schedule
                </h3>
                <div className="space-y-2 rounded-xl border bg-card p-3.5 text-sm">
                  <div className="flex items-center gap-2.5">
                    <Clock className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <span className="text-foreground">{selected.schedule}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <MapPin className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <span className="text-foreground">{selected.room}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <User className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {selected.email}
                    </span>
                  </div>
                </div>
              </div>

              {/* Projects */}
              <div className="space-y-2">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  Projects & Assignments
                </h3>
                <div className="space-y-2">
                  {selected.projects.length === 0 && (
                    <p className="py-4 text-center text-xs text-muted-foreground">
                      No projects yet.
                    </p>
                  )}
                  {selected.projects.map((p, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between gap-3 rounded-xl border bg-card p-3.5"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-foreground">
                          {p.name}
                        </p>
                        <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          Due {p.due}
                        </p>
                      </div>
                      <div className="flex shrink-0 items-center gap-2">
                        {p.score !== null && (
                          <span className="text-xs font-semibold text-foreground">
                            {p.score}%
                          </span>
                        )}
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs ${statusColor(p.status)}`}
                        >
                          {p.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  )
}
