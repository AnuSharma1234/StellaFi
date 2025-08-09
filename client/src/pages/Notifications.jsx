import React, { useState } from 'react'

const Notifications = () => {
  const [filter, setFilter] = useState('all')

  const notifications = [
    {
      id: 1,
      type: 'tweet_reply',
      user: {
        name: 'Alex Crypto',
        handle: '@alexcrypto_',
        avatar: 'https://via.placeholder.com/48/FF6B6B/FFFFFF?text=AC'
      },
      content: 'replied to your tweet',
      message: 'Amazing analysis on XLM! 🚀 I just bought more based on your recommendation. Thanks for sharing!',
      originalTweet: 'XLM is showing strong fundamentals with the upcoming soroban upgrade. Could see 3x this cycle 📈',
      time: '3m',
      unread: true
    },
    {
      id: 2,
      type: 'money_received',
      user: {
        name: 'Sarah Thompson',
        handle: '@sarah_dev',
        avatar: 'https://via.placeholder.com/48/4ECDC4/FFFFFF?text=ST'
      },
      content: 'sent you money',
      message: '💰 Payment for the smart contract audit - thanks for the quick turnaround!',
      amount: '+125.50 USDC',
      time: '15m',
      unread: true
    },
    {
      id: 3,
      type: 'tweet_mention',
      user: {
        name: 'DeFi Whale 🐋',
        handle: '@defi_whale',
        avatar: 'https://via.placeholder.com/48/9B59B6/FFFFFF?text=DW'
      },
      content: 'mentioned you in a tweet',
      message: 'Big shoutout to @stellafi_user for building the best DEX UI on Stellar! 🌟 This is how DeFi should look',
      time: '1h',
      unread: true
    },
    {
      id: 4,
      type: 'tip_received',
      user: {
        name: 'Crypto Enthusiast',
        handle: '@crypto_fan',
        avatar: 'https://via.placeholder.com/48/E67E22/FFFFFF?text=CE'
      },
      content: 'sent you a tip',
      message: '🎉 "Your tutorial saved me hours! Here\'s a small tip for your great work"',
      amount: '+2.5 XLM',
      time: '2h',
      unread: true
    },
    {
      id: 5,
      type: 'trade_executed',
      user: {
        name: 'StellaFi DEX',
        handle: '@stellafi_dex',
        avatar: 'https://via.placeholder.com/48/1DA1F2/FFFFFF?text=DEX'
      },
      content: 'Trade executed successfully',
      message: '✅ Limit order filled: 50 XLM → 175.25 USDC at $3.505 • Slippage: 0.1%',
      amount: '+175.25 USDC',
      time: '3h',
      unread: false
    },
    {
      id: 6,
      type: 'tweet_like',
      user: {
        name: 'Blockchain Builder',
        handle: '@blockchain_dev',
        avatar: 'https://via.placeholder.com/48/27AE60/FFFFFF?text=BB'
      },
      content: 'liked your tweet',
      message: '"Just launched my first dApp on Stellar! The developer experience is incredible 🔥"',
      time: '4h',
      unread: false
    },
    {
      id: 7,
      type: 'payment_request',
      user: {
        name: 'Mike Johnson',
        handle: '@mike_j',
        avatar: 'https://via.placeholder.com/48/F39C12/FFFFFF?text=MJ'
      },
      content: 'sent a payment request',
      message: '💸 "Hey! Can you send me 20 USDC for the pizza? Split the bill 🍕"',
      amount: '20 USDC requested',
      time: '5h',
      unread: false
    },
    {
      id: 8,
      type: 'follow',
      user: {
        name: 'Luna Martinez',
        handle: '@luna_crypto',
        avatar: 'https://via.placeholder.com/48/E91E63/FFFFFF?text=LM'
      },
      content: 'started following you',
      message: 'Love your DeFi content! Following for more alpha 💎',
      time: '6h',
      unread: false
    },
    {
      id: 9,
      type: 'tweet_retweet',
      user: {
        name: 'Stellar News',
        handle: '@stellar_news',
        avatar: 'https://via.placeholder.com/48/00BCD4/FFFFFF?text=SN'
      },
      content: 'retweeted your post',
      message: '"Breaking: Stellar processes 100M+ operations in a single day! Network is scaling beautifully 🚀"',
      time: '8h',
      unread: false
    },
    {
      id: 10,
      type: 'staking_reward',
      user: {
        name: 'Stellar Validators',
        handle: '@stellar_stake',
        avatar: 'https://via.placeholder.com/48/7B61FF/FFFFFF?text=SV'
      },
      content: 'Staking rewards earned',
      message: '🎉 Weekly staking rewards distributed! Your stake: 500 XLM • Reward: 12.5 XLM (8.2% APY)',
      amount: '+12.5 XLM',
      time: '12h',
      unread: false
    },
    {
      id: 11,
      type: 'money_sent',
      user: {
        name: 'Coffee Shop ☕',
        handle: '@stellar_coffee',
        avatar: 'https://via.placeholder.com/48/8D6E63/FFFFFF?text=CS'
      },
      content: 'Payment received',
      message: '☕ Thanks for your purchase! 1x Large Latte + 1x Croissant • Paid with XLM',
      amount: '-8.50 USDC',
      time: '1d',
      unread: false
    },
    {
      id: 12,
      type: 'tweet_quote',
      user: {
        name: 'Crypto Analyst',
        handle: '@crypto_analysis',
        avatar: 'https://via.placeholder.com/48/607D8B/FFFFFF?text=CA'
      },
      content: 'quoted your tweet',
      message: 'This is exactly why I\'m bullish on Stellar ecosystem 👆 The tech speaks for itself',
      originalTweet: 'Soroban smart contracts are game-changing. Sub-second finality + low fees = DeFi revolution',
      time: '1d',
      unread: false
    },
    {
      id: 13,
      type: 'airdrop',
      user: {
        name: 'Moonbeam Protocol',
        handle: '@moonbeam_proto',
        avatar: 'https://via.placeholder.com/48/673AB7/FFFFFF?text=MP'
      },
      content: 'Airdrop received',
      message: '🎁 Congratulations! You received 1,000 MOON tokens for being an early Stellar DeFi user!',
      amount: '+1,000 MOON',
      time: '2d',
      unread: false
    },
    {
      id: 14,
      type: 'price_alert',
      user: {
        name: 'Price Bot',
        handle: '@price_alerts',
        avatar: 'https://via.placeholder.com/48/4CAF50/FFFFFF?text=PB'
      },
      content: 'Price target reached',
      message: '📈 XLM just hit your target price of $4.00! (+15.2% in 24h) • Current: $4.05',
      time: '3d',
      unread: false
    }
  ]

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'tweet_reply': 
        return (
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        )
      case 'tweet_like': 
        return (
          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </div>
        )
      case 'tweet_retweet': 
        return (
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z" />
            </svg>
          </div>
        )
      case 'tweet_mention':
      case 'tweet_quote':
        return (
          <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
            </svg>
          </div>
        )
      case 'follow': 
        return (
          <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
        )
      case 'money_received':
      case 'tip_received':
      case 'staking_reward':
      case 'airdrop':
        return (
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
            </svg>
          </div>
        )
      case 'money_sent':
      case 'payment_request':
        return (
          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
            </svg>
          </div>
        )
      case 'trade_executed': 
        return (
          <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zM14 6a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h8zM6 8a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4a2 2 0 012-2h2z" />
            </svg>
          </div>
        )
      case 'price_alert':
        return (
          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
        )
      default: 
        return (
          <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
          </div>
        )
    }
  }

  const getNotificationColor = (type) => {
    switch (type) {
      case 'tweet_reply': return 'text-blue-500'
      case 'tweet_like': return 'text-red-500'
      case 'tweet_retweet': return 'text-green-500'
      case 'tweet_mention': return 'text-blue-400'
      case 'tweet_quote': return 'text-blue-400'
      case 'follow': return 'text-purple-500'
      case 'money_received': return 'text-green-500'
      case 'money_sent': return 'text-red-500'
      case 'tip_received': return 'text-green-500'
      case 'payment_request': return 'text-red-500'
      case 'staking_reward': return 'text-green-500'
      case 'airdrop': return 'text-green-500'
      case 'trade_executed': return 'text-indigo-500'
      case 'price_alert': return 'text-orange-500'
      default: return 'text-twitter-darkGray'
    }
  }

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : filter === 'tweets'
      ? notifications.filter(n => ['tweet_reply', 'tweet_mention', 'tweet_like', 'tweet_retweet', 'tweet_quote'].includes(n.type))
    : filter === 'money'
      ? notifications.filter(n => ['money_received', 'money_sent', 'tip_received', 'payment_request', 'staking_reward', 'airdrop'].includes(n.type))
    : filter === 'trading'
      ? notifications.filter(n => ['trade_executed', 'price_alert'].includes(n.type))
    : filter === 'social'
      ? notifications.filter(n => ['follow', 'mention'].includes(n.type))
    : notifications.filter(n => n.type === filter)

  const NotificationItem = ({ notification }) => (
    <div className={`group p-5 hover:bg-twitter-darker/50 transition-all duration-200 cursor-pointer border-l-4 ${
      notification.unread ? 'bg-twitter-blue/5 border-l-twitter-blue' : 'border-l-transparent hover:border-l-twitter-border'
    }`}>
      <div className="flex space-x-4">
        <div className="flex-shrink-0 relative">
          {notification.user ? (
            <div className="relative">
              <img
                src={notification.user.avatar}
                alt={notification.user.name}
                className="w-12 h-12 rounded-full ring-2 ring-twitter-border group-hover:ring-twitter-blue transition-colors"
              />
              <div className="absolute -bottom-1 -right-1">
                {getNotificationIcon(notification.type)}
              </div>
            </div>
          ) : (
            <div className="w-12 h-12 bg-gradient-to-br from-twitter-blue to-twitter-darkBlue rounded-full flex items-center justify-center shadow-lg">
              {getNotificationIcon(notification.type)}
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center flex-wrap gap-2 mb-2">
            {notification.user && (
              <>
                <span className="font-bold text-white hover:text-twitter-blue transition-colors cursor-pointer">
                  {notification.user.name}
                </span>
                <span className="text-twitter-darkGray text-sm">{notification.user.handle}</span>
              </>
            )}
            <span className={`text-sm font-medium ${getNotificationColor(notification.type)}`}>
              {notification.content}
            </span>
            <span className="text-twitter-darkGray text-xs">•</span>
            <span className="text-twitter-darkGray text-sm">{notification.time}</span>
          </div>
          
          {notification.message && (
            <div className="bg-twitter-darker/50 rounded-xl p-4 mt-3 border border-twitter-border/50">
              <p className="text-white leading-relaxed">
                {notification.message}
              </p>
              {notification.originalTweet && (
                <div className="mt-3 p-3 bg-twitter-border/20 rounded-lg border-l-2 border-twitter-blue">
                  <p className="text-twitter-darkGray text-sm italic">
                    Original: "{notification.originalTweet}"
                  </p>
                </div>
              )}
            </div>
          )}
          
          {notification.amount && (
            <div className="mt-3 inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-full border border-green-500/30">
              <span className={`font-bold text-lg ${notification.amount.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                {notification.amount}
              </span>
            </div>
          )}
        </div>
        
        <div className="flex items-start space-x-2">
          {notification.unread && (
            <div className="w-3 h-3 bg-twitter-blue rounded-full shadow-lg animate-pulse"></div>
          )}
          
          <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-twitter-border/30 rounded-lg">
            <svg className="w-4 h-4 text-twitter-darkGray hover:text-white transition-colors" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="max-w-2xl mx-auto border-l border-r border-twitter-border min-h-screen bg-gradient-to-b from-twitter-background to-twitter-darker">
      {/* Header */}
      <div className="sticky top-0 bg-twitter-background/95 backdrop-blur-xl border-b border-twitter-border/50 p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-twitter-blue to-twitter-darkBlue rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Notifications</h1>
              <p className="text-twitter-darkGray text-sm">Stay updated with your activity</p>
            </div>
          </div>
          <button className="group flex items-center space-x-2 px-4 py-2 bg-twitter-border/20 hover:bg-twitter-blue/20 rounded-xl transition-all duration-200 border border-twitter-border hover:border-twitter-blue">
            <svg className="w-5 h-5 text-twitter-darkGray group-hover:text-twitter-blue transition-colors" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
            <span className="text-twitter-darkGray group-hover:text-twitter-blue transition-colors font-medium">Settings</span>
          </button>
        </div>
        
        {/* Filter Tabs */}
        <div className="flex space-x-2 bg-twitter-darker/80 rounded-2xl p-2 backdrop-blur-sm border border-twitter-border/30">
          {[
            { id: 'all', label: 'All', icon: '📌' },
            { id: 'tweets', label: 'Tweets', icon: '🐦' },
            { id: 'money', label: 'Money', icon: '💰' },
            { id: 'trading', label: 'Trading', icon: '📈' },
            { id: 'social', label: 'Social', icon: '👥' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center space-x-2 relative overflow-hidden ${
                filter === tab.id
                  ? 'bg-gradient-to-r from-twitter-blue to-twitter-darkBlue text-white shadow-xl transform scale-105 border-2 border-twitter-blue/50'
                  : 'text-twitter-darkGray hover:text-white hover:bg-twitter-border/50 hover:scale-102 transform'
              }`}
            >
              {filter === tab.id && (
                <div className="absolute inset-0 bg-gradient-to-r from-twitter-blue/20 to-twitter-darkBlue/20 animate-pulse"></div>
              )}
              <span className="text-sm relative z-10">{tab.icon}</span>
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      <div className="relative">
        {filteredNotifications.length === 0 ? (
          <div className="p-12 text-center">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-twitter-blue/20 to-purple-500/20 rounded-full blur-xl"></div>
              <div className="relative w-32 h-32 mx-auto bg-gradient-to-br from-twitter-blue to-twitter-darkBlue rounded-full flex items-center justify-center shadow-2xl">
                <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white">All caught up!</h3>
              <p className="text-twitter-darkGray max-w-sm mx-auto leading-relaxed">
                No {filter === 'all' ? '' : filter + ' '}notifications to show right now. 
                When you get new activity, it'll appear here.
              </p>
              <div className="flex justify-center space-x-2 mt-6">
                <div className="w-2 h-2 bg-twitter-blue rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-twitter-blue rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-twitter-blue rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-twitter-border/30">
            {filteredNotifications.map((notification, index) => (
              <div 
                key={notification.id} 
                className="animate-fadeIn"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <NotificationItem notification={notification} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Mark all as read button */}
      {/* {filteredNotifications.some(n => n.unread) && (
        <div className="sticky bottom-0 p-6 bg-gradient-to-t from-twitter-background via-twitter-background/95 to-transparent backdrop-blur-sm">
          <button className="w-full group bg-gradient-to-r from-twitter-blue to-twitter-darkBlue hover:from-twitter-darkBlue hover:to-twitter-blue text-white font-semibold py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl border border-twitter-blue/50 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <div className="relative flex items-center justify-center space-x-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Mark all as read</span>
            </div>
          </button>
        </div>
      )} */}
    </div>
  )
}

export default Notifications
