'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/types'
import { ArrowUpRight } from 'lucide-react'
import { useStoreInteractive } from '@/components/StoreInteractiveProvider'

interface ProductCardProps {
  product: Product
  showWhatsApp?: boolean
}

export const ADMIN_IMAGE_STORAGE_KEY = 'don_bolivia_product_images_v1'

export function getStoredProductImage(productId: string): string | undefined {
  if (typeof window === 'undefined') return undefined
  try {
    const raw = window.localStorage.getItem(ADMIN_IMAGE_STORAGE_KEY)
    if (!raw) return undefined
    const map = JSON.parse(raw) as Record<string, string>
    return map[productId]
  } catch {
    return undefined
  }
}

export function ProductCard({ product, showWhatsApp = false }: ProductCardProps) {
  const { openWhatsApp } = useStoreInteractive()
  const [customImage, setCustomImage] = useState<string | undefined>(undefined)

  useEffect(() => {
    const sync = () => {
      setCustomImage(getStoredProductImage(product.id))
    }
    sync()
    window.addEventListener('storage', sync)
    window.addEventListener('don-bolivia-images-updated', sync)
    return () => {
      window.removeEventListener('storage', sync)
      window.removeEventListener('don-bolivia-images-updated', sync)
    }
  }, [product.id])

  const imageUrl = customImage || product.primary_image_url || product.images?.[0]?.url
  const hasImage = Boolean(imageUrl)

  // Alternate clean monochrome (Black / White) studio cards when no image is set
  const isDarkPlaceholder = product.order % 2 === 0

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const brandName = product.brand?.name || 'Don Bolivia'
    const priceStr = product.price
      ? ` ($${product.price.toLocaleString('es-BO', { minimumFractionDigits: 2 })} USD / Bs ${(product.price_bs ?? product.price * 12.05).toLocaleString('es-BO', { minimumFractionDigits: 2 })})`
      : ''
    openWhatsApp(
      `Hola Don Bolivia! Estoy interesado en el ${product.name} de ${brandName}${priceStr}. ¿Tienen existencias disponibles?`
    )
  }

  return (
    <article className="lux-catalog-card" aria-label={`Producto: ${product.name}`}>
      <Link
        href={`/producto/${product.slug}`}
        className={`lux-catalog-card__box ${
          !hasImage
            ? isDarkPlaceholder
              ? 'lux-catalog-card__box--mono-dark'
              : 'lux-catalog-card__box--mono-light'
            : ''
        }`}
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
          <div className="lux-mono-placeholder">
            <span className="lux-mono-placeholder__brand">
              {product.brand?.name || 'DON BOLIVIA'}
            </span>
            <span className="lux-mono-placeholder__model">
              {product.model || product.name}
            </span>
            <span className="lux-mono-placeholder__cat">
              {product.category?.name || 'Instrumento'}
            </span>
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
              <div className="lux-catalog-card__price-stack">
                <div>
                  <span className="lux-catalog-card__price-num">
                    ${product.price.toLocaleString('es-BO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <span className="lux-catalog-card__price-cur">USD</span>
                </div>
                {product.price_bs && (
                  <span className="lux-catalog-card__price-bs">
                    Bs {product.price_bs.toLocaleString('es-BO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                )}
              </div>
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
