'use client'

import { useState, useEffect, useCallback } from 'react'
import type { Product } from '@/types'
import { STATIC_PRODUCTS, STATIC_BRANDS, STATIC_CATEGORIES, EXCHANGE_RATE_BS } from '@/lib/data'

export const ADMIN_IMAGE_STORAGE_KEY = 'don_bolivia_product_images_v1'
export const ADMIN_CUSTOM_PRODUCTS_KEY = 'don_bolivia_custom_products_v1'
export const ADMIN_PRODUCT_EDITS_KEY = 'don_bolivia_product_edits_v1'
export const ADMIN_DELETED_IDS_KEY = 'don_bolivia_deleted_products_v1'

export function getMergedCatalogProducts(): Product[] {
  if (typeof window === 'undefined') return STATIC_PRODUCTS

  try {
    const rawImages = window.localStorage.getItem(ADMIN_IMAGE_STORAGE_KEY)
    const imagesMap: Record<string, string> = rawImages ? JSON.parse(rawImages) : {}

    const rawEdits = window.localStorage.getItem(ADMIN_PRODUCT_EDITS_KEY)
    const editsMap: Record<string, Partial<Product>> = rawEdits ? JSON.parse(rawEdits) : {}

    const rawCustom = window.localStorage.getItem(ADMIN_CUSTOM_PRODUCTS_KEY)
    const customList: Product[] = rawCustom ? JSON.parse(rawCustom) : []

    const rawDeleted = window.localStorage.getItem(ADMIN_DELETED_IDS_KEY)
    const deletedIds = new Set<string>(rawDeleted ? JSON.parse(rawDeleted) : [])

    const baseMerged = STATIC_PRODUCTS.filter(p => !deletedIds.has(p.id)).map(p => {
      const edit = editsMap[p.id] || {}
      const customImg = imagesMap[p.id]
      const merged: Product = {
        ...p,
        ...edit,
        brand: STATIC_BRANDS.find(b => b.id === (edit.brand_id || p.brand_id)) || p.brand,
        category:
          STATIC_CATEGORIES.find(c => c.id === (edit.category_id || p.category_id)) || p.category,
      }
      if (customImg) {
        merged.primary_image_url = customImg
        merged.images = [
          {
            id: `${p.id}-custom-img`,
            product_id: p.id,
            url: customImg,
            alt_text: merged.name,
            order: 0,
            is_primary: true,
            created_at: new Date().toISOString(),
          },
        ]
      }
      return merged
    })

    const customMerged = customList
      .filter(p => !deletedIds.has(p.id))
      .map(p => {
        const edit = editsMap[p.id] || {}
        const customImg = imagesMap[p.id] || p.primary_image_url
        const brand = STATIC_BRANDS.find(b => b.id === (edit.brand_id || p.brand_id))
        const category = STATIC_CATEGORIES.find(c => c.id === (edit.category_id || p.category_id))
        return {
          ...p,
          ...edit,
          brand,
          category,
          primary_image_url: customImg,
          images: customImg
            ? [
                {
                  id: `${p.id}-custom-img`,
                  product_id: p.id,
                  url: customImg,
                  alt_text: edit.name || p.name,
                  order: 0,
                  is_primary: true,
                  created_at: new Date().toISOString(),
                },
              ]
            : [],
        }
      })

    return [...customMerged, ...baseMerged]
  } catch {
    return STATIC_PRODUCTS
  }
}

export function notifyCatalogUpdated() {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new Event('don-bolivia-images-updated'))
  window.dispatchEvent(new Event('don-bolivia-catalog-updated'))
}

export function saveNewCustomProduct(newProduct: Product, imageUrl?: string) {
  if (typeof window === 'undefined') return
  const rawCustom = window.localStorage.getItem(ADMIN_CUSTOM_PRODUCTS_KEY)
  const customList: Product[] = rawCustom ? JSON.parse(rawCustom) : []
  customList.unshift(newProduct)
  window.localStorage.setItem(ADMIN_CUSTOM_PRODUCTS_KEY, JSON.stringify(customList))

  if (imageUrl) {
    const rawImages = window.localStorage.getItem(ADMIN_IMAGE_STORAGE_KEY)
    const imagesMap: Record<string, string> = rawImages ? JSON.parse(rawImages) : {}
    imagesMap[newProduct.id] = imageUrl
    window.localStorage.setItem(ADMIN_IMAGE_STORAGE_KEY, JSON.stringify(imagesMap))
  }

  notifyCatalogUpdated()
}

export function saveProductEdit(productId: string, updates: Partial<Product>, imageUrl?: string) {
  if (typeof window === 'undefined') return
  const rawEdits = window.localStorage.getItem(ADMIN_PRODUCT_EDITS_KEY)
  const editsMap: Record<string, Partial<Product>> = rawEdits ? JSON.parse(rawEdits) : {}

  if (updates.price !== undefined && updates.price_bs === undefined) {
    updates.price_bs = Number((updates.price * EXCHANGE_RATE_BS).toFixed(2))
  }

  editsMap[productId] = {
    ...(editsMap[productId] || {}),
    ...updates,
    updated_at: new Date().toISOString(),
  }
  window.localStorage.setItem(ADMIN_PRODUCT_EDITS_KEY, JSON.stringify(editsMap))

  if (imageUrl !== undefined) {
    const rawImages = window.localStorage.getItem(ADMIN_IMAGE_STORAGE_KEY)
    const imagesMap: Record<string, string> = rawImages ? JSON.parse(rawImages) : {}
    if (imageUrl.trim()) {
      imagesMap[productId] = imageUrl.trim()
    } else {
      delete imagesMap[productId]
    }
    window.localStorage.setItem(ADMIN_IMAGE_STORAGE_KEY, JSON.stringify(imagesMap))
  }

  notifyCatalogUpdated()
}

export function useCatalogProducts() {
  const [products, setProducts] = useState<Product[]>(STATIC_PRODUCTS)

  const refresh = useCallback(() => {
    setProducts(getMergedCatalogProducts())
  }, [])

  useEffect(() => {
    refresh()
    window.addEventListener('storage', refresh)
    window.addEventListener('don-bolivia-images-updated', refresh)
    window.addEventListener('don-bolivia-catalog-updated', refresh)
    return () => {
      window.removeEventListener('storage', refresh)
      window.removeEventListener('don-bolivia-images-updated', refresh)
      window.removeEventListener('don-bolivia-catalog-updated', refresh)
    }
  }, [refresh])

  return { products, refresh }
}
