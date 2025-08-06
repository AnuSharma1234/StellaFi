import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Landing() {
    const navigate = useNavigate();

    const handleAuthButton = () => {
        navigate('/auth');
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold mb-4">StellaFi</h1>
            <button 
                onClick={handleAuthButton}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
                Auth Button
            </button>
        </div>
    )
}