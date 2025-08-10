import React, { useState } from 'react';
import TopBar from '../components/TopBar';

const Launchpad = () => {
  const [formData, setFormData] = useState({
    tokenName: '',
    tokenSymbol: '',
    description: '',
    website: '',
    twitter: '',
    telegram: '',
    totalSupply: '',
    initialPrice: '',
    tokenImage: null,
    bannerImage: null,
    liquidityLock: '30',
    teamTokens: '5',
    marketingTokens: '3'
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e, type) => {
    console.log('handleImageUpload called with type:', type);
    console.log('Files:', e.target.files);
    
    const file = e.target.files[0];
    if (file) {
      console.log('File selected:', file.name, file.size, file.type);
      
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file');
        return;
      }

      setFormData(prev => ({
        ...prev,
        [type]: file
      }));

      const reader = new FileReader();
      reader.onload = (event) => {
        console.log('File read successfully for type:', type);
        if (type === 'tokenImage') {
          setImagePreview(event.target.result);
        } else {
          setBannerPreview(event.target.result);
        }
      };
      reader.readAsDataURL(file);
    } else {
      console.log('No file selected');
    }
  };

  const triggerFileUpload = (inputId) => {
    console.log('Triggering file upload for:', inputId);
    const fileInput = document.getElementById(inputId);
    if (fileInput) {
      console.log('File input found, clicking...');
      fileInput.click();
    } else {
      console.error('File input not found:', inputId);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert('🚀 Your Token has been launched successfully!');
    }, 2000);
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3].map((step) => (
        <React.Fragment key={step}>
          <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
            currentStep >= step 
              ? 'bg-gradient-to-r from-twitter-blue to-twitter-purple text-white shadow-lg' 
              : 'bg-white/10 text-twitter-muted'
          }`}>
            {step}
          </div>
          {step < 3 && (
            <div className={`w-20 h-1 mx-4 rounded-full transition-all duration-300 ${
              currentStep > step ? 'bg-gradient-to-r from-twitter-blue to-twitter-purple' : 'bg-white/10'
            }`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold font-heading text-twitter-white mb-2">Token Details</h2>
        <p className="text-twitter-muted">Let's start with the basics of your Token</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-twitter-white font-semibold mb-3">Token Name</label>
          <input
            type="text"
            name="tokenName"
            value={formData.tokenName}
            onChange={handleInputChange}
            placeholder="e.g., DogeMoon"
            className="w-full modern-input py-4 px-6 text-twitter-white placeholder-twitter-muted"
            required
          />
        </div>

        <div>
          <label className="block text-twitter-white font-semibold mb-3">Token Symbol</label>
          <input
            type="text"
            name="tokenSymbol"
            value={formData.tokenSymbol}
            onChange={handleInputChange}
            placeholder="e.g., DMOON"
            className="w-full modern-input py-4 px-6 text-twitter-white placeholder-twitter-muted uppercase"
            maxLength="10"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-twitter-white font-semibold mb-3">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Tell the world about your amazing Token..."
          rows="4"
          className="w-full modern-input py-4 px-6 text-twitter-white placeholder-twitter-muted resize-none"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-twitter-white font-semibold mb-3">Total Supply</label>
          <input
            type="number"
            name="totalSupply"
            value={formData.totalSupply}
            onChange={handleInputChange}
            placeholder="1000000000"
            className="w-full modern-input py-4 px-6 text-twitter-white placeholder-twitter-muted"
            required
          />
        </div>

        <div>
          <label className="block text-twitter-white font-semibold mb-3">Initial Price (USD)</label>
          <input
            type="number"
            name="initialPrice"
            value={formData.initialPrice}
            onChange={handleInputChange}
            placeholder="0.001"
            step="0.000001"
            className="w-full modern-input py-4 px-6 text-twitter-white placeholder-twitter-muted"
            required
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold font-heading text-twitter-white mb-2">Branding & Socials</h2>
        <p className="text-twitter-muted">Make your token stand out with great visuals</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="block text-twitter-white font-semibold mb-3">Token Logo</label>
          <div className="modern-card p-6 text-center">
            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Token preview"
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImagePreview(null);
                    setFormData(prev => ({ ...prev, tokenImage: null }));
                  }}
                  className="absolute top-0 right-1/2 transform translate-x-16 -translate-y-2 w-8 h-8 bg-twitter-danger rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors"
                >
                  ×
                </button>
              </div>
            ) : (
              <div className="w-32 h-32 bg-white/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-12 h-12 text-twitter-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, 'tokenImage')}
              className="hidden"
              id="tokenImage"
              ref={(el) => {
                if (el) el.value = '';
              }}
            />
            <button
              type="button"
              onClick={() => triggerFileUpload('tokenImage')}
              className="inline-block bg-gradient-to-r from-twitter-blue to-twitter-purple text-white px-6 py-3 rounded-xl font-semibold cursor-pointer hover:shadow-lg transition-all transform hover:scale-105"
            >
              Choose Logo
            </button>
            <p className="text-twitter-muted text-sm mt-2">Recommended: 512x512px</p>
          </div>
        </div>

        {/* Banner Image Upload */}
        <div>
          <label className="block text-twitter-white font-semibold mb-3">Banner Image</label>
          <div className="modern-card p-6 text-center">
            {bannerPreview ? (
              <div className="relative">
                <img
                  src={bannerPreview}
                  alt="Banner preview"
                  className="w-full h-32 rounded-xl mx-auto mb-4 object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    setBannerPreview(null);
                    setFormData(prev => ({ ...prev, bannerImage: null }));
                  }}
                  className="absolute top-2 right-2 w-8 h-8 bg-twitter-danger rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors"
                >
                  ×
                </button>
              </div>
            ) : (
              <div className="w-full h-32 bg-white/10 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <svg className="w-12 h-12 text-twitter-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, 'bannerImage')}
              className="hidden"
              id="bannerImage"
              ref={(el) => {
                if (el) el.value = '';
              }}
            />
            <button
              type="button"
              onClick={() => triggerFileUpload('bannerImage')}
              className="inline-block bg-gradient-to-r from-twitter-purple to-pink-500 text-white px-6 py-3 rounded-xl font-semibold cursor-pointer hover:shadow-lg transition-all transform hover:scale-105"
            >
              Choose Banner
            </button>
            <p className="text-twitter-muted text-sm mt-2">Recommended: 1200x400px</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div>
          <label className="block text-twitter-white font-semibold mb-3">Website</label>
          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleInputChange}
            placeholder="https://yourtoken.com"
            className="w-full modern-input py-4 px-6 text-twitter-white placeholder-twitter-muted"
          />
        </div>

        <div>
          <label className="block text-twitter-white font-semibold mb-3">Twitter</label>
          <input
            type="text"
            name="twitter"
            value={formData.twitter}
            onChange={handleInputChange}
            placeholder="@yourtoken"
            className="w-full modern-input py-4 px-6 text-twitter-white placeholder-twitter-muted"
          />
        </div>

        <div>
          <label className="block text-twitter-white font-semibold mb-3">Telegram</label>
          <input
            type="text"
            name="telegram"
            value={formData.telegram}
            onChange={handleInputChange}
            placeholder="t.me/yourtoken"
            className="w-full modern-input py-4 px-6 text-twitter-white placeholder-twitter-muted"
          />
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold font-heading text-twitter-white mb-2">Token Distribution</h2>
        <p className="text-twitter-muted">Configure how your tokens will be distributed</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-twitter-white font-semibold mb-3">Liquidity Lock (days)</label>
          <select
            name="liquidityLock"
            value={formData.liquidityLock}
            onChange={handleInputChange}
            className="w-full modern-input py-4 px-6 text-twitter-white bg-white/5"
          >
            <option value="30">30 days</option>
            <option value="60">60 days</option>
            <option value="90">90 days</option>
            <option value="180">180 days</option>
            <option value="365">1 year</option>
          </select>
        </div>

        <div>
          <label className="block text-twitter-white font-semibold mb-3">Team Tokens (%)</label>
          <input
            type="number"
            name="teamTokens"
            value={formData.teamTokens}
            onChange={handleInputChange}
            min="0"
            max="20"
            className="w-full modern-input py-4 px-6 text-twitter-white placeholder-twitter-muted"
          />
        </div>

        <div>
          <label className="block text-twitter-white font-semibold mb-3">Marketing Tokens (%)</label>
          <input
            type="number"
            name="marketingTokens"
            value={formData.marketingTokens}
            onChange={handleInputChange}
            min="0"
            max="10"
            className="w-full modern-input py-4 px-6 text-twitter-white placeholder-twitter-muted"
          />
        </div>
      </div>

      {/* Launch Summary */}
      <div className="modern-card p-8 mt-8">
        <h3 className="text-2xl font-bold font-heading text-twitter-white mb-6">Launch Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-twitter-muted">Token Name:</span>
              <span className="text-twitter-white font-semibold">{formData.tokenName || 'Not set'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-twitter-muted">Symbol:</span>
              <span className="text-twitter-white font-semibold">{formData.tokenSymbol || 'Not set'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-twitter-muted">Total Supply:</span>
              <span className="text-twitter-white font-semibold">{formData.totalSupply ? Number(formData.totalSupply).toLocaleString() : 'Not set'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-twitter-muted">Initial Price:</span>
              <span className="text-twitter-white font-semibold">${formData.initialPrice || 'Not set'}</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-twitter-muted">Liquidity Lock:</span>
              <span className="text-twitter-white font-semibold">{formData.liquidityLock} days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-twitter-muted">Team Allocation:</span>
              <span className="text-twitter-white font-semibold">{formData.teamTokens}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-twitter-muted">Marketing Allocation:</span>
              <span className="text-twitter-white font-semibold">{formData.marketingTokens}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-twitter-muted">Public Sale:</span>
              <span className="text-twitter-white font-semibold">{100 - parseInt(formData.teamTokens) - parseInt(formData.marketingTokens)}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex-1 overflow-y-auto">
      <TopBar />
      
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-twitter-blue to-twitter-purple rounded-3xl mb-6 shadow-lg">
            <span className="text-3xl">🚀</span>
          </div>
          <h1 className="text-5xl font-bold font-heading text-twitter-white mb-4">
            Launch Your Token
          </h1>
          <p className="text-xl text-twitter-muted max-w-2xl mx-auto">
            Create and deploy your own Token in minutes. No coding required!
          </p>
        </div>

        {/* Step Indicator */}
        {renderStepIndicator()}

        {/* Form */}
        <div className="modern-card p-8 max-w-4xl mx-auto">
          <form onSubmit={handleSubmit}>
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-12 pt-8 border-t border-white/10">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-8 py-4 rounded-xl font-semibold transition-all ${
                  currentStep === 1
                    ? 'bg-white/5 text-twitter-muted cursor-not-allowed'
                    : 'bg-white/10 text-twitter-white hover:bg-white/20'
                }`}
              >
                Previous
              </button>

              <div className="text-center">
                <span className="text-twitter-muted">
                  Step {currentStep} of 3
                </span>
              </div>

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-8 py-4 bg-gradient-to-r from-twitter-blue to-twitter-purple text-white font-semibold rounded-xl hover:shadow-lg transition-all transform hover:scale-105"
                >
                  Next Step
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-8 py-4 bg-gradient-to-r from-twitter-success to-green-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Launching...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <span>🚀</span>
                      <span>Launch Token</span>
                    </div>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="modern-card p-6 text-center hover:scale-105 transition-transform">
            <div className="w-16 h-16 bg-gradient-to-r from-twitter-blue to-twitter-purple rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-twitter-white mb-2">Instant Deploy</h3>
            <p className="text-twitter-muted">Deploy your token to the blockchain in seconds with our automated system.</p>
          </div>

          <div className="modern-card p-6 text-center hover:scale-105 transition-transform">
            <div className="w-16 h-16 bg-gradient-to-r from-twitter-purple to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-twitter-white mb-2">Secure & Audited</h3>
            <p className="text-twitter-muted">All contracts are audited and follow the latest security standards.</p>
          </div>

          <div className="modern-card p-6 text-center hover:scale-105 transition-transform">
            <div className="w-16 h-16 bg-gradient-to-r from-twitter-success to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-twitter-white mb-2">Community Tools</h3>
            <p className="text-twitter-muted">Built-in marketing tools and community management features.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Launchpad;
