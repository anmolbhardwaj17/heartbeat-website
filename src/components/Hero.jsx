import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ThemeToggle from './ThemeToggle'
import './Hero.css'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const ref = useRef(null)

  useEffect(() => {
    // Aggressive scroll reset — covers all browser restore timings
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    const lenis = window.__lenis
    if (lenis) lenis.scrollTo(0, { immediate: true })

    const ctx = gsap.context(() => {

      let revealStarted = false

      // Hero content hidden via CSS class .hero-content-hidden
      gsap.set('.hero-heart-static', { opacity: 0 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.hero-container',
          start: 'top top',
          end: '+=400%',
          pin: true,
          scrub: 0.3,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (self.progress >= 0.96 && !revealStarted) {
              revealStarted = true

              gsap.set('.msg-1, .msg-2, .msg-3, .intro-scroll-hint', { display: 'none' })

              // 1. Lock the giant heart's current transform BEFORE kill
              const giantEl = document.querySelector('.giant-heart')
              const computedTransform = window.getComputedStyle(giantEl).transform
              giantEl.style.transform = computedTransform

              // 2. Position static heart at its final spot
              const staticEl = document.querySelector('.hero-heart-static')
              if (staticEl) {
                const isMobile = window.innerWidth <= 768
                const heartSize = isMobile ? '100px' : '120px'
                const desktopOffset = Math.min(200, Math.max(140, window.innerHeight * 0.17))
                const heartOffset = isMobile ? '18vh' : desktopOffset + 'px'
                staticEl.style.top = `calc(50% - ${heartOffset})`
                staticEl.style.left = '50%'
                staticEl.style.transform = 'translate(-50%, -50%)'
                const img = staticEl.querySelector('img')
                img.style.width = heartSize
                img.style.height = heartSize

                const pRings = document.querySelector('.pulse-rings')
                if (pRings) {
                  pRings.style.top = `calc(50% - ${heartOffset})`
                  pRings.style.left = '50%'
                }
              }

              // 3. Show static heart FIRST (underneath giant heart)
              gsap.set('.hero-heart-static', { opacity: 1 })
              startBeating()
              gsap.to('.pulse-rings', { opacity: 1, duration: 0.4 })

              // 4. Now kill the ScrollTrigger (giant heart keeps its locked transform)
              const heroContainer = document.querySelector('.hero-container')
              const pinSpacer = document.querySelector('.pin-spacer')

              self.kill()

              // Re-apply the locked transform since kill may have cleared it
              giantEl.style.transform = computedTransform

              heroContainer.style.position = 'fixed'
              heroContainer.style.top = '0'
              heroContainer.style.left = '0'
              heroContainer.style.width = '100%'
              heroContainer.style.height = '100vh'
              heroContainer.style.zIndex = '9999'

              // 5. Fade out giant heart at its current size — static heart is already visible behind it
              gsap.to(giantEl, { opacity: 0, duration: 0.5, ease: 'power2.inOut', onComplete: () => {
                gsap.set(giantEl, { display: 'none' })
              }})

              // 6. Play reveal after 1s of beating
              gsap.delayedCall(1, playReveal)

              // 6. After reveal finishes, unfix and collapse scroll space
              gsap.delayedCall(3.5, () => {
                heroContainer.style.position = ''
                heroContainer.style.top = ''
                heroContainer.style.left = ''
                heroContainer.style.width = ''
                heroContainer.style.zIndex = ''
                heroContainer.style.height = '100vh'
                heroContainer.style.overflow = 'hidden'

                if (pinSpacer) {
                  pinSpacer.style.height = '100vh'
                  pinSpacer.style.padding = '0'
                }

                window.scrollTo(0, 0)
                const lenis = window.__lenis
                if (lenis) {
                  lenis.scrollTo(0, { immediate: true })
                }
                ScrollTrigger.refresh()
              })
            }
          },
        }
      })

      // ── RED PHASE ──
      // Ensure msg-2 and msg-3 start fully hidden (opacity 0) before making visible
      gsap.set('.msg-2, .msg-3', { opacity: 0, y: 30, visibility: 'visible' })
      gsap.set('.msg-1', { opacity: 0, y: 30, visibility: 'visible' })
      const introTween = gsap.to('.msg-1', { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.5 })

      tl.call(() => { introTween.kill() }, [], 0)
      tl.set('.msg-1', { opacity: 1, y: 0 }, 0)
      tl.to('.msg-1', { opacity: 0, y: -30, duration: 0.07, ease: 'power2.in' }, 0.05)

      tl.to('.msg-2', { opacity: 1, y: 0, duration: 0.07, ease: 'power2.out' }, 0.12)
      tl.to('.msg-2', { opacity: 0, y: -30, duration: 0.07, ease: 'power2.in' }, 0.23)

      tl.to('.msg-3', { opacity: 1, y: 0, duration: 0.07, ease: 'power2.out' }, 0.30)
      tl.to('.msg-3', { opacity: 0, y: -30, duration: 0.07, ease: 'power2.in' }, 0.42)

      // ── SHRINK — calculate scale for 28px final size on any screen ──
      const vmax = Math.max(window.innerWidth, window.innerHeight)
      const isMobile = window.innerWidth <= 768
      const targetSize = isMobile ? 100 : 120
      const finalScale = targetSize / (vmax * 2.5)

      tl.to('.giant-heart', {
        scale: finalScale, y: isMobile ? '-18vh' : -Math.min(200, Math.max(140, window.innerHeight * 0.17)), duration: 0.50, ease: 'power2.inOut',
      }, 0.45)

      // ── BEATING — on the static heart, no conflicts ──
      function startBeating() {
        const heart = document.querySelector('.hero-heart-static img')
        if (!heart) return
        function beatLoop() {
          const bt = gsap.timeline({ onComplete: beatLoop })
          bt.to(heart, { scale: 1.15, duration: 0.1, ease: 'power2.out' })
          bt.to(heart, { scale: 1, duration: 0.12, ease: 'power2.in' })
          bt.to(heart, { scale: 1.08, duration: 0.09, ease: 'power2.out' }, '+=0.08')
          bt.to(heart, { scale: 1, duration: 0.12, ease: 'power2.in' })
          bt.to(heart, { scale: 1, duration: 0.55 })
        }
        beatLoop()
      }

      // ── REVEAL ──
      function playReveal() {
        // Remove hidden class from all hero content
        document.querySelectorAll('.hero-content-hidden').forEach(el => el.classList.remove('hero-content-hidden'))

        // Show nav with background
        document.querySelector('.hero-nav')?.classList.add('nav-visible')

        const r = gsap.timeline({ defaults: { ease: 'power3.out' } })

        r.to('.hero-nav', { opacity: 1, duration: 0.4 }, 0)

        r.fromTo('.gl-h1, .gl-h2',
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.5, stagger: 0.06 }, 0.05)
        r.fromTo('.gl-v1, .gl-v2',
          { scaleY: 0, opacity: 0 },
          { scaleY: 1, opacity: 1, duration: 0.5, stagger: 0.06 }, 0.05)

        r.fromTo('.word-1',
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.5 }, 0.15)

        r.fromTo('.word-2',
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.5 }, 0.3)

        r.fromTo('.hero-sub',
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.45 }, 0.5)

        r.fromTo('.hero-ctas',
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.45 }, 0.7)

        r.fromTo('.hero-bottom',
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.35 }, 0.85)
      }

    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref}>
      <div className="hero-container">
        {/* Giant heart — used only for scroll shrink animation */}
        <div className="giant-heart">
          <img src="/images/heart.svg" alt="" />
        </div>

        {/* Messages on red */}
        <div className="msg msg-1">
          <span className="msg-num">6.8 billion</span>
          <span className="msg-text">people own a smartphone.</span>
        </div>
        <div className="msg msg-2">
          <span className="msg-text">Only</span>
          <span className="msg-num">1.4 billion</span>
          <span className="msg-text">own a smartwatch.</span>
        </div>
        <div className="msg msg-3">
          <span className="msg-bold">HeartBeat is for<br/>the other <span className="rmt-hl">5 billion</span>.</span>
        </div>

        {/* Scroll hint on red screen */}
        <div className="intro-scroll-hint">
          <span>Scroll to explore</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>

        {/* White hero */}
        <div className="hero-white-bg">
          {/* Static beating heart — replaces the giant heart after shrink */}
          <div className="hero-heart-static">
            <img src="/images/heart.svg" alt="" />
          </div>

          <div className="pulse-rings">
            <div className="pulse-ring r1"></div>
            <div className="pulse-ring r2"></div>
          </div>

          <div className="grid-line gl-h1 hero-content-hidden"></div>
          <div className="grid-line gl-h2 hero-content-hidden"></div>
          <div className="grid-line gl-v1 hero-content-hidden"></div>
          <div className="grid-line gl-v2 hero-content-hidden"></div>

          <nav className="hero-nav hero-content-hidden">
            <div className="hero-nav-left">
              <div className="nav-icon"><svg width="16" height="14" viewBox="0 0 18 16" fill="none"><path d="M9 16L7.695 14.82C3.06 10.62 0 7.84 0 4.4C0 1.62 2.178 -0.4 4.95 -0.4C6.516 -0.4 8.019 0.34 9 1.504C9.981 0.34 11.484 -0.4 13.05 -0.4C15.822 -0.4 18 1.62 18 4.4C18 7.84 14.94 10.62 10.305 14.82L9 16Z" fill="#E63946"/></svg></div>
              <span className="nav-brand">HeartBeat</span>
            </div>
            <div className="hero-nav-center">
              <a href="#how">How It Works</a>
              <a href="#features">Features</a>
              <a href="#technology">Technology</a>
              <a href="https://github.com/anmolbhardwaj17/heartbeat-website" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
            <div className="nav-right">
              <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer" className="nav-cta">
                <svg viewBox="0 0 24 24" width="14" height="14"><path d="M3.18 1.22A1.18 1.18 0 002 2.35v19.3c0 .5.32.94.78 1.1l10.6-10.75L3.18 1.22zm1.14-.84l11.1 6.32-2.84 2.88L4.32.38zM22 12c0-.65-.36-1.22-.92-1.52L17.3 8.5l-3.12 3.17 3.12 3.17 3.78-1.98A1.73 1.73 0 0022 12zm-7.54.84l-2.84 2.88 11.1 6.32-8.26-9.2z" fill="currentColor"/></svg>
                <span className="nav-cta-text-full">Download for Android</span>
                <span className="nav-cta-text-short">Download</span>
              </a>
              <ThemeToggle />
            </div>
          </nav>

          <div className="hero-center hero-content-hidden">
            <h1 className="hero-title">
              <span className="word word-1">Introducing </span>
              <span className="word word-2">HeartBeat</span>
            </h1>
            <p className="hero-sub">
              Track your heart rate using your phone's microphone.
            </p>
            <div className="hero-ctas">
              <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer" className="cta-android">
                <svg viewBox="0 0 24 24" width="18" height="18"><path d="M3.18 1.22A1.18 1.18 0 002 2.35v19.3c0 .5.32.94.78 1.1l10.6-10.75L3.18 1.22zm1.14-.84l11.1 6.32-2.84 2.88L4.32.38zM22 12c0-.65-.36-1.22-.92-1.52L17.3 8.5l-3.12 3.17 3.12 3.17 3.78-1.98A1.73 1.73 0 0022 12zm-7.54.84l-2.84 2.88 11.1 6.32-8.26-9.2z" fill="currentColor"/></svg>
                Download for Android
              </a>
              <div className="cta-ios-wrap">
                <span className="cta-ios">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                  Download for iPhone
                </span>
                <span className="cta-coming-soon">Coming Soon</span>
              </div>
            </div>
          </div>

          <div className="hero-bottom hero-content-hidden">
            <div className="hero-scroll-hint"><span>Scroll to explore</span><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
          </div>
        </div>
      </div>
    </div>
  )
}
