import type { Metadata } from 'next'
import { HomeInteractive } from '@/components/HomeInteractive'

export const metadata: Metadata = {
  title: 'Don Bolivia — Bajos Sire, Guitarras, Pedales Donner y Cuerdas Magma en Cochabamba',
  description:
    'Tienda de instrumentos musicales en Cochabamba con envíos a toda Bolivia. Bajos Marcus Miller by Sire, guitarras Larry Carlton, equipos Donner y cuerdas Magma.',
  alternates: {
    canonical: 'https://don-bolivia.com/',
  },
}

export default function HomePage() {
  return <HomeInteractive />
}
