'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/types'
import { ArrowUpRight } from 'lucide-react'
import { useStoreInteractive } from '@/components/StoreInteractiveProvider'

interface ProductCardProps {
  product: Product
  showWhatsApp?: boolean
}

export function ProductCard({ product, showWhatsApp = false }: ProductCardProps) {
  const { openWhatsApp } = useStoreInteractive()
  const hasImage = product.primary_image_url || (product.images && product.images.length > 0)
  const imageUrl = product.primary_image_url || product.images?.[0]?.url

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const brandName = product.brand?.name || 'Don Bolivia'
    const modelStr = product.model ? ` (${product.model})` : ''
    openWhatsApp(
      `Hola Don Bolivia! Estoy interesado en el ${product.name}${modelStr} de ${brandName}. ¿Tienen stock disponible y cuál es su precio actual?`
    )
  }

  return (
    <article className="lux-catalog-card" aria-label={`Producto: ${product.name}`}>
      <Link
        href={`/producto/${product.slug}`}
        className="lux-catalog-card__box"
        tabIndex={-1}
        aria-hidden="true"
      >
        {hasImage && imageUrl ? (
          <Image
            src={imageUrl}
            alt={product.images?.[0]?.alt_text || product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="lux-catalog-card__img"
            loading="lazy"
          />
        ) : (
          <div className="lux-catalog-card__placeholder">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <rect x="3" y="3" width="18" height="18" rx="3" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          </div>
        )}
        {product.featured && (
          <span className="lux-catalog-card__badge">Selección</span>
        )}
      </Link>

      <div className="lux-catalog-card__body">
        <div className="lux-catalog-card__top">
          <span className="lux-catalog-card__brand">
            {product.brand?.name || 'Don Bolivia'}
          </span>
          {product.model && (
            <span className="lux-catalog-card__model">{product.model}</span>
          )}
        </div>

        <Link href={`/producto/${product.slug}`} className="lux-catalog-card__title-link">
          <h3 className="lux-catalog-card__title">{product.name}</h3>
        </Link>

        {product.description_short && (
          <p className="lux-catalog-card__desc">{product.description_short}</p>
        )}

        <div className="lux-catalog-card__footer">
          <div className="lux-catalog-card__price">
            {product.price ? (
              <>
                <span className="lux-catalog-card__price-num">
                  ${product.price.toLocaleString('es-BO')}
                </span>
                <span className="lux-catalog-card__price-cur">{product.currency}</span>
              </>
            ) : (
              <span className="lux-catalog-card__consult">Consultar stock</span>
            )}
          </div>

          {showWhatsApp && (
            <button
              type="button"
              onClick={handleWhatsAppClick}
              aria-label={`Consultar por WhatsApp: ${product.name}`}
              className="lux-catalog-card__wa"
              title="Consultar por WhatsApp"
            >
              <span>Consultar</span>
              <ArrowUpRight size={13} />
            </button>
          )}
        </div>
      </div>
    </article>
  )
}
