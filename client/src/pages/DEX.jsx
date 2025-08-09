import React, { useState } from 'react'

const DEX = () => {
  const [activeTab, setActiveTab] = useState('trade')
  const [fromToken, setFromToken] = useState('ETH')
  const [toToken, setToToken] = useState('USDC')
  const [fromAmount, setFromAmount] = useState('')
  const [toAmount, setToAmount] = useState('')

  const trendingTokens = [
    { name: 'Ethereum', symbol: 'ETH', price: '$2,345.67', change: '+5.2%', volume: '$1.2B', positive: true, icon: (
      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z"/>
      </svg>
    ) },
    { name: 'Bitcoin', symbol: 'BTC', price: '$43,210.89', change: '+2.8%', volume: '$890M', positive: true, icon: (
      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.638 14.904c-1.602 6.43-8.113 10.34-14.542 8.736C2.67 22.05-1.244 15.525.362 9.105 1.962 2.67 8.475-1.243 14.9.358c6.43 1.605 10.342 8.115 8.738 14.546z"/>
      </svg>
    ) },
    { name: 'Solana', symbol: 'SOL', price: '$98.45', change: '-1.3%', volume: '$456M', positive: false, icon: (
      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
      </svg>
    ) },
    { name: 'Cardano', symbol: 'ADA', price: '$0.52', change: '+8.7%', volume: '$234M', positive: true, icon: (
      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
      </svg>
    ) },
    { name: 'Polygon', symbol: 'MATIC', price: '$0.89', change: '-3.2%', volume: '$167M', positive: false, icon: (
      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
      </svg>
    ) },
  ]

  const TokenSelector = ({ value, onChange, label }) => (
    <div className="glass rounded-2xl p-6 hover:bg-twitter-surface/10 transition-all duration-300 group">
      <label className="block text-twitter-lightGray text-sm mb-3 font-medium">{label}</label>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-twitter-blue to-purple-500 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
            </svg>
          </div>
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="bg-transparent text-twitter-white text-xl font-semibold focus:outline-none cursor-pointer hover:text-twitter-blue transition-colors"
          >
            <option value="ETH">ETH</option>
            <option value="BTC">BTC</option>
            <option value="USDC">USDC</option>
            <option value="SOL">SOL</option>
            <option value="ADA">ADA</option>
          </select>
        </div>
        <input
          type="text"
          placeholder="0.00"
          className="bg-transparent text-twitter-white text-2xl text-right focus:outline-none w-40 font-bold placeholder-twitter-lightGray"
          value={label === 'From' ? fromAmount : toAmount}
          onChange={(e) => label === 'From' ? setFromAmount(e.target.value) : setToAmount(e.target.value)}
        />
      </div>
      <div className="mt-3 text-twitter-lightGray text-sm">
        Balance: {Math.random().toFixed(4)} {value}
      </div>
    </div>
  )

  const TrendingToken = ({ token }) => (
    <div className="flex items-center justify-between p-4 hover:bg-twitter-surface/50 rounded-xl transition-all duration-300 cursor-pointer group">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gradient-to-br from-twitter-blue to-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          {token.icon}
        </div>
        <div>
          <div className="text-twitter-white font-semibold text-lg">{token.name}</div>
          <div className="text-twitter-lightGray text-sm">{token.symbol}</div>
        </div>
      </div>
      
      <div className="text-right">
        <div className="text-twitter-white font-bold text-lg">{token.price}</div>
        <div className="flex items-center space-x-2 text-sm">
          <span className={`font-medium ${token.positive ? 'text-twitter-success' : 'text-twitter-error'}`}>
            {token.change}
          </span>
          <span className="text-twitter-lightGray">{token.volume}</span>
        </div>
      </div>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto p-6 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-twitter-white mb-2">Decentralized Exchange</h1>
        <p className="text-twitter-lightGray text-lg">Trade tokens instantly with the best rates</p>
      </div>

      {/* Header Tabs */}
      <div className="flex space-x-2 glass rounded-2xl p-2 mb-8 max-w-md">
        {[
          { 
            id: 'trade', 
            label: 'Trade', 
            icon: (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
            )
          },
          { 
            id: 'send', 
            label: 'Send', 
            icon: (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
              </svg>
            )
          },
          { 
            id: 'request', 
            label: 'Request', 
            icon: (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 10.828V15a1 1 0 102 0v-4.172l1.293 1.293a1 1 0 001.414-1.414l-3-3z" clipRule="evenodd" />
              </svg>
            )
          }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
              activeTab === tab.id
                ? 'gradient-bg text-white shadow-lg'
                : 'text-twitter-lightGray hover:text-twitter-white hover:bg-twitter-surface/50'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Trading Interface */}
        <div className="lg:col-span-2">
          {activeTab === 'trade' && (
            <div className="glass rounded-3xl p-8">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-twitter-blue to-purple-500 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-twitter-white">Swap Tokens</h2>
              </div>
              
              <div className="space-y-6">
                <TokenSelector
                  value={fromToken}
                  onChange={setFromToken}
                  label="From"
                />
                
                <div className="flex justify-center">
                  <button className="p-4 glass rounded-2xl hover:bg-twitter-surface transition-all duration-300 hover:scale-110 group">
                    <svg className="w-6 h-6 text-twitter-blue group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                  </button>
                </div>
                
                <TokenSelector
                  value={toToken}
                  onChange={setToToken}
                  label="To"
                />
                
                <div className="glass rounded-2xl p-6 mt-8">
                  <h3 className="text-twitter-white font-semibold mb-4 text-lg">Transaction Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-base">
                      <span className="text-twitter-lightGray">Exchange Rate</span>
                      <span className="text-twitter-white font-medium">1 ETH = 2,345.67 USDC</span>
                    </div>
                    <div className="flex justify-between text-base">
                      <span className="text-twitter-lightGray">Network Fee</span>
                      <span className="text-twitter-white font-medium">~$12.50</span>
                    </div>
                    <div className="flex justify-between text-base">
                      <span className="text-twitter-lightGray">Price Impact</span>
                      <span className="text-twitter-success font-medium">{'<0.1%'}</span>
                    </div>
                    <div className="flex justify-between text-base">
                      <span className="text-twitter-lightGray">You'll receive</span>
                      <span className="text-twitter-white font-bold text-lg">~2,333.17 USDC</span>
                    </div>
                  </div>
                </div>
                
                <button className="w-full gradient-bg hover:shadow-2xl hover:shadow-twitter-blue/25 text-white font-bold py-6 rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 text-xl">
                  <div className="flex items-center justify-center space-x-3">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                    </svg>
                    <span>Swap Tokens</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'send' && (
            <div className="glass rounded-3xl p-8">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-twitter-white">Send Tokens</h2>
              </div>
              
              <div className="space-y-6">
                <div className="glass rounded-2xl p-6">
                  <label className="block text-twitter-lightGray text-sm mb-3 font-medium">Recipient Address</label>
                  <input
                    type="text"
                    placeholder="0x... or username.eth"
                    className="w-full bg-transparent text-twitter-white text-lg focus:outline-none placeholder-twitter-lightGray"
                  />
                </div>
                
                <TokenSelector
                  value={fromToken}
                  onChange={setFromToken}
                  label="Token & Amount"
                />
                
                <div className="glass rounded-2xl p-6">
                  <label className="block text-twitter-lightGray text-sm mb-3 font-medium">Message (Optional)</label>
                  <textarea
                    placeholder="Add a note..."
                    className="w-full bg-transparent text-twitter-white text-lg focus:outline-none placeholder-twitter-lightGray resize-none h-24"
                  />
                </div>
                
                <button className="w-full gradient-bg-success hover:shadow-2xl hover:shadow-green-500/25 text-white font-bold py-6 rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 text-xl">
                  Send Tokens
                </button>
              </div>
            </div>
          )}

          {activeTab === 'request' && (
            <div className="glass rounded-3xl p-8">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 10.828V15a1 1 0 102 0v-4.172l1.293 1.293a1 1 0 001.414-1.414l-3-3z" clipRule="evenodd" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-twitter-white">Request Payment</h2>
              </div>
              
              <div className="space-y-6">
                <div className="glass rounded-2xl p-6">
                  <label className="block text-twitter-lightGray text-sm mb-3 font-medium">Request From</label>
                  <input
                    type="text"
                    placeholder="Username or address"
                    className="w-full bg-transparent text-twitter-white text-lg focus:outline-none placeholder-twitter-lightGray"
                  />
                </div>
                
                <TokenSelector
                  value={fromToken}
                  onChange={setFromToken}
                  label="Token & Amount"
                />
                
                <div className="glass rounded-2xl p-6">
                  <label className="block text-twitter-lightGray text-sm mb-3 font-medium">Reason</label>
                  <textarea
                    placeholder="What's this for?"
                    className="w-full bg-transparent text-twitter-white text-lg focus:outline-none placeholder-twitter-lightGray resize-none h-24"
                  />
                </div>
                
                <button className="w-full gradient-bg-warning hover:shadow-2xl hover:shadow-yellow-500/25 text-twitter-background font-bold py-6 rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 text-xl">
                  Send Request
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Trending Tokens Sidebar */}
        <div className="glass rounded-3xl p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-twitter-blue to-purple-500 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-twitter-white">Trending</h3>
          </div>
          
          <div className="space-y-3">
            {trendingTokens.map((token, index) => (
              <TrendingToken key={index} token={token} />
            ))}
          </div>
          
          <button className="w-full mt-6 glass hover:bg-twitter-surface text-twitter-blue font-semibold py-4 rounded-2xl transition-all duration-300 hover:scale-105">
            View All Tokens
          </button>
        </div>
      </div>
    </div>
  )
}

export default DEX
