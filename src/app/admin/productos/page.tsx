'use client'

import React, { useState, useMemo, useRef } from 'react'
import Link from 'next/link'
import { AdminSidebar } from '@/components/AdminSidebar'
import { STATIC_CATEGORIES, STATIC_BRANDS, EXCHANGE_RATE_BS } from '@/lib/data'
import {
  useCatalogProducts,
  saveProductEdit,
  ADMIN_IMAGE_STORAGE_KEY,
} from '@/lib/admin-storage'
import type { Product } from '@/types'
import {
  Eye,
  Star,
  Upload,
  Trash2,
  Check,
  Image as ImageIcon,
  Download,
  Plus,
  Edit,
} from 'lucide-react'

export default function AdminProductosPage() {
  const { products, refresh } = useCatalogProducts()
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [brandFilter, setBrandFilter] = useState('')
  const [imageFilter, setImageFilter] = useState<'all' | 'with_image' | 'no_image'>('all')
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [editName, setEditName] = useState('')
  const [editModel, setEditModel] = useState('')
  const [editPriceUsd, setEditPriceUsd] = useState('')
  const [editPriceBs, setEditPriceBs] = useState('')
  const [editFeatured, setEditFeatured] = useState(false)
  const [imageUrlInput, setImageUrlInput] = useState('')
  const [savedNotice, setSavedNotice] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const filteredProducts = useMemo(() => {
    const q = search.toLowerCase().trim()
    return products.filter(p => {
      if (categoryFilter && p.category_id !== categoryFilter) return false
      if (brandFilter && p.brand_id !== brandFilter) return false
      const hasImg = Boolean(p.primary_image_url || p.images?.[0]?.url)
      if (imageFilter === 'with_image' && !hasImg) return false
      if (imageFilter === 'no_image' && hasImg) return false
      if (!q) return true
      return (
        p.name.toLowerCase().includes(q) ||
        p.model?.toLowerCase().includes(q) ||
        p.brand?.name.toLowerCase().includes(q) ||
        p.subcategory?.toLowerCase().includes(q)
      )
    })
  }, [products, search, categoryFilter, brandFilter, imageFilter])

  const handleOpenEditModal = (product: Product) => {
    setEditingProduct(product)
    setEditName(product.name)
    setEditModel(product.model || '')
    setEditPriceUsd(product.price !== undefined ? String(product.price) : '')
    setEditPriceBs(product.price_bs !== undefined ? String(product.price_bs) : '')
    setEditFeatured(Boolean(product.featured))
    setImageUrlInput(product.primary_image_url || product.images?.[0]?.url || '')
  }

  const handleEditUsdChange = (val: string) => {
    setEditPriceUsd(val)
    const num = parseFloat(val)
    if (!Number.isNaN(num) && num >= 0) {
      setEditPriceBs((num * EXCHANGE_RATE_BS).toFixed(2))
    } else {
      setEditPriceBs('')
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !editingProduct) return

    const reader = new FileReader()
    reader.onload = () => {
      const img = new window.Image()
      img.onload = () => {
        const maxDim = 900
        let w = img.width
        let h = img.height
        if (w > maxDim || h > maxDim) {
          if (w > h) {
            h = Math.round((h * maxDim) / w)
            w = maxDim
          } else {
            w = Math.round((w * maxDim) / h)
            h = maxDim
          }
        }
        const canvas = document.createElement('canvas')
        canvas.width = w
        canvas.height = h
        const ctx = canvas.getContext('2d')
        if (ctx) {
          ctx.fillStyle = '#FFFFFF'
          ctx.fillRect(0, 0, w, h)
          ctx.drawImage(img, 0, 0, w, h)
          const dataUrl = canvas.toDataURL('image/webp', 0.84)
          setImageUrlInput(dataUrl)
        }
      }
      img.src = reader.result as string
    }
    reader.readAsDataURL(file)
  }

  const handleSaveProductChanges = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingProduct) return

    const parsedUsd = editPriceUsd ? parseFloat(editPriceUsd) : undefined
    const parsedBs = editPriceBs
      ? parseFloat(editPriceBs)
      : parsedUsd
        ? Number((parsedUsd * EXCHANGE_RATE_BS).toFixed(2))
        : undefined

    saveProductEdit(
      editingProduct.id,
      {
        name: editName.trim() || editingProduct.name,
        model: editModel.trim() || undefined,
        price: parsedUsd,
        price_bs: parsedBs,
        featured: editFeatured,
      },
      imageUrlInput
    )
    refresh()
    setSavedNotice(`Producto actualizado: ${editName.trim() || editingProduct.name}`)
    window.setTimeout(() => setSavedNotice(null), 3000)
    setEditingProduct(null)
  }

  const handleRemoveImage = (product: Product) => {
    saveProductEdit(product.id, {}, '')
    refresh()
    setSavedNotice(`Imagen eliminada de ${product.name}`)
    window.setTimeout(() => setSavedNotice(null), 3000)
  }

  const handleExportImagesJson = () => {
    const raw = window.localStorage.getItem(ADMIN_IMAGE_STORAGE_KEY) || '{}'
    const blob = new Blob([raw], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'don-bolivia-imagenes-productos.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const totalWithImage = products.filter(p =>
    Boolean(p.primary_image_url || p.images?.[0]?.url)
  ).length

  return (
    <div className="admin-shell">
      <AdminSidebar />
      <main className="admin-content">
        <div className="admin-header">
          <div>
            <h1 className="admin-title">Productos ({products.length})</h1>
            <p style={{ color: '#6B6B68', fontSize: '0.875rem', marginTop: '0.25rem' }}>
              {products.length} productos en catálogo · {totalWithImage} con imagen ·{' '}
              {products.length - totalWithImage} en blanco/negro pendientes de foto
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
            <Link href="/admin/productos/nuevo" className="btn-admin btn-admin-primary" id="admin-new-product-btn">
              <Plus size={16} /> Nuevo producto
            </Link>
            {totalWithImage > 0 && (
              <button
                type="button"
                onClick={handleExportImagesJson}
                className="btn-admin btn-admin-secondary"
              >
                <Download size={15} /> Exportar imágenes ({totalWithImage})
              </button>
            )}
            <a href="/catalogo" target="_blank" rel="noopener noreferrer" className="btn-admin btn-admin-secondary">
              <Eye size={16} /> Ver catálogo público
            </a>
          </div>
        </div>

        {savedNotice && (
          <div
            style={{
              background: '#181818',
              color: '#FAF8F5',
              padding: '0.85rem 1.25rem',
              borderRadius: '8px',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.875rem',
            }}
          >
            <Check size={16} color="#34d399" />
            <span>{savedNotice}</span>
          </div>
        )}

        {/* Filter bar */}
        <div className="admin-card" style={{ padding: '1rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <input
              type="search"
              placeholder="Buscar por modelo, SKU o nombre…"
              className="form-input"
              style={{ maxWidth: '280px' }}
              value={search}
              onChange={e => setSearch(e.target.value)}
              aria-label="Buscar producto"
              id="admin-products-search"
            />
            <select
              className="form-select"
              style={{ maxWidth: '190px' }}
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              aria-label="Filtrar por categoría"
              id="admin-products-category"
            >
              <option value="">Todas las categorías</option>
              {STATIC_CATEGORIES.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <select
              className="form-select"
              style={{ maxWidth: '170px' }}
              value={brandFilter}
              onChange={e => setBrandFilter(e.target.value)}
              aria-label="Filtrar por marca"
              id="admin-products-brand"
            >
              <option value="">Todas las marcas</option>
              {STATIC_BRANDS.map(b => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
            <select
              className="form-select"
              style={{ maxWidth: '190px' }}
              value={imageFilter}
              onChange={e => setImageFilter(e.target.value as 'all' | 'with_image' | 'no_image')}
              aria-label="Filtrar por imagen"
            >
              <option value="all">Todas las tarjetas</option>
              <option value="no_image">Sin imagen (Blanco/Negro)</option>
              <option value="with_image">Con imagen cargada</option>
            </select>
            <span style={{ fontSize: '0.8125rem', color: '#6B6B68', marginLeft: 'auto' }}>
              Mostrando {filteredProducts.length} de {products.length}
            </span>
          </div>
        </div>

        {/* Table */}
        <div style={{ background: 'white', border: '1px solid #E8E8E5', borderRadius: '8px', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th style={{ width: '68px' }}>Vista</th>
                  <th>Producto</th>
                  <th>Marca</th>
                  <th>Categoría</th>
                  <th>Precio USD</th>
                  <th>Precio Bs (12.05)</th>
                  <th style={{ textAlign: 'right' }}>Imagen / Editar</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map(product => {
                  const imgSrc = product.primary_image_url || product.images?.[0]?.url
                  const isDark = product.order % 2 === 0

                  return (
                    <tr key={product.id}>
                      <td>
                        <div
                          onClick={() => handleOpenEditModal(product)}
                          title="Clic para subir imagen o editar"
                          style={{
                            width: '46px',
                            height: '46px',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: imgSrc ? '#FFFFFF' : isDark ? '#141414' : '#F4F3EF',
                            color: isDark ? '#FAF8F5' : '#181818',
                            border: '1px solid rgba(24,24,24,0.12)',
                            fontSize: '9px',
                            fontWeight: 700,
                            textAlign: 'center',
                            padding: '2px',
                          }}
                        >
                          {imgSrc ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={imgSrc}
                              alt={product.name}
                              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                            />
                          ) : (
                            <span>{product.brand?.name?.slice(0, 4).toUpperCase()}</span>
                          )}
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                          {product.featured && (
                            <Star size={12} style={{ color: '#8E1B16', flexShrink: 0 }} aria-label="Destacado" />
                          )}
                          <div>
                            <div style={{ fontWeight: 600, fontSize: '0.875rem', color: '#222223' }}>
                              {product.name}
                            </div>
                            {product.model && (
                              <div style={{ fontSize: '0.75rem', color: '#6B6B68' }}>
                                Modelo / SKU: {product.model}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td style={{ fontSize: '0.875rem', color: '#6B6B68' }}>
                        {product.brand?.name || '—'}
                      </td>
                      <td style={{ fontSize: '0.875rem', color: '#6B6B68' }}>
                        {product.category?.name || '—'}
                      </td>
                      <td style={{ fontSize: '0.875rem' }}>
                        {product.price ? (
                          <span style={{ fontWeight: 600 }}>
                            ${product.price.toLocaleString('es-BO', { minimumFractionDigits: 2 })} USD
                          </span>
                        ) : (
                          <span style={{ color: '#A8A8A4' }}>Consultar</span>
                        )}
                      </td>
                      <td style={{ fontSize: '0.875rem', color: '#5C5954' }}>
                        {product.price_bs ? (
                          <span>
                            Bs {product.price_bs.toLocaleString('es-BO', { minimumFractionDigits: 2 })}
                          </span>
                        ) : (
                          '—'
                        )}
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'flex-end' }}>
                          <button
                            type="button"
                            onClick={() => handleOpenEditModal(product)}
                            className="btn-admin btn-admin-secondary"
                            style={{ padding: '0.375rem 0.65rem', fontSize: '0.75rem' }}
                          >
                            <Upload size={13} />
                            <span>{imgSrc ? 'Editar / Foto' : 'Subir foto'}</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleOpenEditModal(product)}
                            className="btn-admin btn-admin-secondary"
                            title="Editar datos del producto"
                            style={{ padding: '0.375rem 0.5rem' }}
                          >
                            <Edit size={13} />
                          </button>
                          {imgSrc && (
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(product)}
                              className="btn-admin btn-admin-secondary"
                              title="Volver a blanco/negro"
                              style={{ padding: '0.375rem 0.5rem', color: '#8E1B16' }}
                            >
                              <Trash2 size={13} />
                            </button>
                          )}
                          <a
                            href={`/producto/${product.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-admin btn-admin-secondary"
                            title="Ver en sitio"
                            aria-label={`Ver ${product.name} en el sitio`}
                            style={{ padding: '0.375rem 0.5rem' }}
                          >
                            <Eye size={14} />
                          </a>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal para subir imagen o editar producto */}
        {editingProduct && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(12, 12, 14, 0.55)',
              backdropFilter: 'blur(6px)',
              zIndex: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem',
            }}
            onClick={() => setEditingProduct(null)}
          >
            <div
              style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                maxWidth: '540px',
                width: '100%',
                padding: '1.75rem',
                boxShadow: '0 24px 60px rgba(0,0,0,0.25)',
                maxHeight: '90vh',
                overflowY: 'auto',
              }}
              onClick={e => e.stopPropagation()}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8E1B16' }}>
                    {editingProduct.brand?.name} · {editingProduct.category?.name}
                  </span>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#181818', marginTop: '0.2rem' }}>
                    Editar producto e imagen
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '1.1rem', color: '#6B6B68' }}
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveProductChanges} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                {/* Preview */}
                <div
                  style={{
                    height: '180px',
                    borderRadius: '12px',
                    background: imageUrlInput ? '#F8F7F4' : '#141414',
                    color: '#FAF8F5',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    border: '1px solid #E8E8E5',
                    position: 'relative',
                  }}
                >
                  {imageUrlInput ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={imageUrlInput}
                      alt={editName}
                      style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '0.85rem' }}
                    />
                  ) : (
                    <>
                      <ImageIcon size={26} style={{ opacity: 0.5, marginBottom: '0.4rem' }} />
                      <span style={{ fontSize: '0.78rem', opacity: 0.8 }}>
                        Tarjeta en Negro / Blanco (Sin imagen)
                      </span>
                    </>
                  )}
                </div>

                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="btn-admin btn-admin-secondary"
                    style={{ width: '100%', justifyContent: 'center', padding: '0.6rem' }}
                  >
                    <Upload size={15} />
                    <span>Subir imagen desde tu computadora</span>
                  </button>
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ fontSize: '0.75rem' }}>
                    O pegar ruta / URL de imagen:
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Ej: /catalog-images/sire/p006_img00.jpeg o https://..."
                    value={imageUrlInput}
                    onChange={e => setImageUrlInput(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ fontSize: '0.75rem' }}>
                    Nombre del producto:
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    value={editName}
                    onChange={e => setEditName(e.target.value)}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.65rem' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.75rem' }}>
                      Modelo / SKU:
                    </label>
                    <input
                      type="text"
                      className="form-input"
                      value={editModel}
                      onChange={e => setEditModel(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.75rem' }}>
                      Precio USD ($):
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      className="form-input"
                      value={editPriceUsd}
                      onChange={e => handleEditUsdChange(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.75rem' }}>
                      Precio Bs (12.05):
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      className="form-input"
                      value={editPriceBs}
                      onChange={e => setEditPriceBs(e.target.value)}
                    />
                  </div>
                </div>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.8125rem' }}>
                  <input
                    type="checkbox"
                    checked={editFeatured}
                    onChange={e => setEditFeatured(e.target.checked)}
                  />
                  <span>Producto destacado (mostrar en carrusel de Inicio)</span>
                </label>

                <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                  {imageUrlInput && (
                    <button
                      type="button"
                      onClick={() => setImageUrlInput('')}
                      className="btn-admin btn-admin-secondary"
                      style={{ marginRight: 'auto', color: '#8E1B16' }}
                    >
                      Dejar sin foto
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="btn-admin btn-admin-secondary"
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn-admin btn-admin-primary">
                    Guardar cambios
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
