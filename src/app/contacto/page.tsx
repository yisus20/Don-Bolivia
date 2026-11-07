import type { Metadata } from 'next'
import { ArrowUpRight, MapPin, Clock, ShieldCheck } from 'lucide-react'
import { CONTACT_INFO } from '@/lib/data'
import { buildWhatsAppLinkGeneric } from '@/lib/whatsapp'

export const metadata: Metadata = {
  title: 'Contacto – Don Bolivia',
  description:
    'Contacta a Don Bolivia en Cochabamba, Bolivia. Atención directa por WhatsApp para consultas de precios, pruebas de sonido y envíos a todo el país.',
}

export default function ContactoPage() {
  const waLink = buildWhatsAppLinkGeneric()
  const mapsQueryUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${CONTACT_INFO.address}, ${CONTACT_INFO.city}, Bolivia`
  )}`

  return (
    <div className="lux-page">
      {/* 01 / Header Bordeaux Lacquer */}
      <section className="lux-page-hero bordeaux-lacquer" aria-label="Contacto Don Bolivia">
        <div className="db-grain-bordeaux" />
        <div className="lux-page-hero__inner">
          <span className="lux-eyebrow lux-eyebrow--light">ATENCIÓN PERSONALIZADA</span>
          <h1 className="lux-page-hero__title">Hablemos de tu próximo instrumento.</h1>
          <p className="lux-page-hero__sub">
            Sin formularios lentos ni respuestas automáticas. Escríbenos directamente por WhatsApp o
            visítanos en nuestra tienda en Cochabamba.
          </p>
        </div>
      </section>

      {/* 02 / Contact Cards & Location */}
      <section className="lux-curated-section">
        <div className="lux-curated-container">
          <div className="lux-contact-grid">
            {/* Card 1: Direct WhatsApp (Bordeaux Lacquer) */}
            <article className="lux-curated-card lux-curated-card--bordeaux bordeaux-lacquer">
              <div className="db-grain-bordeaux" />
              <div className="lux-curated-card__top">
                <span className="lux-curated-card__tag lux-curated-card__tag--light">
                  CANAL PRINCIPAL
                </span>
                <span className="lux-curated-card__count lux-curated-card__count--light">
                  Respuesta inmediata
                </span>
              </div>

              <div className="lux-curated-card__manifesto">
                <h2 className="lux-curated-card__manifesto-title">
                  Atención directa por WhatsApp.
                </h2>
                <p className="lux-curated-card__manifesto-copy">
                  Te asesoramos en vivo sobre stock real, comparativas de sonido entre modelos Sire
                  y Donner, precios del día y envíos asegurados a La Paz, Santa Cruz y todo el
                  país.
                </p>

                <ul className="lux-curated-card__checks">
                  <li>
                    <ShieldCheck size={15} />
                    <span>Asesoría real de músico a músico (sin bots)</span>
                  </li>
                  <li>
                    <Clock size={15} />
                    <span>Coordinación de pruebas de sonido en tienda</span>
                  </li>
                </ul>
              </div>

              <div className="lux-curated-card__footer lux-curated-card__footer--dark">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lux-btn-cream-sm"
                  id="contact-whatsapp-btn"
                >
                  <span>Iniciar conversación en WhatsApp</span>
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </article>

            {/* Card 2: Showroom Location in Cochabamba */}
            <article className="lux-curated-card lux-curated-card--light">
              <div className="lux-curated-card__top">
                <span className="lux-curated-card__tag">SHOWROOM &amp; TIENDA</span>
                <span className="lux-curated-card__count">Cochabamba, Bolivia</span>
              </div>

              <div className="lux-contact-location-body">
                <div className="lux-contact-address-block">
                  <div className="lux-contact-pin">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h2 className="lux-curated-card__title" style={{ marginBottom: '0.25rem' }}>
                      {CONTACT_INFO.address}
                    </h2>
                    <p className="lux-curated-card__desc">
                      {CONTACT_INFO.city}, {CONTACT_INFO.country} · Envíos diarios a todo el país
                    </p>
                  </div>
                </div>

                <div className="lux-contact-map-card">
                  <div className="lux-contact-map-card__inner">
                    <span className="lux-curated-card__tag">PUNTO DE ENCUENTRO</span>
                    <p className="lux-contact-map-card__text">
                      Agenda tu visita o pasa por nuestra tienda en la calle Buenos Aires casi
                      Tarija #1527 para probar bajos, guitarras, amplificadores y pedales en vivo.
                    </p>
                  </div>
                </div>
              </div>

              <div className="lux-curated-card__footer">
                <a
                  href={mapsQueryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lux-curated-card__link"
                  id="contact-maps-btn"
                >
                  <span>Abrir ubicación en Google Maps</span>
                  <ArrowUpRight size={15} />
                </a>

                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lux-curated-card__wa-pill"
                >
                  Agendar prueba
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  )
}
