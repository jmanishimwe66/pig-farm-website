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
    <section
      id="farm-life"
      className="scroll-mt-24 flex h-[100dvh] max-h-[100dvh] flex-col overflow-hidden bg-canvas px-4 py-6 sm:px-6 sm:py-7 lg:px-8 lg:py-8"
    >
      <div className="mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col">
        <div className="flex shrink-0 flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-display text-[11px] font-semibold tracking-[0.2em] text-ochre-deep uppercase">
              {farmLife.eyebrow}
            </p>
            <h2 className="mt-2 max-w-xl font-display text-2xl font-bold tracking-wide text-ink uppercase sm:text-3xl lg:leading-tight">
              {farmLife.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => goToView("farm-life")}
            className={`${secondaryButtonClass} shrink-0 px-5 py-2.5 sm:self-end`}
          >
            All farm stories
          </button>
        </div>

        <div className="mt-10 flex min-h-0 flex-1 flex-col sm:mt-12 lg:mt-14">
          <FarmStoryCards compact onReadMore={setActivePost} />
        </div>
      </div>

      <FarmStoryDialog open={activePost !== null} post={activePost} onClose={() => setActivePost(null)} />
    </section>
  )
}
