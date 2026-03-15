import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Footer.css'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.footer-tagline', {
        y: 30, opacity: 0, duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.footer', start: 'top 90%' }
      })
      gsap.from('.footer-bottom > *', {
        y: 15, opacity: 0, duration: 0.5, stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.footer-bottom', start: 'top 95%' }
      })

    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <footer className="footer" ref={ref}>
      {/* Top — Big tagline */}
      <div className="footer-top">
        <div className="footer-heart">
          <svg width="24" height="22" viewBox="0 0 22 20" fill="none">
            <path d="M11 19L1.68 10.34a5.5 5.5 0 0 1 7.32-8.18L11 4.02l1.99-1.86a5.5 5.5 0 0 1 7.32 8.18L11 19z" fill="#E63946"/>
          </svg>
        </div>
        <h2 className="footer-tagline">
          Your heartbeat deserves<br/>to be heard.
        </h2>
        <p className="footer-sub">
          Open source. Free forever. Built for the 5 billion.
        </p>
        <div className="footer-cta-row">
          <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer" className="footer-cta">
            <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor"><path d="M14.222 9.374c1.037-.61 1.037-2.137 0-2.748L11.528 5.04 8.32 8l3.207 2.96zm-3.595 2.116L7.583 8.68 1.03 14.73c.201 1.029 1.36 1.61 2.303 1.055zM1 13.396V2.603L6.846 8zM1.03 1.27l6.553 6.05 3.044-2.81L3.333.215C2.39-.341 1.231.24 1.03 1.27"/></svg>
            Download for Android
          </a>
          <a href="https://github.com/anmolbhardwaj17/heartbeat-website" target="_blank" rel="noopener noreferrer" className="footer-cta-ghost">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            View on GitHub
          </a>
          <div className="footer-ios-wrap">
            <span className="footer-cta-ios">
              <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
              Download for iPhone
            </span>
            <span className="footer-coming-soon">Coming Soon</span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="footer-divider" />

      {/* Bottom — Links & info */}
      <div className="footer-bottom">
        <div className="footer-brand">
          <svg width="14" height="12" viewBox="0 0 22 20" fill="none">
            <path d="M11 19L1.68 10.34a5.5 5.5 0 0 1 7.32-8.18L11 4.02l1.99-1.86a5.5 5.5 0 0 1 7.32 8.18L11 19z" fill="#E63946"/>
          </svg>
          <span>HeartBeat</span>
        </div>

        <div className="footer-links">
          <a href="https://github.com/anmolbhardwaj17/heartbeat-website" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
          <a href="/terms-of-service" target="_blank" rel="noopener noreferrer">Terms of Service</a>
          <a href="https://anmolbhardwaj.com" target="_blank" rel="noopener noreferrer">anmolbhardwaj.com</a>
        </div>

        <span className="footer-copy">&copy; 2026 Anmol Bhardwaj</span>
      </div>
    </footer>
  )
}
