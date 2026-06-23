import { useEffect, useState } from 'react'

/** Returns the id of the section currently dominating the viewport. */
export function useScrollSpy(ids: readonly string[], offset = 0.4): string {
  const [active, setActive] = useState<string>(ids[0] ?? '')

  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))
    if (!els.length) return

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: `-${offset * 100}% 0px -${(1 - offset) * 100}% 0px`, threshold: 0 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [ids, offset])

  return active
}
