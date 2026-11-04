import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/types'
import { buildWhatsAppLink } from '@/lib/whatsapp'
import { MessageCircle, ArrowUpRight } from 'lucide-react'

interface ProductCardProps {
  product: Product
  showWhatsApp?: boolean
}

export function ProductCard({ product, showWhatsApp = false }: ProductCardProps) {
  const waLink = buildWhatsAppLink(product)
  const hasImage = product.primary_image_url || (product.images && product.images.length > 0)
  const imageUrl = product.primary_image_url || product.images?.[0]?.url

  return (
    <article className="product-card group" aria-label={`Producto: ${product.name}`}>
      <Link href={`/producto/${product.slug}`} className="product-card__image" tabIndex={-1} aria-hidden="true">
        {hasImage && imageUrl ? (
          <Image
            src={imageUrl}
            alt={product.images?.[0]?.alt_text || product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="product-card__img"
            loading="lazy"
          />
        ) : (
          <div className="img-placeholder">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <path d="M21 15l-5-5L5 21"/>
            </svg>
          </div>
        )}
        {product.featured && (
          <div className="product-card__badge-pos">
            <span className="pill-badge pill-badge--featured">
              <span className="pill-badge__dot" />
              Destacado
            </span>
          </div>
        )}
      </Link>

      <div className="product-card__body">
        <div className="product-card__top">
          <span className="product-card__brand">{product.brand?.name || 'Don Bolivia'}</span>
          {product.model && (
            <span className="product-card__model-pill">{product.model}</span>
          )}
        </div>

        <Link href={`/producto/${product.slug}`}>
          <h3 className="product-card__name">{product.name}</h3>
        </Link>

        <div className="product-card__price">
          <div className="product-card__price-box">
            {product.price ? (
              <>
                <span className="product-card__currency">$</span>
                <span className="product-card__price-value">
                  {product.price.toLocaleString('es-BO')}
                </span>
                <span className="product-card__currency-code">{product.currency}</span>
              </>
            ) : (
              <span className="product-card__price-consult">Consultar precio</span>
            )}
          </div>

          {showWhatsApp && (
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Consultar por WhatsApp: ${product.name}`}
              className="product-card__wa-action"
              title="Consultar por WhatsApp"
            >
              <MessageCircle size={16} />
              <span>Consultar</span>
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
