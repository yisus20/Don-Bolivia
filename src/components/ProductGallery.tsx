'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import type { Product } from '@/types'
import { getStoredProductImage } from '@/components/ProductCard'

interface ProductGalleryProps {
  product: Product
}

export function ProductGallery({ product }: ProductGalleryProps) {
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

  const baseImages =
    product.images && product.images.length > 0
      ? product.images
      : product.primary_image_url
        ? [
            {
              id: 'primary',
              product_id: product.id,
              url: product.primary_image_url,
              alt_text: product.name,
              is_primary: true,
              order: 0,
            },
          ]
        : []

  const images = customImage
    ? [
        {
          id: 'admin-custom',
          product_id: product.id,
          url: customImage,
          alt_text: product.name,
          is_primary: true,
          order: 0,
        },
        ...baseImages,
      ]
    : baseImages

  const [activeIdx, setActiveIdx] = useState(0)
  const activeImage = images[activeIdx] || images[0]
  const isDarkMono = product.order % 2 === 0

  if (images.length === 0) {
    return (
      <div
        className={`lux-gallery-stage ${
          isDarkMono
            ? 'lux-catalog-card__box--mono-dark'
            : 'lux-catalog-card__box--mono-light'
        }`}
      >
        <div className="lux-mono-placeholder lux-mono-placeholder--lg">
          <span className="lux-mono-placeholder__brand">
            {product.brand?.name || 'DON BOLIVIA'}
          </span>
          <span className="lux-mono-placeholder__model">
            {product.model || product.name}
          </span>
          <span className="lux-mono-placeholder__cat">
            {product.subcategory || product.category?.name || 'Instrumento'}
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="lux-gallery">
      <div className="lux-gallery-stage">
        {activeImage && (
          <Image
            src={activeImage.url}
            alt={activeImage.alt_text || product.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="lux-gallery-stage__img"
            priority
          />
        )}
      </div>

      {images.length > 1 && (
        <div className="lux-gallery-thumbs">
          {images.slice(0, 6).map((img, idx) => (
            <button
              key={img.id || idx}
              type="button"
              onClick={() => setActiveIdx(idx)}
              aria-label={`Ver imagen ${idx + 1}`}
              className={`lux-gallery-thumb ${
                activeIdx === idx ? 'lux-gallery-thumb--active' : ''
              }`}
            >
              <Image
                src={img.url}
                alt={img.alt_text || `${product.name} - imagen ${idx + 1}`}
                fill
                sizes="72px"
                className="lux-gallery-thumb__img"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
