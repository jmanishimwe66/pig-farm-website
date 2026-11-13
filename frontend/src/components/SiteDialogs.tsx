import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react"
import ArrowUpRight from "lucide-react/icons/arrow-up-right"
import MessageCircle from "lucide-react/icons/message-circle"
import Minus from "lucide-react/icons/minus"
import Phone from "lucide-react/icons/phone"
import Plus from "lucide-react/icons/plus"
import Search from "lucide-react/icons/search"
import X from "lucide-react/icons/x"
import { catalog, FARM_PHONE, FARM_PHONE_DISPLAY, FARM_WHATSAPP, interests, searchEntries } from "../data.ts"
import { navigateHref } from "../navigation.ts"
import type { FarmBlogPost, OrderLine, RequestDraft } from "../types.ts"
import { fieldClass, primaryButtonClass } from "../ui.ts"
import { LogoMark } from "./Icons.tsx"

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

function Panel({
  open,
  onClose,
  title,
  titleId,
  placement,
  size = "md",
  children,
}: {
  open: boolean
  onClose: () => void
  title: string
  titleId: string
  placement: "center" | "end"
  size?: "md" | "lg"
  children: ReactNode
}) {
  const panelRef = useRef<HTMLDivElement>(null)
  const onCloseRef = useRef(onClose)

  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  useEffect(() => {
    if (!open) return
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const panel = panelRef.current
    const focusTarget = panel?.querySelector<HTMLElement>("[data-autofocus]") ?? panel
    focusTarget?.focus()

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onCloseRef.current()
        return
      }
      if (event.key !== "Tab" || !panel) return
      const focusable = [...panel.querySelectorAll<HTMLElement>(FOCUSABLE)]
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (!first || !last) return
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener("keydown", onKey)
    return () => {
      window.removeEventListener("keydown", onKey)
      previouslyFocused?.focus()
    }
  }, [open])

  if (!open) return null

  const centered = placement === "center"

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        tabIndex={-1}
        aria-label="Close dialog"
        className="absolute inset-0 bg-[#16120e]/60"
        onClick={onClose}
      />
      <div
        className={`relative z-10 flex h-full pointer-events-none ${
          centered ? "items-center justify-center p-4" : "justify-end"
        }`}
      >
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          tabIndex={-1}
          className={
            centered
              ? `panel-pop pointer-events-auto flex max-h-[min(720px,calc(100dvh-2rem))] w-full flex-col overflow-hidden rounded-3xl bg-white shadow-2xl outline-none ${
                  size === "lg" ? "max-w-2xl" : "max-w-lg"
                }`
              : "drawer-in pointer-events-auto flex h-full w-full max-w-md flex-col bg-white shadow-2xl outline-none"
          }
        >
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <h2 id={titleId} className="font-display text-lg font-bold text-ink">
              {title}
            </h2>
            <button
              type="button"
              aria-label={`Close ${title.toLowerCase()}`}
              onClick={onClose}
              className="grid h-10 w-10 place-items-center rounded-full text-ink transition hover:bg-cream hover:text-brand"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}

