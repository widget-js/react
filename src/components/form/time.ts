function padTimeSegment(value: number) {
  return `${value}`.padStart(2, '0')
}

export function formatTimeValue(date: Date | undefined, withSeconds: boolean) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    return ''
  }

  const hour = padTimeSegment(date.getHours())
  const minute = padTimeSegment(date.getMinutes())
  if (!withSeconds) {
    return `${hour}:${minute}`
  }

  const second = padTimeSegment(date.getSeconds())
  return `${hour}:${minute}:${second}`
}

export function parseTimeValue(rawValue: string, reference?: Date) {
  if (!rawValue) {
    return undefined
  }

  const segments = rawValue.split(':').map(Number)
  const [hours, minutes, seconds = 0] = segments
  if (segments.some(Number.isNaN)) {
    return undefined
  }

  const base = reference instanceof Date && !Number.isNaN(reference.getTime())
    ? new Date(reference)
    : new Date()

  base.setHours(hours ?? 0, minutes ?? 0, seconds ?? 0, 0)
  return base
}
