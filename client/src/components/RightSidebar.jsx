import React from 'react'

const RightSidebar = () => {
  const trendingTopics = [
    { hashtag: '#XLM', category: 'Cryptocurrency', tweets: '1.2M' },
    { hashtag: '#Stellar', category: 'Cryptocurrency', tweets: '850K' },
    { hashtag: '#Web3', category: 'Technology', tweets: '456K' },
    { hashtag: '#DeFi', category: 'Finance', tweets: '234K' },
    { hashtag: '#NFT', category: 'Digital Art', tweets: '189K' },
    { hashtag: '#Blockchain', category: 'Technology', tweets: '156K' },
    { hashtag: '#Solana', category: 'Cryptocurrency', tweets: '134K' },
    { hashtag: '#Metaverse', category: 'Technology', tweets: '98K' },
  ]

  const whoToFollow = [
    {
      name: 'Stellar',
      handle: '@stellar',
      verified: true,
      avatar: '/stellar.png'
    },
    {
      name: 'Vitalik Buterin',
      handle: '@VitalikButerin',
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&h=40&fit=crop&crop=face'
    },
    {
      name: 'OpenSea',
      handle: '@opensea',
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=40&h=40&fit=crop&crop=face'
    }
  ]

  return (
    <aside className="w-80 p-4 space-y-6 overflow-y-auto h-screen hidden xl:block">
      {/* Search */}
      <div className="sticky top-4 z-10">
        <div className="relative group">
          <input
            type="text"
            placeholder="Search StellaFi"
            className="w-full modern-input py-4 px-6 pl-14 text-twitter-white placeholder-twitter-muted focus:outline-none transition-all duration-300 hover:bg-white/8"
          />
          <div className="absolute left-5 top-1/2 transform -translate-y-1/2 text-twitter-muted group-focus-within:text-twitter-blue transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* What's happening */}
      <div className="modern-card overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-bold text-twitter-white text-heading">What's happening</h2>
        </div>
        
        <div>
          {trendingTopics.map((topic, index) => (
            <div
              key={index}
              className="p-4 hover:bg-white/5 transition-all duration-200 cursor-pointer group"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1 text-left">
                  <div className="text-twitter-subtle text-sm mb-1 text-caption">
                    Trending in {topic.category}
                  </div>
                  <div className="text-twitter-white font-bold text-base group-hover:text-twitter-blue transition-colors text-heading">
                    {topic.hashtag}
                  </div>
                  <div className="text-twitter-muted text-sm mt-1 text-caption">
                    {topic.tweets} Tweets
                  </div>
                </div>
                <button className="opacity-60 group-hover:opacity-100 p-2 -mr-2 -mt-1 rounded-2xl text-twitter-muted hover:bg-twitter-blue/10 hover:text-twitter-blue transition-all duration-200">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-4 hover:bg-white/5 transition-colors duration-200">
          <button className="text-twitter-blue hover:underline text-sm font-medium">
            Show more
          </button>
        </div>
      </div>

      {/* Who to follow */}
      <div className="modern-card overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-bold text-twitter-white text-heading">Who to follow</h2>
        </div>
        
        <div>
          {whoToFollow.map((user, index) => (
            <div
              key={index}
              className="p-4 hover:bg-white/5 transition-all duration-200 cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-12 h-12 rounded-2xl transition-all duration-300 shadow-lg"
                    />
                    {user.verified && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-twitter-blue to-purple-500 rounded-full flex items-center justify-center shadow-md">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="text-left">
                    <div className="text-twitter-white font-semibold hover:underline cursor-pointer text-base text-heading">
                      {user.name}
                    </div>
                    <div className="text-twitter-muted text-sm text-caption">
                      {user.handle}
                    </div>
                  </div>
                </div>
                <button className="bg-gradient-to-r from-twitter-blue to-purple-500 text-white font-bold py-2 px-5 rounded-2xl hover:shadow-lg transition-all duration-200 hover:scale-105 shadow-lg shadow-twitter-blue/20">
                  Follow
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-4 hover:bg-white/5 transition-colors duration-200">
          <button className="text-twitter-blue hover:underline text-sm font-medium">
            Show more
          </button>
        </div>
      </div>

      {/* Footer links */}
      <div className="modern-card p-6">
        <div className="flex flex-wrap gap-x-3 gap-y-2 text-twitter-muted text-sm">
          {['Terms of Service', 'Privacy Policy', 'Cookie Policy', 'Accessibility', 'Ads info', 'More'].map((link, index) => (
            <button key={index} className="hover:underline hover:text-twitter-white transition-colors">
              {link}
            </button>
          ))}
        </div>
        <div className="text-twitter-subtle text-sm mt-3">
          © 2025 StellaFi, Inc.
        </div>
      </div>
    </aside>
  )
}

export default RightSidebar
