import React from 'react';
import { X, Wallet, Rocket, Users } from 'lucide-react';
import "./App.css";

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* Background gradient circles */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-6">
        <div className="flex items-center space-x-2">
          <X className="w-8 h-8" />
          <span className="text-xl font-bold">StellarSocial</span>
        </div>
        <div className="text-sm text-gray-400">
          You are signing into <span className="text-white font-medium">StellarSocial</span>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[80vh]">
        <div className="max-w-md w-full mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              Earn While You Post
            </h1>
            <p className="text-gray-400 text-lg">
              Launch memecoins and earn tokens through social engagement on Stellar
            </p>
          </div>

          {/* Login Options */}
          <div className="space-y-4 mb-8">
            <button className="w-full bg-white text-black py-4 px-6 rounded-xl font-medium hover:bg-gray-100 transition-colors flex items-center justify-center space-x-3">
              <Wallet className="w-5 h-5" />
              <span>Connect Stellar Wallet</span>
            </button>
            
            <button className="w-full bg-gray-800 border border-gray-700 py-4 px-6 rounded-xl font-medium hover:bg-gray-700 transition-colors flex items-center justify-center space-x-3">
              <Users className="w-5 h-5" />
              <span>Start Social Earning</span>
            </button>
            
            <button className="w-full bg-gray-800 border border-gray-700 py-4 px-6 rounded-xl font-medium hover:bg-gray-700 transition-colors flex items-center justify-center space-x-3">
              <Rocket className="w-5 h-5" />
              <span>Launch Memecoin</span>
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">5-50</div>
              <div className="text-xs text-gray-500">Tokens per post</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">3s</div>
              <div className="text-xs text-gray-500">Transaction time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">$0.001</div>
              <div className="text-xs text-gray-500">Average fee</div>
            </div>
          </div>

          {/* How it Works */}
          <div className="space-y-4 mb-8">
            <h3 className="text-lg font-semibold text-center">How it works</h3>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs font-bold">1</div>
                <span>Post content and earn 5-50 tokens instantly</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-xs font-bold">2</div>
                <span>Launch memecoins with social momentum</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-xs font-bold">3</div>
                <span>Community engagement drives token success</span>
              </div>
            </div>
          </div>

          <div className="text-center text-xs text-gray-500">
            Don't have an account? <button className="text-white hover:underline">Sign up</button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 text-center p-6 text-xs text-gray-500">
        By continuing, you agree to StellarSocial's{' '}
        <button className="text-white hover:underline">Terms of Service</button> and{' '}
        <button className="text-white hover:underline">Privacy Policy</button>
      </footer>
    </div>
  );
}

export default App;
