'use client'

import React, { useState, useMemo, useEffect } from 'react'
import { Search, X, ArrowUpRight, SlidersHorizontal } from 'lucide-react'
import { ProductCard } from '@/components/ProductCard'
import { STATIC_PRODUCTS, STATIC_CATEGORIES, STATIC_BRANDS } from '@/lib/data'
import { useStoreInteractive } from '@/components/StoreInteractiveProvider'

interface CatalogClientProps {
  initialCategory?: string
  initialBrand?: string
}

type SortOption = 'relevance' | 'name_asc' | 'name_desc' | 'price_asc' | 'price_desc'

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'relevance', label: 'Destacados' },
  { value: 'name_asc', label: 'Nombre A – Z' },
  { value: 'name_desc', label: 'Nombre Z – A' },
  { value: 'price_asc', label: 'Menor precio' },
  { value: 'price_desc', label: 'Mayor precio' },
]

export function CatalogClient({ initialCategory, initialBrand }: CatalogClientProps) {
  const { openWhatsApp } = useStoreInteractive()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState(initialCategory || '')
  const [brand, setBrand] = useState(initialBrand || '')
  const [sort, setSort] = useState<SortOption>('relevance')

  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    const urlCategory = params.get('category')
    const urlBrand = params.get('brand')
    const urlQuery = params.get('q')
    if (urlCategory && !initialCategory) setCategory(urlCategory)
    if (urlBrand && !initialBrand) setBrand(urlBrand)
    if (urlQuery) setSearch(urlQuery)
  }, [initialCategory, initialBrand])

  const publishedProducts = useMemo(
    () => STATIC_PRODUCTS.filter(p => p.status === 'published'),
    []
  )

  const availableCategories = useMemo(() => {
    const ids = new Set(publishedProducts.map(p => p.category_id))
    return STATIC_CATEGORIES.filter(c => c.active && ids.has(c.id)).map(cat => ({
      ...cat,
      count: publishedProducts.filter(p => p.category_id === cat.id).length,
    }))
  }, [publishedProducts])

  const availableBrands = useMemo(() => {
    const ids = new Set(publishedProducts.map(p => p.brand_id))
    return STATIC_BRANDS.filter(b => b.active && ids.has(b.id)).map(br => ({
      ...br,
      count: publishedProducts.filter(p => p.brand_id === br.id).length,
    }))
  }, [publishedProducts])

  const filtered = useMemo(() => {
    let results = [...publishedProducts]
    const q = search.toLowerCase().trim()

    if (q) {
      results = results.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          p.model?.toLowerCase().includes(q) ||
          p.brand?.name.toLowerCase().includes(q) ||
          p.description_short?.toLowerCase().includes(q) ||
          p.category?.name.toLowerCase().includes(q) ||
          p.subcategory?.toLowerCase().includes(q)
      )
    }

    if (category) {
      const cat = STATIC_CATEGORIES.find(c => c.slug === category)
      if (cat) results = results.filter(p => p.category_id === cat.id)
    }

    if (brand) {
      const br = STATIC_BRANDS.find(b => b.slug === brand)
      if (br) results = results.filter(p => p.brand_id === br.id)
    }

    switch (sort) {
      case 'name_asc':
        results.sort((a, b) => a.name.localeCompare(b.name, 'es'))
        break
      case 'name_desc':
        results.sort((a, b) => b.name.localeCompare(a.name, 'es'))
        break
      case 'price_asc':
        results.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity))
        break
      case 'price_desc':
        results.sort((a, b) => (b.price ?? -Infinity) - (a.price ?? -Infinity))
        break
      default:
        results.sort((a, b) => {
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return a.order - b.order
        })
    }

    return results
  }, [publishedProducts, search, category, brand, sort])

  const hasActiveFilters = Boolean(search || category || brand || sort !== 'relevance')

  function clearFilters() {
    setSearch('')
    setCategory('')
    setBrand('')
    setSort('relevance')
  }

  return (
    <div className="lux-catalog-shell">
      <div className="lux-catalog-container">
        {/* Always-Visible Filter Panel */}
        <section className="lux-filter-panel" aria-label="Filtros del catálogo">
          <div className="lux-filter-panel__top">
            <div className="lux-filter-panel__title-wrap">
              <SlidersHorizontal size={15} className="lux-filter-panel__icon" />
              <span className="lux-filter-panel__heading">FILTRAR CATÁLOGO</span>
              <span className="lux-catalog-count">
                ({filtered.length} {filtered.length === 1 ? 'instrumento' : 'instrumentos'})
              </span>
            </div>

            {/* Search Input */}
            <div className="lux-catalog-search">
              <Search size={15} className="lux-catalog-search__icon" aria-hidden="true" />
              <input
                type="search"
                className="lux-catalog-search__input"
                placeholder="Buscar por modelo, serie o marca..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                aria-label="Buscar productos"
                id="catalog-search"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  className="lux-catalog-search__clear"
                  aria-label="Limpiar búsqueda"
                >
                  <X size={13} />
                </button>
              )}
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="lux-catalog-reset"
                id="catalog-clear-filters"
              >
                <X size={13} />
                <span>Limpiar filtros</span>
              </button>
            )}
          </div>

          <div className="lux-filter-panel__rows">
            {/* Row 1: Categorías */}
            <div className="lux-filter-group">
              <span className="lux-filter-group__label">CATEGORÍA</span>
              <div className="lux-filter-group__chips" role="group" aria-label="Filtrar por categoría">
                <button
                  type="button"
                  onClick={() => setCategory('')}
                  className={`lux-filter-pill ${!category ? 'lux-filter-pill--active' : ''}`}
                  id="filter-category-all"
                >
                  <span>Todas</span>
                  <span className="lux-filter-pill__num">{publishedProducts.length}</span>
                </button>
                {availableCategories.map(cat => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(prev => (prev === cat.slug ? '' : cat.slug))}
                    className={`lux-filter-pill ${
                      category === cat.slug ? 'lux-filter-pill--active' : ''
                    }`}
                    id={`filter-category-${cat.slug}`}
                  >
                    <span>{cat.name}</span>
                    <span className="lux-filter-pill__num">{cat.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Row 2: Marcas & Orden */}
            <div className="lux-filter-panel__split">
              <div className="lux-filter-group">
                <span className="lux-filter-group__label">MARCA OFICIAL</span>
                <div className="lux-filter-group__chips" role="group" aria-label="Filtrar por marca">
                  <button
                    type="button"
                    onClick={() => setBrand('')}
                    className={`lux-filter-pill ${!brand ? 'lux-filter-pill--active' : ''}`}
                    id="filter-brand-all"
                  >
                    <span>Todas</span>
                  </button>
                  {availableBrands.map(br => (
                    <button
                      key={br.id}
                      type="button"
                      onClick={() => setBrand(prev => (prev === br.slug ? '' : br.slug))}
                      className={`lux-filter-pill ${
                        brand === br.slug ? 'lux-filter-pill--active' : ''
                      }`}
                      id={`filter-brand-${br.slug}`}
                    >
                      <span>{br.name}</span>
                      <span className="lux-filter-pill__num">{br.count}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="lux-filter-group">
                <span className="lux-filter-group__label">ORDENAR POR</span>
                <div className="lux-filter-group__chips" role="group" aria-label="Ordenar productos">
                  {SORT_OPTIONS.map(opt => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setSort(opt.value)}
                      className={`lux-filter-pill ${
                        sort === opt.value ? 'lux-filter-pill--active' : ''
                      }`}
                      id={`sort-${opt.value}`}
                    >
                      <span>{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Results Grid */}
        {filtered.length > 0 ? (
          <div className="lux-catalog-grid">
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} showWhatsApp />
            ))}
          </div>
        ) : (
          <div className="lux-catalog-empty">
            <h3 className="lux-catalog-empty__title">
              No encontramos instrumentos con ese filtro.
            </h3>
            <p className="lux-catalog-empty__desc">
              Prueba con otra palabra clave o consúltanos directamente por WhatsApp para encargos especiales.
            </p>
            <div className="lux-catalog-empty__actions">
              <button
                type="button"
                onClick={clearFilters}
                className="lux-btn-outline-sm"
              >
                Ver todo el catálogo
              </button>
              <button
                type="button"
                onClick={() =>
                  openWhatsApp(
                    'Hola Don Bolivia! Busco un instrumento específico que no encontré en el catálogo web.'
                  )
                }
                className="lux-btn-dark"
              >
                <span>Consultar por WhatsApp</span>
                <ArrowUpRight size={15} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
