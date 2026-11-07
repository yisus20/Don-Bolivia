'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { NavBar } from '@/components/NavBar'
import { Footer } from '@/components/Footer'
import { WhatsAppFloat } from '@/components/WhatsAppFloat'
import { StoreInteractiveProvider } from '@/components/StoreInteractiveProvider'

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')

  if (isAdmin) {
    return <main>{children}</main>
  }

  return (
    <StoreInteractiveProvider>
      <div className="lux-site-shell">
        <div className="db-grain-overlay" />
        <NavBar />
        <main className="db-main-content">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </div>
    </StoreInteractiveProvider>
  )
}
