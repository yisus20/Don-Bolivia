import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowUpRight, Check } from 'lucide-react'
import { ProductGallery } from '@/components/ProductGallery'
import { ProductCard } from '@/components/ProductCard'
import { STATIC_PRODUCTS, getProductBySlug, getRelatedProducts } from '@/lib/data'
import { buildWhatsAppLink } from '@/lib/whatsapp'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return STATIC_PRODUCTS.filter(p => p.status === 'published').map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return {}
  return {
    title: `${product.name} – Don Bolivia`,
    description:
      product.description_short || `${product.name} disponible en Don Bolivia, Cochabamba.`,
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
    <div className="lux-page">
      <div className="lux-curated-container" style={{ paddingBlock: 'clamp(2.25rem, 4vw, 3.5rem)' }}>
        {/* Minimalist Breadcrumb */}
        <nav className="lux-breadcrumb" aria-label="Navegación de ruta">
          <Link href="/" className="lux-breadcrumb__link">
            Inicio
          </Link>
          <span className="lux-breadcrumb__sep">/</span>
          <Link href="/catalogo" className="lux-breadcrumb__link">
            Catálogo
          </Link>
          {product.category && (
            <>
              <span className="lux-breadcrumb__sep">/</span>
              <Link
                href={`/catalogo/${product.category.slug}`}
                className="lux-breadcrumb__link"
              >
                {product.category.name}
              </Link>
            </>
          )}
          <span className="lux-breadcrumb__sep">/</span>
          <span className="lux-breadcrumb__current">{product.name}</span>
        </nav>

        {/* Product Detail Split */}
        <div className="lux-product-detail">
          <div className="lux-product-detail__gallery">
            <ProductGallery product={product} />
          </div>

          <div className="lux-product-detail__info">
            <div className="lux-curated-card__top" style={{ justifyContent: 'flex-start', gap: '0.6rem' }}>
              {product.brand && (
                <span className="lux-curated-card__tag">{product.brand.name}</span>
              )}
              {product.category && (
                <span className="lux-curated-card__count">{product.category.name}</span>
              )}
              {product.model && (
                <span className="lux-curated-card__count">Modelo {product.model}</span>
              )}
            </div>

            <h1 className="lux-product-detail__title">{product.name}</h1>

            {product.description_short && (
              <p className="lux-product-detail__lead">{product.description_short}</p>
            )}

            {/* Bordeaux Lacquer Consultation Box */}
            <div className="lux-product-consult bordeaux-lacquer">
              <div className="db-grain-bordeaux" />
              <div className="lux-product-consult__inner">
                <div>
                  <span className="lux-curated-card__tag lux-curated-card__tag--light">
                    DISPONIBILIDAD &amp; COTIZACIÓN
                  </span>
                  {product.price ? (
                    <div className="lux-product-consult__price">
                      ${product.price.toLocaleString('es-BO')}{' '}
                      <span>{product.currency}</span>
                    </div>
                  ) : (
                    <div className="lux-product-consult__price">
                      Stock bajo consulta directa
                    </div>
                  )}
                  <p className="lux-product-consult__note">
                    Atención personalizada en Cochabamba y envíos asegurados a La Paz y toda
                    Bolivia.
                  </p>
                </div>

                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lux-btn-cream-sm"
                  id="product-whatsapp-cta"
                >
                  <span>Consultar este modelo por WhatsApp</span>
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </div>

            {product.description_long && (
              <div className="lux-product-detail__section">
                <h2 className="lux-curated-card__tag">ACERCA DE ESTE INSTRUMENTO</h2>
                <p className="lux-product-detail__copy">{product.description_long}</p>
              </div>
            )}

            <ul className="lux-product-detail__perks">
              <li>
                <Check size={14} />
                <span>Inspección y calibración previa a la entrega</span>
              </li>
              <li>
                <Check size={14} />
                <span>Garantía oficial Don Bolivia</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Technical Specs */}
        {product.specs && product.specs.length > 0 && (
          <section className="lux-specs-section" aria-label="Especificaciones técnicas">
            <div className="lux-curated-header" style={{ marginBottom: '1.75rem' }}>
              <div>
                <span className="lux-eyebrow">FICHA TÉCNICA</span>
                <h2 className="lux-heading-lg" style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)' }}>
                  Especificaciones del instrumento.
                </h2>
              </div>
            </div>

            <div className="lux-specs-table">
              {product.specs.map((spec, idx) => (
                <div key={idx} className="lux-specs-row">
                  <span className="lux-specs-row__key">{spec.key}</span>
                  <span className="lux-specs-row__val">
                    {spec.value}
                    {spec.unit ? ` ${spec.unit}` : ''}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related Products */}
        {related.length > 0 && (
          <section className="lux-related-section" aria-label="Productos relacionados">
            <div className="lux-curated-header">
              <div>
                <span className="lux-eyebrow">SELECCIÓN RELACIONADA</span>
                <h2 className="lux-heading-lg" style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)' }}>
                  También te puede interesar.
                </h2>
              </div>
              <Link href="/catalogo" className="lux-link-subtle">
                Ver catálogo completo ↗
              </Link>
            </div>

            <div className="lux-catalog-grid">
              {related.map(p => (
                <ProductCard key={p.id} product={p} showWhatsApp />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
