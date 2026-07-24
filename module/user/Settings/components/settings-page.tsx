"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Bell, Moon, Shield, User, Palette, Globe, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import {
  getUserProfile,
  updateUserProfile,
  getNotificationPreferences,
  updateNotificationPreferences,
} from "@/module/user/Settings/actions/actions"

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

export function SettingsPage({
  user,
}: {
  user: {
    id?: string
    name?: string | null
    email?: string | null
    image?: string | null
  }
}) {
  const [activeSection, setActiveSection] = useState("appearance")
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    email: true,
    push: false,
    digest: true,
  })
  const [profile, setProfile] = useState<{
    name: string | null
    email: string | null
    studentId: string | null
    course: string | null
    section: string | null
    practicalGroup: string | null
    image: string | null
  } | null>(null)
  const [rollNo, setRollNo] = useState("")
  const [course, setCourse] = useState("")
  const [section, setSection] = useState("")
  const [practicalGroup, setPracticalGroup] = useState("")
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [notifSaving, setNotifSaving] = useState(false)
  const [notifSaved, setNotifSaved] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    if (user.id) {
      getUserProfile(user.id).then((p) => {
        setProfile(p)
        setRollNo(p?.studentId ?? "")
        setCourse(p?.course ?? "")
        setSection(p?.section ?? "")
        setPracticalGroup(p?.practicalGroup ?? "")
      })
      getNotificationPreferences(user.id).then((prefs) => {
        if (prefs) setToggles(prefs)
      })
    }
  }, [user.id])

  async function handleSave() {
    if (!user.id) return
    setSaving(true)
    await updateUserProfile(user.id, {
      studentId: rollNo || undefined,
      course: course || undefined,
      section: section || undefined,
      practicalGroup: practicalGroup || undefined,
    })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  async function toggle(key: string) {
    const next = { ...toggles, [key]: !toggles[key] }
    setToggles(next)
    setNotifSaving(true)
    if (user.id) await updateNotificationPreferences(user.id, next)
    setNotifSaving(false)
    setNotifSaved(true)
    setTimeout(() => setNotifSaved(false), 2000)
  }

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
  ]

  const initial = user.name?.charAt(0)?.toUpperCase() ?? "U"

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
              <Card>
                <CardContent className="p-5">
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
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === "notifications" && (
            <div className="space-y-3">
              {toggleItems.map((t) => (
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
              {notifSaving && (
                <p className="text-xs text-muted-foreground">Saving...</p>
              )}
              {notifSaved && (
                <p className="text-xs text-green-600 dark:text-green-400">
                  Preferences saved!
                </p>
              )}
            </div>
          )}

          {activeSection === "profile" && (
            <Card>
              <CardContent className="space-y-5 p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary">
                    {initial}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      {profile?.name ?? user.name ?? "User"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {profile?.email ?? user.email ?? ""}
                    </p>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profile?.name ?? user.name ?? ""}
                    readOnly
                    className="mt-1 w-full rounded-xl border bg-card px-4 py-2.5 text-sm text-foreground transition outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground">
                    Email
                  </label>
                  <input
                    type="text"
                    value={profile?.email ?? user.email ?? ""}
                    readOnly
                    className="mt-1 w-full rounded-xl border bg-card px-4 py-2.5 text-sm text-foreground transition outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground">
                    Roll No
                  </label>
                  <input
                    type="text"
                    value={rollNo}
                    onChange={(e) => setRollNo(e.target.value)}
                    className="mt-1 w-full rounded-xl border bg-card px-4 py-2.5 text-sm text-foreground transition outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground">
                    Course
                  </label>
                  <input
                    type="text"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    className="mt-1 w-full rounded-xl border bg-card px-4 py-2.5 text-sm text-foreground transition outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground">
                    Section
                  </label>
                  <input
                    type="text"
                    value={section}
                    onChange={(e) => setSection(e.target.value)}
                    className="mt-1 w-full rounded-xl border bg-card px-4 py-2.5 text-sm text-foreground transition outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground">
                    Practical Group
                  </label>
                  <input
                    type="text"
                    value={practicalGroup}
                    onChange={(e) => setPracticalGroup(e.target.value)}
                    placeholder="Optional"
                    className="mt-1 w-full rounded-xl border bg-card px-4 py-2.5 text-sm text-foreground transition outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="rounded-xl bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition hover:opacity-90 disabled:opacity-50"
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                  {saved && (
                    <span className="text-xs text-green-600 dark:text-green-400">
                      Saved!
                    </span>
                  )}
                </div>
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
