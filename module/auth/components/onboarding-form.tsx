"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

type Props = {
  userId: string
  name: string
  email: string
}

export function OnboardingForm({ userId, name, email }: Props) {
  const router = useRouter()
  const [studentId, setStudentId] = useState("")
  const [section, setSection] = useState("")
  const [practicalGroup, setPracticalGroup] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    if (!studentId.trim()) {
      setError("Roll number is required")
      return
    }
    if (!section.trim()) {
      setError("Section is required")
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          studentId: studentId.trim(),
          section: section.trim(),
          practicalGroup: practicalGroup.trim(),
        }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Something went wrong")
      }
      router.push("/dashboard")
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md space-y-6 rounded-xl border bg-card p-8 shadow-lg">
      <div className="space-y-1 text-center">
        <h1 className="text-2xl font-bold">Welcome!</h1>
        <p className="text-sm text-muted-foreground">
          Set up your profile to get started
        </p>
      </div>

      <div className="rounded-lg bg-muted p-3 text-sm">
        <p className="font-medium">{name}</p>
        <p className="text-muted-foreground">{email}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="studentId" className="text-sm font-medium">
            Roll Number
          </label>
          <input
            id="studentId"
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
            placeholder="e.g. 22123456"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="section" className="text-sm font-medium">
            Section
          </label>
          <input
            id="section"
            type="text"
            value={section}
            onChange={(e) => setSection(e.target.value)}
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
            placeholder="e.g. A"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="practicalGroup" className="text-sm font-medium">
            Practical Group{" "}
            <span className="text-muted-foreground">(optional)</span>
          </label>
          <input
            id="practicalGroup"
            type="text"
            value={practicalGroup}
            onChange={(e) => setPracticalGroup(e.target.value)}
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
            placeholder="e.g. G1"
          />
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Continue"}
        </button>
      </form>
    </div>
  )
}
