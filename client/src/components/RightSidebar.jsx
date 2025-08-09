import React from 'react'

const RightSidebar = () => {
  const trendingTopics = [
    { hashtag: '#Bitcoin', category: 'Cryptocurrency', tweets: '1.2M' },
    { hashtag: '#Ethereum', category: 'Cryptocurrency', tweets: '850K' },
    { hashtag: '#Web3', category: 'Technology', tweets: '456K' },
    { hashtag: '#DeFi', category: 'Finance', tweets: '234K' },
    { hashtag: '#NFT', category: 'Digital Art', tweets: '189K' },
    { hashtag: '#Blockchain', category: 'Technology', tweets: '156K' },
    { hashtag: '#Solana', category: 'Cryptocurrency', tweets: '134K' },
    { hashtag: '#Metaverse', category: 'Technology', tweets: '98K' },
  ]

  const whoToFollow = [
    {
      name: 'Vitalik Buterin',
      handle: '@VitalikButerin',
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&h=40&fit=crop&crop=face'
    },
    {
      name: 'Coinbase',
      handle: '@coinbase',
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=40&h=40&fit=crop&crop=face'
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
            className="w-full bg-twitter-surface/60 backdrop-blur-sm rounded-full py-3 px-4 pl-12 text-twitter-white placeholder-twitter-lightGray focus:outline-none focus:ring-2 focus:ring-twitter-blue/30 transition-all duration-300 hover:bg-twitter-surface/80"
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-twitter-lightGray group-focus-within:text-twitter-blue transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* What's happening */}
      <div className="bg-twitter-surface/60 backdrop-blur-sm rounded-2xl overflow-hidden">
        <div className="p-4">
          <h2 className="text-xl font-bold text-twitter-white">What's happening</h2>
        </div>
        
        <div>
          {trendingTopics.map((topic, index) => (
            <div
              key={index}
              className="p-4 hover:bg-twitter-surface/80 transition-all duration-200 cursor-pointer group"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1 text-left">
                  <div className="text-twitter-lightGray text-sm mb-1">
                    Trending in {topic.category}
                  </div>
                  <div className="text-twitter-white font-bold text-base group-hover:text-twitter-blue transition-colors">
                    {topic.hashtag}
                  </div>
                  <div className="text-twitter-lightGray text-sm mt-1">
                    {topic.tweets} Tweets
                  </div>
                </div>
                <button className="opacity-60 group-hover:opacity-100 p-2 -mr-2 -mt-1 rounded-full text-twitter-lightGray hover:bg-twitter-blue/10 hover:text-twitter-blue transition-all duration-200">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-4 hover:bg-twitter-surface/80 transition-colors duration-200">
          <button className="text-twitter-blue hover:underline text-sm font-medium">
            Show more
          </button>
        </div>
      </div>

      {/* Who to follow */}
      <div className="bg-twitter-surface/60 backdrop-blur-sm rounded-2xl overflow-hidden">
        <div className="p-4">
          <h2 className="text-xl font-bold text-twitter-white">Who to follow</h2>
        </div>
        
        <div>
          {whoToFollow.map((user, index) => (
            <div
              key={index}
              className="p-4 hover:bg-twitter-surface/80 transition-all duration-200 cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-12 h-12 rounded-full ring-2 ring-transparent group-hover:ring-twitter-blue/30 transition-all duration-300"
                    />
                    {user.verified && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-twitter-blue rounded-full flex items-center justify-center border-2 border-twitter-surface">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="text-left">
                    <div className="text-twitter-white font-semibold hover:underline cursor-pointer">
                      {user.name}
                    </div>
                    <div className="text-twitter-lightGray text-sm">
                      {user.handle}
                    </div>
                  </div>
                </div>
                <button className="bg-twitter-white text-twitter-background font-bold py-2 px-4 rounded-full hover:bg-twitter-lightGray transition-all duration-200 hover:scale-105">
                  Follow
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-4 hover:bg-twitter-surface/80 transition-colors duration-200">
          <button className="text-twitter-blue hover:underline text-sm font-medium">
            Show more
          </button>
        </div>
      </div>

      {/* Footer links */}
      <div className="px-4 pb-4">
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-twitter-lightGray text-sm">
          {['Terms of Service', 'Privacy Policy', 'Cookie Policy', 'Accessibility', 'Ads info', 'More'].map((link, index) => (
            <button key={index} className="hover:underline">
              {link}
            </button>
          ))}
        </div>
        <div className="text-twitter-lightGray text-sm mt-2">
          © 2025 StellaFi, Inc.
        </div>
      </div>
    </aside>
  )
}

export default RightSidebar
