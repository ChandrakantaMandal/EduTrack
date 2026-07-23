import { Card } from "@/components/ui/card"

export function AttendanceCard({ value }: { value: number }) {
  return (
    <Card className="flex flex-col items-center p-6">
      <h2 className="mb-4 w-full font-semibold">Overall Attendance</h2>

      <CircularProgress value={value} />
    </Card>
  )
}

interface Props {
  value: number
}

export function CircularProgress({ value }: Props) {
  const radius = 40
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (value / 100) * circumference

  return (
    <div className="relative h-36 w-36 sm:h-40 sm:w-40">
      <svg viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r={radius}
          strokeWidth="10"
          className="fill-none stroke-muted"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="fill-none stroke-primary transition-all duration-500"
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-primary">{value}%</span>
        <span className="text-xs text-muted-foreground">Avg. Attendance</span>
      </div>
    </div>
  )
}
