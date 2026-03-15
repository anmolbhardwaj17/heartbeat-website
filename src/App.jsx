import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import Hero from './components/Hero'
import PhoneSection from './components/PhoneSection'
import WhySection from './components/WhySection'
import Features from './components/Features'
import TechSection from './components/TechSection'
import Disclaimer from './components/Disclaimer'
import Footer from './components/Footer'
import PrivacyPolicy from './components/PrivacyPolicy'
import TermsOfService from './components/TermsOfService'

function HomePage() {
  return (
    <>
      <Hero />
      <div className="section-spacer" />
      <PhoneSection />
      <div className="section-divider" />
      <WhySection />
      <div className="section-divider" />
      <Features />
      <div className="section-divider" />
      <TechSection />
      <div className="section-divider" />
      <Disclaimer />
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Analytics />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
      </Routes>
    </BrowserRouter>
  )
}
