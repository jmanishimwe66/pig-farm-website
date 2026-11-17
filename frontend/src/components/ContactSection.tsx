import { useState, type FormEvent } from "react"
import MessageCircle from "lucide-react/icons/message-circle"
import Minus from "lucide-react/icons/minus"
import Phone from "lucide-react/icons/phone"
import Plus from "lucide-react/icons/plus"
import {
  consultationCopy,
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
  const isConsultation = variant === "section"
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [interest, setInterest] = useState("")
  const [consultationDays, setConsultationDays] = useState<number>(consultationCopy.minDays)
  const [preferredStart, setPreferredStart] = useState("")
  const [notes, setNotes] = useState("")
  const [sent, setSent] = useState(false)

  const estimatedTotal = consultationDays * consultationCopy.ratePerDayUsd

  function setDays(next: number) {
    const clamped = Math.min(consultationCopy.maxDays, Math.max(consultationCopy.minDays, next))
    setConsultationDays(clamped)
  }

  function submit(event: FormEvent) {
    event.preventDefault()
    if (name.trim().length < 2 || phone.trim().length < 3) return
    if (!isConsultation && !interest) return

    const message = isConsultation
      ? [
          "Hello Strong Livestock — consultation booking request.",
          `Name: ${name.trim()}`,
          `Phone: ${phone.trim()}`,
          `Consultation period: ${consultationDays} day${consultationDays === 1 ? "" : "s"} ($${consultationCopy.ratePerDayUsd}/day)`,
          `Estimated total: $${estimatedTotal}`,
          preferredStart.trim() ? `Preferred start: ${preferredStart.trim()}` : "",
          notes.trim() ? `Topics / notes: ${notes.trim()}` : "",
        ]
      : [
          "Hello Strong Livestock — contact request.",
          `Name: ${name.trim()}`,
          `Phone: ${phone.trim()}`,
          `Interest: ${interest}`,
          notes.trim() ? `Notes: ${notes.trim()}` : "",
        ]
    window.open(`https://wa.me/${FARM_WHATSAPP}?text=${encodeURIComponent(message.filter(Boolean).join("\n"))}`, "_blank", "noopener,noreferrer")
    setSent(true)
  }

  if (isConsultation) {
    return (
      <section
        id="contact"
        className="scroll-mt-24 flex h-[100dvh] max-h-[100dvh] flex-col overflow-hidden border-b border-white/10 bg-brand-deep px-4 py-6 text-white sm:px-6 sm:py-7 lg:px-8 lg:py-8"
      >
        <div className="mx-auto grid min-h-0 w-full max-w-7xl flex-1 grid-cols-1 items-stretch gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-12">
          <div className="flex flex-col justify-center">
            <p className="font-display text-[11px] font-semibold tracking-[0.2em] text-ochre uppercase">
              {consultationCopy.eyebrow}
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-wide text-white uppercase sm:text-3xl lg:text-4xl lg:leading-tight">
              {consultationCopy.title}
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/85 sm:text-base">{consultationCopy.text}</p>
            <p className="mt-4 font-display text-sm font-semibold tracking-[0.12em] text-ochre uppercase">
              ${consultationCopy.ratePerDayUsd} per farm day
            </p>
            <p className="mt-3 text-sm text-white/75">
              <span className="text-white">{FARM_LOCATION}</span>
              <span className="mx-2 text-white/35">·</span>
              {FARM_HOURS}
            </p>
          </div>

          <form
            onSubmit={submit}
            className="flex min-h-0 flex-col overflow-y-auto overscroll-contain rounded-2xl border border-line bg-surface p-5 shadow-[0_16px_40px_rgba(23,61,43,0.07)] sm:p-6"
          >
              <ol className="flex flex-wrap gap-x-3 gap-y-1 text-[10px] font-semibold tracking-[0.14em] text-muted uppercase">
                <li className="text-brand">1 · Days</li>
                <li>2 · Details</li>
                <li>3 · WhatsApp</li>
              </ol>

              <div className="mt-4">
                <p className="text-xs font-semibold text-ink">How many days on the farm?</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {consultationCopy.dayPresets.map((preset) => {
                    const active = consultationDays === preset
                    return (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setDays(preset)}
                        className={`rounded-full px-3 py-1.5 font-display text-[10px] font-semibold tracking-[0.1em] uppercase transition ${
                          active
                            ? "bg-brand text-white shadow-sm"
                            : "border border-line bg-cream text-ink hover:border-brand/40"
                        }`}
                      >
                        {preset} day{preset === 1 ? "" : "s"}
                      </button>
                    )
                  })}
                </div>

                <div className="mt-3 flex items-center gap-3 rounded-xl border border-line bg-cream/60 px-3 py-2.5">
                  <button
                    type="button"
                    onClick={() => setDays(consultationDays - 1)}
                    disabled={consultationDays <= consultationCopy.minDays}
                    className="grid h-9 w-9 place-items-center rounded-full border border-line bg-surface text-brand transition hover:border-brand disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Fewer days"
                  >
                    <Minus className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <div className="min-w-[8.5rem] flex-1 text-center">
                    <p className="font-display text-lg font-bold tracking-wide text-brand sm:text-xl">
                      {consultationDays} day{consultationDays === 1 ? "" : "s"} / ${estimatedTotal}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setDays(consultationDays + 1)}
                    disabled={consultationDays >= consultationCopy.maxDays}
                    className="grid h-9 w-9 place-items-center rounded-full border border-line bg-surface text-brand transition hover:border-brand disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="More days"
                  >
                    <Plus className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="consultation-name" className="mb-1 block text-xs font-semibold text-ink">
                    Full name
                  </label>
                  <input
                    id="consultation-name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className={fieldClass}
                    autoComplete="name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="consultation-phone" className="mb-1 block text-xs font-semibold text-ink">
                    Phone / WhatsApp
                  </label>
                  <input
                    id="consultation-phone"
                    type="tel"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    className={fieldClass}
                    autoComplete="tel"
                    required
                  />
                </div>
              </div>

              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="consultation-start" className="mb-1 block text-xs font-semibold text-ink">
                    Start date <span className="font-normal text-muted">(optional)</span>
                  </label>
                  <input
                    id="consultation-start"
                    type="date"
                    value={preferredStart}
                    onChange={(event) => setPreferredStart(event.target.value)}
                    className={fieldClass}
                  />
                </div>
                <div className="sm:col-span-1">
                  <label htmlFor="consultation-notes" className="mb-1 block text-xs font-semibold text-ink">
                    Topics
                  </label>
                  <textarea
                    id="consultation-notes"
                    rows={2}
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  className={fieldClass}
                  placeholder="e.g. pen design, feeding program, record-keeping"
                  />
                </div>
              </div>

              <button type="submit" className={`${primaryButtonClass} mt-4 w-full gap-2`}>
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Request dates
              </button>
              {sent ? (
                <p className="mt-2 text-center text-xs text-muted">WhatsApp should open with your booking draft ready to send.</p>
              ) : null}
          </form>
        </div>
      </section>
    )
  }

  return (
    <section id="contact-page" className="scroll-mt-24 bg-canvas px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <h2 className="font-display text-3xl font-bold tracking-wide text-ink uppercase sm:text-4xl">{contactCopy.title}</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">{contactCopy.text}</p>
          <ul className="mt-8 space-y-3 text-sm text-ink">
            <li>
              <span className="text-muted">Hours · </span>
              {FARM_HOURS}
            </li>
            <li>
              <span className="text-muted">Location · </span>
              {FARM_LOCATION}
            </li>
            <li>
              <span className="text-muted">Email · </span>
              <a href={`mailto:${FARM_EMAIL}`} className="underline-offset-2 hover:underline">
                {FARM_EMAIL}
              </a>
            </li>
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`tel:${FARM_PHONE}`} className={`${primaryButtonClass} gap-2`}>
              <Phone className="h-4 w-4" aria-hidden="true" />
              {FARM_PHONE_DISPLAY}
            </a>
            <a
              href={`https://wa.me/${FARM_WHATSAPP}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`${secondaryButtonClass} gap-2`}
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              WhatsApp
            </a>
            {onOpenCheckout ? (
              <button type="button" onClick={onOpenCheckout} className={secondaryButtonClass}>
                Checkout cart
              </button>
            ) : null}
          </div>
        </div>

        <form onSubmit={submit} className="rounded-3xl border border-line bg-surface p-6 shadow-lg sm:p-8">
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