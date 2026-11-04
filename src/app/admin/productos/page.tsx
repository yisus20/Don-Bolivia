import Link from 'next/link'
import { AdminSidebar } from '@/components/AdminSidebar'
import { STATIC_PRODUCTS, STATIC_CATEGORIES, STATIC_BRANDS } from '@/lib/data'
import { Eye, EyeOff, Star, Edit, Plus } from 'lucide-react'

export default function AdminProductosPage() {
  const products = STATIC_PRODUCTS

  return (
    <div className="admin-shell">
      <AdminSidebar />
      <main className="admin-content">
        <div className="admin-header">
          <div>
            <h1 className="admin-title">Productos</h1>
            <p style={{ color: '#6B6B68', fontSize: '0.875rem', marginTop: '0.25rem' }}>
              {products.length} productos en el catálogo · {products.filter(p => p.status === 'published').length} publicados
            </p>
          </div>
          <a href="/admin/productos/nuevo" className="btn-admin btn-admin-primary">
            <Plus size={16} /> Nuevo producto
          </a>
        </div>

        <div className="admin-alert admin-alert-info">
          En modo estático los productos se editan directamente en <code>src/lib/data.ts</code>.
          Al conectar Supabase, la edición estará disponible desde esta interfaz.
        </div>

        {/* Filter bar */}
        <div className="admin-card" style={{ padding: '1rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <input
              type="search"
              placeholder="Buscar producto…"
              className="form-input"
              style={{ maxWidth: '280px' }}
              aria-label="Buscar producto"
              id="admin-products-search"
            />
            <select className="form-select" style={{ maxWidth: '180px' }} aria-label="Filtrar por categoría" id="admin-products-category">
              <option value="">Todas las categorías</option>
              {STATIC_CATEGORIES.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            <select className="form-select" style={{ maxWidth: '160px' }} aria-label="Filtrar por marca" id="admin-products-brand">
              <option value="">Todas las marcas</option>
              {STATIC_BRANDS.map(b => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <div style={{ background: 'white', border: '1px solid #E8E8E5', borderRadius: '8px', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Marca</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th>Estado</th>
                  <th style={{ textAlign: 'right' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                        {product.featured && (
                          <Star size={12} style={{ color: '#F59E0B', flexShrink: 0 }} aria-label="Destacado" />
                        )}
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '0.875rem', color: '#222223' }}>
                            {product.name}
                          </div>
                          {product.model && (
                            <div style={{ fontSize: '0.75rem', color: '#6B6B68' }}>Modelo: {product.model}</div>
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
                          {product.price.toLocaleString('es-BO')} {product.currency}
                        </span>
                      ) : (
                        <span style={{ color: '#A8A8A4', fontStyle: 'italic' }}>Consultar</span>
                      )}
                    </td>
                    <td>
                      <span className={`badge ${product.status === 'published' ? 'badge-green' : product.status === 'draft' ? 'badge-yellow' : 'badge-gray'}`}>
                        {product.status === 'published' ? 'Publicado' : product.status === 'draft' ? 'Borrador' : 'Archivado'}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '0.375rem', justifyContent: 'flex-end' }}>
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
                        <a
                          href={`/admin/productos/${product.id}/editar`}
                          className="btn-admin btn-admin-secondary"
                          title="Editar"
                          aria-label={`Editar ${product.name}`}
                          style={{ padding: '0.375rem 0.5rem' }}
                        >
                          <Edit size={14} />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
