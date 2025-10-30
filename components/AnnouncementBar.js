
export default function AnnouncementBar({ isVisible = true, onClose }) {
  if (!isVisible) {
    return null;
  }


  return (
    <div className="fixed top-20 left-0 right-0 bg-gradient-to-r from-captur-purple to-purple-600 text-white py-2 px-4 z-40">
      <div className="max-w-7xl mx-auto relative">
        {/* Mobile Layout - Single Line */}
        <div className="sm:hidden">
          <div className="flex items-center justify-center space-x-2 pr-8">
            <span className="animate-pulse">🎉</span>
            <span className="text-xs font-medium text-center">
              <strong>New!</strong> Create accounts on our website
            </span>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden sm:flex items-center justify-center text-center">
          <div className="flex items-center space-x-3 text-sm">
            <span className="animate-pulse">🎉</span>
            <span className="font-medium">
              <strong>New!</strong> Users can now create and manage accounts directly on our website.
            </span>
          </div>
        </div>
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white/80 hover:text-white transition-colors p-1"
          aria-label="Close announcement"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
