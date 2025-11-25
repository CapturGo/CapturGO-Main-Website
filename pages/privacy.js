import Head from 'next/head';
import Link from 'next/link';

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy - capturGO | Data Protection & Privacy Rights</title>
        <meta name="description" content="capturGO Privacy Policy by Captur Labs Limited. Learn how we protect your location data, ensure privacy in our decentralized GPS app, and handle your personal information securely. GDPR compliant." />
        <meta name="keywords" content="capturGO privacy policy, Captur privacy, location data privacy, GPS app privacy, decentralized navigation privacy, DePIN privacy, blockchain privacy, data protection, GDPR compliance" />
        
        <link rel="canonical" href="https://capturgo.com/privacy" />
        
        <meta property="og:title" content="Privacy Policy - capturGO | Data Protection" />
        <meta property="og:description" content="capturGO Privacy Policy by Captur Labs Limited. Learn how we protect your location data and ensure privacy in our decentralized GPS navigation app." />
        <meta property="og:url" content="https://capturgo.com/privacy" />
        <meta property="og:type" content="article" />
        
        <meta name="twitter:title" content="Privacy Policy - capturGO | Data Protection" />
        <meta name="twitter:description" content="capturGO Privacy Policy by Captur Labs Limited. Learn how we protect your location data and ensure privacy in our decentralized GPS navigation app." />
        
        <meta name="robots" content="index, follow" />
      </Head>

      <div className="min-h-screen bg-black">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="hover:opacity-80 transition-opacity">
                <img 
                  src="/images/logo.svg" 
                  alt="capturGO Logo" 
                  width={180} 
                  height={60}
                  className="h-12"
                />
              </Link>
              <Link 
                href="/"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </nav>

        {/* Content */}
        <div className="pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-8 sm:p-12">
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-8">Privacy Policy</h1>
              
              <div className="prose prose-invert prose-lg max-w-none">
                <p className="text-gray-300 text-lg mb-8">
                  Captur Labs Limited. ("Captur," "we," "us," or "our") respects your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use the Captur Go mobile application and related services (collectively, the "Services"). By using our Services, you consent to the practices described below.
                </p>

                <h2 className="text-2xl font-bold text-white mt-12 mb-6">1. Information We Collect</h2>
                
                <h3 className="text-xl font-semibold text-white mt-8 mb-4">1.1 Information You Provide Actively</h3>
                <ul className="text-gray-300 space-y-2 mb-6">
                  <li><strong className="text-white">Account Details.</strong> Email address, username, wallet address, or referral code if you create an account or link a blockchain wallet.</li>
                  <li><strong className="text-white">User Reports.</strong> Incident descriptions, photographs, voice notes, text comments, or other content you submit manually.</li>
                  <li><strong className="text-white">Support Inquiries.</strong> Messages, attachments, or contact details you send to our support channels.</li>
                </ul>

                <h3 className="text-xl font-semibold text-white mt-8 mb-4">1.2 Information Collected Automatically</h3>
                <ul className="text-gray-300 space-y-2 mb-6">
                  <li><strong className="text-white">Location Data.</strong> Precise GPS coordinates, movement speed, bearing, altitude, and timestamps while the App is running (foreground or background).</li>
                  <li><strong className="text-white">Device Signals.</strong> Cellular tower IDs, Wi‑Fi SSIDs/BSSIDs, Bluetooth beacons, and signal strength metadata.</li>
                  <li><strong className="text-white">Sensor Data.</strong> Accelerometer, gyroscope, magnetometer, and barometer readings to detect driving context and road conditions.</li>
                  <li><strong className="text-white">Usage Data.</strong> Log files, crash reports, in‑app interactions, and reward transaction history.</li>
                  <li><strong className="text-white">Device Information.</strong> OS version, device model, advertising identifiers, language, and time‑zone.</li>
                </ul>
                <p className="text-gray-300 mb-6">
                  We collect only the minimum sensor readings required for navigation intelligence and pseudonymize or aggregate data at the edge whenever feasible.
                </p>

                <h2 className="text-2xl font-bold text-white mt-12 mb-6">2. How We Use Your Information</h2>
                <ul className="text-gray-300 space-y-2 mb-6">
                  <li><strong className="text-white">Navigation & Routing.</strong> Generate real‑time directions, traffic congestion maps, and incident alerts.</li>
                  <li><strong className="text-white">Network Intelligence.</strong> Train AI models to infer road speed, signal coverage, and environmental patterns for DePIN analytics.</li>
                  <li><strong className="text-white">Rewards & Gamification.</strong> Calculate contribution scores, distribute points/tokens, and prevent fraud.</li>
                  <li><strong className="text-white">Service Improvement.</strong> Diagnose crashes, optimize performance, and enhance user experience.</li>
                  <li><strong className="text-white">Research & Insights.</strong> Produce anonymized trend reports for municipalities, advertisers, or mobility partners.</li>
                  <li><strong className="text-white">Legal Compliance.</strong> Detect misuse, enforce Terms & Conditions, and satisfy regulatory obligations.</li>
                </ul>

                <h2 className="text-2xl font-bold text-white mt-12 mb-6">3. Legal Bases for Processing (EEA & UK)</h2>
                <p className="text-gray-300 mb-4">Where GDPR applies, we rely on:</p>
                <ul className="text-gray-300 space-y-2 mb-6">
                  <li>Contractual Necessity (to provide the Services);</li>
                  <li>Legitimate Interests (network optimization, research, fraud prevention);</li>
                  <li>Consent (push notifications, marketing emails, precise background location for passive contribution where required);</li>
                  <li>Legal Obligation (tax, accounting, law‑enforcement requests).</li>
                </ul>

                <h2 className="text-2xl font-bold text-white mt-12 mb-6">4. How We Share Information</h2>
                <p className="text-gray-300 mb-4">We keep sharing simple, purpose‑driven, and tightly controlled:</p>
                <ul className="text-gray-300 space-y-2 mb-6">
                  <li><strong className="text-white">Essential Service Providers.</strong> Trusted cloud, security, and analytics vendors that operate our core infrastructure under strict data‑processing agreements.</li>
                  <li><strong className="text-white">Aggregated Insight Partners.</strong> City planners, advertisers, and mobility platforms receive only fully anonymized and aggregated statistics—never raw or identifiable data.</li>
                  <li><strong className="text-white">Public Blockchain Records.</strong> When you earn token rewards, the on‑chain transaction records only your pseudonymous wallet address and token amount.</li>
                  <li><strong className="text-white">Legal or Compliance Disclosures.</strong> Courts or regulators may receive specific data when legally required; we push back on over‑broad requests.</li>
                  <li><strong className="text-white">Corporate Events.</strong> In a merger, acquisition, or financing, limited data may be shared under confidentiality agreements.</li>
                </ul>
                <p className="text-gray-300 mb-6">
                  We never sell personal information for direct marketing.
                </p>

                <h2 className="text-2xl font-bold text-white mt-12 mb-6">5. Data Retention</h2>
                <ul className="text-gray-300 space-y-2 mb-6">
                  <li>Raw location and sensor logs are rotated or aggregated within 90 days unless extended for fraud investigations.</li>
                  <li>Reward transaction data stored on decentralized ledgers may be immutable and retained indefinitely.</li>
                  <li>Account information persists until you request deletion or after 24 months of inactivity.</li>
                </ul>

                <h2 className="text-2xl font-bold text-white mt-12 mb-6">6. International Transfers</h2>
                <p className="text-gray-300 mb-6">
                  Captur's servers are located in the United States. We may transfer data to countries that may not offer the same level of protection as your jurisdiction. Where required, we implement Standard Contractual Clauses or equivalent safeguards.
                </p>

                <h2 className="text-2xl font-bold text-white mt-12 mb-6">7. Security</h2>
                <p className="text-gray-300 mb-6">
                  We employ AES‑256 encryption at rest, TLS 1.3 in transit, strict access controls, and on‑device data minimization. No method of transmission is 100% secure; therefore, we cannot guarantee absolute security.
                </p>

                <h2 className="text-2xl font-bold text-white mt-12 mb-6">8. Your Choices & Rights</h2>
                <ul className="text-gray-300 space-y-2 mb-6">
                  <li><strong className="text-white">Location Permissions.</strong> You can disable precise or background location in your OS settings (may limit functionality and Rewards).</li>
                  <li><strong className="text-white">Opt‑Out of Marketing.</strong> Unsubscribe links in emails or in‑app settings.</li>
                  <li><strong className="text-white">Access & Deletion.</strong> Request a copy or deletion of your personal data via privacy@capturnetwork.xyz.</li>
                  <li><strong className="text-white">Corrections & Portability.</strong> Amend inaccurate data or request export in a structured, machine‑readable format.</li>
                  <li><strong className="text-white">Withdraw Consent.</strong> Where processing is based on consent, you may withdraw at any time.</li>
                </ul>
                <p className="text-gray-300 mb-6">
                  Residents of California, EEA, UK, Brazil, and other regions may have additional rights which we honor.
                </p>

                <h2 className="text-2xl font-bold text-white mt-12 mb-6">9. Children's Privacy</h2>
                <p className="text-gray-300 mb-6">
                  The Services are not directed to children under 16. We do not knowingly collect personal data from minors. If we learn that a child has provided us with information, we will delete it promptly.
                </p>

                <h2 className="text-2xl font-bold text-white mt-12 mb-6">10. Third‑Party Links & Services</h2>
                <p className="text-gray-300 mb-6">
                  The App may integrate maps, ads, or blockchain wallets governed by separate privacy policies. Captur is not responsible for third‑party data practices.
                </p>

                <h2 className="text-2xl font-bold text-white mt-12 mb-6">11. Changes to This Policy</h2>
                <p className="text-gray-300 mb-6">
                  We may update this Policy periodically. We will notify users of material changes via in‑app notice or email. Continued use of the Services after changes take effect constitutes acceptance.
                </p>

                <h2 className="text-2xl font-bold text-white mt-12 mb-6">12. Contact Us</h2>
                <p className="text-gray-300 mb-6">
                  If you have questions or concerns about this Policy or our data practices, please contact our Data Protection Officer at:
                </p>
                <p className="text-gray-300 mb-6">
                  <strong className="text-white">Email:</strong> <a href="mailto:privacy@capturGO.com" className="text-[#935EFF] hover:text-[#7B4FE6] transition-colors">privacy@capturGO.com</a>
                </p>

                <div className="mt-12 pt-8 border-t border-gray-700">
                  <p className="text-gray-400 text-sm">
                    Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
