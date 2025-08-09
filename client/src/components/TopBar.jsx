import React, { useState } from 'react'

const TopBar = () => {
  const [searchFocused, setSearchFocused] = useState(false)

  return (
    <div className="h-16 glass flex items-center justify-between px-6 sticky top-0 z-50">
      {/* Left side - Logo */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-twitter-blue to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-xl">🐦</span>
          </div>
          <div className="hidden md:block">
            <h2 className="text-lg font-bold text-twitter-white">Home</h2>
          </div>
        </div>
      </div>
      
      {/* Center - Search */}
      <div className="flex-1 max-w-2xl mx-6">
        <div className="relative group">
          <input
            type="text"
            placeholder="Search StellaFi"
            className={`w-full bg-twitter-surface/50 rounded-full py-3 px-5 pl-12 text-twitter-white placeholder-twitter-lightGray focus:outline-none transition-all duration-300 ${
              searchFocused 
                ? 'bg-twitter-surface shadow-lg shadow-twitter-blue/10' 
                : 'hover:bg-twitter-surface/70'
            }`}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          <div className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
            searchFocused ? 'text-twitter-blue' : 'text-twitter-lightGray'
          }`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          {searchFocused && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="w-6 h-6 bg-twitter-blue rounded-full flex items-center justify-center animate-bounce-gentle">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Right side - Actions */}
      <div className="flex items-center space-x-4">
        {/* QR Code Button */}
        <button className="group relative p-3 rounded-xl bg-twitter-surface/50 hover:bg-twitter-surface transition-all duration-300 hover:scale-105">
          <svg className="w-5 h-5 text-twitter-lightGray group-hover:text-twitter-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h2M4 4h4v4H4V4zm16 0h4v4h-4V4zM4 16h4v4H4v-4z" />
          </svg>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-twitter-blue rounded-full animate-pulse"></div>
        </button>

        {/* Notifications */}
        <button className="group relative p-3 rounded-xl bg-twitter-surface/50 hover:bg-twitter-surface transition-all duration-300 hover:scale-105">
          <svg className="w-5 h-5 text-twitter-lightGray group-hover:text-twitter-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4 19h6v-6H4v6zm5-10V6l-5 5h5V9zM19 10h-5l5-5v5z" />
          </svg>
        </button>

        {/* Settings */}
        <button className="group p-3 rounded-xl bg-twitter-surface/50 hover:bg-twitter-surface transition-all duration-300 hover:scale-105">
          <svg className="w-5 h-5 text-twitter-lightGray group-hover:text-twitter-white transition-colors group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
        
        {/* Profile */}
        <div className="flex items-center space-x-3 group cursor-pointer">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
              alt="Profile"
              className="w-10 h-10 rounded-full transition-all duration-300 group-hover:scale-105"
            />
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-twitter-success rounded-full"></div>
          </div>
          <div className="hidden lg:block">
            <div className="text-twitter-white font-semibold text-sm">StellaFi</div>
            <div className="text-twitter-lightGray text-xs">@StellaFi</div>
          </div>
          <svg className="w-4 h-4 text-twitter-lightGray group-hover:text-twitter-white transition-colors hidden lg:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default TopBar
