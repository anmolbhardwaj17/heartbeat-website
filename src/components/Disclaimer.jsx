import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Disclaimer.css'

gsap.registerPlugin(ScrollTrigger)

export default function Disclaimer() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.disclaimer-section > *', {
        y: 20, opacity: 0, duration: 0.5, stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.disclaimer-section', start: 'top 90%' }
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section className="disclaimer-section" ref={ref}>
      <div className="disclaimer-label">
        <span className="section-label red">DISCLAIMER</span>
      </div>
      <div className="disclaimer-content">
        <p>
          HeartBeat is <strong>not a medical device</strong>. It is an experimental tool that
          uses your phone&rsquo;s microphone to estimate heart rate. Results may vary based
          on phone model, placement, ambient noise, and individual physiology. Do not use
          HeartBeat to make medical decisions. Always consult a healthcare professional for
          accurate heart rate monitoring and medical advice.
        </p>
      </div>
    </section>
  )
}
