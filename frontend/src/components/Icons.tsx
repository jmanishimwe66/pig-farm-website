export function LogoMark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <ellipse cx="18" cy="26" rx="7" ry="9" fill="currentColor" transform="rotate(-24 18 26)" />
      <ellipse cx="46" cy="26" rx="7" ry="9" fill="currentColor" transform="rotate(24 46 26)" />
      <circle cx="32" cy="36" r="15" fill="currentColor" />
      <ellipse cx="32" cy="44" rx="9" ry="7" fill="#ffd7d4" />
      <circle cx="29" cy="44" r="1.4" fill="#c45b66" />
      <circle cx="35" cy="44" r="1.4" fill="#c45b66" />
      <circle cx="26.5" cy="34" r="1.6" fill="#5c3b34" />
      <circle cx="37.5" cy="34" r="1.6" fill="#5c3b34" />
    </svg>
  )
}
