import { useState } from "react"
import { aboutPanels } from "../data.ts"
import { navigateHref } from "../navigation.ts"

const panelLinkClass =
  "mt-4 inline-block text-sm font-semibold text-brand underline underline-offset-[3px] decoration-brand/60 hover:text-brand-deep hover:decoration-brand"

export function AboutAccordion() {
  const [activeId, setActiveId] = useState(aboutPanels[0]?.id ?? "history")
  const activePanel = aboutPanels.find((panel) => panel.id === activeId) ?? aboutPanels[0]

  return (
    <section id="about" className="scroll-mt-24 bg-canvas px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <header className="max-w-5xl">
          <h2 className="font-display text-3xl font-bold tracking-wide text-ink uppercase sm:text-4xl lg:text-[2.65rem] lg:leading-tight">
            Get to know us
          </h2>
        </header>

        <div className="mt-10 grid items-start gap-10 lg:mt-12 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-12">
          <figure
            className="relative mx-auto aspect-[4/3] w-full max-w-md overflow-hidden rounded-[1.75rem] shadow-md lg:mx-0 lg:max-w-lg lg:justify-self-start"
            aria-label="Farm imagery for mission, vision, and history"
          >
            {aboutPanels.map((panel) => {
              const focused = activeId === panel.id
              return (
                <img
                  key={panel.id}
                  src={panel.image.src}
                  alt={panel.image.alt}
                  width={640}
                  height={800}
                  loading="lazy"
                  className={`absolute inset-0 h-full w-full object-cover motion-safe:transition-[opacity,transform] motion-safe:duration-500 motion-safe:ease-out ${
                    focused
                      ? "z-10 scale-100 opacity-100"
                      : "pointer-events-none z-0 scale-[1.04] opacity-0"
                  }`}
                />
              )
            })}
            <figcaption className="sr-only">{activePanel?.title}: {activePanel?.image.alt}</figcaption>
          </figure>

          <div className="flex flex-col gap-3 sm:gap-4 lg:max-w-xl lg:justify-self-end lg:pl-2">
            {aboutPanels.map((panel) => {
              const open = activeId === panel.id
              const buttonId = `about-panel-${panel.id}`
              return (
                <div
                  key={panel.id}
                  onMouseEnter={() => setActiveId(panel.id)}
                  className={`overflow-hidden rounded-[1.35rem] border transition-[background-color,border-color,box-shadow] duration-300 ${
                    open
                      ? "border-transparent bg-accent-soft shadow-sm"
                      : "border-line/90 bg-surface shadow-[0_1px_0_rgba(34,39,34,0.04)] hover:border-brand/20"
                  }`}
                >
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={open}
                    aria-controls={`${buttonId}-content`}
                    onClick={() => setActiveId(panel.id)}
                    className={`flex w-full items-center text-left ${
                      open ? "px-6 pb-1 pt-6 sm:px-7 sm:pt-7" : "px-6 py-5 sm:px-7 sm:py-[1.35rem]"
                    }`}
                  >
                    <span className="font-display text-lg font-bold tracking-wide text-ink uppercase sm:text-xl">
                      {panel.title}
                    </span>
                  </button>
                  <div
                    id={`${buttonId}-content`}
                    role="region"
                    aria-labelledby={buttonId}
                    className={`grid transition-all duration-300 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                    aria-hidden={!open}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 pb-6 sm:px-7 sm:pb-7">
                        {panel.text ? (
                          <p className="text-sm leading-relaxed text-ink/80 sm:text-[15px]">{panel.text}</p>
                        ) : null}
                        {panel.items ? (
                          <ul className="space-y-2 text-sm leading-relaxed text-ink/80 sm:text-[15px]">
                            {panel.items.map((item) => (
                              <li key={item} className="flex gap-2.5">
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                        <a
                          href={panel.href}
                          onClick={(event) => {
                            event.preventDefault()
                            if (panel.href.startsWith("/#")) {
                              const id = panel.href.slice(2)
                              navigateHref("/")
                              window.setTimeout(() => {
                                document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
                              }, 50)
                              return
                            }
                            navigateHref(panel.href)
                          }}
                          className={panelLinkClass}
                        >
                          {panel.ctaLabel}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
