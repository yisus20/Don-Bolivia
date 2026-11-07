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
  return {
    title: `${category.name} – Catálogo Don Bolivia`,
    description:
      category.description || `Explora el catálogo de ${category.name} en Don Bolivia, Cochabamba.`,
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
    <div className="lux-page">
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
