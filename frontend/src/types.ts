export type OrderLine = {
  id: string
  name: string
  detail: string
  qty: number
}

export type CatalogItem = {
  id: string
  name: string
  detail: string
  /** Shop path for this product's category, e.g. /shop/pigs */
  href?: string
}

/** Shop categories map 1:1 to the three services cards; all open the same shop filtered by category (filter UI later). */
export type ShopCategoryId = "pigs" | "manure" | "regen"

export type ShopCategory = {
  id: ShopCategoryId
  label: string
  description: string
  href: string
}

/** How the product is priced at checkout request. */
export type ShopPricingMode = "per_kg" | "fixed"

export type ShopProduct = {
  id: string
  name: string
  detail: string
  image: string
  alt: string
  category: ShopCategoryId
  pricingMode: ShopPricingMode
  /** Unit price in RWF — per kg, or fixed per animal/item. */
  priceRwf: number
  /** Minimum kilograms the buyer can order (per_kg only). */
  minKg?: number
  reviews: number
}

export type SearchEntry = {
  href: string
  title: string
  text: string
}

export type RequestDraft = {
  name: string
  phone: string
  interest: string
  notes: string
}

export type AboutPanel = {
  id: string
  title: string
  text: string
  items?: readonly string[]
  image: { src: string; alt: string }
  href: string
  ctaLabel: string
}

export type ServiceCard = {
  id: string
  title: string
  /** Short pricing / buyer line shown on the card. */
  detail: string
  image: string
  alt: string
  href: string
  category: ShopCategoryId
}

export type ImpactTile =
  | {
      id: string
      kind: "image"
      image: string
      alt: string
    }
  | {
      id: string
      kind: "stat"
      value?: string
      label: string
      text?: string
      items?: readonly string[]
      href: string
      tone: "cream" | "gold"
      ctaLabel?: string
    }

export type FarmBlogPost = {
  id: string
  title: string
  excerpt: string
  body: string
  cover: { src: string; alt: string }
  gallery: readonly { src: string; alt: string }[]
}
