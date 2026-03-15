import React from 'react'
import ReactDOM from 'react-dom/client'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import App from './App'
import { inject } from '@vercel/analytics'

inject()

// Apply theme before render to prevent flash
const savedTheme = localStorage.getItem('heartbeat-theme') ||
  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
document.documentElement.setAttribute('data-theme', savedTheme)
import './index.css'

// Force scroll to top on every page load/reload
window.history.scrollRestoration = 'manual'
window.scrollTo(0, 0)
document.documentElement.scrollTop = 0
document.body.scrollTop = 0

// Also reset on DOMContentLoaded and load in case browser restores late
document.addEventListener('DOMContentLoaded', () => { window.scrollTo(0, 0) })
window.addEventListener('load', () => { window.scrollTo(0, 0) })

// Initialize smooth scroll
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
})
window.__lenis = lenis

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

// Smooth scroll for anchor links via Lenis
document.addEventListener('click', (e) => {
  const anchor = e.target.closest('a[href^="#"]')
  if (!anchor) return
  const target = document.querySelector(anchor.getAttribute('href'))
  if (!target) return
  e.preventDefault()
  lenis.scrollTo(target, { offset: -20 })
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
