import React, { useState, useEffect } from 'react'
import { useWallet } from '../provider/key.provider'
import useAccountBalance from '../hooks/useAccountBalance'
import { Wallet, RefreshCw, AlertCircle, ExternalLink } from 'lucide-react'
import { NetworkDisplay } from '../components/NetworkDisplay'

const WalletPage = () => {
  const [activeTab, setActiveTab] = useState('overview')

  // Wallet integration
  const { 
    publicKey, 
    isWalletConnected, 
    network, 
    networkDetails, 
    connectWallet, 
    disconnectWallet,
    isLoading: walletLoading,
    error: walletError
  } = useWallet()

  // Account balance integration
  const { 
    balances, 
    loading: balanceLoading, 
    error: balanceError, 
    refreshBalances, 
    getBalance 
  } = useAccountBalance()

  // Calculate total portfolio value (simplified - just XLM for now)
  const calculateTotalValue = () => {
    if (!balances.length) return { total: '$0.00', change: '+$0.00 (0%)', positive: true }
    
    // For demo purposes, assume 1 XLM = $0.12 (you can integrate with price API later)
    const xlmBalance = getBalance('XLM')
    const xlmPrice = 0.12
    const totalValue = parseFloat(xlmBalance) * xlmPrice
    
    return {
      total: `$${totalValue.toFixed(2)}`,
      change: '+$12.34 (2.1%)', // Demo change value
      positive: true
    }
  }

  const walletBalance = calculateTotalValue()

  // Convert balances to asset format for display
  const assets = balances.map(balance => {
    const assetCode = balance.asset_code || 'XLM'
    const amount = parseFloat(balance.balance).toFixed(2)
    
    // Demo prices and changes (integrate with real price API later)
    const demoPrices = {
      'XLM': { price: 0.12, change: '+2.1%', positive: true },
      'USDC': { price: 1.00, change: '0.0%', positive: true },
      'BTC': { price: 45000, change: '+1.8%', positive: true },
      'ETH': { price: 2800, change: '-0.5%', positive: false },
    }
    
    const priceInfo = demoPrices[assetCode] || { price: 1, change: '0.0%', positive: true }
    const value = (parseFloat(amount) * priceInfo.price).toFixed(2)
    
    return {
      name: balance.asset_code ? `${balance.asset_issuer?.slice(0, 8)}...${balance.asset_issuer?.slice(-4)}` : 'Stellar Lumens',
      symbol: assetCode,
      amount: amount,
      value: `$${value}`,
      change: priceInfo.change,
      positive: priceInfo.positive,
      balance: balance
    }
  })

  // Demo activity (you can extend this to fetch from Stellar transaction history)
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
          <div className="text-white font-medium flex items-center space-x-2">
            <span>{asset.symbol}</span>
            {asset.symbol !== 'XLM' && (
              <ExternalLink className="w-3 h-3 text-twitter-darkGray" />
            )}
          </div>
          <div className="text-twitter-darkGray text-sm">
            {asset.symbol === 'XLM' ? 'Native Stellar Asset' : asset.name}
          </div>
          <div className="text-twitter-darkGray text-xs">
            Balance: {asset.amount} {asset.symbol}
          </div>
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

  // Wallet Connection Component
  const WalletConnection = () => {
    if (!isWalletConnected) {
      return (
        <div className="bg-twitter-darker rounded-2xl p-8 text-center mb-8">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-20 h-20 bg-gradient-to-br from-twitter-blue to-purple-500 rounded-full flex items-center justify-center">
              <Wallet className="w-10 h-10 text-white" />
            </div>
            <div>
              <h3 className="text-twitter-white font-semibold text-xl mb-2">Connect Your Wallet</h3>
              <p className="text-twitter-lightGray text-sm mb-4">
                Connect your Freighter wallet to view your Stellar assets and manage your portfolio
              </p>
            </div>
            <button
              onClick={connectWallet}
              disabled={walletLoading}
              className="bg-gradient-to-r from-twitter-blue to-purple-500 text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50"
            >
              {walletLoading ? 'Connecting...' : 'Connect Wallet'}
            </button>
          </div>
          {walletError && (
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-400" />
              <span className="text-red-400 text-sm">{walletError}</span>
            </div>
          )}
        </div>
      )
    }

    return (
      <div className="bg-twitter-darker rounded-2xl p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-twitter-white font-semibold text-lg">Wallet Connected</h3>
              <p className="text-twitter-lightGray text-sm font-mono">
                {publicKey && typeof publicKey === 'string' ? `${publicKey.slice(0, 8)}...${publicKey.slice(-8)}` : 'Address not available'}
              </p>
              <p className="text-twitter-blue text-xs">
                Network: <NetworkDisplay network={network} networkDetails={networkDetails} />
                {networkDetails?.network?.includes('test') || networkDetails?.networkPassphrase?.includes('Test') || 
                 network?.includes?.('test') || network?.includes?.('Test') ? 
                  <span className="ml-2 px-2 py-1 bg-yellow-500/20 text-yellow-300 text-xs rounded">Development Mode</span> : null}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={refreshBalances}
              disabled={balanceLoading}
              className="p-2 hover:bg-twitter-surface rounded-lg transition-colors"
              title="Refresh balances"
            >
              <RefreshCw className={`w-5 h-5 text-twitter-blue ${balanceLoading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={disconnectWallet}
              className="text-twitter-lightGray hover:text-red-400 text-sm transition-colors"
            >
              Disconnect
            </button>
          </div>
        </div>
        {balanceError && (
          <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <span className="text-red-400 text-sm">{balanceError}</span>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Wallet Connection */}
      <WalletConnection />

      {/* Only show wallet content if connected */}
      {isWalletConnected && (
        <>
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Wallet</h1>
            <div className="flex items-center space-x-4">
              <span className="text-4xl font-bold text-white">{walletBalance.total}</span>
              <span className={`text-lg ${walletBalance.positive ? 'text-green-500' : 'text-red-500'}`}>
                {walletBalance.change}
              </span>
              {balanceLoading && (
                <div className="flex items-center space-x-2 text-twitter-blue">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Loading...</span>
                </div>
              )}
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
            <h3 className="text-xl font-bold text-white mb-2">
              {networkDetails?.network?.includes('test') || networkDetails?.networkPassphrase?.includes('Test') || 
               network?.includes?.('test') || network?.includes?.('Test') ? 
                'Get Testnet XLM' : 'Fund Your Wallet'}
            </h3>
            <p className="text-blue-100">
              {networkDetails?.network?.includes('test') || networkDetails?.networkPassphrase?.includes('Test') || 
               network?.includes?.('test') || network?.includes?.('Test') ? 
                'Get free testnet XLM from Stellar Laboratory to test the platform' :
                'Add money to start trading and sending crypto'}
            </p>
          </div>
          <button 
            className="bg-white text-twitter-blue font-bold py-3 px-6 rounded-xl hover:bg-twitter-extraLightGray transition-colors"
            onClick={() => {
              const isTestnet = networkDetails?.network?.includes('test') || 
                               networkDetails?.networkPassphrase?.includes('Test') || 
                               network?.includes?.('test') || 
                               network?.includes?.('Test');
              if (isTestnet) {
                window.open('https://laboratory.stellar.org/#account-creator', '_blank');
              }
            }}
          >
            {networkDetails?.network?.includes('test') || networkDetails?.networkPassphrase?.includes('Test') || 
             network?.includes?.('test') || network?.includes?.('Test') ? 
              'Get Testnet XLM' : 'Add Funds'}
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
              {balanceLoading ? (
                // Loading state
                <div className="flex items-center justify-center py-8">
                  <div className="flex items-center space-x-2 text-twitter-blue">
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Loading your assets...</span>
                  </div>
                </div>
              ) : assets.length > 0 ? (
                // Assets available
                assets.map((asset, index) => (
                  <AssetCard key={index} asset={asset} />
                ))
              ) : (
                // No assets found
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-twitter-surface rounded-full flex items-center justify-center mx-auto mb-4">
                    <Wallet className="w-8 h-8 text-twitter-darkGray" />
                  </div>
                  <p className="text-twitter-darkGray mb-2">No assets found</p>
                  <p className="text-twitter-darkGray text-sm">
                    Your wallet appears to be empty. Add some XLM or other Stellar assets to get started.
                  </p>
                </div>
              )}
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
      </>
      )}
    </div>
  )
}

export default WalletPage
