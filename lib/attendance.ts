type AttendanceRecord = { present: boolean; date: Date }

export function calcAttendance(records: AttendanceRecord[]) {
  if (!records.length) return 0

  const present = records.filter((r) => r.present).length

  return Math.round((present / records.length) * 100)
}

export function calcMonthly(records: AttendanceRecord[]) {
  const grouped: Record<string, AttendanceRecord[]> = {}

  for (const r of records) {
    const key = `${r.date.getFullYear()}-${String(r.date.getMonth() + 1).padStart(2, "0")}`

    if (!grouped[key]) grouped[key] = []

    grouped[key].push(r)
  }

  return Object.fromEntries(
    Object.entries(grouped).map(([month, recs]) => [
      month,
      calcAttendance(recs),
    ])
  )
}

export function calcSubjectWise(
  records: {
    subjectId: string
    subjectName: string
    present: boolean
    date: Date
  }[]
) {
  const grouped: Record<string, AttendanceRecord[]> = {}

  for (const r of records) {
    if (!grouped[r.subjectId]) grouped[r.subjectId] = []

    grouped[r.subjectId].push({ present: r.present, date: r.date })
  }

  return Object.fromEntries(
    Object.entries(grouped).map(([id, recs]) => [
      id,

      {
        percentage: calcAttendance(recs),
        total: recs.length,
        present: recs.filter((r) => r.present).length,
      },
    ])
  )
}
