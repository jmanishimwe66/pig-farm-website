import { heroCopy } from "../data.ts"

export function HeroWithBookingBar() {
  return (
    <section id="home" className="relative scroll-mt-0">
      <h1 className="sr-only">Strong Livestock</h1>
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
      </div>
    </section>
  )
}
