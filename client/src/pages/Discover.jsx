import React, { useState } from 'react'

const Discover = () => {
  const [activeTab, setActiveTab] = useState('discover')
  const [likedPosts, setLikedPosts] = useState(new Set())
  const [retweetedPosts, setRetweetedPosts] = useState(new Set())
  
  const mockPosts = [
    {
      id: 1,
      user: {
        name: 'Satoshi Nakamoto',
        handle: '@satoshi',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
        verified: true
      },
      time: '2h',
      content: 'The future of finance is decentralized. Building the infrastructure for a trustless world.\n\n#Bitcoin #Web3 #DeFi',
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop',
      likes: 1247,
      replies: 89,
      retweets: 432,
      trending: true
    },
    {
      id: 2,
      user: {
        name: 'Vitalik Buterin',
        handle: '@vitalikbuterin',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=50&h=50&fit=crop&crop=face',
        verified: true
      },
      time: '4h',
      content: 'Ethereum 2.0 is not just an upgrade, it\'s a revolution. Proof of Stake will change everything we know about blockchain consensus.\n\nThread 🧵 1/12',
      likes: 892,
      replies: 156,
      retweets: 234,
      hasThread: true
    },
    {
      id: 3,
      user: {
        name: 'CryptoQueen',
        handle: '@cryptoqueen',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c3c7?w=50&h=50&fit=crop&crop=face',
        verified: false
      },
      time: '6h',
      content: 'Just made my first NFT sale! The digital art revolution is real. Thanks to everyone who supported my work. Next drop coming soon!',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=400&fit=crop',
      likes: 234,
      replies: 45,
      retweets: 67,
      nft: true
    },
  ];

  const handleLike = (postId) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev)
      if (newSet.has(postId)) {
        newSet.delete(postId)
      } else {
        newSet.add(postId)
      }
      return newSet
    })
  }

  const handleRetweet = (postId) => {
    setRetweetedPosts(prev => {
      const newSet = new Set(prev)
      if (newSet.has(postId)) {
        newSet.delete(postId)
      } else {
        newSet.add(postId)
      }
      return newSet
    })
  }

  const PostCard = ({ post }) => {
    const isLiked = likedPosts.has(post.id)
    const isRetweeted = retweetedPosts.has(post.id)

    return (
      <article className="p-4 hover:bg-twitter-surface/30 transition-colors duration-200 group animate-fade-in border-b border-twitter-border">
        {post.trending && (
          <div className="flex items-center mb-2 text-twitter-lightGray text-sm ml-16">
            <svg className="w-4 h-4 mr-2 text-twitter-blue" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
            </svg>
            Trending in Crypto
          </div>
        )}
        
        <div className="flex space-x-4">
          <div className="flex-shrink-0">
            <div className="relative">
              <img
                src={post.user.avatar}
                alt={post.user.name}
                className="w-12 h-12 rounded-full"
              />
              {post.user.verified && (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-twitter-blue rounded-full flex items-center justify-center border-2 border-twitter-background">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex-1 min-w-0 text-left">
            <div className="flex items-center space-x-2 mb-2">
              <span className="font-bold text-twitter-white hover:underline cursor-pointer">
                {post.user.name}
              </span>
              <span className="text-twitter-lightGray">
                {post.user.handle}
              </span>
              <span className="text-twitter-lightGray">·</span>
              <span className="text-twitter-lightGray hover:underline cursor-pointer">
                {post.time}
              </span>
              {post.hasThread && (
                <div className="px-2 py-1 bg-twitter-blue/20 text-twitter-blue text-xs rounded-full">
                  Thread
                </div>
              )}
              {post.nft && (
                // CORRECTED: Use the new 'twitter-purple' color
                <div className="px-2 py-1 bg-twitter-purple/20 text-twitter-purple text-xs rounded-full">
                  NFT
                </div>
              )}
            </div>
            
            <div className="text-twitter-white mb-4 leading-relaxed text-lg whitespace-pre-wrap">
              {post.content}
            </div>
            
            {post.image && (
              // CORRECTED: Use the 'twitter-border' color
              <div className="mb-4 rounded-2xl border border-twitter-border overflow-hidden">
                <img
                  src={post.image}
                  alt="Post content"
                  className="w-full max-h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            )}
            
            <div className="flex items-center justify-between max-w-md">
              <button className="flex items-center space-x-2 text-twitter-lightGray hover:text-twitter-blue transition-colors duration-200 group/btn">
                <div className="p-2 rounded-full group-hover/btn:bg-twitter-blue/10 transition-colors duration-200">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                </div>
                <span className="text-sm font-medium">{post.replies}</span>
              </button>
              
              <button onClick={() => handleRetweet(post.id)} className={`flex items-center space-x-2 transition-colors duration-200 group/btn ${isRetweeted ? 'text-twitter-success' : 'text-twitter-lightGray hover:text-twitter-success'}`}>
                <div className={`p-2 rounded-full transition-colors duration-200 ${isRetweeted ? 'bg-twitter-success/20' : 'group-hover/btn:bg-twitter-success/10'}`}>
                  <svg className={`w-5 h-5 transition-transform duration-200 ${isRetweeted ? 'scale-110' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                </div>
                <span className="text-sm font-medium">{post.retweets + (isRetweeted ? 1 : 0)}</span>
              </button>
              
              {/* CORRECTED: Use the new 'twitter-danger' color */}
              <button onClick={() => handleLike(post.id)} className={`flex items-center space-x-2 transition-colors duration-200 group/btn ${isLiked ? 'text-twitter-danger' : 'text-twitter-lightGray hover:text-twitter-danger'}`}>
                <div className={`p-2 rounded-full transition-colors duration-200 ${isLiked ? 'bg-twitter-danger/20' : 'group-hover/btn:bg-twitter-danger/10'}`}>
                  <svg className={`w-5 h-5 transition-transform duration-200 ${isLiked ? 'scale-110' : ''}`} fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                </div>
                <span className="text-sm font-medium">{post.likes + (isLiked ? 1 : 0)}</span>
              </button>
              
              <button className="p-2 rounded-full text-twitter-lightGray hover:text-twitter-blue hover:bg-twitter-blue/10 transition-colors duration-200 group/btn">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
              </button>
            </div>
          </div>
        </div>
      </article>
    )
  }

  return (
    // CORRECTED: Use the 'twitter-border' color
    <div className="w-full border-x border-twitter-border">
      <div className="sticky top-0 z-40 backdrop-blur-md bg-twitter-background/80">
        <div className="flex border-b border-twitter-border">
          {['discover', 'videos'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-4 text-center font-semibold transition-colors duration-200 relative ${
                activeTab === tab
                  ? 'text-twitter-white'
                  : 'text-twitter-lightGray hover:text-twitter-white'
              }`}
            >
              <span className="capitalize text-lg">{tab}</span>
              {activeTab === tab && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-twitter-blue rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 border-b border-twitter-border">
        <div className="flex space-x-4">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face"
            alt="Your avatar"
            className="w-12 h-12 rounded-full"
          />
          <div className="flex-1">
            <textarea
              placeholder="What's happening?"
              className="w-full bg-transparent text-xl text-twitter-white placeholder-twitter-lightGray resize-none focus:outline-none min-h-[60px]"
            />
            <div className="flex items-center justify-between mt-2">
              <div className="flex space-x-1">
                {[ { icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>, label: 'Media' }, { icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>, label: 'Poll' }, { icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-5-5V5a3 3 0 116 0v5H9z" /></svg>, label: 'Emoji' }, { icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>, label: 'Schedule' }, ].map((item, index) => (
                  <button key={index} className="p-2 rounded-full hover:bg-twitter-blue/10 text-twitter-blue transition-colors duration-200" title={item.label}>
                    {item.icon}
                  </button>
                ))}
              </div>
              <button className="bg-twitter-blue hover:bg-twitter-darkBlue px-5 py-2 rounded-full text-white font-bold transition-colors duration-200 disabled:opacity-50">
                Tweet
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        {activeTab === 'discover' && (
          <div>
            {mockPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
        
        {activeTab === 'videos' && (
          <div className="p-12 text-center"><div className="w-24 h-24 bg-gradient-to-br from-twitter-blue to-twitter-purple rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-gentle"><svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg></div><h3 className="text-2xl font-bold text-twitter-white mb-3">Video content coming soon!</h3><p className="text-twitter-lightGray max-w-md mx-auto">We're working on bringing you the best video content from the crypto and Web3 community.</p></div>
        )}
      </div>
    </div>
  )
}

export default Discover
