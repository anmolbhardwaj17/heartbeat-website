import { Link } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

export default function LegalNav() {
  return (
    <nav className="hero-nav" style={{ position: 'relative' }}>
      <Link to="/" className="hero-nav-left" style={{ textDecoration: 'none' }}>
        <div className="nav-icon">
          <svg width="16" height="14" viewBox="0 0 18 16" fill="none">
            <path d="M9 16L7.695 14.82C3.06 10.62 0 7.84 0 4.4C0 1.62 2.178 -0.4 4.95 -0.4C6.516 -0.4 8.019 0.34 9 1.504C9.981 0.34 11.484 -0.4 13.05 -0.4C15.822 -0.4 18 1.62 18 4.4C18 7.84 14.94 10.62 10.305 14.82L9 16Z" fill="#E63946"/>
          </svg>
        </div>
        <span className="nav-brand">HeartBeat</span>
      </Link>
      <div className="hero-nav-center">
        <Link to="/">Home</Link>
        <Link to="/privacy-policy">Privacy</Link>
        <Link to="/terms-of-service">Terms</Link>
        <a href="https://github.com/anmolbhardwaj17/heart-beat" target="_blank" rel="noopener noreferrer">GitHub</a>
      </div>
      <div className="nav-right">
        <Link to="/" className="nav-cta">Back to Home</Link>
        <ThemeToggle />
      </div>
    </nav>
  )
}
