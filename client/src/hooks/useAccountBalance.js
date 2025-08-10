import { useState, useEffect } from 'react';
import * as StellarSdk from '@stellar/stellar-sdk';
import { useWallet } from '../provider/key.provider';

const useAccountBalance = () => {
  const { publicKey, network, isWalletConnected } = useWallet();
  const [balances, setBalances] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAccountBalance = async () => {
    if (!publicKey || !isWalletConnected) {
      console.log('🔍 Not fetching - wallet not connected:', { publicKey: !!publicKey, isWalletConnected });
      setBalances([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      console.log('🔍 Fetching account balance for:', publicKey);
      console.log('🔍 Network:', network, typeof network);

      // Determine the network - default to testnet for development
      let isTestnet = true; // Default to testnet
      
      if (network) {
        if (typeof network === 'string') {
          isTestnet = network.toUpperCase().includes('TEST') || 
                     network.toUpperCase().includes('TESTNET') ||
                     network === 'TESTNET';
        } else if (typeof network === 'object' && network.network) {
          const networkName = String(network.network).toUpperCase();
          isTestnet = networkName.includes('TEST') || networkName.includes('TESTNET');
        }
      }
      
      const horizonUrl = isTestnet 
        ? 'https://horizon-testnet.stellar.org'
        : 'https://horizon.stellar.org';

      console.log('🔍 Is Testnet:', isTestnet);
      console.log('🔍 Using Horizon URL:', horizonUrl);
      console.log('🔍 StellarSdk.Horizon.Server:', typeof StellarSdk.Horizon.Server);

      const server = new StellarSdk.Horizon.Server(horizonUrl);
      console.log('🔍 Server created:', server);
      
      // Load account
      const account = await server.loadAccount(publicKey);
      console.log('🔍 Account loaded:', account.balances.length, 'balances');
      
      // Process balances
      const processedBalances = account.balances.map(balance => {
        console.log('🔍 Processing individual balance:', balance);
        if (balance.asset_type === 'native') {
          return {
            asset_code: 'XLM',
            asset_type: 'native',
            balance: balance.balance, // Keep as string initially
            limit: null,
            asset_issuer: null
          };
        } else {
          return {
            asset_code: balance.asset_code,
            asset_type: balance.asset_type,
            balance: balance.balance, // Keep as string initially
            limit: balance.limit || null,
            asset_issuer: balance.asset_issuer
          };
        }
      });

      console.log('🔍 Processed balances:', processedBalances);
      setBalances(processedBalances);
    } catch (err) {
      console.error('Error fetching account balance:', err);
      
      // Provide more specific error messages
      let errorMessage = err.message;
      if (err.message.includes('Server is not a constructor')) {
        errorMessage = 'Stellar SDK Server class not found. Please check Stellar SDK installation.';
      } else if (err.message.includes('Account not found')) {
        errorMessage = 'Account not found. This account may not be funded yet.';
      } else if (err.message.includes('Network Error') || err.message.includes('fetch')) {
        errorMessage = 'Network error. Please check your internet connection.';
      }
      
      setError(errorMessage);
      setBalances([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccountBalance();
  }, [publicKey, network, isWalletConnected]);

  // Refresh balances manually
  const refreshBalances = () => {
    fetchAccountBalance();
  };

  // Get balance for specific asset
  const getBalance = (assetCode) => {
    console.log('🔍 Getting balance for:', assetCode, 'from balances:', balances);
    const balance = balances.find(b => b.asset_code === assetCode);
    if (!balance || !balance.balance) {
      console.log('🔍 No balance found or balance is null/undefined');
      return 0;
    }
    const numericBalance = parseFloat(balance.balance);
    const result = isNaN(numericBalance) ? 0 : numericBalance;
    console.log('🔍 Found balance:', result);
    return result;
  };

  return {
    balances,
    loading,
    error,
    refreshBalances,
    getBalance
  };
};

export default useAccountBalance;
