'use client'

import React, { useEffect, useRef, useState } from 'react'

const CLIP_START = 0.08
const CLIP_END = 3.85
const CROSSFADE_DURATION = 1.65 // 1.65s seamless cosine crossfade overlap

export function InkFlutedHero() {
  const videoARef = useRef<HTMLVideoElement | null>(null)
  const videoBRef = useRef<HTMLVideoElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  // Appear after 1 second: "Tu próximo instrumento no se va a elegir solo."
  const [showPhrase, setShowPhrase] = useState(false)
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowPhrase(true)
    }, 1000)
    return () => window.clearTimeout(timer)
  }, [])

  // True infinite loop using dual-video overlap crossfade (no visible cut or seek jump)
  useEffect(() => {
    const vA = videoARef.current
    const vB = videoBRef.current
    if (!vA || !vB) return

    let rafId: number | null = null
    let activeSlot: 'A' | 'B' = 'A'
    let isCrossfading = false

    vA.currentTime = CLIP_START
    vB.currentTime = CLIP_START
    vA.playbackRate = 0.82
    vB.playbackRate = 0.82
    vA.style.opacity = '1'
    vB.style.opacity = '0'

    vA.play().catch(() => {})

    const tick = () => {
      const primary = activeSlot === 'A' ? vA : vB
      const secondary = activeSlot === 'A' ? vB : vA

      const t = primary.currentTime
      const triggerTime = CLIP_END - CROSSFADE_DURATION

      if (!isCrossfading && t >= triggerTime) {
        isCrossfading = true
        secondary.currentTime = CLIP_START
        secondary.playbackRate = 0.82
        secondary.play().catch(() => {})
      }

      if (isCrossfading) {
        const elapsed = Math.max(0, t - triggerTime)
        const progress = Math.min(1, elapsed / CROSSFADE_DURATION)
        // Smooth cosine S-curve blend so the transition is completely imperceptible
        const alpha = 0.5 - 0.5 * Math.cos(progress * Math.PI)

        if (activeSlot === 'A') {
          vB.style.opacity = alpha.toFixed(3)
          vA.style.opacity = '1'
        } else {
          vB.style.opacity = (1 - alpha).toFixed(3)
          vA.style.opacity = '1'
        }

        if (progress >= 1 || t >= CLIP_END) {
          primary.pause()
          primary.currentTime = CLIP_START
          activeSlot = activeSlot === 'A' ? 'B' : 'A'
          isCrossfading = false
          if (activeSlot === 'B') {
            vB.style.opacity = '1'
          } else {
            vB.style.opacity = '0'
          }
        }
      }

      rafId = window.requestAnimationFrame(tick)
    }

    rafId = window.requestAnimationFrame(tick)

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId)
    }
  }, [])

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const container = containerRef.current
    if (!container) return
    const rect = container.getBoundingClientRect()
    const nx = (e.clientX - rect.left) / rect.width - 0.5
    const ny = (e.clientY - rect.top) / rect.height - 0.5
    setMouseOffset({ x: nx * 12, y: ny * 8 })
  }

  const handlePointerLeave = () => {
    setMouseOffset({ x: 0, y: 0 })
  }

  const videoTransform = `scale(1.16) translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)`

  return (
    <section
      className="lux-ink-hero-track"
      aria-label="Presentación de Don Bolivia"
    >
      <div
        ref={containerRef}
        className="lux-ink-hero"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        {/* Dual-buffered video layers for seamless infinite loop reaching the top navbar */}
        <div className="lux-ink-hero__video-wrap" aria-hidden="true">
          <video
            ref={videoARef}
            src="/video-hero.mp4"
            muted
            playsInline
            autoPlay
            preload="auto"
            className="lux-ink-hero__video lux-ink-hero__video--base"
            style={{ transform: videoTransform }}
          />
          <video
            ref={videoBRef}
            src="/video-hero.mp4"
            muted
            playsInline
            preload="auto"
            className="lux-ink-hero__video lux-ink-hero__video--overlay"
            style={{ transform: videoTransform }}
          />
          <div className="lux-ink-hero__video-vignette" />
        </div>

        {/* Centered Headline Only (single minimalist typeface, appears after 1 second) */}
        <div className="lux-ink-hero__content">
          <h1
            className={`lux-ink-hero__title ${
              showPhrase ? 'lux-ink-hero__title--visible' : ''
            }`}
          >
            <span className="lux-ink-hero__line lux-ink-hero__line--1">
              Tu próximo instrumento
            </span>
            <span className="lux-ink-hero__line lux-ink-hero__line--2">
              no se va a elegir solo.
            </span>
          </h1>
        </div>
      </div>
    </section>
  )
}