export function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("")
  const normalized = query.trim().toLowerCase()
  const results =
    normalized.length === 0
      ? searchEntries
      : searchEntries.filter((entry) => `${entry.title} ${entry.text}`.toLowerCase().includes(normalized))

  function jump(href: string) {
    onClose()
    const node = document.getElementById(href.slice(1))
    if (!node) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    node.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" })
  }

  return (
    <Panel open={open} onClose={onClose} title="Search" titleId="search-title" placement="center">
      <div className="border-b border-line px-5 py-4">
        <label htmlFor="site-search" className="sr-only">
          Search the farm site
        </label>
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
          <input
            id="site-search"
            data-autofocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try breeds, delivery, pork, wholesale"
            className={`${fieldClass} pl-10`}
          />
        </div>
      </div>
      <div className="overflow-y-auto overscroll-contain px-3 py-3">
        {results.length === 0 ? (
          <p className="px-2 py-6 text-sm text-muted">No matches. Try breeds, delivery, pork, or wholesale.</p>
        ) : (
          <ul>
            {results.map((entry) => (
              <li key={`${entry.href}-${entry.title}`}>
                <button
                  type="button"
                  onClick={() => jump(entry.href)}
                  className="block w-full rounded-xl px-3 py-3 text-left transition duration-300 hover:bg-cream"
                >
                  <span className="block text-sm font-bold text-ink">{entry.title}</span>
                  <span className="mt-0.5 block text-sm text-muted">{entry.text}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Panel>
  )
}

export function CartDrawer({
  open,
  onClose,
  lines,
  onChangeQty,
  onRequest,
}: {
  open: boolean
  onClose: () => void
  lines: readonly OrderLine[]
  onChangeQty: (id: string, qty: number) => void
  onRequest: () => void
}) {
  const count = lines.reduce((sum, line) => sum + line.qty, 0)

  function goToShop(href = "/shop") {
    onClose()
    navigateHref(href)
  }

  return (
    <Panel open={open} onClose={onClose} title="Your order list" titleId="cart-title" placement="end">
      <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-4">
        {lines.length === 0 ? (
          <div className="mb-6 rounded-2xl bg-cream px-4 py-5 text-center">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-white text-brand">
              <LogoMark />
            </span>
            <p className="mt-3 font-display text-base font-bold text-ink">Your order list is empty</p>
            <p className="mt-1 text-sm text-muted">
              Browse the shop below. Weight and price are confirmed when you call the farm.
            </p>
          </div>
        ) : (
          <ul className="mb-6 space-y-3">
            {lines.map((line) => (
              <li key={line.id} className="rounded-2xl border border-line px-3 py-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-ink">{line.name}</p>
                    <p className="mt-0.5 text-xs text-muted">{line.detail}</p>
                  </div>
                  <button
                    type="button"
                    aria-label={`Remove ${line.name}`}
                    onClick={() => onChangeQty(line.id, 0)}
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-muted transition hover:bg-cream hover:text-ink"
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <button
                    type="button"
                    aria-label={`Decrease ${line.name}`}
                    onClick={() => onChangeQty(line.id, line.qty - 1)}
                    className="grid h-9 w-9 place-items-center rounded-full border border-line transition hover:border-brand hover:text-brand"
                  >
                    <Minus className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <span className="w-6 text-center text-sm font-bold" aria-live="polite">
                    {line.qty}
                  </span>
                  <button
                    type="button"
                    aria-label={`Increase ${line.name}`}
                    onClick={() => onChangeQty(line.id, line.qty + 1)}
                    className="grid h-9 w-9 place-items-center rounded-full border border-line transition hover:border-brand hover:text-brand"
                  >
                    <Plus className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <h3 className="font-display text-sm font-bold tracking-wide text-ink uppercase">Browse shop</h3>
        <ul className="mt-3 space-y-2">
          {catalog.map((item) => (
            <li key={item.id} className="flex items-center justify-between gap-3 rounded-2xl bg-cream px-3 py-3">
              <div>
                <p className="text-sm font-bold text-ink">{item.name}</p>
                <p className="mt-0.5 text-xs text-muted">{item.detail}</p>
              </div>
              <button
                type="button"
                aria-label={`Open shop for ${item.name}`}
                onClick={() => goToShop(item.href ?? "/shop")}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink text-white transition duration-300 hover:bg-brand"
              >
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t border-line p-5">
        <button type="button" onClick={onRequest} className={`${primaryButtonClass} w-full`}>
          {count > 0 ? "Checkout on WhatsApp" : "Send an inquiry"}
        </button>
      </div>
    </Panel>
  )
}

type FieldErrors = Partial<Record<keyof RequestDraft, string>>

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string
  label: string
  error?: string
  children: ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ink">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  )
}

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

export function OrderDialog({
  open,
  onClose,
  lines,
  onEditList,
  initialDraft,
}: {
  open: boolean
  onClose: () => void
  lines: readonly OrderLine[]
  onEditList: () => void
  initialDraft?: Partial<RequestDraft>
}) {
  const [draft, setDraft] = useState<RequestDraft>(() => ({
    name: initialDraft?.name ?? "",
    phone: initialDraft?.phone ?? "",
    interest: initialDraft?.interest ?? "",
    notes: initialDraft?.notes ?? "",
  }))
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
      const firstInvalid = next.name ? "order-name" : next.phone ? "order-phone" : "order-interest"
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
    <Panel open={open} onClose={onClose} title="Order from the farm" titleId="order-title" placement="center">
      <div className="overflow-y-auto overscroll-contain px-5 py-4">
        {ready ? (
          <div>
            <p className="text-sm leading-relaxed text-muted">
              This request stays in your browser until you call or open WhatsApp. Weight and price are confirmed on that call.
            </p>
            <div className="mt-4 rounded-2xl bg-cream p-4 text-sm leading-relaxed text-ink">
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
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <a
                href={whatsAppLink(ready, lines)}
                target="_blank"
                rel="noopener noreferrer"
                className={`${primaryButtonClass} flex-1 gap-2`}
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Checkout on WhatsApp
              </a>
              <a
                href={`tel:${FARM_PHONE}`}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-brand bg-transparent px-6 py-3 font-display text-[12px] font-semibold tracking-[0.14em] text-brand uppercase transition duration-300 hover:bg-brand hover:text-white"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call {FARM_PHONE_DISPLAY}
              </a>
            </div>
            <button
              type="button"
              onClick={() => setReady(null)}
              className="mt-3 text-sm font-semibold text-brand transition hover:text-brand-deep"
            >
              Edit request
            </button>
          </div>
        ) : (
          <form onSubmit={submit} noValidate className="space-y-4">
            <p className="text-sm leading-relaxed text-muted">
              Tell us what you need. We confirm breed, weight, and price by phone. Nothing is charged on this page.
            </p>
            {lines.length > 0 ? (
              <div className="rounded-2xl bg-cream p-3 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-bold text-ink">Included from your list</p>
                  <button type="button" onClick={onEditList} className="text-xs font-bold tracking-wide text-brand uppercase">
                    Edit list
                  </button>
                </div>
                <ul className="mt-2 space-y-1 text-muted">
                  {lines.map((line) => (
                    <li key={line.id}>
                      {line.qty} × {line.name}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            <Field id="order-name" label="Full name" error={errors.name}>
              <input
                id="order-name"
                data-autofocus
                name="name"
                autoComplete="name"
                value={draft.name}
                aria-required="true"
                aria-invalid={errors.name ? true : undefined}
                aria-describedby={errors.name ? "order-name-error" : undefined}
                onChange={(event) => update("name", event.target.value)}
                className={fieldClass}
              />
            </Field>
            <Field id="order-phone" label="Phone" error={errors.phone}>
              <input
                id="order-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                value={draft.phone}
                aria-required="true"
                aria-invalid={errors.phone ? true : undefined}
                aria-describedby={errors.phone ? "order-phone-error" : undefined}
                onChange={(event) => update("phone", event.target.value)}
                className={fieldClass}
              />
            </Field>
            <Field id="order-interest" label="What do you need?" error={errors.interest}>
              <select
                id="order-interest"
                name="interest"
                value={draft.interest}
                aria-required="true"
                aria-invalid={errors.interest ? true : undefined}
                aria-describedby={errors.interest ? "order-interest-error" : undefined}
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
            </Field>
            <Field id="order-notes" label="Notes">
              <textarea
                id="order-notes"
                name="notes"
                rows={3}
                maxLength={400}
                value={draft.notes}
                placeholder="Preferred weight, breed, or delivery day"
                onChange={(event) => update("notes", event.target.value)}
                className={fieldClass}
              />
            </Field>
            <button type="submit" className={`${primaryButtonClass} w-full`}>
              Continue to WhatsApp checkout
            </button>
          </form>
        )}
      </div>
    </Panel>
  )
}

export function FarmStoryDialog({
  open,
  post,
  onClose,
}: {
  open: boolean
  post: FarmBlogPost | null
  onClose: () => void
}) {
  if (!post) return null

  return (
    <Panel open={open} onClose={onClose} title={post.title} titleId="farm-story-title" placement="center" size="lg">
      <div className="overflow-y-auto overscroll-contain px-5 py-4 sm:px-6" data-autofocus tabIndex={-1}>
        <p className="font-display text-[11px] font-semibold tracking-[0.18em] text-ochre uppercase">Farm story</p>
        <p className="mt-2 text-sm font-medium text-muted">{post.excerpt}</p>
        <img
          src={post.cover.src}
          alt={post.cover.alt}
          className="mt-5 aspect-[4/5] w-full object-cover sm:aspect-[16/10] sm:rounded-2xl"
        />
        <p className="mt-5 text-sm leading-relaxed text-ink/85 sm:text-[15px] sm:leading-relaxed">{post.body}</p>
        <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
          {post.gallery.map((image) => (
            <div key={image.src} className="overflow-hidden sm:rounded-2xl">
              <img src={image.src} alt={image.alt} loading="lazy" className="aspect-square w-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </Panel>
  )
}
