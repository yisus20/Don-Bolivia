import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, Check } from 'lucide-react'
import { buildWhatsAppLinkGeneric } from '@/lib/whatsapp'
import { STATIC_BRANDS, STATIC_CATEGORIES, STATIC_PRODUCTS } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Nosotros – Don Bolivia',
  description:
    'Conoce Don Bolivia. Instrumentos y accesorios musicales en Cochabamba con envíos a La Paz y toda Bolivia. Sire, Donner, Magma.',
}

export default function NosotrosPage() {
  const waLink = buildWhatsAppLinkGeneric()
  const totalProducts = STATIC_PRODUCTS.filter(p => p.status === 'published').length

  return (
    <div className="lux-page">
      {/* 01 / Hero Bordeaux Lacquer */}
      <section className="lux-page-hero bordeaux-lacquer" aria-label="Sobre Don Bolivia">
        <div className="db-grain-bordeaux" />
        <div className="lux-page-hero__inner">
          <span className="lux-eyebrow lux-eyebrow--light">
            MANIFIESTO DON BOLIVIA · COCHABAMBA &amp; LA PAZ
          </span>
          <h1 className="lux-page-hero__title">
            La música no necesita más discursos.
            <br />
            Necesita buenos instrumentos.
          </h1>
          <p className="lux-page-hero__sub">
            Seleccionamos bajos, guitarras, pedales y accesorios con criterio de estudio.
            Trabajamos directamente con marcas oficiales para que en Bolivia toques con el mismo
            estándar que afuera.
          </p>
        </div>
      </section>

      {/* 02 / Key Figures & Editorial Philosophy */}
      <section className="lux-curated-section">
        <div className="lux-curated-container">
          <div className="lux-curated-header">
            <div>
              <span className="lux-eyebrow">NUESTRA FILOSOFÍA</span>
              <h2 className="lux-heading-lg">
                Curaduría real, sin relleno.
              </h2>
              <div className="lux-accent-bar lux-accent-bar--left" />
            </div>
            <p className="lux-curated-header__lead">
              Cada instrumento del catálogo pasa por revisión antes de entregarse en tienda en
              Cochabamba o despacharse hacia La Paz y el resto del país.
            </p>
          </div>

          <div className="lux-stats-grid">
            {[
              {
                value: `${totalProducts}+`,
                label: 'Modelos en catálogo',
                detail: 'Bajos, guitarras, pedales, pianos y accesorios.',
              },
              {
                value: String(STATIC_BRANDS.filter(b => b.active).length),
                label: 'Marcas oficiales',
                detail: 'Distribuidores directos de Sire, Donner y Magma.',
              },
              {
                value: String(STATIC_CATEGORIES.filter(c => c.active).length),
                label: 'Líneas de equipo',
                detail: 'Desde instrumentos de entrada hasta serie profesional.',
              },
              {
                value: 'BO',
                label: 'Cochabamba · La Paz',
                detail: 'Showroom en Cochabamba y envíos asegurados a todo el país.',
              },
            ].map(stat => (
              <div key={stat.label} className="lux-stat-card">
                <span className="lux-stat-card__value">{stat.value}</span>
                <h3 className="lux-stat-card__label">{stat.label}</h3>
                <p className="lux-stat-card__detail">{stat.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03 / Nuestras Marcas — 3-Column Bento Grid matching Home */}
      <section className="lux-curated-section" style={{ paddingTop: 0 }}>
        <div className="lux-curated-container">
          <div className="lux-curated-header">
            <div>
              <span className="lux-eyebrow">ALIANZAS DIRECTAS</span>
              <h2 className="lux-heading-lg">Las marcas del catálogo.</h2>
              <div className="lux-accent-bar lux-accent-bar--left" />
            </div>
            <p className="lux-curated-header__lead">
              Tres firmas que equilibran construcción, sonido e ingeniería sin inflar el precio por
              un logo en la pala.
            </p>
          </div>

          <div className="lux-curated-grid">
            {/* Card 1: Sire */}
            <article className="lux-curated-card lux-curated-card--light">
              <div className="lux-curated-card__top">
                <span className="lux-curated-card__tag">MARCUS MILLER &amp; LARRY CARLTON</span>
                <span className="lux-curated-card__count">Sire USA</span>
              </div>

              <div className="lux-curated-card__body" style={{ marginBlock: 'auto', paddingBlock: '1rem' }}>
                <h3 className="lux-curated-card__title" style={{ fontSize: '1.5rem' }}>
                  Sire
                </h3>
                <p className="lux-curated-card__desc">
                  Diseñados junto a Marcus Miller y Larry Carlton. Mástiles de arce tostado,
                  bordes redondeados Edgeless™ y preamplificadores activos Heritage-3 de 18V que
                  redefinieron el estándar de la industria.
                </p>
              </div>

              <div className="lux-curated-card__footer">
                <Link href="/catalogo?brand=sire" className="lux-curated-card__link">
                  <span>Explorar línea Sire</span>
                  <ArrowUpRight size={15} />
                </Link>
              </div>
            </article>

            {/* Card 2: Donner (Bordeaux Lacquer) */}
            <article className="lux-curated-card lux-curated-card--bordeaux bordeaux-lacquer">
              <div className="db-grain-bordeaux" />
              <div className="lux-curated-card__top">
                <span className="lux-curated-card__tag lux-curated-card__tag--light">
                  INGENIERÍA MODERNA
                </span>
                <span className="lux-curated-card__count lux-curated-card__count--light">
                  Donner
                </span>
              </div>

              <div className="lux-curated-card__manifesto">
                <h3 className="lux-curated-card__manifesto-title">Donner</h3>
                <p className="lux-curated-card__manifesto-copy">
                  Desde guitarras viajeras headless HUSH™ y pedales analógicos compactos hasta
                  pianos digitales y baterías electrónicas con mesh heads para estudio en casa.
                </p>
                <ul className="lux-curated-card__checks">
                  <li>
                    <Check size={14} />
                    <span>Pedales y multiefectos de estudio</span>
                  </li>
                  <li>
                    <Check size={14} />
                    <span>Guitarras silenciosas y amplificadores</span>
                  </li>
                </ul>
              </div>

              <div className="lux-curated-card__footer lux-curated-card__footer--dark">
                <Link href="/catalogo?brand=donner" className="lux-btn-cream-sm">
                  <span>Explorar línea Donner</span>
                  <ArrowUpRight size={15} />
                </Link>
              </div>
            </article>

            {/* Card 3: Magma (Charcoal) */}
            <article className="lux-curated-card lux-curated-card--charcoal">
              <div className="lux-curated-card__top">
                <span className="lux-curated-card__tag lux-curated-card__tag--muted">
                  CUERDAS &amp; ACCESORIOS
                </span>
                <span className="lux-curated-card__count lux-curated-card__count--dark">
                  Magma Strings
                </span>
              </div>

              <div className="lux-curated-card__body" style={{ marginBlock: 'auto', paddingBlock: '1rem' }}>
                <h3 className="lux-curated-card__title" style={{ color: '#FFFFFF', fontSize: '1.5rem' }}>
                  Magma
                </h3>
                <p className="lux-curated-card__desc" style={{ color: 'rgba(255,255,255,0.68)' }}>
                  Encordados profesionales para bajo, guitarra eléctrica, acústica y clásica,
                  fabricados con aleaciones calibradas para mantener afinación, brillo y tensión
                  estable.
                </p>
              </div>

              <div className="lux-curated-card__footer lux-curated-card__footer--dark">
                <Link
                  href="/catalogo?brand=magma"
                  className="lux-curated-card__link"
                  style={{ color: '#FFFFFF' }}
                >
                  <span>Explorar línea Magma</span>
                  <ArrowUpRight size={15} />
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* 04 / Cómo Funciona */}
      <section className="lux-curated-section" style={{ paddingTop: 0 }}>
        <div className="lux-curated-container">
          <div className="lux-process-banner">
            <div className="lux-process-banner__header">
              <span className="lux-eyebrow">COMPRA SIN FRICCIÓN</span>
              <h2 className="lux-heading-lg">Cómo adquirir tu instrumento.</h2>
            </div>

            <div className="lux-process-steps">
              {[
                {
                  step: '01',
                  title: 'Explora el catálogo',
                  desc: 'Revisa las especificaciones técnicas, fotos reales y modelos disponibles por categoría o marca.',
                },
                {
                  step: '02',
                  title: 'Consulta directa con un músico',
                  desc: 'Con un clic en WhatsApp te atendemos sin bots para confirmar stock en tienda y tipo de cambio del día.',
                },
                {
                  step: '03',
                  title: 'Prueba en tienda o recibe en tu ciudad',
                  desc: 'Puedes probarlo en nuestro showroom en Cochabamba o coordinar envío seguro a La Paz y toda Bolivia.',
                },
              ].map(item => (
                <div key={item.step} className="lux-process-step">
                  <span className="lux-process-step__num">{item.step}</span>
                  <h3 className="lux-process-step__title">{item.title}</h3>
                  <p className="lux-process-step__desc">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="lux-process-actions">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="lux-btn-dark"
                id="nosotros-whatsapp"
              >
                <span>Hablar por WhatsApp</span>
                <ArrowUpRight size={16} />
              </a>
              <Link href="/catalogo" className="lux-btn-outline-sm" id="nosotros-catalog">
                <span>Explorar catálogo completo</span>
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
