import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MessageCircle, ArrowLeft, Tag } from 'lucide-react'
import { ProductGallery } from '@/components/ProductGallery'
import { ProductCard } from '@/components/ProductCard'
import { STATIC_PRODUCTS, getProductBySlug, getRelatedProducts } from '@/lib/data'
import { buildWhatsAppLink } from '@/lib/whatsapp'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return STATIC_PRODUCTS
    .filter(p => p.status === 'published')
    .map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return {}
  return {
    title: `${product.name} – Don Bolivia`,
    description: product.description_short || `${product.name} disponible en Don Bolivia, Cochabamba.`,
    openGraph: {
      title: `${product.name} | Don Bolivia`,
      description: product.description_short,
      images: product.primary_image_url ? [{ url: product.primary_image_url }] : [],
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  const related = getRelatedProducts(product, 4)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://don-bolivia.com'
  const waLink = buildWhatsAppLink(product, siteUrl)

  return (
    <>
      <div className="container" style={{ paddingBlock: '1.5rem' }}>
        {/* Breadcrumb */}
        <nav aria-label="Navegación de ruta" style={{ marginBottom: '1.5rem' }}>
          <ol style={{ display: 'flex', gap: '0.375rem', fontSize: '0.8125rem', color: 'var(--color-gray-400)', listStyle: 'none', flexWrap: 'wrap' }}>
            <li><Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Inicio</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/catalogo" style={{ color: 'inherit', textDecoration: 'none' }}>Catálogo</Link></li>
            {product.category && (
              <>
                <li aria-hidden="true">/</li>
                <li>
                  <Link
                    href={`/catalogo/${product.category.slug}`}
                    style={{ color: 'inherit', textDecoration: 'none' }}
                  >
                    {product.category.name}
                  </Link>
                </li>
              </>
            )}
            <li aria-hidden="true">/</li>
            <li aria-current="page" style={{ color: 'var(--color-text)', fontWeight: 500 }}>
              {product.name}
            </li>
          </ol>
        </nav>

        {/* Product grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '3rem',
            marginBottom: '4rem',
          }}
        >
          <style>{`@media(min-width:768px){#product-detail-grid{grid-template-columns:1fr 1fr;}}`}</style>
          <div id="product-detail-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem' }}>
            {/* Gallery */}
            <div>
              <ProductGallery product={product} />
            </div>

            {/* Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Brand + category */}
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {product.brand && (
                  <span className="tag tag-red">{product.brand.name}</span>
                )}
                {product.category && (
                  <span className="tag tag-brand">{product.category.name}</span>
                )}
                {product.featured && (
                  <span className="tag" style={{ background: '#FFF3CD', color: '#856404' }}>Destacado</span>
                )}
              </div>

              {/* Name */}
              <div>
                <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '0.375rem' }}>
                  {product.name}
                </h1>
                {product.model && (
                  <p style={{ fontSize: '1rem', color: 'var(--color-gray-500)', fontWeight: 500 }}>
                    Modelo: {product.model}
                  </p>
                )}
              </div>

              {/* Description */}
              {product.description_short && (
                <p style={{ fontSize: '1.0625rem', color: 'var(--color-gray-600)', lineHeight: 1.65 }}>
                  {product.description_short}
                </p>
              )}

              {/* Price */}
              <div
                style={{
                  padding: '1.25rem',
                  background: 'var(--color-gray-100)',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                }}
              >
                <div>
                  <div style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-gray-400)', marginBottom: '0.25rem' }}>
                    Precio referencial
                  </div>
                  {product.price ? (
                    <div style={{ fontSize: '1.75rem', fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--color-text)' }}>
                      {product.price.toLocaleString('es-BO')}
                      <span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-gray-400)', marginLeft: '0.375rem' }}>
                        {product.currency}
                      </span>
                    </div>
                  ) : (
                    <div style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-gray-400)', fontStyle: 'italic' }}>
                      Consultar precio
                    </div>
                  )}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-gray-400)', textAlign: 'right', maxWidth: '160px', lineHeight: 1.4 }}>
                  Precios de referencia. Confirma disponibilidad por WhatsApp.
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-lg"
                style={{ justifyContent: 'center' }}
                id="product-whatsapp-cta"
              >
                <MessageCircle size={20} />
                Consultar por WhatsApp
              </a>

              {/* Long description */}
              {product.description_long && (
                <div>
                  <h2 style={{ fontSize: '0.6875rem', fontWeight: 700, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-gray-400)' }}>
                    Descripción
                  </h2>
                  <p style={{ fontSize: '0.9375rem', color: 'var(--color-gray-600)', lineHeight: 1.7 }}>
                    {product.description_long}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Specs */}
        {product.specs && product.specs.length > 0 && (
          <section style={{ marginBottom: '4rem' }} aria-label="Especificaciones técnicas">
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '1rem' }}>
              Especificaciones técnicas
            </h2>
            <div
              style={{
                border: '1px solid var(--color-gray-200)',
                borderRadius: '4px',
                overflow: 'hidden',
              }}
            >
              {product.specs.map((spec, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 2fr',
                    padding: '0.75rem 1rem',
                    borderBottom: idx < product.specs.length - 1 ? '1px solid var(--color-gray-100)' : 'none',
                    background: idx % 2 === 0 ? 'white' : 'var(--color-gray-100)',
                  }}
                >
                  <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-gray-500)' }}>
                    {spec.key}
                  </span>
                  <span style={{ fontSize: '0.9375rem', color: 'var(--color-text)' }}>
                    {spec.value}{spec.unit ? ` ${spec.unit}` : ''}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Notes / disclaimer */}
        {product.notes && (
          <div
            style={{
              padding: '1rem',
              background: '#FFFBEB',
              border: '1px solid #FDE68A',
              borderRadius: '4px',
              marginBottom: '3rem',
              fontSize: '0.8125rem',
              color: '#92400E',
              display: 'flex',
              gap: '0.5rem',
              alignItems: 'flex-start',
            }}
          >
            <Tag size={14} style={{ flexShrink: 0, marginTop: '1px' }} />
            <span>{product.notes}</span>
          </div>
        )}

        {/* Related products */}
        {related.length > 0 && (
          <section aria-label="Productos relacionados">
            <div className="section-header">
              <h2 className="section-header__title" style={{ fontSize: '1.25rem' }}>
                También te puede interesar
              </h2>
              <Link href="/catalogo" className="section-header__link" style={{ fontSize: '0.8125rem' }}>
                Ver todo →
              </Link>
            </div>
            <div className="products-grid">
              {related.map(p => (
                <ProductCard key={p.id} product={p} showWhatsApp />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  )
}
