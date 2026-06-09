"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Search, Users, Clock, Plus } from "lucide-react"

const subjects = [
  {
    id: 1,
    name: "Mathematics",
    professor: "Dr. Feynman",
    students: 45,
    schedule: "Mon/Wed 10AM",
    credits: 4,
    avgAtt: 88,
  },
  {
    id: 2,
    name: "Physics",
    professor: "Dr. Curie",
    students: 38,
    schedule: "Tue/Thu 8AM",
    credits: 4,
    avgAtt: 82,
  },
  {
    id: 3,
    name: "Chemistry",
    professor: "Dr. Pauling",
    students: 32,
    schedule: "Mon/Wed 2PM",
    credits: 3,
    avgAtt: 79,
  },
  {
    id: 4,
    name: "Computer Science",
    professor: "Dr. Turing",
    students: 50,
    schedule: "Tue/Thu 10AM",
    credits: 4,
    avgAtt: 91,
  },
  {
    id: 5,
    name: "Biology",
    professor: "Dr. Darwin",
    students: 28,
    schedule: "Fri 9AM",
    credits: 3,
    avgAtt: 74,
  },
  {
    id: 6,
    name: "Literature",
    professor: "Dr. Tolkien",
    students: 35,
    schedule: "Wed/Fri 11AM",
    credits: 2,
    avgAtt: 86,
  },
]

export function SubjectsPage() {
  const [search, setSearch] = useState("")
  const filtered = subjects.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            Subjects
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage courses and assignments
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
          <button className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition hover:opacity-90">
            <Plus className="h-4 w-4" /> Add
          </button>
        </div>
      </div>

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
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    s.avgAtt >= 85
                      ? "bg-green-500/10 text-green-600"
                      : s.avgAtt >= 75
                        ? "bg-amber-500/10 text-amber-600"
                        : "bg-red-500/10 text-red-600"
                  }`}
                >
                  {s.avgAtt}%
                </span>
              </div>
              <h3 className="mt-4 font-semibold text-foreground">{s.name}</h3>
              <p className="text-xs text-muted-foreground">{s.professor}</p>
              <div className="mt-4 space-y-1.5 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Users className="h-3.5 w-3.5" /> {s.students} students
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5" /> {s.schedule}
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-3.5 w-3.5" /> {s.credits} credits
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
