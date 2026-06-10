"use client"

import { cn } from "@/lib/utils"
import { BarChart3, BookOpen, LayoutDashboard, Settings } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const items = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { name: "Subjects", icon: BookOpen, href: "/dashboard/subjects" },
  { name: "Reports", icon: BarChart3, href: "/dashboard/reports" },
  { name: "Settings", icon: Settings, href: "/dashboard/settings" },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col p-6">
      {/* Logo */}
      <Link href="/dashboard">
        <div className="mb-10">
          <h1 className="text-xl font-bold text-primary">EduTrack</h1>
          <p className="hidden text-sm text-muted-foreground sm:block">
            Student Portal
          </p>
        </div>
      </Link>

      {/* Nav */}
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
                  ? "bg-muted font-semibold text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span className="hidden sm:inline">{item.name}</span>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
    </div>
  )
}
