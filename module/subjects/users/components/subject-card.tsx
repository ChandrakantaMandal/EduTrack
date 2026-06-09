import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Props {
  title: string
  professor: string
  percent: number
}

export function SubjectCard({ title, professor, percent }: Props) {
  return (
    <Card className="transition hover:shadow-md">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <p className="text-sm text-muted-foreground">{professor}</p>
      </CardHeader>

      <CardContent>
        <div className="mb-2 flex justify-between text-sm">
          <span>Attendance</span>
          <span className="font-semibold text-primary">{percent}%</span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-muted">
          <div className="h-full bg-primary" style={{ width: `${percent}%` }} />
        </div>
      </CardContent>
    </Card>
  )
}
