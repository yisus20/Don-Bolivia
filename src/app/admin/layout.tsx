import type { Metadata } from 'next'
import './admin.css'

export const metadata: Metadata = {
  title: 'Administración – Don Bolivia',
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body style={{ fontFamily: "'Inter', sans-serif", background: '#F4F4F2', margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  )
}
