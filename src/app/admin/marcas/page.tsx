'use client'

import { AdminSidebar } from '@/components/AdminSidebar'
import { STATIC_BRANDS, STATIC_PRODUCTS } from '@/lib/data'
import { Plus, Edit } from 'lucide-react'

export default function AdminMarcasPage() {
  return (
    <div className="admin-shell">
      <AdminSidebar />
      <main className="admin-content">
        <div className="admin-header">
          <h1 className="admin-title">Marcas</h1>
          <button className="btn-admin btn-admin-primary" id="add-brand-btn" onClick={() => alert('Conecta Supabase para gestión en tiempo real.')}>
            <Plus size={16} /> Nueva marca
          </button>
        </div>

        <div className="admin-alert admin-alert-info">
          Gestión de marcas disponible tras conectar Supabase.
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
          {STATIC_BRANDS.map(brand => {
            const count = STATIC_PRODUCTS.filter(p => p.brand_id === brand.id && p.status === 'published').length
            return (
              <div key={brand.id} className="admin-card" style={{ margin: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <div>
                    <h3 style={{ fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.025em' }}>{brand.name}</h3>
                    <code style={{ fontSize: '0.75rem', color: '#6B6B68' }}>{brand.slug}</code>
                  </div>
                  <span className={`badge ${brand.active ? 'badge-green' : 'badge-gray'}`}>
                    {brand.active ? 'Activa' : 'Inactiva'}
                  </span>
                </div>
                {brand.description && (
                  <p style={{ fontSize: '0.8125rem', color: '#6B6B68', marginBottom: '1rem', lineHeight: 1.5 }}>
                    {brand.description}
                  </p>
                )}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span className="badge badge-green">{count} productos</span>
                  <button
                    className="btn-admin btn-admin-secondary"
                    style={{ padding: '0.375rem 0.625rem', fontSize: '0.75rem' }}
                    onClick={() => alert('Edición disponible con Supabase.')}
                    aria-label={`Editar marca ${brand.name}`}
                  >
                    <Edit size={14} /> Editar
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}
