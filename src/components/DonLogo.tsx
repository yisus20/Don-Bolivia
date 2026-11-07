import React from 'react'
import Image from 'next/image'

interface DonLogoProps {
  variant?: 'bordeaux' | 'white'
  className?: string
}

export function DonLogo({ variant = 'bordeaux', className = '' }: DonLogoProps) {
  return (
    <Image
      src="/logo-don.png"
      alt="Don Bolivia"
      width={148}
      height={48}
      priority
      className={className}
      style={{
        height: '42px',
        width: 'auto',
        objectFit: 'contain',
        display: 'block',
        filter: variant === 'white' ? 'brightness(0) invert(1)' : 'none',
      }}
    />
  )
}
