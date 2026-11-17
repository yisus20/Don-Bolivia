import type { Metadata } from 'next'
import { CatalogClient } from '@/components/CatalogClient'
import { STATIC_PRODUCTS } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Catálogo de Instrumentos Musicales — Bajos Sire, Guitarras Donner y Cuerdas Magma',
  description:
    'Catálogo oficial de Don Bolivia en Cochabamba con envíos a todo el país: 106 modelos de bajos Sire Marcus Miller, guitarras Larry Carlton y Donner, pedales, pianos, baterías y cuerdas Magma.',
  alternates: {
    canonical: 'https://don-bolivia.com/catalogo/',
  },
  openGraph: {
    title: 'Catálogo Oficial — Don Bolivia',
    description:
      'Explora 106 instrumentos y accesorios musicales en Bolivia: Sire, Donner y Magma con precios en USD y Bolivianos.',
    url: 'https://don-bolivia.com/catalogo/',
    type: 'website',
  },
}

export default function CatalogPage() {
  const published = STATIC_PRODUCTS.filter(p => p.status === 'published')
  const catalogSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Inicio',
            item: 'https://don-bolivia.com/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Catálogo',
            item: 'https://don-bolivia.com/catalogo/',
          },
        ],
      },
      {
        '@type': 'CollectionPage',
        '@id': 'https://don-bolivia.com/catalogo/#collection',
        name: 'Catálogo Oficial de Instrumentos Musicales — Don Bolivia',
        url: 'https://don-bolivia.com/catalogo/',
        description:
          'Catálogo completo de bajos eléctricos Sire Marcus Miller, guitarras Larry Carlton y Donner, pedales multiefectos, pianos digitales, baterías electrónicas y cuerdas Magma en Bolivia.',
        isPartOf: { '@id': 'https://don-bolivia.com/#website' },
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: published.length,
          itemListElement: published.slice(0, 30).map((p, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            url: `https://don-bolivia.com/producto/${p.slug}/`,
            name: p.name,
          })),
        },
      },
    ],
  }

  return (
    <div className="lux-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(catalogSchema) }}
      />
      <section className="lux-page-hero bordeaux-lacquer" aria-label="Encabezado de catálogo">
        <div className="db-grain-bordeaux" />
        <div className="lux-page-hero__inner">
          <span className="lux-eyebrow lux-eyebrow--light">CATÁLOGO OFICIAL · BOLIVIA</span>
          <h1 className="lux-page-hero__title">
            Instrumentos y accesorios seleccionados.
          </h1>
          <p className="lux-page-hero__sub">
            Bajos Sire Marcus Miller, guitarras Larry Carlton, pedales Donner y cuerdas Magma.
            Consulta stock y precio actualizado directamente con nuestro equipo en Cochabamba y envíos a todo el país.
          </p>
        </div>
      </section>

      <CatalogClient />
    </div>
  )
}
