"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Bell, Moon, Shield, User, Palette, Globe } from "lucide-react"
import { useState } from "react"

const sections = [
  {
    id: "profile",
    icon: User,
    label: "Profile",
    desc: "Manage your personal information",
  },
  {
    id: "appearance",
    icon: Palette,
    label: "Appearance",
    desc: "Customize your theme and layout",
  },
  {
    id: "notifications",
    icon: Bell,
    label: "Notifications",
    desc: "Configure alert preferences",
  },
  {
    id: "privacy",
    icon: Shield,
    label: "Privacy & Security",
    desc: "Control your data and privacy settings",
  },
  {
    id: "language",
    icon: Globe,
    label: "Language & Region",
    desc: "Set your preferred language and timezone",
  },
]

const toggleItems = [
  {
    label: "Email notifications",
    desc: "Receive attendance alerts via email",
    key: "email",
  },
  {
    label: "Push notifications",
    desc: "Get push notifications on your device",
    key: "push",
  },
  {
    label: "Weekly digest",
    desc: "Receive a weekly summary every Monday",
    key: "digest",
  },
  {
    label: "Dark mode",
    desc: "Use dark theme across the platform",
    key: "dark",
  },
]

export function SettingsPage() {
  const [activeSection, setActiveSection] = useState("appearance")
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    email: true,
    push: false,
    digest: true,
    dark: false,
  })

  const toggle = (key: string) =>
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }))

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Settings
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your account and preferences
        </p>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="shrink-0 space-y-1 lg:w-64">
          {sections.map((s) => {
            const Icon = s.icon
            return (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition ${
                  activeSection === s.id
                    ? "bg-primary/10 font-medium text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{s.label}</span>
              </button>
            )
          })}
        </div>

        <div className="max-w-2xl flex-1 space-y-6">
          {activeSection === "appearance" && (
            <div className="space-y-4">
              {toggleItems
                .filter((t) => t.key === "dark")
                .map((t) => (
                  <Card key={t.key}>
                    <CardContent className="flex items-center justify-between p-5">
                      <div className="flex items-center gap-3">
                        <Moon className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {t.label}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {t.desc}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => toggle(t.key)}
                        className={`relative h-6 w-11 rounded-full transition ${
                          toggles[t.key] ? "bg-primary" : "bg-muted"
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition ${
                            toggles[t.key] ? "translate-x-5" : ""
                          }`}
                        />
                      </button>
                    </CardContent>
                  </Card>
                ))}

              <p className="px-1 text-xs text-muted-foreground">
                More appearance options coming soon.
              </p>
            </div>
          )}

          {activeSection === "notifications" && (
            <div className="space-y-3">
              {toggleItems
                .filter((t) => t.key !== "dark")
                .map((t) => (
                  <Card key={t.key}>
                    <CardContent className="flex items-center justify-between p-5">
                      <div className="flex items-center gap-3">
                        <Bell className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {t.label}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {t.desc}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => toggle(t.key)}
                        className={`relative h-6 w-11 rounded-full transition ${
                          toggles[t.key] ? "bg-primary" : "bg-muted"
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition ${
                            toggles[t.key] ? "translate-x-5" : ""
                          }`}
                        />
                      </button>
                    </CardContent>
                  </Card>
                ))}
            </div>
          )}

          {activeSection === "profile" && (
            <Card>
              <CardContent className="space-y-5 p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary">
                    U
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">User Name</p>
                    <p className="text-xs text-muted-foreground">
                      user@example.com
                    </p>
                  </div>
                </div>
                {["Full Name", "Email", "Student ID"].map((field) => (
                  <div key={field}>
                    <label className="text-xs font-medium text-foreground">
                      {field}
                    </label>
                    <input
                      type="text"
                      defaultValue={
                        field === "Full Name"
                          ? "User Name"
                          : field === "Email"
                            ? "user@example.com"
                            : "STU-2024-001"
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

          {activeSection === "privacy" && (
            <Card>
              <CardContent className="space-y-4 p-6">
                <p className="text-sm text-foreground">
                  Your data is stored securely and never shared with third
                  parties.
                </p>
                {["Data Export", "Delete Account"].map((action) => (
                  <button
                    key={action}
                    className={`w-full rounded-xl border px-4 py-3 text-left text-sm transition ${
                      action === "Delete Account"
                        ? "border-red-200 text-red-600 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-950"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    {action}
                  </button>
                ))}
              </CardContent>
            </Card>
          )}

          {activeSection === "language" && (
            <Card>
              <CardContent className="space-y-5 p-6">
                {["Language", "Timezone"].map((field) => (
                  <div key={field}>
                    <label className="text-xs font-medium text-foreground">
                      {field}
                    </label>
                    <select className="mt-1 w-full rounded-xl border bg-card px-4 py-2.5 text-sm text-foreground transition outline-none focus:ring-2 focus:ring-primary/20">
                      <option>
                        {field === "Language" ? "English" : "UTC+8 (Singapore)"}
                      </option>
                    </select>
                  </div>
                ))}
                <button className="rounded-xl bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition hover:opacity-90">
                  Save Preferences
                </button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
