/**
 * Testnet Verification Utilities
 * Use these in browser console to verify testnet configuration
 */

// Function to test network detection
window.testNetworkDetection = async () => {
  try {
    console.log('🔍 Testing Network Detection...');
    
    // Test Freighter API
    if (window.freighterApi) {
      const isConnected = await window.freighterApi.isConnected();
      console.log('Freighter Connected:', isConnected);
      
      if (isConnected) {
        const network = await window.freighterApi.getNetwork();
        const networkDetails = await window.freighterApi.getNetworkDetails();
        
        console.log('Network:', network);
        console.log('Network Details:', networkDetails);
        
        // Check if testnet
        const isTestnet = (
          (typeof network === 'string' && network.toLowerCase().includes('test')) ||
          (network?.network?.toLowerCase().includes('test')) ||
          (networkDetails?.network?.toLowerCase().includes('test')) ||
          (networkDetails?.networkPassphrase?.includes('Test Network'))
        );
        
        console.log('🌐 Is Testnet:', isTestnet);
        
        if (isTestnet) {
          console.log('✅ Testnet detected correctly!');
        } else {
          console.log('⚠️ Not on testnet or detection failed');
        }
      }
    } else {
      console.log('❌ Freighter API not available');
    }
    
  } catch (error) {
    console.error('Network detection test failed:', error);
  }
};

// Function to test account balance fetching on testnet
window.testAccountBalance = async () => {
  try {
    console.log('💰 Testing Account Balance Fetching...');
    
    if (window.freighterApi) {
      const isConnected = await window.freighterApi.isConnected();
      if (!isConnected) {
        console.log('⚠️ Wallet not connected - connect first');
        return;
      }
      
      const publicKey = await window.freighterApi.getAddress();
      const network = await window.freighterApi.getNetwork();
      
      console.log('Public Key:', publicKey);
      console.log('Network for balance:', network);
      
      // Test horizon connection
      const isTestnet = (
        (typeof network === 'string' && network.toLowerCase().includes('test')) ||
        (network?.network?.toLowerCase().includes('test'))
      );
      
      const horizonUrl = isTestnet ? 
        'https://horizon-testnet.stellar.org' : 
        'https://horizon.stellar.org';
      
      console.log('Using Horizon URL:', horizonUrl);
      
      // Test direct horizon call
      const response = await fetch(`${horizonUrl}/accounts/${publicKey}`);
      if (response.ok) {
        const accountData = await response.json();
        console.log('✅ Account data fetched successfully');
        console.log('Balances:', accountData.balances);
      } else {
        console.log('❌ Failed to fetch account data:', response.status, response.statusText);
      }
      
    } else {
      console.log('❌ Freighter API not available');
    }
    
  } catch (error) {
    console.error('Account balance test failed:', error);
  }
};

// Function to verify testnet setup
window.verifyTestnetSetup = () => {
  console.log('🧪 Testnet Setup Verification');
  console.log('============================');
  console.log('Run the following commands to test:');
  console.log('1. testNetworkDetection() - Check network detection');
  console.log('2. testAccountBalance() - Test balance fetching');
  console.log('');
  console.log('Make sure you have:');
  console.log('- Freighter wallet installed');
  console.log('- Connected to Stellar testnet in Freighter');
  console.log('- Some testnet XLM in your account (get from friendbot)');
  console.log('');
  console.log('Get testnet XLM at: https://laboratory.stellar.org/#account-creator');
};

// Auto-log on import
console.log('🧪 Testnet verification utilities loaded!');
console.log('Run verifyTestnetSetup() for instructions');
