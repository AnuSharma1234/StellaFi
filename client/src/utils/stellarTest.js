// Test file to verify Stellar SDK Server class
import * as StellarSdk from '@stellar/stellar-sdk';

export const testStellarSDK = () => {
  console.log('🔍 Testing Stellar SDK...');
  
  try {
    // Test Server class availability
    console.log('✅ StellarSdk object:', typeof StellarSdk);
    console.log('✅ StellarSdk.Horizon:', typeof StellarSdk.Horizon);
    console.log('✅ StellarSdk.Horizon.Server:', typeof StellarSdk.Horizon.Server);
    
    // Test creating a server instance
    const testServer = new StellarSdk.Horizon.Server('https://horizon-testnet.stellar.org');
    console.log('✅ Server instance created:', testServer instanceof StellarSdk.Horizon.Server);
    
    // List available methods
    console.log('✅ Available SDK exports:', Object.keys(StellarSdk).slice(0, 10));
    
    return {
      success: true,
      serverAvailable: typeof StellarSdk.Horizon.Server === 'function',
      horizonAvailable: typeof StellarSdk.Horizon === 'object'
    };
    
  } catch (error) {
    console.error('❌ Error testing Stellar SDK:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Make test function available globally
if (typeof window !== 'undefined') {
  window.testStellarSDK = testStellarSDK;
}

console.log('🚀 Stellar SDK test utilities loaded');
console.log('🔧 Test function available: window.testStellarSDK()');
