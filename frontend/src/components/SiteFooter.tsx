import MessageCircle from "lucide-react/icons/message-circle"
import Phone from "lucide-react/icons/phone"
import {
  FARM_EMAIL,
  FARM_HOURS,
  FARM_LOCATION,
  FARM_PHONE,
  FARM_PHONE_DISPLAY,
  FARM_WHATSAPP,
} from "../data.ts"
import { goToContactSection, goToView } from "../navigation.ts"
import { LogoMark } from "./Icons.tsx"

const year = new Date().getFullYear()

type SiteFooterProps = {
  onOpenShop?: () => void
  onOpenAbout?: () => void
  onOpenStory?: () => void
  onOpenFarmLife?: () => void
}

export function SiteFooter({
  onOpenShop,
  onOpenAbout,
  onOpenStory,
  onOpenFarmLife,
}: SiteFooterProps) {
  function goSection(href: string) {
    goToView("home")
    window.setTimeout(() => {
      window.location.hash = href.replace(/^#/, "")
    }, 50)
  }

  return (
    <footer className="bg-brand-deep text-white">
      <div
        className="h-px w-full bg-white/10"
        role="presentation"
        aria-hidden="true"
      />
      <div
        className="h-[3px] w-full bg-gradient-to-r from-transparent via-ochre/70 to-transparent"
        role="presentation"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_repeat(3,minmax(0,0.7fr))] lg:gap-12">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white">
                <LogoMark />
              </span>
              <div>
                <p className="font-display text-lg font-bold tracking-wide uppercase">Strong Livestock</p>
                <p className="text-[11px] font-semibold tracking-[0.18em] text-ochre uppercase">Rugerero, Rwanda</p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/75">
              A growing pig business building a sustainable farm—raising pigs, using manure wisely, and growing crops on
              five hectares in Rugerero.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`tel:${FARM_PHONE}`}
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-display text-[11px] font-semibold tracking-[0.14em] text-brand uppercase transition hover:bg-cream"
              >
                <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                Call desk
              </a>
              <a
                href={`https://wa.me/${FARM_WHATSAPP}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/35 px-5 py-2.5 font-display text-[11px] font-semibold tracking-[0.14em] text-white uppercase transition hover:border-white hover:bg-white/10"
              >
                <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                WhatsApp
              </a>
            </div>
          </div>

          <div>
            <p className="font-display text-xs font-semibold tracking-[0.18em] text-ochre uppercase">Explore</p>
            <ul className="mt-4 space-y-2.5 text-sm text-white/80">
              <li>
                <button type="button" onClick={onOpenAbout} className="transition hover:text-white">
                  About us
                </button>
              </li>
              <li>
                <button type="button" onClick={onOpenStory} className="transition hover:text-white">
                  Our story
                </button>
              </li>
              <li>
                <button type="button" onClick={() => goSection("#services")} className="transition hover:text-white">
                  Services
                </button>
              </li>
              <li>
                <button type="button" onClick={onOpenFarmLife} className="transition hover:text-white">
                  Farm life
                </button>
              </li>
              <li>
                <button type="button" onClick={onOpenShop} className="transition hover:text-white">
                  Farm shop
                </button>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-display text-xs font-semibold tracking-[0.18em] text-ochre uppercase">Orders</p>
            <ul className="mt-4 space-y-2.5 text-sm text-white/80">
              <li>
                <button type="button" onClick={onOpenShop} className="transition hover:text-white">
                  Browse products
                </button>
              </li>
              <li>
                <button type="button" onClick={() => goToContactSection()} className="transition hover:text-white">
                  Book consultation
                </button>
              </li>
              <li>
                <button type="button" onClick={() => goToContactSection()} className="transition hover:text-white">
                  Get in touch
                </button>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-display text-xs font-semibold tracking-[0.18em] text-ochre uppercase">Farm desk</p>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              <li>{FARM_HOURS}</li>
              <li>{FARM_LOCATION}</li>
              <li>
                <a href={`tel:${FARM_PHONE}`} className="transition hover:text-white">
                  {FARM_PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a href={`mailto:${FARM_EMAIL}`} className="transition hover:text-white">
                  {FARM_EMAIL}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {year} Strong Livestock. All rights reserved.</p>
          <p>Pig farming · Manure · Regenerative crops</p>
        </div>
      </div>
    </footer>
  )
}
