import { useState, type FormEvent } from "react"
import MessageCircle from "lucide-react/icons/message-circle"
import Phone from "lucide-react/icons/phone"
import {
  contactCopy,
  FARM_EMAIL,
  FARM_HOURS,
  FARM_LOCATION,
  FARM_PHONE,
  FARM_PHONE_DISPLAY,
  FARM_WHATSAPP,
  interests,
} from "../data.ts"
import { fieldClass, primaryButtonClass, secondaryButtonClass } from "../ui.ts"

type ContactSectionProps = {
  variant?: "section" | "page"
  onOpenCheckout?: () => void
}

export function ContactSection({ variant = "section", onOpenCheckout }: ContactSectionProps) {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [interest, setInterest] = useState("")
  const [notes, setNotes] = useState("")
  const [sent, setSent] = useState(false)

  function submit(event: FormEvent) {
    event.preventDefault()
    if (name.trim().length < 2 || phone.trim().length < 3 || !interest) return
    const message = [
      "Hello Strong Livestock — contact request.",
      `Name: ${name.trim()}`,
      `Phone: ${phone.trim()}`,
      `Interest: ${interest}`,
      notes.trim() ? `Notes: ${notes.trim()}` : "",
    ]
      .filter(Boolean)
      .join("\n")
    window.open(`https://wa.me/${FARM_WHATSAPP}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer")
    setSent(true)
  }

  return (
    <section
      id={variant === "page" ? "contact-page" : "contact"}
      className={`scroll-mt-24 px-4 py-14 sm:px-6 lg:px-8 lg:py-20 ${
        variant === "page" ? "bg-canvas" : "bg-brand text-white"
      }`}
    >
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <h2
            className={`font-display text-3xl font-bold tracking-wide uppercase sm:text-4xl ${
              variant === "page" ? "text-ink" : "text-white"
            }`}
          >
            {contactCopy.title}
          </h2>
          <p className={`mt-4 text-sm leading-relaxed sm:text-base ${variant === "page" ? "text-muted" : "text-white/85"}`}>
            {contactCopy.text}
          </p>
          <ul className={`mt-8 space-y-3 text-sm ${variant === "page" ? "text-ink" : "text-white"}`}>
            <li>
              <span className={variant === "page" ? "text-muted" : "text-white/70"}>Hours · </span>
              {FARM_HOURS}
            </li>
            <li>
              <span className={variant === "page" ? "text-muted" : "text-white/70"}>Location · </span>
              {FARM_LOCATION}
            </li>
            <li>
              <span className={variant === "page" ? "text-muted" : "text-white/70"}>Email · </span>
              <a href={`mailto:${FARM_EMAIL}`} className="underline-offset-2 hover:underline">
                {FARM_EMAIL}
              </a>
            </li>
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`tel:${FARM_PHONE}`}
              className={
                variant === "page"
                  ? primaryButtonClass
                  : "inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-display text-[12px] font-semibold tracking-[0.14em] text-brand uppercase transition hover:bg-cream"
              }
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {FARM_PHONE_DISPLAY}
            </a>
            <a
              href={`https://wa.me/${FARM_WHATSAPP}`}
              target="_blank"
              rel="noopener noreferrer"
              className={
                variant === "page"
                  ? secondaryButtonClass
                  : "inline-flex items-center justify-center gap-2 rounded-full border-2 border-white px-6 py-3 font-display text-[12px] font-semibold tracking-[0.14em] text-white uppercase transition hover:bg-white hover:text-brand"
              }
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              WhatsApp
            </a>
            {onOpenCheckout ? (
              <button
                type="button"
                onClick={onOpenCheckout}
                className={
                  variant === "page"
                    ? secondaryButtonClass
                    : "inline-flex items-center justify-center rounded-full border-2 border-white/70 px-6 py-3 font-display text-[12px] font-semibold tracking-[0.14em] text-white uppercase transition hover:border-white hover:bg-white/10"
                }
              >
                Checkout cart
              </button>
            ) : null}
          </div>
        </div>

        <form
          onSubmit={submit}
          className={`rounded-3xl p-6 shadow-lg sm:p-8 ${variant === "page" ? "border border-line bg-surface" : "bg-surface text-ink"}`}
        >
          <p className="font-display text-lg font-bold tracking-wide text-ink uppercase">Send a WhatsApp request</p>
          <div className="mt-5 space-y-4">
            <div>
              <label htmlFor="contact-name" className="mb-1.5 block text-sm font-semibold text-ink">
                Full name
              </label>
              <input
                id="contact-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className={fieldClass}
                autoComplete="name"
                required
              />
            </div>
            <div>
              <label htmlFor="contact-phone" className="mb-1.5 block text-sm font-semibold text-ink">
                Phone
              </label>
              <input
                id="contact-phone"
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className={fieldClass}
                autoComplete="tel"
                required
              />
            </div>
            <div>
              <label htmlFor="contact-interest" className="mb-1.5 block text-sm font-semibold text-ink">
                What do you need?
              </label>
              <select
                id="contact-interest"
                value={interest}
                onChange={(event) => setInterest(event.target.value)}
                className={fieldClass}
                required
              >
                <option value="">Select an option</option>
                {interests.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="contact-notes" className="mb-1.5 block text-sm font-semibold text-ink">
                Notes
              </label>
              <textarea
                id="contact-notes"
                rows={3}
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                className={fieldClass}
                placeholder="Preferred weight, breed, or delivery day"
              />
            </div>
            <button type="submit" className={`${primaryButtonClass} w-full gap-2`}>
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Open WhatsApp
            </button>
            {sent ? (
              <p className="text-center text-sm text-muted">WhatsApp should open with your message ready to send.</p>
            ) : null}
          </div>
        </form>
      </div>
    </section>
  )
}
