import ArrowUpRight from "lucide-react/icons/arrow-up-right"
import { impactTiles } from "../data.ts"
import { isAppRoute, navigateHref } from "../navigation.ts"

export function ImpactStrip() {
  return (
    <section aria-label="Farm impact highlights" className="bg-canvas px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {impactTiles.map((tile) => {
          if (tile.kind === "image") {
            return (
              <div
                key={tile.id}
                className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] shadow-sm sm:aspect-auto sm:min-h-[22rem]"
              >
                <img
                  src={tile.image}
                  alt={tile.alt}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            )
          }

          const toneClass =
            tile.tone === "gold" ? "bg-ochre text-ink" : "bg-cream text-ink"

          return (
            <a
              key={tile.id}
              href={tile.href}
              onClick={(event) => {
                if (tile.href.startsWith("/#")) {
                  event.preventDefault()
                  const sectionId = tile.href.slice(2)
                  navigateHref("/")
                  window.setTimeout(() => {
                    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" })
                  }, 50)
                  return
                }
                if (!isAppRoute(tile.href)) return
                event.preventDefault()
                navigateHref(tile.href)
              }}
              className={`group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-[1.5rem] p-6 shadow-sm transition duration-300 hover:-translate-y-0.5 sm:aspect-auto sm:min-h-[22rem] sm:p-7 ${toneClass}`}
            >
              <span className="absolute top-5 right-5 grid h-10 w-10 place-items-center rounded-full bg-ink text-white transition duration-300 group-hover:bg-brand">
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </span>
              {tile.value ? (
                <p className="font-display text-5xl font-bold tracking-tight sm:text-6xl">{tile.value}</p>
              ) : null}
              <p className={`font-display font-bold tracking-wide uppercase sm:text-xl ${tile.value ? "mt-3 text-lg" : "text-lg sm:text-xl"}`}>
                {tile.label}
              </p>
              {tile.text ? <p className="mt-3 text-sm leading-relaxed text-ink/75">{tile.text}</p> : null}
              {tile.items ? (
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink/80">
                  {tile.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
              {tile.ctaLabel ? (
                <span className="mt-4 inline-block text-sm font-semibold text-brand underline underline-offset-[3px] decoration-brand/60 group-hover:decoration-brand">
                  {tile.ctaLabel}
                </span>
              ) : null}
            </a>
          )
        })}
      </div>
    </section>
  )
}
