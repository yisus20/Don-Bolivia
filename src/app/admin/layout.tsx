import type { Metadata } from 'next'
import './admin.css'

export const metadata: Metadata = {
  title: 'Administración – Don Bolivia',
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontFamily: 'var(--font-sans), sans-serif',
        background: '#F4F4F2',
        minHeight: '100vh',
        margin: 0,
        padding: 0,
      }}
    >
      {children}
    </div>
  )
}
