import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import LegalNav from './LegalNav'
import Footer from './Footer'
import './LegalPage.css'

export default function TermsOfService() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <>
      <LegalNav />
      <div className="legal-page">
        <div className="legal-header">
          <span className="legal-label">LEGAL</span>
          <h1 className="legal-title">Terms of Service</h1>
          <span className="legal-updated">Last updated: March 15, 2026</span>
        </div>

        <div className="legal-content">
          <h2>Acceptance of Terms</h2>
          <p>
            By downloading, installing, or using HeartBeat ("the App"), you agree to be bound by
            these Terms of Service. If you do not agree, do not use the App.
          </p>

          <h2>Nature of the App</h2>
          <p>
            HeartBeat is an <strong>experimental, open-source tool</strong> that estimates heart rate
            using your phone's microphone. It is provided as-is for informational and educational
            purposes only.
          </p>

          <h2>Not a Medical Device</h2>
          <p>
            HeartBeat is <strong>not a medical device</strong> and is not intended to diagnose, treat,
            cure, or prevent any medical condition. The App has not been evaluated or approved by the
            FDA, CE, or any other regulatory body. You must not:
          </p>
          <ul>
            <li>Use HeartBeat as a substitute for professional medical advice or diagnosis</li>
            <li>Rely on HeartBeat readings to make medical decisions</li>
            <li>Use HeartBeat in any clinical or emergency setting</li>
          </ul>
          <p>
            <strong>Always consult a qualified healthcare professional</strong> for accurate heart rate
            monitoring and medical guidance.
          </p>

          <h2>Accuracy Disclaimer</h2>
          <p>
            Heart rate readings may vary based on device model, microphone quality, phone placement,
            ambient noise, clothing, body composition, and individual physiology. HeartBeat makes no
            guarantee of accuracy, completeness, or reliability of any reading.
          </p>

          <h2>User Responsibilities</h2>
          <p>You agree to:</p>
          <ul>
            <li>Use the App only for its intended purpose of estimating heart rate</li>
            <li>Grant microphone access only when you intend to take a measurement</li>
            <li>Not reverse-engineer the App beyond what the open-source license permits</li>
          </ul>

          <h2>Intellectual Property</h2>
          <p>
            HeartBeat is open source and distributed under its respective license. The HeartBeat name,
            logo, and brand assets are the property of Anmol Bhardwaj and may not be used without
            permission outside the scope of the open-source license.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, HeartBeat and its creator shall not be liable for
            any direct, indirect, incidental, special, consequential, or punitive damages arising from
            your use of or inability to use the App, including but not limited to damages for loss of
            health, data, or profits.
          </p>

          <h2>Warranty Disclaimer</h2>
          <p>
            The App is provided <strong>"as is"</strong> and <strong>"as available"</strong> without
            warranties of any kind, whether express or implied, including but not limited to implied
            warranties of merchantability, fitness for a particular purpose, and non-infringement.
          </p>

          <h2>Modifications</h2>
          <p>
            These terms may be updated at any time. Continued use of the App after changes constitutes
            acceptance of the revised terms. Material changes will be communicated via the App or this page.
          </p>

          <h2>Governing Law</h2>
          <p>
            These terms shall be governed by and construed in accordance with applicable laws, without
            regard to conflict of law principles.
          </p>

          <h2>Contact</h2>
          <p>
            For questions about these terms, contact Anmol Bhardwaj
            at <a href="https://anmolbhardwaj.com" target="_blank" rel="noopener noreferrer">anmolbhardwaj.com</a>.
          </p>
        </div>
      </div>
      <Footer />
    </>
  )
}
