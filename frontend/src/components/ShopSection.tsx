import { useState } from "react"
import { featuredShopProducts, shopCategories, shopIntro, shopProducts } from "../data.ts"
import type { CatalogItem, ShopCategoryId, ShopProduct } from "../types.ts"
import { primaryButtonClass, secondaryButtonClass } from "../ui.ts"

type ShopSectionProps = {
  onAdd: (item: CatalogItem, qty?: number) => void
  /** Landing shows 3 featured products; full shop shows the complete catalog. */
  variant?: "landing" | "full"
  onOpenFullShop?: () => void
  /** Category from /shop/:id — filtering UI comes after design; all products still shown. */
  category?: ShopCategoryId | null
}

function formatRwf(amount: number) {
  return `${amount.toLocaleString("en-US")} RWF`
}

function ProductCard({
  product,
  onAdd,
}: {
  product: ShopProduct
  onAdd: (item: CatalogItem, qty?: number) => void
}) {
  const isPerKg = product.pricingMode === "per_kg"
  const minKg = product.minKg ?? 1
  const [kg, setKg] = useState(String(minKg))
  const [qty, setQty] = useState(1)

  const kgValue = Number.parseInt(kg, 10)
  const kgValid = Number.isFinite(kgValue) && kgValue >= minKg

  function handleAdd() {
    if (isPerKg) {
      if (!kgValid) return
      onAdd(
        {
          id: product.id,
          name: product.name,
          detail: `${formatRwf(product.priceRwf)} per kg · ${kgValue} kg`,
        },
        kgValue,
      )
      return
    }
    onAdd(
      {
        id: product.id,
        name: product.name,
        detail: formatRwf(product.priceRwf),
      },
      qty,
    )
  }

  return (
    <article className="flex flex-col text-center">
      <div className="overflow-hidden rounded-3xl bg-cream shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl">
        <img
          src={product.image}
          alt={product.alt}
          loading="lazy"
          className="aspect-[3/4] h-auto w-full object-cover"
        />
      </div>
      <h3 className="mt-4 font-display text-base font-bold tracking-wide text-ink">{product.name}</h3>
      <p className="mt-2 text-sm font-semibold text-ink">
        {isPerKg ? `${formatRwf(product.priceRwf)} per kg` : formatRwf(product.priceRwf)}
      </p>
      <div className="mt-3">
        {isPerKg ? (
          <>
            <label className="sr-only" htmlFor={`kg-${product.id}`}>
              Kilograms of {product.name} (minimum {minKg} kg)
            </label>
            <input
              id={`kg-${product.id}`}
              type="number"
              inputMode="numeric"
              min={minKg}
              step={1}
              value={kg}
              onChange={(event) => setKg(event.target.value)}
              placeholder={`Min ${minKg} kg`}
              className="h-11 w-full rounded-full border border-line bg-surface px-4 text-center text-sm text-ink focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/20"
            />
          </>
        ) : (
          <div className="flex h-11 items-center overflow-hidden rounded-full border border-line bg-surface">
            <button
              type="button"
              aria-label={`Decrease quantity of ${product.name}`}
              onClick={() => setQty((value) => Math.max(1, value - 1))}
              className="grid h-11 w-11 place-items-center text-ink transition hover:bg-cream"
            >
              −
            </button>
            <span className="flex-1 text-sm font-semibold tabular-nums" aria-live="polite">
              {qty}
            </span>
            <button
              type="button"
              aria-label={`Increase quantity of ${product.name}`}
              onClick={() => setQty((value) => Math.min(99, value + 1))}
              className="grid h-11 w-11 place-items-center text-ink transition hover:bg-cream"
            >
              +
            </button>
          </div>
        )}
        <p className={`mt-1.5 min-h-4 text-xs ${isPerKg ? "text-muted" : "invisible"}`} aria-hidden={!isPerKg}>
          {isPerKg ? `Minimum ${minKg} kg` : "Minimum"}
        </p>
      </div>
      <button
        type="button"
        onClick={handleAdd}
        disabled={isPerKg && !kgValid}
        className={`${primaryButtonClass} mt-3 w-full px-5 py-2.5 shadow-[0_6px_16px_rgba(23,61,43,0.22)] disabled:cursor-not-allowed disabled:opacity-50`}
      >
        Add
      </button>
    </article>
  )
}

export function ShopSection({ onAdd, variant = "landing", onOpenFullShop, category = null }: ShopSectionProps) {
  const products = variant === "full" ? shopProducts : featuredShopProducts
  const isFull = variant === "full"
  const activeCategory = shopCategories.find((entry) => entry.id === category) ?? null
  const heroTitle = activeCategory?.label ?? shopIntro.pageTitle
  const heroParagraphs = activeCategory
    ? [activeCategory.description, ...shopIntro.pageParagraphs]
    : shopIntro.pageParagraphs

  if (isFull) {
    return (
      <div id="shop-page" className="bg-canvas">
        <section className="w-full">
          <div className="mx-auto flex min-h-[calc(100dvh-4.5rem)] w-full max-w-7xl items-center px-4 py-16 sm:min-h-[calc(100dvh-5rem)] sm:px-6 sm:py-20 lg:px-8 lg:py-24">
            <div className="grid w-full items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] lg:gap-20 xl:gap-28">
              <h1 className="font-display text-4xl font-bold tracking-tight text-brand sm:text-5xl lg:text-[3.5rem] lg:leading-[1.1]">
                {heroTitle}
              </h1>
              <div className="mt-10 space-y-6 sm:mt-14 sm:space-y-8 lg:mt-20">
                {heroParagraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="max-w-xl text-base leading-[1.75] text-brand sm:text-lg sm:leading-[1.8]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-line px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} onAdd={onAdd} />
            ))}
          </div>
        </section>
      </div>
    )
  }

  return (
    <section id="shop" className="scroll-mt-24 bg-surface px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,2.1fr)] lg:items-start lg:gap-12">
        <div className="max-w-sm lg:pt-2">
          <h2 className="font-display text-3xl font-bold tracking-wide text-ink uppercase sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
            {shopIntro.title}
          </h2>
          <button type="button" onClick={onOpenFullShop} className={`${secondaryButtonClass} mt-6`}>
            {shopIntro.ctaLabel}
          </button>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onAdd={onAdd} />
          ))}
        </div>
      </div>
    </section>
  )
}
