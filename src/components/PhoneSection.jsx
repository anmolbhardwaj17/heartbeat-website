import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './PhoneSection.css'

gsap.registerPlugin(ScrollTrigger)

export default function PhoneSection() {
  const ref = useRef(null)
  const phoneRef = useRef(null)

  const handleMouseMove = useCallback((e) => {
    const el = phoneRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(800px) rotateX(${y * -20}deg) rotateY(${x * 20}deg) scale3d(1.02, 1.02, 1.02)`
  }, [])

  const handleMouseLeave = useCallback(() => {
    const el = phoneRef.current
    if (!el) return
    el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.phone-mockup-wrap', {
        y: 60, opacity: 0, duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.phone-section', start: 'top 75%' }
      })

      gsap.from('.how-word', {
        opacity: 0, y: 20, stagger: 0.04, duration: 0.5,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.how-left', start: 'top 80%' }
      })

      gsap.from('.how-left .section-label', {
        opacity: 0, y: 15, duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.how-left', start: 'top 80%' }
      })

      gsap.from('.how-step', {
        y: 30, opacity: 0, duration: 0.5, stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.how-right', start: 'top 85%' }
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section className="phone-section" ref={ref} id="how">
      {/* 3-column row: title | phone | steps */}
      <div className="how-columns">

      {/* Left — Title */}
      <div className="how-left">
        <h2>
          <span className="how-line"><span className="how-word">Three </span><span className="how-word">steps.</span></span>
          <span className="how-line how-line-mid"><span className="how-word">Thirty </span><span className="how-word">seconds.</span></span>
          <span className="how-line"><span className="how-word red">Your </span><span className="how-word red">heart </span><span className="how-word red">rate.</span></span>
        </h2>
      </div>

      {/* Center — Phone mockup with pulse rings */}
      <div className="phone-mockup-wrap">
        <div className="phone-pulse-rings">
          <div className="phone-pulse p1"></div>
          <div className="phone-pulse p2"></div>
          <div className="phone-pulse p3"></div>
          <div className="phone-pulse p4"></div>
        </div>
        <div
          className="phone-device"
          ref={phoneRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="phone-bezel">
            <div className="phone-notch" />
            <div className="phone-screen">
              <img
                src="/images/app-screenshot.png"
                alt="HeartBeat app showing 76 BPM reading"
              />
            </div>
            <div className="phone-chin" />
          </div>
        </div>
      </div>

      {/* Right — Steps */}
      <div className="how-right">
        <div className="how-step">
          <div className="step-num">1</div>
          <div className="step-body">
            <h4>Position your phone</h4>
            <p>Place your phone's microphone flat against the left side of your chest.</p>
          </div>
        </div>
        <div className="how-step">
          <div className="step-num">2</div>
          <div className="step-body">
            <h4>Be still & quiet</h4>
            <p>Stay still and breathe normally. Minimize movement and background noise.</p>
          </div>
        </div>
        <div className="how-step">
          <div className="step-num">3</div>
          <div className="step-body">
            <h4>Get your results</h4>
            <p>In 30 seconds, see your BPM, heart rate zone, and beat pattern.</p>
          </div>
        </div>
      </div>
      </div>
    </section>
  )
}
