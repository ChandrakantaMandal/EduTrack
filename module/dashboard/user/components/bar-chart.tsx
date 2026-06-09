import { Card } from "@/components/ui/card"

const data = [72, 88, 82, 94, 85, 78]

export function MonthlyTrend() {
  return (
    <Card className="p-6">
      <h2 className="mb-4 font-semibold">Monthly Trend</h2>

      <div className="flex h-40 items-end gap-4">
        {data.map((v, i) => (
          <div key={i} className="h-full flex-1 rounded bg-muted">
            <div className="rounded bg-primary" style={{ height: `${v}%` }} />
          </div>
        ))}
      </div>
    </Card>
  )
}
