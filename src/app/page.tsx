import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  ArrowUpRight,
  MessageCircle,
  Guitar,
  Music,
  Sliders,
  Volume2,
  ShieldCheck,
  Truck,
  MapPin,
  Sparkles,
  CheckCircle2,
  Headphones,
} from 'lucide-react'
import { ProductCard } from '@/components/ProductCard'
import {
  STATIC_CATEGORIES,
  STATIC_BRANDS,
  getFeaturedProducts,
  STATIC_PRODUCTS,
} from '@/lib/data'
import { buildWhatsAppLinkGeneric } from '@/lib/whatsapp'

export const metadata: Metadata = {
  title: 'Don Bolivia – Instrumentos y accesorios musicales en Cochabamba',
  description: 'Bajos Marcus Miller by Sire, guitarras, pedales Donner y cuerdas Magma en Cochabamba, Bolivia. Catálogo oficial y atención personalizada por WhatsApp.',
}

export default function HomePage() {
  const featured = getFeaturedProducts().slice(0, 6)
  const activeCategories = STATIC_CATEGORIES.filter(c => {
    const count = STATIC_PRODUCTS.filter(p => p.category_id === c.id && p.status === 'published').length
    return c.active && count > 0
  })
  const waLink = buildWhatsAppLinkGeneric()

  const CATEGORY_META: Record<string, { icon: any; subtitle: string }> = {
    bajos: { icon: Guitar, subtitle: 'Marcus Miller Sire 4, 5 y 6 cuerdas' },
    guitarras: { icon: Music, subtitle: 'Eléctricas, acústicas y de viaje' },
    'pedales-efectos': { icon: Sliders, subtitle: 'Multiefectos e impulsos de cabina' },
    accesorios: { icon: Headphones, subtitle: 'Cuerdas Magma, fundas y cables' },
    'otros-instrumentos': { icon: Volume2, subtitle: 'Pianos digitales y teclados' },
  }

  return (
    <>
      {/* ======== HERO SECTION ======== */}
      <section className="hero" aria-label="Presentación de Don Bolivia">
        <div className="container">
          <div className="hero__grid">
            <div className="hero__content">
              <div className="hero__badge-wrapper">
                <span className="pill-badge pill-badge--location">
                  <span className="pill-badge__dot" />
                  Showroom en Cochabamba · Distribuidores Oficiales
                </span>
              </div>

              <h1 className="hero__title">
                Tu próximo <span className="hero__title-accent">instrumento</span> no se va a elegir solo.
              </h1>

              <p className="hero__subtitle">
                Bajos Marcus Miller by Sire, pedaleras Donner y cuerdas Magma.
                Selección curada por y para músicos que se toman el sonido en serio.
              </p>

              <div className="hero__actions">
                <Link href="/catalogo" className="btn btn-primary btn-lg" id="hero-explore-catalog">
                  <span>Explorar catálogo</span>
                  <ArrowRight size={18} className="btn-icon-shift" />
                </Link>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp btn-lg"
                  id="hero-whatsapp"
                >
                  <MessageCircle size={18} />
                  <span>Consultar por WhatsApp</span>
                </a>
              </div>

              <div className="hero__micro-trust">
                <span className="hero__micro-item">
                  <CheckCircle2 size={15} className="text-red" />
                  Instrumentos calibrados
                </span>
                <span className="hero__micro-sep">·</span>
                <span className="hero__micro-item">
                  <CheckCircle2 size={15} className="text-red" />
                  Envíos a toda Bolivia
                </span>
                <span className="hero__micro-sep">·</span>
                <span className="hero__micro-item">
                  <CheckCircle2 size={15} className="text-red" />
                  Asesoría 1 a 1 directa
                </span>
              </div>
            </div>

            <div className="hero__visual">
              <div className="hero__image-frame">
                <Image
                  src="/hero-instruments.jpg"
                  alt="Bajo Marcus Miller Sire y Guitarra en Don Bolivia Showroom"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  className="hero__img"
                />
                <div className="hero__image-gradient" />

                {/* Floating Glassmorphic Boutique Card */}
                <div className="hero__floating-card">
                  <div className="hero__floating-icon">
                    <Sparkles size={18} />
                  </div>
                  <div className="hero__floating-text">
                    <span className="hero__floating-label">Catálogos 2025 / 2026</span>
                    <span className="hero__floating-title">Sire Marcus Miller & Donner Music</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======== TRUST BANNER / TICKER ======== */}
      <section className="trust-strip" aria-label="Beneficios Don Bolivia">
        <div className="container">
          <div className="trust-strip__grid">
            <div className="trust-item">
              <div className="trust-item__icon">
                <MapPin size={20} />
              </div>
              <div>
                <p className="trust-item__title">Showroom Cochabamba</p>
                <p className="trust-item__desc">Buenos Aires casi Tarija #1527</p>
              </div>
            </div>

            <div className="trust-item">
              <div className="trust-item__icon">
                <ShieldCheck size={20} />
              </div>
              <div>
                <p className="trust-item__title">Garantía & Autenticidad</p>
                <p className="trust-item__desc">Distribuidores oficiales Sire y Donner</p>
              </div>
            </div>

            <div className="trust-item">
              <div className="trust-item__icon">
                <Truck size={20} />
              </div>
              <div>
                <p className="trust-item__title">Envíos Asegurados</p>
                <p className="trust-item__desc">Embalaje rígido a toda Bolivia</p>
              </div>
            </div>

            <div className="trust-item">
              <div className="trust-item__icon">
                <MessageCircle size={20} />
              </div>
              <div>
                <p className="trust-item__title">Atención Músico a Músico</p>
                <p className="trust-item__desc">Audio, fotos y videos por WhatsApp</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======== CATEGORÍAS ELEVADAS ======== */}
      <section className="section" aria-label="Categorías de productos">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="section-eyebrow">Explora por familia</span>
              <h2 className="section-header__title">Encuentra lo que buscas</h2>
            </div>
            <Link href="/catalogo" className="section-header__link">
              Ver catálogo completo <ArrowRight size={14} className="icon-slide" />
            </Link>
          </div>

          <div className="categories-grid-v2">
            {activeCategories.map((cat) => {
              const count = STATIC_PRODUCTS.filter(
                p => p.category_id === cat.id && p.status === 'published'
              ).length
              const meta = CATEGORY_META[cat.slug] || { icon: Music, subtitle: 'Instrumentos seleccionados' }
              const IconComp = meta.icon

              return (
                <Link
                  key={cat.id}
                  href={`/catalogo/${cat.slug}`}
                  id={`category-${cat.slug}`}
                  className="cat-card-v2"
                >
                  <div className="cat-card-v2__top">
                    <div className="cat-card-v2__icon">
                      <IconComp size={24} />
                    </div>
                    <span className="cat-card-v2__badge">
                      {count} {count === 1 ? 'item' : 'items'}
                    </span>
                  </div>
                  <h3 className="cat-card-v2__title">{cat.name}</h3>
                  <p className="cat-card-v2__subtitle">{meta.subtitle}</p>
                  <div className="cat-card-v2__arrow">
                    <ArrowUpRight size={16} />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ======== EN EL RADAR - PRODUCTOS DESTACADOS ======== */}
      {featured.length > 0 && (
        <section
          className="section section--radar"
          aria-label="Productos destacados"
        >
          <div className="container">
            <div className="section-header">
              <div>
                <span className="section-eyebrow">
                  <span className="section-eyebrow__pulse" />
                  Selección Destacada
                </span>
                <h2 className="section-header__title">En el radar</h2>
                <p className="section-header__subtitle">
                  Modelos con alta demanda, excelente balance tonal y listos para entrega inmediata.
                </p>
              </div>
              <Link href="/catalogo" className="section-header__link">
                Ver todos los instrumentos <ArrowRight size={14} className="icon-slide" />
              </Link>
            </div>
            <div className="products-grid">
              {featured.map((product) => (
                <ProductCard key={product.id} product={product} showWhatsApp />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ======== MARCAS OFICIALES ======== */}
      <section className="section" aria-label="Marcas disponibles">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="section-eyebrow">Alianzas y Fabricantes</span>
              <h2 className="section-header__title">Marcas Oficiales</h2>
              <p className="section-header__subtitle">
                Representamos firmas con prestigio internacional en rendimiento y durabilidad.
              </p>
            </div>
          </div>
          <div className="brands-grid-v2">
            {STATIC_BRANDS.filter(b => b.active).map((brand) => {
              const count = STATIC_PRODUCTS.filter(
                p => p.brand_id === brand.id && p.status === 'published'
              ).length

              const BRAND_DESCRIPTIONS: Record<string, { tag: string; highlight: string }> = {
                sire: {
                  tag: 'Guitarras & Bajos Eléctricos',
                  highlight: 'Desarrollados con Marcus Miller. Preamps Heritage-3 y maderas premium.',
                },
                donner: {
                  tag: 'Pedales, Pianos & Audio',
                  highlight: 'Multiefectos Arena 2000, guitarras HUSH silenciosas y pianos digitales.',
                },
                magma: {
                  tag: 'Cuerdas Profesionales',
                  highlight: 'Fabricadas en Argentina. Calidad de estudio y concierto para bajo y guitarra.',
                },
              }
              const info = BRAND_DESCRIPTIONS[brand.slug] || { tag: 'Instrumentos', highlight: brand.description }

              return (
                <Link
                  key={brand.id}
                  href={`/catalogo?brand=${brand.slug}`}
                  id={`brand-${brand.slug}`}
                  className="brand-card-v2"
                >
                  <div className="brand-card-v2__header">
                    <span className="brand-card-v2__tag">{info.tag}</span>
                    <span className="brand-card-v2__badge">
                      {count > 0 ? `${count} modelos` : 'Bajo consulta'}
                    </span>
                  </div>
                  <h3 className="brand-card-v2__title">{brand.name}</h3>
                  <p className="brand-card-v2__desc">{info.highlight}</p>
                  <div className="brand-card-v2__action">
                    <span>Explorar catálogo {brand.name}</span>
                    <ArrowRight size={14} className="icon-slide" />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ======== EDITORIAL MANIFESTO ======== */}
      <section
        className="section manifesto"
        aria-label="Sobre Don Bolivia"
      >
        <div className="container">
          <div className="manifesto__hero">
            <span className="manifesto__eyebrow">Nuestro Criterio</span>
            <p className="manifesto__quote">
              Pensado por músicos.<br />
              Para músicos.<br />
              <span className="manifesto__quote-accent">
                Y para quienes todavía están afinando su criterio.
              </span>
            </p>
            <p className="manifesto__lead">
              En Don Bolivia no creemos en vender por catálogo sin probar.
              Conocemos la tensión de las cuerdas, la respuesta de los potenciómetros
              y la diferencia real entre una pastilla pasiva y un circuito activo.
            </p>
          </div>

          <div className="manifesto__pillars">
            <div className="manifesto__pillar">
              <div className="manifesto__pillar-num">01</div>
              <h4 className="manifesto__pillar-title">Criterio, no relleno</h4>
              <p className="manifesto__pillar-desc">
                No importamos lotes genéricos. Cada modelo que entra a nuestro showroom
                ha sido analizado por su balance acústico, afinación y electrónica.
              </p>
            </div>

            <div className="manifesto__pillar">
              <div className="manifesto__pillar-num">02</div>
              <h4 className="manifesto__pillar-title">Asesoría sin rodeos</h4>
              <p className="manifesto__pillar-desc">
                Si buscas sonido funk vintage o compresión para estudio, te decimos qué
                pastillas o preamps te sirven realmente. Músicos atendiendo a músicos.
              </p>
            </div>

            <div className="manifesto__pillar">
              <div className="manifesto__pillar-num">03</div>
              <h4 className="manifesto__pillar-title">Envíos protegidos</h4>
              <p className="manifesto__pillar-desc">
                Enviamos a La Paz, Santa Cruz, Sucre y los 9 departamentos con embalaje
                rígido reforzado y guía directa de seguimiento por WhatsApp.
              </p>
            </div>
          </div>

          <div className="manifesto__footer">
            <Link
              href="/nosotros"
              className="manifesto__link"
            >
              <span>Conoce nuestra historia y showroom en Cochabamba</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ======== CTA WHATSAPP BOUTIQUE ======== */}
      <section className="section cta-section" aria-label="Consulta por WhatsApp">
        <div className="container">
          <div className="cta-box">
            <div className="cta-box__badge">
              <span className="pill-badge pill-badge--featured">
                <span className="pill-badge__dot" />
                Respuesta Rápida
              </span>
            </div>
            <h2 className="cta-box__title">
              ¿Buscas un modelo específico o asesoramiento?
            </h2>
            <p className="cta-box__subtitle">
              Escríbenos directamente. Te compartimos fotos reales en alta resolución,
              videos de sonido y resolvemos cualquier duda técnica antes de tu compra.
            </p>
            <div className="cta-box__actions">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-lg"
                id="home-cta-whatsapp"
              >
                <MessageCircle size={20} />
                <span>Escribir al WhatsApp de Don Bolivia</span>
              </a>
              <Link href="/contacto" className="btn btn-outline btn-lg">
                <span>Ver ubicación en Cochabamba</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
