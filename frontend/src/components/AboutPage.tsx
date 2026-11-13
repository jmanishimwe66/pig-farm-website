import ArrowRight from "lucide-react/icons/arrow-right"
import { aboutPage, shopCategories } from "../data.ts"
import { goToView, navigateHref } from "../navigation.ts"
import { primaryButtonClass, secondaryButtonClass } from "../ui.ts"

export function AboutPage() {
  return (
    <div id="about-page" className="bg-surface">
      {/* Intro — title left, story copy right; twin photos below */}
      <section className="flex w-full flex-col bg-canvas">
        <div className="mx-auto flex min-h-[calc(100dvh-4.5rem)] w-full max-w-7xl items-center px-4 py-16 sm:min-h-[calc(100dvh-5rem)] sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="grid w-full items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] lg:gap-20 xl:gap-28">
            <h1 className="font-display text-4xl font-bold tracking-tight text-brand sm:text-5xl lg:text-[3.5rem] lg:leading-[1.1]">
              {aboutPage.heroTitle}
            </h1>
            <div className="space-y-6 sm:space-y-8">
              {aboutPage.heroParagraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="max-w-xl text-base leading-[1.75] text-brand sm:text-lg sm:leading-[1.8]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto grid w-full max-w-7xl shrink-0 grid-cols-2 gap-0 px-4 pb-0 sm:px-6 lg:px-8">
          {aboutPage.heroImages.map((image) => (
            <figure key={image.src} className="h-[80vh] overflow-hidden">
              <img src={image.src} alt={image.alt} className="h-full w-full object-cover" />
            </figure>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="w-full bg-canvas">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <dl className="grid gap-6 border-t border-line/80 pt-10 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
            {aboutPage.stats.map((stat) => (
              <div key={stat.value} className="motion-safe:animate-[rise_0.5s_ease-out_both]">
                <dt className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">{stat.value}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Expertise — text left, image right; tops aligned */}
      <section className="px-4 pt-10 pb-16 sm:px-6 sm:pt-12 sm:pb-20 lg:px-8 lg:pt-14 lg:pb-24">
        <div className="mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl lg:text-[2.35rem] lg:leading-tight">
              {aboutPage.expertise.title}
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted sm:text-base">{aboutPage.expertise.text}</p>
            <ul className="mt-6 space-y-2.5">
              {aboutPage.improvements.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink/80">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ochre" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => goToView("contact")}
              className={`${primaryButtonClass} mt-8 gap-2`}
            >
              Visit the farm
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
          <figure className="overflow-hidden">
            <img
              src={aboutPage.expertise.image.src}
              alt={aboutPage.expertise.image.alt}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover motion-safe:transition-transform motion-safe:duration-700 hover:scale-[1.03] sm:aspect-[5/6]"
            />
          </figure>
        </div>
      </section>

      {/* Offerings — stacked category rows */}
      <section className="bg-canvas px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <figure className="order-2 overflow-hidden lg:order-1">
            <img
              src={aboutPage.offerings.image.src}
              alt={aboutPage.offerings.image.alt}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover motion-safe:transition-transform motion-safe:duration-700 hover:scale-[1.03] sm:aspect-[5/6]"
            />
          </figure>
          <div className="order-1 lg:order-2">
            <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl lg:text-[2.35rem] lg:leading-tight">
              {aboutPage.offerings.title}
            </h2>
            <ul className="mt-8 divide-y divide-line border-y border-line">
              {shopCategories.map((category, index) => (
                <li key={category.id}>
                  <a
                    href={category.href}
                    onClick={(event) => {
                      event.preventDefault()
                      navigateHref(category.href)
                    }}
                    className="group flex items-start gap-4 py-5 transition duration-300 hover:bg-surface/70 sm:gap-5 sm:py-6"
                  >
                    <span className="font-display text-sm font-bold tabular-nums text-ochre">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-3">
                        <span className="font-display text-base font-bold tracking-wide text-ink uppercase transition group-hover:text-brand sm:text-lg">
                          {category.label}
                        </span>
                        <ArrowRight
                          className="h-4 w-4 shrink-0 text-muted transition duration-300 group-hover:translate-x-0.5 group-hover:text-brand"
                          aria-hidden="true"
                        />
                      </span>
                      <span className="mt-1.5 block text-sm leading-relaxed text-muted">{category.description}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => goToView("shop")}
              className={`${secondaryButtonClass} mt-8 gap-2`}
            >
              Open the shop
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

    </div>
  )
}
