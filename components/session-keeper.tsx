"use client"

import { useEffect } from "react"

const STORAGE_KEY = "next-auth-token"

export function SessionKeeper() {
  useEffect(() => {
    async function keep() {
      const res = await fetch("/api/auth/token")
      if (res.ok) {
        const { token } = await res.json()
        localStorage.setItem(STORAGE_KEY, token)
        return
      }

      const stored = localStorage.getItem(STORAGE_KEY)
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
