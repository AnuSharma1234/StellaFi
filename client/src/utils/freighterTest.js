// Test file to verify Freighter wallet integration
// This demonstrates how to use the Freighter API with the StellaFi DEX

import { 
  isConnected, 
  requestAccess, 
  getAddress, 
  getNetwork, 
  getNetworkDetails,
  isAllowed 
} from '@stellar/freighter-api';

export const debugWalletState = async () => {
  console.log('🔍 Debugging Wallet State...');
  
  try {
    // Check if Freighter is installed and connected
    const connected = await isConnected();
    console.log('✅ Freighter is connected:', connected);
    
    if (!connected) {
      console.log('❌ Freighter wallet is not installed or not connected');
      return { error: 'Freighter not connected' };
    }
    
    // Check if the application is allowed
    const allowed = await isAllowed();
    console.log('✅ App is allowed:', allowed);
    
    let address = null;
    let network = null;
    let networkDetails = null;
    
    if (allowed) {
      try {
        // Get wallet address
        address = await getAddress();
        console.log('📍 Wallet address:', address);
        console.log('📍 Address type:', typeof address);
        console.log('📍 Address length:', address ? address.length : 'null');
        
        // Get network information
        network = await getNetwork();
        console.log('🌐 Current network:', network);
        console.log('🌐 Network type:', typeof network);
        
        // Get detailed network information
        networkDetails = await getNetworkDetails();
        console.log('🌐 Network details:', networkDetails);
        console.log('🌐 Network details type:', typeof networkDetails);
        console.log('🌐 Network details keys:', networkDetails ? Object.keys(networkDetails) : 'null');
        console.log('🌐 Network details structure:', JSON.stringify(networkDetails, null, 2));
        
      } catch (error) {
        console.error('❌ Error getting wallet data:', error);
      }
    }
    
    return {
      connected,
      allowed,
      address,
      network,
      networkDetails,
      addressType: typeof address,
      networkType: typeof network
    };
    
  } catch (error) {
    console.error('❌ Error debugging wallet state:', error);
    throw error;
  }
};

export const testFreighterIntegration = async () => {
  console.log('🔍 Testing Freighter Wallet Integration...');
  
  try {
    // First debug the current state
    const debugResult = await debugWalletState();
    
    if (debugResult.error) {
      return debugResult;
    }
    
    if (!debugResult.allowed) {
      console.log('🔑 Requesting access to wallet...');
      const accessResult = await requestAccess();
      console.log('✅ Access result:', accessResult);
      console.log('✅ Access result type:', typeof accessResult);
      console.log('✅ Access address:', accessResult?.address);
      console.log('✅ Access address type:', typeof accessResult?.address);
    }
    
    return debugResult;
    
  } catch (error) {
    console.error('❌ Error testing Freighter integration:', error);
    throw error;
  }
};

export const freighterApiMethods = {
  // Core wallet methods
  isConnected,
  requestAccess,
  getAddress,
  getNetwork,
  getNetworkDetails,
  isAllowed,
  
  // Debug and test functions
  debugWalletState,
  testFreighterIntegration
};

// Make debug function available globally for console testing
if (typeof window !== 'undefined') {
  window.debugWallet = debugWalletState;
  window.testFreighter = testFreighterIntegration;
}

console.log('🚀 Freighter API test utilities loaded');
console.log('Available methods:', Object.keys(freighterApiMethods));
console.log('🔧 Debug functions available: window.debugWallet(), window.testFreighter()');
