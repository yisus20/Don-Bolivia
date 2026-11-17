import type { Metadata } from 'next'
import './globals.css'
import { AppShell } from '@/components/AppShell'

export const metadata: Metadata = {
  metadataBase: new URL('https://don-bolivia.com'),
  title: {
    default: 'Don Bolivia — Bajos Sire, Guitarras, Pedales Donner y Cuerdas Magma en Cochabamba',
    template: '%s | Don Bolivia',
  },
  description:
    'Tienda oficial de instrumentos musicales en Cochabamba con envíos a La Paz, Santa Cruz y toda Bolivia. Bajos Marcus Miller by Sire, guitarras Larry Carlton, pedales Donner y cuerdas Magma.',
  keywords: [
    'instrumentos musicales Bolivia',
    'tienda de música Cochabamba',
    'bajos Sire Bolivia',
    'Marcus Miller by Sire Bolivia',
    'guitarras Larry Carlton Bolivia',
    'Donner Bolivia',
    'cuerdas Magma Bolivia',
    'bajos eléctricos Cochabamba',
    'guitarras eléctricas La Paz',
    'pedales de efectos Bolivia',
    'Don Bolivia',
  ],
  alternates: {
    canonical: 'https://don-bolivia.com/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_BO',
    url: 'https://don-bolivia.com/',
    siteName: 'Don Bolivia',
    title: 'Don Bolivia — Bajos Sire, Guitarras, Pedales Donner & Cuerdas Magma',
    description:
      'Showroom en Cochabamba y envíos asegurados a toda Bolivia. Bajos Marcus Miller by Sire, guitarras Larry Carlton, equipos Donner y encordados Magma.',
    images: [
      {
        url: 'https://don-bolivia.com/hero-instruments.jpg',
        width: 1200,
        height: 800,
        alt: 'Instrumentos musicales en Don Bolivia — Bajos Sire, Donner y Magma',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Don Bolivia — Tienda de Instrumentos Musicales en Cochabamba',
    description:
      'Bajos Marcus Miller by Sire, guitarras Larry Carlton, equipos Donner y cuerdas Magma en Cochabamba con envíos a toda Bolivia.',
    images: ['https://don-bolivia.com/hero-instruments.jpg'],
  },
  other: {
    'geo.region': 'BO-C',
    'geo.placename': 'Cochabamba, Bolivia',
    'geo.position': '-17.39354;-66.15702',
    ICBM: '-17.39354, -66.15702',
  },
  robots: { index: true, follow: true },
}

const GLOBAL_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://don-bolivia.com/#organization',
      name: 'Don Bolivia',
      url: 'https://don-bolivia.com/',
      logo: {
        '@type': 'ImageObject',
        url: 'https://don-bolivia.com/logo-don.png',
        width: 1040,
        height: 340,
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        telephone: '+591-79326391',
        url: 'https://wa.me/59179326391',
        areaServed: 'BO',
        availableLanguage: ['Spanish'],
      },
    },
    {
      '@type': 'MusicStore',
      '@id': 'https://don-bolivia.com/#store',
      name: 'Don Bolivia',
      telephone: '+591-79326391',
      description:
        'Tienda especializada en bajos eléctricos Marcus Miller by Sire, guitarras Larry Carlton, guitarras silenciosas y pedales Donner, pianos digitales, baterías electrónicas y cuerdas Magma en Cochabamba con envíos a toda Bolivia.',
      url: 'https://don-bolivia.com/',
      image: 'https://don-bolivia.com/hero-instruments.jpg',
      logo: 'https://don-bolivia.com/logo-don.png',
      priceRange: '$$',
      currenciesAccepted: 'USD, BOB',
      paymentAccepted: 'Efectivo, Transferencia Bancaria, QR Simple',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Buenos Aires casi Tarija #1527',
        addressLocality: 'Cochabamba',
        addressRegion: 'Cochabamba',
        postalCode: '0000',
        addressCountry: 'BO',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: -17.39354,
        longitude: -66.15702,
      },
      areaServed: [
        { '@type': 'City', name: 'Cochabamba' },
        { '@type': 'City', name: 'La Paz' },
        { '@type': 'City', name: 'Santa Cruz de la Sierra' },
        { '@type': 'Country', name: 'Bolivia' },
      ],
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '09:30',
          closes: '19:30',
        },
      ],
      brand: [
        { '@type': 'Brand', name: 'Sire' },
        { '@type': 'Brand', name: 'Marcus Miller by Sire' },
        { '@type': 'Brand', name: 'Larry Carlton by Sire' },
        { '@type': 'Brand', name: 'Donner' },
        { '@type': 'Brand', name: 'Magma' },
      ],
      parentOrganization: {
        '@id': 'https://don-bolivia.com/#organization',
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://don-bolivia.com/#website',
      url: 'https://don-bolivia.com/',
      name: 'Don Bolivia',
      publisher: {
        '@id': 'https://don-bolivia.com/#organization',
      },
      inLanguage: 'es-BO',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://don-bolivia.com/catalogo/?q={search_term_string}',
        },
        'query-input': 'required name=search_term_string',
      },
    },
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(GLOBAL_SCHEMA) }}
        />
      </head>
      <body suppressHydrationWarning>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}
