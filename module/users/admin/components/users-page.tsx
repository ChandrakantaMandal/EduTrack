"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Search,
  User,
  Mail,
  BookOpen,
  MoreHorizontal,
  ChevronDown,
} from "lucide-react"

const users = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@university.edu",
    course: "Mathematics",
    attendance: 92,
    status: "active",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@university.edu",
    course: "Physics",
    attendance: 78,
    status: "active",
  },
  {
    id: 3,
    name: "Carol White",
    email: "carol@university.edu",
    course: "Computer Science",
    attendance: 95,
    status: "active",
  },
  {
    id: 4,
    name: "David Brown",
    email: "david@university.edu",
    course: "Chemistry",
    attendance: 85,
    status: "inactive",
  },
  {
    id: 5,
    name: "Eve Davis",
    email: "eve@university.edu",
    course: "Biology",
    attendance: 70,
    status: "active",
  },
  {
    id: 6,
    name: "Frank Miller",
    email: "frank@university.edu",
    course: "Literature",
    attendance: 88,
    status: "active",
  },
  {
    id: 7,
    name: "Grace Wilson",
    email: "grace@university.edu",
    course: "Mathematics",
    attendance: 65,
    status: "warning",
  },
  {
    id: 8,
    name: "Henry Taylor",
    email: "henry@university.edu",
    course: "Physics",
    attendance: 91,
    status: "active",
  },
]

export function UsersPage() {
  const [search, setSearch] = useState("")

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            Users
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage students and their accounts
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-56 rounded-xl border bg-card py-2 pr-4 pl-9 text-sm text-foreground transition outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <button className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition hover:opacity-90">
            + Add User
          </button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="hidden grid-cols-5 gap-4 border-b px-5 py-3 text-xs font-medium tracking-wider text-muted-foreground uppercase sm:grid">
            <span className="col-span-2">Student</span>
            <span>Course</span>
            <span>Attendance</span>
            <span className="text-right">Status</span>
          </div>
          {filtered.map((u) => (
            <div
              key={u.id}
              className="grid grid-cols-1 items-center gap-3 border-b px-5 py-4 transition last:border-0 hover:bg-muted/30 sm:grid-cols-5 sm:gap-4"
            >
              <div className="col-span-2 flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {u.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">
                    {u.name}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {u.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BookOpen className="h-3.5 w-3.5 shrink-0 sm:hidden" />
                {u.course}
              </div>
              <div>
                <span
                  className={`text-sm font-medium ${
                    u.attendance >= 85
                      ? "text-green-600 dark:text-green-400"
                      : u.attendance >= 75
                        ? "text-amber-600 dark:text-amber-400"
                        : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {u.attendance}%
                </span>
              </div>
              <div className="flex items-center justify-end gap-2">
                <span
                  className={`rounded-full px-2 py-0.5 text-xs ${
                    u.status === "active"
                      ? "bg-green-500/10 text-green-600 dark:text-green-400"
                      : u.status === "warning"
                        ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {u.status}
                </span>
                <button className="flex h-7 w-7 items-center justify-center rounded-lg transition hover:bg-muted">
                  <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>
          Showing {filtered.length} of {users.length} users
        </span>
        <div className="flex items-center gap-1">
          <button className="flex h-7 w-7 items-center justify-center rounded-lg transition hover:bg-muted">
            1
          </button>
          <button className="flex h-7 w-7 items-center justify-center rounded-lg transition hover:bg-muted">
            2
          </button>
          <button className="flex h-7 w-7 items-center justify-center rounded-lg transition hover:bg-muted">
            3
          </button>
        </div>
      </div>
    </div>
  )
}
