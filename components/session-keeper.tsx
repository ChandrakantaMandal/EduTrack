"use client"

import { useEffect } from "react"

const STORAGE_KEY = "next-auth-token"

export function SessionKeeper() {
  useEffect(() => {
    async function keep() {
      const stored = localStorage.getItem(STORAGE_KEY)
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      }
      if (stored) headers["Authorization"] = `Bearer ${stored}`

      const res = await fetch("/api/auth/token", { headers })

      if (res.ok) {
        const { token } = await res.json()
        localStorage.setItem(STORAGE_KEY, token)
        await fetch("/api/auth/restore", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        })
        return
      }

      if (!stored) return

      const restoreRes = await fetch("/api/auth/restore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: stored }),
      })

      if (restoreRes.ok) {
        window.location.reload()
      }
    }
    keep()
  }, [])

  return null
}
