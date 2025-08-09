import { Wallet, ExternalLink } from 'lucide-react';
import {toast , ToastContainer} from 'react-toastify'
import {isConnected, requestAccess} from '@stellar/freighter-api'
import { useNavigate } from 'react-router-dom';

export default function Auth() {
    const navigate = useNavigate()

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

    const isFreighterInstalled = async () => await isConnected();

    const connectWallet = async () => {
        if(!(await isFreighterInstalled())){
            handleError('Please install Freighter wallet !!');
            return;
        }

        try {
            const requestObj = await requestAccess()
            const pubKey = requestObj.address

            if(pubKey) {
                localStorage.setItem('pubKey', pubKey)
                console.log(`Connected to ${pubKey}`)
                handleSuccess(`Connected successfully`)
                navigate('/auth/profile')
          }

        } catch(error) {
            handleError('Cannot connect to the wallet')
            console.log(`Freighter connection failed : ERROR : ${error.message}`)
        }
    }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 flex items-center justify-center p-4">
      {/* Main Modal */}
      <div className="bg-gray-900 rounded-2xl p-8 w-full max-w-md shadow-2xl">
        {/* Wallet Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
            <Wallet className="w-6 h-6 text-gray-300" />
          </div>
        </div>

        {/* WalletAuth Branding */}
        <div className="flex items-center justify-center mb-8">
          <span className="text-white text-xl font-bold">StellaFi</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-white text-2xl font-semibold text-center mb-6 leading-tight">
            Sign-in with your Stellar Wallet
        </h1>

        {/* Description */}
        <p className="text-gray-400 text-center text-m leading-relaxed mb-8">
            Secure access via Freighter
        </p>

        {/* Connect Wallet Button */}
        <button onClick={connectWallet} className="w-full bg-white text-gray-900 font-medium py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2 mb-8">
          <Wallet className="w-4 h-4" />
          <span className='cursor-pointer'>Connect Wallet</span>
        </button>

         <div className="text-center mb-8">
            <p className="text-gray-300 text-sm mb-3">
              Don't have a wallet?
            </p>
            <button
              className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200 hover:underline"
              style={{ color: '#4EA5D9' }}
            >
              Install Freighter
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>

        {/* Footer */}
        <div className="flex items-center justify-center text-xs text-gray-500">
          <div className="flex items-center space-x-1 text-m">
            <span>Follow StellaFi on</span>
            <ExternalLink className="w-3 h-3" />
            <span className="text-gray-400">•</span>
            <span className='font-bold text-m'>X</span>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
}