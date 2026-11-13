import { useEffect, useState } from "react"
import { farmLife } from "../data.ts"
import { goToView } from "../navigation.ts"
import type { FarmBlogPost } from "../types.ts"
import { secondaryButtonClass } from "../ui.ts"
import { FarmStoryCards } from "./FarmStoryCards.tsx"
import { FarmStoryDialog } from "./SiteDialogs.tsx"

export function FarmLife() {
  const [activePost, setActivePost] = useState<FarmBlogPost | null>(null)

  useEffect(() => {
    if (!activePost) return
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previous
    }
  }, [activePost])

  return (
    <section id="farm-life" className="scroll-mt-24 overflow-hidden bg-canvas px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14">
          <div>
            <p className="font-display text-xs font-semibold tracking-[0.2em] text-ochre-deep uppercase">
              {farmLife.eyebrow}
            </p>
            <h2 className="mt-3 max-w-xl font-display text-3xl font-bold tracking-wide text-ink uppercase sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
              {farmLife.title}
            </h2>
          </div>
          <p className="max-w-lg text-sm leading-relaxed text-muted sm:text-base lg:justify-self-end">{farmLife.text}</p>
        </div>

        <div className="mt-8">
          <button type="button" onClick={() => goToView("farm-life")} className={secondaryButtonClass}>
            All farm stories
          </button>
        </div>

        <div className="mt-10">
          <FarmStoryCards onReadMore={setActivePost} />
        </div>
      </div>

      <FarmStoryDialog open={activePost !== null} post={activePost} onClose={() => setActivePost(null)} />
    </section>
  )
}
