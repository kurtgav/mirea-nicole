import { useEffect, useState } from 'react'

export type TimeLeft = {
  days: number
  hours: number
  minutes: number
  seconds: number
  done: boolean
}

function compute(targetMs: number): TimeLeft {
  let diff = Math.max(0, targetMs - Date.now())
  const days = Math.floor(diff / 86400000)
  diff -= days * 86400000
  const hours = Math.floor(diff / 3600000)
  diff -= hours * 3600000
  const minutes = Math.floor(diff / 60000)
  diff -= minutes * 60000
  const seconds = Math.floor(diff / 1000)
  return { days, hours, minutes, seconds, done: targetMs - Date.now() <= 0 }
}

/** Ticks every second toward the given ISO date. */
export function useCountdown(iso: string): TimeLeft {
  const targetMs = new Date(iso).getTime()
  const [left, setLeft] = useState<TimeLeft>(() => compute(targetMs))

  useEffect(() => {
    const id = setInterval(() => setLeft(compute(targetMs)), 1000)
    return () => clearInterval(id)
  }, [targetMs])

  return left
}
