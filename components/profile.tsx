"use client"

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { signOut } from "next-auth/react"
import { User, Settings, LogOut, ChevronRight } from "lucide-react"

interface Props {
  user: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

export function ProfileMenu({ user }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="outline-none">
          <Avatar className="h-9 w-9">
            <AvatarImage src={user.image ?? ""} alt={user.name ?? ""} />
            <AvatarFallback>
              {user.name?.charAt(0)?.toUpperCase() ?? "U"}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-72 rounded-xl border bg-background p-2 shadow-sm"
      >
        <div className="flex items-center gap-3 rounded-lg p-3 transition hover:bg-muted/50">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.image || ""} />
            <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col overflow-hidden">
            <span className="truncate font-medium text-foreground">
              {user.name}
            </span>
            <span className="truncate text-xs text-muted-foreground">
              {user.email}
            </span>
          </div>
        </div>

        <div className="my-2 h-px bg-border" />

        <div className="space-y-1">
          <DropdownMenuItem className="group flex items-center justify-between rounded-md px-3 py-2 transition hover:bg-muted">
            <div className="flex items-center gap-2 text-foreground">
              <User className="h-4 w-4 opacity-70 group-hover:opacity-100" />
              View Profile
            </div>
            <ChevronRight className="h-4 w-4 opacity-40 transition group-hover:translate-x-1" />
          </DropdownMenuItem>

          <DropdownMenuItem className="group flex items-center justify-between rounded-md px-3 py-2 transition hover:bg-muted">
            <div className="flex items-center gap-2 text-foreground">
              <Settings className="h-4 w-4 opacity-70 group-hover:opacity-100" />
              Settings
            </div>
            <ChevronRight className="h-4 w-4 opacity-40 transition group-hover:translate-x-1" />
          </DropdownMenuItem>
        </div>

        <div className="my-2 h-px bg-border" />

        <DropdownMenuItem
          onClick={() => signOut()}
          className="flex items-center gap-2 rounded-md px-3 py-2 text-destructive transition hover:bg-destructive/10"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
