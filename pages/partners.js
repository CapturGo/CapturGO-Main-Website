import Head from 'next/head';
import { useState } from 'react';
import emailjs from '@emailjs/browser';

export default function Partners() {
  const [showMore, setShowMore] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    inquiry: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate captcha and privacy policy
    if (!captchaVerified) {
      setSubmitStatus('captcha-error');
      return;
    }
    
    if (!privacyAccepted) {
      setSubmitStatus('privacy-error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // EmailJS configuration with actual values
      const result = await emailjs.send(
        'service_91kvgdw', // Your EmailJS service ID
        'template_7kjbyjb', // Your EmailJS template ID
        {
          from_name: `${formData.firstName} ${formData.lastName}`,
          from_email: formData.email,
          company: formData.company,
          inquiry_type: formData.inquiry,
          message: formData.message,
          to_email: 'sai@capturgo.com' // Your receiving email
        },
        'INO2oEZYWRwoIbVwV' // Your EmailJS public key
      );

      console.log('Email sent successfully:', result);
      setSubmitStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        inquiry: '',
        message: ''
      });
      setCaptchaVerified(false);
      setPrivacyAccepted(false);
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  // Partners data
  const partnerCategories = [
    {
      id: 1,
      title: 'Mapping & Data Partners',
      description: 'Our mapping partners provide the core geolocation, routing, and mobility data that enhance CapturGO\'s accuracy and global coverage. Together, we deliver real-time movement insights and high-precision map intelligence.',
      examples: 'HERE Technologies, Mapbox, OpenStreetMap',
      icon: '🗺️'
    },
    {
      id: 2,
      title: 'Ecosystem Partners',
      description: 'Our blockchain and infrastructure partners support CapturGO\'s decentralized architecture, enabling secure rewards, data validation, and scalable global deployment.',
      examples: 'Solana, IoTeX, Arbitrum',
      icon: '⛓️'
    },
    {
      id: 3,
      title: 'Technology & Media Partners',
      description: 'We collaborate with leading technology and media providers to extend CapturGO\'s capabilities across hardware, DePIN networks, and out-of-home advertising. These partnerships bring real-world insights back into the digital world and unlock new commercial opportunities.',
      examples: 'Coming Soon...',
      icon: '🚀'
    }
  ];

  // Data use cases
  const useCases = [
    {
      id: 1,
      title: 'Urban Planning & Infrastructure',
      description: 'Leverage real-time traffic flow, air quality, and population data to design smarter urban spaces and guide infrastructure development.',
      icon: '🏙️'
    },
    {
      id: 2,
      title: 'Navigation & Mapping',
      description: 'Enhance navigation systems with precise geolocation and traffic data for better route planning and autonomous vehicle management.',
      icon: '🗺️'
    },
    {
      id: 3,
      title: 'Logistics & Supply Chain',
      description: 'Optimize operations with real-time tracking and environmental data to monitor shipments and predict delivery times with unmatched accuracy.',
      icon: '📦'
    },
    {
      id: 4,
      title: 'Environmental Monitoring & Research',
      description: 'Access detailed data on air quality, weather, and more to support research and ensure regulatory compliance.',
      icon: '🌱'
    },
    {
      id: 5,
      title: 'Advertising & Marketing',
      description: 'Target campaigns with precise traffic and demographic data to maximize the impact of digital billboards and location-based marketing.',
      icon: '📊'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-black relative overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-10 z-0"
      >
        <source src="/videos/Traffic.mp4" type="video/mp4" />
      </video>
      
      {/* Content Overlay */}
      <div className="relative z-10">
      
      <Head>
        <title>Partners - CapturGO | Strategic Partnerships &amp; Collaborations</title>
        <meta name="description" content="Discover CapturGO's strategic partners and collaborations driving innovation in decentralized location intelligence and blockchain technology." />
        <meta name="keywords" content="CapturGO partners, blockchain partnerships, technology collaborations, automotive partners, DePIN ecosystem" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Partners - CapturGO" />
        <meta property="og:description" content="Strategic partnerships driving innovation in decentralized location intelligence" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="capturGO" />
        <meta property="og:image" content="/images/socialcard.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="CapturGO Partners - Strategic Partnerships &amp; Collaborations" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Partners - CapturGO" />
        <meta name="twitter:description" content="Strategic partnerships driving innovation in decentralized location intelligence" />
        <meta name="twitter:image" content="/images/socialcard.png" />
        <meta name="twitter:image:alt" content="CapturGO Partners - Strategic Partnerships &amp; Collaborations" />
      </Head>

      {/* Hero Section */}
      <section className="pt-24 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="animate-fade-in-up">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold text-white mb-2 leading-tight animate-fade-in-up animation-delay-200">
                Partner with us to build
              </h1>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-8 leading-tight animate-fade-in-up animation-delay-400">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">the world's first people powered geolocation network</span>
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed animate-fade-in-up animation-delay-600">
                We collaborate with technology leaders, mobility companies, AI labs, smart-city agencies, and location-driven businesses to deliver the freshest geospatial data on the market.
              </p>
            </div>
            
            {/* Right Content - Video with Overlay */}
            <div className="flex justify-center lg:justify-end animate-fade-in-right animation-delay-800">
              <div className="w-full max-w-lg h-80 rounded-xl overflow-hidden relative transform hover:scale-105 transition-transform duration-500">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src="/videos/CarsMoving.mp4" type="video/mp4" />
                </video>
                {/* Overlay Image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <img 
                    src="/images/overlayvideo.png" 
                    alt="Overlay" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {/* Mapping & Geospatial Partners */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-dashed border-purple-500 p-6 hover:border-purple-400 transition-all duration-300 transform md:translate-y-0 flex flex-col min-h-96 animate-fade-in-up animation-delay-200 hover:scale-105">
              <img 
                src="/images/Profile_Logo_Transparent.png" 
                alt="Partner Logo" 
                className="w-12 h-12 rounded-lg mb-6 object-contain"
              />
              <h3 className="text-xl font-semibold text-purple-400 mb-3">Mapping & Geospatial Partners</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-6 flex-grow">
                HERE Technologies enhances CapturGO's real-time mobility layer with high-precision geospatial infrastructure. Together, we combine community-driven signals with enterprise-grade map intelligence.
              </p>
              <div className="flex justify-center mt-auto">
                <img 
                  src="/images/HERE_Logo_color_XXL_104px.png" 
                  alt="HERE Technologies Logo" 
                  className="h-32 object-contain"
                />
              </div>
            </div>

            {/* Blockchain Infrastructure Partners */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-dashed border-purple-500 p-6 hover:border-purple-400 transition-all duration-300 transform md:translate-y-12 flex flex-col min-h-96 animate-fade-in-up animation-delay-400 hover:scale-105">
              <img 
                src="/images/Profile_Logo_Transparent.png" 
                alt="Partner Logo" 
                className="w-12 h-12 rounded-lg mb-6 object-contain"
              />
              <h3 className="text-xl font-semibold text-purple-400 mb-3">Blockchain Infra Partners</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-6 flex-grow">
                capturGO is integrating with next-generation blockchain networks to power rewards, wallet abstraction, and trustless data exchange. Our blockchain partners will help us deliver fast, low-cost, and user-friendly infrastructure for millions of contributors worldwide.
              </p>
              <div className="flex justify-center mt-auto">
                <svg className="h-32 w-auto text-gray-500" viewBox="0 0 200 80" fill="currentColor">
                  <text x="100" y="40" textAnchor="middle" dominantBaseline="middle" className="text-xl font-semibold">
                    TBA 
                  </text>
                </svg>
              </div>
            </div>

            {/* Technology & Data Innovation Partners */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-dashed border-purple-500 p-6 hover:border-purple-400 transition-all duration-300 transform md:translate-y-24 flex flex-col min-h-96 animate-fade-in-up animation-delay-600 hover:scale-105">
              <img 
                src="/images/Profile_Logo_Transparent.png" 
                alt="Partner Logo" 
                className="w-12 h-12 rounded-lg mb-6 object-contain"
              />
              <h3 className="text-xl font-semibold text-purple-400 mb-3">Tech & Data Innovation Partners</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-6 flex-grow">
                Our technology partners accelerate CapturGO's real-time data engine with advanced software and AI systems. Together, we blend community-powered mobility signals with cutting-edge tools that enhance speed, reliability, and actionable insights across our entire network.
              </p>
              <div className="flex justify-center mt-auto">
                <svg className="h-32 w-auto text-gray-500" viewBox="0 0 200 80" fill="currentColor">
                  <text x="100" y="40" textAnchor="middle" dominantBaseline="middle" className="text-xl font-semibold">
                    COMING SOON
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider Line */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <hr className="border-t border-white/20" />
      </div>

      {/* Industries Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12 animate-fade-in-up">
            Industries we work with
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Logistics & Delivery */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-6 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="w-full h-48 rounded-lg mb-6 overflow-hidden">
                <img src="/images/logistics.png" alt="Logistics & Delivery" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Logistics & Delivery</h3>
              <p className="text-gray-300 leading-relaxed">
                Real-time mobility flows and road activity insights help optimize routing, reduce delays, improve ETAs, and enhance overall delivery efficiency.
              </p>
            </div>

            {/* Ridesharing & Mobility Services */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-6 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="w-full h-48 rounded-lg mb-6 overflow-hidden">
                <img src="/images/ridesharing.png" alt="Ridesharing & Mobility Services" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Ridesharing & Mobility Services</h3>
              <p className="text-gray-300 leading-relaxed">
                Traffic conditions, congestion patterns, and POI freshness enable accurate matching, efficient routing, and improved mobility network performance.
              </p>
            </div>

            {/* Navigation & Mapping Apps */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-6 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="w-full h-48 rounded-lg mb-6 overflow-hidden">
                <img src="/images/navigation.png" alt="Navigation & Mapping Apps" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Navigation & Mapping Apps</h3>
              <p className="text-gray-300 leading-relaxed">
                Fresh map updates, verified POIs, and movement patterns deliver more accurate routing, better map freshness, and enhanced user navigation experiences.
              </p>
            </div>

            {/* Location Intelligence Providers */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-6 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="w-full h-48 rounded-lg mb-6 overflow-hidden">
                <img src="/images/location_intel.png" alt="Location Intelligence Providers" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Location Intelligence Providers</h3>
              <p className="text-gray-300 leading-relaxed">
                Crowdsourced mobility trends, footfall behavior, and POI validation power advanced analytics, enterprise dashboards, and data-driven insights.
              </p>
            </div>

            {/* Retail & Consumer Brands */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-6 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="w-full h-48 rounded-lg mb-6 overflow-hidden">
                <img src="/images/retail.png" alt="Retail & Consumer Brands" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Retail & Consumer Brands</h3>
              <p className="text-gray-300 leading-relaxed">
                Foot traffic heatmaps and area activity trends support store planning, campaign targeting, market assessments, and consumer behavior analysis.
              </p>
            </div>

            {/* Real Estate & Property Tech */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-6 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="w-full h-48 rounded-lg mb-6 overflow-hidden">
                <img src="/images/real_estate.png" alt="Real Estate & Property Tech" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Real Estate & Property Tech</h3>
              <p className="text-gray-300 leading-relaxed">
                Movement density, POI accuracy, and neighborhood activity indicators drive smarter site evaluation, investment modeling, and property insights.
              </p>
            </div>

            {/* Additional Industries - Show/Hide */}
            {showMore && (
              <>
                {/* Travel & Tourism Platforms */}
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-6 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  <div className="w-full h-48 rounded-lg mb-6 overflow-hidden">
                    <img src="/images/travel.png" alt="Travel & Tourism Platforms" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">Travel & Tourism Platforms</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Real-time location insights, crowd density data, and POI freshness help travel platforms optimize recommendations, predict demand, and enhance user experiences.
                  </p>
                </div>

                {/* Advertising & OOH */}
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-6 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  <div className="w-full h-48 rounded-lg mb-6 overflow-hidden">
                    <img src="/images/ads.png" alt="Advertising & OOH" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">Advertising & OOH</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Foot traffic patterns, demographic insights, and real-time activity data enable precise ad targeting, campaign optimization, and ROI measurement.
                  </p>
                </div>

                {/* Smart Cities & Government */}
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-6 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  <div className="w-full h-48 rounded-lg mb-6 overflow-hidden">
                    <img src="/images/smartcities.png" alt="Smart Cities & Government" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">Smart Cities & Government</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Traffic flow analysis, infrastructure usage patterns, and citizen mobility insights support urban planning, policy decisions, and smart city initiatives.
                  </p>
                </div>

                {/* EV Charging Networks */}
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-6 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  <div className="w-full h-48 rounded-lg mb-6 overflow-hidden">
                    <img src="/images/ev.png" alt="EV Charging Networks" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">EV Charging Networks</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Vehicle movement patterns, charging demand forecasting, and route optimization data help EV networks plan infrastructure and improve service availability.
                  </p>
                </div>

                {/* Urban Planning & Infrastructure */}
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-6 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  <div className="w-full h-48 rounded-lg mb-6 overflow-hidden">
                    <img src="/images/urban_plan.png" alt="Urban Planning & Infrastructure" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">Urban Planning & Infrastructure</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Comprehensive mobility data, development impact analysis, and infrastructure usage patterns inform planning decisions and optimize urban development.
                  </p>
                </div>

                {/* Insurance & Risk Modeling */}
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-6 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  <div className="w-full h-48 rounded-lg mb-6 overflow-hidden">
                    <img src="/images/insurance.png" alt="Insurance & Risk Modeling" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">Insurance & Risk Modeling</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Driving behavior analysis, risk assessment data, and incident patterns help insurers develop accurate models, price policies, and reduce claims.
                  </p>
                </div>

                {/* AI/ML & Robotics */}
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-6 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  <div className="w-full h-48 rounded-lg mb-6 overflow-hidden">
                    <img src="/images/robotics.png" alt="AI/ML & Robotics" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">AI/ML & Robotics</h3>
                  <p className="text-gray-300 leading-relaxed">
                    High-resolution mobility behavior, validated POI updates, and road-change signals enhance model training for autonomous systems and robotics.
                  </p>
                </div>

                {/* Telecommunications */}
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-6 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  <div className="w-full h-48 rounded-lg mb-6 overflow-hidden">
                    <img src="/images/telecom.png" alt="Telecommunications" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">Telecommunications</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Mobility density, movement clustering, and area activity trends support tower placement, network optimization, and coverage capacity planning.
                  </p>
                </div>

                {/* Emergency Response & Safety */}
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-6 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  <div className="w-full h-48 rounded-lg mb-6 overflow-hidden">
                    <img src="/images/emergency_response.png" alt="Emergency Response & Safety" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">Emergency Response & Safety</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Real-time incidents, hazard detection, and congestion signals improve response routing, situational awareness, and emergency coordination.
                  </p>
                </div>
              </>
            )}

          </div>

          {/* View More Text */}
          <div className="text-center mt-12">
            <span
              onClick={() => setShowMore(!showMore)}
              className="text-purple-400 hover:text-purple-300 font-medium cursor-pointer transition-colors"
            >
              {showMore ? 'View Less' : 'View More Industries'}
            </span>
          </div>
        </div>
      </section>

      {/* Divider Line */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <hr className="border-t border-white/20" />
      </div>

      {/* Contact Us Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Content */}
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6">
                Accelerate Your Insights With Community-Powered Location Data
              </h2>
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                CapturGO offers fresh mobility signals, real-time road activity, and POI intelligence sourced from everyday movement. Join our network as a partner or data buyer and help shape the future of location technology.
              </p>
            </div>
            
            {/* Right Content - Contact Form */}
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Let's Connect!</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Success/Error Messages */}
                {submitStatus === 'success' && (
                  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
                    Thank you! Your message has been sent successfully.
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                    Sorry, there was an error sending your message. Please try again.
                  </div>
                )}
                {submitStatus === 'captcha-error' && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                    Please verify that you are not a robot.
                  </div>
                )}
                {submitStatus === 'privacy-error' && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                    Please accept the Privacy Policy to continue.
                  </div>
                )}

                {/* First Name & Last Name Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="First Name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-gray-900"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Last Name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-gray-900"
                      required
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email Address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-gray-900"
                    required
                  />
                </div>

                {/* Company */}
                <div>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Company"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-gray-900"
                    required
                  />
                </div>

                {/* Type of Inquiry */}
                <div>
                  <select 
                    name="inquiry"
                    value={formData.inquiry}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-gray-900"
                    required
                  >
                    <option value="">Type of Inquiry...</option>
                    <option value="partnership">Partnership Opportunities</option>
                    <option value="data-access">Data Access & Licensing</option>
                    <option value="integration">API Integration</option>
                    <option value="enterprise">Enterprise Solutions</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Your Message"
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all resize-none text-gray-900"
                    required
                  ></textarea>
                </div>

                {/* reCAPTCHA */}
                <div>
                  <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 flex items-center gap-3 w-fit">
                    <input
                      type="checkbox"
                      id="recaptcha"
                      checked={captchaVerified}
                      onChange={(e) => setCaptchaVerified(e.target.checked)}
                      className="w-6 h-6 text-purple-600 border-2 border-gray-400 rounded focus:ring-purple-500"
                    />
                    <label htmlFor="recaptcha" className="text-gray-700 font-medium">
                      I'm not a robot
                    </label>
                    <div className="ml-4">
                      <div className="text-xs text-gray-500">reCAPTCHA</div>
                      <div className="flex text-xs text-gray-400 gap-1">
                        <span>Privacy</span>
                        <span>-</span>
                        <span>Terms</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Privacy Policy Checkbox */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="privacy-policy"
                    checked={privacyAccepted}
                    onChange={(e) => setPrivacyAccepted(e.target.checked)}
                    className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <label htmlFor="privacy-policy" className="text-sm text-gray-600">
                    I hereby accept the{' '}
                    <a href="/privacy" className="text-purple-500 hover:text-purple-600 font-medium">
                      Privacy Policy
                    </a>{' '}
                    of capturGO
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2 ${
                    isSubmitting 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-purple-500 hover:bg-purple-600 text-white'
                  }`}
                >
                  {isSubmitting ? 'SENDING...' : 'SUBMIT'}
                  {!isSubmitting && <span>→</span>}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      
      </div> {/* End Content Overlay */}
    </div>
  );
}
