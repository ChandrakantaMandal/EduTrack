"use client"

import { useEffect, useState } from "react"

export function ServiceWorkerRegister() {
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null)

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").then((reg) => {
        reg.addEventListener("updatefound", () => {
          const newWorker = reg.installing
          if (newWorker) {
            newWorker.addEventListener("statechange", () => {
              if (
                newWorker.state === "installed" &&
                navigator.serviceWorker.controller
              ) {
                setWaitingWorker(newWorker)
              }
            })
          }
        })
      })
    }
  }, [])

  function update() {
    if (waitingWorker) {
      waitingWorker.postMessage({ type: "SKIP_WAITING" })
      window.location.reload()
    }
  }

  if (!waitingWorker) return null

  return (
    <div className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-lg border bg-card px-4 py-3 shadow-lg">
      <p className="text-sm text-foreground">A new version is available!</p>
      <button
        onClick={update}
        className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90"
      >
        Reload
      </button>
    </div>
  )
}
