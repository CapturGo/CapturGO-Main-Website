import Head from 'next/head';
import Link from 'next/link';

// ===== PRIVACY CONTENT - EASY TO UPDATE =====
const PRIVACY_CONTENT = `
CapturGO Privacy Policy
Last updated: November 28, 2025
Captur Labs Limited ("Captur Labs," "CapturGO," "we," "us," or "our") is building a user-owned mobility and mapping network powered by encrypted movement signals from smartphones.
This Privacy Policy explains how we collect, use, share, and protect information when you use:
the CapturGO mobile applications on iOS and Android (the "App"),


our website (the "Site"), and


our online documentation and other web pages, including GitBook (together with the App and Site, the "Services").


By accessing or using the Services, you agree to the practices described in this Privacy Policy.
If you do not agree, please do not use the Services.


1. Information We Collect
We only collect information needed to operate the CapturGO Network and improve the Services.
1.1 Information You Provide to Us
We may collect the information you choose to provide directly, such as:
Account details – email address, username, referral code, profile image, and password (stored in hashed form).


Wallet information – blockchain wallet address(es), including any abstracted or embedded wallet we create for you to receive rewards. We never collect your private keys or recovery phrases.


Reports and contributions – incident descriptions, traffic or road reports, POI (point of interest) confirmations, text comments, ratings, or other content you submit.


Photos and media – storefront, landmark, or street photos you voluntarily capture in the App for POI verification or incident reporting.


Support communications – messages, attachments, and contact details you send when you contact us (email, in-app support, or social channels).


We do not request or store your passwords to third-party services, secret recovery phrases, or government ID documents.


1.2 Information Collected Automatically
When you use the Services, we automatically collect certain technical and usage information.
(a) Location & Mobility Signals
With your permission, the App may collect precise location data, such as:
GPS coordinates


speed, direction (bearing), and movement patterns


timestamps of trips


road activity signals (e.g., slowdowns, congestion patterns, closures)


Location data may be collected while the app is open and, if you enable it, in the background to support passive contribution and real-time traffic understanding.
(b) Device & Network Data
We may also collect:
device type, operating system, language, and timezone


IP address and app version


nearby cellular towers, Wi-Fi networks, or Bluetooth beacons (identifiers and signal strength)


diagnostic information (crash reports, logs, performance data)


(c) Camera & Media (Android CAMERA Permission / iOS Camera Access)
If you grant permission, the App can access your device camera only when you choose to:
take a photo of a storefront, landmark, or sign to verify a POI; or


attach a photo to an incident or road report.


We do not access your camera in the background or without your action. You can deny camera permission; core movement-based contribution will still function.
(d) Usage & Analytics Data
We collect anonymized or pseudonymized information about:
how often you open the App


which features you use


your CAPT Points earning activity


screens viewed and general session activity


This helps us understand how the network is used and how to improve it.


2. What We Do Not Collect
As part of our "privacy by design" approach, CapturGO is built to avoid unnecessary personal data.
We do not:
collect your phone contacts, SMS content, or personal files


collect or store your secret recovery phrases or private keys


ask for credit card numbers or bank login details inside the App


publicly display your trip history or exact start/end locations


sell your personal data for advertising


If we ever need to collect additional categories of data in the future, we will update this Policy and request any required consent.


3. How We Use Your Information
We may use the information we collect for the following purposes:
Provide and operate the Services


power navigation and mobility features


update maps, POIs, and traffic layers


compute CAPT Points and rewards


Maintain and improve the CapturGO Network


train and refine mobility and traffic models


measure POI freshness and road changes at a hex-cell level


verify and validate contributions by comparing aggregated, anonymous signals


Rewards and blockchain interactions


allocate and update CAPT Points


convert points to digital assets (e.g., $CAPT tokens) when available


send rewards to your wallet, including wallets created via wallet abstraction


Security, integrity, and fraud prevention


detect and prevent spam or fraudulent contribution patterns


protect the network from abuse, cheating, or manipulation


Customer support and communication


respond to your questions and support requests


send important service notices and policy updates


Analytics and product development


understand how different features are used


improve UX, performance, and reliability


Legal and compliance purposes


comply with applicable laws and regulations


enforce our Terms of Use and other agreements


respond to lawful requests from authorities where required


Where required by law (for example, under GDPR), we rely on legal bases such as contractual necessity, legitimate interests, consent, and legal obligation to process your data.


4. How We Protect Your Privacy
CapturGO includes multiple privacy protections by design:
Pseudonymous accounts: contributions are linked to account IDs or wallet addresses, not your real-world identity.


Anonymized movement data: location traces are stripped of direct identifiers and processed at the hex-cell or aggregate level wherever possible.


Start/end-point protection: we avoid using exact starting and ending segments of trips to reduce the chance of exposing sensitive locations (e.g., home or workplace).


Privacy zones: in future versions, you may configure certain areas (like your home) as "privacy zones" where data collection is paused.


On-device and in-transit security: data is encrypted in transit (HTTPS/TLS). Where applicable, we use encryption and access controls for data at rest.


No system is perfectly secure, but we use commercially reasonable safeguards to protect your information.


5. How We Share Information
We do not sell personal information. We may share information in the following limited ways:
Service Providers

 With trusted vendors who perform services on our behalf (e.g., cloud hosting, analytics, messaging, customer support). They are bound by contractual obligations to protect your data and use it only as instructed.


Aggregated & Anonymized Data

 We may share aggregated mobility patterns, traffic information, and POI freshness data with partners (e.g., businesses, cities, mobility researchers). These datasets do not identify individual users.


Blockchain Networks

 When we distribute rewards on-chain, transaction details (such as wallet address and token amount) may be recorded on a public, immutable ledger. Blockchain data is publicly visible but pseudonymous.


Business Transfers

 In connection with a merger, acquisition, financing, or sale of assets, your information may be transferred as part of that transaction, subject to confidentiality obligations.


Legal Requirements and Protection of Rights

 We may disclose information if required by law, court order, or legal process, or if we believe disclosure is necessary to protect our rights, your safety, or the safety of others.


With Your Consent

 We may share information for any other purpose disclosed to you and with your consent.




6. Cookies and Analytics
On the Site and GitBook documentation, we may use cookies, local storage, and similar technologies to:
keep you logged in


remember your preferences


understand how visitors use our pages


improve content and design


We may use third-party analytics providers (such as Google Analytics or similar tools). You can usually control cookies through your browser settings, but disabling them may affect some features.


7. Data Retention
We retain information only for as long as needed for the purposes described in this Policy:
Raw mobility and sensor data – kept for a limited period (for example, up to 90 days) before being aggregated, anonymized, or deleted, unless needed for security or investigation.


Account and rewards data – kept while your account is active and for a reasonable period afterward for record-keeping and legal purposes.


Blockchain records – rewards written to a public blockchain may be permanent and cannot be altered by us.


We may retain de-identified or aggregated data indefinitely.


8. International Transfers
Captur Labs is headquartered in Hong Kong and may process data in multiple countries.
If you access the Services from another region, your information may be transferred to and processed in jurisdictions that may have different data protection laws than your own.
Where required, we use appropriate safeguards (such as standard contractual clauses) for international data transfers.


9. Your Rights and Choices
Depending on your jurisdiction, you may have rights regarding your personal information, including to:
access or obtain a copy of your data;


request correction of inaccurate data;


request deletion of your data (subject to legal retention requirements);


object to or restrict certain processing;


withdraw consent where processing is based on consent;


opt-out of marketing communications.


To exercise these rights, contact us at privacy@capturgo.com.
We may need to verify your identity before processing your request.
You can also control certain permissions directly on your device:
Location services: you can enable, disable, or limit location access (e.g., "While Using the App" vs. "Always"). Disabling precise or background location will reduce or stop contribution-based rewards and certain features.


Camera: you can revoke camera permission at any time. You will still be able to use most movement-based features, but you will not be able to submit photos.




10. Children's Privacy
The Services are not directed to children under the age of 16, and we do not knowingly collect personal information from children.
If we learn that a child under 16 has provided personal data, we will delete it as soon as reasonably possible.


11. Third-Party Links and Services
The Services may link to or integrate with third-party services such as:
map providers


crypto wallets or exchanges


social media platforms


analytics tools or SDKs


These third parties have their own privacy policies and data practices, which we do not control. We encourage you to review them before using those services.


12. Changes to This Privacy Policy
We may update this Privacy Policy from time to time.
If we make material changes, we will notify you by:
updating the "Last Updated" date at the top;


providing in-app or on-site notice; or


sending an email, where appropriate.


Your continued use of the Services after the updated Policy becomes effective means you accept the changes.


13. Contact Us
If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
Captur Labs Limited
Email: privacy@capturgo.com
`;

