import React, { useState } from 'react'

const TopBar = () => {
  const [searchFocused, setSearchFocused] = useState(false)

  return (
    <div className="h-18 glass flex items-center justify-between px-6 sticky top-0 z-50 modern-card mx-4 mt-4 rounded-3xl">
      {/* Left side - Logo */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-3">
          {/* <div className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-lg shadow-twitter-blue/20">
            <span className="text-xl">🐦</span>
          </div> */}
          <div className="hidden md:block">
            <h2 className="text-xl font-bold font-heading text-twitter-white">Home</h2>
          </div>
        </div>
      </div>
      
      {/* Center - Search */}
      <div className="flex-1 max-w-2xl mx-6">
        <div className="relative group">
          <input
            type="text"
            placeholder="Search StellaFi"
            className={`w-full modern-input py-4 px-6 pl-14 text-base font-body text-twitter-white placeholder-twitter-muted focus:outline-none transition-all duration-300 ${
              searchFocused 
                ? 'bg-white/10 shadow-lg shadow-twitter-blue/10' 
                : 'hover:bg-white/8'
            }`}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          <div className={`absolute left-5 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
            searchFocused ? 'text-twitter-blue' : 'text-twitter-muted'
          }`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          {searchFocused && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <div className="w-7 h-7 bg-gradient-to-r from-twitter-blue to-purple-500 rounded-full flex items-center justify-center animate-bounce-gentle shadow-lg">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Right side - Actions */}
      <div className="flex items-center space-x-3">
        {/* QR Code Button */}
        <button className="group relative p-3 rounded-2xl modern-button hover:scale-105">
          <svg className="w-5 h-5 text-twitter-muted group-hover:text-twitter-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h2M4 4h4v4H4V4zm16 0h4v4h-4V4zM4 16h4v4H4v-4z" />
          </svg>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-twitter-blue to-purple-500 rounded-full animate-pulse"></div>
        </button>

        {/* Notifications */}
        <button className="group relative p-3 rounded-2xl modern-button hover:scale-105">
          <svg className="w-5 h-5 text-twitter-muted group-hover:text-twitter-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4 19h6v-6H4v6zm5-10V6l-5 5h5V9zM19 10h-5l5-5v5z" />
          </svg>
        </button>

        {/* Settings */}
        <button className="group p-3 rounded-2xl modern-button hover:scale-105">
          <svg className="w-5 h-5 text-twitter-muted group-hover:text-twitter-white transition-colors group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
        
        {/* Profile */}
        <div className="flex items-center space-x-3 group cursor-pointer modern-button p-2 rounded-2xl">
          <div className="relative">
            <img
              src="/stellafi.png"
              alt="Profile"
              className="w-10 h-10 rounded-2xl transition-all duration-300 group-hover:scale-105 shadow-lg"
            />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-twitter-success rounded-full shadow-md"></div>
          </div>
          <div className="hidden lg:block">
            <div className="text-twitter-white font-semibold font-body text-base">StellaFi</div>
            <div className="text-twitter-muted font-body text-sm">@joinStellaFi</div>
          </div>
          <svg className="w-4 h-4 text-twitter-muted group-hover:text-twitter-white transition-colors hidden lg:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default TopBar
