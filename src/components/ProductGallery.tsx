'use client'
import { useState } from 'react'
import Image from 'next/image'
import type { Product } from '@/types'

interface ProductGalleryProps {
  product: Product
}

export function ProductGallery({ product }: ProductGalleryProps) {
  const images = product.images || []
  const [activeIdx, setActiveIdx] = useState(0)
  const activeImage = images[activeIdx]

  if (images.length === 0) {
    return (
      <div
        style={{
          aspectRatio: '4/5',
          background: 'var(--color-gray-100)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--color-gray-300)',
        }}
      >
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <circle cx="8.5" cy="8.5" r="1.5"/>
          <path d="M21 15l-5-5L5 21"/>
        </svg>
      </div>
    )
  }

  return (
    <div>
      {/* Main image */}
      <div
        style={{
          position: 'relative',
          aspectRatio: '4/5',
          borderRadius: '8px',
          overflow: 'hidden',
          background: 'var(--color-gray-100)',
          marginBottom: '0.75rem',
          border: '1px solid var(--color-gray-200)',
        }}
      >
        {activeImage && (
          <Image
            src={activeImage.url}
            alt={activeImage.alt_text || product.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: 'cover' }}
            priority
          />
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {images.slice(0, 6).map((img, idx) => (
            <button
              key={img.id}
              onClick={() => setActiveIdx(idx)}
              aria-label={`Ver imagen ${idx + 1}`}
              style={{
                position: 'relative',
                width: '64px',
                height: '64px',
                borderRadius: '4px',
                overflow: 'hidden',
                border: `2px solid ${activeIdx === idx ? 'var(--color-text)' : 'var(--color-gray-200)'}`,
                padding: 0,
                cursor: 'pointer',
                background: 'var(--color-gray-100)',
                flexShrink: 0,
                transition: 'border-color 150ms ease',
              }}
            >
              <Image
                src={img.url}
                alt={img.alt_text || `${product.name} - imagen ${idx + 1}`}
                fill
                sizes="64px"
                style={{ objectFit: 'cover' }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
