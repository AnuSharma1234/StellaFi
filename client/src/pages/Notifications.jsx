import React, { useState } from 'react'

const Notifications = () => {
  const [filter, setFilter] = useState('all')

  const notifications = [
    {
      id: 1,
      type: 'reply',
      user: {
        name: 'Alice Cooper',
        handle: '@alicecooper',
        avatar: 'https://via.placeholder.com/40/FF6B6B/FFFFFF?text=AC'
      },
      content: 'replied to your tweet',
      message: 'Great point about React hooks! I\'ve been using them extensively in my projects.',
      time: '2m',
      unread: true
    },
    {
      id: 2,
      type: 'swap',
      content: 'Swap completed',
      message: 'Successfully swapped 0.5 ETH for 1,172.83 USDC',
      time: '15m',
      unread: true
    },
    {
      id: 3,
      type: 'tip',
      user: {
        name: 'Bob Wilson',
        handle: '@bobw',
        avatar: 'https://via.placeholder.com/40/4ECDC4/FFFFFF?text=BW'
      },
      content: 'sent you a tip',
      message: '0.01 ETH - "Thanks for the helpful tutorial!"',
      time: '1h',
      unread: false
    },
    {
      id: 4,
      type: 'like',
      user: {
        name: 'Tech Enthusiast',
        handle: '@techenthusiast',
        avatar: 'https://via.placeholder.com/40/9B59B6/FFFFFF?text=TE'
      },
      content: 'liked your tweet',
      message: 'Just shipped a new feature! React makes everything so much easier',
      time: '2h',
      unread: false
    },
    {
      id: 5,
      type: 'follow',
      user: {
        name: 'Sarah Dev',
        handle: '@sarahdev',
        avatar: 'https://via.placeholder.com/40/E67E22/FFFFFF?text=SD'
      },
      content: 'followed you',
      time: '3h',
      unread: false
    },
    {
      id: 6,
      type: 'retweet',
      user: {
        name: 'Code Master',
        handle: '@codemaster',
        avatar: 'https://via.placeholder.com/40/27AE60/FFFFFF?text=CM'
      },
      content: 'retweeted your post',
      message: 'Beautiful sunset today! Sometimes you need to step away from the screen...',
      time: '4h',
      unread: false
    },
    {
      id: 7,
      type: 'payment',
      content: 'Payment received',
      message: 'Received 50 USDC from @freelanceclient',
      time: '1d',
      unread: false
    },
    {
      id: 8,
      type: 'mention',
      user: {
        name: 'Developer Friend',
        handle: '@devfriend',
        avatar: 'https://via.placeholder.com/40/3498DB/FFFFFF?text=DF'
      },
      content: 'mentioned you',
      message: 'Hey @StellaFi, check out this new framework!',
      time: '1d',
      unread: false
    }
  ]

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'reply': 
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        )
      case 'like': 
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
        )
      case 'retweet': 
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z" />
          </svg>
        )
      case 'follow': 
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        )
      case 'mention': 
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
          </svg>
        )
      case 'tip': 
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
          </svg>
        )
      case 'swap': 
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z" />
          </svg>
        )
      case 'payment': 
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
          </svg>
        )
      default: 
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
          </svg>
        )
    }
  }

  const getNotificationColor = (type) => {
    switch (type) {
      case 'reply': return 'text-twitter-blue'
      case 'like': return 'text-red-500'
      case 'retweet': return 'text-green-500'
      case 'follow': return 'text-purple-500'
      case 'mention': return 'text-yellow-500'
      case 'tip': return 'text-green-600'
      case 'swap': return 'text-blue-500'
      case 'payment': return 'text-green-600'
      default: return 'text-twitter-darkGray'
    }
  }

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : notifications.filter(n => n.type === filter)

  const NotificationItem = ({ notification }) => (
    <div className={`p-4 hover:bg-twitter-darker/50 transition-colors cursor-pointer ${
      notification.unread ? 'bg-twitter-blue/5' : ''
    }`}>
      <div className="flex space-x-3">
        <div className="flex-shrink-0">
          {notification.user ? (
            <img
              src={notification.user.avatar}
              alt={notification.user.name}
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <div className="w-10 h-10 bg-twitter-darker rounded-full flex items-center justify-center">
              <span className={`text-lg ${getNotificationColor(notification.type)}`}>
                {getNotificationIcon(notification.type)}
              </span>
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            {notification.user && (
              <>
                <span className="font-bold text-white">{notification.user.name}</span>
                <span className="text-twitter-darkGray">{notification.user.handle}</span>
              </>
            )}
            <span className={`text-sm ${getNotificationColor(notification.type)}`}>
              {notification.content}
            </span>
            <span className="text-twitter-darkGray">·</span>
            <span className="text-twitter-darkGray">{notification.time}</span>
          </div>
          
          {notification.message && (
            <p className="text-white mt-1 leading-relaxed">
              {notification.message}
            </p>
          )}
        </div>
        
        {notification.unread && (
          <div className="w-2 h-2 bg-twitter-blue rounded-full mt-2"></div>
        )}
      </div>
    </div>
  )

  return (
    <div className="max-w-2xl mx-auto border-l border-r border-twitter-border min-h-screen">
      {/* Header */}
      <div className="sticky top-0 bg-twitter-background/80 backdrop-blur border-b border-twitter-border p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-white">Notifications</h1>
          <button className="text-twitter-blue hover:text-twitter-darkBlue transition-colors">
            Settings
          </button>
        </div>
        
        {/* Filter Tabs */}
        <div className="flex space-x-1 bg-twitter-darker rounded-lg p-1">
          {[
            { id: 'all', label: 'All' },
            { id: 'reply', label: 'Replies' },
            { id: 'mention', label: 'Mentions' },
            { id: 'tip', label: 'Tips' },
            { id: 'swap', label: 'Swaps' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filter === tab.id
                  ? 'bg-twitter-blue text-white'
                  : 'text-twitter-darkGray hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      <div>
        {filteredNotifications.length === 0 ? (
          <div className="p-8 text-center text-twitter-darkGray">
            <div className="flex justify-center mb-4">
              <svg className="w-24 h-24 text-twitter-blue" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No notifications</h3>
            <p>When you get notifications, they'll show up here.</p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <NotificationItem key={notification.id} notification={notification} />
          ))
        )}
      </div>

      {/* Mark all as read button */}
      {filteredNotifications.some(n => n.unread) && (
        <div className="p-4 border-t border-twitter-border">
          <button className="w-full bg-twitter-blue hover:bg-twitter-darkBlue text-white font-medium py-3 rounded-xl transition-colors">
            Mark all as read
          </button>
        </div>
      )}
    </div>
  )
}

export default Notifications
