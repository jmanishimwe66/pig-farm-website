import type { CatalogItem } from "../types.ts"
import { ContactSection } from "./ContactSection.tsx"
import { FarmLife } from "./FarmLife.tsx"
import { ShopSection } from "./ShopSection.tsx"

type ProductsBlogContactProps = {
  onAdd: (item: CatalogItem, qty?: number) => void
  onOpenFullShop: () => void
  onOpenCheckout: () => void
}

export function ProductsBlogContact({ onAdd, onOpenFullShop, onOpenCheckout }: ProductsBlogContactProps) {
  return (
    <>
      <ShopSection onAdd={onAdd} variant="landing" onOpenFullShop={onOpenFullShop} />
      <FarmLife />
      <ContactSection variant="section" onOpenCheckout={onOpenCheckout} />
    </>
  )
}
