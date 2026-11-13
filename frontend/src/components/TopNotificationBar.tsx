import Mail from "lucide-react/icons/mail"
import Phone from "lucide-react/icons/phone"
import { FARM_EMAIL, FARM_PHONE, FARM_PHONE_DISPLAY, topBarTagline } from "../data.ts"

function SocialIcon({ kind }: { kind: "facebook" | "instagram" }) {
  if (kind === "facebook") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
        <path d="M14 8.5V6.8c0-.7.5-1.1 1.1-1.1H17V3h-2.6c-2.3 0-3.6 1.4-3.6 3.8V8.5H9v2.7h1.8V21h3.2v-9.8H17v-2.7h-2.4z" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
      <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm5 4.4A3.1 3.1 0 1 0 12 14.5 3.1 3.1 0 0 0 12 7.4zm5.2-3.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
    </svg>
  )
}

export function TopNotificationBar() {
  return (
    <div className="bg-brand-deep text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-2 text-xs sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p className="text-white/90">{topBarTagline}</p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <a href={`tel:${FARM_PHONE}`} className="inline-flex items-center gap-1.5 font-medium transition hover:text-ochre">
            <Phone className="h-3.5 w-3.5" aria-hidden="true" />
            {FARM_PHONE_DISPLAY}
          </a>
          <a
            href={`mailto:${FARM_EMAIL}`}
            className="inline-flex items-center gap-1.5 font-medium transition hover:text-ochre"
          >
            <Mail className="h-3.5 w-3.5" aria-hidden="true" />
            {FARM_EMAIL}
          </a>
          <span className="flex items-center gap-2 border-l border-white/20 pl-4">
            <a href="#" aria-label="Strong Livestock on Facebook" className="transition hover:text-ochre">
              <SocialIcon kind="facebook" />
            </a>
            <a href="#" aria-label="Strong Livestock on Instagram" className="transition hover:text-ochre">
              <SocialIcon kind="instagram" />
            </a>
          </span>
        </div>
      </div>
    </div>
  )
}
