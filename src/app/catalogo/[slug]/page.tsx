import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CatalogClient } from '@/components/CatalogClient'
import { STATIC_CATEGORIES, STATIC_PRODUCTS } from '@/lib/data'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return STATIC_CATEGORIES.map(cat => ({ slug: cat.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const category = STATIC_CATEGORIES.find(c => c.slug === slug)
  if (!category) return {}
  const url = `https://don-bolivia.com/catalogo/${category.slug}/`
  return {
    title: `${category.name} en Bolivia — Catálogo Oficial`,
    description:
      category.description ||
      `Explora el catálogo de ${category.name} en Don Bolivia, Cochabamba con envíos a todo el país.`,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${category.name} — Don Bolivia`,
      description:
        category.description || `Catálogo de ${category.name} disponible en Don Bolivia.`,
      url,
      type: 'website',
    },
  }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const category = STATIC_CATEGORIES.find(c => c.slug === slug)
  if (!category) notFound()

  const categoryProducts = STATIC_PRODUCTS.filter(
    p => p.category_id === category.id && p.status === 'published'
  )
  const count = categoryProducts.length
  const categoryUrl = `https://don-bolivia.com/catalogo/${category.slug}/`

  const categorySchema = {
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
          {
            '@type': 'ListItem',
            position: 3,
            name: category.name,
            item: categoryUrl,
          },
        ],
      },
      {
        '@type': 'CollectionPage',
        '@id': `${categoryUrl}#collection`,
        name: `${category.name} en Bolivia — Don Bolivia`,
        url: categoryUrl,
        description: category.description,
        isPartOf: { '@id': 'https://don-bolivia.com/#website' },
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: count,
          itemListElement: categoryProducts.map((p, idx) => ({
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(categorySchema) }}
      />
      <section className="lux-page-hero bordeaux-lacquer" aria-label={`Categoría: ${category.name}`}>
        <div className="db-grain-bordeaux" />
        <div className="lux-page-hero__inner">
          <div className="lux-page-hero__top-row">
            <Link href="/catalogo" className="lux-page-hero__back">
              ← Volver a todo el catálogo
            </Link>
            <span className="lux-curated-card__count lux-curated-card__count--light">
              {count} {count === 1 ? 'modelo' : 'modelos'}
            </span>
          </div>

          <h1 className="lux-page-hero__title">{category.name}.</h1>

          {category.description && (
            <p className="lux-page-hero__sub">{category.description}</p>
          )}
        </div>
      </section>

      <CatalogClient initialCategory={slug} />
    </div>
  )
}
