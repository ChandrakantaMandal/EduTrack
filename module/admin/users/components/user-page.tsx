"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, Trash2, Loader2, UserCog } from "lucide-react"
import { getAllUsers, deleteUser } from "@/module/admin/users/actions/actions"

type User = {
  id: string
  name: string | null
  email: string | null
  emailVerified: Date | null
  image: string | null
  studentId: string | null
  course: string | null
  section: string | null
  practicalGroup: string | null
  preferences: unknown
}

export function UserPage() {
  const [users, setUsers] = useState<User[]>([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [confirmId, setConfirmId] = useState<string | null>(null)

  useEffect(() => {
    getAllUsers().then((u) => {
      setUsers(u)
      setLoading(false)
    })
  }, [])

  async function handleDelete(id: string) {
    setDeleting(id)
    setConfirmId(null)
    try {
      await deleteUser(id)
      setUsers((prev) => prev.filter((u) => u.id !== id))
    } catch {
      alert("Failed to delete user")
    } finally {
      setDeleting(null)
    }
  }

  const filtered = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase()) ||
      u.studentId?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            User Management
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            View and manage all registered users
          </p>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search by name, email, or roll number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border bg-card py-2.5 pr-4 pl-9 text-sm text-foreground transition outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <>
              <div className="hidden grid-cols-6 gap-4 border-b px-5 py-3 text-xs font-medium tracking-wider text-muted-foreground uppercase sm:grid">
                <span className="col-span-2">Name</span>
                <span>Roll No</span>
                <span>Course</span>
                <span>Section</span>
                <span className="text-right">Actions</span>
              </div>
              {filtered.length === 0 ? (
                <div className="py-16 text-center text-sm text-muted-foreground">
                  {search ? "No users match your search" : "No users found"}
                </div>
              ) : (
                filtered.map((u) => (
                  <div
                    key={u.id}
                    className="grid grid-cols-1 items-center gap-3 border-b px-5 py-4 transition last:border-0 hover:bg-muted/30 sm:grid-cols-6 sm:gap-4"
                  >
                    <div className="flex items-center gap-3 sm:col-span-2">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                        {u.name?.charAt(0) ?? "?"}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-foreground">
                          {u.name ?? "Unnamed"}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">
                          {u.email ?? ""}
                        </p>
                      </div>
                    </div>
                    <div className="text-sm text-foreground">
                      {u.studentId ?? (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {u.course ?? (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {u.section ?? (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </div>
                    <div className="flex items-center justify-end gap-2">
                      {confirmId === u.id ? (
                        <div className="flex items-center gap-1.5">
                          <Button
                            size="xs"
                            variant="destructive"
                            onClick={() => handleDelete(u.id)}
                            disabled={deleting === u.id}
                          >
                            {deleting === u.id ? (
                              <Loader2 className="h-3 w-3 animate-spin" />
                            ) : (
                              "Confirm"
                            )}
                          </Button>
                          <Button
                            size="xs"
                            variant="ghost"
                            onClick={() => setConfirmId(null)}
                          >
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <Button
                          size="icon-sm"
                          variant="ghost"
                          onClick={() => setConfirmId(u.id)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </>
          )}
        </CardContent>
      </Card>

      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <UserCog className="h-3.5 w-3.5" />
        <span>
          {users.length} total user{users.length !== 1 ? "s" : ""}
        </span>
      </div>
    </div>
  )
}
