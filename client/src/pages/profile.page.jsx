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
        <div className="bg-twitter-darker rounded-2xl shadow-2xl p-8 backdrop-blur-sm border border-twitter-border/20">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-twitter-blue to-purple-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
              <User className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold font-heading text-white mb-2">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-twitter-lightGray text-lg font-body">
              {isLogin ? 'Sign in to your account' : 'Join us today and get started'}
            </p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Avatar Upload - Only show for signup */}
            {!isLogin && (
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-twitter-surface border-2 border-twitter-border flex items-center justify-center overflow-hidden">
                    {avatarPreview ? (
                      <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-10 h-10 text-twitter-lightGray" />
                    )}
                  </div>
                  <label className="absolute -bottom-2 -right-2 w-8 h-8 bg-twitter-blue rounded-full flex items-center justify-center cursor-pointer hover:bg-twitter-darkBlue transition-colors shadow-lg">
                    <Upload className="w-4 h-4 text-white" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                  </label>
                </div>
                <span className="text-base text-twitter-lightGray font-body">Upload your photo</span>
              </div>
            )}

            {/* Name Field - Only show for signup */}
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-base font-semibold font-body text-twitter-white">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-twitter-lightGray" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-twitter-surface border border-twitter-border rounded-xl text-white text-base font-body placeholder-twitter-muted focus:outline-none focus:ring-2 focus:ring-twitter-blue focus:border-transparent transition-all"
                    placeholder="Enter your full name"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-base font-semibold font-body text-twitter-white">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-twitter-muted" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-twitter-surface border border-twitter-border rounded-xl text-white text-base font-body placeholder-twitter-muted focus:outline-none focus:ring-2 focus:ring-twitter-blue focus:border-transparent transition-all"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>
            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full py-4 px-4 bg-gradient-to-r from-twitter-blue to-purple-500 text-white font-semibold font-heading text-lg rounded-2xl hover:shadow-lg hover:shadow-twitter-blue/25 focus:outline-none focus:ring-2 focus:ring-twitter-blue focus:ring-offset-2 focus:ring-offset-twitter-darker transition-all duration-300 transform hover:scale-105"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </div>

          {/* Toggle Auth Mode */}
          <div className="mt-6 text-center">
            <p className="text-twitter-lightGray font-body text-base">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-twitter-blue hover:text-twitter-darkBlue font-semibold font-body transition-colors"
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
