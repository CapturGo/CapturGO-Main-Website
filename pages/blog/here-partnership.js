import BlogTemplate from '../../components/BlogTemplate';

export default function HerePartnershipPost() {
  return (
    <BlogTemplate
      title="CapturGO x HERE Technologies: A New Chapter for Mobility Data"
      description="CapturGO partners with HERE Technologies to build next-generation location intelligence powered by community-driven mobility data and enterprise-grade mapping."
      keywords="CapturGO, HERE Technologies, mobility data, mapping, location intelligence, partnership, Southeast Asia"
      ogTitle="CapturGO x HERE Technologies: A New Chapter for Mobility Data"
      ogDescription="CapturGO partners with HERE Technologies to build next-generation location intelligence powered by community-driven mobility data."
      image="/images/HERE_Partnership.png"
      date="01 Dec 2024"
      category="PARTNERSHIPS"
    >
      {/* Blog Content */}
      <div className="text-gray-300 leading-relaxed space-y-6 text-lg">
        
        {/* Introduction Section */}
        <div className="mb-12">
          <p>
            Mapmakers, mobility platforms, and logistics networks all rely on fresh information about how the world is changing. Roads shift, traffic patterns evolve, and cities move fast. To keep up, they need real-world signals captured directly from the ground.
          </p>
          <p>
            This is where CapturGO is building something new.
          </p>
        </div>

        {/* Building the Network */}
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">Building the Future of Mobility Data</h2>
          <div className="text-gray-300 leading-relaxed space-y-6 text-lg">
            <p>
              CapturGO is creating one of the most active mobility data networks globally, initially pioneering in Southeast Asia, powered by everyday movement from commuters and travelers. By combining community-driven insights with a privacy-first approach, we are laying the groundwork for next-generation location intelligence.
            </p>
            
            <p>
              As part of this vision, CapturGO is now partnering with HERE Technologies, the global leader in automotive-grade mapping. HERE has nearly 40 years of experience powering navigation, connected vehicles, fleet systems, logistics platforms, and public sector infrastructure. Their map content and routing technology serve some of the world's largest and most demanding customers.
            </p>
          </div>
        </div>

        {/* Partnership Benefits */}
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">Strengthening Our Foundation</h2>
          <div className="text-gray-300 leading-relaxed space-y-6 text-lg">
            <p>
              Partnering with HERE gives CapturGO a strong foundation to build on. We gain access to enterprise-grade map content and location services that elevate our user experience from day one, while positioning our network for deeper technical and commercial opportunities as we scale.
            </p>

            {/* Partnership Highlights */}
            <div className="grid md:grid-cols-2 gap-6 my-8">
              <div className="bg-gray-900/30 border border-purple-700/50 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-3">Enterprise-Grade Technology:</h3>
                <p className="text-gray-300">Access to HERE's 40 years of mapping expertise and automotive-grade location services</p>
              </div>
              <div className="bg-gray-900/30 border border-purple-700/50 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-3">Enhanced User Experience:</h3>
                <p className="text-gray-300">Premium map content and routing capabilities from day one</p>
              </div>
            </div>
          </div>
        </div>

        {/* Looking Ahead */}
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">Looking Ahead</h2>
          <div className="text-gray-300 leading-relaxed space-y-6 text-lg">
            <p>
              The collaboration also places CapturGO within a larger ecosystem where enterprises actively explore and adopt new sources of location-centric insights. HERE powers a broad network of partners and customers who depend on high-quality, real-world data, and our growing mobility signals are closely aligned with these needs.
            </p>
            
            <p>
              As CapturGO expands, this relationship creates a natural pathway for our movement-based insights to reach new markets and applications in a secure and privacy-conscious way.
            </p>

            <p>
              CapturGO and HERE share a long-term vision of maps that evolve in real time, supported by both community-driven mobility data and enterprise-level geospatial expertise. This partnership marks the first step toward that future.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mb-12">
          <div className="bg-gray-900/30 border border-purple-700/50 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Want to Learn More?</h3>
            <p className="text-gray-300 mb-6">
              If you want to learn more about how CapturGO is building the next generation of mobility data, contact us at{' '}
              <a href="mailto:contact@capturgo.com" className="text-white hover:text-gray-300 underline">
                contact@capturgo.com
              </a>
            </p>
          </div>
        </div>

      </div>
    </BlogTemplate>
  );
}
