import { AdminSidebar } from '@/components/AdminSidebar'
import { getDashboardStats } from '@/lib/data'
import { Package, Tag, Layers, Star, BookOpen, CheckCircle } from 'lucide-react'

export default function AdminDashboard() {
  const stats = getDashboardStats()

  const statItems = [
    { label: 'Total productos', value: stats.totalProducts, icon: Package, color: '' },
    { label: 'Publicados', value: stats.publishedProducts, icon: CheckCircle, color: 'red' },
    { label: 'Borradores', value: stats.draftProducts, icon: BookOpen, color: '' },
    { label: 'Destacados', value: stats.featuredProducts, icon: Star, color: '' },
    { label: 'Categorías', value: stats.totalCategories, icon: Layers, color: '' },
    { label: 'Marcas', value: stats.totalBrands, icon: Tag, color: '' },
  ]

  return (
    <div className="admin-shell">
      <AdminSidebar />
      <main className="admin-content">
        <div className="admin-header">
          <h1 className="admin-title">Dashboard</h1>
          <a href="/admin/productos/nuevo" className="btn-admin btn-admin-primary">
            + Nuevo producto
          </a>
        </div>

        {/* Stats */}
        <div className="stat-grid">
          {statItems.map(item => (
            <div key={item.label} className="stat-box">
              <div className={`stat-box__num ${item.color}`}>{item.value}</div>
              <div className="stat-box__label">{item.label}</div>
            </div>
          ))}
        </div>

        {/* Info panel */}
        <div className="admin-alert admin-alert-info" style={{ marginBottom: '1.5rem' }}>
          <strong>Modo demostración:</strong> Los datos actuales provienen del catálogo estático importado
          de los archivos PDF. Para conectar a Supabase y habilitar edición en tiempo real,
          configura las variables de entorno en <code>.env.local</code>. Ver guía en <code>README.md</code>.
        </div>

        {/* Quick links */}
        <div className="admin-card">
          <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: '#222223' }}>
            Accesos rápidos
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem' }}>
            {[
              { href: '/admin/productos', label: 'Gestionar productos', desc: `${stats.totalProducts} productos en catálogo` },
              { href: '/admin/productos/nuevo', label: 'Añadir producto', desc: 'Crear nuevo registro' },
              { href: '/admin/categorias', label: 'Gestionar categorías', desc: `${stats.totalCategories} categorías` },
              { href: '/admin/marcas', label: 'Gestionar marcas', desc: `${stats.totalBrands} marcas` },
              { href: '/catalogo', label: 'Ver catálogo público', desc: 'Abre en nueva pestaña', external: true },
            ].map(link => (
              <a
                key={link.href}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                className="admin-quick-link"
              >
                <div style={{ fontWeight: 600, fontSize: '0.875rem', color: '#222223', marginBottom: '0.25rem' }}>{link.label}</div>
                <div style={{ fontSize: '0.75rem', color: '#6B6B68' }}>{link.desc}</div>
              </a>
            ))}
          </div>
        </div>

        {/* Catalog source note */}
        <div className="admin-card">
          <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem', color: '#222223' }}>
            Fuentes del catálogo inicial
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {[
              { source: 'Catálogo Sire 2025', count: 29, note: '24 bajos eléctricos + 5 guitarras eléctricas' },
              { source: 'Catálogo Donner 2026', count: 18, note: 'Guitarras, pedales, pianos, baterías y accesorios' },
            ].map(s => (
              <div key={s.source} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', background: '#F4F4F2', borderRadius: '4px', gap: '1rem', flexWrap: 'wrap' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{s.source}</div>
                  <div style={{ fontSize: '0.75rem', color: '#6B6B68' }}>{s.note}</div>
                </div>
                <span className="badge badge-green">{s.count} productos</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
