import { useState, type FormEvent } from "react"
import MessageCircle from "lucide-react/icons/message-circle"
import Phone from "lucide-react/icons/phone"
import { FARM_PHONE, FARM_PHONE_DISPLAY, FARM_WHATSAPP, interests } from "../data.ts"
import type { OrderLine, RequestDraft } from "../types.ts"
import { fieldClass, primaryButtonClass, secondaryButtonClass } from "../ui.ts"

type FieldErrors = Partial<Record<keyof RequestDraft, string>>

function whatsAppLink(draft: RequestDraft, lines: readonly OrderLine[]) {
  const itemText =
    lines.length > 0 ? lines.map((line) => `- ${line.qty} × ${line.name}`).join("\n") : "- General inquiry"
  const message = [
    "Hello Strong Livestock, I would like to place a request.",
    `Name: ${draft.name}`,
    `Phone: ${draft.phone}`,
    `Interest: ${draft.interest}`,
    `Items:\n${itemText}`,
    draft.notes.trim() ? `Notes: ${draft.notes.trim()}` : "",
  ]
    .filter((line) => line.length > 0)
    .join("\n")
  return `https://wa.me/${FARM_WHATSAPP}?text=${encodeURIComponent(message)}`
}

type CheckoutPageProps = {
  lines: readonly OrderLine[]
  onEditCart: () => void
}

export function CheckoutPage({ lines, onEditCart }: CheckoutPageProps) {
  const [draft, setDraft] = useState<RequestDraft>({
    name: "",
    phone: "",
    interest: "",
    notes: "",
  })
  const [errors, setErrors] = useState<FieldErrors>({})
  const [ready, setReady] = useState<RequestDraft | null>(null)

  function update<K extends keyof RequestDraft>(key: K, value: RequestDraft[K]) {
    setDraft((current) => ({ ...current, [key]: value }))
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const next: FieldErrors = {}
    const digitCount = draft.phone.replace(/\D/g, "").length
    if (draft.name.trim().length < 2) next.name = "Enter the name we should ask for."
    if (digitCount < 8 && draft.phone.trim().length < 3) {
      next.phone = "Enter a phone number with at least 8 digits, or a contact note."
    }
    if (!draft.interest) next.interest = "Choose what you want to order."
    setErrors(next)
    if (Object.keys(next).length > 0) {
      const firstInvalid = next.name ? "checkout-name" : next.phone ? "checkout-phone" : "checkout-interest"
      document.getElementById(firstInvalid)?.focus()
      return
    }
    setReady({
      name: draft.name.trim(),
      phone: draft.phone.trim(),
      interest: draft.interest,
      notes: draft.notes.trim(),
    })
  }

  return (
    <section id="checkout-page" className="bg-canvas px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14">
        <div>
          <p className="font-display text-xs font-semibold tracking-[0.2em] text-ochre-deep uppercase">Checkout</p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-wide text-ink uppercase sm:text-4xl">
            Confirm &amp; send on WhatsApp
          </h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted sm:text-base">
            Review your list, add your details, then open WhatsApp to finish with the farm desk. Weight and price are
            confirmed on that chat or call—nothing is charged on this page.
          </p>

          <div className="mt-8 rounded-3xl border border-line bg-surface p-6 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-display text-sm font-bold tracking-wide text-ink uppercase">Your order list</h2>
              <button type="button" onClick={onEditCart} className="text-xs font-bold tracking-wide text-brand uppercase">
                Edit cart
              </button>
            </div>
            {lines.length > 0 ? (
              <ul className="mt-4 space-y-3">
                {lines.map((line) => (
                  <li key={line.id} className="rounded-2xl bg-cream px-4 py-3 text-sm">
                    <p className="font-bold text-ink">
                      {line.qty} × {line.name}
                    </p>
                    <p className="mt-0.5 text-muted">{line.detail}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-muted">Your cart is empty. Add items from the shop, or send a general inquiry below.</p>
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-line bg-surface p-6 shadow-sm sm:p-8">
          {ready ? (
            <div>
              <h2 className="font-display text-lg font-bold tracking-wide text-ink uppercase">Ready to send</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Your request is prepared in this browser. Open WhatsApp to send it to the farm desk.
              </p>
              <div className="mt-5 rounded-2xl bg-cream p-4 text-sm leading-relaxed text-ink">
                <p className="font-bold">{ready.name}</p>
                <p>{ready.phone}</p>
                <p className="mt-1">{ready.interest}</p>
                {lines.length > 0 ? (
                  <ul className="mt-2 space-y-1">
                    {lines.map((line) => (
                      <li key={line.id}>
                        {line.qty} × {line.name}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2">General inquiry</p>
                )}
                {ready.notes ? <p className="mt-2">{ready.notes}</p> : null}
              </div>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <a
                  href={whatsAppLink(ready, lines)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${primaryButtonClass} flex-1 gap-2`}
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  Checkout on WhatsApp
                </a>
                <a href={`tel:${FARM_PHONE}`} className={`${secondaryButtonClass} flex-1 gap-2`}>
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  Call {FARM_PHONE_DISPLAY}
                </a>
              </div>
              <button
                type="button"
                onClick={() => setReady(null)}
                className="mt-4 text-sm font-semibold text-brand transition hover:text-brand-deep"
              >
                Edit request
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="space-y-4">
              <h2 className="font-display text-lg font-bold tracking-wide text-ink uppercase">Your details</h2>
              <div>
                <label htmlFor="checkout-name" className="mb-1.5 block text-sm font-semibold text-ink">
                  Full name
                </label>
                <input
                  id="checkout-name"
                  name="name"
                  autoComplete="name"
                  value={draft.name}
                  aria-invalid={errors.name ? true : undefined}
                  onChange={(event) => update("name", event.target.value)}
                  className={fieldClass}
                />
                {errors.name ? <p className="mt-1 text-sm text-red-700">{errors.name}</p> : null}
              </div>
              <div>
                <label htmlFor="checkout-phone" className="mb-1.5 block text-sm font-semibold text-ink">
                  Phone
                </label>
                <input
                  id="checkout-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  value={draft.phone}
                  aria-invalid={errors.phone ? true : undefined}
                  onChange={(event) => update("phone", event.target.value)}
                  className={fieldClass}
                />
                {errors.phone ? <p className="mt-1 text-sm text-red-700">{errors.phone}</p> : null}
              </div>
              <div>
                <label htmlFor="checkout-interest" className="mb-1.5 block text-sm font-semibold text-ink">
                  What do you need?
                </label>
                <select
                  id="checkout-interest"
                  name="interest"
                  value={draft.interest}
                  aria-invalid={errors.interest ? true : undefined}
                  onChange={(event) => update("interest", event.target.value)}
                  className={fieldClass}
                >
                  <option value="">Select an option</option>
                  {interests.map((interest) => (
                    <option key={interest} value={interest}>
                      {interest}
                    </option>
                  ))}
                </select>
                {errors.interest ? <p className="mt-1 text-sm text-red-700">{errors.interest}</p> : null}
              </div>
              <div>
                <label htmlFor="checkout-notes" className="mb-1.5 block text-sm font-semibold text-ink">
                  Notes
                </label>
                <textarea
                  id="checkout-notes"
                  name="notes"
                  rows={4}
                  maxLength={400}
                  value={draft.notes}
                  placeholder="Preferred weight, breed, or delivery day"
                  onChange={(event) => update("notes", event.target.value)}
                  className={fieldClass}
                />
              </div>
              <button type="submit" className={`${primaryButtonClass} w-full`}>
                Continue to WhatsApp checkout
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
