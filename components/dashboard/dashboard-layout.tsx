"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/heder"
import { ViewSchedule } from "@/components/schedule"
import { ProfileMenu } from "@/components/profile"
import { NotificationsBell } from "@/components/notifications"
import { Calendar, Menu, X } from "lucide-react"
import Image from "next/image"

interface Props {
  user: {
    id: string
    name?: string | null
    email?: string | null
    image?: string | null
    practicalGroup?: string | null
  }
  children: React.ReactNode
}

export function DashboardLayout({ user, children }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [scheduleOpen, setScheduleOpen] = useState(false)

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
          <Image
            src="/logo.png"
            alt="EduTrack"
            width={100}
            height={28}
            className="h-7 w-auto"
          />
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
          <div className="flex items-center gap-2">
            <NotificationsBell userId={user.id} />
            <Calendar
              className="h-6 w-6"
              onClick={() => setScheduleOpen(true)}
            />
            <ProfileMenu user={user} />
          </div>
        </div>

        <div className="hidden lg:block">
          <Header user={user} userId={user.id} />
        </div>
        <ViewSchedule
          open={scheduleOpen}
          onClose={() => setScheduleOpen(false)}
          group={user.practicalGroup}
        />
        <main className="flex-1 overflow-x-hidden p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
