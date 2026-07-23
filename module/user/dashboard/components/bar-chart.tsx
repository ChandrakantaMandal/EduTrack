import { Card } from "@/components/ui/card"

const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]

export function MonthlyTrend({ data }: { data: Record<string, number> }) {
  const entries = Object.entries(data).slice(-6)
  const values = entries.map(([, v]) => v)

  return (
    <Card className="p-6">
      <h2 className="mb-4 font-semibold">Monthly Trend</h2>

      <div className="flex h-40 items-end gap-2 sm:gap-4">
        {values.length > 0 ? (
          values.map((v, i) => (
            <div
              key={i}
              className="flex h-full flex-1 flex-col items-center justify-end"
            >
              <div
                className="w-full rounded bg-primary transition-all"
                style={{ height: `${Math.max(v, 4)}%` }}
              />
              <span className="mt-1 text-[10px] text-muted-foreground">
                {labels[i] ?? entries[i][0]}
              </span>
            </div>
          ))
        ) : (
          <p className="w-full py-8 text-center text-sm text-muted-foreground">
            No data yet
          </p>
        )}
      </div>
    </Card>
  )
}
