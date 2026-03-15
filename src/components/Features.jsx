import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Features.css'

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    name: 'Real-Time BPM Detection',
    desc: 'Autocorrelation-based peak detection delivers your heart rate within seconds — not minutes.',
  },
  {
    name: 'Live Waveform',
    desc: 'Watch your heartbeat waveform animate in real time as the microphone picks up each beat.',
  },
  {
    name: 'Heart Rate Zones',
    desc: 'Resting, Normal, Elevated, Active, Intense — color-coded so you know exactly where you stand.',
  },
  {
    name: 'Session History',
    desc: 'Every reading saved locally. Track trends across days, weeks, and months — all on-device.',
  },
  {
    name: '30-Second Readings',
    desc: 'Place your phone, hold still, get your BPM. A complete measurement in half a minute.',
  },
  {
    name: '100% Offline & Private',
    desc: 'No internet, no cloud, no accounts, no tracking. Your health data never leaves your device.',
  },
]

export default function Features() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.feature-row', {
        y: 30, opacity: 0, duration: 0.5, stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.features-list', start: 'top 80%' }
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section className="features-section" id="features" ref={ref}>
      <div className="features-label">
        <span className="section-label" style={{ color: 'var(--red)', letterSpacing: '0.15em' }}>FEATURES</span>
      </div>
      <div className="features-list">
        {features.map((f, i) => (
          <div className="feature-row" key={i}>
            <span className="feature-name">{f.name}</span>
            <span className="feature-desc">{f.desc}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
