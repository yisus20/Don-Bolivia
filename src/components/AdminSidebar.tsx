'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Package, Tag, Layers, ExternalLink, LogOut } from 'lucide-react'

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { label: 'Catálogo', section: true },
  { href: '/admin/productos', label: 'Productos', icon: Package },
  { href: '/admin/categorias', label: 'Categorías', icon: Layers },
  { href: '/admin/marcas', label: 'Marcas', icon: Tag },
]

export function AdminSidebar() {
  const pathname = usePathname()
  return (
    <nav className="admin-sidebar-nav" aria-label="Navegación de administración">
      <div className="admin-logo">DON <span>BOLIVIA</span></div>
      <span style={{ fontSize: '0.625rem', color: 'rgba(254,255,250,0.3)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', paddingInline: '0.75rem', marginBottom: '0.5rem' }}>Panel de administración</span>
      {NAV.map((item, idx) => {
        if ('section' in item && item.section) {
          return <div key={idx} className="admin-section-label">{item.label}</div>
        }
        const Icon = item.icon!
        const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href!))
        return (
          <Link
            key={item.href}
            href={item.href!}
            className={`admin-nav-item ${isActive ? 'active' : ''}`}
          >
            <Icon size={16} />
            {item.label}
          </Link>
        )
      })}

      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.25rem', paddingTop: '1rem', borderTop: '1px solid rgba(254,255,250,0.1)' }}>
        <a href="/" target="_blank" className="admin-nav-item" style={{ fontSize: '0.8125rem' }}>
          <ExternalLink size={14} /> Ver sitio público
        </a>
      </div>
    </nav>
  )
}
