'use client'

import { AdminSidebar } from '@/components/AdminSidebar'
import { STATIC_CATEGORIES, STATIC_BRANDS } from '@/lib/data'

export default function NuevoProductoPage() {
  return (
    <div className="admin-shell">
      <AdminSidebar />
      <main className="admin-content">
        <div className="admin-header">
          <div>
            <a href="/admin/productos" style={{ fontSize: '0.8125rem', color: '#6B6B68', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '0.5rem' }}>
              ← Volver a productos
            </a>
            <h1 className="admin-title">Nuevo producto</h1>
          </div>
        </div>

        <div className="admin-alert admin-alert-info">
          <strong>Modo demostración:</strong> El formulario está disponible, pero en modo estático
          los datos no persisten. Para habilitar la creación real de productos, conecta Supabase
          siguiendo las instrucciones del <code>README.md</code>.
        </div>

        <form
          onSubmit={e => { e.preventDefault(); alert('Para guardar productos, configura Supabase siguiendo el README.') }}
          style={{ maxWidth: '900px' }}
        >
          {/* Información general */}
          <div className="admin-card">
            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#222223', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid #E8E8E5' }}>
              Información general
            </h2>
            <div className="admin-form-grid">
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label" htmlFor="product-name">Nombre del producto *</label>
                <input id="product-name" name="name" type="text" className="form-input" placeholder="Ej: Marcus Miller by Sire V5" required />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="product-slug">Slug (URL)</label>
                <input id="product-slug" name="slug" type="text" className="form-input" placeholder="sire-v5-bajo-4-cuerdas" />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="product-model">Modelo</label>
                <input id="product-model" name="model" type="text" className="form-input" placeholder="V5" />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="product-brand">Marca *</label>
                <select id="product-brand" name="brand_id" className="form-select" required>
                  <option value="">Seleccionar marca…</option>
                  {STATIC_BRANDS.map(b => (
                    <option key={b.id} value={b.id}>{b.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="product-category">Categoría *</label>
                <select id="product-category" name="category_id" className="form-select" required>
                  <option value="">Seleccionar categoría…</option>
                  {STATIC_CATEGORIES.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="product-subcategory">Subcategoría</label>
                <input id="product-subcategory" name="subcategory" type="text" className="form-input" placeholder="Ej: Bajo eléctrico 4 cuerdas" />
              </div>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label" htmlFor="product-desc-short">Descripción breve</label>
                <textarea id="product-desc-short" name="description_short" className="form-textarea" placeholder="Descripción corta del producto (1–2 oraciones)" rows={2} />
              </div>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label" htmlFor="product-desc-long">Descripción completa</label>
                <textarea id="product-desc-long" name="description_long" className="form-textarea" placeholder="Descripción detallada del producto" rows={4} />
              </div>
            </div>
          </div>

          {/* Información comercial */}
          <div className="admin-card">
            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#222223', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid #E8E8E5' }}>
              Información comercial
            </h2>
            <div className="admin-form-grid">
              <div className="form-group">
                <label className="form-label" htmlFor="product-price">Precio (dejar vacío si no confirmado)</label>
                <input id="product-price" name="price" type="number" step="0.01" className="form-input" placeholder="850.00" />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="product-currency">Moneda</label>
                <select id="product-currency" name="currency" className="form-select">
                  <option value="USD">USD</option>
                  <option value="BOB">BOB (Bs.)</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="product-availability">Disponibilidad</label>
                <select id="product-availability" name="availability" className="form-select">
                  <option value="consultar">Consultar</option>
                  <option value="available">Disponible</option>
                  <option value="unavailable">No disponible</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="product-status">Estado de publicación</label>
                <select id="product-status" name="status" className="form-select">
                  <option value="draft">Borrador</option>
                  <option value="published">Publicado</option>
                </select>
              </div>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input id="product-featured" name="featured" type="checkbox" />
                  <span className="form-label" style={{ margin: 0 }}>Marcar como producto destacado (aparece en la sección "En el radar")</span>
                </label>
              </div>
            </div>
          </div>

          {/* Especificaciones */}
          <div className="admin-card">
            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#222223', marginBottom: '0.5rem' }}>
              Especificaciones técnicas
            </h2>
            <p style={{ fontSize: '0.8125rem', color: '#6B6B68', marginBottom: '1.25rem' }}>
              Añade los atributos técnicos del producto (nombre y valor).
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }} id="specs-container">
              {[0, 1, 2].map(i => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '0.5rem' }}>
                  <input
                    type="text"
                    className="form-input"
                    placeholder={i === 0 ? 'Cuerdas' : i === 1 ? 'Escala' : 'Cuerpo'}
                    aria-label={`Nombre de especificación ${i + 1}`}
                  />
                  <input
                    type="text"
                    className="form-input"
                    placeholder={i === 0 ? '4' : i === 1 ? '34"' : 'Aliso'}
                    aria-label={`Valor de especificación ${i + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Notas */}
          <div className="admin-card">
            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#222223', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid #E8E8E5' }}>
              Notas internas
            </h2>
            <div className="form-group">
              <textarea id="product-notes" name="notes" className="form-textarea" placeholder="Notas sobre la fuente, discrepancias de precio, pendientes, etc." />
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem' }}>
            <button type="submit" className="btn-admin btn-admin-primary" id="save-product-btn">
              Guardar producto
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
