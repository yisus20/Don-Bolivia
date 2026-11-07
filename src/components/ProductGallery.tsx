'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { Product } from '@/types'

interface ProductGalleryProps {
  product: Product
}

export function ProductGallery({ product }: ProductGalleryProps) {
  const images =
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

  const [activeIdx, setActiveIdx] = useState(0)
  const activeImage = images[activeIdx]

  if (images.length === 0) {
    return (
      <div className="lux-gallery-stage">
        <div className="lux-catalog-card__placeholder">
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="3" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
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
