import { useCallback, useEffect, useState } from "react"
import { AboutAccordion } from "./components/AboutAccordion.tsx"
import { AboutPage } from "./components/AboutPage.tsx"
import { CartDrawer } from "./components/SiteDialogs.tsx"
import { CheckoutPage } from "./components/CheckoutPage.tsx"
import { ContactSection } from "./components/ContactSection.tsx"
import { FarmLifePage } from "./components/FarmLifePage.tsx"
import { Header } from "./components/Header.tsx"
import { HeroWithBookingBar } from "./components/HeroWithBookingBar.tsx"
import { ImpactStrip } from "./components/ImpactStrip.tsx"
import { ProductsBlogContact } from "./components/ProductsBlogContact.tsx"
import { ServicesOccasionsGrid } from "./components/ServicesOccasionsGrid.tsx"
import { ShopSection } from "./components/ShopSection.tsx"
import { SiteFooter } from "./components/SiteFooter.tsx"
import { StoryPage } from "./components/StoryPage.tsx"
import { useScrollLock } from "./hooks.ts"
import {
  goToView,
  migrateLegacyHashRoute,
  shopCategoryFromPath,
  viewFromPath,
  type AppView,
  type ShopCategoryParam,
} from "./navigation.ts"
import type { CatalogItem, OrderLine } from "./types.ts"

function syncRoute(
  setView: (view: AppView) => void,
  setShopCategory: (category: ShopCategoryParam) => void,
) {
  migrateLegacyHashRoute()
  setView(viewFromPath())
  setShopCategory(shopCategoryFromPath())
  window.scrollTo(0, 0)
}

export default function App() {
  const [view, setView] = useState<AppView>(() => {
    migrateLegacyHashRoute()
    return viewFromPath()
  })
  const [shopCategory, setShopCategory] = useState<ShopCategoryParam>(() => shopCategoryFromPath())
  const [cartOpen, setCartOpen] = useState(false)
  const [lines, setLines] = useState<OrderLine[]>([])

  useScrollLock(cartOpen)

  useEffect(() => {
    function onNavigate() {
      syncRoute(setView, setShopCategory)
    }
    window.addEventListener("popstate", onNavigate)
    window.addEventListener("app:navigation", onNavigate)
    return () => {
      window.removeEventListener("popstate", onNavigate)
      window.removeEventListener("app:navigation", onNavigate)
    }
  }, [])

  const closeCart = useCallback(() => setCartOpen(false), [])

  const openCart = useCallback(() => {
    setCartOpen(true)
  }, [])

  const openCheckout = useCallback(() => {
    setCartOpen(false)
    goToView("checkout")
  }, [])

  const openFullShop = useCallback(() => {
    setCartOpen(false)
    goToView("shop")
  }, [])

  const openContactPage = useCallback(() => {
    setCartOpen(false)
    goToView("contact")
  }, [])

  const openAboutPage = useCallback(() => {
    setCartOpen(false)
    goToView("about")
  }, [])

  const addItem = useCallback((item: CatalogItem, qty = 1) => {
    const amount = Math.max(1, Math.min(qty, 5000))
    setLines((current) => {
      const found = current.find((line) => line.id === item.id)
      if (!found) return [...current, { ...item, qty: amount }]
      return current.map((line) =>
        line.id === item.id ? { ...line, qty: Math.min(line.qty + amount, 5000) } : line,
      )
    })
    setCartOpen(true)
  }, [])

  const changeQty = useCallback((id: string, nextQty: number) => {
    setLines((current) => {
      if (nextQty <= 0) return current.filter((line) => line.id !== id)
      return current.map((line) => (line.id === id ? { ...line, qty: Math.min(nextQty, 5000) } : line))
    })
  }, [])

  const cartCount = lines.reduce((sum, line) => sum + line.qty, 0)

  return (
    <>
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-md focus:bg-white focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <div className="min-h-screen bg-canvas text-ink">
        <Header
          cartCount={cartCount}
          onCart={openCart}
          onGetInTouch={openContactPage}
          onGoHome={() => goToView("home")}
        />
        <main>
          {view === "home" ? (
            <>
              <HeroWithBookingBar />
              <ImpactStrip />
              <AboutAccordion />
              <ServicesOccasionsGrid onBrowseAll={openFullShop} />
              <ProductsBlogContact onAdd={addItem} onOpenFullShop={openFullShop} onOpenCheckout={openCheckout} />
            </>
          ) : null}

          {view === "about" ? <AboutPage /> : null}

          {view === "story" ? <StoryPage /> : null}

          {view === "farm-life" ? <FarmLifePage /> : null}

          {view === "shop" ? (
            <>
              <ShopSection onAdd={addItem} variant="full" category={shopCategory} />
              <ContactSection variant="section" onOpenCheckout={openCheckout} />
            </>
          ) : null}

          {view === "checkout" ? <CheckoutPage lines={lines} onEditCart={openCart} /> : null}

          {view === "contact" ? <ContactSection variant="page" onOpenCheckout={openCheckout} /> : null}
        </main>
        <SiteFooter
          onOpenShop={openFullShop}
          onOpenContact={openContactPage}
          onOpenAbout={openAboutPage}
          onOpenStory={() => goToView("story")}
          onOpenFarmLife={() => goToView("farm-life")}
        />
      </div>
      <CartDrawer
        open={cartOpen}
        onClose={closeCart}
        lines={lines}
        onChangeQty={changeQty}
        onRequest={openCheckout}
      />
    </>
  )
}
