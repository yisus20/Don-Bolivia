import type { Metadata } from 'next'
import { MessageCircle, MapPin, ExternalLink } from 'lucide-react'
import { CONTACT_INFO } from '@/lib/data'
import { buildWhatsAppLinkGeneric } from '@/lib/whatsapp'

export const metadata: Metadata = {
  title: 'Contacto – Don Bolivia',
  description: 'Contacta a Don Bolivia en Cochabamba, Bolivia. WhatsApp disponible para consultas de precios y disponibilidad.',
}

export default function ContactoPage() {
  const waLink = buildWhatsAppLinkGeneric()

  return (
    <>
      <div style={{ borderBottom: '1px solid var(--color-gray-200)', padding: 'clamp(2rem, 4vw, 3.5rem) 0', background: 'white' }}>
        <div className="container">
          <span style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-red)', display: 'block', marginBottom: '0.5rem' }}>
            Contacto
          </span>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, letterSpacing: '-0.035em', marginBottom: '0.5rem' }}>
            Hablemos.
          </h1>
          <p style={{ fontSize: '1.0625rem', color: 'var(--color-gray-500)' }}>
            La forma más rápida es por WhatsApp. Sin formularios ni tiempos de espera.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem' }}>
            <style>{`@media(min-width:768px){#contact-grid{grid-template-columns:1fr 1fr;}}`}</style>
            <div id="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem' }}>

              {/* Contact info */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {/* WhatsApp card */}
                <div
                  style={{
                    border: '1px solid var(--color-gray-200)',
                    borderRadius: '8px',
                    padding: '2rem',
                    background: 'white',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <div style={{ width: '40px', height: '40px', background: '#DCF8C6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <MessageCircle size={20} color="#25D366" />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '1rem' }}>WhatsApp</div>
                      <div style={{ fontSize: '0.8125rem', color: 'var(--color-gray-500)' }}>Canal principal de consultas</div>
                    </div>
                  </div>
                  <p style={{ fontSize: '0.9375rem', color: 'var(--color-gray-600)', lineHeight: 1.65, marginBottom: '1.25rem' }}>
                    Escríbenos directamente por WhatsApp para consultar precios, disponibilidad
                    o cualquier duda sobre nuestros productos. Respondemos lo antes posible.
                  </p>
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp btn-lg"
                    style={{ width: '100%', justifyContent: 'center' }}
                    id="contact-whatsapp-btn"
                  >
                    <MessageCircle size={20} />
                    Abrir WhatsApp
                  </a>
                </div>

                {/* Address card */}
                <div
                  style={{
                    border: '1px solid var(--color-gray-200)',
                    borderRadius: '8px',
                    padding: '2rem',
                    background: 'white',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <div style={{ width: '40px', height: '40px', background: 'var(--color-gray-100)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <MapPin size={20} color="var(--color-gray-500)" />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '1rem' }}>Ubicación</div>
                      <div style={{ fontSize: '0.8125rem', color: 'var(--color-gray-500)' }}>Don Bolivia</div>
                    </div>
                  </div>
                  <p style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--color-text)', marginBottom: '0.25rem' }}>
                    {CONTACT_INFO.address}
                  </p>
                  <p style={{ fontSize: '0.9375rem', color: 'var(--color-gray-500)', marginBottom: '1.25rem' }}>
                    {CONTACT_INFO.city}, {CONTACT_INFO.country}
                  </p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${CONTACT_INFO.address}, ${CONTACT_INFO.city}, Bolivia`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-sm"
                    id="contact-maps-btn"
                  >
                    <ExternalLink size={14} />
                    Ver en Google Maps
                  </a>
                </div>
              </div>

              {/* Map embed */}
              <div>
                <div
                  style={{
                    border: '1px solid var(--color-gray-200)',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    height: '100%',
                    minHeight: '350px',
                    background: 'var(--color-gray-100)',
                  }}
                >
                  <iframe
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyD-placeholder&q=${encodeURIComponent(`Buenos Aires casi Tarija 1527, Cochabamba, Bolivia`)}`}
                    width="100%"
                    height="100%"
                    style={{ border: 0, display: 'block', minHeight: '350px' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ubicación de Don Bolivia en Cochabamba"
                    aria-label="Mapa de ubicación de Don Bolivia"
                  />
                  {/* Fallback if map doesn't load */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '350px',
                      flexDirection: 'column',
                      gap: '1rem',
                      color: 'var(--color-gray-500)',
                    }}
                  >
                    <MapPin size={32} />
                    <div style={{ textAlign: 'center' }}>
                      <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Buenos Aires casi Tarija #1527</p>
                      <p style={{ fontSize: '0.875rem' }}>Cochabamba, Bolivia</p>
                    </div>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Buenos Aires casi Tarija 1527, Cochabamba, Bolivia')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary btn-sm"
                    >
                      <ExternalLink size={14} />
                      Abrir en Google Maps
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Note */}
      <section style={{ paddingBottom: '4rem' }}>
        <div className="container">
          <div
            style={{
              background: 'var(--color-gray-100)',
              border: '1px solid var(--color-gray-200)',
              borderRadius: '4px',
              padding: '1.25rem 1.5rem',
              fontSize: '0.875rem',
              color: 'var(--color-gray-500)',
              lineHeight: 1.6,
              maxWidth: '600px',
            }}
          >
            <strong style={{ color: 'var(--color-text)' }}>Nota:</strong> Toda la información de precios y disponibilidad
            debe confirmarse directamente por WhatsApp. Las consultas por esa vía son la forma
            más confiable y directa de obtener información actualizada.
          </div>
        </div>
      </section>
    </>
  )
}