// Function to convert plain text to JSX with proper formatting
function formatPrivacyContent(content) {
  return content.split('\n').map((line, index) => {
    // Empty lines
    if (line.trim() === '') {
      return <br key={index} />;
    }
    
    // Main title - Reasonable size
    if (line.includes('CapturGO Privacy Policy')) {
      return <h1 key={index} className="text-3xl sm:text-4xl font-bold text-white mb-2">{line}</h1>;
    }
    
    // Last updated
    if (line.includes('Last updated:')) {
      return <p key={index} className="text-gray-400 text-sm mb-4">{line}</p>;
    }
    
    // Main section headers (numbered like "1. ", "2. ") - Moderate size
    if (/^\d+\.\s/.test(line.trim()) && !/^\d+\.\d+/.test(line.trim())) {
      return <h2 key={index} className="text-2xl font-bold text-white mt-6 mb-2 border-b border-gray-700 pb-1">{line}</h2>;
    }
    
    // Subsection headers (numbered with decimal like "1.1", "1.2") - Smaller
    if (/^\d+\.\d+/.test(line.trim())) {
      return <h3 key={index} className="text-xl font-semibold text-white mt-4 mb-1">{line}</h3>;
    }
    
    // Subsection headers with letters like "(a)", "(b)"
    if (/^\([a-z]\)/.test(line.trim())) {
      return <h4 key={index} className="text-lg font-semibold text-white mt-3 mb-1">{line}</h4>;
    }
    
    // Contact email - Make it stand out
    if (line.includes('privacy@capturgo.com')) {
      return (
        <p key={index} className="text-gray-300 mb-2">
          {line.replace('privacy@capturgo.com', '')}
          <a href="mailto:privacy@capturgo.com" className="text-[#935EFF] hover:text-[#7B4FE6] font-semibold text-lg transition-colors">
            privacy@capturgo.com
          </a>
        </p>
      );
    }
    
    // Important intro paragraphs - Slightly emphasized
    if (line.includes('This Privacy Policy explains') || line.includes('By accessing or using') || line.includes('If you do not agree')) {
      return <p key={index} className="text-gray-200 mb-2 font-medium">{line}</p>;
    }
    
    // Regular paragraphs
    return <p key={index} className="text-gray-300 mb-2">{line}</p>;
  });
}

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
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-8 sm:p-12">
              <div className="prose prose-invert prose-lg max-w-none">
                {formatPrivacyContent(PRIVACY_CONTENT)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
