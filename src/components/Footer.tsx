'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MapPin } from 'lucide-react'
import { CONTACT_INFO } from '@/lib/data'
import { DonLogo } from '@/components/DonLogo'
import { useStoreInteractive } from '@/components/StoreInteractiveProvider'

export function Footer() {
  const pathname = usePathname()
  const { openWhatsApp } = useStoreInteractive()

  if (pathname.startsWith('/admin')) return null

  return (
    <footer className="lux-footer" role="contentinfo">
      <div className="lux-footer__inner">
        <div className="lux-footer__grid">
          {/* Col 1: DON Bass Logo */}
          <div className="lux-footer__col lux-footer__col--brand">
            <Link href="/" aria-label="Don Bolivia - Inicio">
              <DonLogo variant="white" />
            </Link>
            <p className="lux-footer__disclaimer">
              «Don Bolivia no se hace responsable por bandas que se disolvieron después de comprar
              instrumentos caros, ni por vecinos intolerantes a las frecuencias graves.»
            </p>
          </div>

          {/* Col 2: Navegación */}
          <div className="lux-footer__col">
            <h4 className="lux-footer__heading">Navegación</h4>
            <ul className="lux-footer__links">
              <li>
                <Link href="/" className="lux-footer__link">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/catalogo" className="lux-footer__link">
                  Catálogo
                </Link>
              </li>
              <li>
                <Link href="/nosotros" className="lux-footer__link">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="lux-footer__link">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Contacto */}
          <div className="lux-footer__col">
            <h4 className="lux-footer__heading">Contacto</h4>
            <div className="lux-footer__contact">
              <button
                type="button"
                onClick={() =>
                  openWhatsApp(
                    'Hola Don Bolivia, quisiera consultar por instrumentos disponibles en tienda.'
                  )
                }
                className="lux-footer__contact-item lux-footer__contact-btn"
              >
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ flexShrink: 0, marginTop: '2px' }}
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
                <span>Consultar por WhatsApp</span>
              </button>

              <div className="lux-footer__contact-item">
                <MapPin size={17} strokeWidth={1.75} style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>
                  {CONTACT_INFO.address}
                  <br />
                  {CONTACT_INFO.city}, {CONTACT_INFO.country}
                </span>
              </div>
            </div>
          </div>

          {/* Col 4: Síguenos */}
          <div className="lux-footer__col lux-footer__col--last">
            <h4 className="lux-footer__heading">Síguenos</h4>
            <div className="lux-footer__socials">
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="lux-footer__social-icon"
                aria-label="Instagram de Don Bolivia"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              {/* TikTok */}
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="lux-footer__social-icon"
                aria-label="TikTok de Don Bolivia"
              >
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </a>
              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="lux-footer__social-icon"
                aria-label="YouTube de Don Bolivia"
              >
                <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="lux-footer__bottom">
          <span>© 2026 DON BOLIVIA · SHOWROOM COCHABAMBA & ENVÍOS A TODA BOLIVIA</span>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="lux-footer__top-btn"
          >
            VOLVER ARRIBA ↑
          </button>
        </div>
      </div>
    </footer>
  )
}
