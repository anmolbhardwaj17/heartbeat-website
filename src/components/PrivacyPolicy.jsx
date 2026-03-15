import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import LegalNav from './LegalNav'
import Footer from './Footer'
import './LegalPage.css'

export default function PrivacyPolicy() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <>
      <LegalNav />
      <div className="legal-page">
        <div className="legal-header">
          <span className="legal-label">LEGAL</span>
          <h1 className="legal-title">Privacy Policy</h1>
          <span className="legal-updated">Last updated: March 15, 2026</span>
        </div>

        <div className="legal-content">
          <h2>Overview</h2>
          <p>
            HeartBeat is designed with a <strong>privacy-first architecture</strong>. The app processes
            audio data entirely on your device and does not collect, transmit, or store any personal
            information on external servers. This policy explains what data the app accesses, how it
            is used, and your rights.
          </p>

          <h2>Data We Access</h2>
          <p>
            HeartBeat accesses your device's <strong>microphone</strong> to capture audio for heart rate
            analysis. This is the only hardware permission the app requires. The audio data is:
          </p>
          <ul>
            <li>Processed in real time using on-device digital signal processing</li>
            <li>Never recorded, saved as audio files, or transmitted to any server</li>
            <li>Discarded immediately after each analysis frame</li>
          </ul>

          <h2>Data We Store</h2>
          <p>
            Heart rate readings (BPM, timestamp, confidence score) are saved <strong>locally on your
            device</strong> to provide session history. This data:
          </p>
          <ul>
            <li>Never leaves your device</li>
            <li>Is not backed up to any cloud service by the app</li>
            <li>Can be deleted at any time from within the app</li>
          </ul>

          <h2>Data We Do Not Collect</h2>
          <p>HeartBeat does <strong>not</strong> collect:</p>
          <ul>
            <li>Personal information (name, email, phone number, etc.)</li>
            <li>Device identifiers or advertising IDs</li>
            <li>Location data</li>
            <li>Usage analytics or telemetry</li>
            <li>Crash reports (unless you explicitly opt in via your OS)</li>
          </ul>

          <h2>Third-Party Services</h2>
          <p>
            HeartBeat does not integrate any third-party SDKs, analytics tools, advertising networks,
            or tracking services. The app makes <strong>zero network calls</strong>.
          </p>

          <h2>Open Source</h2>
          <p>
            HeartBeat is open source. You can inspect the complete source code to verify these privacy
            claims at <a href="https://github.com/anmolbhardwaj17/heartbeat-website" target="_blank" rel="noopener noreferrer">github.com/anmolbhardwaj17/heartbeat-website</a>.
          </p>

          <h2>Children's Privacy</h2>
          <p>
            HeartBeat does not knowingly collect any data from children under 13. Since the app
            collects no personal data at all, it is inherently compliant with COPPA and similar
            regulations.
          </p>

          <h2>Changes to This Policy</h2>
          <p>
            If this policy is updated, the changes will be reflected on this page with an updated
            date. Since HeartBeat collects no data, material changes are unlikely.
          </p>

          <h2>Contact</h2>
          <p>
            For questions about this privacy policy, contact Anmol Bhardwaj
            at <a href="https://anmolbhardwaj.com" target="_blank" rel="noopener noreferrer">anmolbhardwaj.com</a>.
          </p>
        </div>
      </div>
      <Footer />
    </>
  )
}
