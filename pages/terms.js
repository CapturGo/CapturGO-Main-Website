import Head from 'next/head';
import Link from 'next/link';

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms and Conditions - capturGO | Captur Network User Agreement & Service Terms</title>
        <meta name="description" content="capturGO Terms and Conditions by Captur Labs Limited. User agreement for our decentralized GPS navigation app, DePIN rewards system, and location data sharing platform. Legal terms of service." />
        <meta name="keywords" content="capturGO terms, Captur terms of service, GPS app terms, decentralized navigation terms, DePIN terms, blockchain app agreement, user agreement, service terms, legal terms" />
        
        <link rel="canonical" href="https://capturgo.com/terms" />
        
        <meta property="og:title" content="Terms and Conditions - capturGO | Captur Network User Agreement" />
        <meta property="og:description" content="capturGO Terms and Conditions by Captur Labs Limited. User agreement for our decentralized GPS navigation app and DePIN rewards system." />
        <meta property="og:url" content="https://capturgo.com/terms" />
        <meta property="og:type" content="article" />
        
        <meta name="twitter:title" content="Terms and Conditions - capturGO | Captur Network User Agreement" />
        <meta name="twitter:description" content="capturGO Terms and Conditions by Captur Labs Limited. User agreement for our decentralized GPS navigation app and DePIN rewards system." />
        
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
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-8">Terms and Conditions</h1>
              
              <div className="prose prose-invert prose-lg max-w-none">
                <p className="text-gray-300 text-lg mb-8">
                  These Terms and Conditions ("Terms") govern your use of the capturGO mobile application and related services (collectively, the "Services") operated by Captur Labs Limited ("Captur," "we," "us," or "our"). By accessing or using our Services, you agree to be bound by these Terms.
                </p>

                <h2 className="text-2xl font-bold text-white mt-12 mb-6">1. Acceptance of Terms</h2>
                <p className="text-gray-300 mb-6">
                  By downloading, installing, accessing, or using the capturGO application, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you may not use our Services.
                </p>

                <h2 className="text-2xl font-bold text-white mt-12 mb-6">2. Eligibility</h2>
                <p className="text-gray-300 mb-6">
                  You must be at least 18 years old to use our Services. By using the Services, you represent and warrant that you are at least 18 years old and have the legal capacity to enter into these Terms. If you are under 18, you may only use the Services with the involvement and consent of a parent or guardian.
                </p>

                <h2 className="text-2xl font-bold text-white mt-12 mb-6">3. Description of Services</h2>
                <p className="text-gray-300 mb-4">capturGO is a decentralized navigation and mobility platform that provides:</p>
                <ul className="text-gray-300 space-y-2 mb-6">
                  <li>Real-time navigation and traffic information</li>
                  <li>Community-driven incident reporting</li>
                  <li>Reward system for data contributions</li>
                  <li>Anonymized location data sharing for urban planning</li>
                  <li>DePIN (Decentralized Physical Infrastructure Network) functionality</li>
                </ul>

                <h2 className="text-2xl font-bold text-white mt-12 mb-6">4. User Account and Registration</h2>
                <p className="text-gray-300 mb-4">To access certain features of the Services, you may need to create an account. You agree to:</p>
                <ul className="text-gray-300 space-y-2 mb-6">
                  <li>Provide accurate, current, and complete information during registration</li>
                  <li>Maintain and update your account information</li>
                  <li>Keep your account credentials secure and confidential</li>
                  <li>Notify us immediately of any unauthorized use of your account</li>
                  <li>Accept responsibility for all activities under your account</li>
                </ul>

                <h2 className="text-2xl font-bold text-white mt-12 mb-6">5. User Conduct and Responsibilities</h2>
                <p className="text-gray-300 mb-4">When using our Services, you agree not to:</p>
                <ul className="text-gray-300 space-y-2 mb-6">
                  <li>Violate any applicable laws, regulations, or third-party rights</li>
                  <li>Submit false, misleading, or fraudulent information</li>
                  <li>Interfere with or disrupt the Services or servers</li>
                  <li>Attempt to gain unauthorized access to any part of the Services</li>
                  <li>Use the Services for any commercial purpose without our consent</li>
                  <li>Harass, abuse, or harm other users</li>
                  <li>Upload or transmit malicious code, viruses, or harmful content</li>
                  <li>Reverse engineer, decompile, or disassemble the application</li>
                </ul>

                <h2 className="text-2xl font-bold text-white mt-12 mb-6">6. Location Data and Privacy</h2>
                <p className="text-gray-300 mb-6">
                  Our Services rely on location data to function properly. By using the Services, you consent to the collection, processing, and use of your location data as described in our Privacy Policy. You may disable location services at any time through your device settings, but this may limit the functionality of the Services.
                </p>

                <h2 className="text-2xl font-bold text-white mt-12 mb-6">7. Rewards and Tokens</h2>
                <p className="text-gray-300 mb-4">capturGO may offer rewards, points, or tokens for user contributions. You understand that:</p>
                <ul className="text-gray-300 space-y-2 mb-6">
                  <li>Rewards are subject to our discretion and may change without notice</li>
                  <li>Tokens may have no monetary value and are not securities</li>
                  <li>We reserve the right to modify or discontinue the reward system</li>
                  <li>Fraudulent activity may result in forfeiture of rewards</li>
                  <li>Tax obligations related to rewards are your responsibility</li>
                </ul>

                <h2 className="text-2xl font-bold text-white mt-12 mb-6">8. Intellectual Property Rights</h2>
                <p className="text-gray-300 mb-6">
                  The Services, including all content, features, and functionality, are owned by Captur Labs Limited and are protected by copyright, trademark, and other intellectual property laws. You are granted a limited, non-exclusive, non-transferable license to use the Services for personal, non-commercial purposes.
                </p>

                <h2 className="text-2xl font-bold text-white mt-12 mb-6">9. User-Generated Content</h2>
                <p className="text-gray-300 mb-4">By submitting content to the Services (including reports, photos, comments), you:</p>
                <ul className="text-gray-300 space-y-2 mb-6">
                  <li>Grant us a worldwide, royalty-free license to use, modify, and distribute your content</li>
                  <li>Represent that you own or have permission to use the content</li>
                  <li>Agree that your content does not violate any laws or third-party rights</li>
                  <li>Understand that we may remove content at our discretion</li>
                </ul>

                <h2 className="text-2xl font-bold text-white mt-12 mb-6">10. Third-Party Services</h2>
                <p className="text-gray-300 mb-6">
                  Our Services may integrate with third-party services, including mapping providers, blockchain networks, and payment processors. We are not responsible for the availability, accuracy, or content of third-party services. Your use of third-party services is subject to their respective terms and conditions.
                </p>

                <h2 className="text-2xl font-bold text-white mt-12 mb-6">11. Disclaimers and Limitations</h2>
                <p className="text-gray-300 mb-4">THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND. WE DISCLAIM ALL WARRANTIES, INCLUDING:</p>
                <ul className="text-gray-300 space-y-2 mb-6">
                  <li>Accuracy, completeness, or reliability of navigation information</li>
                  <li>Uninterrupted or error-free operation</li>
                  <li>Security of data transmission</li>
                  <li>Fitness for a particular purpose</li>
                </ul>
                <p className="text-gray-300 mb-6">
                  <strong className="text-white">IMPORTANT:</strong> Navigation information is for reference only. Always follow traffic laws and use your judgment when driving. We are not liable for accidents, injuries, or damages resulting from use of our Services.
                </p>

                <h2 className="text-2xl font-bold text-white mt-12 mb-6">12. Limitation of Liability</h2>
                <p className="text-gray-300 mb-6">
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, CAPTUR LABS LIMITED SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR USE, ARISING FROM YOUR USE OF THE SERVICES, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
                </p>

                <h2 className="text-2xl font-bold text-white mt-12 mb-6">13. Indemnification</h2>
                <p className="text-gray-300 mb-6">
                  You agree to indemnify, defend, and hold harmless Captur Labs Limited and its officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from your use of the Services, violation of these Terms, or infringement of any third-party rights.
                </p>

                <h2 className="text-2xl font-bold text-white mt-12 mb-6">14. Termination</h2>
                <p className="text-gray-300 mb-6">
                  We may suspend or terminate your access to the Services at any time, with or without cause or notice. You may also terminate your account by contacting us. Upon termination, your right to use the Services will cease immediately, and we may delete your account and data.
                </p>

                <h2 className="text-2xl font-bold text-white mt-12 mb-6">15. Governing Law and Dispute Resolution</h2>
                <p className="text-gray-300 mb-6">
                  These Terms are governed by the laws of the jurisdiction where Captur Labs Limited is incorporated. Any disputes arising from these Terms or the Services shall be resolved through binding arbitration, except where prohibited by law.
                </p>

                <h2 className="text-2xl font-bold text-white mt-12 mb-6">16. Changes to Terms</h2>
                <p className="text-gray-300 mb-6">
                  We reserve the right to modify these Terms at any time. We will notify users of material changes through the app or by email. Your continued use of the Services after changes take effect constitutes acceptance of the new Terms.
                </p>

                <h2 className="text-2xl font-bold text-white mt-12 mb-6">17. Severability</h2>
                <p className="text-gray-300 mb-6">
                  If any provision of these Terms is found to be unenforceable, the remaining provisions will continue in full force and effect.
                </p>

                <h2 className="text-2xl font-bold text-white mt-12 mb-6">18. Contact Information</h2>
                <p className="text-gray-300 mb-6">
                  If you have questions about these Terms, please contact us at:
                </p>
                <div className="text-gray-300 mb-6">
                  <p><strong className="text-white">Captur Labs Limited</strong></p>
                  <p><strong className="text-white">Email:</strong> <a href="mailto:legal@capturGO.com" className="text-[#935EFF] hover:text-[#7B4FE6] transition-colors">legal@capturGO.com</a></p>
                  <p><strong className="text-white">Support:</strong> <a href="mailto:support@capturGO.com" className="text-[#935EFF] hover:text-[#7B4FE6] transition-colors">support@capturGO.com</a></p>
                </div>

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
