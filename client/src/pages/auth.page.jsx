import { Wallet, ExternalLink } from 'lucide-react';
import {toast , ToastContainer} from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../provider/key.provider';

export default function Auth() {
    const navigate = useNavigate()
    const { connectWallet, isLoading, error } = useWallet()

    const handleError = (error) => {
        toast.error(error, {
            position : "top-right"
        })
    }

    const handleSuccess = (message) => {
        toast.success(message , {
            position : "top-right"
        })
    }

    const handleConnectWallet = async () => {
        try {
            const result = await connectWallet()
            
            if (result.success) {
                handleSuccess('Connected successfully')
                navigate('/discover')
            } else {
                handleError(result.error || 'Failed to connect wallet')
            }
        } catch (err) {
            handleError('Cannot connect to the wallet')
            console.log(`Wallet connection failed: ERROR: ${err.message}`)
        }
    }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 flex items-center justify-center p-4">
      {/* Main Modal */}
      <div className="bg-twitter-darker rounded-2xl p-8 w-full max-w-md shadow-2xl border border-twitter-border/20 bg-blue-900">
        {/* Wallet Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-twitter-blue to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Wallet className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* WalletAuth Branding */}
        <div className="flex items-center justify-center mb-8">
          <span className="text-white text-3xl font-bold font-heading">StellaFi</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-white text-2xl font-semibold font-heading text-center mb-6 leading-tight">
            Sign-in with your Stellar Wallet
        </h1>

        {/* Description */}
        <p className="text-twitter-lightGray text-center text-lg font-body leading-relaxed mb-8">
            Secure access via Freighter
        </p>

        {/* Connect Wallet Button */}
        <button 
          onClick={handleConnectWallet} 
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-twitter-blue to-purple-500 text-white font-semibold font-heading text-lg py-4 px-6 rounded-2xl hover:shadow-lg hover:shadow-twitter-blue/25 transition-all duration-300 flex items-center justify-center space-x-3 mb-8 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
        >
          <Wallet className="w-5 h-5" />
          <span className='cursor-pointer'>
            {isLoading ? 'Connecting...' : 'Connect Wallet'}
          </span>
        </button>

        {/* Error Display */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center">
            {error}
          </div>
        )}

         <div className="text-center mb-8">
            <p className="text-twitter-lightGray text-base font-body mb-3">
              Don't have a wallet?
            </p>
            <button
              className="inline-flex items-center gap-2 text-base font-semibold font-body transition-colors duration-200 hover:underline"
              style={{ color: '#1DA1F2' }}
            >
              Install Freighter
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>

        {/* Footer */}
        <div className="flex items-center justify-center text-sm text-twitter-lightGray">
          <div className="flex items-center space-x-1 font-body">
            <span>Follow StellaFi on</span>
            <ExternalLink className="w-3 h-3" />
            <span className="text-twitter-lightGray">•</span>
            <span className='font-bold'>X</span>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
}
