import type { Metadata } from 'next'
import { CatalogClient } from '@/components/CatalogClient'

export const metadata: Metadata = {
  title: 'Catálogo – Instrumentos y accesorios musicales',
  description: 'Explora todo el catálogo de Don Bolivia. Bajos, guitarras, pedales, accesorios y más. Consulta por WhatsApp.',
}

export default function CatalogPage() {
  return (
    <>
      <div
        style={{
          borderBottom: '1px solid var(--color-gray-200)',
          padding: '2.5rem 0 2rem',
          background: 'white',
        }}
      >
        <div className="container">
          <span
            style={{
              fontSize: '0.6875rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-red)',
              display: 'block',
              marginBottom: '0.5rem',
            }}
          >
            Catálogo 2025–2026
          </span>
          <h1
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 900,
              letterSpacing: '-0.035em',
              marginBottom: '0.625rem',
            }}
          >
            Instrumentos y accesorios
          </h1>
          <p style={{ fontSize: '1.0625rem', color: 'var(--color-gray-500)', maxWidth: '520px' }}>
            Bajos, guitarras, pedales y más. Consulta precios y disponibilidad directamente por WhatsApp.
          </p>
        </div>
      </div>
      <CatalogClient />
    </>
  )
}
