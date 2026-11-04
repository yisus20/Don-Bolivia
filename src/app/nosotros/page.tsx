import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { buildWhatsAppLinkGeneric } from '@/lib/whatsapp'
import { STATIC_BRANDS, STATIC_CATEGORIES, STATIC_PRODUCTS } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Nosotros – Don Bolivia',
  description: 'Conoce Don Bolivia. Instrumentos y accesorios musicales en Cochabamba. Sire, Donner, Magma y más.',
}

export default function NosotrosPage() {
  const waLink = buildWhatsAppLinkGeneric()
  const totalProducts = STATIC_PRODUCTS.filter(p => p.status === 'published').length

  return (
    <>
      {/* Hero */}
      <section
        style={{
          background: 'var(--color-text)',
          color: 'var(--color-bg)',
          padding: 'clamp(3rem, 6vw, 6rem) 0',
        }}
      >
        <div className="container-narrow">
          <span style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-red)', display: 'block', marginBottom: '1rem' }}>
            Sobre nosotros
          </span>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, letterSpacing: '-0.035em', lineHeight: 1.05, color: 'var(--color-bg)', marginBottom: '1.5rem' }}>
            La música no necesita más discursos.<br />
            <span style={{ color: 'var(--color-red)' }}>Necesita buenos instrumentos.</span>
          </h1>
          <p style={{ fontSize: '1.125rem', color: 'rgba(254,255,250,0.65)', lineHeight: 1.7, maxWidth: '560px' }}>
            Don Bolivia es una tienda de instrumentos musicales y accesorios ubicada en Cochabamba.
            Trabajamos con marcas seleccionadas que ofrecen calidad real a precios accesibles.
          </p>
        </div>
      </section>

      {/* Qué somos */}
      <section className="section">
        <div className="container-narrow">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem' }}>
            <div>
              <h2 style={{ fontSize: 'clamp(1.375rem, 2.5vw, 1.875rem)', fontWeight: 800, letterSpacing: '-0.025em', marginBottom: '1rem' }}>
                Qué comercializamos
              </h2>
              <p style={{ fontSize: '1.0625rem', color: 'var(--color-gray-600)', lineHeight: 1.7, marginBottom: '1rem' }}>
                En Don Bolivia encontrarás bajos eléctricos, guitarras, pedales de efectos,
                teclados, baterías electrónicas y accesorios musicales. Desde instrumentos
                de entrada hasta modelos de nivel profesional.
              </p>
              <p style={{ fontSize: '1.0625rem', color: 'var(--color-gray-600)', lineHeight: 1.7 }}>
                Actualmente contamos con un catálogo de <strong>{totalProducts} productos</strong> disponibles
                para consulta. Los precios y la disponibilidad se confirman directamente
                por WhatsApp, para que la información que recibas sea siempre actual.
              </p>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '1rem' }}>
              {[
                { value: String(totalProducts) + '+', label: 'Productos en catálogo' },
                { value: String(STATIC_BRANDS.filter(b => b.active).length), label: 'Marcas seleccionadas' },
                { value: String(STATIC_CATEGORIES.filter(c => c.active).length), label: 'Categorías' },
                { value: 'CBB', label: 'Cochabamba, Bolivia' },
              ].map(stat => (
                <div
                  key={stat.label}
                  style={{
                    border: '1px solid var(--color-gray-200)',
                    borderRadius: '4px',
                    padding: '1.25rem',
                    background: 'white',
                  }}
                >
                  <div style={{ fontSize: '2rem', fontWeight: 900, letterSpacing: '-0.04em', color: 'var(--color-red)', lineHeight: 1 }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--color-gray-500)', marginTop: '0.375rem' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Marcas */}
      <section
        className="section"
        style={{ background: 'var(--color-gray-100)', borderTop: '1px solid var(--color-gray-200)', borderBottom: '1px solid var(--color-gray-200)' }}
      >
        <div className="container-narrow">
          <h2 style={{ fontSize: 'clamp(1.375rem, 2.5vw, 1.875rem)', fontWeight: 800, letterSpacing: '-0.025em', marginBottom: '0.5rem' }}>
            Las marcas del catálogo
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--color-gray-500)', marginBottom: '2rem' }}>
            Trabajamos con marcas que equilibran calidad, diseño y precio.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              {
                name: 'Sire',
                desc: 'Marcus Miller by Sire es una de las líneas de bajo más reconocidas del mercado actual. Diseñadas en colaboración con el legendario bajista Marcus Miller, ofrecen pickups y electrónica activa de alto rendimiento a precios accesibles. La línea también incluye guitarras eléctricas con la misma filosofía de calidad.',
                slug: 'sire',
              },
              {
                name: 'Donner',
                desc: 'Donner abarca un catálogo amplio que va desde guitarras portátiles tipo headless hasta pedales multiefectos, pianos digitales, teclados electrónicos y baterías electrónicas. Una propuesta versátil para músicos de todos los niveles.',
                slug: 'donner',
              },
              {
                name: 'Magma',
                desc: 'Magma ofrece cuerdas y accesorios de calidad para instrumentos de cuerda. Una opción confiable para mantener tu instrumento en las mejores condiciones.',
                slug: 'magma',
              },
            ].map(brand => (
              <div
                key={brand.slug}
                style={{
                  background: 'white',
                  border: '1px solid var(--color-gray-200)',
                  borderRadius: '4px',
                  padding: '1.5rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '0.75rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 900, letterSpacing: '-0.025em' }}>{brand.name}</h3>
                  <Link
                    href={`/catalogo?brand=${brand.slug}`}
                    style={{ fontSize: '0.75rem', color: 'var(--color-red)', fontWeight: 600, whiteSpace: 'nowrap', textDecoration: 'none' }}
                  >
                    Ver productos →
                  </Link>
                </div>
                <p style={{ fontSize: '0.9375rem', color: 'var(--color-gray-600)', lineHeight: 1.65 }}>
                  {brand.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cómo consultar */}
      <section className="section">
        <div className="container-narrow">
          <h2 style={{ fontSize: 'clamp(1.375rem, 2.5vw, 1.875rem)', fontWeight: 800, letterSpacing: '-0.025em', marginBottom: '1rem' }}>
            Cómo funciona
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
            {[
              { step: '01', title: 'Explora el catálogo', desc: 'Navega por los productos disponibles, filtra por categoría o marca y lee las especificaciones.' },
              { step: '02', title: 'Consulta por WhatsApp', desc: 'Cada producto tiene un botón de consulta que genera automáticamente un mensaje con los datos del instrumento.' },
              { step: '03', title: 'Confirma y coordina', desc: 'Te respondemos con el precio actualizado y la disponibilidad. Coordinamos la entrega directamente contigo.' },
            ].map(item => (
              <div key={item.step} style={{ padding: '1.25rem 0', borderTop: '2px solid var(--color-gray-200)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-red)', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
                  {item.step}
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem' }}>{item.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-gray-500)', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-lg" id="nosotros-whatsapp">
              <MessageCircle size={18} />
              Consultar por WhatsApp
            </a>
            <Link href="/catalogo" className="btn btn-secondary btn-lg" id="nosotros-catalog">
              Ver catálogo <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
