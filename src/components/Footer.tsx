'use client'

import Link from 'next/link'
import { CONTACT_INFO } from '@/lib/data'
import { buildWhatsAppLinkGeneric } from '@/lib/whatsapp'
import { MapPin, MessageCircle } from 'lucide-react'
import { useState, useEffect } from 'react'

export function Footer() {
  const waLink = buildWhatsAppLinkGeneric()
  const [year, setYear] = useState(2026)

  useEffect(() => {
    setYear(new Date().getFullYear())
  }, [])

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer__grid">
          {/* Brand */}
          <div>
            <div className="footer__logo">DON <span>BOLIVIA</span></div>
            <p className="footer__tagline">
              Instrumentos y accesorios musicales en Cochabamba. Para quienes se toman la música en serio.
            </p>
            <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
              <MapPin size={14} style={{ color: 'rgba(254,255,250,0.4)', marginTop: '2px', flexShrink: 0 }} />
              <span style={{ fontSize: '0.8125rem', color: 'rgba(254,255,250,0.5)', lineHeight: 1.5 }}>
                {CONTACT_INFO.address}<br />
                {CONTACT_INFO.city}, {CONTACT_INFO.country}
              </span>
            </div>
          </div>

          {/* Catálogo */}
          <div>
            <div className="footer__heading">Catálogo</div>
            <nav className="footer__links" aria-label="Links de catálogo">
              <Link href="/catalogo" className="footer__link">Todo el catálogo</Link>
              <Link href="/catalogo/bajos" className="footer__link">Bajos</Link>
              <Link href="/catalogo/guitarras" className="footer__link">Guitarras</Link>
              <Link href="/catalogo/pedales-efectos" className="footer__link">Pedales y efectos</Link>
              <Link href="/catalogo/accesorios" className="footer__link">Accesorios</Link>
              <Link href="/catalogo/otros-instrumentos" className="footer__link">Otros instrumentos</Link>
            </nav>
          </div>

          {/* Info */}
          <div>
            <div className="footer__heading">Don Bolivia</div>
            <nav className="footer__links" aria-label="Links informativos">
              <Link href="/nosotros" className="footer__link">Nosotros</Link>
              <Link href="/contacto" className="footer__link">Contacto</Link>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="footer__link"
                style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}
              >
                <MessageCircle size={14} />
                WhatsApp
              </a>
            </nav>
          </div>
        </div>

        <div className="footer__bottom">
          <span className="footer__copy">
            © {year} Don Bolivia · Cochabamba, Bolivia
          </span>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: '0.75rem', color: 'rgba(254,255,250,0.4)', textDecoration: 'none' }}
          >
            Consultas por WhatsApp
          </a>
        </div>
      </div>
    </footer>
  )
}
