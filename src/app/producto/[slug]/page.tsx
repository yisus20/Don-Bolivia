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

  const productUrl = `https://don-bolivia.com/producto/${product.slug}/`
  const priceText = product.price ? ` — $${product.price.toFixed(2)} USD` : ''
  const title = `${product.name}${priceText}`
  const description =
    product.description_short ||
    `${product.name} disponible en Don Bolivia (Cochabamba con envíos a todo el país). Consulta existencias por WhatsApp.`

  return {
    title,
    description,
    alternates: {
      canonical: productUrl,
    },
    openGraph: {
      title: `${product.name} | Don Bolivia`,
      description,
      url: productUrl,
      type: 'website',
      images: [
        {
          url: product.primary_image_url
            ? `https://don-bolivia.com${product.primary_image_url}`
            : 'https://don-bolivia.com/hero-instruments.jpg',
          alt: product.name,
        },
      ],
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
  const productUrl = `https://don-bolivia.com/producto/${product.slug}/`
  const imageUrl = product.primary_image_url
    ? `https://don-bolivia.com${product.primary_image_url}`
    : 'https://don-bolivia.com/hero-instruments.jpg'

  // Validated Product + Offer + BreadcrumbList Schema.org JSON-LD
  const productSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Inicio',
            item: 'https://don-bolivia.com/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Catálogo',
            item: 'https://don-bolivia.com/catalogo/',
          },
          ...(product.category
            ? [
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: product.category.name,
                  item: `https://don-bolivia.com/catalogo/${product.category.slug}/`,
                },
                {
                  '@type': 'ListItem',
                  position: 4,
                  name: product.name,
                  item: productUrl,
                },
              ]
            : [
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: product.name,
                  item: productUrl,
                },
              ]),
        ],
      },
      {
        '@type': 'Product',
        '@id': `${productUrl}#product`,
        name: product.name,
        sku: product.model || product.id,
        mpn: product.model || product.id,
        description: product.description_long || product.description_short || product.name,
        image: [imageUrl],
        category: product.subcategory || product.category?.name || 'Musical Instruments',
        brand: {
          '@type': 'Brand',
          name: product.brand?.name || 'Don Bolivia',
        },
        offers: {
          '@type': 'Offer',
          url: productUrl,
          priceCurrency: 'USD',
          price: product.price ? product.price.toFixed(2) : '0.00',
          availability: 'https://schema.org/InStock',
          itemCondition: 'https://schema.org/NewCondition',
          seller: {
            '@id': 'https://don-bolivia.com/#store',
          },
          shippingDetails: {
            '@type': 'OfferShippingDetails',
            shippingDestination: {
              '@type': 'DefinedRegion',
              addressCountry: 'BO',
            },
          },
        },
      },
    ],
  }

  return (
    <div className="lux-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
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
                      ${product.price.toLocaleString('es-BO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}{' '}
                      <span>{product.currency}</span>
                      {product.price_bs && (
                        <div style={{ fontSize: '1.05rem', color: 'rgba(250, 248, 245, 0.85)', marginTop: '0.25rem' }}>
                          Bs {product.price_bs.toLocaleString('es-BO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (TC 12.05)
                        </div>
                      )}
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
