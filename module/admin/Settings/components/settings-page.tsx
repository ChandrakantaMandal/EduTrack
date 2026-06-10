"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Bell,
  Shield,
  Globe,
  Palette,
  Users,
  Building,
  Sun,
  Moon,
} from "lucide-react"
import { useTheme } from "next-themes"

const sections = [
  {
    id: "general",
    icon: Building,
    label: "General",
    desc: "Institution name, branding",
  },
  {
    id: "users",
    icon: Users,
    label: "User Management",
    desc: "Roles, permissions, invites",
  },
  {
    id: "appearance",
    icon: Palette,
    label: "Appearance",
    desc: "Theme and layout",
  },
  {
    id: "notifications",
    icon: Bell,
    label: "Notifications",
    desc: "System alerts and emails",
  },
  {
    id: "privacy",
    icon: Shield,
    label: "Privacy",
    desc: "Data and security settings",
  },
  {
    id: "regional",
    icon: Globe,
    label: "Regional",
    desc: "Language and timezone",
  },
]

export function SettingsPage() {
  const [active, setActive] = useState("general")
  const { theme, setTheme } = useTheme()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          Settings
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Configure institution-wide settings
        </p>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="shrink-0 space-y-1 lg:w-56">
          {sections.map((s) => {
            const Icon = s.icon
            return (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition ${
                  active === s.id
                    ? "bg-primary/10 font-medium text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <div className="min-w-0">
                  <span className="block">{s.label}</span>
                  <span className="block text-xs font-normal text-muted-foreground">
                    {s.desc}
                  </span>
                </div>
              </button>
            )
          })}
        </div>

        <div className="max-w-2xl flex-1 space-y-5">
          {active === "general" && (
            <Card>
              <CardContent className="space-y-4 p-5">
                {["Institution Name", "Short Code", "Website"].map((f) => (
                  <div key={f}>
                    <label className="text-xs font-medium text-foreground">
                      {f}
                    </label>
                    <input
                      type="text"
                      defaultValue={
                        f === "Institution Name"
                          ? "University of EduTrack"
                          : f === "Short Code"
                            ? "UET"
                            : "https://edutrack.edu"
                      }
                      className="mt-1 w-full rounded-xl border bg-card px-4 py-2.5 text-sm text-foreground transition outline-none focus:ring-2 focus:ring-primary/20"
                      readOnly
                    />
                  </div>
                ))}
                <button className="rounded-xl bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition hover:opacity-90">
                  Save Changes
                </button>
              </CardContent>
            </Card>
          )}

          {active === "notifications" && (
            <Card>
              <CardContent className="space-y-4 p-5">
                {[
                  {
                    label: "Attendance alerts",
                    desc: "Notify when class attendance drops below 75%",
                  },
                  {
                    label: "Weekly digest",
                    desc: "Send institution-wide summary every Monday",
                  },
                  {
                    label: "Registration confirmations",
                    desc: "Email confirmation on new enrollment",
                  },
                ].map((n, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between border-b py-2 last:border-0"
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {n.label}
                      </p>
                      <p className="text-xs text-muted-foreground">{n.desc}</p>
                    </div>
                    <div className="relative h-6 w-11 cursor-pointer rounded-full bg-primary">
                      <span className="absolute top-0.5 right-0.5 h-5 w-5 rounded-full bg-white shadow-sm" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {active === "appearance" && (
            <Card>
              <CardContent className="space-y-4 p-5">
                <div>
                  <label className="text-xs font-medium text-foreground">
                    Theme
                  </label>
                  <div className="mt-2 flex gap-3">
                    <button
                      onClick={() => setTheme("light")}
                      className={`flex flex-1 items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm transition ${
                        theme === "light"
                          ? "border-primary bg-primary/10 font-medium text-primary"
                          : "border-muted text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      <Sun className="h-4 w-4" /> Light
                    </button>
                    <button
                      onClick={() => setTheme("dark")}
                      className={`flex flex-1 items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm transition ${
                        theme === "dark"
                          ? "border-primary bg-primary/10 font-medium text-primary"
                          : "border-muted text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      <Moon className="h-4 w-4" /> Dark
                    </button>
                    <button
                      onClick={() => setTheme("system")}
                      className={`flex flex-1 items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm transition ${
                        theme === "system"
                          ? "border-primary bg-primary/10 font-medium text-primary"
                          : "border-muted text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      <Globe className="h-4 w-4" /> System
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {active !== "general" &&
            active !== "notifications" &&
            active !== "appearance" && (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-sm text-muted-foreground">
                    {sections.find((s) => s.id === active)?.desc} settings
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Coming soon
                  </p>
                </CardContent>
              </Card>
            )}
        </div>
      </div>
    </div>
  )
}
