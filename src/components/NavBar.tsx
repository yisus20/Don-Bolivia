'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Search, Menu, X } from 'lucide-react'
import { DonLogo } from '@/components/DonLogo'
import { useStoreInteractive } from '@/components/StoreInteractiveProvider'

export function NavBar() {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isOverHero, setIsOverHero] = useState(true)
  const { openWhatsApp } = useStoreInteractive()

  useEffect(() => {
    setMobileOpen(false)
    setSearchOpen(false)
  }, [pathname])

  useEffect(() => {
    if (pathname !== '/') {
      setIsOverHero(false)
      return
    }
    const checkScroll = () => {
      const heroThreshold = window.innerHeight - 85
      setIsOverHero(window.scrollY < heroThreshold)
    }
    checkScroll()
    window.addEventListener('scroll', checkScroll, { passive: true })
    window.addEventListener('resize', checkScroll)
    return () => {
      window.removeEventListener('scroll', checkScroll)
      window.removeEventListener('resize', checkScroll)
    }
  }, [pathname])

  if (pathname.startsWith('/admin')) return null

  const isHomeHeroOverlay = pathname === '/' && isOverHero && !mobileOpen && !searchOpen

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/catalogo?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
    } else {
      router.push('/catalogo')
      setSearchOpen(false)
    }
  }

  return (
    <header
      className={`lux-header ${pathname === '/' ? 'lux-header--home' : ''} ${
        isHomeHeroOverlay ? 'lux-header--over-hero' : ''
      }`}
      role="navigation"
      aria-label="Navegación principal"
    >
      <div className="lux-header__inner">
        {/* Left Navigation: Inicio · Catálogo · Nosotros */}
        <nav className="lux-header__left" aria-label="Menú principal izquierdo">
          <Link
            href="/"
            className={`lux-nav-link ${pathname === '/' ? 'lux-nav-link--active' : ''}`}
          >
            Inicio
          </Link>
          <Link
            href="/catalogo"
            className={`lux-nav-link ${pathname.startsWith('/catalogo') || pathname.startsWith('/producto') ? 'lux-nav-link--active' : ''}`}
          >
            Catálogo
          </Link>
          <Link
            href="/nosotros"
            className={`lux-nav-link ${pathname.startsWith('/nosotros') ? 'lux-nav-link--active' : ''}`}
          >
            Nosotros
          </Link>
        </nav>

        {/* Center Logo: DON Bass Headstock */}
        <Link href="/" className="lux-header__logo" aria-label="Don Bolivia - Inicio">
          <DonLogo variant={isHomeHeroOverlay ? 'white' : 'bordeaux'} />
        </Link>

        {/* Right Navigation: Contacto · Search · Divider · WhatsApp */}
        <div className="lux-header__right">
          <Link
            href="/contacto"
            className={`lux-nav-link lux-hide-mobile ${pathname.startsWith('/contacto') ? 'lux-nav-link--active' : ''}`}
          >
            Contacto
          </Link>

          <button
            type="button"
            onClick={() => setSearchOpen(prev => !prev)}
            className="lux-icon-btn"
            aria-label="Buscar instrumentos"
            title="Buscar en el catálogo"
          >
            <Search size={20} strokeWidth={1.75} />
          </button>

          <span className="lux-header__divider" aria-hidden="true" />

          <button
            type="button"
            onClick={() =>
              openWhatsApp(
                'Hola Don Bolivia, vengo desde la web y quisiera consultar por instrumentos disponibles.'
              )
            }
            className="lux-icon-btn"
            aria-label="Contactar por WhatsApp"
            title="Consultar por WhatsApp"
            id="nav-whatsapp-desktop"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen(prev => !prev)}
            className="lux-icon-btn lux-mobile-toggle"
            aria-label="Abrir menú"
            aria-expanded={mobileOpen}
            id="nav-menu-toggle"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Expandable Minimal Search Bar */}
      {searchOpen && (
        <div className="lux-search-drawer">
          <form onSubmit={handleSearchSubmit} className="lux-search-drawer__form">
            <Search size={18} style={{ color: '#8A8680' }} />
            <input
              type="search"
              placeholder="Buscar bajos Sire, guitarras Larry Carlton, pedales Donner..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="lux-search-drawer__input"
              autoFocus
            />
            <button type="submit" className="lux-search-drawer__submit">
              Buscar ↗
            </button>
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              className="lux-search-drawer__close"
              aria-label="Cerrar búsqueda"
            >
              ✕
            </button>
          </form>
        </div>
      )}

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="lux-mobile-drawer">
          <nav className="lux-mobile-drawer__nav">
            <Link href="/" className="lux-mobile-drawer__link">
              Inicio
            </Link>
            <Link href="/catalogo" className="lux-mobile-drawer__link">
              Catálogo
            </Link>
            <Link href="/catalogo/bajos" className="lux-mobile-drawer__sublink">
              — Bajos Sire Marcus Miller
            </Link>
            <Link href="/catalogo/guitarras" className="lux-mobile-drawer__sublink">
              — Guitarras Larry Carlton & Donner
            </Link>
            <Link href="/catalogo/pedales-efectos" className="lux-mobile-drawer__sublink">
              — Pedales y efectos
            </Link>
            <Link href="/catalogo/accesorios" className="lux-mobile-drawer__sublink">
              — Accesorios y cuerdas Magma
            </Link>
            <Link href="/nosotros" className="lux-mobile-drawer__link">
              Nosotros
            </Link>
            <Link href="/contacto" className="lux-mobile-drawer__link">
              Contacto
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
