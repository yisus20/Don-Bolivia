import type { Metadata } from 'next'
import './globals.css'
import { NavBar } from '@/components/NavBar'
import { Footer } from '@/components/Footer'
import { WhatsAppFloat } from '@/components/WhatsAppFloat'

export const metadata: Metadata = {
  metadataBase: new URL('https://don-bolivia.com'),
  title: {
    default: 'Don Bolivia – Instrumentos y accesorios musicales en Cochabamba',
    template: '%s | Don Bolivia',
  },
  description: 'Bajos, guitarras, pedales y accesorios musicales en Cochabamba, Bolivia. Marcas Sire, Donner y Magma. Consulta por WhatsApp.',
  keywords: ['instrumentos musicales', 'bajos', 'guitarras', 'Cochabamba', 'Bolivia', 'Sire', 'Donner', 'Magma', 'pedales', 'accesorios'],
  openGraph: {
    type: 'website',
    locale: 'es_BO',
    url: 'https://don-bolivia.com',
    siteName: 'Don Bolivia',
    title: 'Don Bolivia – Instrumentos y accesorios musicales',
    description: 'Tu próximo instrumento está en Don Bolivia. Bajos, guitarras, pedales y accesorios en Cochabamba, Bolivia.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <NavBar />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  )
}
