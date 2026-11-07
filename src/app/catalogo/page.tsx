import type { Metadata } from 'next'
import { CatalogClient } from '@/components/CatalogClient'

export const metadata: Metadata = {
  title: 'Catálogo – Instrumentos y accesorios musicales',
  description:
    'Explora todo el catálogo de Don Bolivia. Bajos Sire Marcus Miller, guitarras Larry Carlton, pedales Donner, cuerdas Magma y más.',
}

export default function CatalogPage() {
  return (
    <div className="lux-page">
      <section className="lux-page-hero bordeaux-lacquer" aria-label="Encabezado de catálogo">
        <div className="db-grain-bordeaux" />
        <div className="lux-page-hero__inner">
          <span className="lux-eyebrow lux-eyebrow--light">CATÁLOGO OFICIAL · BOLIVIA</span>
          <h1 className="lux-page-hero__title">
            Instrumentos y accesorios seleccionados.
          </h1>
          <p className="lux-page-hero__sub">
            Bajos Sire Marcus Miller, guitarras Larry Carlton, pedales Donner y cuerdas Magma.
            Consulta stock y precio actualizado directamente con nuestro equipo.
          </p>
        </div>
      </section>

      <CatalogClient />
    </div>
  )
}
