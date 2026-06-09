"use client"

import { useState, useTransition } from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Menu, X, Shield, LogOut } from "lucide-react"
import { Input } from "@/components/ui/input"
import { adminLogout } from "@/module/auth/utils/admin-auth-utils"

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [pending, startTransition] = useTransition()

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r bg-card transition duration-200 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b p-4 lg:hidden">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <h1 className="text-lg font-bold text-primary">EduTrack</h1>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-muted"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <AdminSidebar />
      </aside>

      <div className="flex min-h-screen flex-col lg:ml-64">
        <div className="flex items-center justify-between border-b bg-background/80 px-4 py-3 backdrop-blur lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-lg transition hover:bg-muted"
          >
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="text-base font-bold text-primary">EduTrack</h1>
          <div className="w-9" />
        </div>

        <header className="flex h-14 items-center justify-between border-b bg-background/80 px-4 backdrop-blur lg:h-16 lg:px-6">
          <Input
            placeholder="Search..."
            className="hidden w-48 sm:block lg:w-72 xl:w-96"
          />
          <div className="flex items-center gap-2">
            <span className="hidden rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground sm:inline">
              Admin
            </span>
            <button
              onClick={() => startTransition(() => adminLogout())}
              disabled={pending}
              className="flex h-9 w-9 items-center justify-center rounded-lg transition hover:bg-destructive/10"
            >
              <LogOut className="h-4 w-4 text-destructive" />
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
