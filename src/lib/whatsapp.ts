// Don Bolivia - WhatsApp helper
import { WHATSAPP_LINK, WHATSAPP_NUMBER } from './data'
import type { Product } from '@/types'

export function buildWhatsAppLink(product?: Product, siteUrl?: string): string {
  const base = WHATSAPP_NUMBER
    ? `https://wa.me/${WHATSAPP_NUMBER}`
    : WHATSAPP_LINK

  if (!product) {
    // Link genérico para contacto
    const msg = '¡Hola, Don Bolivia! Quisiera obtener información sobre sus productos.'
    return `${base}?text=${encodeURIComponent(msg)}`
  }

  const productUrl = siteUrl
    ? `${siteUrl}/producto/${product.slug}`
    : `/producto/${product.slug}`

  const brandName = product.brand?.name || ''
  const modelStr = product.model ? ` ${product.model}` : ''

  const msg = `Hola, Don Bolivia. Estoy interesado/a en el ${product.category?.name === 'bajos' ? 'bajo' : 'producto'} ${brandName}${modelStr} (${product.name}). Quisiera consultar el precio y la disponibilidad. ${productUrl}`

  return `${base}?text=${encodeURIComponent(msg)}`
}

export function buildWhatsAppLinkGeneric(message?: string): string {
  const base = WHATSAPP_NUMBER
    ? `https://wa.me/${WHATSAPP_NUMBER}`
    : WHATSAPP_LINK

  const msg = message || '¡Hola, Don Bolivia! Quisiera obtener más información sobre sus productos.'
  return `${base}?text=${encodeURIComponent(msg)}`
}

export { WHATSAPP_LINK }
