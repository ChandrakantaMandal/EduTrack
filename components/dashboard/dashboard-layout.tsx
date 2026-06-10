"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/heder"
import { Menu, X } from "lucide-react"

interface Props {
  user: {
    id: string
    name?: string | null
    email?: string | null
    image?: string | null
  }
  children: React.ReactNode
}

export function DashboardLayout({ user, children }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r bg-card transition duration-200 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b p-4 lg:hidden">
          <h1 className="text-lg font-bold text-primary">EduTrack</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-muted"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <Sidebar />
      </aside>

      {/* Main */}
      <div className="flex min-h-screen flex-col lg:ml-64">
        {/* Mobile header bar */}
        <div className="flex items-center justify-between border-b bg-background/80 px-4 py-3 backdrop-blur lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-lg transition hover:bg-muted"
          >
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="text-base font-bold text-primary">EduTrack</h1>
        </div>

        <Header user={user} userId={user.id} />
        <main className="flex-1 overflow-x-hidden p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
