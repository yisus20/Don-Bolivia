import type { Metadata } from 'next'
import './globals.css'
import { AppShell } from '@/components/AppShell'

export const metadata: Metadata = {
  metadataBase: new URL('https://don-bolivia.com'),
  title: {
    default: 'Don Bolivia — Sire Authorized Dealer & Boutique Musical',
    template: '%s | Don Bolivia',
  },
  description:
    'Bajos Marcus Miller by Sire, guitarras Larry Carlton, pedaleras Donner y cuerdas Magma en Cochabamba y La Paz, Bolivia. Stock real y atención directa.',
  keywords: [
    'instrumentos musicales',
    'bajos',
    'guitarras',
    'Cochabamba',
    'La Paz',
    'Bolivia',
    'Sire',
    'Marcus Miller',
    'Larry Carlton',
    'Donner',
    'Magma',
    'pedales',
  ],
  openGraph: {
    type: 'website',
    locale: 'es_BO',
    url: 'https://don-bolivia.com',
    siteName: 'Don Bolivia',
    title: 'Don Bolivia — Sire Authorized Dealer',
    description:
      'El talento no se compra. Este bajo Sire sí. Stock real en Cochabamba y La Paz, Bolivia.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Space+Grotesk:wght@500;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}
