'use client'
import { useState, useMemo, useEffect } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { ProductCard } from '@/components/ProductCard'
import { STATIC_PRODUCTS, STATIC_CATEGORIES, STATIC_BRANDS } from '@/lib/data'
import type { Product } from '@/types'

interface CatalogClientProps {
  initialCategory?: string
  initialBrand?: string
}

type SortOption = 'relevance' | 'name_asc' | 'name_desc' | 'price_asc' | 'price_desc'

export function CatalogClient({ initialCategory, initialBrand }: CatalogClientProps) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState(initialCategory || '')
  const [brand, setBrand] = useState(initialBrand || '')
  const [sort, setSort] = useState<SortOption>('relevance')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    const urlCategory = params.get('category')
    const urlBrand = params.get('brand')
    if (urlCategory && !initialCategory) setCategory(urlCategory)
    if (urlBrand && !initialBrand) setBrand(urlBrand)
  }, [initialCategory, initialBrand])

  const publishedProducts = useMemo(
    () => STATIC_PRODUCTS.filter(p => p.status === 'published'),
    []
  )

  // Get available categories and brands from published products
  const availableCategories = useMemo(() => {
    const ids = new Set(publishedProducts.map(p => p.category_id))
    return STATIC_CATEGORIES.filter(c => c.active && ids.has(c.id))
  }, [publishedProducts])

  const availableBrands = useMemo(() => {
    const ids = new Set(publishedProducts.map(p => p.brand_id))
    return STATIC_BRANDS.filter(b => b.active && ids.has(b.id))
  }, [publishedProducts])

  const filtered = useMemo(() => {
    let results = [...publishedProducts]
    const q = search.toLowerCase().trim()

    if (q) {
      results = results.filter(p =>
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

    // Sort
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
        // relevance: featured first, then by order
        results.sort((a, b) => {
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return a.order - b.order
        })
    }

    return results
  }, [publishedProducts, search, category, brand, sort])

  const hasActiveFilters = search || category || brand || sort !== 'relevance'

  function clearFilters() {
    setSearch('')
    setCategory('')
    setBrand('')
    setSort('relevance')
  }

  return (
    <>
      {/* Search + filter bar */}
      <div
        style={{
          background: 'white',
          borderBottom: '1px solid var(--color-gray-200)',
          padding: '1rem 0',
          position: 'sticky',
          top: '64px',
          zIndex: 50,
        }}
      >
        <div className="container">
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
            {/* Search */}
            <div className="search-wrapper" style={{ flex: '1 1 200px' }}>
              <Search size={16} className="search-icon" aria-hidden="true" />
              <input
                type="search"
                className="search-input"
                placeholder="Buscar por nombre, marca, modelo…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                aria-label="Buscar productos"
                id="catalog-search"
              />
            </div>

            {/* Mobile filter toggle */}
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setShowFilters(!showFilters)}
              aria-expanded={showFilters}
              id="catalog-filter-toggle"
              style={{ whiteSpace: 'nowrap' }}
            >
              <SlidersHorizontal size={14} />
              Filtros
            </button>

            {/* Sort */}
            <select
              className="form-select"
              style={{ maxWidth: '180px', padding: '0.5rem 0.75rem', fontSize: '0.875rem' }}
              value={sort}
              onChange={e => setSort(e.target.value as SortOption)}
              aria-label="Ordenar productos"
              id="catalog-sort"
            >
              <option value="relevance">Relevancia</option>
              <option value="name_asc">Nombre A–Z</option>
              <option value="name_desc">Nombre Z–A</option>
              <option value="price_asc">Precio menor a mayor</option>
              <option value="price_desc">Precio mayor a menor</option>
            </select>

            {hasActiveFilters && (
              <button className="btn btn-ghost btn-sm" onClick={clearFilters} aria-label="Limpiar filtros" id="catalog-clear-filters">
                <X size={14} /> Limpiar
              </button>
            )}
          </div>

          {/* Filter chips */}
          {showFilters && (
            <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {/* Category chips */}
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-gray-500)', alignSelf: 'center', marginRight: '0.25rem' }}>
                Categoría:
              </span>
              <button
                className={`filter-chip ${!category ? 'filter-chip--active' : ''}`}
                onClick={() => setCategory('')}
                id="filter-category-all"
              >
                Todos
              </button>
              {availableCategories.map(cat => (
                <button
                  key={cat.id}
                  className={`filter-chip ${category === cat.slug ? 'filter-chip--active' : ''}`}
                  onClick={() => setCategory(cat.slug)}
                  id={`filter-category-${cat.slug}`}
                >
                  {cat.name}
                </button>
              ))}

              {/* Brand chips */}
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-gray-500)', alignSelf: 'center', marginLeft: '0.5rem', marginRight: '0.25rem' }}>
                Marca:
              </span>
              <button
                className={`filter-chip ${!brand ? 'filter-chip--active' : ''}`}
                onClick={() => setBrand('')}
                id="filter-brand-all"
              >
                Todas
              </button>
              {availableBrands.map(br => (
                <button
                  key={br.id}
                  className={`filter-chip ${brand === br.slug ? 'filter-chip--active' : ''}`}
                  onClick={() => setBrand(br.slug)}
                  id={`filter-brand-${br.slug}`}
                >
                  {br.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="container" style={{ paddingBlock: '1.5rem 3rem' }}>
        <div style={{ marginBottom: '1rem', fontSize: '0.875rem', color: 'var(--color-gray-500)' }}>
          {filtered.length === 0
            ? null
            : `${filtered.length} ${filtered.length === 1 ? 'producto' : 'productos'}`}
        </div>

        {filtered.length > 0 ? (
          <div className="products-grid">
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} showWhatsApp />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
            <p style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              Sin resultados
            </p>
            <p style={{ color: 'var(--color-gray-500)', marginBottom: '1.5rem' }}>
              No encontramos productos con esos criterios. Prueba con otra búsqueda o contáctanos directamente.
            </p>
            <a
              href="https://wa.link/um8fsd"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              Consultar por WhatsApp
            </a>
          </div>
        )}
      </div>
    </>
  )
}
