import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Landing() {
    const navigate = useNavigate();

    const handleAuthButton = () => {
        navigate('/auth');
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-twitter-black">
            <h1 className="text-4xl font-bold font-heading text-twitter-white mb-8">StellaFi</h1>
            <p className="text-xl font-body text-twitter-lightGray mb-8 text-center max-w-md">
                The next generation Web3 social platform
            </p>
            <button 
                onClick={handleAuthButton}
                className="px-8 py-4 bg-gradient-to-r from-twitter-blue to-purple-500 text-white text-lg font-semibold font-heading rounded-2xl hover:shadow-lg hover:shadow-twitter-blue/25 transition-all duration-300 transform hover:scale-105"
            >
                Get Started
            </button>
        </div>
    )
}
