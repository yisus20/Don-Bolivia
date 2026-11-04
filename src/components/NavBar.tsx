'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, ShoppingBag } from 'lucide-react'
import { buildWhatsAppLinkGeneric } from '@/lib/whatsapp'

const NAV_LINKS = [
  { href: '/', label: 'Inicio' },
  { href: '/catalogo', label: 'Catálogo' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/contacto', label: 'Contacto' },
]

export function NavBar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const waLink = buildWhatsAppLinkGeneric()

  // Don't show public nav for admin
  if (pathname.startsWith('/admin')) return null

  return (
    <nav className="nav" role="navigation" aria-label="Navegación principal">
      <div className="nav__inner">
        {/* Logo */}
        <Link href="/" className="nav__logo" aria-label="Don Bolivia - Inicio">
          DON <span>BOLIVIA</span>
        </Link>

        {/* Desktop links */}
        <div className="nav__links" role="menubar">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav__link ${pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href)) ? 'nav__link--active' : ''}`}
              role="menuitem"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="nav__actions">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp btn-sm"
            aria-label="Contactar por WhatsApp"
            style={{ display: 'none' }}
            id="nav-whatsapp-desktop"
          >
            WhatsApp
          </a>
          <style>{`@media(min-width:768px){#nav-whatsapp-desktop{display:inline-flex;}}`}</style>

          {/* Mobile menu toggle */}
          <button
            className="btn-ghost"
            style={{ display: 'flex', padding: '0.5rem' }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label="Abrir menú"
            id="nav-menu-toggle"
          >
            <style>{`@media(min-width:768px){#nav-menu-toggle{display:none!important;}}`}</style>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '64px',
            left: 0,
            right: 0,
            background: 'var(--color-bg)',
            borderBottom: '1px solid var(--color-gray-200)',
            padding: '1rem 1.5rem 1.5rem',
            zIndex: 99,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.25rem',
          }}
          role="menu"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                padding: '0.75rem 0',
                fontSize: '1rem',
                fontWeight: 500,
                color: pathname === link.href ? 'var(--color-red)' : 'var(--color-text)',
                borderBottom: '1px solid var(--color-gray-100)',
                textDecoration: 'none',
              }}
              role="menuitem"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp btn-lg"
            style={{ marginTop: '1rem', justifyContent: 'center' }}
            onClick={() => setMenuOpen(false)}
          >
            Consultar por WhatsApp
          </a>
        </div>
      )}
    </nav>
  )
}
