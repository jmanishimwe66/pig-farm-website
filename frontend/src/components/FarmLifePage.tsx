import { useEffect, useState } from "react"
import { farmLife } from "../data.ts"
import type { FarmBlogPost } from "../types.ts"
import { FarmStoryCards } from "./FarmStoryCards.tsx"
import { FarmStoryDialog } from "./SiteDialogs.tsx"

export function FarmLifePage() {
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
    <div id="farm-life-page" className="bg-canvas">
      <section className="w-full">
        <div className="mx-auto flex min-h-[calc(100dvh-4.5rem)] w-full max-w-7xl items-center px-4 py-16 sm:min-h-[calc(100dvh-5rem)] sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="grid w-full items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] lg:gap-20 xl:gap-28">
            <h1 className="font-display text-4xl font-bold tracking-tight text-brand sm:text-5xl lg:text-[3.5rem] lg:leading-[1.1]">
              Farm life
            </h1>
            <div className="space-y-6 sm:space-y-8">
              <p className="max-w-xl text-base leading-[1.75] text-brand sm:text-lg sm:leading-[1.8]">
                {farmLife.text}
              </p>
              <p className="max-w-xl text-base leading-[1.75] text-brand sm:text-lg sm:leading-[1.8]">
                These farm stories share how we started, how we are improving the pens and water, and how pigs and crops
                will work together on our five hectares in Rugerero.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-canvas px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <FarmStoryCards onReadMore={setActivePost} />
        </div>
      </section>

      <FarmStoryDialog open={activePost !== null} post={activePost} onClose={() => setActivePost(null)} />
    </div>
  )
}
