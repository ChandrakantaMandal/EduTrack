"use client"

import { ViewSchedule } from "@/components/schedule"
import { Input } from "@/components/ui/input"
import { Calendar } from "lucide-react"
import { useState } from "react"
import { ProfileMenu } from "./profile"
import { NotificationsBell } from "./notifications"

export function Header({
  user,
  userId,
}: {
  user: {
    name?: string | null
    email?: string | null
    image?: string | null
    studentId?: string | null
    course?: string | null
  }
  userId?: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <header className="flex h-14 items-center justify-between border-b px-4">
        <Input placeholder="Search..." className="hidden w-72 sm:block" />

        <div className="flex items-center gap-2">
          {userId && <NotificationsBell userId={userId} />}
          <Calendar className="h-6 w-6" onClick={() => setOpen(true)} />

          <ProfileMenu user={user} />
        </div>
      </header>
      <ViewSchedule open={open} onClose={() => setOpen(false)} />
    </>
  )
}
