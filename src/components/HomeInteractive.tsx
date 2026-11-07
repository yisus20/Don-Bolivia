'use client'

import React, { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Check } from 'lucide-react'
import { STATIC_PRODUCTS } from '@/lib/data'
import { useStoreInteractive } from '@/components/StoreInteractiveProvider'
import { InkFlutedHero } from '@/components/InkFlutedHero'

type CategoryTab = 'all' | 'bajos' | 'guitarras' | 'pedales-efectos' | 'accesorios' | 'otros-instrumentos'

const CATEGORY_TABS: { slug: CategoryTab; label: string }[] = [
  { slug: 'bajos', label: 'Bajos' },
  { slug: 'guitarras', label: 'Guitarras' },
  { slug: 'pedales-efectos', label: 'Pedales y efectos' },
  { slug: 'accesorios', label: 'Accesorios' },
  { slug: 'otros-instrumentos', label: 'Otros instrumentos' },
]

export function HomeInteractive() {
  const { openWhatsApp, openQuickview } = useStoreInteractive()
  const [selectedCategory, setSelectedCategory] = useState<CategoryTab>('all')

  const publishedProducts = useMemo(
    () => STATIC_PRODUCTS.filter(p => p.status === 'published'),
    []
  )

  const showcaseProducts = useMemo(() => {
    if (selectedCategory === 'all') {
      const featured = publishedProducts.filter(p => p.featured)
      return featured.length >= 6 ? featured : publishedProducts.slice(0, 10)
    }
    const categoryMap: Record<string, string> = {
      bajos: 'cat-bajos',
      guitarras: 'cat-guitarras',
      'pedales-efectos': 'cat-pedales',
      accesorios: 'cat-accesorios',
      'otros-instrumentos': 'cat-otros',
    }
    const catId = categoryMap[selectedCategory]
    const filtered = publishedProducts.filter(p => p.category_id === catId)
    return filtered.length > 0 ? filtered : publishedProducts.slice(0, 8)
  }, [publishedProducts, selectedCategory])

  // Duplicate list so the single-row left-to-right marquee loops seamlessly
  const marqueeItems = useMemo(() => {
    const base =
      showcaseProducts.length < 5
        ? [...showcaseProducts, ...showcaseProducts]
        : showcaseProducts
    return [...base, ...base]
  }, [showcaseProducts])

  const counts = useMemo(() => {
    return {
      bajos: publishedProducts.filter(p => p.category_id === 'cat-bajos').length,
      guitarras: publishedProducts.filter(p => p.category_id === 'cat-guitarras').length,
      donner: publishedProducts.filter(p => p.brand_id === 'brand-donner').length,
    }
  }, [publishedProducts])

  return (
    <div className="lux-home">
      {/* ========================================================
           01 / HERO SECTION — Interactive Fluted Glass & Ink Trail
           ======================================================== */}
      <InkFlutedHero />

      {/* ========================================================
           02 / MINIMALIST CATEGORY STRIP
           ======================================================== */}
      <nav className="lux-cat-strip" aria-label="Categorías principales">
        <div className="lux-cat-strip__inner">
          {CATEGORY_TABS.map((tab, idx) => {
            const isActive =
              selectedCategory === tab.slug || (selectedCategory === 'all' && idx === 0)
            return (
              <React.Fragment key={tab.slug}>
                <button
                  type="button"
                  onClick={() =>
                    setSelectedCategory(prev => (prev === tab.slug ? 'all' : tab.slug))
                  }
                  className={`lux-cat-strip__item ${isActive ? 'lux-cat-strip__item--active' : ''}`}
                >
                  {tab.label}
                </button>
                {idx < CATEGORY_TABS.length - 1 && (
                  <span className="lux-cat-strip__divider" aria-hidden="true" />
                )}
              </React.Fragment>
            )
          })}
        </div>
      </nav>

      {/* ========================================================
           03 / EN LA TIENDA — Selección de la tienda
           Una sola fila continua de izquierda a derecha que se pausa
           y agranda el producto al acercar el mouse
           ======================================================== */}
      <section className="lux-section-selection" aria-label="Selección de la tienda">
        <div className="lux-section__header-center">
          <span className="lux-eyebrow">EN LA TIENDA</span>
          <h2 className="lux-heading-lg">
            Selección de <span className="lux-serif-accent">la tienda.</span>
          </h2>
          <div className="lux-accent-bar" />
        </div>

        <div className="lux-marquee-viewport" role="region" aria-label="Carrusel de productos destacados">
          <div className="lux-marquee-track" key={selectedCategory}>
            {marqueeItems.map((product, index) => {
              const imgUrl = product.primary_image_url || product.images?.[0]?.url
              const shortTitle = product.model || product.name.replace(/^Sire\s+|^Donner\s+/i, '')

              return (
                <article
                  key={`${product.id}-${index}`}
                  className="lux-marquee-card"
                >
                  <Link href={`/producto/${product.slug}`} className="lux-marquee-card__box">
                    {imgUrl ? (
                      <Image
                        src={imgUrl}
                        alt={product.name}
                        fill
                        sizes="270px"
                        className="lux-marquee-card__img"
                      />
                    ) : null}
                  </Link>

                  <div className="lux-marquee-card__meta">
                    <div>
                      <span className="lux-showcase-card__brand">
                        {product.brand?.name || 'DON BOLIVIA'}
                      </span>
                      <Link href={`/producto/${product.slug}`}>
                        <h3 className="lux-showcase-card__title">{shortTitle}</h3>
                      </Link>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        openWhatsApp(
                          `Hola Don Bolivia! Me interesa el ${product.name}. ¿Está disponible y cuál es su precio?`
                        )
                      }
                      className="lux-showcase-card__wa"
                      aria-label={`Consultar por ${product.name}`}
                      title="Consultar por WhatsApp"
                    >
                      <ArrowUpRight size={15} />
                    </button>
                  </div>
                </article>
              )
            })}
          </div>
        </div>

        <div className="lux-selection-footer">
          <Link href="/catalogo" className="lux-link-subtle">
            Explorar los {publishedProducts.length} instrumentos del catálogo →
          </Link>
        </div>
      </section>

      {/* ========================================================
           04 / NUESTRAS MARCAS — Split Banner Elegante
           ======================================================== */}
      <section className="lux-brands-banner" aria-label="Nuestras marcas oficiales">
        <div className="lux-brands-banner__photo">
          <Image
            src="/hero-instruments.jpg"
            alt="Detalle de instrumento en estudio"
            fill
            sizes="(max-width: 900px) 100vw, 40vw"
            className="lux-brands-banner__img"
          />
          <div className="lux-brands-banner__photo-overlay" />
        </div>

        <div className="lux-brands-banner__bordeaux bordeaux-lacquer">
          <div className="db-grain-bordeaux" />
          <span className="lux-eyebrow lux-eyebrow--light" style={{ position: 'relative', zIndex: 2 }}>
            NUESTRAS MARCAS OFICIALES
          </span>

          <div className="lux-brands-banner__logos" style={{ position: 'relative', zIndex: 2 }}>
            <Link href="/catalogo?brand=sire" className="lux-brand-mark lux-brand-mark--sire">
              Sire
            </Link>

            <span className="lux-brands-banner__sep" aria-hidden="true" />

            <Link href="/catalogo?brand=donner" className="lux-brand-mark lux-brand-mark--donner">
              <span className="lux-donner-bars" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
              </span>
              <span>DONNER</span>
            </Link>

            <span className="lux-brands-banner__sep" aria-hidden="true" />

            <Link href="/catalogo?brand=magma" className="lux-brand-mark lux-brand-mark--magma">
              Magma
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================
           05 / COLECCIÓN & CRITERIO (Sección Estandarizada y Fusionada)
           Sin repetir categorías ni textos: une la ingeniería de Sire,
           el Manifiesto Don Bolivia y el ecosistema Donner/Magma
           bajo una misma línea visual limpia y de alto valor.
           ======================================================== */}
      <section className="lux-curated-section" aria-label="Criterio y Colecciones">
        <div className="lux-curated-container">
          <div className="lux-curated-header">
            <div>
              <span className="lux-eyebrow" style={{ color: '#8E1B16', marginBottom: '0.75rem' }}>
                CRITERIO & CURADURÍA
              </span>
              <h2 className="lux-heading-lg">
                El talento no se compra.{' '}
                <span className="lux-serif-accent">Un buen instrumento sí.</span>
              </h2>
            </div>
            <p className="lux-curated-header__lead">
              No importamos lotes de relleno. Cada modelo que entra al showroom fue elegido por su
              construcción, electrónica y estabilidad de afinación.
            </p>
          </div>

          <div className="lux-curated-grid">
            {/* BLOQUE 1: SIRE SIGNATURE (Bajos Marcus Miller & Guitarras Larry Carlton) */}
            <div className="lux-curated-card lux-curated-card--light mirror-sweep">
              <div className="lux-curated-card__top">
                <span className="lux-curated-card__tag">SIRE SIGNATURE</span>
                <span className="lux-curated-card__count">
                  {counts.bajos + counts.guitarras} modelos
                </span>
              </div>

              <div
                className="lux-curated-card__media"
                onClick={() =>
                  openQuickview({
                    title: 'Sire Marcus Miller V7 Vintage Alder',
                    subtitle: 'HERITAGE-3 PREAMP 18V · ROASTED MAPLE NECK',
                    description:
                      'Mástil de arce tostado con bordes redondeados Edgeless™, cejuela de hueso real y preamplificador activo/pasivo de 3 bandas.',
                    slug: 'sire-marcus-miller-v7-4-cuerdas',
                    imageUrl: '/catalog-images/sire/p006_img00.jpeg',
                  })
                }
                role="button"
                tabIndex={0}
                aria-label="Inspeccionar Sire Marcus Miller V7"
              >
                <div className="lux-curated-card__img-pair">
                  <div className="lux-curated-card__img-box">
                    <Image
                      src="/catalog-images/sire/p006_img00.jpeg"
                      alt="Bajo Sire Marcus Miller V7"
                      fill
                      sizes="220px"
                      className="lux-curated-card__img"
                    />
                  </div>
                  <div className="lux-curated-card__img-box">
                    <Image
                      src="/catalog-images/sire/p026_img00.jpeg"
                      alt="Guitarra Sire Larry Carlton L7"
                      fill
                      sizes="220px"
                      className="lux-curated-card__img"
                    />
                  </div>
                </div>
              </div>

              <div className="lux-curated-card__body">
                <h3 className="lux-curated-card__title">Marcus Miller & Larry Carlton</h3>
                <p className="lux-curated-card__desc">
                  Mástiles de arce tostado, trastes redondeados Edgeless™ y electrónica de 18V.
                  Acabados de boutique a precio de no tener que vender un riñón.
                </p>
                <div className="lux-curated-card__footer">
                  <Link href="/catalogo?brand=sire" className="lux-curated-card__link">
                    <span>Ver línea Sire</span>
                    <ArrowUpRight size={15} />
                  </Link>
                  <button
                    type="button"
                    onClick={() =>
                      openWhatsApp(
                        'Hola Don Bolivia! Quiero consultar disponibilidad de bajos Marcus Miller y guitarras Larry Carlton de Sire.'
                      )
                    }
                    className="lux-curated-card__wa-pill"
                  >
                    Cotizar
                  </button>
                </div>
              </div>
            </div>

            {/* BLOQUE 2: MANIFIESTO BURDEOS (El tono editorial + garantías reales sin repetir) */}
            <div className="lux-curated-card lux-curated-card--bordeaux bordeaux-lacquer mirror-sweep">
              <div className="db-grain-bordeaux" />
              <div className="lux-curated-card__top">
                <span className="lux-curated-card__tag lux-curated-card__tag--light">
                  MANIFIESTO DON BOLIVIA
                </span>
                <span className="lux-curated-card__count lux-curated-card__count--light">
                  Cochabamba · La Paz
                </span>
              </div>

              <div className="lux-curated-card__manifesto">
                <h3 className="lux-curated-card__manifesto-title">
                  No necesitas otro instrumento.
                  <br />
                  <span className="lux-serif-accent-light">
                    Pero te lo vas a comprar igual.
                  </span>
                </h3>
                <p className="lux-curated-card__manifesto-copy">
                  Porque cambiar las cuerdas viejas daba pereza y estrenar equipo reactiva la
                  dopamina que perdiste en el último ensayo.
                </p>

                <ul className="lux-curated-card__checks">
                  <li>
                    <Check size={15} style={{ flexShrink: 0 }} />
                    <span>Instrumentos revisados y calibrados antes de entregar</span>
                  </li>
                  <li>
                    <Check size={15} style={{ flexShrink: 0 }} />
                    <span>Envíos asegurados en embalaje rígido a toda Bolivia</span>
                  </li>
                  <li>
                    <Check size={15} style={{ flexShrink: 0 }} />
                    <span>Pruebas de sonido en tienda y asesoría 1 a 1</span>
                  </li>
                </ul>
              </div>

              <div className="lux-curated-card__footer lux-curated-card__footer--dark">
                <button
                  type="button"
                  onClick={() =>
                    openWhatsApp(
                      'Hola Don Bolivia, quiero agendar una visita o consultar qué modelos tienen para entrega inmediata.'
                    )
                  }
                  className="lux-btn-cream-sm"
                >
                  <span>Comprar sin culpa</span>
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </div>

            {/* BLOQUE 3: ECOSISTEMA DONNER & CUERDAS MAGMA */}
            <div className="lux-curated-card lux-curated-card--charcoal mirror-sweep">
              <div className="lux-curated-card__top">
                <span className="lux-curated-card__tag lux-curated-card__tag--muted">
                  DONNER & MAGMA
                </span>
                <span className="lux-curated-card__count lux-curated-card__count--dark">
                  {counts.donner} modelos
                </span>
              </div>

              <div className="lux-curated-card__media">
                <div className="lux-curated-card__img-pair">
                  <div className="lux-curated-card__img-box lux-curated-card__img-box--dark">
                    <Image
                      src="/catalog-images/donner/p011_img00.jpeg"
                      alt="Pedal Multiefectos Donner Arena 2000"
                      fill
                      sizes="220px"
                      className="lux-curated-card__img-normal"
                    />
                  </div>
                  <div className="lux-curated-card__img-box lux-curated-card__img-box--dark">
                    <Image
                      src="/catalog-images/donner/p001_img00.jpeg"
                      alt="Guitarra silenciosa Donner HUSH-I"
                      fill
                      sizes="220px"
                      className="lux-curated-card__img-normal"
                    />
                  </div>
                </div>
              </div>

              <div className="lux-curated-card__body">
                <h3 className="lux-curated-card__title" style={{ color: '#FFFFFF' }}>
                  Pedaleras DSP, HUSH & Accesorios
                </h3>
                <p className="lux-curated-card__desc" style={{ color: 'rgba(255,255,255,0.68)' }}>
                  Procesadores Arena 2000 con impulsos IR, guitarras de viaje silenciosas, pianos
                  digitales y encordados profesionales Magma.
                </p>
                <div className="lux-curated-card__footer lux-curated-card__footer--dark">
                  <Link
                    href="/catalogo?brand=donner"
                    className="lux-curated-card__link"
                    style={{ color: '#FFFFFF' }}
                  >
                    <span>Explorar Donner & Magma</span>
                    <ArrowUpRight size={15} />
                  </Link>
                  <button
                    type="button"
                    onClick={() =>
                      openWhatsApp(
                        'Hola Don Bolivia! Quiero consultar por pedales multiefectos, guitarras Donner y cuerdas Magma.'
                      )
                    }
                    className="lux-curated-card__wa-pill lux-curated-card__wa-pill--dark"
                  >
                    Cotizar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
           06 / BOTTOM SPLIT CTA BANNER — "¿Buscas algo en particular?"
           ======================================================== */}
      <section className="lux-cta-split" aria-label="Consulta personalizada">
        <div className="lux-cta-split__left bordeaux-lacquer">
          <div className="db-grain-bordeaux" />
          <div className="lux-cta-split__content" style={{ position: 'relative', zIndex: 2 }}>
            <h2 className="lux-cta-split__title">
              ¿Buscas algo
              <br />
              <span className="lux-serif-accent-light">en particular?</span>
            </h2>
            <p className="lux-cta-split__desc">
              Cuéntanos qué tienes en mente
              <br />y te ayudamos a encontrarlo.
            </p>
            <button
              type="button"
              onClick={() =>
                openWhatsApp(
                  'Hola Don Bolivia! Estoy buscando un instrumento en particular y quisiera asesoría.'
                )
              }
              className="lux-btn-white"
              id="home-cta-whatsapp"
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              <span>Consultar por WhatsApp</span>
              <ArrowUpRight size={15} />
            </button>
          </div>
        </div>

        <div className="lux-cta-split__right">
          <Image
            src="/hero-instruments.jpg"
            alt="Amplificador en showroom Don Bolivia"
            fill
            sizes="(max-width: 900px) 100vw, 55vw"
            className="lux-cta-split__img"
          />
        </div>
      </section>
    </div>
  )
}
