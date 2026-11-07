import type { Metadata } from 'next'
import { HomeInteractive } from '@/components/HomeInteractive'

export const metadata: Metadata = {
  title: 'Don Bolivia — Sire Authorized Dealer & Boutique Musical',
  description:
    'Bajos Marcus Miller by Sire, guitarras Larry Carlton, pedaleras Donner y cuerdas Magma en Cochabamba y La Paz, Bolivia. Stock real y atención directa.',
}

export default function HomePage() {
  return <HomeInteractive />
}
