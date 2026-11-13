import { storyPage } from "../data.ts"
import { goToView } from "../navigation.ts"
import { primaryButtonClass, secondaryButtonClass } from "../ui.ts"

export function StoryPage() {
  return (
    <section id="story-page" className="bg-canvas px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <header className="mx-auto max-w-3xl text-center">
          <p className="font-display text-xs font-semibold tracking-[0.2em] text-ochre uppercase">
            {storyPage.eyebrow}
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-wide text-ink uppercase sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
            {storyPage.title}
          </h1>
          <p className="mt-5 text-sm leading-relaxed text-muted sm:text-base">{storyPage.lead}</p>
        </header>

        <div className="mt-14 space-y-16 lg:mt-20 lg:space-y-24">
          {storyPage.sections.map((section, index) => {
            const reverse = index % 2 === 1
            return (
              <article
                key={section.id}
                className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-14 ${
                  reverse ? "lg:[&>figure]:order-2" : ""
                }`}
              >
                <figure className="overflow-hidden rounded-[1.75rem] shadow-md">
                  <img
                    src={section.image.src}
                    alt={section.image.alt}
                    loading="lazy"
                    className="aspect-[4/3] h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-700 hover:scale-[1.03]"
                  />
                </figure>
                <div className={reverse ? "lg:pr-4" : "lg:pl-4"}>
                  <h2 className="font-display text-2xl font-bold tracking-wide text-ink uppercase sm:text-3xl">
                    {section.title}
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-ink/80 sm:text-[15px]">{section.text}</p>
                </div>
              </article>
            )
          })}
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-3 border-t border-line pt-12 lg:mt-24">
          <button type="button" onClick={() => goToView("about")} className={secondaryButtonClass}>
            About us
          </button>
          <button type="button" onClick={() => goToView("contact")} className={primaryButtonClass}>
            Visit the farm
          </button>
        </div>
      </div>
    </section>
  )
}
