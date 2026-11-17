'use client'

import React, { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { AdminSidebar } from '@/components/AdminSidebar'
import { STATIC_CATEGORIES, STATIC_BRANDS, EXCHANGE_RATE_BS } from '@/lib/data'
import { saveNewCustomProduct } from '@/lib/admin-storage'
import type { Product, ProductSpec, AvailabilityStatus, ProductStatus } from '@/types'
import { Upload, Plus, Trash2, Image as ImageIcon } from 'lucide-react'

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export default function NuevoProductoPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [model, setModel] = useState('')
  const [brandId, setBrandId] = useState('brand-sire')
  const [categoryId, setCategoryId] = useState('cat-bajos')
  const [subcategory, setSubcategory] = useState('')
  const [descriptionShort, setDescriptionShort] = useState('')
  const [descriptionLong, setDescriptionLong] = useState('')
  const [priceUsd, setPriceUsd] = useState('')
  const [priceBs, setPriceBs] = useState('')
  const [availability, setAvailability] = useState<AvailabilityStatus>('available')
  const [status, setStatus] = useState<ProductStatus>('published')
  const [featured, setFeatured] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [notes, setNotes] = useState('')
  const [specs, setSpecs] = useState<ProductSpec[]>([
    { key: 'Marca', value: '' },
    { key: 'Modelo', value: '' },
    { key: 'Acabado / Color', value: '' },
  ])

  const handlePriceUsdChange = (val: string) => {
    setPriceUsd(val)
    const num = parseFloat(val)
    if (!Number.isNaN(num) && num >= 0) {
      setPriceBs((num * EXCHANGE_RATE_BS).toFixed(2))
    } else {
      setPriceBs('')
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
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
          setImageUrl(canvas.toDataURL('image/webp', 0.84))
        }
      }
      img.src = reader.result as string
    }
    reader.readAsDataURL(file)
  }

  const handleSpecChange = (idx: number, field: 'key' | 'value', val: string) => {
    setSpecs(prev => prev.map((s, i) => (i === idx ? { ...s, [field]: val } : s)))
  }

  const handleAddSpecRow = () => {
    setSpecs(prev => [...prev, { key: '', value: '' }])
  }

  const handleRemoveSpecRow = (idx: number) => {
    setSpecs(prev => prev.filter((_, i) => i !== idx))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    const finalSlug = slug.trim() ? slugify(slug) : `${slugify(name)}-${Date.now().toString().slice(-4)}`
    const id = `custom-${finalSlug}`
    const brand = STATIC_BRANDS.find(b => b.id === brandId)
    const category = STATIC_CATEGORIES.find(c => c.id === categoryId)
    const parsedUsd = priceUsd ? parseFloat(priceUsd) : undefined
    const parsedBs = priceBs ? parseFloat(priceBs) : parsedUsd ? Number((parsedUsd * EXCHANGE_RATE_BS).toFixed(2)) : undefined

    const validSpecs = specs.filter(s => s.key.trim() && s.value.trim())

    const newProduct: Product = {
      id,
      name: name.trim(),
      slug: finalSlug,
      brand_id: brandId,
      brand,
      category_id: categoryId,
      category,
      subcategory: subcategory.trim() || category?.name || 'Instrumento',
      model: model.trim() || undefined,
      description_short:
        descriptionShort.trim() ||
        `${name.trim()} disponible en Don Bolivia.${parsedUsd ? ` Precio: $${parsedUsd.toFixed(2)} USD (Bs ${parsedBs?.toFixed(2)}).` : ''}`,
      description_long: descriptionLong.trim() || descriptionShort.trim() || undefined,
      price: parsedUsd,
      price_bs: parsedBs,
      currency: 'USD',
      availability,
      status,
      featured,
      order: 1,
      specs: validSpecs,
      images: imageUrl.trim()
        ? [
            {
              id: `${id}-img-0`,
              product_id: id,
              url: imageUrl.trim(),
              alt_text: name.trim(),
              order: 0,
              is_primary: true,
              created_at: new Date().toISOString(),
            },
          ]
        : [],
      primary_image_url: imageUrl.trim() || undefined,
      notes: notes.trim() || undefined,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    saveNewCustomProduct(newProduct, imageUrl.trim() || undefined)
    router.push('/admin/productos')
  }

  return (
    <div className="admin-shell">
      <AdminSidebar />
      <main className="admin-content">
        <div className="admin-header">
          <div>
            <a
              href="/admin/productos"
              style={{
                fontSize: '0.8125rem',
                color: '#6B6B68',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                marginBottom: '0.5rem',
              }}
            >
              ← Volver a productos
            </a>
            <h1 className="admin-title">Añadir nuevo producto</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ maxWidth: '920px' }}>
          {/* Información general */}
          <div className="admin-card">
            <h2
              style={{
                fontSize: '1rem',
                fontWeight: 700,
                color: '#222223',
                marginBottom: '1.25rem',
                paddingBottom: '0.75rem',
                borderBottom: '1px solid #E8E8E5',
              }}
            >
              Información general
            </h2>
            <div className="admin-form-grid">
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label" htmlFor="product-name">
                  Nombre del producto *
                </label>
                <input
                  id="product-name"
                  type="text"
                  className="form-input"
                  placeholder="Ej: Marcus Miller by Sire V7 Alder-5 — BK"
                  value={name}
                  onChange={e => {
                    setName(e.target.value)
                    if (!slug) setSlug(slugify(e.target.value))
                  }}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="product-model">
                  Modelo / SKU
                </label>
                <input
                  id="product-model"
                  type="text"
                  className="form-input"
                  placeholder="Ej: V7 ALDER-5 · BK o EC6866"
                  value={model}
                  onChange={e => setModel(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="product-slug">
                  Slug (URL amigable)
                </label>
                <input
                  id="product-slug"
                  type="text"
                  className="form-input"
                  placeholder="sire-v7-alder-5-bk"
                  value={slug}
                  onChange={e => setSlug(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="product-brand">
                  Marca *
                </label>
                <select
                  id="product-brand"
                  className="form-select"
                  value={brandId}
                  onChange={e => setBrandId(e.target.value)}
                  required
                >
                  {STATIC_BRANDS.map(b => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="product-category">
                  Categoría *
                </label>
                <select
                  id="product-category"
                  className="form-select"
                  value={categoryId}
                  onChange={e => setCategoryId(e.target.value)}
                  required
                >
                  {STATIC_CATEGORIES.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label" htmlFor="product-subcategory">
                  Subcategoría
                </label>
                <input
                  id="product-subcategory"
                  type="text"
                  className="form-input"
                  placeholder="Ej: Bajo eléctrico 5 cuerdas Marcus Miller by Sire"
                  value={subcategory}
                  onChange={e => setSubcategory(e.target.value)}
                />
              </div>

              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label" htmlFor="product-desc-short">
                  Descripción breve
                </label>
                <textarea
                  id="product-desc-short"
                  className="form-textarea"
                  placeholder="Se muestra en la tarjeta del catálogo y ficha rápida"
                  rows={2}
                  value={descriptionShort}
                  onChange={e => setDescriptionShort(e.target.value)}
                />
              </div>

              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label" htmlFor="product-desc-long">
                  Descripción completa
                </label>
                <textarea
                  id="product-desc-long"
                  className="form-textarea"
                  placeholder="Descripción detallada del instrumento"
                  rows={3}
                  value={descriptionLong}
                  onChange={e => setDescriptionLong(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Precios y Disponibilidad */}
          <div className="admin-card">
            <h2
              style={{
                fontSize: '1rem',
                fontWeight: 700,
                color: '#222223',
                marginBottom: '1.25rem',
                paddingBottom: '0.75rem',
                borderBottom: '1px solid #E8E8E5',
              }}
            >
              Precios y estado (TC {EXCHANGE_RATE_BS} Bs/USD)
            </h2>
            <div className="admin-form-grid">
              <div className="form-group">
                <label className="form-label" htmlFor="product-price-usd">
                  Precio en USD ($)
                </label>
                <input
                  id="product-price-usd"
                  type="number"
                  step="0.01"
                  className="form-input"
                  placeholder="1355.00"
                  value={priceUsd}
                  onChange={e => handlePriceUsdChange(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="product-price-bs">
                  Precio en Bolivianos (Bs) — Automático o manual
                </label>
                <input
                  id="product-price-bs"
                  type="number"
                  step="0.01"
                  className="form-input"
                  placeholder="16327.75"
                  value={priceBs}
                  onChange={e => setPriceBs(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="product-availability">
                  Disponibilidad
                </label>
                <select
                  id="product-availability"
                  className="form-select"
                  value={availability}
                  onChange={e => setAvailability(e.target.value as AvailabilityStatus)}
                >
                  <option value="available">Disponible</option>
                  <option value="consultar">Consultar stock</option>
                  <option value="unavailable">No disponible</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="product-status">
                  Estado de publicación
                </label>
                <select
                  id="product-status"
                  className="form-select"
                  value={status}
                  onChange={e => setStatus(e.target.value as ProductStatus)}
                >
                  <option value="published">Publicado</option>
                  <option value="draft">Borrador</option>
                </select>
              </div>

              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input
                    id="product-featured"
                    type="checkbox"
                    checked={featured}
                    onChange={e => setFeatured(e.target.checked)}
                  />
                  <span className="form-label" style={{ margin: 0 }}>
                    Marcar como producto destacado (aparece en el carrusel de Inicio)
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Imagen del producto (opcional: si se deja vacío queda en Blanco/Negro) */}
          <div className="admin-card">
            <h2
              style={{
                fontSize: '1rem',
                fontWeight: 700,
                color: '#222223',
                marginBottom: '0.5rem',
              }}
            >
              Imagen del producto (Opcional)
            </h2>
            <p style={{ fontSize: '0.8125rem', color: '#6B6B68', marginBottom: '1rem' }}>
              Si lo dejas vacío, el producto se mostrará con la tarjeta minimalista en Blanco/Negro hasta que subas su foto.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: '1.25rem', alignItems: 'center' }}>
              <div
                style={{
                  width: '160px',
                  height: '160px',
                  borderRadius: '14px',
                  background: imageUrl ? '#FFFFFF' : '#141414',
                  color: '#FAF8F5',
                  border: '1px solid #E8E8E5',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  padding: '0.75rem',
                  textAlign: 'center',
                }}
              >
                {imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={imageUrl}
                    alt="Vista previa"
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                ) : (
                  <>
                    <ImageIcon size={24} style={{ opacity: 0.55, marginBottom: '0.35rem' }} />
                    <span style={{ fontSize: '0.7rem', opacity: 0.8 }}>Blanco / Negro</span>
                  </>
                )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="btn-admin btn-admin-secondary"
                  >
                    <Upload size={15} /> Subir imagen desde tu computadora
                  </button>
                  {imageUrl && (
                    <button
                      type="button"
                      onClick={() => setImageUrl('')}
                      className="btn-admin btn-admin-secondary"
                      style={{ color: '#8E1B16' }}
                    >
                      Quitar imagen
                    </button>
                  )}
                </div>

                <input
                  type="text"
                  className="form-input"
                  placeholder="O pega una URL / ruta de imagen (ej: /catalog-images/...)"
                  value={imageUrl}
                  onChange={e => setImageUrl(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Especificaciones técnicas */}
          <div className="admin-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div>
                <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#222223' }}>
                  Especificaciones técnicas
                </h2>
                <p style={{ fontSize: '0.8125rem', color: '#6B6B68' }}>
                  Atributos que se mostrarán en la tabla técnica del producto.
                </p>
              </div>
              <button type="button" onClick={handleAddSpecRow} className="btn-admin btn-admin-secondary">
                <Plus size={14} /> Añadir fila
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {specs.map((sp, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr auto', gap: '0.5rem' }}>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Atributo (ej: Cuerdas)"
                    value={sp.key}
                    onChange={e => handleSpecChange(i, 'key', e.target.value)}
                  />
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Valor (ej: 5 cuerdas)"
                    value={sp.value}
                    onChange={e => handleSpecChange(i, 'value', e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveSpecRow(i)}
                    className="btn-admin btn-admin-secondary"
                    style={{ padding: '0.4rem 0.6rem', color: '#8E1B16' }}
                    title="Eliminar fila"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Notas internas */}
          <div className="admin-card">
            <h2
              style={{
                fontSize: '1rem',
                fontWeight: 700,
                color: '#222223',
                marginBottom: '0.75rem',
              }}
            >
              Notas internas
            </h2>
            <textarea
              id="product-notes"
              className="form-textarea"
              placeholder="Notas sobre existencias, precio sin gigbag, etc."
              rows={2}
              value={notes}
              onChange={e => setNotes(e.target.value)}
            />
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2.5rem' }}>
            <button type="submit" className="btn-admin btn-admin-primary" id="save-product-btn">
              <Plus size={16} /> Guardar y publicar producto
            </button>
            <a href="/admin/productos" className="btn-admin btn-admin-secondary">
              Cancelar
            </a>
          </div>
        </form>
      </main>
    </div>
  )
}
