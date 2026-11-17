import ArrowUpRight from "lucide-react/icons/arrow-up-right"
import { serviceCards, servicesHeading } from "../data.ts"
import { navigateHref } from "../navigation.ts"
import { primaryButtonClass } from "../ui.ts"

type ServicesOccasionsGridProps = {
  onBrowseAll: () => void
}

export function ServicesOccasionsGrid({ onBrowseAll }: ServicesOccasionsGridProps) {
  return (
    <section id="services" className="scroll-mt-24 bg-brand-deep px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-2xl leading-snug font-bold tracking-wide text-white uppercase sm:text-3xl lg:text-[2.75rem] lg:leading-[1.15]">
            {servicesHeading.title}
          </h2>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {serviceCards.map((card) => (
            <a
              key={card.id}
              href={card.href}
              onClick={(event) => {
                event.preventDefault()
                navigateHref(card.href)
              }}
              className="group relative aspect-[3/4] overflow-hidden rounded-3xl shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <img
                src={card.image}
                alt={card.alt}
                loading="lazy"
                className="h-full w-full max-w-none object-cover transition duration-500 group-hover:scale-105"
              />
              <span className="absolute top-4 right-4 grid h-11 w-11 place-items-center rounded-full bg-ochre text-white shadow-md transition duration-300 group-hover:bg-ochre-deep">
                <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="absolute right-4 bottom-5 left-4">
                <p className="font-display text-lg font-bold tracking-wide text-white uppercase drop-shadow-md sm:text-xl">
                  {card.title}
                </p>
                <p className="mt-1.5 text-sm leading-snug text-white/85 drop-shadow-sm">{card.detail}</p>
              </div>
            </a>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <button type="button" onClick={onBrowseAll} className={primaryButtonClass}>
            All services
          </button>
        </div>
      </div>
    </section>
  )
}
