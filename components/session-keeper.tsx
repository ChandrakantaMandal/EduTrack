"use client"

import { useEffect } from "react"

const STORAGE_KEY = "next-auth-token"

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open("SessionKeeper", 1)
    req.onupgradeneeded = () => req.result.createObjectStore("tokens")
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

async function getStored(): Promise<string | null> {
  const local = localStorage.getItem(STORAGE_KEY)
  if (local) return local
  try {
    const db = await openDB()
    return new Promise((resolve) => {
      const tx = db.transaction("tokens", "readonly")
      const req = tx.objectStore("tokens").get(STORAGE_KEY)
      req.onsuccess = () => resolve(req.result ?? null)
      req.onerror = () => resolve(null)
    })
  } catch {
    return null
  }
}

async function setStored(token: string): Promise<void> {
  localStorage.setItem(STORAGE_KEY, token)
  try {
    const db = await openDB()
    const tx = db.transaction("tokens", "readwrite")
    tx.objectStore("tokens").put(token, STORAGE_KEY)
  } catch {}
}

export function SessionKeeper() {
  useEffect(() => {
    async function keep() {
      const stored = await getStored()
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      }
      if (stored) headers["Authorization"] = `Bearer ${stored}`

      const res = await fetch("/api/auth/token", { headers })

      if (res.ok) {
        const { token } = await res.json()
        await setStored(token)
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
