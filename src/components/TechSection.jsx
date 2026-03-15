import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './TechSection.css'

gsap.registerPlugin(ScrollTrigger)

const pills = ['Kotlin', 'Swift', 'Jetpack Compose', 'SwiftUI', 'vDSP', 'Open Source']

export default function TechSection() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.tech-content > *', {
        y: 30, opacity: 0, duration: 0.5, stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.tech-section', start: 'top 80%' }
      })

      gsap.from('.tech-pill', {
        scale: 0.8, opacity: 0, duration: 0.3, stagger: 0.06,
        ease: 'back.out(1.7)',
        scrollTrigger: { trigger: '.tech-pills', start: 'top 90%' }
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section className="tech-section" id="technology" ref={ref}>
      <div className="tech-label">
        <span className="section-label" style={{ color: 'var(--red)', letterSpacing: '0.15em' }}>TECHNOLOGY</span>
      </div>
      <div className="tech-content">
        <h3 className="tech-pipeline">
          Microphone &rarr; Butterworth bandpass (15&ndash;120&nbsp;Hz) &rarr; Autocorrelation &rarr; BPM
        </h3>
        <p className="tech-body">
          HeartBeat captures <span className="tech-hl">raw audio</span> from your phone&rsquo;s microphone, applies a {' '}
          <span className="tech-hl">4th-order Butterworth bandpass filter</span> to isolate the low-frequency
          mechanical vibrations of heartbeats, then uses <span className="tech-hl">autocorrelation</span> to
          detect periodicity and compute beats per minute. The entire pipeline
          runs in real time, on-device, with zero network calls.
        </p>
        <div className="tech-pills">
          {pills.map((p, i) => (
            <span className="tech-pill" key={i}>{p}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
