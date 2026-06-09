"use client"

import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  BookOpen,
  BarChart3,
  Settings,
  Shield,
  Calendar,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const items = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" },
  { name: "Users", icon: Users, href: "/admin/users" },
  { name: "Subjects", icon: BookOpen, href: "/admin/subjects" },
  { name: "Reports", icon: BarChart3, href: "/admin/reports" },
  { name: "Schedule", icon: Calendar, href: "/admin/schedule" },
  { name: "Settings", icon: Settings, href: "/admin/settings" },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col p-6">
      <Link href="/admin/dashboard">
        <div className="mb-10">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-bold text-primary">EduTrack</h1>
          </div>
          <p className="ml-7 text-sm text-muted-foreground">Admin Panel</p>
        </div>
      </Link>

      <nav className="flex-1 space-y-2">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-4 py-3 transition",
                isActive
                  ? "bg-primary/10 font-semibold text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
