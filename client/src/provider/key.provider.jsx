import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { 
  isConnected, 
  requestAccess, 
  getAddress, 
  getNetwork, 
  getNetworkDetails,
  isAllowed 
} from '@stellar/freighter-api';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [publicKey, setPublicKey_] = useState(() => {
    const stored = localStorage.getItem("pubKey");
    return stored && typeof stored === 'string' ? stored : null;
  });
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [network, setNetwork] = useState(null);
  const [networkDetails, setNetworkDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const setPublicKey = (key) => {
    if (key && typeof key === 'string') {
      setPublicKey_(key);
    } else {
      setPublicKey_(null);
    }
  }

  // Check if Freighter is connected and allowed
  const checkWalletConnection = async () => {
    try {
      setIsLoading(true);
      const connected = await isConnected();
      const allowed = await isAllowed();
      
      if (connected && allowed) {
        const address = await getAddress();
        const currentNetwork = await getNetwork();
        const netDetails = await getNetworkDetails();
        
        // Debug logging to understand what we're getting
        console.log('🔍 Wallet connection data:');
        console.log('  Address:', address, typeof address);
        console.log('  Network:', currentNetwork, typeof currentNetwork);
        console.log('  Network Details:', netDetails, typeof netDetails);
        
        // Ensure address is a string
        if (address && typeof address === 'string') {
          setPublicKey(address);
          setNetwork(currentNetwork); // Store as-is, we'll handle rendering safely
          setNetworkDetails(netDetails); // Store as-is, we'll handle rendering safely
          setIsWalletConnected(true);
          setError(null);
        } else {
          console.warn('Invalid address received from getAddress():', address);
          setIsWalletConnected(false);
          setError('Please connect Freighter Wallet');
        }
      } else {
        setIsWalletConnected(false);
      }
    } catch (err) {
      console.error('Error checking wallet connection:', err);
      setError(err.message);
      setIsWalletConnected(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Connect to Freighter wallet
  const connectWallet = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const connected = await isConnected();
      if (!connected) {
        throw new Error('Freighter wallet is not installed');
      }

      const accessRequest = await requestAccess();
      
      if (accessRequest.address && typeof accessRequest.address === 'string') {
        const currentNetwork = await getNetwork();
        const netDetails = await getNetworkDetails();
        
        // Debug logging
        console.log('🔍 Wallet connection data (connect):');
        console.log('  Address:', accessRequest.address, typeof accessRequest.address);
        console.log('  Network:', currentNetwork, typeof currentNetwork);
        console.log('  Network Details:', netDetails, typeof netDetails);
        
        setPublicKey(accessRequest.address);
        setNetwork(currentNetwork);
        setNetworkDetails(netDetails);
        setIsWalletConnected(true);
        
        return { success: true, address: accessRequest.address };
      } else {
        throw new Error('Access to wallet was denied or invalid address received');
      }
    } catch (err) {
      console.error('Error connecting wallet:', err);
      setError(err.message);
      setIsWalletConnected(false);
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Disconnect wallet
  const disconnectWallet = () => {
    setPublicKey_(null);
    setIsWalletConnected(false);
    setNetwork(null);
    setNetworkDetails(null);
    setError(null);
    localStorage.removeItem('pubKey');
  };

  // Check connection on mount
  useEffect(() => {
    checkWalletConnection();
  }, []);

  useEffect(() => {
    if(publicKey){
        localStorage.setItem('pubKey',publicKey)
    }else{
        localStorage.removeItem('pubKey')
    }
  },[publicKey])

  const contextValue = useMemo(
    () => ({
        publicKey,
        setPublicKey,
        isWalletConnected,
        network,
        networkDetails,
        isLoading,
        error,
        connectWallet,
        disconnectWallet,
        checkWalletConnection
    }),
    [publicKey, isWalletConnected, network, networkDetails, isLoading, error]
  )

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
