export type AppView = "home" | "about" | "story" | "farm-life" | "shop" | "checkout"

export type ShopCategoryParam = "pigs" | "manure" | "regen" | null

function normalizePath(pathname = window.location.pathname): string {
  const trimmed = pathname.replace(/\/+$/, "") || "/"
  return trimmed
}

/** Migrate old hash routes (#/farm-life) to real paths (/farm-life). */
export function migrateLegacyHashRoute() {
  const hash = window.location.hash
  if (!hash.startsWith("#/")) return
  const path = hash.slice(1)
  window.history.replaceState(null, "", path)
}

export function viewFromPath(pathname = window.location.pathname): AppView {
  const value = normalizePath(pathname)
  if (value === "/about") return "about"
  if (value === "/story") return "story"
  if (value === "/farm-life") return "farm-life"
  if (value === "/checkout") return "checkout"
  if (value === "/contact") return "home"
  if (value === "/shop" || value.startsWith("/shop/")) return "shop"
  return "home"
}

/** Reserved for shop category filtering after design: /shop/pigs | /shop/manure | /shop/regen */
export function shopCategoryFromPath(pathname = window.location.pathname): ShopCategoryParam {
  const value = normalizePath(pathname)
  const match = value.match(/^\/shop\/(pigs|manure|regen)$/)
  return match ? (match[1] as ShopCategoryParam) : null
}

export function pathForView(view: AppView, shopCategory?: ShopCategoryParam): string {
  if (view === "about") return "/about"
  if (view === "story") return "/story"
  if (view === "farm-life") return "/farm-life"
  if (view === "shop") return shopCategory ? `/shop/${shopCategory}` : "/shop"
  if (view === "checkout") return "/checkout"
  return "/"
}

export function goToContactSection() {
  const onHome = viewFromPath() === "home"
  if (!onHome) {
    goToView("home")
  }
  window.setTimeout(() => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" })
    if (normalizePath(window.location.pathname) !== "/" || window.location.hash !== "#contact") {
      window.history.replaceState(null, "", "/#contact")
    }
  }, onHome ? 0 : 100)
}

export function goToView(view: AppView, shopCategory?: ShopCategoryParam) {
  const path = pathForView(view, shopCategory)
  if (normalizePath(window.location.pathname) === path && !window.location.hash) {
    window.scrollTo(0, 0)
    window.dispatchEvent(new Event("app:navigation"))
    return
  }
  window.history.pushState(null, "", path)
  window.dispatchEvent(new Event("app:navigation"))
}

/** Page routes like /about or legacy #/about */
export function isAppRoute(href: string): boolean {
  if (href.startsWith("#/")) return true
  if (!href.startsWith("/")) return false
  return href === "/" || /^\/(about|story|farm-life|shop|checkout|contact)(\/|$)/.test(href)
}

/** @deprecated use isAppRoute */
export function isPageHash(href: string): boolean {
  return isAppRoute(href)
}

export function navigateHref(href: string) {
  if (href === "/contact" || href === "/#contact" || href === "#contact") {
    goToContactSection()
    return
  }
  if (href.startsWith("#/")) {
    window.history.pushState(null, "", href.slice(1))
    window.dispatchEvent(new Event("app:navigation"))
    return
  }
  if (isAppRoute(href)) {
    window.history.pushState(null, "", href)
    window.dispatchEvent(new Event("app:navigation"))
    return
  }
  window.location.hash = href.replace(/^#/, "")
}
