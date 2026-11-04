import type { Metadata } from 'next'
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
  return {
    title: `${category.name} – Catálogo Don Bolivia`,
    description: category.description || `Explora el catálogo de ${category.name} en Don Bolivia, Cochabamba.`,
  }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const category = STATIC_CATEGORIES.find(c => c.slug === slug)
  if (!category) notFound()

  const count = STATIC_PRODUCTS.filter(
    p => p.category_id === category.id && p.status === 'published'
  ).length

  return (
    <>
      <div
        style={{
          borderBottom: '1px solid var(--color-gray-200)',
          padding: '2.5rem 0 2rem',
          background: 'white',
        }}
      >
        <div className="container">
          <a
            href="/catalogo"
            style={{
              fontSize: '0.8125rem',
              color: 'var(--color-gray-400)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
              marginBottom: '0.75rem',
            }}
          >
            ← Catálogo
          </a>
          <h1
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 900,
              letterSpacing: '-0.035em',
              marginBottom: '0.375rem',
            }}
          >
            {category.name}
          </h1>
          {category.description && (
            <p style={{ fontSize: '1.0625rem', color: 'var(--color-gray-500)', maxWidth: '520px' }}>
              {category.description}
            </p>
          )}
          <p style={{ marginTop: '0.5rem', fontSize: '0.8125rem', color: 'var(--color-gray-400)' }}>
            {count} {count === 1 ? 'producto' : 'productos'}
          </p>
        </div>
      </div>
      <CatalogClient initialCategory={slug} />
    </>
  )
}
