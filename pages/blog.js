import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { blogs, blogCategories } from '../data/blogs';

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const filteredBlogs = selectedCategory === 'All' 
    ? blogs 
    : blogs.filter(blog => blog.category === selectedCategory);


  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-black">
        <Head>
          <title>Blog - CapturGO | Latest Updates & Insights</title>
          <meta name="description" content="Stay updated with the latest CapturGO news, tutorials, and insights about decentralized location intelligence and blockchain technology." />
          <meta name="keywords" content="CapturGO blog, blockchain tutorials, location intelligence, crypto rewards, DePIN" />
          
          {/* Open Graph */}
          <meta property="og:title" content="Blog - CapturGO" />
          <meta property="og:description" content="Latest updates and insights from CapturGO" />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="capturGO" />
          <meta property="og:image" content="/images/socialcard.png" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:image:alt" content="CapturGO Blog - Latest Updates & Insights" />
          
          {/* Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Blog - CapturGO" />
          <meta name="twitter:description" content="Latest updates and insights from CapturGO" />
          <meta name="twitter:image" content="/images/socialcard.png" />
          <meta name="twitter:image:alt" content="CapturGO Blog - Latest Updates & Insights" />
        </Head>
        
        {/* Hero Section */}
        <section className="pt-8 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Blog
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Stay updated with the latest CapturGO news, tutorials, and insights about decentralized location intelligence.
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-3">
              {blogCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-gray-700/70 text-gray-200 hover:bg-gray-600/70 backdrop-blur-sm border border-gray-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredBlogs && filteredBlogs.length > 0 && filteredBlogs.map((blog, index) => (
                <Link key={blog.id} href={blog.link} className="group block">
                  <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:border-white/20 hover:bg-gray-800/50 transition-all duration-300 h-full">
                    
                    {/* Blog Image */}
                    <div className="relative overflow-hidden h-48">
                      <img 
                        src={blog.image} 
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          // Show fallback gradient if image fails to load
                          e.target.style.display = 'none';
                          e.target.nextElementSibling.style.display = 'flex';
                        }}
                      />
                      {/* Fallback placeholder */}
                      <div className="hidden absolute inset-0 bg-gradient-to-br from-purple-600/10 to-purple-800/10 items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 via-purple-500/20 to-yellow-400/20"></div>
                        <div className="relative text-center">
                          <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-2 mx-auto">
                            <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Blog Content */}
                    <div className="p-6">
                      <div className="flex items-center justify-between text-sm mb-3">
                        <span className="text-gray-400">{blog.date}</span>
                        <span className="text-gray-500">{blog.category}</span>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-white mb-0 leading-tight group-hover:text-gray-200 transition-colors line-clamp-2">
                        {blog.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* No blogs message */}
            {filteredBlogs.length === 0 && (
              <div className="text-center py-16">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-12 max-w-md mx-auto">
                  <h3 className="text-2xl font-bold text-white mb-4">No blogs found</h3>
                  <p className="text-purple-100">
                    No blogs available in the "{selectedCategory}" category yet.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

    </div>
  );
}
