import React, { useState } from 'react'

const Wallet = () => {
  const [activeTab, setActiveTab] = useState('overview')

  const walletBalance = {
    total: '$12,345.67',
    change: '+$234.56 (1.9%)',
    positive: true
  }

  const assets = [
    { name: 'Lumens', symbol: 'XLM', amount: '0.45', value: '$5,746.89', change: '+0.38%', positive: true },
    { name: 'Bitcoin', symbol: 'BTC', amount: '0.15', value: '$6,481.63', change: '+2.8%', positive: true },
    { name: 'USD Coin', symbol: 'USDC', amount: '150.00', value: '$150.00', change: '0.0%', positive: true },
    { name: 'Solana', symbol: 'SOL', amount: '12.8', value: '$1,260.16', change: '-1.3%', positive: false },
  ]

  const recentActivity = [
    { type: 'send', token: 'ETH', amount: '0.5', to: '@alice', time: '2h ago', status: 'completed' },
    { type: 'receive', token: 'USDC', amount: '100', from: '@bob', time: '1d ago', status: 'completed' },
    { type: 'swap', from: 'BTC', to: 'ETH', amount: '0.01', time: '2d ago', status: 'completed' },
    { type: 'buy', token: 'SOL', amount: '25', time: '3d ago', status: 'completed' },
  ]

  const ActionButton = ({ icon, label, color = 'bg-twitter-blue' }) => (
    <button className={`${color} hover:opacity-90 text-white font-medium py-4 px-6 rounded-2xl transition-all transform hover:scale-105 flex flex-col items-center space-y-2 min-h-[100px] justify-center`}>
      <span className="text-white">{icon}</span>
      <span>{label}</span>
    </button>
  )

  const AssetCard = ({ asset }) => (
    <div className="flex items-center justify-between p-4 bg-twitter-darker rounded-xl hover:bg-twitter-border/50 transition-colors">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-gradient-to-br from-twitter-blue to-purple-500 rounded-full flex items-center justify-center">
          <span className="text-white font-bold">{asset.symbol[0]}</span>
        </div>
        <div>
          <div className="text-white font-medium">{asset.name}</div>
          <div className="text-twitter-darkGray text-sm">{asset.amount} {asset.symbol}</div>
        </div>
      </div>
      
      <div className="text-right">
        <div className="text-white font-medium">{asset.value}</div>
        <div className={`text-sm ${asset.positive ? 'text-green-500' : 'text-red-500'}`}>
          {asset.change}
        </div>
      </div>
    </div>
  )

  const ActivityItem = ({ activity }) => {
    const getActivityIcon = (type) => {
      switch (type) {
        case 'send': 
          return (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
            </svg>
          )
        case 'receive': 
          return (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 10.828V15a1 1 0 102 0v-4.172l1.293 1.293a1 1 0 001.414-1.414l-3-3z" clipRule="evenodd" />
            </svg>
          )
        case 'swap': 
          return (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z" />
            </svg>
          )
        case 'buy': 
          return (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
            </svg>
          )
        default: 
          return (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
          )
      }
    }

    const getActivityDescription = (activity) => {
      switch (activity.type) {
        case 'send':
          return `Sent ${activity.amount} ${activity.token} to ${activity.to}`
        case 'receive':
          return `Received ${activity.amount} ${activity.token} from ${activity.from}`
        case 'swap':
          return `Swapped ${activity.amount} ${activity.from} to ${activity.to}`
        case 'buy':
          return `Bought ${activity.amount} ${activity.token}`
        default:
          return 'Unknown transaction'
      }
    }

    return (
      <div className="flex items-center space-x-3 p-4 hover:bg-twitter-darker/50 rounded-lg transition-colors">
        <div className="w-10 h-10 bg-twitter-darker rounded-full flex items-center justify-center">
          <span>{getActivityIcon(activity.type)}</span>
        </div>
        
        <div className="flex-1">
          <div className="text-white">{getActivityDescription(activity)}</div>
          <div className="text-twitter-darkGray text-sm">{activity.time}</div>
        </div>
        
        <div className="text-green-500 text-sm font-medium">
          {activity.status}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Wallet</h1>
        <div className="flex items-center space-x-4">
          <span className="text-4xl font-bold text-white">{walletBalance.total}</span>
          <span className={`text-lg ${walletBalance.positive ? 'text-green-500' : 'text-red-500'}`}>
            {walletBalance.change}
          </span>
        </div>
      </div>

      {/* Action Buttons Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <ActionButton 
          icon={
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
            </svg>
          } 
          label="Buy" 
          color="bg-green-600" 
        />
        <ActionButton 
          icon={
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z" />
            </svg>
          } 
          label="Trade" 
          color="bg-twitter-blue" 
        />
        <ActionButton 
          icon={
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
            </svg>
          } 
          label="Send" 
          color="bg-purple-600" 
        />
        <ActionButton 
          icon={
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 10.828V15a1 1 0 102 0v-4.172l1.293 1.293a1 1 0 001.414-1.414l-3-3z" clipRule="evenodd" />
            </svg>
          } 
          label="Request" 
          color="bg-orange-600" 
        />
      </div>

      {/* Funding CTA */}
      <div className="bg-gradient-to-r from-twitter-blue to-purple-600 rounded-2xl p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Fund Your Wallet</h3>
            <p className="text-blue-100">Add money to start trading and sending crypto</p>
          </div>
          <button className="bg-white text-twitter-blue font-bold py-3 px-6 rounded-xl hover:bg-twitter-extraLightGray transition-colors">
            Add Funds
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-twitter-darker rounded-lg p-1 mb-6 max-w-md">
        {['overview', 'activity'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab
                ? 'bg-twitter-blue text-white'
                : 'text-twitter-darkGray hover:text-white'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Assets */}
          <div className="bg-twitter-darker rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">Your Assets</h3>
              <button className="text-twitter-blue hover:text-twitter-darkBlue transition-colors">
                View All
              </button>
            </div>
            
            <div className="space-y-3">
              {assets.map((asset, index) => (
                <AssetCard key={index} asset={asset} />
              ))}
            </div>
          </div>

          {/* Portfolio Chart Placeholder */}
          <div className="bg-twitter-darker rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Portfolio Performance</h3>
            <div className="h-64 bg-twitter-background rounded-xl flex items-center justify-center">
              <div className="text-center text-twitter-darkGray">
                <div className="flex justify-center mb-2">
                  <svg className="w-16 h-16 text-twitter-blue" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <p>Portfolio chart will be displayed here</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'activity' && (
        <div className="bg-twitter-darker rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">Recent Activity</h3>
            <button className="text-twitter-blue hover:text-twitter-darkBlue transition-colors">
              View All
            </button>
          </div>
          
          <div className="space-y-2">
            {recentActivity.map((activity, index) => (
              <ActivityItem key={index} activity={activity} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Wallet
