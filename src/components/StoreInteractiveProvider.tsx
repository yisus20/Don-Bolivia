'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { WHATSAPP_NUMBER, WHATSAPP_LINK } from '@/lib/data'

interface QuickviewData {
  title: string
  subtitle?: string
  description?: string
  slug?: string
  imageUrl?: string
}

interface StoreInteractiveContextValue {
  openWhatsApp: (customText?: string) => void
  openQuickview: (data?: QuickviewData) => void
}

const StoreInteractiveContext = createContext<StoreInteractiveContextValue>({
  openWhatsApp: () => {},
  openQuickview: () => {},
})

export function useStoreInteractive() {
  return useContext(StoreInteractiveContext)
}

export function StoreInteractiveProvider({ children }: { children: React.ReactNode }) {
  const [waModalOpen, setWaModalOpen] = useState(false)
  const [waMessage, setWaMessage] = useState(
    'Hola Don Bolivia! Vengo de su página web y quisiera consultar por los instrumentos Sire disponibles.'
  )

  const [quickviewOpen, setQuickviewOpen] = useState(false)
  const [quickviewData, setQuickviewData] = useState<QuickviewData>({
    title: 'Sire Marcus Miller V7 Vintage Alder (Bordeaux Metallic)',
    subtitle: 'INSPECCIÓN DE MATERIALES · SERIE V7',
    description:
      'Acabado laca burdeos profundo con destellos metálicos y clavijeros cromados efecto espejo. Mástil de arce tostado satinado para deslizar acordes sin que el sudor te frene y preamplificador Heritage-3 de 18V.',
    slug: 'sire-marcus-miller-v7-4-cuerdas',
    imageUrl: '/catalog-images/sire/p006_img00.jpeg',
  })

  const openWhatsApp = useCallback((customText?: string) => {
    setWaMessage(
      customText ||
        'Hola Don Bolivia! Vengo de su página web y quisiera consultar por los instrumentos Sire disponibles.'
    )
    setWaModalOpen(true)
  }, [])

  const openQuickview = useCallback((data?: QuickviewData) => {
    if (data) {
      setQuickviewData(prev => ({ ...prev, ...data }))
    }
    setQuickviewOpen(true)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setWaModalOpen(false)
        setQuickviewOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const sendActualWhatsApp = () => {
    const encodedMsg = encodeURIComponent(waMessage)
    const url = WHATSAPP_NUMBER
      ? `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodedMsg}`
      : `${WHATSAPP_LINK}?text=${encodedMsg}`
    window.open(url, '_blank', 'noopener,noreferrer')
    setWaModalOpen(false)
  }

  return (
    <StoreInteractiveContext.Provider value={{ openWhatsApp, openQuickview }}>
      {children}

      {/* MODAL: SIMULADOR DE MENSAJE PRE-ARMADO WHATSAPP */}
      {waModalOpen && (
        <div
          className="db-modal-backdrop"
          onClick={() => setWaModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Consulta directa por WhatsApp"
        >
          <div
            className="db-wa-modal"
            onClick={e => e.stopPropagation()}
          >
            <div className="db-wa-modal__header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div className="db-wa-modal__icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="db-wa-modal__title">Don Bolivia — Stock & Ventas</h4>
                  <span className="micro-label" style={{ color: '#34d399', fontSize: '9px' }}>
                    Atención directa con un humano
                  </span>
                </div>
              </div>
              <button
                onClick={() => setWaModalOpen(false)}
                className="db-modal-close"
                aria-label="Cerrar ventana"
              >
                ✕
              </button>
            </div>

            <div className="db-wa-modal__body">
              <div className="db-mono-caption">
                MENSAJE AUTOMÁTICO PRE-ARMADO SEGÚN TU SELECCIÓN:
              </div>

              <textarea
                className="db-wa-modal__preview"
                value={waMessage}
                onChange={e => setWaMessage(e.target.value)}
                rows={3}
                aria-label="Mensaje para WhatsApp"
              />

              <p className="db-wa-modal__hint">
                Puedes editar el texto arriba si quieres agregar algo. Al continuar, se abrirá WhatsApp directo con nuestro equipo en Cochabamba y La Paz. Sin bots.
              </p>

              <div className="db-wa-modal__actions">
                <button onClick={sendActualWhatsApp} className="db-btn-emerald">
                  <span>ABRIR EN WHATSAPP</span>
                  <span>↗</span>
                </button>
                <button
                  onClick={() => setWaModalOpen(false)}
                  className="db-btn-cancel"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: INSPECCIÓN DE ACABADO ESPEJO & BURDEOS (Quickview) */}
      {quickviewOpen && (
        <div
          className="db-modal-backdrop"
          onClick={() => setQuickviewOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Inspección de instrumento"
        >
          <div
            className="db-quickview-modal"
            onClick={e => e.stopPropagation()}
          >
            <div className="db-quickview-modal__inner">
              <div className="db-quickview-specimen bordeaux-lacquer">
                <div className="db-quickview-specimen__core mirror-liquid">
                  <span className="micro-label" style={{ fontSize: '9px', color: '#0C0C0E', fontFamily: 'var(--font-mono)' }}>
                    100% ALDER
                  </span>
                </div>
              </div>

              <div className="db-quickview-info">
                <span className="micro-label" style={{ color: '#64111E' }}>
                  {quickviewData.subtitle || 'INSPECCIÓN DE MATERIALES'}
                </span>
                <h3 className="db-quickview-title">{quickviewData.title}</h3>
                <p className="db-quickview-desc">{quickviewData.description}</p>
                <div className="db-quickview-price">
                  PRECIO ESTIMADO: CONSULTAR EN VIVO (DEPENDE DEL DÓLAR Y EL HUMOR DEL BANCO CENTRAL)
                </div>
                <div className="db-quickview-actions">
                  <button
                    onClick={() => {
                      setQuickviewOpen(false)
                      openWhatsApp(
                        `Hola Don Bolivia, inspeccioné el ${quickviewData.title} en la web y quiero consultar su disponibilidad y precio.`
                      )
                    }}
                    className="db-btn-bordeaux"
                  >
                    PEDIR ESTE MODELO
                  </button>
                  {quickviewData.slug && (
                    <Link
                      href={`/producto/${quickviewData.slug}`}
                      onClick={() => setQuickviewOpen(false)}
                      className="db-btn-ghost-pill"
                    >
                      VER FICHA TÉCNICA
                    </Link>
                  )}
                  <button
                    onClick={() => setQuickviewOpen(false)}
                    className="db-btn-ghost-pill"
                  >
                    CERRAR
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </StoreInteractiveContext.Provider>
  )
}

