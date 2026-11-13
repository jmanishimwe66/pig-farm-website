import { useEffect, useState } from "react"

const SECTION_IDS = ["home", "about", "services", "shop", "farm-life", "contact"]

export function useActiveSection() {
  const [active, setActive] = useState("home")

  useEffect(() => {
    const nodes = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (node): node is HTMLElement => node !== null,
    )
    if (nodes.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (visible.length === 0) return
        visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        const id = visible[0]?.target.id
        if (id) setActive(id)
      },
      { rootMargin: "-22% 0px -50% 0px", threshold: [0, 0.15, 0.35] },
    )

    for (const node of nodes) observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return active
}

export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previous
    }
  }, [locked])
}
