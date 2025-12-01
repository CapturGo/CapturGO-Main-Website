import Head from 'next/head';
import Link from 'next/link';

export default function BlogTemplate({ 
  title, 
  description, 
  keywords, 
  ogTitle, 
  ogDescription, 
  image, 
  date, 
  category, 
  children 
}) {
  return (
    <div className="bg-black">
      <Head>
        <title>{title} - CapturGO Blog</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        
        {/* Open Graph */}
        <meta property="og:title" content={ogTitle || title} />
        <meta property="og:description" content={ogDescription || description} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="capturGO" />
        <meta property="og:image" content={image} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={title} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={ogTitle || title} />
        <meta name="twitter:description" content={ogDescription || description} />
        <meta name="twitter:image" content={image} />
        <meta name="twitter:image:alt" content={title} />
      </Head>

      {/* Header */}
      <div className="pt-8 pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button and Meta */}
          <div className="flex items-center justify-between mb-8">
            <Link href="/blog" className="group flex items-center px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-xl border border-gray-700/50 hover:border-gray-600/50 text-gray-300 hover:text-white transition-all duration-200">
              <svg className="w-4 h-4 mr-2 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </Link>
            <div className="text-gray-400 text-sm font-medium">
              {date} / {category}
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-8 leading-tight text-center max-w-4xl mx-auto">
            {title}
          </h1>

          {/* Featured Image */}
          {image && (
            <div className="mb-12">
              <div className="relative">
                <img 
                  src={image} 
                  alt={title}
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          )}

          {/* Blog Content */}
          <div className="prose prose-lg prose-invert max-w-none">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
