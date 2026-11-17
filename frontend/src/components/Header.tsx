import { useEffect, useState, type ReactNode } from "react"
import Menu from "lucide-react/icons/menu"
import X from "lucide-react/icons/x"
import { navItems } from "../data.ts"
import { useActiveSection } from "../hooks.ts"
import { goToContactSection, goToView, isAppRoute, navigateHref, viewFromPath } from "../navigation.ts"
import { LogoMark } from "./Icons.tsx"

type HeaderProps = {
  onGetInTouch: () => void
  onGoHome?: () => void
}

function Logo({ onNavigate }: { onNavigate: () => void }) {
  return (
    <a
      href="/"
      onClick={(event) => {
        event.preventDefault()
        onNavigate()
      }}
      className="flex shrink-0 items-center gap-2.5"
    >
      <span className="grid h-11 w-11 place-items-center rounded-full bg-brand text-white shadow-sm">
        <LogoMark />
      </span>
      <span className="leading-none">
        <span className="block font-display text-lg font-bold tracking-wide text-ink uppercase">Strong</span>
        <span className="mt-0.5 block text-[10px] font-semibold tracking-[0.2em] text-brand uppercase">Livestock</span>
      </span>
    </a>
  )
}

function IconButton({
  label,
  onClick,
  children,
  badge = 0,
  className = "",
  expanded,
  controls,
}: {
  label: string
  onClick: () => void
  children: ReactNode
  badge?: number
  className?: string
  expanded?: boolean
  controls?: string
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-expanded={expanded}
      aria-controls={controls}
      onClick={onClick}
      className={`relative grid h-10 w-10 place-items-center rounded-full text-ink transition duration-300 hover:bg-canvas hover:text-brand ${className}`}
    >
      {children}
      {badge > 0 ? (
        <span className="absolute -top-0.5 -right-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-brand px-1 text-[10px] font-bold text-white">
          {badge}
        </span>
      ) : null}
    </button>
  )
}

function useActiveNavId(sectionId: string) {
  const [pageView, setPageView] = useState(() => viewFromPath())

  useEffect(() => {
    function onNavigate() {
      setPageView(viewFromPath())
    }
    window.addEventListener("popstate", onNavigate)
    window.addEventListener("app:navigation", onNavigate)
    return () => {
      window.removeEventListener("popstate", onNavigate)
      window.removeEventListener("app:navigation", onNavigate)
    }
  }, [])

  if (pageView === "about" || pageView === "story") return "about"
  if (pageView === "farm-life") return "farm-life"
  if (pageView === "shop" || pageView === "checkout") return "shop"
  if (sectionId === "farm-life") return "farm-life"
  if (sectionId === "shop") return "shop"
  return "home"
}

export function Header({ onGetInTouch, onGoHome }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const sectionId = useActiveSection()
  const active = useActiveNavId(sectionId)

  function closeMenu() {
    setMenuOpen(false)
  }

  function handleSectionNav(href: string) {
    closeMenu()
    if (href === "#contact" || href === "/#contact") {
      goToContactSection()
      return
    }
    if (isAppRoute(href)) {
      navigateHref(href)
      return
    }
    onGoHome?.()
    window.setTimeout(() => {
      window.location.hash = href.replace(/^#/, "")
    }, 0)
  }

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface shadow-sm">
      <div className="relative mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 sm:px-6 lg:px-8">
        <Logo
          onNavigate={() => {
            closeMenu()
            onGoHome?.()
            goToView("home")
          }}
        />
        <nav
          className="pointer-events-none absolute left-1/2 hidden -translate-x-1/2 items-center gap-0.5 md:flex"
          aria-label="Primary"
        >
          {navItems.map((item) => {
            const current = active === item.id
            return (
              <a
                key={item.id}
                href={item.href}
                aria-current={current ? "page" : undefined}
                onClick={(event) => {
                  event.preventDefault()
                  handleSectionNav(item.href)
                }}
                className={`pointer-events-auto rounded-full px-3 py-1.5 font-display text-[11px] font-semibold tracking-[0.12em] uppercase transition duration-300 ${
                  current ? "bg-brand text-white" : "text-ink hover:text-brand"
                }`}
              >
                {item.label}
              </a>
            )
          })}
        </nav>
        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            onClick={onGetInTouch}
            className="rounded-full bg-brand px-4 py-2.5 font-display text-[11px] font-semibold tracking-[0.12em] text-white uppercase transition duration-300 hover:bg-brand-deep sm:px-5"
          >
            Get in touch
          </button>
          <IconButton
            label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
            expanded={menuOpen}
            controls="mobile-menu"
            className="md:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </IconButton>
        </div>
      </div>
      {menuOpen ? (
        <div id="mobile-menu" className="border-t border-line px-4 py-3 md:hidden">
          <nav className="flex flex-col" aria-label="Mobile">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(event) => {
                  event.preventDefault()
                  handleSectionNav(item.href)
                }}
                className="rounded-lg px-2 py-3 text-sm font-bold tracking-[0.12em] text-ink uppercase transition duration-300 hover:bg-canvas hover:text-brand"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  )
}
