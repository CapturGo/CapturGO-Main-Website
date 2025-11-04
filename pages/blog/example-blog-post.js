import BlogTemplate from '../../components/BlogTemplate';

export default function ExampleBlogPost() {
  return (
    <BlogTemplate
      title="Your Blog Post Title Here"
      description="A brief description of your blog post for SEO and social sharing."
      keywords="CapturGO, keyword1, keyword2, keyword3"
      ogTitle="Your Blog Post Title Here"
      ogDescription="A brief description for social sharing."
      image="/images/your-blog-image.png"
      date="DD MMM YYYY"
      category="CATEGORY"
    >
      {/* Blog Content Goes Here */}
      <div className="text-gray-300 leading-relaxed space-y-6 text-lg">
        
        {/* Introduction Section */}
        <div className="mb-12">
          <p>
            Your introduction paragraph goes here. This should hook the reader and explain what they'll learn.
          </p>
        </div>

        {/* Main Content Sections */}
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">Section Title</h2>
          <div className="text-gray-300 leading-relaxed space-y-6 text-lg">
            <p>
              Your content paragraph goes here.
            </p>
            
            <p>
              Another paragraph with more details.
            </p>

            {/* Optional: Info boxes */}
            <div className="grid md:grid-cols-2 gap-6 my-8">
              <div className="bg-green-900/20 border border-green-700/30 rounded-2xl p-6">
                <h3 className="text-green-400 font-semibold mb-3">Positive Point:</h3>
                <p className="text-gray-300">Your positive information here</p>
              </div>
              <div className="bg-blue-900/20 border border-blue-700/30 rounded-2xl p-6">
                <h3 className="text-blue-400 font-semibold mb-3">Key Info:</h3>
                <p className="text-gray-300">Your key information here</p>
              </div>
            </div>
          </div>
        </div>

        {/* Step-by-step Guide (if applicable) */}
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">How to Get Started</h2>
          <div className="text-gray-300 leading-relaxed space-y-6 text-lg">
            <div className="space-y-8">
              <div className="bg-gray-800/30 rounded-2xl p-6">
                <h3 className="text-white font-semibold mb-3 flex items-center">
                  <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">1</span>
                  Step One Title
                </h3>
                <p className="text-gray-300 ml-11">
                  Description of step one goes here.
                </p>
              </div>
              
              <div className="bg-gray-800/30 rounded-2xl p-6">
                <h3 className="text-white font-semibold mb-3 flex items-center">
                  <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">2</span>
                  Step Two Title
                </h3>
                <p className="text-gray-300 ml-11">
                  Description of step two goes here.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">Ready to Get Started?</h2>
          <div className="text-gray-300 leading-relaxed space-y-6 text-lg">
            <p>
              Your call to action content goes here.
            </p>
            
            <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl p-8 text-center my-8">
              <p className="text-white font-bold text-xl mb-4">
                Your CTA headline here
              </p>
              <p className="text-gray-300 mb-6">
                Your CTA description here.
              </p>
              <div className="mt-6">
                <a 
                  href="https://your-link-here.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-colors duration-200"
                >
                  Get Started Now
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </BlogTemplate>
  );
}
