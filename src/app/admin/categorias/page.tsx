'use client'

import { AdminSidebar } from '@/components/AdminSidebar'
import { STATIC_CATEGORIES } from '@/lib/data'
import { STATIC_PRODUCTS } from '@/lib/data'
import { Plus, Edit } from 'lucide-react'

export default function AdminCategoriasPage() {
  const categories = STATIC_CATEGORIES

  return (
    <div className="admin-shell">
      <AdminSidebar />
      <main className="admin-content">
        <div className="admin-header">
          <h1 className="admin-title">Categorías</h1>
          <button className="btn-admin btn-admin-primary" id="add-category-btn" onClick={() => alert('Conecta Supabase para gestión en tiempo real. Ver README.')}>
            <Plus size={16} /> Nueva categoría
          </button>
        </div>

        <div className="admin-alert admin-alert-info">
          Gestión de categorías disponible tras conectar Supabase. Las categorías actuales provienen del catálogo estático.
        </div>

        <div style={{ background: 'white', border: '1px solid #E8E8E5', borderRadius: '8px', overflow: 'hidden' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Categoría</th>
                <th>Slug</th>
                <th>Productos</th>
                <th>Estado</th>
                <th>Orden</th>
                <th style={{ textAlign: 'right' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {categories.map(cat => {
                const count = STATIC_PRODUCTS.filter(p => p.category_id === cat.id && p.status === 'published').length
                return (
                  <tr key={cat.id}>
                    <td>
                      <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{cat.name}</div>
                      {cat.description && (
                        <div style={{ fontSize: '0.75rem', color: '#6B6B68', marginTop: '0.125rem' }}>
                          {cat.description.slice(0, 60)}…
                        </div>
                      )}
                    </td>
                    <td>
                      <code style={{ fontSize: '0.8125rem', background: '#F4F4F2', padding: '0.125rem 0.375rem', borderRadius: '3px' }}>
                        {cat.slug}
                      </code>
                    </td>
                    <td>
                      <span className="badge badge-green">{count}</span>
                    </td>
                    <td>
                      <span className={`badge ${cat.active ? 'badge-green' : 'badge-gray'}`}>
                        {cat.active ? 'Activa' : 'Inactiva'}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.875rem', color: '#6B6B68' }}>{cat.order}</td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        className="btn-admin btn-admin-secondary"
                        style={{ padding: '0.375rem 0.5rem' }}
                        onClick={() => alert('Edición disponible con Supabase. Ver README.')}
                        aria-label={`Editar categoría ${cat.name}`}
                      >
                        <Edit size={14} />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
