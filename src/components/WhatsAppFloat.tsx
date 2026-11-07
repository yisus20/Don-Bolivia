'use client'

import { usePathname } from 'next/navigation'
import { useStoreInteractive } from '@/components/StoreInteractiveProvider'

export function WhatsAppFloat() {
  const pathname = usePathname()
  const { openWhatsApp } = useStoreInteractive()

  if (pathname.startsWith('/admin')) return null

  return (
    <button
      type="button"
      onClick={() =>
        openWhatsApp(
          'Hola Don Bolivia! Vengo de su página web y quisiera consultar por disponibilidad y precios.'
        )
      }
      className="lux-wa-float"
      aria-label="Consultar por WhatsApp"
      title="Consultar por WhatsApp"
      id="whatsapp-float-btn"
    >
      <svg
        width="21"
        height="21"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    </button>
  )
}
