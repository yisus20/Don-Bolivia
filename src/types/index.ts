// Don Bolivia - Type definitions
// Tipos para el sistema de datos completo

export type ProductStatus = 'draft' | 'published' | 'archived'
export type AvailabilityStatus = 'available' | 'unavailable' | 'consultar' | 'pre-order'
export type Currency = 'USD' | 'BOB' | 'EUR'

export interface Brand {
  id: string
  name: string
  slug: string
  logo_url?: string
  description?: string
  active: boolean
  created_at: string
  updated_at: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image_url?: string
  active: boolean
  order: number
  parent_id?: string
  created_at: string
  updated_at: string
}

export interface ProductImage {
  id: string
  product_id: string
  url: string
  alt_text?: string
  order: number
  is_primary: boolean
  created_at: string
}

export interface ProductSpec {
  key: string
  value: string
  unit?: string
}

export interface Product {
  id: string
  name: string
  slug: string
  brand_id: string
  brand?: Brand
  category_id: string
  category?: Category
  subcategory?: string
  model?: string
  description_short?: string
  description_long?: string
  price?: number
  currency: Currency
  availability: AvailabilityStatus
  status: ProductStatus
  featured: boolean
  order: number
  specs: ProductSpec[]
  images?: ProductImage[]
  primary_image_url?: string
  tags?: string[]
  source_catalog?: string
  notes?: string
  created_at: string
  updated_at: string
}

// Para el catálogo con filtros
export interface CatalogFilters {
  category?: string
  brand?: string
  search?: string
  priceMin?: number
  priceMax?: number
  sort?: 'name_asc' | 'name_desc' | 'price_asc' | 'price_desc' | 'newest' | 'relevance'
  page?: number
}

// Para el admin dashboard
export interface DashboardStats {
  totalProducts: number
  publishedProducts: number
  draftProducts: number
  featuredProducts: number
  totalCategories: number
  totalBrands: number
}

// Para WhatsApp
export interface WhatsAppConfig {
  phoneNumber: string
  linkUrl: string
}

// Datos estáticos de contacto
export interface ContactInfo {
  address: string
  city: string
  country: string
  whatsappLink: string
  whatsappNumber?: string
  mapUrl?: string
}
