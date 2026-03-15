import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './WhySection.css'

gsap.registerPlugin(ScrollTrigger)

export default function WhySection() {
  const ref = useRef(null)
  const secondsRef = useRef(null)
  const priceRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.why-headline, .why-body', {
        y: 40, opacity: 0, duration: 0.7, stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.why-section', start: 'top 75%' }
      })

      gsap.from('.why-stat', {
        y: 30, opacity: 0, duration: 0.5, stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.why-stats', start: 'top 85%' }
      })

      // Count-up: 15 → 30 for seconds
      const secObj = { val: 0 }
      gsap.to(secObj, {
        val: 30, duration: 1.8, ease: 'power2.out',
        scrollTrigger: { trigger: '.why-stats', start: 'top 85%' },
        onUpdate: () => {
          if (secondsRef.current) secondsRef.current.textContent = Math.round(secObj.val) + 's'
        }
      })

      // Count-down: 10 → 0 for price
      const priceObj = { val: 50 }
      gsap.to(priceObj, {
        val: 0, duration: 1.8, ease: 'power2.out',
        scrollTrigger: { trigger: '.why-stats', start: 'top 85%' },
        onUpdate: () => {
          if (priceRef.current) priceRef.current.textContent = '$' + Math.round(priceObj.val)
        }
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section className="why-section" ref={ref}>
      <span className="section-label" style={{ color: 'var(--red)', marginBottom: 20, display: 'block' }}>WHY HEARTBEAT</span>

      <h2 className="why-headline">
        Heart rate monitoring{' '}<span className="why-br-mobile" />shouldn't be{' '}<span className="why-br-mobile" />a <span className="red">luxury</span>.
      </h2>

      <p className="why-body">
        Every smartphone ships with a microphone sensitive enough to detect the
        mechanical vibrations of a human heartbeat. The hardware has been in your
        pocket for years — it just needed the right software. HeartBeat is that software.
        Free, open source, and built to run entirely on-device with zero data leaving your phone.
      </p>

      <div className="why-stats">
        <div className="why-stat">
          <span className="why-stat-value">5.4B+</span>
          <span className="why-stat-label">people with phones, no wearable</span>
        </div>
        <div className="why-divider" />
        <div className="why-stat">
          <span className="why-stat-value" ref={priceRef}>$50</span>
          <span className="why-stat-label">forever free</span>
        </div>
        <div className="why-divider" />
        <div className="why-stat">
          <span className="why-stat-value" ref={secondsRef}>0s</span>
          <span className="why-stat-label">per measurement</span>
        </div>
        <div className="why-divider" />
        <div className="why-stat">
          <span className="why-stat-value green">100%</span>
          <span className="why-stat-label">offline & private</span>
        </div>
      </div>
    </section>
  )
}
