import Head from 'next/head';

export default function Partners() {
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
      <section className="pt-8 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">REAL TIME DATA.</span>
          </h1>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            CUSTOM TO YOUR NEEDS.
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Unlock the power of decentralized location intelligence with customizable real-time data solutions tailored to your industry needs.
          </p>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            To be Announced.
          </h2>
        </div>
      </section>
      
      </div> {/* End Content Overlay */}
    </div>
  );
}
