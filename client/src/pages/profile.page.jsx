import React, { useState } from 'react';
import { User, Mail, Upload } from 'lucide-react';
import { useWallet } from '../provider/key.provider';
import {toast , ToastContainer} from "react-toastify"
import axios from 'axios'

export default function Profile() {
  const {pubKey} = useWallet()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    publicKey : pubKey
  });
  
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [isLogin, setIsLogin] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleError = (error) =>{
    toast.error(error, {
        position : "top-right"
    })
  }

  const handleSuccess = (message) => {
    toast.success(message , {
        position : "top-right"
    })
  }

  const validateForm = () =>{
    const missingFields = [] 
    if(!formData.name) missingFields.push("Name");
    if(!formData.email) missingFields.push("Email");

    if(missingFields.length > 0){
        handleError(`Please fill in the following details : ${missingFields.join(" , ")}`)
        return false;
    }
    return true; 
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    if(!validateForm()) return;

    const formData = new FormData()

    Object.keys(formData).forEach((key)=>{
        formData.append(key, formData[key])
    })

    const response = await axios.post('http://localhost:6969/auth/create', formData);

    localStorage.setItem('token',response.token)

    setTimeout(() => {
        handleSuccess('Logged in succesfully')
    },3000) 
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-900 rounded-2xl shadow-2xl p-8 backdrop-blur-sm bg-opacity-90">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl mx-auto mb-4 flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-gray-400">
              {isLogin ? 'Sign in to your account' : 'Join us today and get started'}
            </p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Avatar Upload - Only show for signup */}
            {!isLogin && (
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gray-700 border-2 border-gray-600 flex items-center justify-center overflow-hidden">
                    {avatarPreview ? (
                      <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-10 h-10 text-gray-400" />
                    )}
                  </div>
                  <label className="absolute -bottom-2 -right-2 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-purple-700 transition-colors">
                    <Upload className="w-4 h-4 text-white" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                  </label>
                </div>
                <span className="text-sm text-gray-400">Upload your photo</span>
              </div>
            )}

            {/* Name Field - Only show for signup */}
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Enter your full name"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>
            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 transform hover:scale-105"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </div>

          {/* Toggle Auth Mode */}
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
      </div>
      </div>
      <ToastContainer/>
    </div>
  );
}