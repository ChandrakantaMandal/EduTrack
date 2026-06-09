"use client"

import { Input } from "@/components/ui/input"
import { ProfileMenu } from "./profile"
import { ViewSchedule } from "@/components/schedule"

interface Props {
  user: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

export function Header({ user }: Props) {
  return (
    <header className="flex h-14 items-center justify-between border-b bg-background/80 px-4 backdrop-blur lg:h-16 lg:px-6">
      <Input
        placeholder="Search..."
        className="hidden w-48 sm:block lg:w-72 xl:w-96"
      />
      <div className="flex items-center gap-2">
        <div className="hidden lg:block">
          <ViewSchedule compact />
        </div>
        <ProfileMenu user={user} />
      </div>
    </header>
  )
}
