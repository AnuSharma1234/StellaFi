import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

// Note: We are renaming the component to 'LeftSidebar' to match your project's existing imports.
const LeftSidebar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  // This function determines the active page based on the URL
  const getCurrentPage = () => {
    const path = location.pathname
    if (path === '/' || path.startsWith('/discover')) return 'discover'
    if (path.startsWith('/dex')) return 'dex'
    if (path.startsWith('/wallet')) return 'wallet'
    if (path.startsWith('/notifications')) return 'notifications'
    if (path.startsWith('/launchpad')) return 'launchpad'
    return 'discover' // Default to discover
  }

  const currentPage = getCurrentPage()

  // Navigation items with corrected gradient classes to match your theme
  const menuItems = [
    { 
      id: 'discover', 
      label: 'Discover', 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      gradient: 'from-twitter-blue to-twitter-purple'
    },
    { 
      id: 'dex', 
      label: 'DEX', 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      gradient: 'from-twitter-purple to-twitter-success'
    },
    { 
      id: 'wallet', 
      label: 'Wallet', 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      gradient: 'from-twitter-success to-twitter-blue'
    },
    { 
      id: 'notifications', 
      label: 'Notifications', 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      ),
      gradient: 'from-twitter-danger to-twitter-purple'
    },
  ]

  return (
    <div className="w-72 xl:w-80 bg-twitter-darker/80 backdrop-blur-xl flex flex-col min-h-screen relative overflow-hidden">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-twitter-blue/5 via-transparent to-purple-500/5 pointer-events-none" />
      
      {/* Header */}
      <div className="relative z-10 p-6">
        <div className="modern-card p-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12  rounded-3xl flex items-center justify-center shadow-lg shadow-twitter-blue/20">
              <img src='/stellafi.png'></img>
            </div>
            <div>
              <h1 className="text-2xl font-bold font-heading text-twitter-white">StellaFi</h1>
              <p className="text-twitter-muted text-base font-body">Web3 Social</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="relative z-10 flex-1 px-4 py-2 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => navigate(`/${item.id}`)}
            className={`group w-full flex items-center space-x-4 p-4 rounded-3xl text-left transition-all duration-300 transform hover:scale-[1.02] ${
              currentPage === item.id
                ? 'modern-card bg-twitter-blue/15 text-twitter-white shadow-lg shadow-twitter-blue/10'
                : 'text-twitter-muted hover:bg-white/5 hover:text-twitter-white modern-button'
            }`}
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
              currentPage === item.id 
                ? `bg-gradient-to-br ${item.gradient} text-white shadow-lg shadow-twitter-blue/20`
                : 'bg-white/5 group-hover:bg-white/10 text-twitter-muted group-hover:text-twitter-white backdrop-blur-sm'
            }`}>
              {item.icon}
            </div>
            <div className="flex-1">
              <span className="text-lg font-semibold font-heading">{item.label}</span>
            </div>
          </button>
        ))}
      </nav>
      
      {/* Tweet Button */}
      <div className="relative z-10 p-4">
        <button
        onClick={() => navigate(`/launchpad`)}
        className="w-full bg-gradient-to-r from-twitter-blue to-purple-500 hover:shadow-2xl hover:shadow-twitter-blue/30 text-white font-bold py-5 px-6 rounded-3xl transition-all duration-300 transform hover:scale-105 active:scale-95 group modern-card">
          <div className="flex items-center justify-center space-x-3">
            {/* <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg> */}
            <span className="text-lg font-semibold font-heading">🚀&nbsp;&nbsp;Launch Token</span>
          </div>
        </button>
      </div>

      {/* Profile Section */}
      <div className="relative z-10 p-4">
        <div className="modern-card p-4 hover:bg-white/5 transition-all duration-300 cursor-pointer group">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src="/stellafi.png"
                alt="Profile"
                className="w-12 h-12 rounded-2xl transition-all duration-300 shadow-lg"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-twitter-success rounded-full shadow-md"></div>
            </div>
            <div className="flex-1">
              <div className="text-twitter-white font-semibold font-body text-base">StellaFi</div>
              <div className="text-twitter-muted text-sm font-body">@joinStellaFi</div>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <svg className="w-5 h-5 text-twitter-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeftSidebar;
