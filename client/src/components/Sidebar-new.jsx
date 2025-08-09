import React from 'react'

const Sidebar = ({ currentPage, setCurrentPage }) => {
  const menuItems = [
    { 
      id: 'discover', 
      label: 'Discover', 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      gradient: 'from-blue-500 to-cyan-500'
    },
    { 
      id: 'dex', 
      label: 'DEX', 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      gradient: 'from-purple-500 to-pink-500'
    },
    { 
      id: 'wallet', 
      label: 'Wallet', 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      gradient: 'from-emerald-500 to-teal-500'
    },
    { 
      id: 'notifications', 
      label: 'Notifications', 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4 19h6v-6H4v6zm5-10V6l-5 5h5V9zM19 10h-5l5-5v5z" />
        </svg>
      ),
      gradient: 'from-orange-500 to-red-500'
    },
  ]

  return (
    <div className="w-72 glass border-r border-twitter-border flex flex-col min-h-screen relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-twitter-blue/5 via-purple-500/5 to-pink-500/5 animate-pulse"></div>
      
      {/* Header */}
      <div className="relative z-10 p-6 border-b border-twitter-border/50">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-twitter-blue to-purple-500 rounded-2xl flex items-center justify-center shadow-lg animate-glow">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold font-heading text-twitter-white">StellaFi</h1>
            <p className="text-twitter-muted text-base font-body">Web3 Edition</p>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="relative z-10 flex-1 px-4 py-2 space-y-1">
        {menuItems.map((item, index) => (
          <button
            key={item.id}
            onClick={() => setCurrentPage(item.id)}
            className={`group w-full flex items-center space-x-4 p-3 rounded-2xl text-left transition-all duration-300 transform hover:scale-105 ${
              currentPage === item.id
                ? 'bg-gradient-to-r from-twitter-blue/20 to-purple-500/20 text-twitter-white shadow-lg border border-twitter-blue/30'
                : 'text-twitter-muted hover:bg-twitter-surface/50 hover:text-twitter-white'
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 ${
              currentPage === item.id 
                ? `bg-gradient-to-br ${item.gradient} shadow-lg`
                : 'bg-twitter-surface group-hover:bg-twitter-border'
            }`}>
              {item.icon}
            </div>
            <div className="flex-1">
              <span className="text-lg font-semibold font-heading">{item.label}</span>
              {currentPage === item.id && (
                <div className="w-full h-0.5 bg-gradient-to-r from-twitter-blue to-transparent mt-1 animate-slide-up"></div>
              )}
            </div>
            {currentPage === item.id && (
              <div className="w-2 h-2 bg-twitter-blue rounded-full animate-bounce-gentle"></div>
            )}
          </button>
        ))}
      </nav>
      
      {/* Tweet Button */}
      <div className="relative z-10 p-4">
        <button className="w-full gradient-bg hover:shadow-2xl hover:shadow-twitter-blue/25 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 group">
          <div className="flex items-center justify-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            <span className="text-lg font-semibold font-heading">Tweet</span>
          </div>
        </button>
      </div>

      {/* Profile Section */}
      <div className="relative z-10 p-4 border-t border-twitter-border/50">
        <div className="flex items-center space-x-3 p-3 rounded-2xl hover:bg-twitter-surface/50 transition-all duration-300 cursor-pointer group">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
              alt="Profile"
              className="w-12 h-12 rounded-full border-2 border-twitter-blue/30 group-hover:border-twitter-blue transition-all duration-300"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-twitter-success rounded-full border-2 border-twitter-background"></div>
          </div>
          <div className="flex-1">
            <div className="text-twitter-white font-semibold font-body text-base">StellaFi</div>
            <div className="text-twitter-muted text-sm font-body">@StellaFi</div>
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg className="w-5 h-5 text-twitter-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
