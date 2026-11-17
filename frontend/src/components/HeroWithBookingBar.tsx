import { heroCopy } from "../data.ts"
import { goToView } from "../navigation.ts"
import { primaryButtonClass } from "../ui.ts"

export function HeroWithBookingBar() {
  function openServices() {
    goToView("home")
    window.setTimeout(() => {
      document.getElementById("services")?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 50)
  }

  return (
    <section id="home" className="relative scroll-mt-0">
      <h1 className="sr-only">{heroCopy.title}</h1>
      <div className="relative min-h-[calc(100dvh-4.5rem)] overflow-hidden bg-[#141412] sm:min-h-[calc(100dvh-5rem)]">
        <video
          className="absolute inset-0 h-full w-full max-w-none object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label={heroCopy.videoLabel}
        >
          <source src={heroCopy.video} type="video/mp4" />
        </video>
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,20,18,0.35)_0%,rgba(20,20,18,0.55)_45%,rgba(20,20,18,0.82)_100%)]"
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto flex min-h-[calc(100dvh-4.5rem)] max-w-7xl flex-col items-center justify-end px-4 pb-14 pt-24 text-center sm:min-h-[calc(100dvh-5rem)] sm:px-6 sm:pb-16 lg:px-8 lg:pb-20">
          <p className="max-w-3xl font-display text-3xl font-bold tracking-wide text-white uppercase sm:text-4xl lg:text-5xl lg:leading-tight">
            {heroCopy.title}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => goToView("shop")}
              className={primaryButtonClass}
            >
              {heroCopy.primaryCta}
            </button>
            <button
              type="button"
              onClick={openServices}
              className="inline-flex items-center justify-center rounded-full border-2 border-white bg-transparent px-6 py-3 font-display text-[12px] font-semibold tracking-[0.14em] text-white uppercase transition duration-300 hover:bg-white hover:text-brand"
            >
              {heroCopy.secondaryCta}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}